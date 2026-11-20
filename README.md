# Grid 402 Performance
Site de peças para arrancada e carros antigos (links de afiliado Mercado Livre).
Hospedado na Cloudflare Pages.

## Rotina de atualização
1. Atualizar preços em `produtos.js` / `antigos.js` (nunca trocar os links meli.la).
2. `node tools/gerar-paginas.js` — regera as páginas /pecas/ (grade, preços, dados estruturados, FAQ) e o lastmod do sitemap.
3. Imagens novas em base64: `node tools/extrair-imagens.js produtos.js antigos.js vestuario.js` (salva em img/p/).
4. Textos e perguntas frequentes das páginas de peças: `tools/seo-conteudo.js`.
