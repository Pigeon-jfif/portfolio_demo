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
  // NOA-001 | A tu per tu | _DSF0812.jpg
  // Copia firmata PROVVISORIA: sostituisci con il tuo export firmato.
  // Nessun EXIF disponibile: campi lasciati vuoti, non ipotizzati.
  {
    "id": "NOA-001",
    "albumId": "birbs-of-noale",
    "sourceFile": "_DSF0812.jpg",
    "title": "A tu per tu",
    "subject": "Anatre",
    "filter": "anatre",
    "alt": "Primo piano di un’anatra, con lo sguardo rivolto verso l’obiettivo e il becco sporco.",
    "note": "Lo sguardo, il becco e le piccole tracce di una passeggiata.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-of-noale/large/NOA-001.jpg",
    "thumb": "assets/photos/birbs-of-noale/thumbs/NOA-001.webp",
    "width": 2047,
    "height": 1367,
    "thumbWidth": 960,
    "webSignature": "provisional",
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    }
  },

  // ------------------------------------------------------------------
  // NOA-002 | Un filo di blu | _DSF0853.jpg
  // Copia firmata PROVVISORIA: sostituisci con il tuo export firmato.
  // Nessun EXIF disponibile: campi lasciati vuoti, non ipotizzati.
  {
    "id": "NOA-002",
    "albumId": "birbs-of-noale",
    "sourceFile": "_DSF0853.jpg",
    "title": "Un filo di blu",
    "subject": "Anatre",
    "filter": "anatre",
    "alt": "Dettaglio ravvicinato delle piume di un’anatra, con una striscia blu tra i toni marroni.",
    "note": "Trame sovrapposte, interrotte da una piccola zona blu.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-of-noale/large/NOA-002.jpg",
    "thumb": "assets/photos/birbs-of-noale/thumbs/NOA-002.webp",
    "width": 2047,
    "height": 1367,
    "thumbWidth": 960,
    "webSignature": "provisional",
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    }
  },

  // ------------------------------------------------------------------
  // NOA-003 | Sulla riva | _DSF0016.jpg
  // Copia firmata PROVVISORIA: sostituisci con il tuo export firmato.
  // Nessun EXIF disponibile: campi lasciati vuoti, non ipotizzati.
  {
    "id": "NOA-003",
    "albumId": "birbs-of-noale",
    "sourceFile": "_DSF0016.jpg",
    "title": "Sulla riva",
    "subject": "Altri incontri",
    "filter": "altri",
    "alt": "Un uccello scuro in piedi tra l’erba della riva, con l’acqua sullo sfondo.",
    "note": "Tra l’erba e l’acqua, per un momento fermo.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-of-noale/large/NOA-003.jpg",
    "thumb": "assets/photos/birbs-of-noale/thumbs/NOA-003.webp",
    "width": 2048,
    "height": 1368,
    "thumbWidth": 960,
    "webSignature": "provisional",
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    }
  },

  // ------------------------------------------------------------------
  // NOA-004 | Doppio sguardo | _DSF0043.jpg
  // Copia firmata PROVVISORIA: sostituisci con il tuo export firmato.
  // Nessun EXIF disponibile: campi lasciati vuoti, non ipotizzati.
  {
    "id": "NOA-004",
    "albumId": "birbs-of-noale",
    "sourceFile": "_DSF0043.jpg",
    "title": "Doppio sguardo",
    "subject": "Anatre",
    "filter": "anatre",
    "alt": "Anatra di profilo sull’acqua, con il riflesso della testa nella parte bassa della foto verticale.",
    "note": "Un profilo e il suo riflesso.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-of-noale/large/NOA-004.jpg",
    "thumb": "assets/photos/birbs-of-noale/thumbs/NOA-004.webp",
    "width": 1535,
    "height": 2048,
    "thumbWidth": 720,
    "webSignature": "provisional",
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    }
  },

  // ------------------------------------------------------------------
  // NOA-005 | Iridescenze | _DSF0333.jpg
  // Copia firmata PROVVISORIA: sostituisci con il tuo export firmato.
  // Nessun EXIF disponibile: campi lasciati vuoti, non ipotizzati.
  {
    "id": "NOA-005",
    "albumId": "birbs-of-noale",
    "sourceFile": "_DSF0333.jpg",
    "title": "Iridescenze",
    "subject": "Piccioni",
    "filter": "piccioni",
    "alt": "Ritratto laterale di un piccione con occhio arancione e piume verdi e viola sul collo.",
    "note": "Verde, viola e un occhio arancione. Da vicino, il solito piccione cambia.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-of-noale/large/NOA-005.jpg",
    "thumb": "assets/photos/birbs-of-noale/thumbs/NOA-005.webp",
    "width": 2047,
    "height": 1367,
    "thumbWidth": 960,
    "webSignature": "provisional",
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    }
  },

  // ------------------------------------------------------------------
  // NOA-006 | In bianco | _DSF0432.jpg
  // Copia firmata PROVVISORIA: sostituisci con il tuo export firmato.
  // Nessun EXIF disponibile: campi lasciati vuoti, non ipotizzati.
  {
    "id": "NOA-006",
    "albumId": "birbs-of-noale",
    "sourceFile": "_DSF0432.jpg",
    "title": "In bianco",
    "subject": "Altri incontri",
    "filter": "altri",
    "alt": "Un uccello bianco dal becco lungo e scuro tra erba, foglie e zone d’ombra, in formato verticale.",
    "note": "Una presenza bianca tra le ombre e le foglie.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-of-noale/large/NOA-006.jpg",
    "thumb": "assets/photos/birbs-of-noale/thumbs/NOA-006.webp",
    "width": 1473,
    "height": 2048,
    "thumbWidth": 690,
    "webSignature": "provisional",
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    }
  },

  // ------------------------------------------------------------------
  // NOA-007 | A cercare qualcosa | _DSF0519.jpg
  // Copia firmata PROVVISORIA: sostituisci con il tuo export firmato.
  // Nessun EXIF disponibile: campi lasciati vuoti, non ipotizzati.
  {
    "id": "NOA-007",
    "albumId": "birbs-of-noale",
    "sourceFile": "_DSF0519.jpg",
    "title": "A cercare qualcosa",
    "subject": "Anatre",
    "filter": "anatre",
    "alt": "Anatra sulla riva, con il collo abbassato e le zampe arancioni illuminate.",
    "note": "Il collo verso terra, le zampe nella luce.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-of-noale/large/NOA-007.jpg",
    "thumb": "assets/photos/birbs-of-noale/thumbs/NOA-007.webp",
    "width": 2047,
    "height": 1367,
    "thumbWidth": 960,
    "webSignature": "provisional",
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    }
  },

  // ------------------------------------------------------------------
  // NOA-008 | Puntini | _DSF0650.jpg
  // Copia firmata PROVVISORIA: sostituisci con il tuo export firmato.
  // Nessun EXIF disponibile: campi lasciati vuoti, non ipotizzati.
  {
    "id": "NOA-008",
    "albumId": "birbs-of-noale",
    "sourceFile": "_DSF0650.jpg",
    "title": "Puntini",
    "subject": "Piccioni",
    "filter": "piccioni",
    "alt": "Piccione inquadrato da vicino e frontalmente, con piumaggio grigio e bianco maculato.",
    "note": "Un altro sguardo, un altro disegno sulle piume.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-of-noale/large/NOA-008.jpg",
    "thumb": "assets/photos/birbs-of-noale/thumbs/NOA-008.webp",
    "width": 1535,
    "height": 2048,
    "thumbWidth": 720,
    "webSignature": "provisional",
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    }
  },

  // ------------------------------------------------------------------
  // NOA-009 | Di spalle | _DSF0717.jpg
  // Copia firmata PROVVISORIA: sostituisci con il tuo export firmato.
  // Nessun EXIF disponibile: campi lasciati vuoti, non ipotizzati.
  {
    "id": "NOA-009",
    "albumId": "birbs-of-noale",
    "sourceFile": "_DSF0717.jpg",
    "title": "Di spalle",
    "subject": "Anatre",
    "filter": "anatre",
    "alt": "Anatra vista di spalle sulla riva, con una striscia blu sull’ala e l’acqua davanti.",
    "note": "Le piume viste da dietro, sul bordo dell’acqua.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/birbs-of-noale/large/NOA-009.jpg",
    "thumb": "assets/photos/birbs-of-noale/thumbs/NOA-009.webp",
    "width": 2047,
    "height": 1367,
    "thumbWidth": 960,
    "webSignature": "provisional",
    "capture": {
      "camera": "",
      "lens": "",
      "focalLength": "",
      "aperture": "",
      "shutter": "",
      "iso": "",
      "capturedAt": ""
    }
  },

  // ------------------------------------------------------------------
  // CON-001 | Dietro lo scatto | DSCF1109.jpg
  // Copia web ottimizzata dal file fornito; nessuna firma incorporata rilevata.
{
    "id": "CON-001",
    "albumId": "conegliano-photo-safari",
    "sourceFile": "DSCF1109.jpg",
    "title": "Dietro lo scatto",
    "subject": "Photo Safari",
    "filter": "persone",
    "alt": "Una partecipante ripresa da dietro mentre tiene la fotocamera, con un’altra persona più avanti.",
    "note": "Un momento dietro le quinte del Photo Safari.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/conegliano-photo-safari/full/CON-001.webp",
    "thumb": "assets/photos/conegliano-photo-safari/thumbs/CON-001.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "webSignature": "none",
    "capture": {
      "camera": "X-T50",
      "lens": "XF16-50mmF2.8-4.8 R LM WR",
      "focalLength": "33.3 mm",
      "aperture": "f/3.8",
      "shutter": "1/800 s",
      "iso": "2000",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5178,
      "height": 7752
    }
  },

  // ------------------------------------------------------------------
  // CON-002 | Rete | DSCF1117_1.jpg
  // Copia web ottimizzata dal file fornito; nessuna firma incorporata rilevata.
{
    "id": "CON-002",
    "albumId": "conegliano-photo-safari",
    "sourceFile": "DSCF1117_1.jpg",
    "title": "Rete",
    "subject": "Barriere",
    "filter": "urbano",
    "alt": "Un edificio oltre un muro di pietra e una linea di filo spinato, sotto un cielo chiaro.",
    "note": "Muro, filo spinato e architettura stratificati nello stesso frame.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/conegliano-photo-safari/full/CON-002.webp",
    "thumb": "assets/photos/conegliano-photo-safari/thumbs/CON-002.webp",
    "width": 2400,
    "height": 1200,
    "thumbWidth": 960,
    "webSignature": "none",
    "capture": {
      "camera": "X-T50",
      "lens": "XF16-50mmF2.8-4.8 R LM WR",
      "focalLength": "50 mm",
      "aperture": "f/4.8",
      "shutter": "1/800 s",
      "iso": "2000",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7724,
      "height": 3862
    }
  },

  // ------------------------------------------------------------------
  // CON-003 | Cancello | DSCF1135.jpg
  // Copia web ottimizzata dal file fornito; nessuna firma incorporata rilevata.
{
    "id": "CON-003",
    "albumId": "conegliano-photo-safari",
    "sourceFile": "DSCF1135.jpg",
    "title": "Cancello",
    "subject": "Geometrie",
    "filter": "urbano",
    "alt": "Una grata metallica arrugginita in primo piano incornicia una torre sfocata sullo sfondo.",
    "note": "La struttura del cancello diventa il soggetto; la torre resta dietro.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/conegliano-photo-safari/full/CON-003.webp",
    "thumb": "assets/photos/conegliano-photo-safari/thumbs/CON-003.webp",
    "width": 1494,
    "height": 2400,
    "thumbWidth": 598,
    "webSignature": "none",
    "capture": {
      "camera": "X-T50",
      "lens": "XF16-50mmF2.8-4.8 R LM WR",
      "focalLength": "48.6 mm",
      "aperture": "f/4.8",
      "shutter": "1/400 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 4609,
      "height": 7402
    }
  },

  // ------------------------------------------------------------------
  // CON-004 | Torre | DSCF1147.jpg
  // Copia web ottimizzata dal file fornito; nessuna firma incorporata rilevata.
{
    "id": "CON-004",
    "albumId": "conegliano-photo-safari",
    "sourceFile": "DSCF1147.jpg",
    "title": "Torre",
    "subject": "Architettura",
    "filter": "urbano",
    "alt": "Una torre chiara isolata contro il cielo grigio, con un margine scuro sfocato in basso.",
    "note": "Una delle immagini più dirette della serie: la torre, il cielo e poco altro.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/conegliano-photo-safari/full/CON-004.webp",
    "thumb": "assets/photos/conegliano-photo-safari/thumbs/CON-004.webp",
    "width": 1603,
    "height": 2400,
    "thumbWidth": 641,
    "webSignature": "none",
    "capture": {
      "camera": "X-T50",
      "lens": "XF16-50mmF2.8-4.8 R LM WR",
      "focalLength": "50 mm",
      "aperture": "f/4.8",
      "shutter": "1/800 s",
      "iso": "1000",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 2422,
      "height": 3627
    }
  },

  // ------------------------------------------------------------------
  // CON-005 | Mani | DSCF1261.jpg
  // Copia web ottimizzata dal file fornito; nessuna firma incorporata rilevata.
{
    "id": "CON-005",
    "albumId": "conegliano-photo-safari",
    "sourceFile": "DSCF1261.jpg",
    "title": "Mani",
    "subject": "Photo Safari",
    "filter": "persone",
    "alt": "Dettaglio delle mani di una persona che tiene una fotocamera Fujifilm, davanti a una camicia a fantasia.",
    "note": "Una foto di chi sta fotografando.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/conegliano-photo-safari/full/CON-005.webp",
    "thumb": "assets/photos/conegliano-photo-safari/thumbs/CON-005.webp",
    "width": 2400,
    "height": 1600,
    "thumbWidth": 960,
    "webSignature": "none",
    "capture": {
      "camera": "X-T50",
      "lens": "XF16-50mmF2.8-4.8 R LM WR",
      "focalLength": "50 mm",
      "aperture": "f/4.8",
      "shutter": "1/150 s",
      "iso": "320",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 7728,
      "height": 5152
    }
  },

  // ------------------------------------------------------------------
  // CON-006 | Semaforo | DSCF1294.jpg
  // Copia web ottimizzata dal file fornito; nessuna firma incorporata rilevata.
{
    "id": "CON-006",
    "albumId": "conegliano-photo-safari",
    "sourceFile": "DSCF1294.jpg",
    "title": "Semaforo",
    "subject": "Street",
    "filter": "urbano",
    "alt": "Semaforo rosso e segnale pedonale accesi davanti alle facciate del centro cittadino.",
    "note": "Segnali, colori e facciate nello stesso angolo di città.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/conegliano-photo-safari/full/CON-006.webp",
    "thumb": "assets/photos/conegliano-photo-safari/thumbs/CON-006.webp",
    "width": 1521,
    "height": 2400,
    "thumbWidth": 608,
    "webSignature": "none",
    "capture": {
      "camera": "X-T50",
      "lens": "XF16-50mmF2.8-4.8 R LM WR",
      "focalLength": "50 mm",
      "aperture": "f/5",
      "shutter": "1/320 s",
      "iso": "800",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 4724,
      "height": 7456
    }
  },

  // ------------------------------------------------------------------
  // CON-007 | Albero | DSCF1331.jpg
  // Copia web ottimizzata dal file fornito; nessuna firma incorporata rilevata.
{
    "id": "CON-007",
    "albumId": "conegliano-photo-safari",
    "sourceFile": "DSCF1331.jpg",
    "title": "Albero",
    "subject": "Dettaglio",
    "filter": "dettagli",
    "alt": "Un piccolo bonsai esposto su un supporto di legno, isolato contro una parete neutra.",
    "note": "Un piccolo oggetto trattato quasi come una mini architettura.",
    "variant": "wide",
    "pairId": "",
    "file": "assets/photos/conegliano-photo-safari/full/CON-007.webp",
    "thumb": "assets/photos/conegliano-photo-safari/thumbs/CON-007.webp",
    "width": 1586,
    "height": 2400,
    "thumbWidth": 634,
    "webSignature": "none",
    "capture": {
      "camera": "X-T50",
      "lens": "XF16-50mmF2.8-4.8 R LM WR",
      "focalLength": "50 mm",
      "aperture": "f/5",
      "shutter": "1/200 s",
      "iso": "1000",
      "capturedAt": ""
    },
    "referenceExport": {
      "width": 5017,
      "height": 7591
    }
  }
];
