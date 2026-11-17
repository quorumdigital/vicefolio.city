// Create the finished ViceFolio wordmark from the established title outlines.
const fs=require('node:fs'),path=require('node:path');
const seed=JSON.parse(fs.readFileSync(path.join(__dirname,'../work-checkpoint/title-outline-seed.json'),'utf8'));
let x=0;const paths=[...'vicefolio'].map(c=>{const g=seed.glyphs[c],offset=x-g.offset;x+=seed.advances[c];return '<path transform="translate('+offset.toFixed(3)+' 0)" d="'+g.d+'"/>';}).join('');
const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 18 '+Math.ceil(x+10)+' 80" width="'+Math.ceil(x+10)+'" height="80"><defs><linearGradient id="sunset" gradientUnits="userSpaceOnUse" x1="0" y1="22" x2="0" y2="92"><stop offset="0" stop-color="#fff0dc"/><stop offset=".48" stop-color="#ffd3d2"/><stop offset="1" stop-color="#eaa0ca"/></linearGradient></defs><g fill="url(#sunset)">'+paths+'</g></svg>';
fs.writeFileSync(path.join(__dirname,'../public/assets/lettering/vicefolio-wordmark-v1.svg'),svg);
