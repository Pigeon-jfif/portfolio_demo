/** Definizioni condivise dalle due pagine Plastic Pizzas. */
'use strict';
const VERSION = '20260917-zipcovers1';
const PAGES = [
  {file:'dischi.html',page:'records',title:'Plastic Pizzas',description:'Musica da tenere tra le mani. Un assaggio dallo scaffale di Nico e qualche numero della collezione.'},
  {file:'collezione.html',page:'record-collection',title:'La collezione - Plastic Pizzas',description:'La collezione di dischi di Nico: artisti, album, dettagli delle copie e qualche numero dallo scaffale.'}
];
function assets(page,base) {
  if (!PAGES.some(item => item.page === page)) return {RECORD_CSS:'',RECORD_PRE:'',RECORD_POST:''};
  const scripts = files => files.map(file => `<script defer src="${base}${file}?v=${VERSION}"></script>`).join('\n  ');
  return {
    RECORD_CSS:`<link rel="stylesheet" href="${base}assets/css/records.css?v=${VERSION}">`,
    RECORD_PRE:scripts(['assets/js/records-model.js','assets/data/records-config.js','assets/data/record-covers.js','assets/data/records.js','assets/js/records-cover-archives.js','assets/js/records-view.js']),
    RECORD_POST:scripts(page === 'records' ? ['assets/js/records-motion.js','assets/js/records-landing.js'] : ['assets/js/records-app.js'])
  };
}
module.exports = {VERSION,PAGES,assets};
