/**
 * CONTROLLO DEL CATALOGO - node tools/check.js
 * Nessuna installazione: solo Node e le sue librerie standard.
 * Controlla ID, riferimenti, coppie, file, dimensioni dichiarate e link interni.
 * Non legge gli EXIF e non puo' certificare la qualita' visiva di una foto.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { ROOT, load } = require('./catalog.js');
const M = require('../assets/js/records-model.js');
const CoverArchives = require('./cover-archives.js');

function check() {
  const P = load();
  const errors = [];
  const warnings = [];
  const assert = (condition, message) => { if (!condition) errors.push(message); };
  function safeFile(file, label) {
    const valid = typeof file === 'string' && !file.startsWith('/') && !file.includes('..') && !file.includes('\\') && !/^[a-z]+:/i.test(file);
    assert(valid, label + ': percorso non relativo o non sicuro.');
    if (valid) assert(fs.existsSync(path.join(ROOT, file)), label + ': file assente: ' + file);
  }
  const unique = (list, label) => {
    const seen = new Set();
    for (const item of list) {
      assert(!seen.has(item.id), label + ': ID duplicato ' + item.id);
      seen.add(item.id);
      assert(/^[a-z0-9][a-z0-9-]*$/i.test(item.id), label + ': ID non valido ' + item.id);
    }
  };
  unique(P.photos, 'Foto'); unique(P.albums, 'Album');
  const pagePaths = P.albums.map(album => album.page).filter(Boolean);
  assert(new Set(pagePaths).size === pagePaths.length, 'Due album usano lo stesso percorso HTML.');
  assert(['grid', 'sequence'].includes(P.site.gallery.defaultView), 'gallery.defaultView non valido.');
  const style = fs.readFileSync(path.join(ROOT, 'assets/css/style.css'), 'utf8');
  assert(/@media \(max-width: 700px\)[\s\S]*?\.gallery--sequence \.is-portrait \{ width: 100%; \}/.test(style),
    'Sequenza mobile: le foto verticali devono occupare tutta la larghezza.');
  for (const photo of P.photos) {
    safeFile(photo.file, photo.id);
    if (photo.thumb) safeFile(photo.thumb, photo.id + ' thumbnail');
    assert(photo.alt?.trim(), photo.id + ': manca il testo alternativo.');
    assert(photo.title?.trim(), photo.id + ': manca il titolo.');
    assert(Number.isInteger(photo.width) && photo.width > 0 && Number.isInteger(photo.height) && photo.height > 0, photo.id + ': dimensioni web non valide.');
    assert(!photo.thumb || (Number.isInteger(photo.thumbWidth) && photo.thumbWidth > 0 && photo.thumbWidth <= photo.width), photo.id + ': thumbWidth non valido.');
    assert(P.albumById.has(photo.albumId), photo.id + ': albumId non trovato.');
    assert(['wide', 'crop'].includes(photo.variant), photo.id + ': variant non valida.');
    if (photo.pairId) {
      const pair = P.byId.get(photo.pairId);
      assert(pair && pair.pairId === photo.id && pair.id !== photo.id, photo.id + ': confronto non reciproco.');
      assert(pair && pair.variant !== photo.variant, photo.id + ': un confronto deve avere wide e crop.');
      assert(pair && pair.albumId === photo.albumId, photo.id + ': confronto tra album diversi.');
    }
    if (photo.webSignature === 'provisional') warnings.push(photo.id + ': firma provvisoria da sostituire con il tuo export firmato.');
    if (!photo.capture?.iso) warnings.push(photo.id + ': ISO non inseriti (campo opzionale).');
  }
  for (const album of P.albums) {
    assert(album.photoIds?.length > 0, album.id + ': album senza fotografie.');
    assert(new Set(album.photoIds).size === album.photoIds.length, album.id + ': ID ripetuti nella sequenza.');
    if (album.page) assert(/^serie\/[a-z0-9-]+\.html$/.test(album.page), album.id + ': page deve avere forma serie/nome.html.');
    for (const id of album.photoIds) {
      assert(P.byId.has(id), album.id + ': fotografia inesistente ' + id);
      assert(P.byId.get(id)?.albumId === album.id, album.id + ': ' + id + ' appartiene a un altro album.');
    }
    assert(Boolean(album.coverId) !== Boolean(album.cover), album.id + ': usa esattamente una copertina: coverId oppure cover.');
    if (album.coverId) assert(album.photoIds.includes(album.coverId), album.id + ': copertina fuori dalla raccolta ' + album.coverId);
    if (album.cover) {
      safeFile(album.cover.file, album.id + ' copertina');
      if (album.cover.thumb) safeFile(album.cover.thumb, album.id + ' copertina thumbnail');
      assert(Number.isInteger(album.cover.width) && album.cover.width > 0 && Number.isInteger(album.cover.height) && album.cover.height > 0, album.id + ': dimensioni copertina non valide.');
      assert(!album.cover.thumb || (Number.isInteger(album.cover.thumbWidth) && album.cover.thumbWidth > 0 && album.cover.thumbWidth <= album.cover.width), album.id + ': thumbWidth copertina non valido.');
      assert((album.cover.alt || album.title || '').trim(), album.id + ': alt copertina mancante.');
    }
    const filterIds = (album.filters || []).map(filter => filter.id);
    assert(new Set(filterIds).size === filterIds.length && !filterIds.includes('all'), album.id + ': ID filtro duplicato o riservato.');
    for (const filter of album.filters || []) {
      assert(/^[a-z0-9-]+$/.test(filter.id), album.id + ': filtro non valido.');
      assert(filter.label?.trim(), album.id + ': manca il nome visibile del filtro.');
    }
    for (const photo of P.albumPhotos(album)) assert(filterIds.includes(photo.filter), photo.id + ': filtro non dichiarato nell\'album.');
  }
  // Home e Chi sono sono solo testo: nessun riferimento fotografico da validare.
  safeFile('assets/favicon.svg', 'Logo/favicon');
  safeFile(P.site.meta.socialImage, 'Anteprima social');
  assert(P.site.brand.name?.trim() && P.site.brand.extension?.trim(), 'Nome del sito incompleto.');
  assert(Array.isArray(P.site.home.paragraphs), 'home.paragraphs deve essere una lista.');
  assert(Array.isArray(P.site.about.paragraphs), 'about.paragraphs deve essere una lista.');
  assert(Array.isArray(P.site.photoGear), 'photoGear deve essere una lista.');
  assert(Array.isArray(P.site.audioGear), 'audioGear deve essere una lista.');
  if (P.site.siteUrl) assert(/^https?:\/\/.+\/$/.test(P.site.siteUrl), 'siteUrl deve essere assoluto e terminare con /.');
  if (P.site.instagram) assert(P.external(P.site.instagram), 'URL Instagram non valido.');
  if (P.site.email) assert(P.email(P.site.email), 'Email non valida.');
  // DISCHI / stesso controllo, schema separato da quello fotografico.
  try {
    const rows = M.parseCSV(fs.readFileSync(path.join(ROOT, 'data/Dischi.csv'), 'utf8'));
    const records = M.fromRows(rows);
    assert(JSON.stringify(records.map(r => r.raw)) === JSON.stringify(P.records.all.map(r => r.raw)),
      'Snapshot dischi non aggiornata: esegui node tools/records-sync.js oppure node tools/build.js.');
    const ids = new Set(records.map(r => r.id));
    const archiveSettings = CoverArchives.settings(P.records.config);
    const archiveIndexes = new Map();
    if (archiveSettings.enabled) {
      assert(Number.isSafeInteger(archiveSettings.packSize) && archiveSettings.packSize > 0, 'coverArchives.packSize non valido.');
      for (const [label,dir] of [['fullDir',archiveSettings.fullDir],['thumbDir',archiveSettings.thumbDir]]) {
        assert(/^assets\/covers\/packs\/[a-zA-Z0-9_./-]+$/.test(dir) && !dir.split('/').includes('..'), 'coverArchives.'+label+': percorso non sicuro.');
      }
    }
    function coverFile(file,label) {
      if (!archiveSettings.enabled) { safeFile(file,label); return; }
      const source = CoverArchives.sourceFor(file,P.records.config);
      assert(!!source,label+': percorso non compatibile con i pacchetti ZIP: '+file);
      if (!source) return;
      safeFile(source.archive,label+' archivio');
      const archivePath=path.join(ROOT,source.archive);
      if (!fs.existsSync(archivePath)) return;
      if (!archiveIndexes.has(source.archive)) archiveIndexes.set(source.archive,CoverArchives.entries(archivePath));
      assert(archiveIndexes.get(source.archive).has(source.entry),label+': file assente nel pacchetto '+source.archive+': '+source.entry);
    }
    assert(Number.isInteger(P.records.config.featuredCount) && P.records.config.featuredCount > 0 && P.records.config.featuredCount <= 3, 'featuredCount: da 1 a 3 suggerimenti con cover.');
    assert(Number.isFinite(P.records.config.artistAnimationMs) && P.records.config.artistAnimationMs >= 0, 'artistAnimationMs deve essere un tempo positivo o zero.');
    assert(['artists', 'albums', 'list'].includes(P.records.config.defaultView), 'defaultView dischi non valido.');
    assert(Number.isInteger(P.records.config.pageSize) && P.records.config.pageSize > 0, 'pageSize deve essere un intero positivo.');
    assert(Array.isArray(P.records.config.pageSizes) && P.records.config.pageSizes.map(String).join('|') === '20|40|all', 'pageSizes deve offrire 20, 40 e tutti.');
    for (const [id, cover] of Object.entries(P.records.covers)) {
      assert(ids.has(id), 'Cover per un disco inesistente: ' + id);
      const record = records.find(r => r.id === id);
      assert(cover.artist && cover.title, id + ': compila artista e titolo di controllo della cover.');
      if (record) assert(M.normalize(cover.artist) === record.artistKey && M.normalize(cover.title) === M.normalize(record.title), id + ': cover abbinata a un altro titolo/artista.');
      assert(['album', 'copy'].includes(cover.match), id + ': match deve essere album o copy.');
      for (const key of ['local','thumb']) if (cover[key]) {
        assert(cover[key].startsWith('assets/covers/'), id + ': cover fuori da assets/covers.');
        coverFile(cover[key], id + ' ' + key);
      }
      for (const key of ['remote','source']) if (cover[key]) assert(/^https:\/\//.test(cover[key]), id + ': URL cover non HTTPS.');
    }
  } catch (error) { errors.push(error.message); }
  return { P, errors, warnings };
}
if (require.main === module) {
  try {
    const result = check();
    for (const error of result.errors) console.error('ERRORE: ' + error);
    console.log(`${result.P.photos.length} foto, ${result.P.albums.length} album fotografici, ${result.P.records.all.length} dischi. ${result.errors.length} errori.`);
    if (result.warnings.length) console.log(`${result.warnings.length} note sui metadati opzionali o sulle firme provvisorie; non sono errori.`);
    const provisional = result.P.photos.filter(photo => photo.webSignature === 'provisional').length;
    if (provisional) console.log(`NOTA: ${provisional} foto hanno una firma provvisoria da sostituire prima della pubblicazione definitiva.`);
    process.exitCode = result.errors.length ? 1 : 0;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { check };
