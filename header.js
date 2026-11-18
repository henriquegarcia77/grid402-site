try{sessionStorage.setItem('g402load','1');if(!/index\.html$|\/$/.test(location.pathname))localStorage.setItem('g402visit',Date.now())}catch(e){}
/* Cabeçalho estilo Apple — igual em todas as páginas */
(()=>{
const LOGO='<img src="logo-sm.png" alt="Grid 402 Performance" class="hlogo">';
const SEARCH='<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>';
const BAG='<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
const links=[["Home","index.html"],["Loja","loja.html"],["Carros antigos","antigos.html"],["Na pista","na-pista.html"],["Eventos","eventos.html"],["Vestuário","vestuario.html"],["Blog","blog.html"]];
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

(()=>{const s=document.createElement('script');s.src=new URL('cart.js?v=1',(document.currentScript&&document.currentScript.src)||location.href).href;s.defer=true;(document.readyState==='loading'?document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(s)):document.body.appendChild(s))})();
