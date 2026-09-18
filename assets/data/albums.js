/**
 * ALBUMS.JS - RACCOLTE, ORDINE, COPERTINE, FILTRI
 * =============================================
 * Un oggetto = una raccolta. L'ordine dell'array e' l'ordine nell'archivio.
 * photoIds determina l'ordine curatoriale di base (i codici sono in photos.js).
 * La Sequenza accoppia le foto a pari altezza, puo usare un trittico di verticali
 * e riordina localmente la coda per evitare una verticale singola quando possibile.
 * Le ~21:9 occupano una riga intera. Il controllo ordine puo raggruppare per categoria
 * o mescolare casualmente; dentro una categoria parte comunque da photoIds.
 * Le copertine si alternano a sinistra/destra automaticamente (in ordine).
 * coverId sceglie come copertina una foto gia' presente nella raccolta.
 * cover permette invece una copertina dedicata (es. un crop solo per Raccolte):
 * { file, thumb, width, height, thumbWidth, alt }. Usa cover OPPURE coverId.
 * filters contiene solo id e label: i pulsanti sono DENTRO ogni raccolta.
 * dateLabel/monthLabel/year: lascia vuoti quando non conosci la data.
 * sequence.portraitRowPattern puo' dare un ritmo 3/2 a raccolte tutte verticali.
 * published:false toglie l'album dall'interfaccia; NON rende privati i suoi file.
 * page: "" usa album.html?id=IL-TUO-ID, senza creare un altro HTML.
 * page: "serie/nome.html" abilita una pagina dedicata creata da tools/build.js.
 * Dopo modifiche: aggiorna il browser. Prima di pubblicare: node tools/build.js.
 * Modello da duplicare: templates/ALBUM.txt.
 */
window.PIGEON_ALBUMS = [
  {
    "id": "jesolo-2026",
    "published": true,
    "page": "serie/jesolo.html",
    "title": "Air Show — Jesolo",
    "headingFirst": "Air Show",
    "headingAccent": "Jesolo",
    "category": "Aviazione",
    "location": "Jesolo, Italia",
    "dateLabel": "11–12 settembre 2026",
    "monthLabel": "Settembre 2026",
    "year": 2026,
    "description": "Due giorni con gli occhi al cielo: Frecce, Eurofighter, F-35, trasporti e altri passaggi che valeva la pena tenere.",
    "shortDescription": "Frecce, Eurofighter, F-35 e altri passaggi dal Jesolo Air Show.",
    "coverId": "JES-009",
    "filters": [
      { "id": "frecce", "label": "Frecce" },
      { "id": "efa", "label": "Eurofighter" },
      { "id": "f35", "label": "F-35" },
      { "id": "altro", "label": "Altro" }
    ],
    "photoIds": [
      "JES-013", "JES-015",
      "JES-016", "JES-017", "JES-018", "JES-019",
      "JES-020", "JES-021", "JES-022", "JES-023", "JES-024", "JES-001", "JES-025", "JES-003", "JES-026", "JES-027", "JES-028", "JES-029", "JES-030", "JES-031",
      "JES-032", "JES-033", "JES-034", "JES-035", "JES-036",
      "JES-012", "JES-014", "JES-040", "JES-039",
      "JES-005", "JES-006", "JES-037", "JES-038", "JES-007", "JES-008", "JES-009", "JES-011"
    ],
    "footnote": "Alcuni fotogrammi hanno due tagli diversi. Apri una foto e usa “Confronta”, quando disponibile, per guardarli insieme."
  },
  {
    "id": "birbs-noale-verona",
    "published": true,
    "page": "serie/birbs-noale-verona.html",
    "title": "Birbs — Noale & Verona",
    "headingFirst": "Birbs",
    "headingAccent": "Noale & Verona",
    "category": "Animali",
    "location": "Noale & Verona, Italia",
    "dateLabel": "",
    "monthLabel": "",
    "year": "",
    "description": "Due passeggiate lontane nel tempo, tra Noale e Verona, tenendo gli occhi all’altezza dell’acqua: germani, gabbiani, piccioni e altri incontri.",
    "shortDescription": "Piume, riflessi e piccoli incontri tra Noale e Verona.",
    "coverId": "BNV-001",
    "filters": [
      {
        "id": "anatre",
        "label": "Anatre"
      },
      {
        "id": "gabbiani",
        "label": "Gabbiani"
      },
      {
        "id": "piccioni",
        "label": "Piccioni"
      },
      {
        "id": "altri",
        "label": "Altri incontri"
      }
    ],
    "photoIds": [
      "BNV-001",
      "BNV-002",
      "BNV-003",
      "BNV-010",
      "BNV-012",
      "BNV-013",
      "BNV-007",
      "BNV-014",
      "BNV-004",
      "BNV-005",
      "BNV-008",
      "BNV-011",
      "BNV-006",
      "BNV-009"
    ],
    "footnote": ""
  },
  {
    "id": "street-pordenone-verona",
    "published": true,
    "page": "serie/street-pordenone-verona.html",
    "title": "Street — Pordenone & Verona",
    "headingFirst": "Street",
    "headingAccent": "Pordenone & Verona",
    "category": "Street",
    "location": "Pordenone & Verona, Italia",
    "dateLabel": "",
    "monthLabel": "",
    "year": "",
    "description": "Due città percorse guardando in alto e ai margini: vicoli, torri, biciclette, insegne, statue e piccoli dettagli che tengono insieme la strada.",
    "shortDescription": "Vicoli, torri, biciclette e dettagli urbani tra Pordenone e Verona.",
    "sequence": {
      "portraitRowPattern": [3, 2]
    },
    "cover": {
      "file": "assets/photos/street-pordenone-verona/cover/SPV-COVER.webp",
      "thumb": "assets/photos/street-pordenone-verona/cover/SPV-COVER-thumb.webp",
      "width": 2047,
      "height": 1365,
      "thumbWidth": 960,
      "alt": "Campanile in pietra incorniciato da rami sfocati, sotto un cielo azzurro."
    },
    "filters": [
      {
        "id": "strada",
        "label": "Strada"
      },
      {
        "id": "architetture",
        "label": "Architetture"
      },
      {
        "id": "dettagli",
        "label": "Dettagli"
      }
    ],
    "photoIds": [
      "SPV-001",
      "SPV-006",
      "SPV-012",
      "SPV-010",
      "SPV-011",
      "SPV-002",
      "SPV-007",
      "SPV-008",
      "SPV-005",
      "SPV-004",
      "SPV-003",
      "SPV-013",
      "SPV-014",
      "SPV-009",
      "SPV-015"
    ],
    "footnote": "Quattro export di Pordenone non conservano gli EXIF tecnici di scatto: i campi mancanti restano vuoti."
  }
];
