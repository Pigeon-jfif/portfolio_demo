/** Utility Node per verificare i pacchetti ZIP_STORED delle cover. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');

function settings(config={}) {
  const value=config.coverArchives || {};
  const packSize=Number(value.packSize);
  return {
    enabled:value.enabled===true,
    packSize:Number.isSafeInteger(packSize)&&packSize>0?packSize:50,
    prefix:typeof value.prefix==='string'&&/^[a-zA-Z0-9_-]+$/.test(value.prefix)?value.prefix:'covers-',
    fullDir:typeof value.fullDir==='string'?value.fullDir.replace(/\/+$/,''):'assets/covers/packs/full',
    thumbDir:typeof value.thumbDir==='string'?value.thumbDir.replace(/\/+$/,''):'assets/covers/packs/thumbs'
  };
}
function sourceFor(coverPath,config={}) {
  const cfg=settings(config);
  if(!cfg.enabled)return null;
  const match=/^(assets\/covers\/(full|thumbs)\/)(VIN-(\d{4})\.webp)$/.exec(coverPath||'');
  if(!match)return null;
  const number=Number(match[4]);
  const start=Math.floor((number-1)/cfg.packSize)*cfg.packSize+1;
  const end=start+cfg.packSize-1;
  const pad=value=>String(value).padStart(4,'0');
  const directory=match[2]==='thumbs'?cfg.thumbDir:cfg.fullDir;
  return {archive:`${directory}/${cfg.prefix}${pad(start)}-${pad(end)}.zip`,entry:match[3]};
}
function entries(file) {
  const buffer=fs.readFileSync(file);
  const u16=offset=>buffer.readUInt16LE(offset),u32=offset=>buffer.readUInt32LE(offset);
  const start=Math.max(0,buffer.length-65557);let eocd=-1;
  for(let offset=buffer.length-22;offset>=start;offset--){if(u32(offset)===0x06054b50){eocd=offset;break;}}
  if(eocd<0)throw new Error('EOCD ZIP non trovato: '+file);
  const count=u16(eocd+10),centralOffset=u32(eocd+16);let cursor=centralOffset;
  const result=new Map();
  for(let index=0;index<count;index++){
    if(u32(cursor)!==0x02014b50)throw new Error('Indice ZIP non valido: '+file);
    const flags=u16(cursor+8),method=u16(cursor+10),compressed=u32(cursor+20),plain=u32(cursor+24);
    const nameLength=u16(cursor+28),extraLength=u16(cursor+30),commentLength=u16(cursor+32),localOffset=u32(cursor+42);
    const name=buffer.subarray(cursor+46,cursor+46+nameLength).toString('utf8');
    if(flags&1)throw new Error('ZIP cifrato non supportato: '+file);
    if(method!==0||compressed!==plain)throw new Error('Le cover devono usare ZIP_STORED: '+file+' / '+name);
    if(!/^VIN-\d{4}\.webp$/.test(name))throw new Error('Nome inatteso nel pacchetto cover: '+file+' / '+name);
    result.set(name,{size:plain,localOffset});
    cursor+=46+nameLength+extraLength+commentLength;
  }
  return result;
}
module.exports={settings,sourceFor,entries};
