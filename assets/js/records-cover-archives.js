/**
 * RECORDS-COVER-ARCHIVES.JS / COPERTINE DA PACCHETTI ZIP
 * ================================================================
 * Legge ZIP "stored" (metodo 0, senza ricompressione) creati dal progetto.
 * Le WebP sono gia' compresse: ZIP_STORED evita lavoro inutile e permette
 * di estrarre ogni file con un semplice slice dell'ArrayBuffer scaricato.
 *
 * Nessuna dipendenza esterna. Gli archivi vengono scaricati solo quando una
 * cover del relativo blocco serve davvero; ogni archivio e ogni Blob URL viene
 * riutilizzato per il resto della sessione.
 */
(() => {
  'use strict';

  const archiveCache = new Map();
  const objectURLCache = new Map();

  const u16 = (view, offset) => view.getUint16(offset, true);
  const u32 = (view, offset) => view.getUint32(offset, true);

  function parseStoredZip(buffer) {
    const textDecoder = new TextDecoder('utf-8');
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);
    const minimumEOCD = 22;
    if (buffer.byteLength < minimumEOCD) throw new Error('Archivio ZIP troppo piccolo.');

    // EOCD: puo' avere un commento fino a 65535 byte. ZIP64 non serve per questi pacchetti.
    const scanStart = Math.max(0, buffer.byteLength - 65557);
    let eocd = -1;
    for (let offset = buffer.byteLength - minimumEOCD; offset >= scanStart; offset--) {
      if (u32(view, offset) === 0x06054b50) { eocd = offset; break; }
    }
    if (eocd < 0) throw new Error('Fine archivio ZIP non trovata.');

    const disk = u16(view, eocd + 4);
    const centralDisk = u16(view, eocd + 6);
    const entriesOnDisk = u16(view, eocd + 8);
    const entries = u16(view, eocd + 10);
    const centralSize = u32(view, eocd + 12);
    const centralOffset = u32(view, eocd + 16);
    if (disk !== 0 || centralDisk !== 0 || entries !== entriesOnDisk || entries === 0xffff || centralOffset === 0xffffffff || centralSize === 0xffffffff) {
      throw new Error('Formato ZIP non supportato (multi-disco o ZIP64).');
    }
    if (centralOffset + centralSize > buffer.byteLength) throw new Error('Indice ZIP fuori dai limiti.');

    const files = new Map();
    let cursor = centralOffset;
    for (let index = 0; index < entries; index++) {
      if (cursor + 46 > buffer.byteLength || u32(view, cursor) !== 0x02014b50) throw new Error('Indice ZIP non valido.');
      const flags = u16(view, cursor + 8);
      const method = u16(view, cursor + 10);
      const compressedSize = u32(view, cursor + 20);
      const uncompressedSize = u32(view, cursor + 24);
      const nameLength = u16(view, cursor + 28);
      const extraLength = u16(view, cursor + 30);
      const commentLength = u16(view, cursor + 32);
      const localOffset = u32(view, cursor + 42);
      const nameStart = cursor + 46;
      const nameEnd = nameStart + nameLength;
      if (nameEnd > buffer.byteLength) throw new Error('Nome file ZIP fuori dai limiti.');
      const name = textDecoder.decode(bytes.subarray(nameStart, nameEnd));
      if (!name || name.includes('..') || name.startsWith('/') || name.includes('\\')) throw new Error('Percorso non sicuro nel pacchetto ZIP.');
      if (flags & 0x0001) throw new Error('ZIP cifrato non supportato.');
      if (method !== 0) throw new Error('Il pacchetto cover deve usare ZIP_STORED (metodo 0).');
      if (compressedSize !== uncompressedSize) throw new Error('Dimensioni ZIP_STORED incoerenti.');
      files.set(name, { localOffset, size: uncompressedSize });
      cursor = nameEnd + extraLength + commentLength;
    }

    return {
      blob(name, type = 'application/octet-stream') {
        const file = files.get(name);
        if (!file) throw new Error('File non presente nel pacchetto: ' + name);
        const local = file.localOffset;
        if (local + 30 > buffer.byteLength || u32(view, local) !== 0x04034b50) throw new Error('Header locale ZIP non valido.');
        const nameLength = u16(view, local + 26);
        const extraLength = u16(view, local + 28);
        const start = local + 30 + nameLength + extraLength;
        const end = start + file.size;
        if (end > buffer.byteLength) throw new Error('Dati ZIP fuori dai limiti.');
        return new Blob([buffer.slice(start, end)], { type });
      }
    };
  }

  function settings(config) {
    const value = config?.coverArchives || {};
    const packSize = Number(value.packSize);
    return {
      enabled: value.enabled === true,
      packSize: Number.isSafeInteger(packSize) && packSize > 0 ? packSize : 50,
      prefix: typeof value.prefix === 'string' && /^[a-zA-Z0-9_-]+$/.test(value.prefix) ? value.prefix : 'covers-',
      fullDir: typeof value.fullDir === 'string' ? value.fullDir.replace(/\/+$/, '') : 'assets/covers/packs/full',
      thumbDir: typeof value.thumbDir === 'string' ? value.thumbDir.replace(/\/+$/, '') : 'assets/covers/packs/thumbs'
    };
  }

  function sourceFor(path, config) {
    const cfg = settings(config);
    if (!cfg.enabled) return null;
    const match = /^(assets\/covers\/(full|thumbs)\/)(VIN-(\d{4})\.webp)$/.exec(path || '');
    if (!match) return null;
    const number = Number(match[4]);
    if (!Number.isSafeInteger(number) || number < 1) return null;
    const start = Math.floor((number - 1) / cfg.packSize) * cfg.packSize + 1;
    const end = start + cfg.packSize - 1;
    const pad = value => String(value).padStart(4, '0');
    const directory = match[2] === 'thumbs' ? cfg.thumbDir : cfg.fullDir;
    const archive = `${directory}/${cfg.prefix}${pad(start)}-${pad(end)}.zip`;
    const entry = match[3];
    return {
      type: 'archive',
      archive,
      entry,
      key: `zip:${archive}#${entry}`,
      mime: 'image/webp',
      original: path
    };
  }

  async function loadArchive(relativeURL) {
    if (!archiveCache.has(relativeURL)) {
      const task = (async () => {
        const P = window.Pigeon;
        const url = P?.url ? P.url(relativeURL) : relativeURL;
        const response = await fetch(url, { cache: 'force-cache' });
        if (!response.ok) throw new Error(`Pacchetto cover non disponibile (${response.status}): ${relativeURL}`);
        return parseStoredZip(await response.arrayBuffer());
      })();
      archiveCache.set(relativeURL, task);
    }
    return archiveCache.get(relativeURL);
  }

  async function objectURL(source) {
    if (!source || source.type !== 'archive') return '';
    if (objectURLCache.has(source.key)) return objectURLCache.get(source.key);
    const promise = (async () => {
      const archive = await loadArchive(source.archive);
      return URL.createObjectURL(archive.blob(source.entry, source.mime));
    })();
    objectURLCache.set(source.key, promise);
    try { return await promise; }
    catch (error) { objectURLCache.delete(source.key); throw error; }
  }

  window.PigeonCoverArchives = { sourceFor, objectURL, parseStoredZip };
})();
