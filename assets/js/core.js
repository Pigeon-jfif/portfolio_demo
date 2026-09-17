/**
 * CORE.JS - PICCOLI MATTONI CONDIVISI
 * =================================
 * Normalmente non serve modificare questo file.
 * Contenuti: assets/data/*.js. Aspetto: assets/css/*.css.
 *
 * Le funzioni di questo file producono HTML, senza dipendere dal DOM.
 * Per questo le stesse funzioni possono creare gli HTML statici con build.js.
 * Un solo namespace globale (Pigeon), nessuna libreria o chiamata di rete.
 */
(() => {
  'use strict';

  const P = window.Pigeon = window.Pigeon || {};
  P.site = window.PIGEON_SITE;
  P.photos = window.PIGEON_PHOTOS || [];
  P.albums = window.PIGEON_ALBUMS || [];
  P.base = './';
  P.byId = new Map(P.photos.map(photo => [photo.id, photo]));
  P.albumById = new Map(P.albums.map(album => [album.id, album]));

  // 01. Testo sicuro: titoli e descrizioni NON vengono interpretati come HTML.
  P.escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  P.lines = value => P.escape(value).replace(/\n/g, '<br>');
  P.pad = value => String(value).padStart(2, '0');
  P.url = path => P.base + path;
  P.asset = path => P.url(path);

  // Solo questi protocolli sono ammessi nei contatti configurabili.
  P.external = value => /^https?:\/\//i.test(value || '') ? value : '';
  P.email = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '') ? value : '';

  P.publicAlbums = () => P.albums.filter(album => album.published !== false);
  P.albumPhotos = album => (album?.photoIds || []).map(id => P.byId.get(id)).filter(Boolean);
  P.isPublicPhoto = id => P.publicAlbums().some(album => album.photoIds.includes(id));
  P.publicPhoto = id => P.isPublicPhoto(id) ? P.byId.get(id) : null;
  P.visibleIds = () => [...new Set(P.publicAlbums().flatMap(album => album.photoIds))];

  // Se page e' vuoto, l'album usa il modello universale con ?id=...
  P.albumUrl = (albumId, params = {}) => {
    const album = P.albumById.get(albumId);
    if (!album) return P.url('raccolte.html');
    const query = new URLSearchParams(album.page ? params : { id: album.id, ...params });
    return P.url(album.page || 'album.html') + (query.size ? '?' + query : '');
  };

  // 02. Icone SVG locali. Nessun font di icone e nessuna dipendenza esterna.
  P.icon = name => {
    const paths = {
      ne: '<path d="M5 19 19 5M5 5h14v14"/>',
      right: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
      back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
      up: '<path d="M12 20V4m-6 6 6-6 6 6"/>',
      left: '<path d="m15 5-7 7 7 7"/>',
      next: '<path d="m9 5 7 7-7 7"/>',
      expand: '<path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"/>',
      grid: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>',
      sequence: '<rect x="4" y="4" width="16" height="7"/><rect x="4" y="15" width="7" height="5"/><rect x="15" y="15" width="5" height="5"/>',
      pin: '<path d="M18 10c0 5-6 10-6 10s-6-5-6-10a6 6 0 1 1 12 0Z"/><circle cx="12" cy="10" r="2"/>',
      close: '<path d="m6 6 12 12M6 18 18 6"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
      compare: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M12 3v18"/>',
      zoom: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6m-3-3v6"/>',
      link: '<path d="m10 13 4-4m-7 6-1 1a4 4 0 0 0 6 6l4-4a4 4 0 0 0 0-6m1-3 1-1a4 4 0 0 0-6-6L8 6a4 4 0 0 0 0 6" transform="translate(0 -1)"/>',
      search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/>'
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.right}</svg>`;
  };

  // 03. Immagini responsive: thumbnail per spazi piccoli, file web full per quelli grandi.
  // L'immagine non viene mai tagliata. width/height impediscono salti di layout.
  P.image = (photo, { eager = false, columns = 2, compact = false, className = '' } = {}) => {
    if (!photo) return '';
    const srcset = photo.thumb && photo.thumbWidth < photo.width
      ? ` srcset="${P.escape(P.asset(photo.thumb))} ${photo.thumbWidth}w, ${P.escape(P.asset(photo.file))} ${photo.width}w"`
      : '';
    // La vista compatta resta a due colonne anche sul telefono.
    // In Sequenza: una sul telefono, due sul tablet, due/tre sul desktop.
    const mobileSize = compact ? '44vw' : '90vw';
    const sizes = columns === 1
      ? `(max-width: 700px) 90vw, (min-width: 1620px) 1440px, 90vw`
      : columns === 3
        ? `(max-width: 700px) ${mobileSize}, (max-width: 1000px) 44vw, (min-width: 1620px) 467px, 29vw`
        : `(max-width: 700px) ${mobileSize}, (min-width: 1620px) 710px, 44vw`;
    return `<img src="${P.escape(P.asset(photo.file))}"${srcset} sizes="${sizes}"
      width="${photo.width}" height="${photo.height}" alt="${P.escape(photo.alt)}"
      loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}
      class="${P.escape(className)}">`;
  };

  P.photoLink = (id, options = {}) => {
    const photo = P.publicPhoto(id);
    if (!photo) return '';
    // Senza JS e' comunque un normale link al file web. Con JS apre il viewer.
    return `<a class="photo-button" href="${P.escape(P.asset(photo.file))}"
      data-photo-id="${P.escape(id)}" data-context="${options.context || 'page'}"
      aria-label="Apri la fotografia: ${P.escape(photo.title)}">
      ${P.image(photo, options)}
      <span class="expand-indicator">${P.icon('expand')}</span>
    </a>`;
  };

  P.caption = (id, index) => {
    const photo = P.publicPhoto(id);
    if (!photo) return '';
    const number = index ? `<span class="muted">${P.pad(index)} &nbsp;</span>` : '';
    const code = P.site.gallery.showCodes ? `<span class="photo-code">${P.escape(id)}</span>` : '';
    return `<figcaption class="photo-caption">
      <span class="photo-caption-title">${number}${P.escape(photo.title)}${code}</span>
      <span class="eyebrow">${P.escape(photo.subject)}</span>
    </figcaption>`;
  };
  P.figure = (id, index, { portraitTrio = false, ...options } = {}) => {
    const photo = P.publicPhoto(id);
    if (!photo) return '';
    const classes = ['gallery-item'];
    const ratio = photo.width && photo.height ? photo.width / photo.height : 1;
    if (photo.height > photo.width) classes.push('is-portrait');
    if (ratio >= 2.05) classes.push('is-panorama');
    // Solo il raggruppamento della galleria assegna questa classe.
    // Non cambia i file, le proporzioni o l'ordine delle fotografie.
    if (portraitTrio) classes.push('is-portrait-trio');
    return `<figure class="${classes.join(' ')}" data-image-code="${P.escape(id)}" style="--photo-ratio:${ratio.toFixed(6)}">
      ${P.photoLink(id, options)}${P.caption(id, index)}
    </figure>`;
  };

  // 04. Header / footer: un solo punto da modificare per tutte le pagine.
  // .jfif ha una classe propria: cambiare gli altri titoli non cambia questo font.
  P.brand = () => `${P.escape(P.site.brand.name)}<span class="brand-extension">${P.escape(P.site.brand.extension)}</span>`;
  P.header = page => {
    // HEADER-02 / Due archivi pubblici; Home resta il logo.
    const nav = [
      ['collections', 'raccolte.html', 'Raccolte'],
      ['records', 'dischi.html', 'Plastic Pizzas'],
      ['about', 'info.html', 'Chi sono']
    ];
    return `<div class="header-inner wrap">
      <!-- HEADER-01 | Unico collegamento Home nella barra: il simbolo p. -->
      <a href="${P.url('index.html')}" class="brand-home" aria-label="${P.escape(P.site.brand.fullName)}, pagina iniziale"${page === 'home' ? ' aria-current="page"' : ''}>
        <img src="${P.asset('assets/favicon.svg')}" width="44" height="44" alt="" decoding="async">
      </a>
      <button type="button" class="menu-toggle" data-action="menu" aria-controls="primary-nav" aria-expanded="false">Menu ${P.icon('plus')}</button>
      <!-- HEADER-02 | Raccolte, Plastic Pizzas e Chi sono. -->
      <nav id="primary-nav" class="primary-nav" aria-label="Navigazione principale">
        ${nav.map(([key, url, label]) => `<a class="nav-link" href="${P.url(url)}"${key === page ? ' aria-current="page"' : ((page === 'album' && key === 'collections') || (page === 'record-collection' && key === 'records')) ? ' aria-current="location"' : ''}>${label}</a>`).join('\n')}
      </nav>
    </div>`;
  };

  // Footer compatto in Home, senza duplicare un grande richiamo alle raccolte.
  // Le altre pagine mantengono il footer precedente.
  P.footer = (page = '') => `<div class="wrap">
    ${page !== 'home' ? `<div class="footer-top">
      <p class="footer-message">${P.escape(P.site.footer.message)}</p>
      <div class="footer-links">
        <a href="${P.url('raccolte.html')}">Le raccolte ${P.icon('right')}</a>
        <a href="${P.url('dischi.html')}">Plastic Pizzas ${P.icon('right')}</a>
        ${P.external(P.site.instagram) ? `<a href="${P.escape(P.site.instagram)}" target="_blank" rel="noopener noreferrer">${P.escape(P.site.instagramLabel)} ${P.icon('ne')}</a>` : ''}
      </div>
    </div>` : ''}
    <div class="footer-bottom">
      <p>&copy; ${P.site.copyrightYear} ${P.escape(P.site.brand.fullName)} &nbsp;/&nbsp; ${P.escape(P.site.footer.note)}</p>
      ${page === 'home' && P.external(P.site.instagram)
        ? `<a class="footer-social" href="${P.escape(P.site.instagram)}" target="_blank" rel="noopener noreferrer">${P.escape(P.site.instagramLabel)} ${P.icon('ne')}</a>`
        : `<a class="top-button" href="#top">Torna su ${P.icon('up')}</a>`}
    </div>
  </div>`;

  P.gear = (items = [], modifier = '') => `<div class="gear-grid${modifier ? ` gear-grid--${P.escape(modifier)}` : ''}">${items.map((item, index) => `
    <article class="gear-item">
      <p class="eyebrow"><span>${P.pad(index + 1)}</span> &nbsp;/&nbsp; ${P.escape(item.kind)}</p>
      <h3>${P.escape(item.name)}</h3>${item.detail ? `<p>${P.escape(item.detail)}</p>` : ''}
    </article>`).join('')}
  </div>`;

  P.contact = () => `<div class="about-contact">
    <h2>${P.escape(P.site.contact.title)}</h2><p>${P.escape(P.site.contact.text)}</p>
    <div class="contact-links">
      ${P.external(P.site.instagram) ? `<a class="arrow-link" href="${P.escape(P.site.instagram)}" target="_blank" rel="noopener noreferrer">${P.escape(P.site.instagramLabel)} ${P.icon('ne')}</a>` : ''}
      ${P.email(P.site.email) ? `<a class="arrow-link" href="mailto:${P.escape(P.site.email)}">Scrivimi via email ${P.icon('mail')}</a>` : ''}
    </div>
  </div>`;
})();
