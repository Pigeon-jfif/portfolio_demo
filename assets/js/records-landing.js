/** PLASTIC PIZZAS / LANDING LEGGERA
 * Non inizializza il catalogo e non carica le sue copertine.
 * HTTP: aggiorna solo dati/numeri e la coda delle immagini. file://: snapshot.
 * I vecchi link al catalogo e alle schede vengono mantenuti validi.
 */
(() => {
  'use strict';
  if (document.body.dataset.page !== 'records') return;
  const P = window.Pigeon, R = P.records, C = R.config, M = window.PigeonRecordsModel;
  const catalogParams = ['q','format','decade','country','section','edition','artist','letter','order','view','page','perPage'];
  function routeLegacy() {
    const params = new URLSearchParams(location.search);
    const hash = new URLSearchParams(location.hash.replace(/^#/,''));
    if (hash.has('disco') || location.hash === '#catalogo' || location.hash === '#numeri' || catalogParams.some(key => params.has(key))) {
      const url = new URL(P.url(C.collectionFile),location.href);
      url.search = location.search; url.hash = location.hash;
      location.replace(url.href); return true;
    }
    return false;
  }
  if (routeLegacy()) return;
  window.addEventListener('hashchange',routeLegacy);
  const presentation = R.createPresentation?.();
  async function updateSnapshot() {
    if (!C.fetchCSV || location.protocol === 'file:') return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(),C.fetchTimeout);
    try {
      const response = await fetch(P.url(C.csvFile),{cache:'no-cache',signal:controller.signal});
      if (!response.ok) return;
      const next = M.fromRows(M.parseCSV(await response.text()));
      // Stessi dati: nessun reset, neppure della fase dell'animazione.
      if (JSON.stringify(next.map(r => r.raw)) === JSON.stringify(R.all.map(r => r.raw))) return;
      R.all = next;
      const metrics = document.getElementById('records-metrics');
      if (metrics) metrics.innerHTML = R.metrics();
      presentation?.refresh();
    } catch (_) { /* Offline/CSV non valido: mantieni la snapshot gia' leggibile. */ }
    finally { clearTimeout(timer); }
  }
  void updateSnapshot();
})();
