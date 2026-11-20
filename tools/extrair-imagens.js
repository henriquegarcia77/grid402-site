/* Tira as imagens base64 de dentro dos .js e salva como arquivos em img/p/ (site mais leve = melhor SEO).
   Uso: node tools/extrair-imagens.js arquivo1.js arquivo2.js ... */
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const ROOT=path.join(__dirname,'..');const DIR=path.join(ROOT,'img','p');fs.mkdirSync(DIR,{recursive:true});
const EXT={jpeg:'jpg',jpg:'jpg',png:'png',webp:'webp',gif:'gif','svg+xml':'svg',avif:'avif'};
let n=0,bytes=0;
for(const f of process.argv.slice(2)){
  const p=path.join(ROOT,f);let s=fs.readFileSync(p,'utf8');const antes=s.length;
  s=s.replace(/data:image\/([\w+]+);base64,([A-Za-z0-9+/=]+)/g,(m,t,b)=>{
    const buf=Buffer.from(b,'base64');const nome=crypto.createHash('sha1').update(buf).digest('hex').slice(0,16)+'.'+(EXT[t]||t);
    const out=path.join(DIR,nome);if(!fs.existsSync(out)){fs.writeFileSync(out,buf);bytes+=buf.length}n++;return '/img/p/'+nome;});
  fs.writeFileSync(p,s);console.log(f,Math.round(antes/1024)+'KB ->',Math.round(s.length/1024)+'KB');
}
console.log(n,'imagens trocadas,',Math.round(bytes/1024),'KB em img/p/');
