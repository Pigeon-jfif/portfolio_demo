/**
 * APP.JS - INIZIALIZZAZIONE E INTERAZIONI DELLE PAGINE
 * ==================================================
 * I dati sono in assets/data. La struttura HTML e' in pages.js.
 * Questo file collega pulsanti, filtri, ricerca, menu e visualizzatore.
 * Script classici con defer: funzionano anche aprendo index.html da disco.
 */
(() => {
  'use strict';
  const P = window.Pigeon;
  if (!P?.site || !P.renderPage) {
    console.error('Catalogo non caricato. Controlla i file assets/data e l\'ordine degli script.');
    return; // Rimane visibile la versione HTML statica, non una pagina bianca.
  }
  P.base = document.body.dataset.base || './';
  const page = document.body.dataset.page || 'home';
  const params = new URLSearchParams(location.search);
  const albumId = params.get('id') || document.body.dataset.album || '';
  const album = P.albumById.get(albumId);
  let filter = params.get('soggetto') || 'all';
  let query = params.get('q') || '';
  let view = P.site.gallery.defaultView === 'grid' ? 'grid' : 'sequence';
  let order = 'category';
  let randomRanks = new Map();
  let searchTimer;

  if (P.site.gallery.rememberView) {
    try {
      const saved = sessionStorage.getItem('pigeon-gallery-view');
      if (['grid', 'sequence'].includes(saved)) view = saved;
    } catch (_) { /* Browser con storage disabilitato: usa il default. */ }
  }
  if (!album?.filters?.some(item => item.id === filter)) filter = 'all';

  function reshuffle() {
    const ids = [...(album?.photoIds || [])];
    if (!ids.length) { randomRanks = new Map(); return; }

    // Fisher-Yates vero, poi una piccola guardia anti no-op: con filtri o
    // raccolte piccole un lancio casuale puo' teoricamente restituire lo stesso
    // ordine visibile. In quel caso scambiamo due elementi visibili, cosi' un
    // click su "Casuale" produce sempre un cambiamento percepibile.
    const before = album
      ? P.galleryPhotos(album, filter, query, order, randomRanks).map(photo => photo.id)
      : [];
    for (let index = ids.length - 1; index > 0; index--) {
      const swap = Math.floor(Math.random() * (index + 1));
      [ids[index], ids[swap]] = [ids[swap], ids[index]];
    }
    const visible = new Set(P.selectPhotos(album, filter, query).map(photo => photo.id));
    const after = ids.filter(id => visible.has(id));
    if (before.length > 1 && before.length === after.length && before.every((id, index) => id === after[index])) {
      const first = ids.indexOf(after[0]);
      const second = ids.indexOf(after[1]);
      [ids[first], ids[second]] = [ids[second], ids[first]];
    }
    randomRanks = new Map(ids.map((id, index) => [id, index]));
  }

  // Gli HTML consegnati hanno gia' i contenuti. Li aggiorniamo dai dati cosi'
  // puoi modificare un titolo e vedere subito il risultato senza compilare.
  document.getElementById('site-header').innerHTML = P.header(page);
  document.getElementById('main').innerHTML = P.renderPage(page, { albumId, filter, query, view });
  document.getElementById('site-footer').innerHTML = P.footer(page);
  document.documentElement.classList.add('js-ready');

  if (page === 'album') {
    document.title = album?.published !== false && album
      ? `${album.title} - ${P.site.brand.fullName}`
      : `Raccolta non trovata - ${P.site.brand.fullName}`;
  }

  // Il visualizzatore esiste solo nelle pagine delle raccolte, non in Home/Chi sono.
  const viewer = page === 'album' ? P.createViewer() : null;
  const gallery = document.getElementById('photo-gallery');
  const search = document.getElementById('gallery-search');
  const menuButton = document.querySelector('[data-action="menu"]');
  const menu = document.getElementById('primary-nav');

  function closeMenu(returnFocus = false) {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuButton.focus();
  }

  // Scrive filtri e ricerca nell'URL, senza cambiare percorso della pagina.
  function updateGalleryURL() {
    try {
      const url = new URL(location.href);
      if (filter === 'all') url.searchParams.delete('soggetto');
      else url.searchParams.set('soggetto', filter);
      if (!query.trim()) url.searchParams.delete('q');
      else url.searchParams.set('q', query.trim());
      history.replaceState(history.state, '', url);
    } catch (_) { /* L'interfaccia resta utilizzabile senza la History API. */ }
  }

  function renderGallery(updateURL = true) {
    if (!gallery || !album) return;
    gallery.className = 'gallery gallery--' + view;
    if (order === 'random' && !randomRanks.size) reshuffle();
    gallery.innerHTML = P.galleryHTML(album, filter, query, view, order, randomRanks);
    const count = P.selectPhotos(album, filter, query).length;
    document.getElementById('gallery-status').textContent = `${count} immagini visualizzate`;
    document.getElementById('gallery-end-count').textContent = `${count} ${count === 1 ? 'immagine' : 'immagini'} visualizzate.`;
    document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
    document.querySelectorAll('[data-order]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.order === order)));
    if (updateURL) updateGalleryURL();
  }

  function viewerIds() {
    if (page === 'album' && album) return P.galleryPhotos(album, filter, query, order, randomRanks).map(photo => photo.id);
    return [...new Set([...document.querySelectorAll('main [data-photo-id]')].map(link => link.dataset.photoId))];
  }

  document.addEventListener('click', event => {
    // Con Ctrl/Cmd, tasto centrale o download conserviamo il comportamento link.
    const photoLink = event.target.closest('[data-photo-id]');
    if (photoLink && viewer && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
      event.preventDefault();
      viewer.open(photoLink.dataset.photoId, viewerIds());
      return;
    }
    const filterButton = event.target.closest('[data-filter]');
    if (filterButton) { filter = filterButton.dataset.filter; renderGallery(); }
    const viewButton = event.target.closest('[data-view]');
    if (viewButton) {
      view = viewButton.dataset.view;
      if (P.site.gallery.rememberView) {
        try { sessionStorage.setItem('pigeon-gallery-view', view); } catch (_) { /* Non essenziale. */ }
      }
      renderGallery(false);
    }
    const orderButton = event.target.closest('[data-order]');
    if (orderButton) {
      event.preventDefault();
      const nextOrder = orderButton.dataset.order === 'random' ? 'random' : 'category';
      order = nextOrder;
      if (order === 'random') reshuffle();
      renderGallery(false);
      return;
    }
    const button = event.target.closest('[data-action]');
    if (button?.dataset.action === 'menu') {
      const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
      menu.classList.toggle('is-open', expanded);
      menuButton.setAttribute('aria-expanded', String(expanded));
    }
    if (button?.dataset.action === 'reset-gallery') {
      filter = 'all'; query = '';
      if (search) search.value = '';
      renderGallery();
      (search || document.querySelector('[data-filter="all"]'))?.focus();
    }
    if (!event.target.closest('#site-header')) closeMenu();
  });

  search?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    query = search.value;
    searchTimer = setTimeout(renderGallery, 120);
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !viewer?.isOpen() && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 780) closeMenu(); });

  // Uno stato di errore visibile anche se viene rimosso un file dal server.
  document.getElementById('main').addEventListener('error', event => {
    if (event.target.tagName !== 'IMG') return;
    const parent = event.target.closest('.photo-button, .collection-image');
    if (!parent || parent.querySelector('.image-error')) return;
    const message = document.createElement('span');
    message.className = 'image-error';
    message.textContent = 'Fotografia non disponibile';
    parent.appendChild(message);
  }, true);

  function openHashPhoto() {
    const hash = new URLSearchParams(location.hash.replace(/^#/, ''));
    const id = hash.get('foto');
    if (!id || !viewer) return;
    const photo = P.publicPhoto(id);
    if (photo && (page !== 'album' || (album && album.photoIds.includes(id)))) {
      viewer.open(id, viewerIds());
    }
  }
  window.addEventListener('hashchange', openHashPhoto);
  openHashPhoto();

  // Recupera ancore come #setup dopo l'aggiornamento del markup dai dati.
  if (location.hash && !location.hash.startsWith('#foto=')) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }
})();
