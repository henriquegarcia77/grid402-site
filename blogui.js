/* capa dinâmica dos posts: usa as fotos dos produtos recomendados no próprio post */
function postProds(p){const ls=[...p.texto.matchAll(/data-l="([^"]+)"/g)].flatMap(m=>m[1].split(','));return ls.map(l=>PRODUTOS.find(x=>x.link===l)).filter(Boolean)}
function coverHTML(p,big){const pr=postProds(p).slice(0,3);
  return `<div class="pcover${big?' big':''}" style="--c:${p.cor}"><div class="pc-bg"></div><div class="pc-grid"></div>
  ${pr.map((x,i)=>`<img class="pc-i pc-i${i}" src="${x.img}" alt="">`).join('')}<span class="pc-tag">${p.categoria}</span><b class="pc-402">402</b></div>`}
