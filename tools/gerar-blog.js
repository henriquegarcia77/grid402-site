/* Gera blog.html (página 1) e blog/pagina/N.html com os cards já no HTML (bom para o Google)
   + paginação, e atualiza a lista "Do blog" da home e o sitemap.  Uso: node tools/gerar-blog.js */
const fs=require('fs'),path=require('path');const R=path.join(__dirname,'..');
const POR_PAGINA=12, SITE='https://grid402performance.com.br';
eval(fs.readFileSync(path.join(R,'posts.js'),'utf8').replace('const POSTS','global.POSTS'));
const posts=[...POSTS].sort((a,b)=>b.data.localeCompare(a.data));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const fmt=d=>new Date(d+'T12:00').toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'});
const tpl=fs.readFileSync(path.join(__dirname,'blog-modelo.html'),'utf8');
const N=Math.ceil(posts.length/POR_PAGINA);const url=n=>n===1?'/blog':'/blog/pagina/'+n;
const v=Date.now();
for(let n=1;n<=N;n++){
 const list=posts.slice((n-1)*POR_PAGINA,n*POR_PAGINA);
 const cards=list.map(p=>`<a class="post" href="blog/${p.id}" data-id="${p.id}"><div class="cover"><div class="pcover" style="--c:${p.cor}"><div class="pc-bg"></div><span class="pc-tag">${esc(p.categoria)}</span></div></div><div class="body"><h3>${esc(p.titulo)}</h3><p>${esc(p.resumo)}</p><small>${fmt(p.data)} · ${p.tempo} de leitura</small></div></a>`).join('\n');
 let nav='';if(N>1){nav='<div class="pag" id="pag" role="navigation" aria-label="Páginas do blog">'+(n>1?`<a href="${url(n-1).slice(1)}" rel="prev">‹ Anterior</a>`:'')+Array.from({length:N},(_,i)=>i+1).map(i=>i===n?`<span class="on">${i}</span>`:`<a href="${url(i).slice(1)}">${i}</a>`).join('')+(n<N?`<a href="${url(n+1).slice(1)}" rel="next">Próxima ›</a>`:'')+'</div>'}
 const titulo=n===1?'Blog de arrancada, carburação e carros antigos | Grid 402':`Blog Grid 402 — página ${n}`;
 const desc=n===1?'Guias de carburador Weber, giclagem, injeção, turbo, nitro e carros antigos, além da cobertura da arrancada.':`Página ${n} do blog Grid 402: guias de preparação, carburação e arrancada.`;
 let h=tpl.replace(/<title>[^<]*<\/title>/,`<title>${titulo}</title>`)
  .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/,`<!--seo--><base href="/"><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${SITE}${url(n)}">${n>1?`<link rel="prev" href="${SITE}${url(n-1)}">`:''}${n<N?`<link rel="next" href="${SITE}${url(n+1)}">`:''}<meta property="og:type" content="website"><meta property="og:site_name" content="Grid 402 Performance"><meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${SITE}${url(n)}"><meta property="og:image" content="${SITE}/og.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#e10600"><!--/seo-->`)
  .replace('</style>','.pag{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:0 0 100px}.pag a,.pag span{min-width:42px;text-align:center;padding:10px 14px;border-radius:980px;background:#e8e8ed;font:600 15px var(--font);color:inherit;text-decoration:none}.pag span.on{background:var(--ink);color:#fff}.pag a:hover{background:#d6d6dc}.posts{padding-bottom:40px}\n</style>')
  .replace(/<div class="posts stagger" id="posts">[\s\S]*?<\/div>\n<\/div>/,`<div class="posts stagger" id="posts">\n${cards}\n</div>\n${nav}\n</div>`)
  .replace(/posts\.js\?v=\d+/,'posts.js?v='+v);
 if(n>1)h=h.replace('<h1>Do box para você.</h1>',`<h1>Blog — página ${n}</h1>`);
 // JS: página atual usa os cards estáticos (só troca a capa); filtro de categoria mostra todos daquela categoria
 h=h.replace(/<script>\nconst fmt=[\s\S]*?draw\('Todos'\);\n<\/script>/,`<script>
const PAG=${n},POR=${POR_PAGINA};
const fmt=d=>new Date(d+'T12:00').toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'});
const cats=['Todos',...new Set(POSTS.map(p=>p.categoria))];
filters.innerHTML=cats.map((c,i)=>\`<button class="\${i?'':'on'}">\${c}</button>\`).join('');
const card=p=>\`<a class="post" href="blog/\${p.id}"><div class="cover">\${coverHTML(p)}</div><div class="body"><h3>\${p.titulo}</h3><p>\${p.resumo}</p><small>\${fmt(p.data)} · \${p.tempo} de leitura</small></div></a>\`;
const ord=[...POSTS].sort((a,b)=>b.data.localeCompare(a.data));
function draw(c){const pag=document.getElementById('pag');
  if(c==='Todos'){posts.innerHTML=ord.slice((PAG-1)*POR,PAG*POR).map(card).join('');if(pag)pag.style.display=''}
  else{posts.innerHTML=ord.filter(p=>p.categoria===c).map(card).join('');if(pag)pag.style.display='none'}}
filters.onclick=e=>{if(e.target.tagName!=='BUTTON')return;[...filters.children].forEach(b=>b.classList.toggle('on',b===e.target));draw(e.target.textContent)};
draw('Todos');
</script>`);
 const out=n===1?path.join(R,'blog.html'):path.join(R,'blog','pagina',n+'.html');
 fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,h);
}
// home: últimos posts em HTML estático
const ip=path.join(R,'index.html');let idx=fs.readFileSync(ip,'utf8');
const bloco=`<!--blognav--><section class="hblog"><style>.hblog{background:#f4f3f0;padding:46px 0 40px!important}.hblog h2{width:min(1240px,100%);margin:0 auto 18px;padding:0 22px;font-size:clamp(24px,3vw,34px);letter-spacing:-.02em;display:flex;justify-content:space-between;align-items:baseline;gap:12px}.hblog h2 span{border-bottom:3px solid #e10600;padding-bottom:4px}.hblog h2 a{font-size:15px;font-weight:700;color:#e10600;white-space:nowrap}.hb-t{width:min(1240px,100%);margin:0 auto;display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 22px 10px;scrollbar-width:none}.hb-t::-webkit-scrollbar{display:none}.hb{flex:0 0 280px;scroll-snap-align:start;background:#fff;border:1px solid #e6e6e9;border-radius:10px;overflow:hidden;text-decoration:none;color:#1d1d1f;display:flex;flex-direction:column}.hb .cv{height:120px;background:var(--c,#e10600);position:relative;display:flex;align-items:flex-end;padding:12px 14px;color:#fff;font:900 20px/1 Inter,sans-serif;letter-spacing:-.02em;text-transform:uppercase}.hb .cv:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgba(0,0,0,.18) 0 16px,transparent 16px 32px)}.hb .cv i{position:relative;font-style:normal}.hb .bd{padding:14px 16px 16px;display:flex;flex-direction:column;gap:8px;flex:1}.hb small{font:800 11px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#e10600}.hb h3{font-size:16px;line-height:1.3;margin:0}.hb p{font-size:13px;color:#555;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.hb em{margin-top:auto;font-style:normal;font-size:12px;color:#888}</style><h2><span>Do blog</span><a href="blog">Ver todos →</a></h2><div class="hb-t">${posts.slice(0,8).map(p=>`<a class="hb" href="blog/${p.id}"><div class="cv" style="--c:${p.cor||'#e10600'}"><i>${esc(p.capaNome||p.categoria)}</i></div><div class="bd"><small>${esc(p.categoria)}</small><h3>${esc(p.titulo)}</h3><p>${esc(p.resumo)}</p><em>${p.tempo} de leitura</em></div></a>`).join('')}</div></section><!--/blognav-->`;
idx=/<!--blognav-->[\s\S]*?<!--\/blognav-->/.test(idx)?idx.replace(/<!--blognav-->[\s\S]*?<!--\/blognav-->/,bloco):idx.replace('<footer class="foot">',bloco+'\n<footer class="foot">');
fs.writeFileSync(ip,idx);
// sitemap
const sp=path.join(R,'sitemap.xml');let sm=fs.readFileSync(sp,'utf8').replace(/<url><loc>[^<]*\/blog\/pagina\/\d+<\/loc>.*<\/url>\n/g,'');
const hoje=new Date().toISOString().slice(0,10);
sm=sm.replace('</urlset>',Array.from({length:N-1},(_,i)=>`<url><loc>${SITE}/blog/pagina/${i+2}</loc><lastmod>${hoje}</lastmod></url>\n`).join('')+'</urlset>');
fs.writeFileSync(sp,sm);
console.log(`blog: ${posts.length} posts, ${N} páginas`);
