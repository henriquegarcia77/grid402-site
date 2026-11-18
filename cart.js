/* Grid 402 — "Meu projeto": lista de peças montada pelo visitante.
   Cada item abre no Mercado Livre pelo link de afiliado (meli.la). */
(()=>{
if(window.__g4cart)return;window.__g4cart=1;
const KEY='g402projeto';
const brl=v=>v?v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):'';
let cart=[];try{cart=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){};paint()};
const code=l=>(l.match(/meli\.la\/(\w+)/)||[])[1];
const g=n=>{try{return eval(n)}catch(e){return window[n]||[]}};
const pools=()=>[].concat(g('PRODUTOS')||[],(g('PECAS_ANTIGOS')||[]).map(p=>({...p,marca:p.marca||p.tipo})),g('VESTUARIO')||[]);
const find=l=>pools().find(p=>p.link===l);
const fromDom=a=>{const img=a.querySelector('img');const h=a.querySelector('h2,h3,h4,b');const t=(a.innerText||'').match(/R\$\s?([\d.]+,\d{2})/);
  return{link:a.href,nome:(img&&img.alt)||(h&&h.textContent.trim())||'Peça',img:img?img.getAttribute('src'):'',preco:t?parseFloat(t[1].replace(/\./g,'').replace(',','.')):0}};
const has=l=>cart.some(x=>x.link===l);

/* estilos */
const st=document.createElement('style');st.textContent=`
.g4add{position:absolute;top:10px;right:10px;z-index:5;border:0;background:#fff;color:#111;font:700 12px/1 Inter,system-ui,sans-serif;padding:8px 11px;border-radius:99px;box-shadow:0 4px 14px rgba(0,0,0,.18);cursor:pointer;display:flex;gap:5px;align-items:center;transition:.2s}
.g4add:hover{transform:scale(1.06)}.g4add.on{background:#e10600;color:#fff}
.g4fab{position:fixed;right:18px;bottom:18px;z-index:9998;background:#111;color:#fff;border:0;border-radius:99px;padding:14px 20px;font:700 15px Inter,system-ui,sans-serif;box-shadow:0 12px 30px rgba(0,0,0,.35);cursor:pointer;display:none;align-items:center;gap:10px}
.g4fab i{font-style:normal;background:#e10600;border-radius:99px;min-width:24px;height:24px;display:grid;place-items:center;font-size:13px;padding:0 6px}
.g4fab.show{display:flex}.g4fab.pop{animation:g4pop .45s}
@keyframes g4pop{40%{transform:scale(1.15)}}
.g4ov{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;opacity:0;pointer-events:none;transition:.3s}
.g4clip{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:10000}.g4open .g4clip{pointer-events:auto}
.g4dr{position:absolute;top:0;right:0;bottom:0;pointer-events:auto;width:min(440px,100%);background:#f5f5f7;z-index:10000;transform:translateX(100%);transition:.35s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column;font-family:Inter,system-ui,sans-serif;color:#1d1d1f}
.g4open .g4ov{opacity:1;pointer-events:auto}.g4open .g4dr{transform:none}
.g4hd{padding:22px 22px 14px;background:#111;color:#fff}.g4hd small{color:#ff3a30;font:700 11px monospace;letter-spacing:.2em}
.g4hd h3{font-size:26px;margin:6px 0 4px;letter-spacing:-.02em;color:#fff}.g4hd p{font-size:13px;color:#aaa;margin:0}
.g4x{position:absolute;top:16px;right:16px;background:#222;color:#fff;border:0;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer}
.g4ls{flex:1;overflow:auto;padding:14px}
.g4it{display:flex;gap:12px;align-items:center;background:#fff;border-radius:16px;padding:10px;margin-bottom:10px;border:1px solid #e5e5ea}
.g4it img{width:64px;height:64px;object-fit:contain;border-radius:10px;background:#fff;flex:none}
.g4it .t{flex:1;min-width:0}.g4it b{display:block;font-size:13px;line-height:1.3;max-height:2.6em;overflow:hidden}
.g4it em{font-style:normal;font-weight:700;font-size:14px}
.g4it a{display:inline-block;margin-top:6px;background:#ffe600;color:#111;font-weight:700;font-size:12px;padding:7px 11px;border-radius:99px;text-decoration:none;border:0}
.g4it.done a{background:#e8f8ee;color:#0a8a35}.g4it.done a::before{content:"✔ "}
.g4rm{background:none;border:0;color:#999;font-size:20px;cursor:pointer;align-self:flex-start}
.g4em{text-align:center;color:#888;padding:40px 20px;font-size:15px;line-height:1.6}
.g4ft{padding:16px 18px 22px;background:#fff;border-top:1px solid #e5e5ea}
.g4tot{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px}.g4tot span{color:#666;font-size:13px}.g4tot b{font-size:24px;letter-spacing:-.02em}
.g4bt{display:block;width:100%;border:0;border-radius:14px;padding:15px;font:700 15px Inter,system-ui,sans-serif;cursor:pointer;margin-top:8px}
.g4b1{background:#e10600;color:#fff}.g4b2{background:#111;color:#fff}.g4b3{background:none;color:#888;font-size:13px;padding:8px}
.g4note{font-size:11.5px;color:#888;line-height:1.5;margin-top:10px;text-align:center}
.g4toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);max-width:min(420px,90vw);text-align:center;background:#111;color:#fff;padding:12px 18px;border-radius:12px;font:600 14px Inter,system-ui,sans-serif;z-index:10001;opacity:0;transition:.3s;pointer-events:none}
.g4toast.on{opacity:1}
.g4ex{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10002;display:grid;place-items:center;padding:16px;opacity:0;transition:.3s}.g4ex.on{opacity:1}
.g4exb{background:#111;color:#fff;border-radius:24px;padding:26px;max-width:560px;width:100%;position:relative;font-family:Inter,system-ui,sans-serif;transform:translateY(20px) scale(.97);transition:.35s cubic-bezier(.16,1,.3,1);box-shadow:0 30px 80px rgba(0,0,0,.5)}.g4ex.on .g4exb{transform:none}
.g4exb small{color:#ff3a30;font:700 11px monospace;letter-spacing:.2em}.g4exb h3{font-size:26px;margin:6px 0 4px;color:#fff;letter-spacing:-.02em}.g4exb p{color:#aaa;font-size:14px;margin:0 0 16px}
.g4exx{position:absolute;top:14px;right:14px;background:#222;color:#fff;border:0;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:15px}
.g4exl{display:grid;gap:10px}.g4exi{display:flex;gap:12px;align-items:center;background:#fff;color:#111;border-radius:14px;padding:10px;text-decoration:none;position:relative}
.g4exi img{width:64px;height:64px;object-fit:contain;flex:none}.g4exi span{display:flex;flex-direction:column;min-width:0}.g4exi b{font-size:13px;line-height:1.3;max-height:2.6em;overflow:hidden}.g4exi em{font-style:normal;font-weight:800;color:#e10600;font-size:17px}.g4exi i{font-style:normal;background:#e10600;color:#fff;font:800 10px Inter,sans-serif;padding:3px 7px;border-radius:4px;align-self:flex-start;margin-bottom:3px}
.g4exi .g4add{display:none}
.g4exall{display:block;text-align:center;margin-top:14px;background:#e10600;color:#fff;border-radius:14px;padding:14px;font-weight:700;text-decoration:none}
body.g4sticky .g4fab{bottom:100px}
@media(max-width:600px){.g4add{padding:7px 9px;font-size:11px}.g4fab{right:12px;bottom:12px;padding:12px 16px}}
`;document.head.appendChild(st);

/* interface */
const wrap=document.createElement('div');wrap.innerHTML=`
<button class="g4fab" id="g4fab">🛒 Meu projeto <i id="g4n">0</i></button>
<div class="g4ov" id="g4ov"></div>
<div class="g4clip"><aside class="g4dr" aria-label="Meu projeto"><div class="g4hd"><small>// MONTE SEU PROJETO</small><h3>Meu projeto</h3><p id="g4sub"></p><button class="g4x" id="g4x" aria-label="Fechar">✕</button></div>
<div class="g4ls" id="g4ls"></div>
<div class="g4ft"><div class="g4tot"><span>Total estimado</span><b id="g4tot">R$ 0</b></div>
<button class="g4bt g4b1" id="g4all">Abrir no Mercado Livre</button>
<button class="g4bt g4b2" id="g4sh">Compartilhar projeto</button>
<button class="g4bt g4b3" id="g4clr">Limpar projeto</button>
<p class="g4note">Cada peça abre em uma aba do Mercado Livre: adicione ao carrinho de lá, volte aqui e abra a próxima. No fim, finalize tudo no carrinho do Mercado Livre. Preços podem variar.</p></div></aside></div>
<div class="g4toast" id="g4toast"></div>`;
document.body.appendChild(wrap);
const $=id=>document.getElementById(id);
const toast=m=>{const t=$('g4toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),m.length>60?6000:2200)};
const open=()=>document.documentElement.classList.add('g4open'),close=()=>document.documentElement.classList.remove('g4open');
$('g4fab').onclick=open;$('g4x').onclick=close;$('g4ov').onclick=close;
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});

function paint(){
  const n=cart.length;$('g4n').textContent=n;$('g4fab').classList.toggle('show',n>0);
  const tot=cart.reduce((s,x)=>s+(x.preco||0),0);$('g4tot').textContent=brl(tot)||'—';
  $('g4sub').textContent=n?`${n} ${n>1?'peças':'peça'} · ${cart.filter(x=>x.ok).length} já abertas`:'Adicione peças para montar seu projeto';
  $('g4ls').innerHTML=n?cart.map((x,i)=>`<div class="g4it${x.ok?' done':''}">${x.img?`<img src="${x.img}" alt="" loading="lazy">`:''}<div class="t"><b>${x.nome}</b><em>${brl(x.preco)}</em><br><a href="${x.link}" target="_blank" rel="sponsored noopener" data-i="${i}">Abrir no Mercado Livre</a></div><button class="g4rm" data-r="${i}" aria-label="Remover">×</button></div>`).join('')
    :`<div class="g4em">🔧<br><b>Seu projeto está vazio.</b><br>Toque em <b>🛒 Adicionar</b> nas peças da loja, dos clássicos ou do blog para montar sua lista.</div>`;
  const pend=cart.filter(x=>!x.ok).length;$('g4all').textContent=!n?'Abrir no Mercado Livre':pend===n?(n>1?`Abrir todas no Mercado Livre (${n})`:'Abrir no Mercado Livre'):pend?`Abrir próxima peça (${n-pend+1} de ${n})`:'Abrir todas de novo';
  document.querySelectorAll('.g4add').forEach(b=>{const on=has(b._l);b.classList.toggle('on',on);b.innerHTML=on?'✔ No projeto':'🛒 Adicionar'});
}
$('g4ls').addEventListener('click',e=>{const a=e.target.closest('a[data-i]');if(a){cart[a.dataset.i].ok=1;setTimeout(save,50)}
  const r=e.target.closest('[data-r]');if(r){cart.splice(+r.dataset.r,1);save()}});
/* Navegadores só permitem abrir 1 aba por clique: abrimos uma peça por vez e o botão vira "Abrir próxima peça". */
/* Tenta abrir todas as peças pendentes de uma vez. Se o navegador bloquear pop-ups,
   as que faltarem continuam no botão "Abrir próxima peça" (1 aba por clique). */
$('g4all').onclick=()=>{if(!cart.length)return;if(!cart.some(x=>!x.ok))cart.forEach(x=>x.ok=0);
  let opened=0,blocked=0;
  cart.forEach(x=>{if(x.ok)return;if(blocked){return}const w=window.open(x.link,'_blank');
    if(w){try{w.opener=null}catch(e){}x.ok=1;opened++}else blocked++});
  save();const rest=cart.filter(x=>!x.ok).length;
  if(rest)toast(`${opened} aberta${opened>1?'s':''}. Seu navegador bloqueou as outras: toque de novo para abrir a próxima, ou permita pop-ups deste site para abrir todas de uma vez.`);
  else toast(opened>1?`${opened} peças abertas no Mercado Livre 🏁`:'Peça aberta no Mercado Livre 🏁')};
$('g4sh').onclick=async()=>{const url=location.origin+'/?projeto='+cart.map(x=>code(x.link)).filter(Boolean).join('.');
  const txt=`Meu projeto na Grid 402 (${cart.length} peças):`;
  try{if(navigator.share){await navigator.share({title:'Meu projeto Grid 402',text:txt,url});return}}catch(e){return}
  try{await navigator.clipboard.writeText(url);toast('Link do projeto copiado!')}catch(e){prompt('Copie o link do seu projeto:',url)}};
$('g4clr').onclick=()=>{if(cart.length&&confirm('Limpar todas as peças do projeto?')){cart=[];save()}};

function add(item){if(has(item.link)){cart=cart.filter(x=>x.link!==item.link);save();toast('Removido do projeto');return}
  cart.push({link:item.link,nome:item.nome,img:item.img||'',preco:item.preco||0});save();
  const f=$('g4fab');f.classList.remove('pop');void f.offsetWidth;f.classList.add('pop');toast('Adicionado ao seu projeto 🏁')}

/* botões "+ Projeto" em todos os cards de produto com link de afiliado */
function scan(){document.querySelectorAll('a[href^="https://meli.la/"]').forEach(a=>{
  if(a.__g4||a.classList.contains('plink')||!a.querySelector('img,h2,h3,h4')||a.closest('.g4dr'))return;a.__g4=1;
  if(getComputedStyle(a).position==='static')a.style.position='relative';
  const b=document.createElement('button');b.type='button';b.className='g4add';b._l=a.href;
  b.onclick=e=>{e.preventDefault();e.stopPropagation();add(find(a.href)||fromDom(a))};
  a.appendChild(b)});paint()}
let tm;new MutationObserver(()=>{clearTimeout(tm);tm=setTimeout(scan,120)}).observe(document.body,{childList:true,subtree:true});
scan();
if(document.getElementById('sbar'))document.body.classList.add('g4sticky');

/* projeto compartilhado: ?projeto=cod1.cod2 */
const sp=new URLSearchParams(location.search).get('projeto');
if(sp){const codes=sp.split(/[.,]/).filter(Boolean);
  const go=()=>{let n=0;codes.forEach(c=>{const l='https://meli.la/'+c;if(has(l))return;const p=find(l);cart.push({link:l,nome:p?p.nome:'Peça do projeto',img:p?p.img:'',preco:p?p.preco:0});n++});
    save();open();if(n)toast('Projeto compartilhado carregado!')};
  const miss=codes.some(c=>!find('https://meli.la/'+c));
  if(miss&&!(g('PECAS_ANTIGOS')||[]).length){const s=document.createElement('script');s.src=new URL('antigos.js',document.querySelector('script[src*="cart.js"]').src).href;s.onload=go;s.onerror=go;document.head.appendChild(s)}else go()}
function addMany(list){let n=0;list.forEach(p=>{if(p&&p.link&&!has(p.link)){cart.push({link:p.link,nome:p.nome,img:p.img||'',preco:p.preco||p.v||0});n++}});save();open();toast(n?`${n} peças adicionadas ao projeto 🏁`:'Essas peças já estão no projeto')}
window.G4projeto={open,add,addMany};
/* ===== Oferta ao sair (exit-intent): 1x por sessão ===== */
(()=>{let shown=false;try{shown=sessionStorage.getItem('g4exit')==='1'}catch(e){}
const t0=Date.now();
function pick(){const P=(g('PRODUTOS')||[]).filter(p=>p.img&&p.preco);if(!P.length)return[];
  const off=p=>p.de>p.preco?(1-p.preco/p.de):0;
  let L=P.filter(p=>off(p)>0).sort((a,b)=>off(b)-off(a));
  if(L.length<3)L=L.concat(P.filter(p=>p.preco<=300&&p.img.startsWith('data:')&&!L.includes(p)).sort(()=>Math.random()-.5));
  return L.slice(0,3)}
function show(){if(shown||Date.now()-t0<8000||document.documentElement.classList.contains('g4open'))return;const L=pick();if(L.length<2)return;
  shown=true;try{sessionStorage.setItem('g4exit','1')}catch(e){}
  const off=p=>p.de>p.preco?Math.round((1-p.preco/p.de)*100):0;
  const d=document.createElement('div');d.className='g4ex';d.innerHTML=`<div class="g4exb" role="dialog" aria-label="Ofertas"><button class="g4exx" aria-label="Fechar">✕</button>
  <small>// ANTES DE SAIR</small><h3>Peças em oferta pra você 🏁</h3><p>Separamos algumas peças com preço bom hoje no Mercado Livre.</p>
  <div class="g4exl">${L.map(p=>`<a href="${p.link}" target="_blank" rel="sponsored noopener" class="g4exi"><img src="${p.img}" alt=""><span>${off(p)?`<i>${off(p)}% OFF</i>`:''}<b>${p.nome}</b><em>${brl(p.preco)}</em></span></a>`).join('')}</div>
  <a class="g4exall" href="${new URL('loja.html?preco=0-300',document.querySelector('script[src*="cart.js"]').src).href}">Ver peças até R$ 300 →</a></div>`;
  document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add('on'));
  const cl=()=>{d.classList.remove('on');setTimeout(()=>d.remove(),300)};d.onclick=e=>{if(e.target===d||e.target.closest('.g4exx'))cl()};
  document.addEventListener('keydown',function k(e){if(e.key==='Escape'){cl();document.removeEventListener('keydown',k)}})}
document.addEventListener('mouseout',e=>{if(!e.relatedTarget&&e.clientY<=8)show()});
let lastY=scrollY,lastT=Date.now();addEventListener('scroll',()=>{const n=Date.now(),dy=lastY-scrollY,dt=n-lastT;if(matchMedia('(pointer:coarse)').matches&&dy>600&&dt<400&&scrollY>1200)show();lastY=scrollY;lastT=n},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){try{sessionStorage.setItem('g4away','1')}catch(e){}}else{try{if(sessionStorage.getItem('g4away')==='1'&&matchMedia('(pointer:coarse)').matches){sessionStorage.removeItem('g4away');show()}}catch(e){}}});
})();

})();
