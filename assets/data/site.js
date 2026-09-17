/**
 * SITE.JS - TESTI E IMPOSTAZIONI / v2.1
 * ===================================
 * Modifica i valori sotto, senza toccare virgolette, virgole e parentesi.
 * I testi sono semplici stringhe, non HTML. "" nasconde un valore opzionale.
 * Non occorre Node per vedere le modifiche: salva e aggiorna il browser.
 * Prima di pubblicare: node tools/build.js && node tools/check.js.
 *
 * 01 IDENTITA: nome e contatti. Nessun indirizzo email inventato.
 * 02 HOME: presentazione generale, fotografia e ascolto tenuti distinti.
 *    home.showCollectionsLink = false nasconde il piccolo link in fondo.
 * 03 RACCOLTE: l'unico indice delle fotografie.
 * 04 CHI SONO: biografia e due sezioni separate, fotografia e audio.
 * 05 SETUP: photoGear e audioGear sono riutilizzati in Home e Chi sono.
 * 06-09 CONTATTI, FOOTER, GALLERIA E METADATI.
 *
 * Font e palette: assets/css/theme.css. Font remoto: assets/css/fonts.css.
 * Logo piccolo: assets/favicon.svg (copie riutilizzabili in assets/brand).
 * siteUrl: quando pubblichi, URL completo con / finale e nome repository.
 */
window.PIGEON_SITE = {
  // 01 / IDENTITA E CONTATTI
  "brand": {
    "name": "pigeon",
    "extension": ".jfif",
    "fullName": "pigeon.jfif"
  },
  "siteUrl": "",
  "instagram": "https://www.instagram.com/pigeon.jfif/",
  "instagramLabel": "@pigeon.jfif",
  "email": "",
  "copyrightYear": 2026,
  // 02 / HOME ESSENZIALE - ZERO FOTOGRAFIE
  "home": {
    "eyebrow": "Fotografia / Dischi / Spazio personale",
    "greeting": "Ciao,",
    "greetingAccent": "sono Nico.",
    "intro": "Fotografo per passione, colleziono dischi e ascolto un po’ di tutto.",
    "paragraphs": [
      "Mi piace prendermi il tempo di osservare e fotografare quello che mi colpisce. Allo stesso modo, accumulo dischi da anni e continuo a trovare una scusa per metterne un altro sul piatto.",
      "pigeon.jfif mette insieme entrambe le cose: le mie fotografie e Plastic Pizzas, il mio archivio di vinili. Il resto cresce un po’ alla volta."
    ],
    "photoSystemLabel": "Con cosa scatto.",
    "photoSystemNote": "Una X-T5 e due zoom: uno per quasi tutto, uno quando serve arrivare un po’ più lontano.",
    "audioSystemLabel": "Con cosa ascolto.",
    "audioSystemNote": "Un impianto da scrivania costruito attorno ai vinili, con casse e cuffie a seconda del momento.",
    "showCollectionsLink": true,
    "showRecordsLink": true,
    "recordsLabel": "Esplora i dischi",
    "collectionsLabel": "Sfoglia le raccolte"
  },
  // 03 / RACCOLTE
  "archive": {
    "eyebrow": "Le raccolte / Archivio fotografico",
    "headingFirst": "Ogni uscita,",
    "headingAccent": "un capitolo.",
    "intro": "Luoghi, soggetti e momenti che stanno bene insieme. Qui comincia l’archivio.",
    "noteTitle": "Un po’ alla volta.",
    "note": "L’archivio cresce con le uscite. Ogni raccolta conserva il proprio spazio.",
    "publicationTitle": "Qui, sul sito.",
    "publicationNote": "Per le mie fotografie pubblico copie ottimizzate per il web. I file ad alta qualità restano nel mio archivio personale."
  },
  // 04 / CHI SONO - FOTOGRAFIA E AUDIO RESTANO DUE SETTORI DISTINTI
  "about": {
    "eyebrow": "Chi sono / pigeon.jfif",
    "headingFirst": "Ciao,",
    "headingAccent": "sono Nico.",
    "lead": "Fotografia e musica sono le due cose che finiscono più spesso qui dentro.",
    "paragraphs": [
      "pigeon.jfif è il mio spazio personale: raccolgo quello che fotografo, tengo in ordine i dischi e lascio che le due cose convivano senza dover diventare per forza la stessa cosa.",
      "La parte fotografica cambia molto a seconda di dove mi trovo e di cosa mi passa davanti. Quella musicale gira soprattutto attorno ai vinili, all’ascolto e alla collezione."
    ],
    "photoEyebrow": "Fotografia",
    "photoHeading": "Con cosa scatto.",
    "photoText": "Uso una Fujifilm X-T5 con due zoom. È un setup compatto che mi lascia coperto dalla focale standard al tele senza portarmi dietro mezzo armadio.",
    "audioEyebrow": "Audio",
    "audioHeading": "Con cosa ascolto.",
    "audioText": "La parte audio gira soprattutto attorno ai vinili: giradischi Argon, amplificatore Technics e due Pioneer. Le AKG restano la via cuffie quando non uso le casse."
  },
  // 05 / SETUP FOTOGRAFICO - HOME E CHI SONO
  "photoGear": [
    {
      "kind": "Fotocamera",
      "name": "Fujifilm X-T5",
      "detail": "40,2 MP · APS-C"
    },
    {
      "kind": "Lente 16–55 mm",
      "name": "Fujinon 16–55 mm",
      "detail": "f/2.8 · R · LM · WR"
    },
    {
      "kind": "Lente 55–200 mm",
      "name": "Fujinon 55–200 mm",
      "detail": "f/3.5–4.8 · R · LM · OIS"
    }
  ],
  // 05B / SETUP AUDIO - HOME E CHI SONO
  "audioGear": [
    {
      "kind": "Giradischi 1",
      "name": "Argon Audio TT-3 Plus",
      "detail": "Belt driven · Ortofon 2M Red"
    },
    {
      "kind": "Amplificatore",
      "name": "Technics SU-600",
      "detail": ""
    },
    {
      "kind": "Cuffie",
      "name": "AKG K92",
      "detail": ""
    },
    {
      "kind": "Casse",
      "name": "2× Pioneer CS-557",
      "detail": "3-way · 8 Ohm · 50–70 W"
    }
  ],
  // 06 / CONTATTI E FOOTER
  "contact": {
    "title": "Due parole?",
    "text": "Per salutarmi o scrivermi, mi trovi su Instagram."
  },
  "footer": {
    "message": "Fotografie, dischi. Un po’ alla volta.",
    "note": "Uno spazio personale."
  },
  // 07 / GALLERIA
  // sequence: coppie a pari altezza; trittico verticale quando utile; ~21:9 full-width; singola finale preferibilmente orizzontale.
  // grid: cornici 3:2 invisibili con foto centrate e mai ritagliate.
  // ordine: per categoria oppure casuale; su telefono la Sequenza usa una colonna.
  "gallery": {
    "defaultView": "sequence",
    "rememberView": true,
    "showSearch": true,
    "showCodes": false
  },
  // 08 / VISUALIZZATORE
  "viewer": {
    "enableComparison": true,
    "enableZoom": true,
    "enableShare": true
  },
  // 09 / METADATI
  "meta": {
    "description": "pigeon.jfif. Lo spazio personale di Nico: fotografie e Plastic Pizzas, la collezione di dischi. Fotografo per passione, con Fujifilm.",
    "socialImage": "assets/og-cover.jpg"
  }
};
