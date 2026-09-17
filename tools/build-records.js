/** Rigenera la landing Plastic Pizzas e La collezione, senza toccare le foto.
 * Uso (facoltativo, per sviluppo): node tools/build-records.js
 * Gli HTML del pacchetto sono gia' pronti: per usarli non serve Node.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {ROOT,load} = require('./catalog.js');
const {PAGES,assets} = require('./records-pages.js');
const P = load(), base = './';
P.base = base;
const template = fs.readFileSync(path.join(ROOT,'templates/page.html'),'utf8');
for (const page of PAGES) {
  const pageURL = P.site.siteUrl ? new URL(page.file,P.site.siteUrl).href : '';
  const tokens = {
    TITLE:P.escape(page.title+' - '+P.site.brand.fullName),
    DESCRIPTION:P.escape(page.description),AUTHOR:P.escape(P.site.brand.fullName),
    SOCIAL_IMAGE:P.escape(P.site.siteUrl ? new URL(P.site.meta.socialImage,P.site.siteUrl).href : base+P.site.meta.socialImage),
    SEO:pageURL ? `<link rel="canonical" href="${P.escape(pageURL)}">\n  <meta property="og:url" content="${P.escape(pageURL)}">` : '',
    BASE:base,PAGE:page.page,ALBUM:'',...assets(page.page,base),
    HEADER:P.header(page.page),MAIN:P.renderPage(page.page),FOOTER:P.footer(page.page)
  };
  fs.writeFileSync(path.join(ROOT,page.file),template.replace(/\{\{([A-Z_]+)\}\}/g,(_,name) => tokens[name] ?? ''));
  console.log(page.file+' aggiornato.');
}
