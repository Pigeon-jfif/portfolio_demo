/**
 * VIEWER.JS - FOTOGRAFIE, CONFRONTI, DATI DI SCATTO
 * ===============================================
 * - Dialog nativo: focus contenuto nella finestra, Escape, ritorno al link.
 * - Frecce tastiera / swipe: navigazione nella selezione corrente.
 * - I: informazioni; C: confronto; Z: dimensione nativa.
 * - Nessuna elaborazione della foto: si visualizza il file web di pubblicazione.
 * - I campi capture vuoti vengono omessi. Non si ricavano EXIF dal nome file.
 * Configurazione funzioni: site.js > viewer.
 */
(() => {
  'use strict';
  const P = window.Pigeon;
  const icon = P.icon;
  const text = P.escape;

  P.createViewer = () => {
    // Browser senza dialog: i normali link ai file web continuano a funzionare.
    if (typeof HTMLDialogElement === 'undefined') return null;

    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.id = 'photo-viewer';
    dialog.setAttribute('aria-label', 'Visualizzatore fotografico');
    dialog.innerHTML = `
      <header class="lb-header">
        <p class="lb-brand">${P.brand()}</p>
        <div class="lb-actions">
          <button class="lb-action" type="button" data-action="share" aria-label="Copia il link della fotografia" title="Copia il link">${icon('link')}<span>Link</span></button>
          <button class="lb-action" type="button" data-action="zoom" aria-pressed="false" aria-label="Mostra alla dimensione nativa" title="Dimensione nativa (Z)">${icon('zoom')}<span>100%</span></button>
          <button class="lb-action" type="button" data-action="compare" aria-pressed="false" aria-label="Confronta inquadratura ampia e crop" title="Confronta (C)">${icon('compare')}<span>Confronta</span></button>
          <button class="lb-action" type="button" data-action="info" aria-pressed="false" aria-controls="lb-info" aria-label="Informazioni sulla fotografia" title="Informazioni (I)">${icon('info')}<span>Info</span></button>
          <button class="lb-action close" type="button" data-action="close" aria-label="Chiudi il visualizzatore" title="Chiudi (Esc)" autofocus>${icon('close')}</button>
        </div>
      </header>
      <div class="lb-stage">
        <button class="lb-nav" type="button" data-action="prev" aria-label="Fotografia precedente">${icon('left')}</button>
        <div class="lb-image-wrap">
          <img class="lb-image" id="lb-image" alt="" draggable="false">
          <div class="lb-compare" id="lb-compare" hidden></div>
          <p class="lb-loading" hidden>Caricamento...</p>
          <p class="lb-error" role="status" hidden>Non riesco a caricare questa fotografia.</p>
        </div>
        <button class="lb-nav" type="button" data-action="next" aria-label="Fotografia successiva">${icon('next')}</button>
      </div>
      <footer class="lb-bottom">
        <div class="lb-caption"><div><h2 class="lb-title" id="lb-title"></h2><p class="lb-subtitle" id="lb-subtitle"></p></div><span class="lb-count" id="lb-count" role="status" aria-live="polite" aria-atomic="true"></span></div>
        <div class="lb-info" id="lb-info" role="region" aria-label="Dati della fotografia" tabindex="0" hidden></div>
        <p class="lb-status" role="status" aria-live="polite"></p>
        <div class="lb-share-fallback" hidden><label>Link della fotografia<input type="text" readonly aria-label="Link da copiare manualmente"></label></div>
      </footer>`;
    document.body.appendChild(dialog);

    const image = dialog.querySelector('#lb-image');
    const wrap = dialog.querySelector('.lb-image-wrap');
    const compareArea = dialog.querySelector('#lb-compare');
    const infoArea = dialog.querySelector('#lb-info');
    const error = dialog.querySelector('.lb-error');
    const loading = dialog.querySelector('.lb-loading');
    const status = dialog.querySelector('.lb-status');
    const shareFallback = dialog.querySelector('.lb-share-fallback');
    const action = name => dialog.querySelector(`[data-action="${name}"]`);

    let ids = [];
    let index = 0;
    let comparing = false;
    let showInfo = false;
    let zoomed = false;
    let returnFocus = null;
    let originalHash = '';
    let touchStart = null;

    const currentPhoto = () => P.byId.get(ids[index]);
    const hasPair = photo => Boolean(P.site.viewer.enableComparison &&
      photo.pairId && P.publicPhoto(photo.pairId));

    // L'hash e' condivisibile dopo la pubblicazione. replaceState non riempie
    // la cronologia del browser a ogni fotografia sfogliata.
    function updateHash() {
      try {
        const url = new URL(location.href);
        url.hash = 'foto=' + encodeURIComponent(currentPhoto().id);
        history.replaceState(history.state, '', url);
      } catch (_) { /* L'apertura locale puo' limitare la History API. */ }
    }

    function metadata(photo) {
      const capture = photo.capture || {};
      const rows = [
        ['Fotocamera', capture.camera], ['Obiettivo', capture.lens],
        ['Focale', capture.focalLength], ['Diaframma', capture.aperture],
        ['Tempo', capture.shutter], ['ISO', capture.iso],
        ['Luogo', photo.location], ['Data dello scatto', capture.capturedAt]
      ].filter(([, value]) => value !== '' && value !== null && value !== undefined);
      return `<div class="lb-note"><p>${text(photo.note)}</p>
          <p class="lb-file">${text(photo.id)} &middot; ${photo.width} &times; ${photo.height} px &middot; file web</p>
          ${photo.referenceExport ? `<p class="lb-file">Export di riferimento: ${photo.referenceExport.width} &times; ${photo.referenceExport.height} px</p>` : ''}
        </div>
        <dl class="exif-list">${rows.map(([label, value]) => `<div><dt>${text(label)}</dt><dd>${text(value)}</dd></div>`).join('')}</dl>`;
    }

    function finishLoading() {
      loading.hidden = true;
      error.hidden = true;
      image.style.visibility = 'visible';
    }
    image.addEventListener('load', finishLoading);
    image.addEventListener('error', () => {
      loading.hidden = true;
      error.hidden = false;
      image.style.visibility = 'hidden';
    });
    // Anche i due lati del confronto hanno uno stato di errore indipendente.
    compareArea.addEventListener('error', event => {
      if (event.target.tagName !== 'IMG') return;
      event.target.hidden = true;
      event.target.closest('figure').querySelector('figcaption').textContent += ' - file non disponibile';
    }, true);

    function updateZoom() {
      wrap.classList.toggle('is-zoomed', zoomed && !comparing);
      action('zoom').setAttribute('aria-pressed', String(zoomed));
      if (zoomed) requestAnimationFrame(() => {
        wrap.scrollLeft = (wrap.scrollWidth - wrap.clientWidth) / 2;
        wrap.scrollTop = (wrap.scrollHeight - wrap.clientHeight) / 2;
      });
      else { wrap.scrollLeft = 0; wrap.scrollTop = 0; }
    }

    function render() {
      const photo = currentPhoto();
      if (!photo) return;
      if (!hasPair(photo)) comparing = false;
      if (comparing) zoomed = false;

      action('compare').hidden = !hasPair(photo);
      action('compare').setAttribute('aria-pressed', String(comparing));
      action('zoom').hidden = !P.site.viewer.enableZoom || comparing;
      action('share').hidden = !P.site.viewer.enableShare;
      action('info').setAttribute('aria-pressed', String(showInfo));
      action('info').setAttribute('aria-expanded', String(showInfo));
      action('prev').disabled = ids.length < 2;
      action('next').disabled = ids.length < 2;
      dialog.querySelector('#lb-title').textContent = photo.title;
      const album = P.albumById.get(photo.albumId);
      const capturedYear = String(photo.capture?.capturedAt || '').match(/\b(?:19|20)\d{2}\b/)?.[0];
      dialog.querySelector('#lb-subtitle').textContent = [photo.subject, photo.location || album?.location, capturedYear || album?.year].filter(Boolean).join(' / ');
      dialog.querySelector('#lb-count').textContent = `${P.pad(index + 1)} / ${P.pad(ids.length)}`;
      infoArea.innerHTML = metadata(photo);
      infoArea.hidden = !showInfo;
      status.textContent = '';
      shareFallback.hidden = true;
      image.hidden = comparing;
      compareArea.hidden = !comparing;
      error.hidden = true;
      loading.hidden = true;

      if (comparing) {
        const other = P.byId.get(photo.pairId);
        const wide = photo.variant === 'crop' ? other : photo;
        const crop = photo.variant === 'crop' ? photo : other;
        compareArea.innerHTML = [[wide, 'Inquadratura ampia'], [crop, 'Crop']].map(([item, label]) => `
          <figure><img src="${text(P.asset(item.file))}" alt="${text(item.alt)}" draggable="false"><figcaption>${label} &middot; ${text(item.id)}</figcaption></figure>`).join('');
      } else {
        compareArea.innerHTML = '';
        const src = P.asset(photo.file);
        image.alt = photo.alt;
        if (image.getAttribute('src') !== src) {
          image.style.visibility = 'hidden';
          loading.hidden = false;
          image.src = src;
        }
        if (image.complete && image.naturalWidth > 0) finishLoading();
      }
      updateZoom();
      updateHash();

      // Precarica soltanto il prossimo file, non l'intera raccolta.
      if (ids.length > 1) {
        const next = P.byId.get(ids[(index + 1) % ids.length]);
        const preload = new Image();
        preload.src = P.asset(next.file);
      }
    }

    function open(id, contextIds) {
      if (!P.publicPhoto(id)) return;
      ids = [...new Set((contextIds || P.visibleIds()).filter(P.isPublicPhoto))];
      if (!ids.includes(id)) ids.unshift(id);
      index = ids.indexOf(id);
      comparing = false;
      showInfo = false;
      zoomed = false;
      if (!dialog.open) {
        returnFocus = document.activeElement;
        originalHash = location.hash.startsWith('#foto=') ? '' : location.hash;
      }
      render();
      document.body.classList.add('modal-open');
      if (!dialog.open) dialog.showModal();
      action('close').focus();
    }

    function navigate(direction) {
      if (ids.length < 2) return;
      index = (index + direction + ids.length) % ids.length;
      zoomed = false;
      render();
    }
    function close() { if (dialog.open) dialog.close(); }

    async function share() {
      if (location.protocol === 'file:') {
        status.textContent = 'I link saranno condivisibili quando il sito sara\u0300 online.';
        return;
      }
      const url = new URL(location.href);
      // La destinazione e' sempre la pagina della raccolta corretta.
      url.href = new URL(P.albumUrl(currentPhoto().albumId), location.href).href;
      url.hash = 'foto=' + encodeURIComponent(currentPhoto().id);
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard non disponibile');
        await navigator.clipboard.writeText(url.href);
        status.textContent = 'Link copiato.';
      } catch (_) {
        status.textContent = 'Copia il link dal campo qui sotto.';
        shareFallback.hidden = false;
        const input = shareFallback.querySelector('input');
        input.value = url.href;
        input.focus();
        input.select();
      }
    }

    const actions = {
      close, prev: () => navigate(-1), next: () => navigate(1), share,
      info: () => { showInfo = !showInfo; render(); },
      compare: () => { if (hasPair(currentPhoto())) { comparing = !comparing; zoomed = false; render(); } },
      zoom: () => { if (P.site.viewer.enableZoom && !comparing) { zoomed = !zoomed; updateZoom(); } }
    };

    dialog.addEventListener('click', event => {
      const button = event.target.closest('[data-action]');
      if (button) actions[button.dataset.action]?.();
      else if (event.target === wrap && !zoomed) close();
    });

    dialog.addEventListener('keydown', event => {
      // Mantiene Tab nel viewer anche quando il browser vorrebbe passare alla
      // propria barra degli strumenti. Il dialog gestisce sempre lo stato modale.
      if (event.key === 'Tab') {
        const controls = [...dialog.querySelectorAll('button:not(:disabled), a[href], input, [tabindex="0"]')]
          .filter(element => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
        return;
      }
      if (event.target.matches('input, textarea, select') || event.ctrlKey || event.metaKey || event.altKey) return;
      const keyboard = { ArrowLeft: 'prev', ArrowRight: 'next', i: 'info', I: 'info', c: 'compare', C: 'compare', z: 'zoom', Z: 'zoom' };
      if (keyboard[event.key]) { event.preventDefault(); actions[keyboard[event.key]](); }
      // Escape e lo stato modale sono gestiti dal dialog nativo.
    });

    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      try {
        const url = new URL(location.href);
        url.hash = originalHash;
        history.replaceState(history.state, '', url);
      } catch (_) { /* Nessun blocco in file://. */ }
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    });

    wrap.addEventListener('touchstart', event => {
      touchStart = !zoomed && event.touches.length === 1
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true });
    wrap.addEventListener('touchend', event => {
      if (!touchStart || zoomed || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(dx < 0 ? 1 : -1);
      touchStart = null;
    }, { passive: true });
    wrap.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });

    return { open, close, isOpen: () => dialog.open };
  };
})();
