/* Gera (ou regera) o HTML estático dos posts do blog a partir de posts.js.
   Uso: node tools/gerar-post.js id1 id2 ...   (sem ids = regera todos)
   Usa blog/weber-nao-segura-lenta-morre.html como modelo. FAQPage é montado a partir de <h3>pergunta?</h3><p>resposta</p>. */
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..'), SITE = 'https://grid402performance.com.br';
const POSTS = eval(fs.readFileSync(path.join(R, 'posts.js'), 'utf8') + ';POSTS');
const tpl = fs.readFileSync(path.join(R, 'blog', 'weber-nao-segura-lenta-morre.html'), 'utf8');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const ids = process.argv.slice(2);
const v = (tpl.match(/posts\.js\?v=(\d+)/) || [])[1];
for (const p of POSTS) {
  if (ids.length && !ids.includes(p.id)) continue;
  const url = `${SITE}/blog/${p.id}`;
  const img = p.capaImg ? `${SITE}/${p.capaImg}` : `${SITE}/og.jpg`;
  const faq = [...p.texto.matchAll(/<h3>([^<]*\?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map(m => ({ '@type': 'Question', name: strip(m[1]), acceptedAnswer: { '@type': 'Answer', text: strip(m[2]) } }));
  const palavras = strip(p.texto).split(' ').length;
  const art = { '@context': 'https://schema.org', '@type': 'Article', headline: p.titulo, description: p.resumo, datePublished: p.data, dateModified: p.atualizado || p.data, image: img, wordCount: palavras, author: { '@type': 'Organization', name: 'Grid 402 Performance' }, publisher: { '@type': 'Organization', name: 'Grid 402 Performance', logo: { '@type': 'ImageObject', url: SITE + '/logo.png' } }, mainEntityOfPage: url };
  const seo = `<!--seo--><meta name="description" content="${esc(p.resumo)}">${p.kw ? `<meta name="keywords" content="${esc(p.kw)}">` : ''}<link rel="canonical" href="${url}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(p.titulo)}"><meta property="og:description" content="${esc(p.resumo)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${img}"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${JSON.stringify(art)}</script>${faq.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq })}</script>` : ''}<!--/seo-->`;
  let h = tpl.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.titulo)} | Grid 402</title>`)
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, seo)
    .replace(/<article class="hero-in" id="art">[\s\S]*?<\/article>/, `<article class="hero-in" id="art"><h1>${p.titulo}</h1><p>${esc(p.resumo)}</p><div class="txt">\n${p.texto}\n</div></article>`)
    .replace(/window\.POST_ID="[^"]*"/, `window.POST_ID="${p.id}"`);
  if (v) h = h.replace(/posts\.js\?v=\d+/, 'posts.js?v=' + Date.now());
  fs.writeFileSync(path.join(R, 'blog', p.id + '.html'), h);
  console.log(p.id, palavras, 'palavras', faq.length, 'FAQ');
}
