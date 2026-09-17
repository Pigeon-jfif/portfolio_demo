/** Test dei link vecchi/nuovi per file locale, server e GitHub Pages. */
'use strict';
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const script = fs.readFileSync(path.join(__dirname,'../assets/js/records-landing.js'),'utf8');
let passed = 0;
for (const base of ['file:///C:/sito/','http://localhost:8000/','https://example.test/portfolio_demo/']) {
  for (const suffix of ['#disco=VIN-0001','?artist=queen&page=4','?q=rock#catalogo','#numeri','?utm_source=test','']) {
    const original = new URL('dischi.html'+suffix,base);
    let redirected = '',boot = 0;
    const location = {href:original.href,search:original.search,hash:original.hash,protocol:original.protocol,replace:url => {redirected=url;}};
    const records = {config:{collectionFile:'collezione.html',fetchCSV:false},createPresentation:() => {boot++;}};
    const sandbox = {location,URL,URLSearchParams,document:{body:{dataset:{page:'records'}}},window:{Pigeon:{records,url:p=>'./'+p},addEventListener:()=>{}},setTimeout,clearTimeout,AbortController};
    vm.runInNewContext(script,sandbox);
    const shouldRedirect = suffix !== '' && suffix !== '?utm_source=test';
    assert.equal(!!redirected,shouldRedirect,original.href);
    if(shouldRedirect) {
      const target = new URL(redirected);
      assert.equal(target.href,new URL('collezione.html'+suffix,base).href);
      assert.equal(boot,0);
    } else assert.equal(boot,1);
    passed++;
  }
}
console.log(passed+' combinazioni di URL corrette.');
