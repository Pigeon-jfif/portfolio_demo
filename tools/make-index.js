/** Genera la mappa dei codici dopo ogni build. Non viene eseguito nel browser. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
module.exports = function makeIndex(P, root) {
  const rows = ['INDICE DEGLI SCATTI - GENERATO DA node tools/build.js',
    '==================================================',
    'Non modificare questo indice: modifica assets/data e rigenera.',
    'Le dimensioni WEB descrivono i file pubblicati, non i master.',
    'Righe/colonne: Sequenza desktop >1000px, senza filtri. Mobile e Griglia cambiano il layout.', ''];
  for (const photo of P.photos) {
    const places = [];
    for (const album of P.publicAlbums()) {
      if (album.coverId === photo.id) places.push('COLLECTIONS-02 / raccolte.html / copertina ' + album.id);
      const position = album.photoIds.indexOf(photo.id);
      if (position >= 0) {
        const rows = P.galleryRows(P.galleryPhotos(album, 'all', '', 'category'), true);
        const rowIndex = rows.findIndex(row => row.some(item => item.id === photo.id));
        const row = rows[rowIndex];
        const column = row.findIndex(item => item.id === photo.id) + 1;
        places.push('ALBUM-03 / ' + (album.page || 'album.html?id=' + album.id) +
          ' / posizione ' + (position + 1) + ' / riga ' + (rowIndex + 1) +
          ', colonna ' + column + ' di ' + row.length);
      }
    }
    rows.push(photo.id + ' | ' + photo.title,
      '  Sorgente precedente: ' + photo.sourceFile,
      '  File pubblico: ' + photo.file,
      '  WEB: ' + photo.width + ' x ' + photo.height + ' px',
      '  Export di riferimento: ' + (photo.referenceExport ? photo.referenceExport.width + ' x ' + photo.referenceExport.height + ' px' : 'non comunicato'),
      '  Confronto: ' + (photo.pairId || 'nessuno'),
      '  Firma: ' + (photo.webSignature === 'provisional' ? 'provvisoria per la prova - sostituire con export firmato personale' : photo.webSignature === 'none' ? 'nessuna firma incorporata nel file fornito' : 'tag presente nel file fornito'),
      '  Parametri: ' + Object.entries(photo.capture || {}).filter(([, value]) => value !== '').map(([key, value]) => key + '=' + value).join('; '),
      '  Posizioni:', ...places.map(place => '    - ' + place), '');
  }
  fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs/PHOTO-INDEX.txt'), rows.join('\n'));
};
