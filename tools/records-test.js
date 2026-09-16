/**
 * TEST LOGICI DISCHI / node tools/records-test.js
 * Nessuna rete o dipendenza. Test di funzioni pure, non test visivi.
 * Gli esempi sono sintetici: il file continua a funzionare anche aggiungendo dischi.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const M = require('../assets/js/records-model.js');
const {load, ROOT} = require('./catalog.js');
let passed = 0;
function test(name, run) {
  try { run(); passed++; console.log('OK ' + name); }
  catch (error) { console.error('ERRORE ' + name); throw error; }
}
function row(id, artist, title, year, extra={}) {
  return Object.assign(Object.fromEntries(M.HEADERS.map(key=>[key,''])),
    {ID:id, Artista:artist, Titolo:title, Formato:'LP', Dischi:'1', Anno:year}, extra);
}
function csv(rows, separator=',') {
  const headers=['ID',...M.HEADERS];
  const quote = v => '"'+String(v??'').replace(/"/g,'""')+'"';
  return [headers,...rows.map(r=>headers.map(h=>r[h]))].map(line=>line.map(quote).join(separator)).join('\r\n');
}
const samples = [row('TEST-01','Zeta','Unknown',''),row('TEST-02','Alpha','Secondo','2002'),row('TEST-03','Alpha','Primo','1980'),row('TEST-04','Alpha','Altro','1980'),row('TEST-05','Zeta','Primo','1981')];
const records=M.fromRows(samples);
test('CSV virgole, apici doppi, newline, CRLF e BOM',()=>{
  const special=[row('Q-01','Artista, A','Un "titolo"', '2000', {'Note aggiuntive':'prima riga\nseconda riga, "nota"'})];
  assert.deepEqual(M.parseCSV('\uFEFF'+csv(special)),special);
});
test('CSV con punto e virgola',()=>assert.deepEqual(M.parseCSV(csv(samples,';')),samples));
test('Intestazioni assenti o duplicate e virgolette aperte sono errori',()=>{
  assert.throws(()=>M.parseCSV('Artist,Title\nA,B'));
  assert.throws(()=>M.parseCSV(csv(samples).replace('"ID"','"Artista"')));
  assert.throws(()=>M.parseCSV(csv(samples)+'\n"test'));
});
test('Le righe vuote sono ignorate, non inventate',()=>assert.equal(M.parseCSV(csv(samples)+'\n\n,,,,,,,,,\n').length,5));
test('ID unici, validi, stabili anche se cambia ordine',()=>{
  assert.throws(()=>M.fromRows([samples[0],samples[0]]));
  assert.throws(()=>M.fromRows([row('../bad','A','B','2000')]));
  const a={...samples[0]};delete a.ID;
  assert.equal(M.fromRows([a])[0].id,M.fromRows([samples[1],a])[1].id);
  assert.throws(()=>M.fromRows([a,a]));
});
test('Nessuna modifica ai valori originali',()=>{
  const r=row('RAW-1','  Laufey ','Titolo scritto cosi  ','2020',{'Colori speciali':'Copy 1','Note aggiuntive':'  nota  '});
  const value=M.fromRows([r])[0];assert.deepEqual(value.raw,r);assert.equal(value.artist,'Laufey');assert.equal(value.colors,'Copy 1');
});
test('Cronologia artista, spareggio titolo, anno ignoto in coda',()=>{
  assert.deepEqual(M.sort(records).map(r=>r.id),['TEST-04','TEST-03','TEST-02','TEST-05','TEST-01']);
  assert.deepEqual(M.sort(records,'recent').map(r=>r.year),[2002,1981,1980,1980,null]);
  assert.deepEqual(M.sort(records,'oldest').map(r=>r.year),[1980,1980,1981,2002,null]);
  assert.deepEqual(records.map(r=>r.id),samples.map(r=>r.ID));
});
test('Ricerca per parole, accenti, spazi, note e codice',()=>{
  const rs=M.fromRows([row('ACC-1','Caparezza','Verit\u00e0 Supposte','2003',{'Note aggiuntive':'Autografato Remastered'})]);
  assert.equal(M.filter(rs,{q:'  verita   CAPAREZZA '}).length,1);
  assert.equal(M.filter(rs,{q:'autografato acc-1'}).length,1);
  assert.equal(M.filter(rs,{q:'inesistente'}).length,0);
});
test('Sezioni riprese dal catalogo precedente',()=>{
  const rs=M.fromRows([row('S-1','Il Rock','X','1980'),row('S-2','Various Artists','X','1980'),row('S-3','Compositore','X','1980',{Formato:'OST'}),row('S-4','Original Motion Soundtrack','X','1980')]);
  assert.deepEqual(rs.map(r=>r.section),['il-rock','various','ost','ost']);
});
test('Filtri combinati e dati mancanti non diventano zeri',()=>{
  const r=M.fromRows([row('F-1','Alpha','X','',{'Dischi':'','Paese':'Italia','Note aggiuntive':'Remastered'}),row('F-2','Alpha','Y','2000',{'Colori speciali':'Copy 1'})]);
  assert.equal(M.filter(r,{artist:'alpha',format:'LP',country:'Italia',decade:'unknown',edition:'remaster'}).length,1);
  assert.equal(M.filter(r,{country:'unknown',edition:'colors'}).length,1);
  assert.equal(M.stats(r).unknownDiscs,1);assert.equal(M.stats(r).unknownYears,1);
});
test('Casuale tra i filtrati, senza ripetizione immediata',()=>{
  const r=records.filter(record=>record.artistKey==='alpha');for(let i=0;i<20;i++)assert.notEqual(M.random(r,'TEST-03',()=>i/20).id,'TEST-03');
  assert.equal(M.random([],''),null);assert.equal(M.random([r[0]],r[0].id).id,r[0].id);
});
test('Artisti raggruppati senza spazi esterni; copie separate',()=>{
  const r=M.fromRows([row('A-1','Laufey ','X','2000'),row('A-2','Laufey','X','2000')]);
  assert.equal(M.artists(r).length,1);assert.equal(M.stats(r).records,2);assert.equal(M.stats(r).discs,2);
});
test('Catalogo attuale: snapshot identica al CSV, ID distinti',()=>{
  const P=load(),rows=M.parseCSV(fs.readFileSync(path.join(ROOT,'data/Dischi.csv'),'utf8'));
  assert.equal(JSON.stringify(rows),JSON.stringify(P.records.all.map(r=>r.raw)));
  assert.equal(new Set(P.records.all.map(r=>r.id)).size,rows.length);
});
test('Testo HTML escapato e cover controllata anche sull\'artista/titolo',()=>{
  const P=load(),R=P.records;
  const malicious=M.fromRows([row('XSS-1','<img src=x onerror=alert(1)>','<script>test</script>','2000')])[0];
  assert.ok(!R.detail(malicious).includes('<script>test'));
  assert.equal(R.safeURL('javascript:alert(1)'),'');assert.equal(R.localURL('assets/covers/../data/foo'),'');
  R.covers['XSS-1']={artist:'Altro',title:'Album',remote:'https://example.test/a.jpg'};
  assert.equal(R.coverURL(malicious),'');
});
test('Nessun ID fotografico perso e niente skin nel runtime nuovo',()=>{
  const P=load();assert.ok(P.photos.length>0);assert.ok(P.publicAlbums().length>0);
  for(const f of ['assets/js/records-model.js','assets/js/records-app.js','assets/js/records-view.js'])assert.ok(!fs.readFileSync(path.join(ROOT,f),'utf8').includes('data-skin'));
});
console.log('\n'+passed+' gruppi di test dischi superati.');
