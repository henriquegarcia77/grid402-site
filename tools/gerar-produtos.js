/* Gera uma página de texto para cada produto: /produto/<slug>.html
   Uso (na pasta do site): node tools/gerar-produtos.js
   - Lê produtos.js, antigos.js, posts.js e tools/fichas.json (ficha técnica e estoque lidos do anúncio)
   - Cada página tem: foto, preço do dia, prova social real, ficha técnica, texto de apoio por tipo de peça,
     dicas de escolha e instalação, perguntas frequentes, produtos parecidos e guias do blog
   - Dados estruturados: Product/Offer + BreadcrumbList + FAQPage
   - Atualiza o sitemap.xml (bloco <!--produtos-->) e grava produto-slugs.js (mapa link -> slug usado nos cartões) */
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
let FICHAS = {};
try { FICHAS = JSON.parse(rd('tools/fichas.json')); } catch (e) { }
const hoje = new Date().toISOString().slice(0, 10);

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const brl = v => 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const absImg = u => /^https?:/.test(u) ? u : SITE + '/' + String(u).replace(/^\//, '');
const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80).replace(/-[^-]*$/, m => m.length > 1 ? m : '');
const vendN = p => { const m = String(p.vendidos || '').match(/([\d.]+)\s*(mil)?/); return m ? parseFloat(m[1].replace('.', '')) * (m[2] ? 1000 : 1) : 0; };
const off = p => p.de > p.preco && p.preco ? Math.round((1 - p.preco / p.de) * 100) : 0;
const catNome = id => (CATEGORIAS.find(c => c.id === id) || {}).nome || id;
const modNome = id => (MODELOS.find(m => m.id === id) || {}).nome || id;

/* ---------- conhecimento por tipo de peça ---------- */
const G = {
  injecao: {
    tipo: 'módulo de injeção programável', serve: 'A injeção programável substitui o controle original (ou o carburador) e permite ajustar mistura, ponto de ignição, controle de pressão do turbo e estratégias de largada como 2-step e 3-step. É o coração de um carro preparado: com ela o motor trabalha com a mistura certa em cada faixa de giro e carga, o que dá mais potência e mais segurança.',
    escolher: ['Veja quantas saídas de injeção e de ignição o motor precisa (4, 6 ou 8 cilindros, sequencial ou semissequencial).', 'Confira se o módulo tem leitura de sonda wideband integrada ou se você vai precisar de um condicionador separado.', 'Para turbo, procure controle de boost e entradas para sensor de pressão (MAP) compatível com a pressão que você pretende usar.', 'Recursos de arrancada como 2-step, 3-step, corte por tempo e datalogger fazem diferença na pista.'],
    instalar: ['Use chicote de boa qualidade e aterramento direto no bloco e na bateria.', 'Comece com um mapa base conservador, mistura rica e ponto atrasado, e acerte com a sonda wideband.', 'Faça os ajustes finos em dinamômetro ou com acompanhamento de um preparador.'],
    posts: ['ft450-ou-ft550-qual-fueltech-comprar', 'carburado-para-injecao-programavel', 'sonda-wideband-o-que-e-qual-comprar']
  },
  alimentacao: {
    tipo: 'peça do sistema de alimentação', serve: 'O sistema de alimentação leva o combustível do tanque até o motor na pressão e na vazão certas. Bomba, filtro, linhas, regulador de pressão, bicos e carburador precisam conversar entre si: o elo mais fraco limita a potência e pode empobrecer a mistura em alta, que é a causa mais comum de quebra de motor preparado.',
    escolher: ['Dimensione a vazão da bomba e dos bicos pela potência alvo, com folga de pelo menos 20%.', 'Confira o combustível: álcool exige cerca de 30% a 40% mais vazão que gasolina e peças resistentes à corrosão.', 'Verifique o diâmetro das conexões (AN6, AN8) e se a linha de retorno acompanha a de ida.', 'Em carburado, a pressão costuma ficar baixa (em torno de 3 a 5 psi); em injeção, bem mais alta.'],
    instalar: ['Monte um manômetro de combustível para conferir a pressão em marcha lenta e em carga.', 'Use filtro antes da bomba e troque com frequência, principalmente com álcool.', 'Passe as linhas longe de escapamento e de partes móveis e prenda com abraçadeiras próprias.'],
    posts: ['bomba-combustivel-carburador-pressao', 'dosador-de-combustivel-1-1-como-regular', 'como-calcular-bico-injetor-turbo']
  },
  turbo: {
    tipo: 'peça para motor turbo', serve: 'Turbina, wastegate, blow off, intercooler e linhas de óleo formam o conjunto que faz o turbo encher, controla a pressão e protege o motor. Cada peça tem uma função: a turbina gera a pressão, a wastegate limita, a blow off alivia a tubulação quando você tira o pé e o intercooler esfria o ar para o motor aguentar mais pressão.',
    escolher: ['Escolha a turbina pela potência e pela cilindrada: turbina grande demais demora a encher na rua.', 'A mola da wastegate define a pressão mínima; o controle eletrônico define o restante.', 'Para o intercooler, olhe o tamanho da colmeia e o diâmetro das saídas (2", 2,5" ou 3").', 'Linhas de óleo e de retorno precisam ter o diâmetro certo para a turbina não vazar óleo.'],
    instalar: ['Faça o pré-lubrificação da turbina antes da primeira partida.', 'Aperte abraçadeiras e use mangueiras de silicone reforçadas para não estourar sob pressão.', 'Suba a pressão aos poucos, sempre acompanhando a mistura com a sonda wideband.'],
    posts: ['kit-turbo-ap-como-escolher', 'wastegate-interna-ou-externa', 'blow-off-o-que-e-quando-usar', 'intercooler-precisa-como-escolher']
  },
  motor: {
    tipo: 'peça interna de motor', serve: 'Pistões, bielas, juntas, comandos e bronzinas definem quanta potência o motor aguenta com segurança. Em motor preparado, principalmente turbo ou com nitro, as peças originais viram o limite: forjados e juntas reforçadas permitem mais pressão e mais giro sem quebrar.',
    escolher: ['Confira medida, curso e altura de compressão para o motor exato do seu carro.', 'Para turbo e nitro, prefira pistões e bielas forjados e junta de cabeçote reforçada (MLS).', 'Comando com mais graduação ganha em alta, mas perde marcha lenta e torque em baixa.', 'Peça a folga de montagem recomendada pelo fabricante: forjado trabalha com folga maior.'],
    instalar: ['Monte com retífica de confiança e confira todas as folgas com micrômetro e plastigage.', 'Respeite o torque e a sequência de aperto dos parafusos de biela e cabeçote.', 'Faça o amaciamento com carga leve antes de usar o motor no limite.'],
    posts: ['pecas-para-preparar-opala-6cc', 'como-adaptar-motor-6cc-no-opala-4cc', 'kit-turbo-ap-como-escolher']
  },
  conversao: {
    tipo: 'peça para converter carburado em injeção', serve: 'Os kits de conversão permitem trocar o carburador por injeção eletrônica mantendo o coletor e boa parte do motor. Com injeção, o carro pega melhor de manhã, gasta menos, aceita turbo com mais segurança e pode ser acertado com precisão.',
    escolher: ['Veja se o corpo de borboleta ou o kit é compatível com a base do seu coletor (DFV, Weber, Holley).', 'Confira se o kit vem com bicos, chicote e sensores ou se precisa comprar separado.', 'Escolha a injeção (módulo) de acordo com o número de cilindros e o tipo de ignição.'],
    instalar: ['Instale bomba de alta pressão e linha de retorno: a pressão de injeção é bem maior que a do carburador.', 'Faça o acerto inicial com sonda wideband e mapa base do fabricante.', 'Revise a ignição: muitos kits pedem distribuidor com sensor ou roda fônica.'],
    posts: ['carburado-para-injecao-programavel', 'carburado-ou-injetado-arrancada']
  },
  nitro: {
    tipo: 'peça do sistema de nitro', serve: 'O óxido nitroso injeta oxigênio extra na admissão e permite queimar mais combustível, dando um ganho grande de potência quando o botão é acionado. Os kits variam de seco (só nitro) a molhado (nitro e combustível juntos) e de placa a bicos por cilindro.',
    escolher: ['Comece com uma carga pequena (shot baixo) e suba aos poucos.', 'Kit molhado é mais seguro em motor carburado; o seco depende do controle da injeção.', 'Garrafa, solenoide, manômetro e botão de acionamento precisam ser compatíveis entre si.'],
    instalar: ['Instale o botão e um corte por giro e borboleta aberta para o nitro só entrar na hora certa.', 'Atrase o ponto de ignição conforme a carga de nitro.', 'Use velas mais frias e confira a mistura depois de cada passada.'],
    posts: ['nitro-na-arrancada-guia']
  },
  rodas: {
    tipo: 'roda para arrancada', serve: 'Rodas leves reduzem a massa que o motor precisa girar e melhoram a largada. Na arrancada, o conjunto roda e pneu é decisivo para a tração: rodas mais largas atrás aceitam pneus de arrancada e as rodas estreitas na frente (estilo drag) diminuem o peso e o atrito.',
    escolher: ['Confira furação, offset (ET) e diâmetro do cubo para o seu carro.', 'Veja a largura máxima que cabe na caixa de roda sem raspar.', 'Para arrancada, prefira roda leve atrás e frente estreita.'],
    instalar: ['Use parafusos ou porcas do tipo correto (cônico ou esférico) e aperte com torquímetro em cruz.', 'Faça o balanceamento e confira o alinhamento.', 'Reaperte as porcas depois dos primeiros quilômetros.'],
    posts: ['tracao-201m-no-prep-rodas-embreagem']
  },
  tanque: {
    tipo: 'tanque de combustível', serve: 'Tanques de inox e células de combustível substituem o tanque original em carros de arrancada, oferecendo saída de maior vazão, resistência ao álcool e a possibilidade de instalar o reservatório no porta-malas, mais perto do eixo traseiro.',
    escolher: ['Escolha a capacidade pelo uso: arrancada pura usa tanque pequeno, rua precisa de mais.', 'Veja o diâmetro das saídas e se o tanque tem respiro e local para bomba interna.', 'Inox é a melhor opção para álcool.'],
    instalar: ['Fixe o tanque com cintas no assoalho reforçado e isole do habitáculo.', 'Use respiro com válvula anti-vazamento.', 'Confira o regulamento da pista sobre corta-fogo e localização do tanque.'],
    posts: ['primeira-vez-na-arrancada-checklist']
  },
  acessorios: {
    tipo: 'acessório para carro preparado', serve: 'Manômetros, shift light, botões, reguladores e pequenos itens fazem muita diferença no dia a dia do carro preparado: mostram o que está acontecendo no motor e ajudam a pilotar melhor sem gastar muito.',
    escolher: ['Para relógios, confira a escala (pressão de turbo, óleo, combustível) e o tipo de sensor.', 'Shift light e 3-step precisam ser compatíveis com o sinal de rotação do seu carro.', 'Prefira itens com fiação e conexões de boa qualidade.'],
    instalar: ['Puxe alimentação de pós-chave com fusível próprio.', 'Monte relógios mecânicos com linhas bem presas e longe do escapamento.', 'Teste tudo com o carro parado antes de ir para a pista.'],
    posts: ['3-step-o-que-e-como-funciona', 'manometro-pressao-turbo-oleo-como-instalar']
  },
  freios: {
    tipo: 'peça de freio', serve: 'Freio em dia é obrigatório em carro preparado: quanto mais potência, mais o carro chega rápido no fim da reta. Pastilhas, discos, cilindros e flexíveis em bom estado garantem que o carro pare reto e com segurança.',
    escolher: ['Confira a aplicação exata (ano e versão) do seu carro.', 'Troque discos e pastilhas sempre em par, do mesmo eixo.', 'Para uso forte, prefira fluido DOT 4 e flexíveis em malha de aço.'],
    instalar: ['Faça a sangria completa depois de qualquer troca no sistema.', 'Assente as pastilhas novas com frenagens moderadas antes de exigir.', 'Confira se não há vazamento nos cilindros e nas conexões.'],
    posts: ['primeira-vez-na-arrancada-checklist']
  },
  suspensao: {
    tipo: 'peça de suspensão', serve: 'A suspensão define como o peso do carro passa para as rodas na largada. Amortecedores, molas, buchas e barras em bom estado mantêm o carro estável e ajudam na tração, além de deixar o carro mais seguro no dia a dia.',
    escolher: ['Confira a aplicação exata do carro e se a peça é dianteira ou traseira.', 'Para arrancada, amortecedor dianteiro mais macio na extensão ajuda o carro a transferir peso para trás.', 'Buchas de poliuretano deixam a suspensão mais firme e precisa.'],
    instalar: ['Troque amortecedores sempre em par.', 'Faça alinhamento depois de mexer na suspensão.', 'Aperte as buchas com o carro apoiado nas rodas para não torcer.'],
    posts: ['tracao-201m-no-prep-rodas-embreagem']
  },
  ignicao: {
    tipo: 'peça de ignição', serve: 'A ignição precisa gerar faísca forte e no momento certo. Bobina, cabos, velas, distribuidor e módulo trabalham juntos: em motor preparado, principalmente com turbo, uma ignição fraca causa falhas em alta e perda de potência.',
    escolher: ['Velas: em motor turbo ou com nitro use grau térmico mais frio.', 'Cabos de vela de baixa resistência e bem isolados evitam falhas.', 'Confira se a bobina é compatível com o módulo de ignição do carro.'],
    instalar: ['Ajuste a folga dos eletrodos conforme a preparação (menor folga com mais pressão de turbo).', 'Passe os cabos longe do escapamento.', 'Confira o ponto de ignição com pistola depois da troca.'],
    posts: ['ponto-de-ignicao-carro-carburado', 'maverick-v8-302-ignicao-eletronica-coletor']
  },
  manutencao: {
    tipo: 'item de revisão', serve: 'Filtros, óleo e itens de revisão são baratos e protegem o motor. Em carro preparado o intervalo de troca deve ser menor do que no carro original, principalmente com turbo e álcool.',
    escolher: ['Use o filtro com a aplicação correta para o seu motor.', 'Siga a viscosidade de óleo recomendada pelo preparador.', 'Prefira marcas conhecidas: filtro barato pode não segurar a pressão.'],
    instalar: ['Troque o filtro de óleo junto com o óleo.', 'Lubrifique o anel de vedação antes de rosquear o filtro.', 'Anote a quilometragem da troca.'],
    posts: ['carro-antigo-parado-como-ligar']
  },
  classicos: {
    tipo: 'peça para carro clássico', serve: 'Peças de reposição e restauração mantêm o clássico rodando com segurança e originalidade. Muitas peças de carros antigos já saíram de linha, então encontrar uma reposição boa e na medida certa faz toda a diferença.',
    escolher: ['Confira o ano e a versão do carro: muitas peças mudaram ao longo da produção.', 'Compare com a peça original antes de instalar.', 'Para restauração, prefira peças que mantenham o visual de fábrica.'],
    instalar: ['Limpe e revise as peças vizinhas aproveitando a desmontagem.', 'Use juntas e vedações novas.', 'Guarde a peça antiga até confirmar que a nova ficou perfeita.'],
    posts: ['carro-antigo-parado-como-ligar']
  }
};
const T = { // tipos das peças de clássicos
  'Escapamento': ['alimentacao', 'Escapamento e coletor de carro antigo influenciam diretamente o desempenho e o ronco. Um dimensionado bem feito melhora a saída dos gases, e o coletor certo combina com a preparação do motor.', ['Confira se o escapamento é para gasolina ou álcool e se passa por cima ou por baixo do eixo.', 'Veja o diâmetro dos tubos: maior demais perde torque em baixa.']],
  'Arrefecimento': ['manutencao', 'Radiador, bomba d’água e mangueiras mantêm o motor do clássico na temperatura certa. Motor antigo superaquecido é a principal causa de junta queimada e cabeçote empenado.', ['Radiador de alumínio troca calor melhor que o original de cobre.', 'Confira o lado das entradas e saídas para não precisar adaptar mangueiras.']],
  'Transmissão': ['motor', 'Embreagem, câmbio e cardã levam a força do motor para as rodas. No clássico preparado, o conjunto original costuma ser o primeiro a reclamar.', ['Confira o diâmetro do disco e o estriado do eixo piloto.', 'Para motor mais forte, use platô e disco reforçados.']],
  'Ignição': ['ignicao', null, null], 'Carburação': ['alimentacao', 'Carburador, coletor de admissão e filtro definem como o clássico respira e responde no pé. A escolha certa depende do motor, do combustível e do uso.', ['Confira se o carburador é para álcool ou gasolina.', 'Veja se a base é compatível com o coletor do seu motor.']],
  'Motor': ['motor', null, null], 'Freios': ['freios', null, null], 'Suspensão': ['suspensao', null, null], 'Performance': ['turbo', null, null],
  'Acabamento': ['classicos', 'Peças de acabamento (frisos, emblemas, borrachas e grades) são as que mais valorizam o clássico na restauração e as mais difíceis de achar originais.', ['Compare medidas e fixações com a peça antiga.', 'Prefira reproduções fiéis ao modelo e ao ano.']],
  'Lanternas': ['classicos', 'Lanternas e faróis são parte da identidade do clássico e item de segurança. Reproduções novas resolvem peças quebradas ou opacas.', ['Confira lado (direito ou esquerdo) e ano do modelo.', 'Veja se acompanha soquete e lâmpadas.']],
  'Iluminação': ['classicos', 'Faróis e iluminação em bom estado deixam o clássico mais seguro à noite e valorizam a restauração.', ['Confira o tamanho do farol e o tipo de lâmpada.', 'Veja se o chicote original precisa de adaptação.']],
  'Interior': ['classicos', 'Peças de interior (volantes, painéis, forrações, maçanetas) devolvem ao clássico o aspecto de novo e o conforto.', ['Confira o encaixe para o ano e a versão do carro.', 'Prefira materiais próximos aos de fábrica.']],
  'Elétrica': ['ignicao', 'Componentes elétricos do clássico, como chicotes, reguladores e chaves, envelhecem e causam falhas difíceis de achar. Peça nova resolve a origem do problema.', ['Confira tensão e tipo de conector.', 'Troque fusíveis e conexões oxidadas junto.']],
  'Peças': ['classicos', null, null]
};
function guia(p) {
  if (p.modelo) {
    const t = T[p.tipo] || ['classicos', null, null];
    const base = G[t[0]] || G.classicos;
    return { tipo: (p.tipo ? p.tipo.toLowerCase() : 'peça') + ' para ' + modNome(p.modelo), serve: t[1] || base.serve, escolher: [...(t[2] || []), ...base.escolher].slice(0, 5), instalar: base.instalar, posts: [...base.posts] };
  }
  return G[p.categoria] || G.classicos;
}

/* ---------- lista única de produtos ---------- */
const vistos = new Set(), usados = new Set(), LISTA = [], porNome = {}, mapaDup = {};
for (const p of [...PRODUTOS, ...PECAS]) {
  if (!p.preco || !p.link || vistos.has(p.link)) continue;
  vistos.add(p.link);
  const chave = p.nome.toLowerCase().replace(/\s+/g, ' ').trim();
  if (porNome[chave]) { mapaDup[p.link] = porNome[chave]; continue; }
  let s = slugify(p.nome) || 'produto', b = s, n = 2;
  while (usados.has(s)) s = b + '-' + n++;
  usados.add(s); porNome[chave] = s;
  LISTA.push({ ...p, slug: s });
}

const shell = rd('pecas/turbo.html');
const head = shell.slice(0, shell.indexOf('<title>'));
const pre = shell.slice(shell.indexOf('<link rel="icon"'), shell.indexOf('</head>')).replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '').replace(/<style id="seo-css">[\s\S]*?<\/style>/, '');
const tail = shell.slice(shell.indexOf('</main>') + 7);
const hdr = shell.slice(shell.indexOf('</head>'), shell.indexOf('<main'));

const CSS = `<style id="pd-css">.pd{max-width:1100px;margin:0 auto;padding:90px 22px 60px}.pd .crumb{font-size:13px;color:var(--mut);margin-bottom:14px}.pd .crumb a{color:var(--red)}
.pd-top{display:grid;grid-template-columns:1fr 1fr;gap:34px;align-items:start}.pd-img{background:#fff;border:1px solid var(--line);border-radius:22px;padding:18px}.pd-img img{width:100%;aspect-ratio:1;object-fit:contain}
.pd h1{font-size:clamp(24px,3vw,34px)!important;letter-spacing:-.02em;line-height:1.12;margin-bottom:12px}.pd .tag{display:inline-block;color:var(--red);font-weight:800;font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px}
.pd .ps{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 16px}.pd .ps span{background:#f4f3f0;border-radius:99px;padding:6px 12px;font-size:13px;font-weight:600}.pd .ps .hot{background:#fff1ec;color:#c2410c}.pd .ps .low{background:#fee2e2;color:#b91c1c}
.pd .box{background:#fff;border:1px solid var(--line);border-radius:20px;padding:20px}.pd .box s{color:var(--mut)}.pd .box .pr{font-size:36px;font-weight:800;letter-spacing:-.02em}.pd .box .off{color:#15803d;font-weight:800;margin-left:8px}
.pd .buy{display:block;text-align:center;background:#ffe600;color:#2d3277;font-weight:800;font-size:17px;border-radius:14px;padding:15px;margin:16px 0 8px}.pd .buy:hover{filter:brightness(.95)}.pd .upd{font-size:12.5px;color:var(--mut);line-height:1.5}
.pd .txt{max-width:780px;font-size:17px;line-height:1.7;color:#333}.pd .txt h2,.pd .sec{font-size:25px!important;margin:40px 0 12px;letter-spacing:-.02em;line-height:1.2}.pd .txt p{margin-bottom:14px}.pd .txt ul{margin:0 0 14px 20px}.pd .txt li{margin-bottom:6px}
.pd table{border-collapse:collapse;width:100%;max-width:780px;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;font-size:15px}.pd td{padding:10px 14px;border-bottom:1px solid var(--line)}.pd td:first-child{color:var(--mut);width:42%}
.pd .faq{max-width:780px}.pd .faq details{background:#fff;border:1px solid var(--line);border-radius:16px;padding:16px 20px;margin-bottom:10px}.pd .faq summary{font-weight:700;cursor:pointer}.pd .faq p{margin-top:10px;line-height:1.65}
.pd .sim{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}.pd .sim a{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600;line-height:1.3}.pd .sim img{width:100%;aspect-ratio:1;object-fit:contain}.pd .sim b{font-size:16px}
.pd .rel{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}.pd .rel a{background:#fff;border:1px solid var(--line);border-radius:16px;padding:16px 18px;font-weight:600;line-height:1.35}.pd .rel a span{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--red);font-weight:700;margin-bottom:6px}
.pd .aff{font-size:13px;color:var(--mut);margin-top:30px}@media(max-width:760px){.pd-top{grid-template-columns:1fr}.pd{padding-top:76px}}</style>`;

const urls = [];
const mapa = {};
const dataBr = hoje.split('-').reverse().join('/');
for (const p of LISTA) {
  const g = guia(p);
  const f = FICHAS[p.link] || {};
  const url = `${SITE}/produto/${p.slug}`;
  const cat = p.modelo ? { href: 'pecas/' + p.modelo, nome: 'Peças para ' + modNome(p.modelo) } : { href: 'pecas/' + p.categoria, nome: catNome(p.categoria) };
  const pares = (f.specs || []).filter(([k, v]) => k && v && k.length < 60 && v.length < 140).slice(0, 18);
  const marca = p.marca && p.marca !== 'Universal' ? p.marca : ((pares.find(([k]) => /^marca$/i.test(k)) || [])[1] || '');
  const vn = vendN(p), o = off(p);
  const estoqueTxt = f.estoque || '';
  const ultima = /[úu]ltim/i.test(estoqueTxt) || (/^\(?(\d+) dispon/.test(estoqueTxt) && +estoqueTxt.match(/(\d+)/)[1] <= 5);
  const ps = [
    p.nota ? `<span>★ ${(+p.nota).toFixed(1)} no Mercado Livre</span>` : '',
    p.vendidos ? `<span${vn >= 1000 ? ' class="hot"' : ''}>${esc(p.vendidos)} vendidos</span>` : '',
    p.chega ? `<span>🚚 ${esc(p.chega)}</span>` : '',
    ultima ? `<span class="low">${esc(estoqueTxt.replace(/[()]/g, ''))}</span>` : (estoqueTxt ? `<span>${esc(estoqueTxt.replace(/[()]/g, ''))}</span>` : '')
  ].join('');
  const nomeCurto = p.nome.replace(/\s+/g, ' ').trim();
  // parecidos: mesma categoria/modelo, priorizando mais vendidos
  const sim = LISTA.filter(x => x !== p && (p.modelo ? x.modelo === p.modelo : x.categoria === p.categoria)).sort((a, b) => vendN(b) - vendN(a)).slice(0, 8);
  const posts = [...new Set(g.posts)].map(id => POSTS.find(x => x.id === id)).filter(Boolean)
    .concat(POSTS.filter(x => { const w = nomeCurto.toLowerCase().split(/\W+/).filter(t => t.length > 4); return w.some(t => (x.titulo || '').toLowerCase().includes(t)); }))
    .filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
  const precoMedio = sim.length ? sim.reduce((s, x) => s + x.preco, 0) / sim.length : 0;
  const faixa = precoMedio ? (p.preco < precoMedio * .8 ? 'abaixo da média' : p.preco > precoMedio * 1.25 ? 'acima da média' : 'na média') : '';

  const faq = [
    [`Onde comprar ${nomeCurto}?`, `Este produto é vendido e entregue pelo Mercado Livre. Pelo botão desta página você vai direto ao anúncio, com pagamento, frete e garantia de devolução do Mercado Livre.`],
    [`Qual o preço de ${nomeCurto} hoje?`, `Na conferência de ${dataBr} o anúncio estava por ${brl(p.preco)}${o ? `, com ${o}% de desconto sobre ${brl(p.de)}` : ''}. O vendedor pode mudar o preço a qualquer momento: o valor que vale é o do Mercado Livre na hora da compra.`],
    [`Para que serve ${g.tipo.startsWith('peça') || g.tipo.startsWith('item') ? 'este produto' : 'um ' + g.tipo}?`, g.serve],
    [`Comprar pela Grid 402 é mais caro?`, `Não. O link é de afiliado: você paga o mesmo preço do anúncio e o Mercado Livre repassa uma pequena comissão que mantém o site e o blog no ar.`]
  ];
  const txt = `<div class="txt">
<h2>Sobre ${esc(nomeCurto)}</h2>
<p>${esc(nomeCurto)} é ${/^(peça|roda|lanterna|ignição|carburação|suspensão|transmissão|elétrica|iluminação|acabamento)/i.test(g.tipo) && !/^acabamento/i.test(g.tipo) ? 'uma' : 'um'} ${esc(g.tipo)}${marca ? ` da marca ${esc(marca)}` : ''}${p.modelo ? `, indicado para quem mantém, restaura ou prepara um ${esc(modNome(p.modelo))}` : ''}. ${p.vendidos ? `O anúncio já soma ${esc(p.vendidos)} unidades vendidas${p.nota ? ` e nota ${(+p.nota).toFixed(1)} de 5 dos compradores` : ''}, o que mostra que é uma escolha testada por quem já comprou.` : 'Selecionamos este anúncio pela aplicação e pelo preço.'}${faixa ? ` O preço de hoje está ${faixa} dos produtos parecidos que acompanhamos no site.` : ''}</p>
<h2>Para que serve</h2>
<p>${esc(g.serve)}</p>
<h2>Como escolher</h2>
<ul>${g.escolher.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
<h2>Dicas de instalação e uso</h2>
<ul>${g.instalar.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
</div>`;
  const ficha = pares.length ? `<h2 class="sec">Ficha técnica</h2><table>${pares.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table><p class="upd">Dados informados pelo vendedor no anúncio do Mercado Livre.</p>` : '';

  const main = `<main class="pd"><nav class="crumb"><a href="/">Início</a> › <a href="${cat.href}">${esc(cat.nome)}</a> › ${esc(nomeCurto.slice(0, 60))}</nav>
<div class="pd-top"><div class="pd-img"><img src="${esc(p.img)}" alt="${esc(nomeCurto)}" width="500" height="500"></div>
<div><span class="tag">${esc(p.modelo ? (p.tipo || 'Peça') + ' · ' + modNome(p.modelo) : catNome(p.categoria))}</span><h1>${esc(nomeCurto)}</h1><div class="ps">${ps}</div>
<div class="box">${o ? `<s>${brl(p.de)}</s><span class="off">${o}% OFF</span>` : ''}<div class="pr">${brl(p.preco)}</div>
<a class="buy" href="${p.link}" target="_blank" rel="sponsored noopener">Ver no Mercado Livre →</a>
<p class="upd">Preço conferido em ${dataBr}. Compra, pagamento e entrega pelo Mercado Livre, com a garantia de devolução deles.</p></div></div></div>
${txt}${ficha}
<h2 class="sec">Perguntas frequentes</h2><div class="faq">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
${sim.length ? `<h2 class="sec">Produtos parecidos</h2><div class="sim">${sim.map(x => `<a href="produto/${x.slug}"><img src="${esc(x.img)}" alt="${esc(x.nome)}" loading="lazy" width="190" height="190">${esc(x.nome)}<b>${brl(x.preco)}</b></a>`).join('')}</div>` : ''}
${posts.length ? `<h2 class="sec">Guias do blog</h2><div class="rel">${posts.map(x => `<a href="blog/${x.id}"><span>${esc(x.categoria || 'Guia')}</span>${esc(x.titulo)}</a>`).join('')}</div>` : ''}
<p class="aff">Os links são de afiliado do Mercado Livre: você paga o mesmo preço e ajuda o Grid 402. <a href="${cat.href}" style="color:var(--red)">Ver todos: ${esc(cat.nome)} →</a></p></main>`;

  const titulo = `${nomeCurto.slice(0, 58)} | Preço e onde comprar`;
  const desc = `${nomeCurto.slice(0, 80)} por ${brl(p.preco)}${o ? ` (${o}% OFF)` : ''}${p.vendidos ? `, ${p.vendidos} vendidos` : ''}. Ficha técnica, como escolher e compra segura pelo Mercado Livre.`.slice(0, 158);
  const graph = [
    {
      '@type': 'Product', '@id': url + '#produto', name: nomeCurto, image: absImg(p.img), description: g.serve, ...(marca ? { brand: { '@type': 'Brand', name: marca } } : {}),
      category: p.modelo ? 'Peças para ' + modNome(p.modelo) : catNome(p.categoria),
      offers: { '@type': 'Offer', price: Number(p.preco).toFixed(2), priceCurrency: 'BRL', priceValidUntil: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10), availability: 'https://schema.org/InStock', url: p.link, seller: { '@type': 'Organization', name: 'Mercado Livre' } }
    },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Início', item: SITE + '/' }, { '@type': 'ListItem', position: 2, name: cat.nome, item: SITE + '/' + cat.href }, { '@type': 'ListItem', position: 3, name: nomeCurto, item: url }] },
    { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
  ];
  const html = `${head}<title>${esc(titulo)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${url}">
<meta property="og:type" content="product"><meta property="og:site_name" content="Grid 402 Performance"><meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${esc(absImg(p.img))}"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#e10600">
${pre}${CSS}<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>${hdr}${main}${tail}`;
  fs.mkdirSync(path.join(ROOT, 'produto'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'produto', p.slug + '.html'), html);
  urls.push(url);
  mapa[p.link] = p.slug;
}
// remove páginas de produtos que saíram do catálogo
for (const f of fs.readdirSync(path.join(ROOT, 'produto'))) if (!usados.has(f.replace('.html', ''))) fs.unlinkSync(path.join(ROOT, 'produto', f));
fs.writeFileSync(path.join(ROOT, 'produto-slugs.js'), 'window.PSLUG=' + JSON.stringify({ ...mapa, ...mapaDup }) + ';\n');
// sitemap
let sm = rd('sitemap.xml').replace(/\s*<!--produtos-->[\s\S]*<!--\/produtos-->/, '');
sm = sm.replace('</urlset>', `<!--produtos-->\n${urls.map(u => `<url><loc>${u}</loc><lastmod>${hoje}</lastmod><changefreq>daily</changefreq><priority>0.6</priority></url>`).join('\n')}\n<!--/produtos-->\n</urlset>`);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sm);
console.log('páginas de produto:', LISTA.length);
