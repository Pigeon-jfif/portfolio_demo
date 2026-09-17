/** Utility dei soli strumenti Node. Non viene caricata dai visitatori. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const SCRIPTS = [
  'assets/data/site.js', 'assets/data/photos.js', 'assets/data/albums.js',
  'assets/js/core.js', 'assets/js/pages.js',
  'assets/js/records-model.js', 'assets/data/records-config.js',
  'assets/data/record-covers.js', 'assets/data/records.js', 'assets/js/records-cover-archives.js', 'assets/js/records-view.js'
];
function load() {
  const sandbox = { window: {}, URL, URLSearchParams, console };
  vm.createContext(sandbox);
  for (const file of SCRIPTS) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), sandbox, { filename: file });
  }
  return sandbox.window.Pigeon;
}
module.exports = { ROOT, SCRIPTS, load };
