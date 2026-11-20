/* Insere (ou atualiza) um bloco estático "Navegue por categoria" com links para todas as páginas /pecas/ (links internos que o Google enxerga). */
const fs=require('fs'),path=require('path');const ROOT=path.join(__dirname,'..');
const rd=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const C=eval(rd('produtos.js')+';CATEGORIAS'),M=eval(rd('antigos.js')+';MODELOS');
const h1=s=>(rd('pecas/'+s+'.html').match(/<h1>(.*?)<\/h1>/)||[])[1]||s;
const REP=['freios','suspensao','ignicao','manutencao'];const lk=ids=>ids.filter(i=>fs.existsSync(path.join(ROOT,'pecas',i+'.html'))).map(i=>`<a href="/pecas/${i}">${h1(i)}</a>`).join('');
const bloco=`<!--catnav--><section class="catnav" style="padding:64px 0 48px"><div class="wrap"><style>.catnav h2{font-size:clamp(24px,3vw,34px);letter-spacing:-.02em;margin:0 0 6px}.catnav p{color:var(--mut);margin:0 0 18px}.catnav h3{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--red);margin:22px 0 10px}.catnav .cl{display:flex;flex-wrap:wrap;gap:8px}.catnav .cl a{background:#fff;border:1px solid var(--line);padding:9px 16px;border-radius:99px;font-weight:600;font-size:14px;color:var(--ink);text-decoration:none}.catnav .cl a:hover{border-color:var(--red);color:var(--red)}</style><h2>Navegue por categoria</h2><p>Peças selecionadas com preço atualizado todo dia e compra segura pelo Mercado Livre.</p><h3>Performance e arrancada</h3><div class="cl">${lk(C.map(c=>c.id).filter(i=>!REP.includes(i)))}</div><h3>Peças de reposição</h3><div class="cl">${lk(REP)}</div><h3>Peças para carros antigos</h3><div class="cl">${lk(M.map(m=>m.id))}</div></div></section><!--/catnav-->`;
for(const f of process.argv.slice(2)){let s=rd(f);
  if(s.includes('<!--catnav-->'))s=s.replace(/<!--catnav-->[\s\S]*?<!--\/catnav-->/,bloco);
  else s=s.replace(/<footer class="foot">/,bloco+'\n<footer class="foot">');
  fs.writeFileSync(path.join(ROOT,f),s);console.log(f,s.includes('<!--catnav-->'));}
