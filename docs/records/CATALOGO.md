# Plastic Pizzas / catalogo e manutenzione

## La fonte e le copie

La fonte modificabile e' `data/Dischi.csv`. La consegna iniziale contiene 433
voci e 498 dischi fisici, non un inventario ricostruito da servizi online.
L'originale e' conservato identico in `docs/import/Dischi-originale.csv`.
L'unica aggiunta e' la colonna **ID**, da VIN-0001 a VIN-0433: i valori delle nove
colonne originali sono stati confrontati cella per cella e conservati.

Non usare il nome dell'album come ID: due copie possono avere lo stesso titolo.
Gli ID non cambiano se riordini il foglio, aggiungi righe o cambi una nota.
Per il prossimo inserimento puoi usare VIN-0434. Non riutilizzare il codice
quando elimini una copia: eventuali link o copertine precedenti restano associati.

## Le colonne

| Colonna | Significato nel sito |
| --- | --- |
| ID | Identificativo stabile di questa voce/copia. |
| Artista | Nome mostrato; ricerca e raggruppamento ignorano spazi esterni, case e accenti. |
| Titolo | Titolo trascritto, senza correzioni o arricchimenti online. |
| Formato | La categoria originale: LP, OST, Best Of, Maxi Single ecc. |
| Dischi | Quantita' fisica della voce; intero positivo, vuoto = non indicato. |
| Anno | Anno nel catalogo. Non lo si spaccia per l'anno della prima uscita. |
| Etichetta | Testo originale. Nessuna identificazione automatica della stampa. |
| Paese | Testo originale; vuoto = non indicato. |
| Colori speciali | Testo integrale, anche quando contiene Copy 1 o Space Version. |
| Note aggiuntive | Note riportate integralmente nella scheda. |

Le celle sono testo, non codice HTML. Lo script applica escape prima di mostrarle.
Un anno diventa numerico solo se ha quattro cifre; altrimenti il testo resta visibile
ma nei filtri/statistiche rientra fra i non indicati. Una quantita' ignota non diventa
un disco immaginario. I totali non includono quantita' non numeriche.

Nel CSV originale ci sono 215 stringhe artista distinte. Il sito ne mostra 214:
"Laufey " e "Laufey" vengono raggruppati. Lo spazio rimane nel dato originale.
Le 14 voci senza anno numerico non sono completate per deduzione. Non sono stati
corretti refusi o anni che potrebbero riferirsi a ristampe: l'ultima parola e' tua.

## Modifica e aggiornamento

1. Modifica `data/Dischi.csv`, conservando le intestazioni (UTF-8).
2. Salva come CSV con virgole o punto e virgola. Le note con virgole/newline devono
   essere racchiuse fra virgolette: il programma che esporta CSV lo fa normalmente.
3. Dalla cartella del sito esegui:

```sh
node tools/build.js
node tools/check.js
node tools/test.js
node tools/records-test.js
node tools/records-navigation-test.js
```

Nessun npm install. Node e' usato solo dagli strumenti, non richiesto ai visitatori.
Build genera `assets/data/records.js` (snapshot per apertura locale), la pagina
HTML statica, gli indici e i metadati. Il comando non modifica il CSV.
Un errore di validazione impedisce di rigenerare le pagine con un catalogo incoerente.

Su HTTP il browser legge subito la snapshot e prova a ricaricare il CSV del sito.
Se la richiesta fallisce, usa la snapshot e lo segnala nel pannello dati in fondo.
Su file:// la lettura automatica del CSV non viene tentata: la snapshot funziona
senza server. Il pulsante Apri un CSV locale serve a provare un file nella scheda
corrente, non a modificarlo sul disco, salvarlo sul repository o caricarlo online.

Un file senza ID viene accettato con codici AUTO-* deterministici della riga;
modificando una cella il codice AUTO cambia. Per questo conviene usare sempre gli ID
espliciti. Due righe identiche senza ID sono rifiutate: non cancellate o fuse.

## Lettura e navigazione / v2.1

**Artisti** e' l'indice A-Z. Un nome apre i suoi dischi sotto la riga della card,
con animazione di 260 ms; non applica un filtro e non cambia vista. Un solo
artista e' aperto alla volta. Lo stesso pulsante, la X o Escape richiudono.
Il pannello si apre anche con Enter/Spazio e usa aria-expanded/aria-controls.
Con Riduci movimento non viene animato. A 1120/780 px le righe passano da 4 a
3/2 artisti e il pannello viene riposizionato senza perdere la selezione.
Se ci sono filtri, mostra le copie di quell'artista che li soddisfano.

**Artisti** mostra tile compatte con una cover di esempio e il numero di titoli. Aprendo un artista,
gli album compaiono sotto la sua riga in schede orizzontali: cover a sinistra, dati a destra,
tre per riga su desktop. Il cambio iniziale lascia celle vuote per iniziare ogni lettera su una nuova riga.

**Copertine ed Elenco** partono in ordine Titolo A-Z. Restano disponibili ordine
scaffale e anno crescente/decrescente. Dentro ogni artista resta sempre la
cronologia: anno crescente, poi titolo, poi ID; anni ignoti in fondo.

**A-Z non restringe il catalogo.** Nella vista Artisti cerca il primo nome;
nelle altre viste il primo titolo. Seleziona la pagina che lo contiene e poi
scorre a quella card/riga, portandole il focus ed evidenziandola brevemente.
In Copertine/Elenco il salto sceglie Titolo A-Z, visibile anche nel selettore.
Inizio porta alla prima pagina. # indica un'iniziale non alfabetica latina.
Le lettere non disponibili con la ricerca/filtri attivi sono disabilitate.

**Paginazione:** 20 artisti o titoli per pagina all'avvio. Accanto a "Pagina A di N" si puo' scegliere 20, 40 oppure Tutti; la scelta viene ricordata nell'URL. Frecce rapide in alto, numeri/precedente/successiva in basso. I numeri lontani sono compattati con puntini; prima e ultima pagina restano raggiungibili. Non c'e' Mostra altri. Cambiando filtro o vista si ritorna alla prima pagina. In Artisti, quando cambia iniziale, la riga precedente viene completata con celle vuote cosi' la nuova lettera parte sempre da una nuova riga.

Il pulsante Cosa ascolto? usa tutti i risultati filtrati, anche nelle altre
pagine. Le statistiche in basso riguardano sempre il catalogo completo.
Ricerca, formato, decennio, paese, sezione e dettagli sono gli UNICI filtri.
Artista aperto e lettera sono stati di navigazione, non chip da rimuovere.

La ricerca trova tutte le parole, anche nei dettagli e nei codici; ignora
maiuscole, accenti e spazi multipli. Le sezioni riprendono quelle originali,
senza introdurre generi musicali o una classificazione nuova.

## Tre dal catalogo

Nuova estrazione a ogni caricamento, solo tra album con cover abbinata valida.
Le copie sono raggruppate per artista+titolo prima dell'estrazione: possedere
due Breach non lo rende piu' probabile e non occupa due posti. La specifica copia
mostrata viene scelta nel gruppo e apre la propria scheda.

Il campione resta stabile durante ricerca, pagine, artisti e rilettura del medesimo
CSV. Un catalogo diverso o una cover non caricabile aggiorna i candidati.
Le cover fallite nel riquadro iniziale sono escluse dal campione fino al refresh.
Zero candidati: riquadro nascosto. Uno o due candidati: solo uno o due elementi.
Nessuno storico in localStorage, nessuna promessa di tre album mai visti.

## URL e stati

- `view=artists|albums|list`: vista.
- `page=3`: pagina (1-based), limitata agli estremi validi.
- `letter=C`: destinazione alfabetica, non filtro. La pagina viene ricalcolata.
- `artist=twenty+one+pilots`: apre il pannello nella sua pagina; compatibile con
  i vecchi link, senza isolare l'artista dal catalogo.
- `q`, `format`, `decade`, `country`, `section`, `edition`: filtri reali.
- `order=shelf|title|recent|oldest`: ordine della vista album.
- `#disco=VIN-XXXX`: scheda diretta, anche se l'album e' in un'altra pagina.

Build rigenera `NAVIGATION-INDEX.txt` con il primo elemento di ogni lettera e
la relativa pagina nel catalogo intero. I salti vengono comunque ricalcolati
nel browser dopo ogni filtro: l'indice di testo e' una guida di manutenzione.

## Scheda disco e link

Il dettaglio mostra titolo, artista e tutte le colonne relative alla copia.
Le cover hanno una provenienza SEPARATA dai dati. `match:album` non promette una
copertina fedele alla specifica edizione; `match:copy` si usa per una tua foto.

Le frecce scorrono il contesto di apertura: l'artista aperto, i tre suggerimenti
o tutti i risultati filtrati (anche oltre la pagina).
Altri dischi dell'artista apre il pannello; se la scheda proveniva dai tre
suggerimenti e i filtri escludono quell'artista, questo comando li azzera
per poterlo mostrare. Un normale clic nell'indice non azzera i filtri.

Comandi: X / Escape / sfondo per chiudere; frecce sinistra-destra per scorrere.
Il testo si puo' selezionare senza chiudere accidentalmente la scheda.
Tab e Shift+Tab rimangono nel dialog. / porta alla ricerca quando non stai scrivendo.
Il comando Copia link produce `dischi.html#disco=VIN-XXXX` dopo la pubblicazione;
se gli appunti non sono disponibili mostra un campo da copiare.
Da file locale segnala che il collegamento non e' condivisibile online.

## Dove cambiare l'aspetto

- `records-config.js`: testi, campione casuale, elementi per pagina, durata animazione, opzioni.
- `records.css`: solo dischi; tutte le classi iniziano con r-.
- `theme.css`: palette e famiglie condivise con il portfolio.
- `records-view.js`: struttura delle sezioni DISCHI-01..08 e scheda.
- `records-app.js`: interazioni, URL, dialog, importazione.
- `records-model.js`: regole pure, usate anche dagli strumenti e dai test.

Non c'e' backend, account utente, inventario cloud, valutazione economica,
cronologia di ascolto o sincronizzazione con Discogs. Non sono funzioni simulate.
