/**
 * RECORDS-MODEL.JS / IL CATALOGO, SENZA INTERFACCIA
 * ================================================================
 * Stesse funzioni nel browser e negli strumenti Node. Nessuna libreria.
 * 01 CSV: virgole o punto e virgola, doppi apici, BOM e righe multilinea.
 * 02 Dati: i valori originali restano in record.raw. Non correggiamo i titoli.
 * 03 Ordinamento: artista A-Z, anno crescente, titolo; anni ignoti in coda.
 * 04 Filtri reali e statistiche | 05 Pagine, indice alfabetico, campione casuale.
 * Artista aperto e lettera sono NAVIGAZIONE: non restringono i risultati.
 */
(function (root, factory) {
  'use strict';
  const model = factory();
  if (typeof module === 'object' && module.exports) module.exports = model;
  else root.PigeonRecordsModel = model;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const HEADERS = ['Artista','Titolo','Formato','Dischi','Anno','Etichetta','Paese','Colori speciali','Note aggiuntive'];
  const clean = value => String(value ?? '').trim();
  const normalize = value => clean(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('it').replace(/\s+/g, ' ');
  const collator = new Intl.Collator('it', { sensitivity: 'base', numeric: true });
  const compare = (a, b) => collator.compare(a || '', b || '');
  const SECTIONS = [
    { id: 'main', label: 'Catalogo principale' },
    { id: 'ost', label: 'Colonne sonore' },
    { id: 'various', label: 'Various Artists' },
    { id: 'il-rock', label: 'Il Rock' }
  ];

  // 01 / PARSER. Non usare split(','): romperebbe note e titoli con virgole.
  function parseCSV(input) {
    const text = String(input).replace(/^\uFEFF/, '');
    const firstLine = text.split(/\r?\n/, 1)[0];
    const separator = firstLine.split(';').length > firstLine.split(',').length ? ';' : ',';
    const matrix = [];
    let row = [], cell = '', quoted = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
        else if (quoted || !cell.length) quoted = !quoted;
        else cell += char;
      } else if (char === separator && !quoted) { row.push(cell); cell = ''; }
      else if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); if (row.some(value => clean(value))) matrix.push(row);
        row = []; cell = '';
      } else cell += char;
    }
    if (quoted) throw new Error('CSV non valido: virgolette non chiuse.');
    if (cell.length || row.length) { row.push(cell); if (row.some(value => clean(value))) matrix.push(row); }
    const headers = (matrix.shift() || []).map(clean);
    if (new Set(headers).size !== headers.length) throw new Error('CSV con intestazioni duplicate.');
    const missing = HEADERS.filter(key => !headers.includes(key));
    if (missing.length) throw new Error('Colonne mancanti: ' + missing.join(', '));
    return matrix.map((cells, index) => {
      if (cells.length > headers.length) throw new Error('Troppi campi alla riga dati ' + (index + 1) + '. Controlla le virgolette.');
      return Object.fromEntries(headers.map((header, i) => [header, cells[i] ?? '']));
    });
  }

  // ID assente: identificativo deterministico della riga, NON della posizione.
  // Per URL e copertine stabili anche dopo modifiche, compilare sempre ID nel CSV.
  function fallbackId(row) {
    const text = HEADERS.map(key => String(row[key] ?? '')).join('\u001f');
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) { hash ^= text.charCodeAt(i); hash = Math.imul(hash, 16777619); }
    return 'AUTO-' + (hash >>> 0).toString(16).toUpperCase().padStart(8, '0');
  }
  function sectionFor(artist, format) {
    const a = normalize(artist), f = normalize(format);
    if (a === 'il rock') return 'il-rock';
    if (/^various artists?$/.test(a)) return 'various';
    if (f === 'ost' || a === 'original motion soundtrack' || a.includes('soundtrack')) return 'ost';
    return 'main';
  }
  function firstLetter(artist) {
    const value = normalize(artist).replace(/^[^a-z0-9]+/, '').charAt(0).toUpperCase();
    return /^[A-Z]$/.test(value) ? value : '#';
  }
  function fromRows(rows) {
    const ids = new Set(), records = [];
    rows.forEach((raw, index) => {
      const artist = clean(raw.Artista), title = clean(raw.Titolo);
      if (!artist && !title) return;
      const id = clean(raw.ID) || fallbackId(raw);
      if (!/^[A-Za-z0-9_-]+$/.test(id)) throw new Error('ID non valido alla riga ' + (index + 2) + ': usa lettere, numeri e trattini.');
      if (ids.has(id)) throw new Error('ID duplicato: ' + id + '. Assegna un ID distinto a ogni copia.');
      ids.add(id);
      const yearText = clean(raw.Anno), discText = clean(raw.Dischi);
      const year = /^\d{4}$/.test(yearText) ? Number(yearText) : null;
      const discs = /^[1-9]\d*$/.test(discText) ? Number(discText) : null;
      const record = {
        id, artist, title, format: clean(raw.Formato), discs, discText, year, yearText,
        label: clean(raw.Etichetta), country: clean(raw.Paese), colors: clean(raw['Colori speciali']),
        notes: clean(raw['Note aggiuntive']), decade: year === null ? 'unknown' : String(Math.floor(year / 10) * 10),
        section: sectionFor(artist, raw.Formato), letter: firstLetter(artist), raw: { ...raw }
      };
      record.artistKey = normalize(artist);
      record.remaster = /remaster/i.test(record.notes);
      // Non classificare "Copy 1" o "Space Version" come un colore reale.
      // Il filtro seleziona semplicemente campi compilati, senza inferenze.
      record.search = normalize([id, artist, title, record.format, yearText, record.label,
        record.country, record.colors, record.notes, SECTIONS.find(s => s.id === record.section).label].join(' '));
      records.push(record);
    });
    if (!records.length) throw new Error('Il catalogo non contiene righe valide.');
    return records;
  }
  function chronology(a, b) {
    const yearOrder = a.year === b.year ? 0 : a.year === null ? 1 : b.year === null ? -1 : a.year - b.year;
    return yearOrder || compare(a.title, b.title) || compare(a.id, b.id);
  }
  function sort(records, order = 'shelf') {
    return [...records].sort((a, b) => {
      if (order === 'recent' || order === 'oldest') {
        const yearOrder = a.year === b.year ? 0 : a.year === null ? 1 : b.year === null ? -1 :
          order === 'recent' ? b.year - a.year : a.year - b.year;
        return yearOrder || compare(a.artist, b.artist) || compare(a.title, b.title) || compare(a.id, b.id);
      }
      if (order === 'title') return compare(a.title, b.title) || compare(a.artist, b.artist) || chronology(a,b);
      return compare(a.artist, b.artist) || chronology(a, b);
    });
  }
  function filter(records, state = {}) {
    const words = normalize(state.q).split(' ').filter(Boolean);
    return sort(records.filter(r =>
      words.every(word => r.search.includes(word)) &&
      (!state.format || r.format === state.format) &&
      (!state.decade || r.decade === state.decade) &&
      (!state.country || (state.country === 'unknown' ? !r.country : r.country === state.country)) &&
      (!state.section || r.section === state.section) &&
      (!state.edition || (state.edition === 'notes' ? !!r.notes : state.edition === 'colors' ? !!r.colors : r.remaster))
    ), state.order || 'shelf');
  }
  function artists(records) {
    const map = new Map();
    records.forEach(r => {
      if (!map.has(r.artistKey)) map.set(r.artistKey, { key: r.artistKey, name: r.artist || 'Artista non indicato', records: [] });
      map.get(r.artistKey).records.push(r);
    });
    return [...map.values()].sort((a,b) => compare(a.name,b.name)).map(a => ({...a, records:a.records.sort(chronology)}));
  }
  function counts(records, field) {
    const result = {};
    records.forEach(record => { const key = record[field] || 'Non indicato'; result[key] = (result[key] || 0) + 1; });
    return result;
  }
  function stats(records) {
    const years = records.map(r => r.year).filter(year => year !== null);
    return { records: records.length, artists: artists(records).length,
      discs: records.reduce((total,r) => total + (r.discs ?? 0), 0), unknownDiscs: records.filter(r => r.discs === null).length,
      yearMin: years.length ? Math.min(...years) : null, yearMax: years.length ? Math.max(...years) : null,
      unknownYears: records.filter(r => r.year === null).length, formats: counts(records,'format'), decades: counts(records,'decade') };
  }
  function random(records, previous = '', rng = Math.random) {
    if (!records.length) return null;
    const pool = records.length > 1 ? records.filter(r => r.id !== previous) : records;
    return pool[Math.min(pool.length - 1, Math.floor(rng() * pool.length))];
  }
  // 05 / PAGINE. Queste funzioni non conoscono il DOM e sono testabili in Node.
  // page e' 1-based. Un valore fuori intervallo viene limitato, non crea pagine vuote.
  function paginate(items, requestedPage = 1, pageSize = 36) {
    const size = Number.isSafeInteger(pageSize) && pageSize > 0 ? pageSize : 36;
    const pages = Math.max(1, Math.ceil(items.length / size));
    const value = Number(requestedPage);
    const page = Math.min(pages, Math.max(1, Number.isFinite(value) ? Math.floor(value) : 1));
    const start = (page - 1) * size;
    return { page, pages, size, total: items.length, start,
      end: Math.min(start + size, items.length), items: items.slice(start, start + size) };
  }
  function catalogItems(records, state = {}) {
    return state.view === 'artists' ? artists(records) : sort(records, state.order || 'shelf');
  }
  // Le lettere seguono l'OGGETTO mostrato: nome artista oppure titolo dell'album.
  // Per gli album un salto alfabetico sceglie Titolo A-Z, anche se prima si era
  // scelto un ordine per anno. Ricerca e filtri restano invariati.
  function alphabetTarget(records, view, letter, pageSize = 36) {
    const items = view === 'artists' ? artists(records) : sort(records, 'title');
    const index = !letter ? (items.length ? 0 : -1) : items.findIndex(item =>
      firstLetter(view === 'artists' ? item.name : item.title) === letter);
    if (index < 0) return null;
    const size = Number.isSafeInteger(pageSize) && pageSize > 0 ? pageSize : 36;
    return { index, page: Math.floor(index / size) + 1, item: items[index] };
  }
  // Numeri compatti: prima, ultima e vicine alla corrente. null = puntini,
  // non una pagina cliccabile. Mai centinaia di pulsanti sul telefono.
  function pageNumbers(page, totalPages) {
    const keep = new Set([1, totalPages, page - 1, page, page + 1]);
    if (page <= 3) [2, 3, 4].forEach(n => keep.add(n));
    if (page >= totalPages - 2) [totalPages - 3, totalPages - 2, totalPages - 1].forEach(n => keep.add(n));
    const values = [...keep].filter(n => n > 0 && n <= totalPages).sort((a,b) => a-b);
    const result = [];
    values.forEach((value, i) => {
      const previous = values[i - 1];
      if (previous && value - previous === 2) result.push(previous + 1);
      else if (previous && value - previous > 2) result.push(null);
      result.push(value);
    });
    return result;
  }
  // Campione senza rimpiazzo. Prima raggruppiamo per identita' dell'ALBUM:
  // due copie di Breach non raddoppiano la probabilita' e non occupano due posti.
  function sampleAlbums(records, amount = 3, rng = Math.random) {
    const groups = new Map();
    records.forEach(record => {
      const key = normalize(record.artist) + '\u001f' + normalize(record.title);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(record);
    });
    const pool = [...groups.values()];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.min(i, Math.max(0, Math.floor(rng() * (i + 1))));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.max(0, Math.floor(amount))).map(copies =>
      copies[Math.min(copies.length - 1, Math.max(0, Math.floor(rng() * copies.length)))]);
  }
  return { HEADERS, SECTIONS, clean, normalize, compare, parseCSV, fromRows,
    filter, sort, artists, stats, random, chronology, firstLetter,
    paginate, catalogItems, alphabetTarget, pageNumbers, sampleAlbums };

});
