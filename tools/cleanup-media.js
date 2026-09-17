/** Pulizia conservativa delle copie web.
 * node tools/cleanup-media.js          -> anteprima, non scrive nulla
 * node tools/cleanup-media.js --apply  -> applica il piano
 * Eseguire prima su una copia/branch del progetto. Non servono dipendenze.
 * Cancella solo le copie large ridondanti con un full esistente e le tre
 * vecchie thumbs Jesolo prive di riferimenti. Non ricomprime alcuna immagine.
 * Noale: quando i file esistono, sposta large -> full senza alterare i byte
 * e aggiorna i riferimenti. Se mancano, lascia tutto invariato e lo segnala.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {ROOT,load} = require('./catalog.js');
const args = process.argv.slice(2);
if (args.some(arg => arg !== '--apply')) {
  console.error('Uso: node tools/cleanup-media.js [--apply]'); process.exit(1);
}
const apply = args.includes('--apply');
const P = load();
const fileExists = relative => fs.existsSync(path.join(ROOT,relative)) && fs.statSync(path.join(ROOT,relative)).isFile();
function filesUnder(relative) {
  const directory = path.join(ROOT,relative);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory,{withFileTypes:true}).filter(entry => entry.isFile()).map(entry => relative+'/'+entry.name);
}
const texts = new Map();
function readRuntime(relative) {
  const directory = path.join(ROOT,relative);
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory,{withFileTypes:true})) {
    const file = relative ? relative+'/'+entry.name : entry.name;
    if (entry.isDirectory()) {
      if (['assets/data','assets/js','assets/css','serie','templates'].includes(file) || relative.startsWith('assets/data') || relative.startsWith('assets/js')) readRuntime(file);
      else if (file === 'assets') readRuntime(file);
    } else if (/\.(?:js|html|css)$/.test(file)) texts.set(file,fs.readFileSync(path.join(ROOT,file),'utf8'));
  }
}
readRuntime('');
const referenced = file => [...texts.values()].some(text => text.includes(file));
const removals = [];
for (const folder of ['assets/covers/large','assets/photos/jesolo-2026/large']) {
  for (const file of filesUnder(folder)) {
    if (!/\.(?:jpg|jpeg|png|webp)$/i.test(file)) continue;
    const full = file.replace('/large/','/full/').replace(/\.[^.]+$/,'.webp');
    if (fileExists(full) && !referenced(file)) removals.push(file);
  }
}
// Solo questi tre residui noti, non qualsiasi file eventualmente aggiunto dopo.
for (const code of ['JES-002','JES-004','JES-010']) {
  const file = 'assets/photos/jesolo-2026/thumbs/'+code+'.webp';
  if (fileExists(file) && !referenced(file)) removals.push(file);
}
const moves = [], missing = [], conflicts = [];
// Tre vecchi JPG Jesolo non hanno un equivalente WebP: non li cancelliamo.
// Li conserviamo in full con gli stessi byte, cosi' non resta un terzo livello.
for (const from of filesUnder('assets/photos/jesolo-2026/large')) {
  if (removals.includes(from) || !/\.(?:jpg|jpeg|png|webp)$/i.test(from)) continue;
  const to = from.replace('/large/','/full/');
  if (fileExists(to) && !fs.readFileSync(path.join(ROOT,from)).equals(fs.readFileSync(path.join(ROOT,to)))) {
    conflicts.push(to); continue;
  }
  moves.push({from,to});
}
for (const photo of P.photos) {
  if (!photo.file?.startsWith('assets/photos/birbs-of-noale/large/')) continue;
  const from = photo.file, to = from.replace('/large/','/full/');
  if (!fileExists(from)) { missing.push(from); continue; }
  if (fileExists(to) && !fs.readFileSync(path.join(ROOT,from)).equals(fs.readFileSync(path.join(ROOT,to)))) {
    conflicts.push(to); continue;
  }
  moves.push({from,to});
}
const bytes = removals.reduce((sum,file) => sum+fs.statSync(path.join(ROOT,file)).size,0);
const updates = new Map();
for (const [file,text] of texts) {
  let updated = text;
  moves.forEach(({from,to}) => { updated = updated.split(from).join(to); });
  if (updated !== text) updates.set(file,updated);
}
const index = 'docs/PHOTO-INDEX.txt';
if (fileExists(index)) {
  const original = fs.readFileSync(path.join(ROOT,index),'utf8');
  let updated = original;
  moves.forEach(({from,to}) => { updated = updated.split(from).join(to); });
  if (updated !== original) updates.set(index,updated);
}
console.log(apply ? 'PULIZIA APPLICATA' : 'ANTEPRIMA - nessun file modificato');
console.log(`${removals.length} varianti ridondanti: ${(bytes/1e6).toFixed(2)} MB liberabili.`);
console.log(`${moves.length} immagini spostabili da large a full, senza ricompressione.`);
if (missing.length) console.log(`${missing.length} full Noale assenti da questa copia: riferimenti lasciati invariati.`);
if (conflicts.length) console.log(`${conflicts.length} destinazioni diverse gia' presenti: NON sovrascritte.`);
const report = {applied:apply,removedBytes:bytes,removed:removals,moved:moves,updatedReferences:[...updates.keys()],missingNoale:missing,conflicts};
if (apply) {
  // Prima copia i contenuti, poi aggiorna i riferimenti, soltanto alla fine elimina.
  for (const {from,to} of moves) {
    const destination = path.join(ROOT,to);
    fs.mkdirSync(path.dirname(destination),{recursive:true});
    if (!fileExists(to)) fs.copyFileSync(path.join(ROOT,from),destination,fs.constants.COPYFILE_EXCL);
  }
  for (const [file,text] of updates) {
    const target = path.join(ROOT,file), temp = target+'.media-cleanup.tmp';
    fs.writeFileSync(temp,text); fs.renameSync(temp,target);
  }
  for (const file of [...removals,...moves.map(move => move.from)]) fs.unlinkSync(path.join(ROOT,file));
  for (const folder of ['assets/covers/large','assets/photos/jesolo-2026/large','assets/photos/birbs-of-noale/large']) {
    const directory = path.join(ROOT,folder);
    if (!fs.existsSync(directory)) continue;
    const contents = fs.readdirSync(directory);
    if (contents.every(name => name === '.gitkeep' || name === '.DS_Store')) {
      contents.forEach(name => fs.unlinkSync(path.join(directory,name))); fs.rmdirSync(directory);
    }
  }
  fs.mkdirSync(path.join(ROOT,'docs/records'),{recursive:true});
  fs.writeFileSync(path.join(ROOT,'docs/records/MEDIA-CLEANUP.json'),JSON.stringify(report,null,2)+'\n');
  console.log('Report: docs/records/MEDIA-CLEANUP.json');
} else {
  removals.forEach(file => console.log('RIMUOVI '+file));
  moves.forEach(({from,to}) => console.log('SPOSTA '+from+' -> '+to));
  console.log('Per applicare: node tools/cleanup-media.js --apply');
}
