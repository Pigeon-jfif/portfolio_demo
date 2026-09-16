/**
 * PAGES.JS - STRUTTURA DELLE PAGINE
 * ================================
 * Ogni funzione corrisponde a una pagina. I testi provengono da site.js;
 * i codici foto da albums.js. Qui cambi l'ordine delle SEZIONI.
 * I commenti HOME-01, ABOUT-02 ecc. si ritrovano negli HTML e in Structure.txt.
 * Nessun framework: sono normali template HTML dentro stringhe JavaScript.
 */
(() => {
  'use strict';
  const P = window.Pigeon;
  const text = P.escape;
  const icon = P.icon;

  // HOME: firma e saluto sulla stessa riga, testo generale sotto, setup affiancati.
  // I testi sono in site.home; i due setup arrivano da photoGear e audioGear.
  function homePage() {
    const copy = P.site.home;
    const compactGear = items => `<dl class="home-gear">${items.map(item => `<div class="home-gear-row">
      <dt>${text(item.kind)}</dt>
      <dd><span class="home-gear-name">${text(item.name)}</span>${item.detail ? `<span class="home-gear-detail">${text(item.detail)}</span>` : ''}</dd>
    </div>`).join('')}</dl>`;
    return `<div class="wrap personal-home">
      <!-- HOME-01 | Firma principale. -->
      <header class="personal-intro">
        <p class="eyebrow">${text(copy.eyebrow)}</p>
        <h1 class="identity-wordmark" id="home-title">${P.brand()}</h1>
      </header>
      <!-- HOME-02 | Saluto e presentazione generale: fotografia e dischi, senza cataloghi. -->
      <section class="personal-bio" aria-label="Presentazione">
        <div class="personal-bio-lead">
          <p class="home-greeting">${text(copy.greeting)} <em>${text(copy.greetingAccent)}</em></p>
          <p class="personal-lead">${text(copy.intro)}</p>
        </div>
        <div class="personal-bio-copy">${copy.paragraphs.map(paragraph => `<p>${text(paragraph)}</p>`).join('')}</div>
      </section>
      <!-- HOME-03 / HOME-04 | Fotografia e audio affiancati sul desktop. -->
      <div class="personal-systems">
        <section class="personal-system" aria-labelledby="home-photo-setup">
          <h2 id="home-photo-setup">${text(copy.photoSystemLabel)}</h2>
          <p class="system-note">${text(copy.photoSystemNote)}</p>
          ${compactGear(P.site.photoGear)}
        </section>
        <section class="personal-system personal-system--audio" aria-labelledby="home-audio-setup">
          <h2 id="home-audio-setup">${text(copy.audioSystemLabel)}</h2>
          <p class="system-note">${text(copy.audioSystemNote)}</p>
          ${compactGear(P.site.audioGear)}
        </section>
      </div>
      <!-- HOME-05 | Rimandi discreti ai due archivi. -->
      ${(copy.showCollectionsLink || copy.showRecordsLink) ? `<div class="personal-collections">${copy.showCollectionsLink ? `<a class="text-link" href="${P.url('raccolte.html')}">${text(copy.collectionsLabel)} ${icon('right')}</a>` : ''}${copy.showRecordsLink ? `<a class="text-link" href="${P.url('dischi.html')}">${text(copy.recordsLabel)} ${icon('right')}</a>` : ''}</div>` : ''}
    </div>`;
  }

  // RACCOLTE: alternanza automatica; non devi assegnare destra/sinistra a mano.
  // L'ordine di albums.js determina: prima foto a sinistra, seconda a destra, ecc.
  // Su mobile torna sempre foto sopra / testo sotto. I filtri restano NEGLI album.
  function collectionsPage() {
    const copy = P.site.archive;
    const albums = P.publicAlbums();
    return `<div class="wrap">
      <!-- COLLECTIONS-01 | Intestazione: site.js > archive -->
      <header class="page-intro"><p class="eyebrow">${text(copy.eyebrow)}</p>
        <div class="page-intro-row"><h1 class="page-title">${text(copy.headingFirst)}<br><em>${text(copy.headingAccent)}</em></h1><p>${text(copy.intro)}</p></div>
      </header>
      <!-- COLLECTIONS-02 | Copertine piu' piccole e alternate: ordine e dati in albums.js -->
      <section class="archive-index" aria-labelledby="archive-title">
        <div class="archive-label"><h2 class="eyebrow" id="archive-title">L'archivio</h2><span class="eyebrow">${P.pad(albums.length)} ${albums.length === 1 ? 'raccolta' : 'raccolte'}</span></div>
        ${albums.map((album, index) => `<a class="archive-main${index % 2 ? ' archive-main--reverse' : ''}" href="${P.albumUrl(album.id)}" aria-label="Apri la raccolta ${text(album.title)}">
          <div class="collection-image">${P.image(P.byId.get(album.coverId), { eager: index === 0 })}</div>
          <div class="archive-copy">
            <p class="eyebrow"><span class="archive-number">${P.pad(index + 1)}</span> &nbsp;/&nbsp; ${[album.category, album.monthLabel].filter(Boolean).map(text).join(' &nbsp;/&nbsp; ')}</p>
            <h3>${text(album.headingFirst)}<br><em class="italic">${text(album.headingAccent)}</em></h3>
            <p class="archive-description">${text(album.shortDescription)}</p>
            <p class="archive-meta">${P.albumPhotos(album).length} immagini${album.location ? ` &middot; ${text(album.location)}` : ''}</p>
            <span class="arrow-link">Guarda le fotografie ${icon('ne')}</span>
          </div>
        </a>`).join('\n')}
        ${albums.length ? '' : '<p class="empty-state">Le prime raccolte arriveranno qui.</p>'}
      </section>
      <!-- COLLECTIONS-03 rimosso: niente sezione "Parti dal soggetto" -->
      <aside class="archive-note"><span class="eyebrow">${text(copy.noteTitle)}</span><p>${text(copy.note)}</p></aside>
      <!-- COLLECTIONS-04 | Nota di pubblicazione: le copie web restano qui, vicino alle fotografie. -->
      <aside class="publication-note archive-publication-note"><h2 class="eyebrow">${text(copy.publicationTitle)}</h2><p>${text(copy.publicationNote)}</p></aside>
    </div>`;
  }

  // Il filtraggio usa SOLO i dati del catalogo, non esegue query di rete.
  P.selectPhotos = (album, filter = 'all', query = '') => {
    const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const needle = normalize(query.trim());
    return P.albumPhotos(album).filter(photo =>
      (filter === 'all' || photo.filter === filter) &&
      (!needle || normalize([photo.id, photo.title, photo.subject, photo.note].join(' ')).includes(needle))
    );
  };

  // L'ordine "categoria" raggruppa i soggetti mantenendo, dentro ogni gruppo,
  // l'ordine curatoriale di albums.js. L'ordine dei gruppi nasce dalla prima
  // categoria incontrata nella raccolta, quindi non serve duplicarlo nei dati.
  P.orderPhotos = (album, photos, order = 'category', randomRanks = null) => {
    const sourceIndex = new Map(album.photoIds.map((id, index) => [id, index]));
    const copy = [...photos];
    if (order === 'random') {
      if (randomRanks?.size) {
        return copy.sort((a, b) => (randomRanks.get(a.id) ?? 0.5) - (randomRanks.get(b.id) ?? 0.5) ||
          (sourceIndex.get(a.id) ?? 0) - (sourceIndex.get(b.id) ?? 0));
      }
      // Fallback utile per rendering esterni: Fisher-Yates, mai usato dalla build standard.
      for (let index = copy.length - 1; index > 0; index--) {
        const swap = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[swap]] = [copy[swap], copy[index]];
      }
      return copy;
    }
    const categoryRank = new Map();
    P.albumPhotos(album).forEach(photo => {
      if (!categoryRank.has(photo.filter)) categoryRank.set(photo.filter, categoryRank.size);
    });
    return copy.sort((a, b) => (categoryRank.get(a.filter) ?? 999) - (categoryRank.get(b.filter) ?? 999) ||
      (sourceIndex.get(a.id) ?? 0) - (sourceIndex.get(b.id) ?? 0));
  };

  P.galleryPhotos = (album, filter = 'all', query = '', order = 'category', randomRanks = null) =>
    P.orderPhotos(album, P.selectPhotos(album, filter, query), order, randomRanks);

  // ALBUM-03 / REGOLE DELLA SEQUENZA
  // --------------------------------
  // Le foto normali vengono impacchettate soprattutto a coppie, senza crop.
  // Le panoramiche ~21:9 restano full-width e vengono agganciate a un confine
  // di riga vicino. Se una raccolta ha un numero dispari di foto normali, la
  // singola finale viene resa preferibilmente orizzontale: una verticale viene
  // scambiata localmente con l'ultima orizzontale disponibile. Tre verticali
  // consecutive in coda possono invece chiudere insieme su una riga da tre.
  // La logica vale sull'ordine gia' scelto (categoria o casuale) e quindi su
  // qualsiasi raccolta, presente o futura.
  P.galleryRows = photos => {
    const rows = [];
    const panorama = photo => photo.width && photo.height && photo.width / photo.height >= 2.05;
    const portrait = photo => !panorama(photo) && photo.width && photo.height && photo.height > photo.width;
    const landscape = photo => !panorama(photo) && photo.width && photo.height && photo.width >= photo.height;
    const normals = [];
    const panoramas = [];
    let normalsSeen = 0;

    photos.forEach(photo => {
      if (panorama(photo)) panoramas.push({ photo, normalsBefore: normalsSeen });
      else { normals.push(photo); normalsSeen += 1; }
    });

    // Pianifica prima le righe normali. L'ordine resta quasi identico a quello
    // ricevuto: l'unico riassetto e' locale e serve a non lasciare una verticale
    // da sola in fondo quando esiste una soluzione piu' equilibrata.
    const planned = [...normals];
    let trioStart = -1;
    if (planned.length % 2 === 1 && planned.length >= 3) {
      const last = planned.length - 1;
      const lastThreePortrait = planned.slice(-3).every(portrait);
      if (lastThreePortrait) {
        trioStart = planned.length - 3;
      } else if (portrait(planned[last])) {
        let swapIndex = -1;
        for (let index = last - 1; index >= 0; index--) {
          if (landscape(planned[index])) { swapIndex = index; break; }
        }
        if (swapIndex >= 0) [planned[swapIndex], planned[last]] = [planned[last], planned[swapIndex]];
      }
    }

    const normalRows = [];
    for (let index = 0; index < planned.length;) {
      if (index === trioStart) {
        normalRows.push(planned.slice(index, index + 3));
        index += 3;
      } else if (index + 1 < planned.length) {
        normalRows.push(planned.slice(index, index + 2));
        index += 2;
      } else {
        normalRows.push([planned[index]]);
        index += 1;
      }
    }

    // Ogni confine e' espresso come numero di foto normali gia' impaginate.
    // Una panoramica viene spostata solo fino al primo confine utile successivo,
    // evitando di spezzare coppie o trittici.
    const boundaries = [0];
    normalRows.forEach(row => boundaries.push(boundaries[boundaries.length - 1] + row.length));
    const atBoundary = new Map();
    panoramas.forEach(item => {
      const boundary = boundaries.find(value => value >= item.normalsBefore) ?? boundaries[boundaries.length - 1];
      if (!atBoundary.has(boundary)) atBoundary.set(boundary, []);
      atBoundary.get(boundary).push(item.photo);
    });

    const pushPanoramas = boundary => {
      (atBoundary.get(boundary) || []).forEach(photo => rows.push([photo]));
    };

    let consumed = 0;
    pushPanoramas(0);
    normalRows.forEach(row => {
      rows.push(row);
      consumed += row.length;
      pushPanoramas(consumed);
    });
    return rows;
  };

  P.galleryHTML = (album, filter, query, view, order = 'category', randomRanks = null) => {
    const photos = P.galleryPhotos(album, filter, query, order, randomRanks);
    if (!photos.length) return `<div class="empty-state"><p>Nessuna fotografia corrisponde a questa ricerca.</p><button type="button" class="arrow-link" data-action="reset-gallery">Azzera i filtri ${icon('back')}</button></div>`;

    // Griglia: tutte le fotografie vivono dentro una cornice 3:2 comune,
    // invisibile sullo sfondo della pagina. Le immagini restano intere e centrate.
    if (view === 'grid') return photos.map((photo, index) => P.figure(photo.id, index + 1, {
      context: 'album', eager: index < 3, columns: 3, compact: true
    })).join('\n');

    let index = 0;
    return P.galleryRows(photos).map((row, rowIndex) => {
      const panoramaRow = row.length === 1 && row[0].width / row[0].height >= 2.05;
      const rowClass = panoramaRow ? ' sequence-row--panorama' : row.length === 1 ? ' sequence-row--single' : '';
      return `<div class="sequence-row${rowClass}" data-sequence-count="${row.length}">${row.map(photo => P.figure(photo.id, ++index, {
        context: 'album', eager: rowIndex === 0, columns: row.length
      })).join('\n')}</div>`;
    }).join('\n');
  };

  // ALBUM: una sola struttura per qualsiasi raccolta, anche quelle future.
  function albumPage({ albumId, filter = 'all', query = '', view = 'sequence', order = 'category' }) {
    const album = P.albumById.get(albumId);
    if (!album || album.published === false) return notFoundPage('Raccolta non trovata.', 'Il link potrebbe essere cambiato. Le raccolte disponibili sono nell\u2019archivio.');
    const all = P.albumPhotos(album);
    const filters = [{ id: 'all', label: 'Tutte' }, ...(album.filters || [])];
    if (!filters.some(item => item.id === filter)) filter = 'all';
    const count = P.selectPhotos(album, filter, query).length;
    return `<div class="wrap">
      <!-- ALBUM-01 | Titolo, luogo, data: albums.js -->
      <header class="album-intro"><a class="breadcrumb" href="${P.url('raccolte.html')}">${icon('back')} Raccolte <span aria-hidden="true">/</span> ${text(album.category)}</a>
        <div class="album-title-row"><h1 class="album-title">${text(album.headingFirst)}<br><em>${text(album.headingAccent)}</em></h1><p class="album-description">${text(album.description)}</p></div>
        <div class="album-meta eyebrow"><span>${icon('pin')} ${text(album.location)}</span>${album.dateLabel ? `<span>${text(album.dateLabel)}</span>` : ''}<span>${all.length} immagini</span></div>
      </header>
      <!-- ALBUM-02 | Filtri configurabili; ricerca e vista: site.js > gallery -->
      <div class="gallery-toolbar">
        <div class="filter-bar" role="group" aria-label="Filtra le fotografie per soggetto">
          ${filters.map(item => `<button type="button" class="filter-button" data-filter="${text(item.id)}" aria-pressed="${filter === item.id}" aria-controls="photo-gallery">${text(item.label)}<small>${item.id === 'all' ? all.length : all.filter(photo => photo.filter === item.id).length}</small></button>`).join('')}
        </div>
        <div class="toolbar-right">
          ${P.site.gallery.showSearch ? `<label class="gallery-search">${icon('search')}<span class="sr-only">Cerca per titolo, soggetto o codice</span><input type="search" id="gallery-search" placeholder="Titolo, soggetto, codice" value="${text(query)}" autocomplete="off" aria-controls="photo-gallery"></label>` : ''}
          <div class="gallery-modes">
            <div class="view-controls" role="group" aria-label="Disposizione delle fotografie">
              <button type="button" class="view-button" data-view="sequence" aria-pressed="${view === 'sequence'}" aria-label="Vista sequenza, righe a altezza uniforme senza ritagli">${icon('sequence')}<span>Sequenza</span></button>
              <button type="button" class="view-button" data-view="grid" aria-pressed="${view === 'grid'}" aria-label="Vista griglia, fotografie centrate in cornici uniformi">${icon('grid')}<span>Griglia</span></button>
            </div>
            <div class="order-controls" role="group" aria-label="Ordine delle fotografie">
              <button type="button" class="order-button" data-order="category" aria-pressed="${order === 'category'}">Per categoria</button>
              <button type="button" class="order-button" data-order="random" aria-pressed="${order === 'random'}">Casuale</button>
            </div>
          </div>
        </div>
      </div>
      <p class="sr-only" id="gallery-status" role="status">${count} immagini visualizzate</p>
      <!-- ALBUM-03 | Sequenza dinamica senza crop; panoramiche full-width. Ordine: categoria o casuale. -->
      <section id="photo-gallery" class="gallery gallery--${view}" aria-label="Fotografie di ${text(album.title)}">${P.galleryHTML(album, filter, query, view, order)}</section>
      <div class="gallery-ending"><p id="gallery-end-count">${count} ${count === 1 ? 'immagine' : 'immagini'} visualizzate.</p><a class="text-link" href="${P.url('raccolte.html')}">${icon('back')} Tutte le raccolte</a></div>
      ${album.footnote ? `<p class="album-footnote">${text(album.footnote)}</p>` : ''}
    </div>`;
  }

  // CHI SONO: biografia generale e due settori distinti, fotografia e audio.
  function aboutPage() {
    const copy = P.site.about;
    return `<div class="wrap about-information">
      <!-- ABOUT-01 | Biografia generale: site.js > about -->
      <section class="about-layout">
        <div class="about-title"><p class="eyebrow">${text(copy.eyebrow)}</p><h1 class="page-title">${text(copy.headingFirst)}<br><em>${text(copy.headingAccent)}</em></h1></div>
        <div class="about-text"><p class="intro">${P.lines(copy.lead)}</p>${copy.paragraphs.map(paragraph => `<p>${text(paragraph)}</p>`).join('')}</div>
      </section>
      <!-- ABOUT-02 | Fotografia: testo e setup dedicati. -->
      <section class="section about-discipline" id="setup" aria-labelledby="photo-setup-title">
        <div class="section-heading"><div><p class="eyebrow">${text(copy.photoEyebrow)}</p><h2 class="section-title" id="photo-setup-title">${text(copy.photoHeading)}</h2></div><p>${text(copy.photoText)}</p></div>
        ${P.gear(P.site.photoGear, 'photo')}
      </section>
      <!-- ABOUT-03 | Audio: capitolo separato, senza mischiare i due setup. -->
      <section class="section about-discipline" id="ascolto" aria-labelledby="audio-setup-title">
        <div class="section-heading"><div><p class="eyebrow">${text(copy.audioEyebrow)}</p><h2 class="section-title" id="audio-setup-title">${text(copy.audioHeading)}</h2></div><p>${text(copy.audioText)}</p></div>
        ${P.gear(P.site.audioGear, 'audio')}
      </section>
      <!-- ABOUT-04 | Contatti veri: instagram/email. Nessun modulo finto. -->
      <section class="section contact-section" id="contatti" aria-label="Contatti"><p class="eyebrow">Restiamo in contatto</p>${P.contact()}</section>
    </div>`;
  }

  function notFoundPage(title = 'Qui non c\u2019e\u0300 una fotografia.', message = 'Il percorso potrebbe essere cambiato. Ripartiamo dall\u2019archivio.') {
    return `<div class="wrap"><section class="not-found page-intro"><p class="eyebrow">Pagina non disponibile</p><h1 class="page-title">${text(title)}</h1><p>${text(message)}</p><a class="arrow-link" href="${P.url('raccolte.html')}">Vai alle raccolte ${icon('ne')}</a></section></div>`;
  }

  P.renderPage = (page, options = {}) => {
    const pages = { home: homePage, collections: collectionsPage, album: albumPage, about: aboutPage, notfound: () => notFoundPage() };
    return (pages[page] || (() => notFoundPage()))(options);
  };
})();
