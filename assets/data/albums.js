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
 * coverId sceglie la copertina mostrata nella pagina Raccolte.
 * filters contiene solo id e label: i pulsanti sono DENTRO ogni raccolta.
 * dateLabel/monthLabel/year: lascia vuoti quando non conosci la data.
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
    "title": "Jesolo Air Show",
    "headingFirst": "Jesolo",
    "headingAccent": "Air Show.",
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
    "id": "birbs-of-noale",
    "published": true,
    "page": "serie/birbs-of-noale.html",
    "title": "Birbs of Noale",
    "headingFirst": "Birbs of",
    "headingAccent": "Noale.",
    "category": "Animali",
    "location": "Noale",
    "dateLabel": "",
    "monthLabel": "",
    "year": "",
    "description": "Piccoli incontri, da vicino. Sguardi, piume e riflessi lungo l’acqua.",
    "shortDescription": "Anatre, piccioni e altri incontri. Un giro a Noale, all’altezza dei birbs.",
    "coverId": "NOA-005",
    "filters": [
      {
        "id": "anatre",
        "label": "Anatre"
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
      "NOA-005",
      "NOA-001",
      "NOA-002",
      "NOA-003",
      "NOA-004",
      "NOA-008",
      "NOA-006",
      "NOA-007",
      "NOA-009"
    ],
    "footnote": ""
  },
  {
    "id": "conegliano-photo-safari",
    "published": true,
    "page": "serie/conegliano.html",
    "title": "Photo Safari Conegliano",
    "headingFirst": "Photo Safari",
    "headingAccent": "Conegliano.",
    "category": "Street",
    "location": "Conegliano, Italia",
    "dateLabel": "",
    "monthLabel": "",
    "year": "",
    "description": "Un giro a Conegliano tra barriere, dettagli, architettura e qualche momento dietro le quinte.",
    "shortDescription": "Barriere, dettagli urbani e piccoli momenti da un Photo Safari a Conegliano.",
    "coverId": "CON-005",
    "filters": [
      {
        "id": "urbano",
        "label": "Urbano"
      },
      {
        "id": "persone",
        "label": "Persone"
      },
      {
        "id": "dettagli",
        "label": "Dettagli"
      }
    ],
    "photoIds": [
      "CON-002",
      "CON-003",
      "CON-004",
      "CON-006",
      "CON-001",
      "CON-005",
      "CON-007"
    ],
    "footnote": ""
  }
];
