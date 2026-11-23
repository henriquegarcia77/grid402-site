/* Gera o conteúdo das páginas /pecas/*.html a partir de produtos.js e antigos.js.
   Uso (na pasta do site):  node tools/gerar-paginas.js
   - Atualiza a grade de produtos (preços do dia, remove o que saiu do catálogo)
   - Atualiza os dados estruturados (CollectionPage + Product/Offer + Breadcrumb + FAQPage)
   - Insere textos de apoio e perguntas frequentes de tools/seo-conteudo.js
   - Atualiza o lastmod do sitemap.xml
   Rode depois de cada atualização de preços. */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const SITE = 'https://grid402performance.com.br';
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const PRODUTOS = eval(rd('produtos.js') + ';PRODUTOS');
const CATEGORIAS = eval(rd('produtos.js') + ';CATEGORIAS');
const PECAS = eval(rd('antigos.js') + ';PECAS_ANTIGOS');
const MODELOS = eval(rd('antigos.js') + ';MODELOS');
const POSTS = eval(rd('posts.js') + ';POSTS');
const SEO = require('./seo-conteudo.js');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const brl = v => 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const absImg = u => /^https?:/.test(u) ? u : SITE + '/' + u.replace(/^\//, '');
const hoje = new Date().toISOString().slice(0, 10);

const CATS = CATEGORIAS.map(c => c.id);
const MODS = MODELOS.map(m => m.id);

// páginas especiais (banners e carrosséis da home)
const offP = p => p.de > p.preco && p.preco ? Math.round((1 - p.preco / p.de) * 100) : 0;
const vendN = p => { const m = String(p.vendidos || '').match(/([\d.]+)\s*(mil)?/); return m ? parseFloat(m[1].replace('.', '')) * (m[2] ? 1000 : 1) : 0; };
const TODOS = (() => { const v = new Set(), out = []; for (const p of [...PRODUTOS, ...PECAS]) { if (!p.preco || v.has(p.link)) continue; v.add(p.link); out.push(p); } return out; })();
const ESP = {
  'black-november': () => TODOS.filter(p => offP(p) >= 3).sort((a, b) => offP(b) - offP(a)).map(p => ({ ...p, rot: offP(p) + '% OFF' })),
  'fueltech': () => TODOS.filter(p => /fueltech|ft ?(250|300|450|550|600|700)\b/i.test(p.nome + ' ' + (p.marca || ''))).sort((a, b) => offP(b) - offP(a) || vendN(b) - vendN(a)).map(p => ({ ...p, rot: offP(p) ? offP(p) + '% OFF' : (p.marca || 'FuelTech') })),
  'ofertas-turbo': () => TODOS.filter(p => p.categoria === 'turbo' || /turbo|turbina|wastegate|blow ?off|intercooler/i.test(p.nome)).sort((a, b) => offP(b) - offP(a) || vendN(b) - vendN(a)).map(p => ({ ...p, rot: offP(p) ? offP(p) + '% OFF' : (p.marca || 'Turbo') })),
  'ofertas-opala': () => TODOS.filter(p => p.modelo === 'opala' || /opala/i.test(p.nome)).sort((a, b) => offP(b) - offP(a) || vendN(b) - vendN(a)).map(p => ({ ...p, rot: offP(p) ? offP(p) + '% OFF' : (p.tipo || 'Opala') })),
  'mais-vendidos': () => TODOS.filter(p => vendN(p) >= 100).sort((a, b) => vendN(b) - vendN(a) || (b.nota || 0) - (a.nota || 0)).map(p => ({ ...p, rot: p.vendidos + ' vendidos' })),
};
function itens(slug) {
  if (ESP[slug]) return ESP[slug]();
  if (CATS.includes(slug)) return PRODUTOS.filter(p => p.categoria === slug).map(p => ({ ...p, rot: p.marca || '' }));
  if (MODS.includes(slug)) return PECAS.filter(p => p.modelo === slug).map(p => ({ ...p, rot: p.tipo || '' }));
  return null;
}

function card(p) {
  const de = p.de && p.de > p.preco ? `<s>${brl(p.de)}</s>` : '';
  return `<a href="${p.link}" target="_blank" rel="sponsored noopener"><img src="${esc(p.img)}" alt="${esc(p.nome)}" loading="lazy" decoding="async" width="300" height="300"><small>${esc(p.rot)}</small>${p.vendidos&&/mil|1000/.test(p.vendidos)?'<i class="hot">🔥 MAIS VENDIDO</i>':''}<h2>${esc(p.nome)}</h2>${(p.nota||p.vendidos||p.chega)?`<div class="ps">${[p.nota&&`<b>★ ${(+p.nota).toFixed(1)}</b>`,p.vendidos&&`${p.vendidos} vendidos`,p.chega&&`<span class="ch">Chega ${p.chega}</span>`].filter(Boolean).join(' · ')}</div>`:''}${de}<b>${brl(p.preco)}</b><em>Ver no Mercado Livre →</em></a>`;
}

const CSS = `<style id="seo-css">.lp .txt{max-width:780px;font-size:17px;line-height:1.7;color:#333;margin-top:10px}.lp .txt h2{font-size:26px;margin:34px 0 10px;letter-spacing:-.02em;line-height:1.2}.lp .txt p{margin-bottom:14px}
.lpg s{color:var(--mut);font-size:13px}.lp .sec{font-size:24px;margin:44px 0 14px;letter-spacing:-.02em}
.faq{max-width:780px}.faq details{background:#fff;border:1px solid var(--line);border-radius:16px;padding:16px 20px;margin-bottom:10px}.faq summary{font-weight:700;cursor:pointer;font-size:16px;list-style:none;display:flex;justify-content:space-between;gap:12px}.faq summary::-webkit-details-marker{display:none}.faq summary:after{content:"+";color:var(--red);font-size:22px;line-height:1}.faq details[open] summary:after{content:"–"}.faq details p{margin-top:10px;color:#333;line-height:1.65}
.rel{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;max-width:1100px}.rel a{background:#fff;border:1px solid var(--line);border-radius:16px;padding:16px 18px;font-weight:600;line-height:1.35;transition:.2s}.rel a:hover{border-color:var(--red);color:var(--red)}.rel a span{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--red);font-weight:700;margin-bottom:6px}
.upd{font-size:13px;color:var(--mut);margin-top:6px}</style>`;

const nomes = {};
const files = fs.readdirSync(path.join(ROOT, 'pecas')).filter(f => f.endsWith('.html'));
for (const f of files) {
  const s = rd('pecas/' + f);
  nomes[f.replace('.html', '')] = (s.match(/<h1>(.*?)<\/h1>/) || [])[1] || f;
}

let feitos = 0;
for (const f of files) {
  const slug = f.replace('.html', '');
  const lista = itens(slug);
  if (!lista) { console.log('sem dados para', slug); continue; }
  let s = rd('pecas/' + f);
  const h1 = nomes[slug];
  const crumb = (s.match(/<nav class="crumb">.*?<\/nav>/) || [''])[0];
  const introOld = (s.match(/<p class="intro">(.*?)<\/p>/) || ['', ''])[1];
  const introBase = introOld.replace(/\s*São \d+ produtos selecionados[^.]*\.?/, '').trim();
  const intro = `${introBase} São ${lista.length} produtos selecionados, com compra e entrega pelo Mercado Livre.`;
  const seo = SEO[slug] || { textos: [], faq: [], posts: [] };
  const url = `${SITE}/pecas/${slug}`;

  const txt = seo.textos.length ? `<div class="txt">${seo.textos.map(([h, p]) => `<h2>${esc(h)}</h2><p>${esc(p)}</p>`).join('')}</div>` : '';
  const faq = seo.faq.length ? `<h2 class="sec">Perguntas frequentes</h2><div class="faq">${seo.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>` : '';
  const posts = seo.posts.map(id => POSTS.find(p => p.id === id)).filter(Boolean);
  const rel = posts.length ? `<h2 class="sec">Guias do blog</h2><div class="rel">${posts.map(p => `<a href="blog/${p.id}"><span>${esc(p.categoria || 'Guia')}</span>${esc(p.titulo)}</a>`).join('')}</div>` : '';
  const grupo = (CATS.includes(slug) || ESP[slug]) ? CATS : MODS;
  const chips = `<h2 class="sec">${(CATS.includes(slug) || ESP[slug]) ? 'Outras categorias' : 'Peças para outros modelos'}</h2><div class="chips">${grupo.filter(x => x !== slug && nomes[x]).map(x => `<a href="pecas/${x}">${esc(nomes[x])}</a>`).join('')}<a href="${CATS.includes(slug) ? 'antigos' : 'loja'}">${CATS.includes(slug) ? 'Peças para carros antigos' : 'Peças de performance'}</a><a href="loja">Ver toda a loja</a></div>`;

  const main = `<main class="lp">${crumb}<h1>${h1}</h1><p class="intro">${intro}</p><div class="lpg">${lista.map(card).join('')}</div>${txt}${faq}${rel}${chips}<p class="aff">Os links são de afiliado do Mercado Livre: você paga o mesmo preço e ajuda o Grid 402.</p></main>`;
  s = s.replace(/<main class="lp">[\s\S]*?<\/main>/, main);

  const crumbLd = [{ '@type': 'ListItem', position: 1, name: 'Início', item: SITE + '/' }];
  if (MODS.includes(slug)) crumbLd.push({ '@type': 'ListItem', position: 2, name: 'Carros antigos', item: SITE + '/antigos' });
  crumbLd.push({ '@type': 'ListItem', position: crumbLd.length + 1, name: h1.replace(/<[^>]+>/g, ''), item: url });
  const graph = [
    {
      '@type': 'CollectionPage', '@id': url + '#pagina', name: h1.replace(/<[^>]+>/g, ''), url, inLanguage: 'pt-BR', dateModified: hoje,
      description: (s.match(/name="description" content="(.*?)"/) || [])[1],
      isPartOf: { '@type': 'WebSite', name: 'Grid 402 Performance', url: SITE + '/' },
      mainEntity: {
        '@type': 'ItemList', numberOfItems: lista.length,
        itemListElement: lista.map((p, i) => ({
          '@type': 'ListItem', position: i + 1,
          item: {
            '@type': 'Product', name: p.nome, image: absImg(p.img), ...(p.marca ? { brand: { '@type': 'Brand', name: p.marca } } : {}),
            offers: { '@type': 'Offer', price: Number(p.preco).toFixed(2), priceCurrency: 'BRL', availability: 'https://schema.org/InStock', url: p.link, seller: { '@type': 'Organization', name: 'Mercado Livre' } }
          }
        }))
      }
    },
    { '@type': 'BreadcrumbList', itemListElement: crumbLd }
  ];
  if (seo.faq.length) graph.push({ '@type': 'FAQPage', mainEntity: seo.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  const ld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
  s = s.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, ld);
  s = s.replace(/<style id="seo-css">[\s\S]*?<\/style>/, '');
  s = s.replace('</head>', CSS + '</head>');
  fs.writeFileSync(path.join(ROOT, 'pecas', f), s);
  feitos++;
  console.log(slug.padEnd(12), lista.length, 'produtos');
}

// sitemap: lastmod de hoje para as páginas de peças, loja e antigos
let sm = rd('sitemap.xml');
sm = sm.replace(/(<loc>[^<]*\/(?:pecas\/[\w-]+|loja|antigos)<\/loc><lastmod>)[^<]*/g, `$1${hoje}`);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sm);
console.log('páginas geradas:', feitos);
// data da última conferência de preços (mostrada na home e na loja)
require('fs').writeFileSync(require('path').join(__dirname,'..','precos-data.js'),`window.PRECOS_EM="${new Date().toISOString().slice(0,10)}";\n`);
