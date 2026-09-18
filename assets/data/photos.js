/**
 * PHOTOS.JS - IL CATALOGO DEGLI SCATTI
 * =================================
 * Qui cambi titoli, descrizioni, file e dati di scatto. Non serve toccare il JS.
 * Ogni id (es. JES-001) e' stabile: e' usato da album, link e confronti.
 * Per l'ordine nella raccolta modifica albums.js, NON l'id della foto.
 *
 * file / thumb        : percorsi dalla radice del sito, senza / iniziale.
 * width / height      : pixel del FILE WEB effettivamente pubblicato (full o large).
 * referenceExport     : pixel dell'export dichiarato, NON del file web pubblicato.
 * location            : luogo del singolo scatto; utile per raccolte che uniscono piu citta.
 * capture             : parametri confermati del singolo scatto; "" = non noto.
 * Impaginazione        : automatica; coppie, trittici verticali quando utili, panoramiche full-width.
 * pairId              : id dell'altro taglio; relazione reciproca. "" = nessuno.
 * variant             : "wide" o "crop"; non indica RAW o master senza modifiche.
 * sourceFile          : nome precedente, utile per ritrovare il tuo originale.
 *
 * IMPORTANTE: ISO/tempo/diaframma non sono stati dedotti dal setup generale.
 * Gli export ricevuti possono non contenere EXIF utili. I campi ignoti sono lasciati vuoti.
 * Le dimensioni di referenceExport provengono dalle tue indicazioni in chat.
 * SOLO copie web gia' firmate. Mai master FQ, RAW o export senza tag.
 * Qualsiasi file sul sito sara' pubblico, anche se non elencato nel catalogo.
 * Modello pronto in templates/FOTO.txt. Mappa completa in Structure.txt.
 */
window.PIGEON_PHOTOS = [
  // ------------------------------------------------------------------
  // JES-001 | Aria, metallo, luce | _DSF5259_wm.jpg
  {
    "id": "JES-001",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF5259_wm.jpg",
    "title": "Aria, metallo, luce",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter in virata tra grandi nuvole, con i motori accesi e molto cielo intorno.",
    "note": "Il jet, i motori accesi e lo spazio delle nuvole.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-001.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-001.webp",
    "width": 2400,
    "height": 1029,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7096,
      "height": 3042
    }
  },

  // ------------------------------------------------------------------
  // JES-003 | Anatomia di un passaggio | _DSF7511_1_wm.jpg
  {
    "id": "JES-003",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF7511_1_wm.jpg",
    "title": "Anatomia di un passaggio",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter visto da molto vicino dal basso, con ala a delta, fusoliera e motori che riempiono il fotogramma.",
    "note": "Un taglio stretto sull’Eurofighter, quasi tutto macchina.",
    "variant": "crop",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-003.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-003.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/1000 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 3976,
      "height": 2656
    }
  },

  // ------------------------------------------------------------------
  // JES-005 | Insieme | _DSF8508_wm.jpg
  {
    "id": "JES-005",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8508_wm.jpg",
    "title": "Insieme",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Formazione delle Frecce Tricolori in diagonale, seguita da scie bianche.",
    "note": "La geometria del gruppo e le scie bianche.",
    "variant": "wide",
    "pairId": "JES-006",
    "file": "assets/photos/jesolo-2026/full/JES-005.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-005.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "63.8 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    }
  },

  // ------------------------------------------------------------------
  // JES-006 | Uno, tra gli altri | _DSF8508_1_wm.jpg
  {
    "id": "JES-006",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8508_1_wm.jpg",
    "title": "Uno, tra gli altri",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Una Freccia al centro, circondata da porzioni degli altri aerei della formazione.",
    "note": "Un altro taglio di Insieme: un velivolo al centro della formazione.",
    "variant": "crop",
    "pairId": "JES-005",
    "file": "assets/photos/jesolo-2026/full/JES-006.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-006.webp",
    "width": 2062,
    "height": 1378,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "63.8 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 2062,
      "height": 1378
    }
  },

  // ------------------------------------------------------------------
  // JES-007 | Verso l’alto | _DSF8518_wm.jpg
  {
    "id": "JES-007",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8518_wm.jpg",
    "title": "Verso l’alto",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Frecce Tricolori dirette verso la parte alta del fotogramma, con lunghe scie colorate.",
    "note": "Il tricolore disegna una direzione nel cielo.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-007.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-007.webp",
    "width": 2400,
    "height": 1600,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 6904,
      "height": 4603
    }
  },

  // ------------------------------------------------------------------
  // JES-008 | Disegnare il cielo | _DSF9270_wm.jpg
  {
    "id": "JES-008",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF9270_wm.jpg",
    "title": "Disegnare il cielo",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Frecce Tricolori disposte ad arco, con scie verdi, bianche e rosse sul cielo blu.",
    "note": "Aerei e scie diventano una sola composizione.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-008.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-008.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "70.5 mm",
      "aperture": "f/5.6",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    }
  },

  // ------------------------------------------------------------------
  // JES-009 | La curva | _DSF9275_wm.jpg
  {
    "id": "JES-009",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF9275_wm.jpg",
    "title": "La curva",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Formazione in curva sulla destra, con ampie scie tricolori che attraversano il cielo.",
    "note": "Il colore si allarga, la formazione traccia un arco.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-009.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-009.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "55 mm",
      "aperture": "f/5.6",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    }
  },

  // ------------------------------------------------------------------
  // JES-011 | Passaggio II | _DSF9332_wm.jpg
  {
    "id": "JES-011",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF9332_wm.jpg",
    "title": "Passaggio II",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Frecce Tricolori di profilo in una formazione compatta, con scie e nuvole sullo sfondo.",
    "note": "La formazione di profilo, tra nuvole e scie.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-011.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-011.webp",
    "width": 2400,
    "height": 1500,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "134.5 mm",
      "aperture": "f/5.6",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 4845
    }
  },

  // ------------------------------------------------------------------
  // JES-012 | Solista, di profilo | _DSF2105_wm.jpg
  {
    "id": "JES-012",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF2105_wm.jpg",
    "title": "Solista, di profilo",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Velivolo delle Frecce Tricolori in volo di profilo, con livrea tricolore e cielo velato.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-012.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-012.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/7.1",
      "shutter": "1/1000 s",
      "iso": "250",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 6497,
      "height": 4340
    }
  },

  // ------------------------------------------------------------------
  // JES-013 | Acrobazia nel blu | _DSF2114_wm.jpg
  {
    "id": "JES-013",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF2114_wm.jpg",
    "title": "Acrobazia nel blu",
    "subject": "Acrobazia",
    "filter": "altro",
    "alt": "Piccolo aereo acrobatico in volo nel cielo azzurro, ripreso da lontano.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-013.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-013.webp",
    "width": 2400,
    "height": 1350,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/1000 s",
      "iso": "250",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7561,
      "height": 4253
    }
  },

  // ------------------------------------------------------------------
  // JES-014 | Passaggio del solista | _DSF2121_wm.jpg
  {
    "id": "JES-014",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF2121_wm.jpg",
    "title": "Passaggio del solista",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Velivolo delle Frecce Tricolori di profilo sopra una fascia di nuvole.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-014.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-014.webp",
    "width": 2400,
    "height": 1029,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/1000 s",
      "iso": "250",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 3323
    }
  },

  // ------------------------------------------------------------------
  // JES-015 | Rotore | _DSF2420_wm.jpg
  {
    "id": "JES-015",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF2420_wm.jpg",
    "title": "Rotore",
    "subject": "Carabinieri",
    "filter": "altro",
    "alt": "Elicottero dei Carabinieri in volo di profilo, con il rotore in movimento sul cielo blu.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-015.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-015.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/16",
      "shutter": "1/125 s",
      "iso": "500",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 6108,
      "height": 4080
    }
  },

  // ------------------------------------------------------------------
  // JES-016 | Spartan, da vicino | _DSF4636_wm.jpg
  {
    "id": "JES-016",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF4636_wm.jpg",
    "title": "Spartan, da vicino",
    "subject": "C-27J Spartan",
    "filter": "altro",
    "alt": "C-27J Spartan in volo visto dal basso e di tre quarti, grande nel fotogramma.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-016.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-016.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/5.6",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 6647,
      "height": 4440
    }
  },

  // ------------------------------------------------------------------
  // JES-017 | Sotto lo Spartan | _DSF4718_wm.jpg
  {
    "id": "JES-017",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF4718_wm.jpg",
    "title": "Sotto lo Spartan",
    "subject": "C-27J Spartan",
    "filter": "altro",
    "alt": "C-27J Spartan visto dal basso durante una virata, con le due eliche ben visibili.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-017.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-017.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "181.1 mm",
      "aperture": "f/7.1",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    }
  },

  // ------------------------------------------------------------------
  // JES-018 | Tra le nuvole | _DSF4805_wm.jpg
  {
    "id": "JES-018",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF4805_wm.jpg",
    "title": "Tra le nuvole",
    "subject": "C-27J Spartan",
    "filter": "altro",
    "alt": "C-27J Spartan in virata davanti a grandi nuvole bianche e azzurre.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-018.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-018.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/7.1",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    }
  },

  // ------------------------------------------------------------------
  // JES-019 | In virata | _DSF4819_wm.jpg
  {
    "id": "JES-019",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF4819_wm.jpg",
    "title": "In virata",
    "subject": "C-27J Spartan",
    "filter": "altro",
    "alt": "C-27J Spartan inclinato in virata, ripreso dal basso con cielo e nuvole sullo sfondo.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-019.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-019.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/7.1",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7426,
      "height": 4961
    }
  },

  // ------------------------------------------------------------------
  // JES-020 | Bank tra le nuvole | _DSF5124_wm.jpg
  {
    "id": "JES-020",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF5124_wm.jpg",
    "title": "Bank tra le nuvole",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter in forte bank sotto un cielo pieno di nuvole.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-020.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-020.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7099,
      "height": 4742
    }
  },

  // ------------------------------------------------------------------
  // JES-021 | Virata alta | _DSF5126_wm.jpg
  {
    "id": "JES-021",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF5126_wm.jpg",
    "title": "Virata alta",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter inclinato in virata nella parte alta del cielo, con nuvole sullo sfondo.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-021.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-021.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7630,
      "height": 5097
    }
  },

  // ------------------------------------------------------------------
  // JES-022 | Sotto | _DSF5140_wm.jpg
  {
    "id": "JES-022",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF5140_wm.jpg",
    "title": "Sotto",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter visto quasi interamente dal basso durante una virata.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-022.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-022.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7191,
      "height": 4803
    }
  },

  // ------------------------------------------------------------------
  // JES-023 | Profilo nel cielo | _DSF5163_wm.jpg
  {
    "id": "JES-023",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF5163_wm.jpg",
    "title": "Profilo nel cielo",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter ripreso di profilo e dal basso, con una fascia di nuvole dietro.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-023.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-023.webp",
    "width": 2400,
    "height": 1029,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 3323
    }
  },

  // ------------------------------------------------------------------
  // JES-024 | Motori e nuvole | _DSF5209_wm.jpg
  {
    "id": "JES-024",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF5209_wm.jpg",
    "title": "Motori e nuvole",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter in virata con la parte posteriore e i motori ben visibili davanti alle nuvole.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-024.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-024.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    }
  },

  // ------------------------------------------------------------------
  // JES-025 | Delta | _DSF5290_wm.jpg
  {
    "id": "JES-025",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF5290_wm.jpg",
    "title": "Delta",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter visto dal basso con l’ala a delta leggibile contro il cielo.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-025.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-025.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7052,
      "height": 4711
    }
  },

  // ------------------------------------------------------------------
  // JES-026 | Nel blu | _DSF7541_wm.jpg
  {
    "id": "JES-026",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF7541_wm.jpg",
    "title": "Nel blu",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter di profilo su un cielo blu pulito, con il postbruciatore visibile.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-026.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-026.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/1000 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7598,
      "height": 5075
    }
  },

  // ------------------------------------------------------------------
  // JES-027 | Passaggio | _DSF7743_wm.jpg
  {
    "id": "JES-027",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF7743_wm.jpg",
    "title": "Passaggio",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter in passaggio laterale, piccolo nel fotogramma e isolato nel cielo blu.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-027.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-027.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/1000 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 6806,
      "height": 4547
    }
  },

  // ------------------------------------------------------------------
  // JES-028 | Postbruciatore | _DSF7788_wm.jpg
  {
    "id": "JES-028",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF7788_wm.jpg",
    "title": "Postbruciatore",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter in salita diagonale con il postbruciatore acceso.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-028.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-028.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7427,
      "height": 4961
    }
  },

  // ------------------------------------------------------------------
  // JES-029 | Lontano | _DSF7798_wm.jpg
  {
    "id": "JES-029",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF7798_wm.jpg",
    "title": "Lontano",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter in volo diagonale, ripreso più lontano su un cielo uniforme.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-029.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-029.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7618,
      "height": 5089
    }
  },

  // ------------------------------------------------------------------
  // JES-030 | Dal basso | _DSF7821_wm.jpg
  {
    "id": "JES-030",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF7821_wm.jpg",
    "title": "Dal basso",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter visto direttamente dal basso, con la geometria dell’ala a delta in evidenza.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-030.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-030.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 6813,
      "height": 4551
    }
  },

  // ------------------------------------------------------------------
  // JES-031 | Profilo ravvicinato | _DSF7943_wm.jpg
  {
    "id": "JES-031",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF7943_wm.jpg",
    "title": "Profilo ravvicinato",
    "subject": "Eurofighter",
    "filter": "efa",
    "alt": "Eurofighter ripreso lateralmente e da vicino, con fusoliera e ala ben leggibili.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-031.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-031.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7163,
      "height": 4784
    }
  },

  // ------------------------------------------------------------------
  // JES-032 | Scia | _DSF8025_wm.jpg
  {
    "id": "JES-032",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8025_wm.jpg",
    "title": "Scia",
    "subject": "F-35",
    "filter": "f35",
    "alt": "F-35 ripreso da dietro durante il passaggio, con sottili scie che si formano alle estremità.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-032.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-032.webp",
    "width": 2400,
    "height": 1350,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7275,
      "height": 4093
    }
  },

  // ------------------------------------------------------------------
  // JES-033 | Ombra | _DSF8049_wm.jpg
  {
    "id": "JES-033",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8049_wm.jpg",
    "title": "Ombra",
    "subject": "F-35",
    "filter": "f35",
    "alt": "F-35 visto dal basso come una sagoma scura contro il cielo blu.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-033.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-033.webp",
    "width": 2400,
    "height": 1350,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7120,
      "height": 4005
    }
  },

  // ------------------------------------------------------------------
  // JES-034 | Vicino | _DSF8105_wm.jpg
  {
    "id": "JES-034",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8105_wm.jpg",
    "title": "Vicino",
    "subject": "F-35",
    "filter": "f35",
    "alt": "F-35 ripreso da vicino dal basso e di tre quarti, con la fusoliera ben visibile.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-034.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-034.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/5.6",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 6930,
      "height": 4629
    }
  },

  // ------------------------------------------------------------------
  // JES-035 | Salita | _DSF8117_wm.jpg
  {
    "id": "JES-035",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8117_wm.jpg",
    "title": "Salita",
    "subject": "F-35",
    "filter": "f35",
    "alt": "F-35 inclinato verso l’alto durante una salita sul cielo blu.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-035.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-035.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/5.6",
      "shutter": "1/2000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7276,
      "height": 4861
    }
  },

  // ------------------------------------------------------------------
  // JES-036 | Passaggio F-35 | _DSF8123_wm.jpg
  {
    "id": "JES-036",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8123_wm.jpg",
    "title": "Passaggio F-35",
    "subject": "F-35",
    "filter": "f35",
    "alt": "F-35 in passaggio laterale, ripreso da dietro con una breve traccia nell’aria.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-036.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-036.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "134.5 mm",
      "aperture": "f/5.6",
      "shutter": "1/8000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7112,
      "height": 4751
    }
  },

  // ------------------------------------------------------------------
  // JES-037 | Compatta | _DSF8549_wm.jpg
  {
    "id": "JES-037",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8549_wm.jpg",
    "title": "Compatta",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Formazione compatta delle Frecce Tricolori vista dal basso sul cielo blu.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-037.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-037.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    }
  },

  // ------------------------------------------------------------------
  // JES-038 | Scie parallele | _DSF8633_wm.jpg
  {
    "id": "JES-038",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8633_wm.jpg",
    "title": "Scie parallele",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Frecce Tricolori distribuite su più livelli, accompagnate da scie bianche e colorate.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-038.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-038.webp",
    "width": 2400,
    "height": 1350,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "115.9 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 4361
    }
  },

  // ------------------------------------------------------------------
  // JES-039 | Incrocio | _DSF8646_wm.jpg
  {
    "id": "JES-039",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8646_wm.jpg",
    "title": "Incrocio",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Due velivoli delle Frecce Tricolori si incrociano nel cielo, uno sopra l’altro.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-039.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-039.webp",
    "width": 2400,
    "height": 1350,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7356,
      "height": 4138
    }
  },

  // ------------------------------------------------------------------
  // JES-040 | Solista | _DSF8714_wm.jpg
  {
    "id": "JES-040",
    "albumId": "jesolo-2026",
    "sourceFile": "_DSF8714_wm.jpg",
    "title": "Solista",
    "subject": "Frecce Tricolori",
    "filter": "frecce",
    "alt": "Velivolo delle Frecce Tricolori ripreso molto da vicino dal basso, con la livrea tricolore in evidenza.",
    "note": "",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/jesolo-2026/full/JES-040.webp",
    "thumb": "assets/photos/jesolo-2026/thumbs/JES-040.webp",
    "width": 2400,
    "height": 1350,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/6.4",
      "shutter": "1/2000 s",
      "iso": "640",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7327,
      "height": 4121
    }
  },

  // ------------------------------------------------------------------
  // BNV-001 | Dal parapetto | DSCF1062_wm.jpg
  {
    "id": "BNV-001",
    "albumId": "birbs-noale-verona",
    "sourceFile": "DSCF1062_wm.jpg",
    "title": "Dal parapetto",
    "subject": "Germano reale",
    "filter": "anatre",
    "alt": "Germano reale femmina ripreso dall’alto mentre nuota vicino a un parapetto, nell’acqua scura.",
    "note": "Una traiettoria semplice nell’acqua, vista quasi in verticale.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-001.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-001.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "134.5 mm",
      "aperture": "f/4.4",
      "shutter": "1/500 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5178,
      "height": 3459
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-002 | Battere le ali | DSCF1138_wm.jpg
  {
    "id": "BNV-002",
    "albumId": "birbs-noale-verona",
    "sourceFile": "DSCF1138_wm.jpg",
    "title": "Battere le ali",
    "subject": "Germano reale",
    "filter": "anatre",
    "alt": "Germano reale maschio nell’acqua con le ali aperte e mosse, rese morbide dal movimento.",
    "note": "Il gesto dura un attimo; il mosso delle ali lo lascia leggere.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-002.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-002.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/60 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 6514,
      "height": 4351
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-003 | Acqua bassa | DSCF1163_wm.jpg
  {
    "id": "BNV-003",
    "albumId": "birbs-noale-verona",
    "sourceFile": "DSCF1163_wm.jpg",
    "title": "Acqua bassa",
    "subject": "Germano reale",
    "filter": "anatre",
    "alt": "Germano reale maschio fermo nell’acqua bassa, con le zampe e il riflesso visibili sul fondo.",
    "note": "Verde, arancio e il fondale chiaro sotto pochi centimetri d’acqua.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-003.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-003.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/125 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5178,
      "height": 3459
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-004 | Di fronte | DSCF1223_wm.jpg
  {
    "id": "BNV-004",
    "albumId": "birbs-noale-verona",
    "sourceFile": "DSCF1223_wm.jpg",
    "title": "Di fronte",
    "subject": "Gabbiano",
    "filter": "gabbiani",
    "alt": "Gabbiano ripreso frontalmente in piedi su una superficie scura, con lo sfondo chiaro sfocato.",
    "note": "Un ritratto quasi simmetrico, tutto sguardo e zampe.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-004.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-004.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/500 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 3720,
      "height": 5568
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-005 | Profilo | DSCF1236_wm.jpg
  {
    "id": "BNV-005",
    "albumId": "birbs-noale-verona",
    "sourceFile": "DSCF1236_wm.jpg",
    "title": "Profilo",
    "subject": "Gabbiano",
    "filter": "gabbiani",
    "alt": "Gabbiano di profilo su una superficie scura, con il becco e le zampe rossastre.",
    "note": "Poche linee e un profilo pulito.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-005.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-005.webp",
    "width": 1604,
    "height": 2400,
    "thumbWidth": 642,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/500 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 3203,
      "height": 4794
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-006 | Sulla riva | _DSF0016_wm.jpg
  {
    "id": "BNV-006",
    "albumId": "birbs-noale-verona",
    "sourceFile": "_DSF0016_wm.jpg",
    "title": "Sulla riva",
    "subject": "Gallinella d’acqua",
    "filter": "altri",
    "alt": "Gallinella d’acqua giovane in piedi tra l’erba della riva, con l’acqua sullo sfondo.",
    "note": "Tra l’erba e l’acqua, per un momento fermo.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-006.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-006.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/1000 s",
      "iso": "200",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5376,
      "height": 3591
    },
    "location": "Noale, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-007 | Doppio sguardo | _DSF0043_wm.jpg
  {
    "id": "BNV-007",
    "albumId": "birbs-noale-verona",
    "sourceFile": "_DSF0043_wm.jpg",
    "title": "Doppio sguardo",
    "subject": "Germano reale",
    "filter": "anatre",
    "alt": "Germano reale femmina di profilo sull’acqua, con il riflesso della testa nella parte bassa della foto verticale.",
    "note": "Un profilo e il suo riflesso.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-007.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-007.webp",
    "width": 1800,
    "height": 2400,
    "thumbWidth": 720,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/1000 s",
      "iso": "200",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 3131,
      "height": 4175
    },
    "location": "Noale, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-008 | Iridescenze | _DSF0333_wm.jpg
  {
    "id": "BNV-008",
    "albumId": "birbs-noale-verona",
    "sourceFile": "_DSF0333_wm.jpg",
    "title": "Iridescenze",
    "subject": "Piccione",
    "filter": "piccioni",
    "alt": "Ritratto laterale di un piccione con occhio arancione e piume verdi e viola sul collo.",
    "note": "Verde, viola e un occhio arancione. Da vicino, il solito piccione cambia.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-008.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-008.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/125 s",
      "iso": "200",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    },
    "location": "Noale, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-009 | In bianco | _DSF0432_wm.jpg
  {
    "id": "BNV-009",
    "albumId": "birbs-noale-verona",
    "sourceFile": "_DSF0432_wm.jpg",
    "title": "In bianco",
    "subject": "Garzetta",
    "filter": "altri",
    "alt": "Garzetta bianca in piedi sull’erba, con becco e zampe scuri, in formato verticale.",
    "note": "Una presenza bianca tra le ombre e le foglie.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-009.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-009.webp",
    "width": 1727,
    "height": 2400,
    "thumbWidth": 691,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/1000 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 2144,
      "height": 2979
    },
    "location": "Noale, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-010 | A cercare qualcosa | _DSF0519_wm.jpg
  {
    "id": "BNV-010",
    "albumId": "birbs-noale-verona",
    "sourceFile": "_DSF0519_wm.jpg",
    "title": "A cercare qualcosa",
    "subject": "Germano reale",
    "filter": "anatre",
    "alt": "Germano reale femmina sulla riva, con il collo abbassato verso terra e le zampe arancioni illuminate.",
    "note": "Il collo verso terra, le zampe nella luce.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-010.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-010.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "172.4 mm",
      "aperture": "f/4.7",
      "shutter": "1/500 s",
      "iso": "1600",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    },
    "location": "Noale, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-011 | Puntini | _DSF0650_wm.jpg
  {
    "id": "BNV-011",
    "albumId": "birbs-noale-verona",
    "sourceFile": "_DSF0650_wm.jpg",
    "title": "Puntini",
    "subject": "Piccione",
    "filter": "piccioni",
    "alt": "Piccione inquadrato frontalmente e da vicino, con piumaggio grigio e bianco maculato.",
    "note": "Un altro sguardo, un altro disegno sulle piume.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-011.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-011.webp",
    "width": 1800,
    "height": 2400,
    "thumbWidth": 720,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/8",
      "shutter": "1/125 s",
      "iso": "1600",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 3752,
      "height": 5003
    },
    "location": "Noale, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-012 | Di spalle | _DSF0717_wm.jpg
  {
    "id": "BNV-012",
    "albumId": "birbs-noale-verona",
    "sourceFile": "_DSF0717_wm.jpg",
    "title": "Di spalle",
    "subject": "Germano reale",
    "filter": "anatre",
    "alt": "Germano reale femmina vista di spalle sulla riva, con la striscia blu dell’ala in evidenza e l’acqua davanti.",
    "note": "Le piume viste da dietro, sul bordo dell’acqua.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-012.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-012.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "172.4 mm",
      "aperture": "f/4.7",
      "shutter": "1/250 s",
      "iso": "1600",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    },
    "location": "Noale, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-013 | A tu per tu | _DSF0812_wm.jpg
  {
    "id": "BNV-013",
    "albumId": "birbs-noale-verona",
    "sourceFile": "_DSF0812_wm.jpg",
    "title": "A tu per tu",
    "subject": "Germano reale",
    "filter": "anatre",
    "alt": "Primo piano di un germano reale femmina, con lo sguardo rivolto verso l’obiettivo e il becco sporco.",
    "note": "Lo sguardo, il becco e le piccole tracce di una passeggiata.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-013.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-013.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/125 s",
      "iso": "2000",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    },
    "location": "Noale, Italia"
  },

  // ------------------------------------------------------------------
  // BNV-014 | Un filo di blu | _DSF0853_wm.jpg
  {
    "id": "BNV-014",
    "albumId": "birbs-noale-verona",
    "sourceFile": "_DSF0853_wm.jpg",
    "title": "Un filo di blu",
    "subject": "Germano reale",
    "filter": "anatre",
    "alt": "Dettaglio ravvicinato del piumaggio di un germano reale femmina, con una striscia blu tra i toni marroni.",
    "note": "Trame sovrapposte, interrotte da una piccola zona blu.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-noale-verona/full/BNV-014.webp",
    "thumb": "assets/photos/birbs-noale-verona/thumbs/BNV-014.webp",
    "width": 2400,
    "height": 1603,
    "thumbWidth": 960,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/60 s",
      "iso": "2000",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7752,
      "height": 5178
    },
    "location": "Noale, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-001 | Dentro il vicolo | DSCF0221_wm.jpg
  {
    "id": "SPV-001",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF0221_wm.jpg",
    "title": "Dentro il vicolo",
    "subject": "Strada",
    "filter": "strada",
    "alt": "Vicolo stretto tra facciate chiare e negozi, con una persona di spalle in primo piano e un edificio sul fondo.",
    "note": "La strada si stringe e porta lo sguardo fino in fondo.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-001.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-001.webp",
    "width": 1600,
    "height": 2400,
    "thumbWidth": 640,
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5152,
      "height": 7728
    },
    "location": "Pordenone, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-002 | Tra i rami | DSCF0277_wm.jpg
  {
    "id": "SPV-002",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF0277_wm.jpg",
    "title": "Tra i rami",
    "subject": "Campanile",
    "filter": "architetture",
    "alt": "Campanile in pietra visto tra rami e foglie, contro il cielo azzurro.",
    "note": "La torre compare dentro una cornice naturale.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-002.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-002.webp",
    "width": 1600,
    "height": 2400,
    "thumbWidth": 640,
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5152,
      "height": 7728
    },
    "location": "Pordenone, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-003 | Pietra e foglie | DSCF0294_wm.jpg
  {
    "id": "SPV-003",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF0294_wm.jpg",
    "title": "Pietra e foglie",
    "subject": "Scultura",
    "filter": "dettagli",
    "alt": "Statua in pietra di una figura umana ripresa dal basso, circondata da foglie verdi.",
    "note": "La superficie segnata della pietra contro il fogliame.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-003.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-003.webp",
    "width": 1600,
    "height": 2400,
    "thumbWidth": 640,
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5152,
      "height": 7728
    },
    "location": "Pordenone, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-004 | Via del Cristo | DSCF0344_wm.jpg
  {
    "id": "SPV-004",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF0344_wm.jpg",
    "title": "Via del Cristo",
    "subject": "Segnaletica",
    "filter": "dettagli",
    "alt": "Targa stradale con la scritta Via del Cristo su una parete, con un arco sfocato sullo sfondo.",
    "note": "Un nome, una parete, il resto della città fuori fuoco.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-004.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-004.webp",
    "width": 1600,
    "height": 2400,
    "thumbWidth": 640,
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5152,
      "height": 7728
    },
    "location": "Pordenone, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-005 | Parole sul muro | DSCF0350_wm.jpg
  {
    "id": "SPV-005",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF0350_wm.jpg",
    "title": "Parole sul muro",
    "subject": "Architettura",
    "filter": "architetture",
    "alt": "Facciata bianca contemporanea con testi poetici stampati su pannelli, sotto un cielo blu intenso.",
    "note": "Testo e architettura diventano la stessa superficie.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-005.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-005.webp",
    "width": 1553,
    "height": 2400,
    "thumbWidth": 621,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "55 mm",
      "aperture": "f/4",
      "shutter": "1/8000 s",
      "iso": "200",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 4821,
      "height": 7449
    },
    "location": "Pordenone, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-006 | Giallo su pietra | DSCF0949_wm.jpg
  {
    "id": "SPV-006",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF0949_wm.jpg",
    "title": "Giallo su pietra",
    "subject": "Bicicletta",
    "filter": "strada",
    "alt": "Bicicletta gialla con cestino appoggiata a una parete di pietra.",
    "note": "Un colore acceso contro la trama del muro.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-006.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-006.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "capture": {
      "camera": "X-T5",
      "lens": "XF16-55mmF2.8 R LM WR",
      "focalLength": "55 mm",
      "aperture": "f/2.8",
      "shutter": "1/500 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5178,
      "height": 7752
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-007 | Tra due facciate | DSCF1047_wm.jpg
  {
    "id": "SPV-007",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF1047_wm.jpg",
    "title": "Tra due facciate",
    "subject": "Campanile",
    "filter": "architetture",
    "alt": "Campanile chiaro inquadrato nello spazio stretto tra due edifici.",
    "note": "L’architettura lontana entra esattamente nel varco.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-007.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-007.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "134.5 mm",
      "aperture": "f/4.4",
      "shutter": "1/2000 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 4928,
      "height": 7378
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-008 | Giallo e blu | DSCF1050_wm.jpg
  {
    "id": "SPV-008",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF1050_wm.jpg",
    "title": "Giallo e blu",
    "subject": "Facciata",
    "filter": "architetture",
    "alt": "Spigolo di una facciata gialla contro un cielo blu, ripreso dal basso.",
    "note": "Due campi di colore e una linea diagonale.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-008.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-008.webp",
    "width": 1529,
    "height": 2400,
    "thumbWidth": 612,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "81.9 mm",
      "aperture": "f/3.8",
      "shutter": "1/2000 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 4602,
      "height": 7225
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-009 | Un punto di colore | DSCF1294_wm.jpg
  {
    "id": "SPV-009",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF1294_wm.jpg",
    "title": "Un punto di colore",
    "subject": "Fiori",
    "filter": "dettagli",
    "alt": "Piccolo gruppo di fiori rossi, arancioni e gialli isolato contro foglie verdi scure.",
    "note": "Un dettaglio acceso nel verde.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-009.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-009.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/250 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5178,
      "height": 7752
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-010 | Lampione | DSCF1313_wm.jpg
  {
    "id": "SPV-010",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF1313_wm.jpg",
    "title": "Lampione",
    "subject": "Arredo urbano",
    "filter": "strada",
    "alt": "Sagoma scura di un lampione in primo piano, con una torre sfocata sullo sfondo.",
    "note": "Il lampione diventa quasi un segno grafico.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-010.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-010.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/4000 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5178,
      "height": 7752
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-011 | Luci accese | DSCF1364_wm.jpg
  {
    "id": "SPV-011",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF1364_wm.jpg",
    "title": "Luci accese",
    "subject": "Arredo urbano",
    "filter": "strada",
    "alt": "Due lampioni accesi fissati a una parete di pietra, con facciate cittadine sullo sfondo.",
    "note": "La luce calda anticipa la sera.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-011.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-011.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/1000 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 4876,
      "height": 7299
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-012 | Passaggio | DSCF1430_wm.jpg
  {
    "id": "SPV-012",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF1430_wm.jpg",
    "title": "Passaggio",
    "subject": "Bicicletta",
    "filter": "strada",
    "alt": "Parte anteriore di una bicicletta gialla con cestino, accanto a una persona ritagliata sul bordo del fotogramma.",
    "note": "La bicicletta resta ferma, qualcuno attraversa la scena.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-012.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-012.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "148.5 mm",
      "aperture": "f/4.5",
      "shutter": "1/250 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5178,
      "height": 7752
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-013 | Con un libro | DSCF1453_wm.jpg
  {
    "id": "SPV-013",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF1453_wm.jpg",
    "title": "Con un libro",
    "subject": "Scultura",
    "filter": "dettagli",
    "alt": "Statua di un uomo con baffi e barba che tiene un libro, davanti a una muratura decorata.",
    "note": "La figura chiara si stacca dalla trama del muro.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-013.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-013.webp",
    "width": 1549,
    "height": 2400,
    "thumbWidth": 620,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/500 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 4877,
      "height": 7555
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-014 | Mezza luce | DSCF1498_wm.jpg
  {
    "id": "SPV-014",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF1498_wm.jpg",
    "title": "Mezza luce",
    "subject": "Scultura",
    "filter": "dettagli",
    "alt": "Scultura femminile illuminata solo su volto e busto, mentre il resto rimane nell’ombra.",
    "note": "La luce seleziona la figura e lascia scomparire tutto il resto.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-014.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-014.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/125 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5178,
      "height": 7752
    },
    "location": "Verona, Italia"
  },

  // ------------------------------------------------------------------
  // SPV-015 | A | DSCF1499_wm.jpg
  {
    "id": "SPV-015",
    "albumId": "street-pordenone-verona",
    "sourceFile": "DSCF1499_wm.jpg",
    "title": "A",
    "subject": "Insegna",
    "filter": "dettagli",
    "alt": "Grande lettera A rossa illuminata su una parete scura.",
    "note": "Una lettera sola diventa immagine.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/street-pordenone-verona/full/SPV-015.webp",
    "thumb": "assets/photos/street-pordenone-verona/thumbs/SPV-015.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "capture": {
      "camera": "X-T5",
      "lens": "XF55-200mmF3.5-4.8 R LM OIS",
      "focalLength": "200 mm",
      "aperture": "f/4.8",
      "shutter": "1/250 s",
      "iso": "400",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5178,
      "height": 7752
    },
    "location": "Verona, Italia"
  }
];
