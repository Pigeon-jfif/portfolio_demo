/** node tools/records-navigation-test.js
 * Test v2.1: navigazione e impaginazione, senza browser o dipendenze.
 * Usa il catalogo reale quando utile, ma non dipende dal suo numero di righe.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {load, ROOT} = require('./catalog.js');
const M = require('../assets/js/records-model.js');
const P = load(), R = P.records, all = R.all, size = R.config.pageSize;
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('OK ' + name); }
const stringify = obj => JSON.stringify(obj);

test('Artista e lettera NON filtrano il modello', () => {
  assert.equal(M.filter(all,{artist:'twenty one pilots',letter:'C'}).length,all.length);
});
test('Ordine iniziale: scaffale in tutte le viste; filosofia prima dei numeri', () => {
  assert.equal(R.defaults().order,'shelf');
  for (const view of ['artists','albums','list']) {
    const state={...R.defaults(),view};
    if (view==='artists') assert.deepEqual(M.catalogItems(all,state).map(item=>item.key),M.artists(all).map(item=>item.key));
    else assert.deepEqual(M.catalogItems(all,state).map(item=>item.id),M.sort(all,'shelf').map(item=>item.id));
  }
  const page=R.collectionPage();
  assert.ok(page.indexOf('class="r-collection-note"') >= 0);
  assert.ok(page.indexOf('class="r-collection-note"') < page.indexOf('class="r-numbers"'));
  assert.ok(!R.page().includes('id="record-results"'));
  assert.ok(R.recordURL(all[0].id).includes('collezione.html#disco='));
});
test('Pagine: nessun elemento perso, ripetuto o fuori intervallo', () => {
  for (const view of ['artists','albums','list']) {
    const items=M.catalogItems(all,{view,order:'title'}), pages=M.paginate(items,1,size).pages;
    const seen=[];
    for(let page=1;page<=pages;page++) {
      const part=M.paginate(items,page,size);
      assert.equal(part.page,page);assert.ok(part.items.length<=size);
      seen.push(...part.items.map(item=>item.id||item.key));
    }
    assert.equal(seen.length,items.length);assert.equal(new Set(seen).size,items.length);
    assert.equal(M.paginate(items,-10,size).page,1);
    assert.equal(M.paginate(items,Infinity,size).page,1);
    assert.equal(M.paginate(items,999999,size).page,pages);
  }
  assert.equal(M.paginate([],5,size).items.length,0);
});
test('Ogni lettera porta alla pagina del PRIMO nome/titolo', () => {
  for(const view of ['artists','albums','list']) {
    const items=M.catalogItems(all,{view,order:'title'});
    for(const letter of ['#',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']) {
      const target=M.alphabetTarget(all,view,letter,size);
      const index=items.findIndex(item=>M.firstLetter(view==='artists'?item.name:item.title)===letter);
      if(index<0)assert.equal(target,null);
      else {
        assert.equal(target.index,index);assert.equal(target.page,Math.floor(index/size)+1);
        assert.equal(stringify(target.item),stringify(items[index]));
      }
    }
  }
});
test('C nei titoli non cerca artisti con C; anno -> A-Z senza perdere filtri', () => {
  const target=M.alphabetTarget(all,'albums','C',size);
  assert.equal(M.firstLetter(target.item.title),'C');
  const filtered=M.filter(all,{format:'LP',decade:'1980'});
  for(const letter of ['A','C','T']) {
    const jump=M.alphabetTarget(filtered,'list',letter,size);
    if(jump){assert.equal(jump.item.format,'LP');assert.equal(jump.item.decade,'1980');}
  }
});
test('Numeri di pagina corretti anche ai bordi, con ellissi', () => {
  for(let pages=1;pages<200;pages++) for(let current=1;current<=pages;current++) {
    const numbers=M.pageNumbers(current,pages), real=numbers.filter(n=>n!==null);
    assert.ok(real.includes(current)&&real.includes(1)&&real.includes(pages));
    assert.equal(real.length,new Set(real).size);
    assert.ok(real.every(n=>n>0&&n<=pages));
    assert.ok(numbers.length<=9);
  }
});
test('Tre album con cover, unici, stabili nelle operazioni interne', () => {
  const first=R.featuredRecords();
  assert.equal(first.length,3);
  assert.ok(first.every(record=>R.coverURL(record)));
  assert.equal(new Set(first.map(r=>M.normalize(r.artist)+'|'+M.normalize(r.title))).size,first.length);
  assert.equal(stringify(R.featuredRecords()),stringify(first));
  R.all=all.map(r=>({...r}));
  assert.equal(stringify(R.featuredRecords()),stringify(first));
  const pair=all.filter(r=>r.title==='Breach');
  assert.equal(M.sampleAlbums(pair,3).length,1);
  assert.equal(M.sampleAlbums([],3).length,0);
});
test('Campione vario; nessuna ripetizione di album in 200 estrazioni', () => {
  const pool=all.filter(r=>R.coverURL(r)), outcomes=new Set();
  let seed=998;
  const rng=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  for(let i=0;i<200;i++) {
    const draw=M.sampleAlbums(pool,3,rng);
    const keys=draw.map(r=>r.artist+'|'+r.title);
    assert.equal(new Set(keys).size,3);outcomes.add(keys.join('/'));
  }
  assert.ok(outcomes.size>20);
});
test('Cover locali: esistenza, abbinamento e fallback sicuri', () => {
  for(const [id,c] of Object.entries(R.covers)) {
    const record=R.all.find(r=>r.id===id);assert.ok(record);
    for(const key of ['local','thumb'])if(c[key])assert.ok(fs.existsSync(path.join(ROOT,c[key])));
    if(c.local)assert.ok(R.coverURL(record).endsWith(c.local));
  }
  assert.equal(R.coverURL({...all[0],id:'VIN-0403',title:'Altro',artist:'Altro'}),'');
});
test('Artisti: pannelli accessibili, cronologia e nessun altro filtro', () => {
  const state={...R.defaults(),artistColumns:4}, groups=M.artists(all);
  state.artist=groups[0].key;
  const html=R.results(all,state);
  assert.ok(html.includes('aria-expanded="true"'));
  assert.ok(html.includes('data-r-panel='));
  assert.ok(html.includes('aria-controls='));
  const cards=(html.match(/<button type="button" class="r-artist-card/g)||[]).length;
  assert.equal(cards,Math.min(size,groups.length));
  assert.ok(!html.includes('r-artist-card--empty'), 'Le lettere non devono creare celle vuote tra gli artisti.');
  assert.ok(R.pagination(all,{...R.defaults(),perPage:'40'},true).includes('value="40" selected'), 'Il selettore 20/40/tutti deve riflettere la scelta.');
  assert.ok(!R.page().includes('data-r-action="more"'));
});
console.log('\n'+passed+' gruppi di test navigazione superati.');
