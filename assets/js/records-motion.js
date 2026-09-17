/** RECORDS-MOTION.JS / TRE COPERTINE, MOVIMENTO CONTINUO
 * Quattro nodi: tre in vista, uno sotto il bordo destro sfumato.
 * Una sola candidata aggiuntiva viene preparata mentre il nastro si muove.
 * Quattro animazioni native sincronizzate: il browser interpola i transform.
 * JS prepara solo le immagini fuori campo, non scrive coordinate a ogni frame.
 * Ogni anello si richiude mentre la sua copertina e' completamente nascosta.
 * Se la rete ritarda, ricicla fuori campo una cover pronta senza bloccare tutto.
 */
(() => {
  'use strict';
  const R = window.Pigeon?.records;
  if (!R) return;
  const C = R.config;
  const keyOf = R.featuredKey;
  const sourceOf = record => R.coverKey(record,true);
  const numberOption = (value, fallback, min, max) => Number.isFinite(value)
    ? Math.min(max,Math.max(min,value)) : fallback;

  function loadImage(record) {
    if (!sourceOf(record)) return Promise.resolve(false);
    return new Promise(resolve => {
      const image = new Image();
      let done = false;
      const finish = ok => {
        if (done) return;
        done = true; clearTimeout(timer);
        image.onload = image.onerror = null;
        resolve(ok);
      };
      const timer = setTimeout(() => finish(false),numberOption(C.featuredLoadTimeoutMs,4500,1000,15000));
      image.onload = async () => {
        try { if (image.decode) await image.decode(); } catch (_) { /* onload resta valido */ }
        finish(image.naturalWidth > 0);
      };
      image.onerror = () => finish(false);
      image.decoding = 'async'; image.referrerPolicy = 'no-referrer';
      R.resolveCoverURL(record,{small:true}).then(source => {
        if (done || !source) { finish(false); return; }
        image.src = source;
        if (image.complete) queueMicrotask(() => finish(image.naturalWidth > 0));
      }).catch(() => finish(false));
    });
  }

  // Leggere i metadati non scarica le cover. Le richieste alle immagini sono
  // serializzate qui e limitate alle poche posizioni che stanno per entrare.
  class CoverDeck {
    constructor(seeds) {
      this.pool = []; this.signature = ''; this.cursor = 0;
      this.used = new Set(); this.recent = new Map(); this.serial = 0;
      this.loaded = new Set(); this.queue = Promise.resolve();
      this.sync(); seeds.forEach(record => this.remember(record));
    }
    sync() {
      const unique = new Map();
      for (const record of R.all) {
        if (sourceOf(record) && !unique.has(keyOf(record))) unique.set(keyOf(record),record);
      }
      const pool = [...unique.values()];
      const signature = pool.map(record => keyOf(record)+'|'+sourceOf(record)).join('\n');
      if (signature === this.signature) return;
      this.signature = signature; this.pool = pool;
      this.cursor %= Math.max(1,pool.length);
      const valid = new Set(unique.keys());
      this.used = new Set([...this.used].filter(key => valid.has(key)));
    }
    remember(record) {
      const key = keyOf(record);
      this.used.add(key); this.recent.set(key,++this.serial);
    }
    choose(excluded) {
      const available = record => !R.failedCoverURLs.has(sourceOf(record));
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < this.pool.length; i++) {
          const index = (this.cursor+i) % this.pool.length, record = this.pool[index];
          const key = keyOf(record);
          if (!available(record) || excluded.has(key) || this.used.has(key)) continue;
          this.cursor = (index+1) % this.pool.length;
          this.remember(record); return record;
        }
        // Finito il giro: ricomincia, ma non ripescare le cover ancora in campo.
        this.used = new Set(excluded);
      }
      // Catalogo piu' piccolo del nastro: riusa la meno recente, non si blocca.
      const fallback = this.pool.filter(available).sort((a,b) =>
        (this.recent.get(keyOf(a)) || 0) - (this.recent.get(keyOf(b)) || 0))[0];
      if (fallback) this.remember(fallback);
      return fallback || null;
    }
    take(excluded) {
      const task = async () => {
        this.sync();
        for (let attempt = 0; attempt < this.pool.length; attempt++) {
          const record = this.choose(excluded());
          if (!record) return null;
          const source = sourceOf(record);
          if (this.loaded.has(source) || await loadImage(record)) {
            this.loaded.add(source); return record;
          }
          R.failedCoverURLs.add(sourceOf(record));
        }
        return null;
      };
      const result = this.queue.then(task,task);
      this.queue = result.catch(() => null);
      return result;
    }
  }

  R.createPresentation = () => {
    const root = document.querySelector('[data-r-presentation="trio"]');
    if (!root) return null;
    const viewport = root.querySelector('[data-r-motion-viewport]');
    const track = root.querySelector('[data-r-featured-track]');
    const toggle = root.querySelector('[data-r-motion-toggle]');
    if (!viewport || !track || !toggle) return null;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const duration = numberOption(C.featuredAnimationMs,4500,800,60000);
    const cycle = duration * 4;
    const nativeMotion = typeof track.animate === 'function';
    let enabled = C.featuredAutoplay !== false && !(C.featuredRespectReducedMotion && reduced.matches);
    let visible = true, hover = false, focus = false, destroyed = false;
    let ready = false, started = false, running = false, timer = 0;
    let pitch = 1, width = 1, stair = 28, next = null, pending = false;
    const players = new Map(), repairs = new Set();
    const nodes = () => [...track.children];
    const recordOf = node => R.all.find(record => record.id === node.dataset.recordId);
    const deck = new CoverDeck(nodes().map(recordOf).filter(Boolean));
    const excluded = () => new Set([...nodes().map(recordOf).filter(Boolean), ...(next ? [next.record] : [])].map(keyOf));
    const paused = () => !enabled || !visible || document.hidden || hover || focus;
    const localTime = animation => ((Number(animation.currentTime) || 0) % cycle + cycle) % cycle;
    const position = animation => 3 - localTime(animation)/duration;
    const frames = () => [
      {transform:`translate3d(${3*pitch}px,${3*stair}px,0)`},
      {transform:`translate3d(${-pitch}px,${-stair}px,0)`}
    ];

    function updateButton() {
      toggle.textContent = enabled ? 'Pausa' : (started ? 'Riprendi' : 'Avvia');
      toggle.setAttribute('aria-pressed',String(!enabled));
      toggle.setAttribute('aria-label',enabled ? 'Metti in pausa le copertine' : 'Avvia lo scorrimento delle copertine');
    }
    function measure() {
      // Conserva i subpixel: clientWidth arrotonderebbe la misura al pixel intero.
      width = track.getBoundingClientRect().width || 1;
      pitch = width * .34;
      stair = parseFloat(getComputedStyle(viewport).getPropertyValue('--r-stair')) || 28;
      // Cambia solo la geometria, mai la fase: nessun riavvio al resize.
      for (const {animation} of players.values()) animation.effect.setKeyframes(frames());
      if (ready) { slots(); schedule(); }
    }
    function mark(node) {
      node.querySelectorAll('[data-r-cover]').forEach(image => {
        if (image.complete && image.naturalWidth > 0) image.closest('.r-art')?.classList.add('r-art--loaded');
      });
    }
    function make(record,slot = 3) {
      const template = document.createElement('template');
      template.innerHTML = R.featuredCard(record,slot,slot+1);
      const node = template.content.firstElementChild;
      node.dataset.motionSource = sourceOf(record);
      mark(node); return node;
    }
    async function prepared(record,slot = 3) {
      const node = make(record,slot);
      const image = node.querySelector('[data-r-cover]');
      // Anche l'elemento che entrera' in pagina riceve il Blob URL e viene
      // decodificato prima di comparire; CoverDeck ha gia' verificato la risorsa.
      if (image) await R.loadCover(image);
      try { if (image?.decode) await image.decode(); } catch (_) { /* onload e' sufficiente */ }
      mark(node); return node;
    }
    function attach(node,index) {
      const animation = node.animate(frames(),{duration:cycle,iterations:Infinity,easing:'linear',fill:'both'});
      animation.pause();
      animation.currentTime = (3-index)*duration;
      players.set(node,{animation,lastSwap:0});
    }
    function slots() {
      const ordered = nodes().map((node,index) => ({node,x:players.has(node) ? position(players.get(node).animation)*pitch : index*pitch})).sort((a,b) => a.x-b.x);
      let number = 0;
      for (const {node,x} of ordered) {
        const inView = x < width && x + width*.32 > 0;
        node.dataset.slot = String(inView ? number : 3);
        const label = node.querySelector('[data-r-featured-number]');
        if (label) label.textContent = inView && number < 3 ? String(number+1).padStart(2,'0') : '';
        if (inView) { node.removeAttribute('aria-hidden'); node.removeAttribute('tabindex'); number++; }
        else { node.setAttribute('aria-hidden','true'); node.tabIndex = -1; }
      }
    }
    function replaceContent(node,replacement) {
      // L'ancora e la sua animazione restano le stesse. Cambiano solo i figli
      // gia' pronti, mentre la copertina e' interamente dietro lo sfondo.
      node.href = replacement.getAttribute('href');
      node.setAttribute('aria-label',replacement.getAttribute('aria-label') || '');
      node.dataset.recordId = replacement.dataset.recordId;
      node.dataset.motionSource = replacement.dataset.motionSource;
      node.replaceChildren(...replacement.childNodes);
    }
    async function prefetch() {
      if (pending || next || destroyed) return;
      pending = true;
      try {
        const record = await deck.take(excluded);
        if (record && !destroyed) {
          const node = await prepared(record);
          if (!destroyed) next = {record,node};
        }
      } finally { pending = false; }
      if (ready && !destroyed) { recycleHidden(); schedule(); }
    }
    function recycleHidden() {
      if (!next || destroyed) return;
      for (const [node,player] of players) {
        const time = Number(player.animation.currentTime) || 0;
        const lap = Math.floor((time + duration*.06)/cycle);
        const x = position(player.animation)*pitch;
        // Finestra di ricambio ai due lati, con mezzo pixel di sicurezza.
        // Un timer in ritardo NON cambia mai una cover che e' gia' rientrata.
        const outside = x + width*.32 <= -.5 || x >= width+.5;
        if (!outside || lap <= player.lastSwap) continue;
        const replacement = next; next = null;
        player.lastSwap = lap;
        replaceContent(node,replacement.node);
        slots(); void prefetch();
        break;
      }
    }
    function schedule() {
      clearTimeout(timer); timer = 0;
      if (!running || destroyed || !players.size) return;
      // Pochi risvegli per giro: ingresso/uscita per tastiera e cambio immagine.
      // Non c'e' nessun ciclo requestAnimationFrame che aggiorna i transform.
      const events = [duration*(3-width/pitch)+2, duration*(3+width*.32/pitch)+2, cycle-duration*.03];
      let wait = cycle;
      for (const {animation} of players.values()) {
        const time = localTime(animation);
        for (const event of events) {
          let remaining = (event-time+cycle)%cycle;
          if (remaining < 8) remaining += cycle;
          wait = Math.min(wait,remaining);
        }
      }
      timer = setTimeout(() => { recycleHidden(); slots(); schedule(); },Math.max(8,wait));
    }
    function wake() {
      if (destroyed) return;
      const canRun = ready && nativeMotion && players.size === 4 && !paused();
      root.dataset.motionState = !ready ? 'loading' : !nodes().length ? 'empty' : !nativeMotion ? 'static' : canRun ? 'running' : 'paused';
      viewport.classList.toggle('is-moving',canRun);
      if (canRun !== running) {
        running = canRun;
        if (running) {
          // Un'origine temporale comune: le quattro cover non possono sfasarsi.
          const now = document.timeline.currentTime;
          for (const {animation} of players.values()) {
            const held = Number(animation.currentTime) || 0;
            animation.play();
            animation.startTime = now-held;
          }
          started = true;
        } else {
          for (const {animation} of players.values()) {
            const held = Number(animation.currentTime) || 0;
            animation.pause(); animation.currentTime = held;
          }
        }
      }
      if (ready) { recycleHidden(); slots(); }
      schedule();
    }
    async function repair(node) {
      if (!node?.isConnected || repairs.has(node) || destroyed) return;
      repairs.add(node);
      try {
        const record = await deck.take(excluded);
        if (destroyed || !node.isConnected) return;
        if (record) {
          const replacement = await prepared(record,Number(node.dataset.slot) || 0);
          if (destroyed || !node.isConnected) return;
          replaceContent(node,replacement);
        } else {
          players.get(node)?.animation.cancel(); players.delete(node); node.remove();
        }
        slots(); root.dataset.empty = String(!nodes().length);
      } finally { repairs.delete(node); wake(); }
    }
    async function bootstrap() {
      // Le tre cover statiche arrivano subito. Non scandiamo tutte le immagini.
      for (const node of nodes()) {
        if (destroyed) return;
        const record = recordOf(node);
        if (!record) { node.remove(); continue; }
        node.dataset.motionSource = sourceOf(record);
        const image = node.querySelector('[data-r-cover]');
        if (image && await R.loadCover(image)) { deck.loaded.add(sourceOf(record)); mark(node); }
        else { R.failedCoverURLs.add(sourceOf(record)); await repair(node); }
      }
      while (nativeMotion && track.children.length < 4 && !destroyed) {
        const record = await deck.take(excluded);
        if (!record) break;
        const node = await prepared(record,track.children.length);
        if (destroyed) return;
        track.append(node);
      }
      if (destroyed) return;
      measure(); nodes().forEach(mark);
      if (nativeMotion && track.children.length === 4) nodes().forEach(attach);
      else if (!nativeMotion) toggle.hidden = true;
      ready = true; root.dataset.empty = String(!nodes().length);
      wake(); void prefetch();
    }
    root.addEventListener('load',event => {
      if (event.target.matches?.('[data-r-cover]')) event.target.closest('.r-art')?.classList.add('r-art--loaded');
    },true);
    root.addEventListener('error',event => {
      if (!ready || !event.target.matches?.('[data-r-cover]')) return;
      const node = event.target.closest('[data-r-featured-card]');
      const record = node && recordOf(node);
      if (record) R.failedCoverURLs.add(sourceOf(record));
      void repair(node);
    },true);
    toggle.addEventListener('click',() => { enabled = !enabled; updateButton(); wake(); });
    if (C.featuredPauseOnHover) {
      viewport.addEventListener('pointerenter',event => { if (event.pointerType !== 'touch') { hover = true; wake(); } });
      viewport.addEventListener('pointerleave',() => { hover = false; wake(); });
    }
    viewport.addEventListener('focusin',() => { focus = true; wake(); });
    viewport.addEventListener('focusout',() => { queueMicrotask(() => { focus = viewport.contains(document.activeElement); wake(); }); });
    const onVisibility = () => wake();
    document.addEventListener('visibilitychange',onVisibility);
    const onReduced = () => {
      if (C.featuredRespectReducedMotion) { enabled = !reduced.matches; updateButton(); wake(); }
    };
    reduced.addEventListener?.('change',onReduced);
    const intersection = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting; wake();
    },{threshold:0}) : null;
    intersection?.observe(root);
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    resize?.observe(viewport);
    if (!resize) window.addEventListener('resize',measure);
    updateButton(); measure(); void bootstrap();

    return {
      refresh() {
        deck.sync();
        if (!ready) return;
        for (const node of nodes()) {
          const record = recordOf(node);
          if (!record || node.dataset.motionSource !== sourceOf(record)) void repair(node);
        }
        if (next && !R.all.some(record => record.id === next.record.id && sourceOf(record) === sourceOf(next.record))) next = null;
        void prefetch();
      },
      destroy() {
        destroyed = true; clearTimeout(timer);
        for (const {animation} of players.values()) animation.cancel();
        players.clear(); intersection?.disconnect(); resize?.disconnect();
        document.removeEventListener('visibilitychange',onVisibility);
        window.removeEventListener('resize',measure);
        reduced.removeEventListener?.('change',onReduced);
      }
    };
  };
})();
