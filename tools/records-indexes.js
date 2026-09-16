/** Indici di manutenzione v2.1. Chiamato da records-sync.js / build.js.
 * Non modifica CSV, copertine o configurazione. Nessuna dipendenza esterna. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { ROOT, load } = require('./catalog.js');
const M = require('../assets/js/records-model.js');
function generate() {
  const R = load().records;
  const lines = ['PLASTIC PIZZAS / MAPPA A-Z E PAGINE',
    'Catalogo intero, senza filtri. pageSize = ' + R.config.pageSize,
    'Gli indici cambiano aggiungendo dischi o modificando pageSize. Build li aggiorna.', ''];
  for (const view of ['artists','albums']) {
    lines.push(view==='artists'?'ARTISTI / A-Z del nome':'COPERTINE ED ELENCO / A-Z del titolo');
    for (const letter of ['#',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']) {
      const target=M.alphabetTarget(R.all,view,letter,R.config.pageSize);
      if(target)lines.push(letter+' | pagina '+target.page+' | posizione '+(target.index+1)+' | '+
        (view==='artists'?target.item.name:target.item.id+' / '+target.item.title+' / '+target.item.artist));
    }
    lines.push('');
  }
  fs.writeFileSync(path.join(ROOT,'docs/records/NAVIGATION-INDEX.txt'),lines.join('\n')+'\n');
  const covers=['PLASTIC PIZZAS / INDICE COPERTINE E ABBINAMENTI',
    'Fonte: assets/data/record-covers.js. File condivisi tra copie ammessi.',
    "L'abbinamento visuale non certifica la stampa e non modifica il CSV.",''];
  for (const [id,cover] of Object.entries(R.covers).sort((a,b)=>M.compare(a[0],b[0]))) {
    covers.push(id+' | '+cover.artist+' | '+cover.title,
      '  File: '+(cover.local||'(nessun file locale)'),
      '  Miniatura: '+(cover.thumb||'(usa file principale)'),
      '  Remoto: '+(cover.remote||'-'),
      '  Allegato di partenza: '+(cover.sourceFile||'-'),
      '  Fonte: '+(cover.source||cover.sourceLabel||'-'),
      '  Tipo: '+cover.match);
    if(cover.note)covers.push('  Nota: '+cover.note);
    covers.push('');
  }
  fs.writeFileSync(path.join(ROOT,'docs/records/COVER-INDEX.txt'),covers.join('\n')+'\n');
}
if(require.main===module)generate();
module.exports=generate;
