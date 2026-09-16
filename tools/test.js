/**
 * TEST DI REGRESSIONE - node tools/test.js
 * ======================================
 * Senza dipendenze. Questi test controllano la logica (non il rendering CSS).
 * Le foto sintetiche rappresentano solo proporzioni, non nuovi scatti reali.
 * Aggiungere foto/album al catalogo NON richiede di aggiornare gli esempi.
 */
'use strict';
const assert = require('node:assert/strict');
const { load } = require('./catalog.js');
const P = load();

function sample(pattern) {
  return [...pattern].map((shape, index) => ({
    id: 'TEST-' + index,
    width: shape === 'V' ? 3 : shape === 'P' ? 7 : 6,
    height: shape === 'P' ? 3 : 4
  }));
}
function rowSizes(pattern) {
  return Array.from(P.galleryRows(sample(pattern)), row => row.length);
}

// Esempi di coppie, foto spaiate e panoramiche.
assert.deepEqual(rowSizes(''), []);
assert.deepEqual(rowSizes('H'), [1]);
assert.deepEqual(rowSizes('HH'), [2]);
assert.deepEqual(rowSizes('HHH'), [2, 1]);
assert.deepEqual(rowSizes('VVV'), [3]);
assert.deepEqual(rowSizes('VVVVV'), [2, 3]);
assert.deepEqual(rowSizes('HHHHVVVHH'), [2, 2, 2, 2, 1]);
assert.deepEqual(rowSizes('HHVVV'), [2, 3]);
assert.deepEqual(rowSizes('HVHV'), [2, 2]);
// Le panoramiche circa 21:9 vivono sempre da sole, ma vengono agganciate
// al confine di coppia piu' vicino. Quindi H-P-H diventa HH / P, non H / P / H.
assert.deepEqual(rowSizes('P'), [1]);
assert.deepEqual(rowSizes('HPH'), [2, 1]);
assert.deepEqual(rowSizes('HHPHH'), [2, 1, 2]);
assert.deepEqual(rowSizes('HHHP'), [2, 1, 1]);
const categorySample = [
  { id: 'CAT-1', width: 6, height: 4, filter: 'a' },
  { id: 'CAT-2', width: 6, height: 4, filter: 'b' }
];
// L'ordine puo' essere per categoria, ma il layout non forza piu' una rottura
// di riga al cambio categoria: prima viene la compattezza della sequenza.
assert.deepEqual(Array.from(P.galleryRows(categorySample), row => row.length), [2]);

// Tutte le combinazioni H/V fino a nove elementi: nessuna perdita o duplicato
// e nessuna modifica all'array originale. Le righe sono coppie; un trittico e'
// ammesso solo per tre verticali. Se resta una singola e ci sono almeno due
// normali, deve essere orizzontale.
let patterns = 0;
for (let length = 0; length <= 9; length++) {
  for (let mask = 0; mask < 2 ** length; mask++) {
    const pattern = Array.from({ length }, (_, index) => mask & (1 << index) ? 'V' : 'H').join('');
    const photos = sample(pattern);
    const before = JSON.stringify(photos);
    const rows = P.galleryRows(photos);
    const flattened = Array.from(rows.flat());
    assert.equal(JSON.stringify(photos), before);
    assert.deepEqual(flattened.map(photo => photo.id).sort(), photos.map(photo => photo.id).sort());
    const singles = [];
    rows.forEach(row => {
      if (row.length === 3) assert.ok(row.every(photo => photo.height > photo.width));
      else assert.ok(row.length === 2 || row.length === 1);
      if (row.length === 1) singles.push(row[0]);
    });
    assert.ok(singles.length <= 1);
    if (singles.length && photos.length > 1) assert.ok(singles[0].width >= singles[0].height);
    patterns++;
  }
}

// Sequenze miste H/V/P: le panoramiche restano singole, tutte le foto
// compaiono una volta sola. Tra le righe normali puo' esserci al massimo una
// singola, in coda alle altre normali e orizzontale quando esiste un'alternativa.
let mixedPatterns = 0;
for (let length = 0; length <= 7; length++) {
  for (let code = 0; code < 3 ** length; code++) {
    let value = code;
    const chars = [];
    for (let index = 0; index < length; index++) {
      chars.push(['H', 'V', 'P'][value % 3]);
      value = Math.floor(value / 3);
    }
    const photos = sample(chars.join(''));
    const before = JSON.stringify(photos);
    const rows = P.galleryRows(photos);
    const flattened = Array.from(rows.flat());
    assert.equal(JSON.stringify(photos), before);
    assert.deepEqual(flattened.map(photo => photo.id).sort(), photos.map(photo => photo.id).sort());
    const normalRows = rows.filter(row => !(row.length === 1 && row[0].width / row[0].height >= 2.05));
    normalRows.forEach(row => {
      if (row.length === 3) assert.ok(row.every(photo => photo.height > photo.width));
      else assert.ok(row.length === 2 || row.length === 1);
    });
    const singleNormalRows = normalRows.filter(row => row.length === 1);
    assert.ok(singleNormalRows.length <= 1);
    if (singleNormalRows.length) {
      assert.equal(normalRows[normalRows.length - 1], singleNormalRows[0]);
      const normalPhotos = photos.filter(photo => photo.width / photo.height < 2.05);
      if (normalPhotos.length > 1) assert.ok(singleNormalRows[0][0].width >= singleNormalRows[0][0].height);
    }
    mixedPatterns++;
  }
}

// Le gallerie reali mantengono numero di foto e contenuto con ogni filtro.
// La Griglia conserva l'ordine scelto; la Sequenza puo' spostare localmente
// una normale oltre una panoramica, ma non perde o duplica fotografie.
for (const album of P.publicAlbums()) {
  for (const filter of ['all', ...(album.filters || []).map(item => item.id)]) {
    const expectedPhotos = P.galleryPhotos(album, filter, '', 'category');
    const expected = Array.from(expectedPhotos, photo => photo.id);
    const gridHTML = P.galleryHTML(album, filter, '', 'grid', 'category');
    const gridActual = [...gridHTML.matchAll(/data-image-code="([^"]+)"/g)].map(match => match[1]);
    assert.deepEqual(gridActual, expected);

    const sequenceHTML = P.galleryHTML(album, filter, '', 'sequence', 'category');
    const sequenceActual = [...sequenceHTML.matchAll(/data-image-code="([^"]+)"/g)].map(match => match[1]);
    const expectedSequence = Array.from(P.galleryRows(expectedPhotos).flat(), photo => photo.id);
    assert.deepEqual(sequenceActual, expectedSequence);
    assert.deepEqual([...sequenceActual].sort(), [...expected].sort());
    assert.ok(!sequenceHTML.includes('is-wide'));
  }
  const ranks = new Map(album.photoIds.map((id, index) => [id, album.photoIds.length - index]));
  const randomIds = P.galleryPhotos(album, 'all', '', 'random', ranks).map(photo => photo.id);
  assert.deepEqual([...randomIds].sort(), [...album.photoIds].sort());
  assert.ok(P.galleryHTML(album, 'all', 'TEST-NO-MATCH-72643', 'sequence').includes('reset-gallery'));
}

// Impaginazione resiliente: una panoramica tra due normali non crea due
// singole. Una verticale dispari viene spostata dentro una coppia; tre verticali
// finali possono invece chiudere come trittico.
const hph = sample('HPH');
assert.deepEqual(Array.from(P.galleryRows(hph).flat(), photo => photo.id), ['TEST-0', 'TEST-2', 'TEST-1']);
assert.deepEqual(Array.from(P.galleryRows(sample('HHV')).flat(), photo => photo.id), ['TEST-0', 'TEST-2', 'TEST-1']);
assert.deepEqual(rowSizes('HHVVV'), [2, 3]);
const noale = P.albumById.get('birbs-of-noale');
if (noale) {
  const noaleRows = P.galleryRows(P.galleryPhotos(noale, 'all', '', 'category'));
  const normalRows = noaleRows.filter(row => !(row.length === 1 && row[0].width / row[0].height >= 2.05));
  const singleNormalRows = normalRows.filter(row => row.length === 1);
  assert.ok(singleNormalRows.length <= 1);
  if (singleNormalRows.length) {
    assert.equal(normalRows[normalRows.length - 1], singleNormalRows[0]);
    assert.ok(singleNormalRows[0][0].width >= singleNormalRows[0][0].height);
  }
}
const conegliano = P.albumById.get('conegliano-photo-safari');
if (conegliano) {
  assert.equal(conegliano.coverId, 'CON-005');
  const cover = P.byId.get(conegliano.coverId);
  assert.equal(cover.width / cover.height, 1.5);
}

// Un solo tasto Home e due voci pubbliche di menu, su tutte le pagine.
for (const page of ['home', 'collections', 'album', 'about', 'notfound']) {
  const header = P.header(page);
  assert.equal([...header.matchAll(/href="\.\/index\.html"/g)].length, 1);
  assert.equal([...header.matchAll(/class="nav-link"/g)].length, 2);
  assert.ok(!header.includes('>Dischi</a>'));
  assert.ok(!header.includes('instagram.com'));
  assert.ok(!header.includes('nav-home'));
  if (page === 'home') assert.ok(header.includes('pagina iniziale" aria-current="page"'));
}
if (P.external(P.site.instagram)) assert.ok(P.footer('home').includes(P.escape(P.site.instagram)));
for (const page of ['home', 'collections', 'album', 'about', 'records', 'notfound']) {
  const footer = P.footer(page);
  assert.ok(footer.includes('class="footer-records-secret"'));
  assert.ok(footer.includes('href="./dischi.html"'));
  assert.ok(!footer.includes('>Plastic Pizzas '));
}
assert.equal(P.site.home.showRecordsLink, false);
console.log(`OK: ${patterns} sequenze H/V + ${mixedPatterns} miste H/V/P, ${P.publicAlbums().length} album reali, filtri, viste, topnav e accesso nascosto ai dischi.`);
