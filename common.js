document.querySelectorAll('[data-ml]').forEach(a=>{a.href=CONFIG.mercadoLivre;a.target='_blank'});
const y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:0,rootMargin:'0px 0px -10% 0px'});
document.querySelectorAll('.reveal,.stagger').forEach(el=>io.observe(el));

// ===== Cursor personalizado + barra de progresso (inspirado no site do Lando Norris) =====
(()=>{
  const fine=matchMedia('(pointer:fine)').matches;
  const bar=document.createElement('div');bar.className='g-prog';document.body.appendChild(bar);
  addEventListener('scroll',()=>{const h=document.documentElement;bar.style.transform=`scaleX(${h.scrollTop/(h.scrollHeight-h.clientHeight||1)})`},{passive:true});
  if(!fine)return;
  const dot=document.createElement('div'),ring=document.createElement('div');dot.className='g-dot';ring.className='g-ring';
  document.body.append(dot,ring);let x=0,y=0,rx=0,ry=0;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.transform=`translate(${x}px,${y}px)`});
  (function loop(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop)})();
  document.addEventListener('mouseover',e=>{ring.classList.toggle('big',!!e.target.closest('a,button,.ev,.mcard,.prod,.car,canvas'))});
})();
