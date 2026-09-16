/**
 * node tools/records-sync.js
 * CSV -> snapshot per file:// + indice ID leggibile. Nessuna dipendenza.
 * Non tocca il CSV e non completa metadati tramite servizi esterni.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const M = require('../assets/js/records-model.js');
const ROOT = path.resolve(__dirname, '..');
function sync() {
  const csv = fs.readFileSync(path.join(ROOT, 'data/Dischi.csv'), 'utf8');
  const rows = M.parseCSV(csv), records = M.fromRows(rows), stats = M.stats(records);
  const snapshot = { source:'data/Dischi.csv', rows };
  const banner = '/** GENERATO da data/Dischi.csv. NON modificare qui.\n * node tools/records-sync.js oppure node tools/build.js\n * Snapshot locale: permette il doppio clic senza fetch del CSV. */\n';
  fs.writeFileSync(path.join(ROOT, 'assets/data/records.js'), banner + 'window.PIGEON_RECORDS_DATA = ' + JSON.stringify(snapshot, null, 2).replace(/</g,'\\u003c') + ';\n');
  fs.mkdirSync(path.join(ROOT,'docs/records'),{recursive:true});
  const lines = ['PLASTIC PIZZAS / INDICE DISCHI', 'Fonte: data/Dischi.csv',
    'ID = identita della copia, non posizione nello scaffale.',
    'Ordine: artista A-Z, anno crescente, titolo. Il CSV non viene riordinato.',
    `${stats.records} voci | ${stats.artists} artisti (spazi esterni ignorati) | ${stats.discs} dischi fisici`,
    '', ...M.sort(records).map(r => `${r.id} | ${r.artist} | ${r.title} | ${r.yearText || 'anno non indicato'} | ${r.format} | ${r.discText} disco/i\n  Scheda: dischi.html#disco=${r.id}\n  Cover locale consigliata: assets/covers/full/${r.id}.webp\n  Note: ${r.notes || '-'}\n  Colori speciali (testo CSV): ${r.colors || '-'}`)];
  fs.writeFileSync(path.join(ROOT,'docs/records/RECORD-INDEX.txt'),lines.join('\n')+'\n');
  fs.writeFileSync(path.join(ROOT,'docs/records/COUNTS.json'),JSON.stringify(stats,null,2)+'\n');
  require('./records-indexes.js')();
  console.log(`Dischi: ${records.length} righe validate; snapshot e indici aggiornati.`);
  return {rows,records,stats};
}
if(require.main === module) sync();
module.exports = sync;
