/**
 * GENERAZIONE HTML STATICI - node tools/build.js
 * ============================================
 * Non e' un bundler: copia i dati nei normali HTML gia' presenti.
 * A sito aperto il JS usa sempre i dati aggiornati. Questo passaggio serve
 * soprattutto per contenuto senza JS, anteprime social e indicizzazione.
 * Da eseguire prima di pubblicare modifiche ai dati o alla struttura.
 * Nessun pacchetto da installare: usa esclusivamente librerie standard Node.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { ROOT } = require('./catalog.js');
const { check } = require('./check.js');
require('./records-sync.js')();
const { P, errors } = check();
if (errors.length) {
  errors.forEach(error => console.error(error));
  process.exit(1); // Non sovrascrive gli HTML se il catalogo e' incoerente.
}
const template = fs.readFileSync(path.join(ROOT, 'templates/page.html'), 'utf8');
const pages = [
  { file: 'index.html', page: 'home', title: 'Spazio personale' },
  { file: 'raccolte.html', page: 'collections', title: 'Raccolte' },
  { file: 'dischi.html', page: 'records', title: 'Plastic Pizzas - Dischi', description: 'La collezione personale di dischi di Nico. Ricerca, artisti, album e dettagli delle copie, dal catalogo CSV.' },
  { file: 'info.html', page: 'about', title: 'Chi sono e setup' },
  { file: 'album.html', page: 'album', title: 'Raccolta', noindex: true },
  { file: '404.html', page: 'notfound', title: 'Pagina non trovata', noindex: true },
  ...P.publicAlbums().filter(album => album.page).map(album => ({
    file: album.page, page: 'album', albumId: album.id, title: album.title, description: album.description
  }))
];
// Album senza pagina dedicata: accessibili subito dal modello con ?id=...
// Per anteprime social specifiche assegna page in albums.js e rigenera.
const publishedURLs = [];
// Elimina solo vecchie pagine di album generate da questo strumento.
// Non elimina immagini o file personali, e non trasforma un sito in archivio privato.
const manifestPath = path.join(ROOT, 'tools/generated-pages.json');
if (fs.existsSync(manifestPath)) {
  const oldPages = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  for (const oldFile of oldPages) {
    if (!(oldFile === 'fotografie.html' || /^serie\/[a-z0-9-]+\.html$/.test(oldFile)) || pages.some(page => page.file === oldFile)) continue;
    const oldPath = path.join(ROOT, oldFile);
    if (fs.existsSync(oldPath) && fs.readFileSync(oldPath, 'utf8').includes('PIGEON.JFIF - HTML STATICO')) fs.unlinkSync(oldPath);
  }
}
for (const page of pages) {
  const depth = page.file.split('/').length - 1;
  const base = page.page === 'notfound' && P.site.siteUrl
    ? P.site.siteUrl
    : (depth ? '../'.repeat(depth) : './');
  P.base = base;
  let seo = page.noindex ? '<meta name="robots" content="noindex,follow">' : '';
  if (P.site.siteUrl && !page.noindex) {
    const url = new URL(page.file === 'index.html' ? './' : page.file, P.site.siteUrl).href;
    seo += `\n  <link rel="canonical" href="${P.escape(url)}">\n  <meta property="og:url" content="${P.escape(url)}">`;
    publishedURLs.push(url);
  }
  const tokens = {
    TITLE: P.escape(`${page.title} - ${P.site.brand.fullName}`),
    DESCRIPTION: P.escape(page.description || P.site.meta.description),
    AUTHOR: P.escape(P.site.brand.fullName),
    SOCIAL_IMAGE: P.escape(P.site.siteUrl ? new URL(P.site.meta.socialImage, P.site.siteUrl).href : base + P.site.meta.socialImage),
    SEO: seo, BASE: base, PAGE: page.page, ALBUM: page.albumId || '',
    RECORD_CSS: page.page === 'records' ? `<link rel="stylesheet" href="${base}assets/css/records.css">` : '',
    RECORD_PRE: page.page === 'records' ? ['assets/js/records-model.js', 'assets/data/records-config.js', 'assets/data/record-covers.js', 'assets/data/records.js', 'assets/js/records-view.js'].map(file => `<script defer src="${base}${file}"></script>`).join('\n  ') : '',
    RECORD_POST: page.page === 'records' ? `<script defer src="${base}assets/js/records-app.js"></script>` : '',

    HEADER: P.header(page.page), MAIN: P.renderPage(page.page, { albumId: page.albumId, view: P.site.gallery.defaultView }), FOOTER: P.footer(page.page)
  };
  const html = template.replace(/\{\{([A-Z_]+)\}\}/g, (_, name) => tokens[name] ?? '');
  const target = path.join(ROOT, page.file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}
// Non inventiamo un dominio: sitemap e canonical completi solo con siteUrl.
const sitemap = path.join(ROOT, 'sitemap.xml');
let robots = 'User-agent: *\nAllow: /\n';
if (P.site.siteUrl) {
  fs.writeFileSync(sitemap, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publishedURLs.map(url => `  <url><loc>${P.escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
  robots += '\nSitemap: ' + new URL('sitemap.xml', P.site.siteUrl).href + '\n';
} else if (fs.existsSync(sitemap)) fs.unlinkSync(sitemap);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots);
fs.writeFileSync(path.join(ROOT, '.nojekyll'), '');
fs.writeFileSync(manifestPath, JSON.stringify(pages.map(page => page.file), null, 2) + '\n');
require('./make-index.js')(P, ROOT);
console.log(`Creati ${pages.length} HTML. ${P.photos.length} foto. ${P.publicAlbums().length} raccolta/e.`);
console.log(P.site.siteUrl ? 'Canonical e sitemap aggiornati.' : 'siteUrl vuoto: sito locale pronto, dominio da configurare alla pubblicazione.');
