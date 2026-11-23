/* Microsoft Clarity */
(function(c,l,a,r,i,t,y){if(c.clarity)return;c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','zfna5k9t99');
/* Google Tag Manager */
(function(w,d,s,l,i){if(w.__gtm)return;w.__gtm=1;w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5JPP3RPN');
try{sessionStorage.setItem('g402load','1');if(!/index\.html$|\/$/.test(location.pathname))localStorage.setItem('g402visit',Date.now())}catch(e){}
/* Cabeçalho estilo Apple — igual em todas as páginas */
(()=>{
const LOGO='<img src="logo-sm.png" alt="Grid 402 Performance" class="hlogo">';
const SEARCH='<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>';
const BAG='<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
const links=[["Home","index.html"],["Loja","loja.html"],["Na pista","na-pista.html"],["Eventos","eventos.html"],["Vestuário","vestuario.html"],["Blog","blog.html"]];
const isIndex=!!document.getElementById('pq');
document.getElementById('hdr').outerHTML=`
<header class="gnav" id="gnav"><div class="gwrap">
  <div class="mob"><a class="lg" href="index.html" aria-label="Grid 402">${LOGO}</a></div>
  <ul class="glinks" id="gmenu">
    <li class="lg"><a href="index.html" aria-label="Grid 402 — início">${LOGO}</a></li>
    ${links.map(l=>`<li class="${l[2]||''}"><a href="${l[1]}"${location.pathname.endsWith(l[1])?' class="cur"':''}>${l[0]}</a></li>`).join('')}
    <li class="ic"><button class="sBtn" aria-label="Buscar">${SEARCH}</button></li>
  </ul>
  <div class="mob gact"><button class="sBtn" aria-label="Buscar">${SEARCH}</button><button id="mBtn" class="burger" aria-label="Menu"><span></span><span></span></button></div>
</div>
<div class="gpanel"><div class="pwrap">
  <form id="searchForm">${SEARCH}<input id="q" placeholder="Buscar peças" autocomplete="off"></form>
  <small>Buscas rápidas</small>
  <ul class="quick"><li><a href="#" data-q="bico">→ Bicos injetores</a></li><li><a href="#" data-q="turbina">→ Turbinas</a></li><li><a href="#" data-q="FuelTech">→ FuelTech</a></li><li><a href="#" data-q="forjad">→ Forjados</a></li></ul>
</div></div></header>
<div class="gdim" id="gdim"></div>`;
const g=document.getElementById('gnav'),d=document.getElementById('gdim'),q=document.getElementById('q');
const close=()=>{g.classList.remove('srch','open');d.classList.remove('on')};
document.querySelectorAll('.sBtn').forEach(b=>b.onclick=()=>{const o=!g.classList.contains('srch');close();if(o){g.classList.add('srch');d.classList.add('on');setTimeout(()=>q.focus(),300)}});
document.getElementById('mBtn').onclick=()=>{const o=!g.classList.contains('open');close();if(o)g.classList.add('open')};
d.onclick=close;addEventListener('keydown',e=>e.key==='Escape'&&close());
const go=t=>{close();if(isIndex&&window.doSearch)doSearch(t);else location.href='loja.html?q='+encodeURIComponent(t)};
document.getElementById('searchForm').onsubmit=e=>{e.preventDefault();go(q.value.trim())};
document.querySelectorAll('[data-q]').forEach(a=>a.onclick=e=>{e.preventDefault();q.value=a.dataset.q;go(a.dataset.q)});
// na própria loja, links de categoria filtram sem recarregar
if(isIndex) document.querySelectorAll('#gmenu a[href*="?cat="]').forEach(a=>a.onclick=e=>{e.preventDefault();close();setCat(new URL(a.href).searchParams.get('cat'))});
document.getElementById('gmenu').addEventListener('click',()=>g.classList.remove('open'));
})();

(()=>{const s=document.createElement('script');s.src=new URL('cart.js?v=3',(document.currentScript&&document.currentScript.src)||location.href).href;s.defer=true;(document.readyState==='loading'?document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(s)):document.body.appendChild(s))})();

/* ===== Rodapé padrão Grid 402 (todas as páginas, menos o blog) ===== */
(()=>{
if(/\/blog(\.html|\/|$)|\/post\.html/.test(location.pathname)||window.POST_ID)return;
const CL=/antigos\.html/.test(location.pathname)||!!document.querySelector('footer.cfoot');
const cats=[['injecao','Injeção'],['turbo','Turbo'],['motor','Motor'],['nitro','Nitro'],['rodas','Rodas'],['acessorios','Acessórios até R$ 300'],['freios','Freios'],['suspensao','Suspensão'],['ignicao','Velas de ignição'],['manutencao','Filtros e revisão']];
const mods=[['opala','Opala'],['maverick','Maverick'],['fusca','Fusca'],['chevette','Chevette'],['gol','Gol quadrado'],['galaxie','Galaxie']];
const y=new Date().getFullYear();
const st=document.createElement('style');st.textContent=`
.gfoot{background:${CL?'#2a1d12':'#0b0b0d'};color:${CL?'#e8dcc8':'#c7c7cc'};font-family:Inter,system-ui,sans-serif;padding:56px 0 26px;margin-top:40px}
.gfoot .gw{max-width:1240px;margin:0 auto;padding:0 22px}
.gfoot .gc{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr 1fr;gap:30px}
.gfoot .gl img{height:74px;width:auto;display:block}
.gfoot .gl p{font-size:14px;line-height:1.6;margin:14px 0 16px;max-width:300px;color:${CL?'#cdbfa8':'#a1a1a6'}}
.gfoot .gs{display:flex;gap:10px}.gfoot .gs a{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:${CL?'#3d2b1c':'#1c1c1f'};color:#fff;transition:.2s}.gfoot .gs a:hover{background:#e10600}
.gfoot h6{font:800 12px Inter,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#fff;margin:6px 0 14px}
.gfoot ul{list-style:none;margin:0;padding:0;display:grid;gap:9px}.gfoot ul a{color:inherit;font-size:14px;text-decoration:none}.gfoot ul a:hover{color:${CL?'#e0a060':'#ff3a30'}}
.gfoot .gb{border-top:1px solid ${CL?'#4a3624':'#222'};margin-top:40px;padding-top:20px;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;font-size:12.5px;color:${CL?'#a8977c':'#86868b'}}
.gfoot .gb b{color:#fff}
@media(max-width:900px){.gfoot .gc{grid-template-columns:1fr 1fr}.gfoot .gl{grid-column:1/-1}}
@media(max-width:520px){.gfoot{padding-top:40px}.gfoot .gc{gap:24px}}`;
document.head.appendChild(st);
const ig='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
const fb='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>';
const html=`<footer class="gfoot"><div class="gw"><div class="gc">
<div class="gl"><a href="index.html" aria-label="Grid 402 Performance"><img src="logo-sm.png" alt="Grid 402 Performance" loading="lazy"></a>
<p>Peças de performance para arrancada e peças para carros antigos. Compra segura pelo Mercado Livre.</p>
<div class="gs"><a href="https://www.instagram.com/grid402performance/" target="_blank" rel="noopener" aria-label="Instagram">${ig}</a><a href="https://www.facebook.com/profile.php?id=61588606083936" target="_blank" rel="noopener" aria-label="Facebook">${fb}</a></div></div>
<div><h6>Loja</h6><ul>${cats.map(c=>`<li><a href="pecas/${c[0]}">${c[1]}</a></li>`).join('')}<li><a href="loja.html"><b>Ver todos →</b></a></li></ul></div>
<div><h6>Clássicos</h6><ul>${mods.map(m=>`<li><a href="pecas/${m[0]}">Peças ${m[1]}</a></li>`).join('')}<li><a href="loja.html?cat=classicos"><b>Todos os modelos →</b></a></li></ul></div>
<div><h6>Navegar</h6><ul><li><a href="index.html">Home</a></li><li><a href="loja.html">Loja</a></li><li><a href="na-pista.html">Na pista</a></li><li><a href="eventos.html">Eventos</a></li><li><a href="vestuario.html">Vestuário</a></li><li><a href="blog.html">Blog</a></li></ul></div>
<div><h6>Ferramentas</h6><ul><li><a href="na-pista.html#tempo">Tempo do carro</a></li><li><a href="na-pista.html">Tempo de reação</a></li><li><a href="na-pista.html">Calculadora de bico</a></li><li><a href="#" onclick="window.G4projeto&&G4projeto.open();return false">🛒 Meu projeto</a></li></ul></div>
</div>
<div class="gb"><span>© ${y} <b>Grid 402 Performance</b>. Todos os direitos reservados.</span><span>Os produtos são vendidos e entregues pelo Mercado Livre. Links de afiliado.</span></div>
${'<span id="y" hidden></span>'}</div></footer>`;
const put=()=>{const old=document.querySelector('footer:not(.gfoot)');if(old){old.outerHTML=html}else if(!document.querySelector('.gfoot'))document.body.insertAdjacentHTML('beforeend',html)};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',put):put();
})();
