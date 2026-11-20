/* Conteúdo de SEO das páginas /pecas/*  — usado por tools/gerar-paginas.js
   Cada página: textos (seções h2 + parágrafos), faq (perguntas reais de quem pesquisa) e posts (ids do blog relacionados). */
module.exports = {
  injecao: {
    textos: [
      ["Como escolher a injeção programável", "A escolha começa pelo projeto: quantos cilindros, se o motor é aspirado ou turbo e se você quer controlar só injeção e ignição ou também funções de pista como 3 step, controle de boost e datalogger. Para a maioria dos carros de rua e de arrancada de entrada, um módulo como a FuelTech FT450 resolve. Projetos com mais sensores, mais saídas e controle fino de tração costumam pedir uma FT550 ou superior."],
      ["Bico injetor: vazão certa para a potência", "Bico pequeno demais limita a potência e deixa a mistura pobre no alto giro, o que pode quebrar o motor. Bico grande demais dificulta a marcha lenta. O ideal é calcular a vazão pela potência que você quer atingir, pelo combustível (etanol pede bem mais vazão que gasolina) e pela pressão de linha, deixando uma folga de segurança."],
      ["Não esqueça da sonda wideband", "Acertar a injeção sem uma sonda wideband é trabalhar no escuro. Ela mostra a mistura real em tempo real e é o que permite deixar o mapa seguro em carga total. Muitos kits já vêm com sensor e chicote."]
    ],
    faq: [
      ["Qual a diferença entre a FT450 e a FT550?", "A FT550 tem mais entradas e saídas, mais recursos de controle e datalogger mais completo. A FT450 atende bem projetos aspirados e turbo de entrada. Veja a comparação completa no nosso guia FT450 ou FT550."],
      ["Preciso de chicote novo para instalar a injeção programável?", "Sim, na maioria dos casos. Os kits com chicote de fábrica economizam tempo e evitam erros de ligação, por isso costumam valer a diferença de preço."],
      ["Como calcular o bico injetor para turbo?", "Multiplique a potência desejada pelo consumo específico do combustível e divida pelo número de bicos e pelo ciclo de trabalho máximo (em geral 80%). Nosso artigo sobre bico injetor tem uma calculadora pronta."],
      ["Comprar pelo Grid 402 é seguro?", "Sim. Todos os produtos são vendidos e entregues pelo Mercado Livre, com a proteção de compra do próprio Mercado Livre. O Grid 402 só indica os produtos."]
    ],
    posts: ["ft450-ou-ft550-qual-fueltech-comprar", "como-calcular-bico-injetor-turbo", "sonda-wideband-o-que-e-qual-comprar", "carburado-para-injecao-programavel"]
  },
  alimentacao: {
    textos: [
      ["Alimentação de combustível dimensionada para a potência", "Quando o motor ganha potência, a bomba original deixa de dar conta e a pressão cai no alto giro. A bomba de alta vazão, o regulador de pressão e as linhas no diâmetro certo garantem combustível suficiente até o fim da passagem de marcha."],
      ["Etanol pede mais vazão", "Motores a etanol consomem bem mais combustível que a gasolina para a mesma potência. Por isso uma bomba que sobra num carro a gasolina pode ficar no limite no etanol. Sempre dimensione pensando no combustível que você vai usar."],
      ["Teste antes de acelerar", "Um manômetro de pressão de combustível e um teste de vazão da bomba evitam surpresas. Se a pressão cair em carga, o motor empobrece, e mistura pobre em motor turbo é o caminho mais curto para quebrar pistão."]
    ],
    faq: [
      ["Qual bomba de combustível usar no carro turbo?", "Depende da potência e do combustível. Para projetos de rua com turbo leve, uma bomba de alta vazão de qualidade costuma bastar. Acima disso, vale usar duas bombas ou bomba externa."],
      ["Preciso trocar o regulador de pressão?", "Em carro turbo, sim: o regulador precisa ser referenciado à pressão do coletor (1:1) para manter a pressão de combustível acima da pressão de turbo."],
      ["Como testar a vazão da bomba?", "Com um kit de teste de pressão e vazão você mede quanto a bomba entrega na pressão de trabalho. Veja os kits de manômetro nesta página."],
      ["Os produtos são enviados por quem?", "Pelo Mercado Livre. O Grid 402 é um site de indicação com links de afiliado. Você compra direto no Mercado Livre, pelo mesmo preço."]
    ],
    posts: ["dosador-de-combustivel-1-1-como-regular", "como-calcular-bico-injetor-turbo", "kit-turbo-ap-como-escolher"]
  },
  turbo: {
    textos: [
      ["Como escolher o kit turbo", "O kit turbo certo depende do motor, do uso e da potência que você quer. Para rua, uma turbina menor enche mais cedo e deixa o carro gostoso de dirigir. Para arrancada, turbinas maiores rendem mais no alto giro, mas demoram mais a encher. Kits completos, com coletor, tubulação e acessórios do mesmo fabricante, evitam adaptações."],
      ["Itens que não podem faltar", "Além da turbina e do coletor, um projeto turbo seguro precisa de linha de óleo e retorno bem feitos, wastegate para controlar a pressão, válvula de alívio (blow off), manômetro de pressão e, de preferência, intercooler. Esses itens protegem o motor e a própria turbina."],
      ["Combustível e injeção", "Turbo pede mais combustível. Em carros carburados, o dosador 1:1 ajusta a pressão de combustível. Em carros injetados, o ideal é uma injeção programável com bicos dimensionados para a nova potência."]
    ],
    faq: [
      ["Qual o melhor kit turbo para motor AP?", "Depende do uso. Kits com turbina pequena (como as 42/48) são ótimos para rua. Para mais potência, turbinas maiores com coletor pulsativo. Explicamos tudo no guia de kit turbo para AP."],
      ["Precisa de intercooler no carro turbo?", "Não é obrigatório em pressões baixas, mas o intercooler esfria o ar, reduz o risco de detonação e permite mais pressão com segurança."],
      ["O que é turbina pulsativa?", "É a turbina com carcaça quente dividida, aproveitando melhor os pulsos de escape. Ela enche mais cedo que uma turbina de entrada simples do mesmo tamanho."],
      ["Quanto de pressão posso usar no motor original?", "Em motores originais o recomendado é trabalhar com pressão baixa e mistura bem acertada. Para pressões maiores, o motor precisa ser preparado (pistões, bielas e junta)."]
    ],
    posts: ["kit-turbo-ap-como-escolher", "manometro-pressao-turbo-oleo-como-instalar", "dosador-de-combustivel-1-1-como-regular", "3-step-o-que-e-como-funciona"]
  },
  motor: {
    textos: [
      ["Motor preparado começa pela parte interna", "Ganhar potência com turbo, nitro ou preparação aspirada aumenta muito a força sobre bielas, pistões e virabrequim. Bielas forjadas e pistões adequados são a base de um motor que aguenta pressão e giro sem quebrar."],
      ["Comando de válvulas", "O comando define onde o motor entrega força. Comandos mais bravos rendem no alto giro mas perdem marcha lenta e torque baixo. Para rua, escolha comandos moderados; para pista, pense na faixa de giro em que o carro vai trabalhar."],
      ["Embreagem para a nova potência", "Embreagem original patina quando a potência sobe. Kits reforçados ou cerâmicos seguram mais torque, mas ficam mais duros e com engate mais seco."]
    ],
    faq: [
      ["Biela forjada vale a pena?", "Para projetos turbo ou com nitro, sim. A biela é uma das peças que mais sofrem quando a potência sobe e a forjada aguenta muito mais."],
      ["Qual comando usar no AP 8v?", "Para rua, comandos até cerca de 270° mantêm boa dirigibilidade. Acima disso o motor fica mais bravo e rende melhor no alto giro."],
      ["Embreagem cerâmica serve para rua?", "Serve, mas o engate é mais seco e o pedal mais duro. Para uso misto, uma embreagem reforçada de disco orgânico costuma ser mais confortável."],
      ["Onde as peças são compradas?", "No Mercado Livre. O Grid 402 seleciona e indica as peças; a venda e a entrega são feitas pelo vendedor no Mercado Livre."]
    ],
    posts: ["pecas-para-preparar-opala-6cc", "kit-turbo-ap-como-escolher", "tracao-201m-no-prep-rodas-embreagem"]
  },
  conversao: {
    textos: [
      ["Por que passar de carburado para injeção", "A injeção eletrônica programável deixa a partida a frio melhor, o consumo mais baixo e a mistura correta em qualquer rotação. Em carro preparado, ela também permite acertar ponto e mistura com precisão, coisa que o carburador não faz."],
      ["O que precisa para converter", "A conversão envolve corpo de borboleta ou coletor com bicos, módulo de injeção, chicote, sensores (temperatura, posição de borboleta, pressão), bomba e regulador de combustível e, em geral, distribuidor ou roda fônica para a ignição. Kits completos reduzem muito o trabalho."],
      ["Opala, Chevette, Maverick e AP", "Existem kits de conversão prontos para os motores mais populares, inclusive para manter o visual original sob o capô."]
    ],
    faq: [
      ["Quanto custa converter carburado para injeção?", "Depende do kit e do módulo escolhido. Os kits completos desta página mostram o preço atualizado no Mercado Livre."],
      ["Preciso trocar a bomba de combustível?", "Sim. A injeção trabalha com pressão bem maior que o carburador e precisa de bomba elétrica e regulador de pressão."],
      ["Dá para converter Opala 6cc para injeção?", "Dá. Existem kits específicos com coletor e corpos de borboleta para o 250-S. Explicamos no guia de conversão."],
      ["Precisa fazer mapa depois de instalar?", "Sim. Mesmo com mapa base, o ideal é acertar a injeção com sonda wideband para a sua configuração."]
    ],
    posts: ["carburado-para-injecao-programavel", "ft450-ou-ft550-qual-fueltech-comprar", "sonda-wideband-o-que-e-qual-comprar"]
  },
  nitro: {
    textos: [
      ["Como o nitro funciona", "O óxido nitroso libera mais oxigênio na câmara de combustão. Com mais oxigênio, o motor queima mais combustível e ganha potência na hora em que o botão é acionado. É um dos jeitos mais baratos de ganhar cavalos para a arrancada."],
      ["Kit seco ou molhado", "No kit seco, só o nitro é injetado e o combustível extra vem pelos bicos da injeção, que precisa ser ajustada para isso. No kit molhado (com fogger ou placa), nitro e combustível entram juntos, o que é mais fácil de acertar em carros carburados ou com injeção original."],
      ["Segurança em primeiro lugar", "Comece com ganho baixo, use mistura um pouco mais rica, atrase o ponto de ignição conforme o ganho e acione o nitro só em carga total e acima de um giro mínimo. Um solenoide de qualidade e a garrafa bem fixada fazem parte do kit seguro."]
    ],
    faq: [
      ["Nitro estraga o motor?", "Usado com ganho compatível com o motor, mistura correta e ponto ajustado, não. O que quebra motor é exagerar no ganho ou acionar com a mistura pobre."],
      ["Qual a diferença entre kit nitro seco e molhado?", "O seco injeta só nitro e depende da injeção para o combustível extra. O molhado injeta nitro e combustível juntos pelo fogger ou placa."],
      ["Quantos cavalos o nitro dá?", "Depende dos giclês usados. Kits de entrada começam em ganhos moderados, e kits com mais foggers chegam a ganhos bem maiores em motores preparados."],
      ["Onde recarregar a garrafa de nitro?", "Em lojas de preparação e distribuidoras de gás que trabalham com óxido nitroso automotivo."]
    ],
    posts: ["nitro-na-arrancada-guia", "3-step-o-que-e-como-funciona", "tracao-201m-no-prep-rodas-embreagem"]
  },
  rodas: {
    textos: [
      ["Por que usar roda de arrancada", "Rodas de arrancada (estilo Weld) são leves, o que reduz a massa girante e ajuda o carro a sair mais rápido. A tala larga atrás permite usar pneus de arrancada (slicks ou drag radial) que tracionam muito mais na largada."],
      ["Aro, tala e furação", "Antes de comprar, confira a furação do seu carro, o aro (15 é o mais comum na arrancada nacional) e a tala. Talas largas atrás pedem atenção ao offset para o pneu não encostar na caixa de roda."],
      ["Traseira e dianteira", "Na tração traseira, a combinação comum é roda estreita na frente e tala larga atrás. Em tração dianteira, a roda larga vai na frente."]
    ],
    faq: [
      ["Qual aro usar na arrancada?", "O aro 15 é o mais usado no Brasil por ter boa oferta de pneus de arrancada."],
      ["Roda Weld serve no meu carro?", "Confira a furação e o offset. Os anúncios do Mercado Livre trazem a furação e a tala de cada modelo."],
      ["Roda de arrancada pode andar na rua?", "Pode, desde que esteja dentro das medidas permitidas e com pneus adequados para rua."],
      ["Como melhorar a tração no 201 m?", "Além das rodas e pneus, embreagem, suspensão e calibragem fazem diferença. Veja nosso artigo sobre tração no 201 m."]
    ],
    posts: ["tracao-201m-no-prep-rodas-embreagem", "3-step-o-que-e-como-funciona"]
  },
  tanque: {
    textos: [
      ["Tanque de combustível para arrancada", "Tanques de inox ou alumínio para arrancada são menores e mais leves que o original, ficam em local seguro e já vêm com saídas no diâmetro certo para bombas de alta vazão. O peso menor ajuda no tempo, e a construção reforçada aumenta a segurança."],
      ["Tamanho certo", "Para pista, tanques pequenos (por volta de 20 litros) bastam. Para carro que também roda na rua, vale um tanque maior ou manter o original com um tanque auxiliar para a bomba."]
    ],
    faq: [
      ["Tanque de inox enferruja?", "Não. O inox resiste muito bem à corrosão, inclusive com etanol."],
      ["Qual tamanho de tanque para arrancada?", "Para uso só em pista, tanques de cerca de 20 litros são o mais comum."],
      ["Preciso de bomba nova com o tanque novo?", "Se o projeto for de alta potência, sim. Veja as bombas na categoria alimentação."]
    ],
    posts: ["tracao-201m-no-prep-rodas-embreagem", "dosador-de-combustivel-1-1-como-regular"]
  },
  acessorios: {
    textos: [
      ["Acessórios que ajudam na pista", "Alguns acessórios baratos fazem muita diferença no resultado e na segurança: 3 step para largar sempre no mesmo giro, shift light para trocar a marcha na hora certa e manômetros de pressão de turbo e de óleo para acompanhar a saúde do motor."],
      ["3 step: largada sempre igual", "O 3 step corta a ignição num giro fixo enquanto você pisa fundo com a embreagem apertada. A largada fica sempre no mesmo ponto, e no carro turbo ajuda a encher a turbina antes de sair."],
      ["Manômetros", "O manômetro de pressão do turbo mostra quanto a turbina está soprando. O de óleo avisa antes de a pressão cair, o que pode salvar o motor."]
    ],
    faq: [
      ["O que é 3 step?", "É um limitador de giro para a largada. Ele segura o motor num giro fixo enquanto você acelera com a embreagem apertada."],
      ["Qual manômetro instalar no carro turbo?", "O essencial é o de pressão de turbo (manovacuômetro). Em seguida, o de pressão de óleo e o de combustível."],
      ["3 step funciona em carro carburado?", "Sim. Existem modelos para ignição convencional e eletrônica."],
      ["Os acessórios custam quanto?", "A maioria fica abaixo de R$ 300. Os preços são do Mercado Livre e são atualizados todo dia."]
    ],
    posts: ["3-step-o-que-e-como-funciona", "manometro-pressao-turbo-oleo-como-instalar", "dosador-de-combustivel-1-1-como-regular"]
  },
  classicos: {
    textos: [
      ["Peças de performance para clássicos", "Opala 6cc, Maverick V8 e Fusca têm uma legião de fãs que gostam de manter o visual original e ganhar desempenho. Escape dimensionado, carburação Weber ou quadrijet, comando, ignição eletrônica e embreagem reforçada são as melhorias mais procuradas."],
      ["Opala 6cc", "O 250-S responde muito bem a escape dimensionado, coletor de admissão para Weber e um comando um pouco mais bravo. Com radiador de alumínio, a temperatura fica sob controle mesmo no trânsito."],
      ["Maverick V8 e Fusca", "No Maverick 302, ignição eletrônica e coletor quadrijet acordam o motor. No Fusca, carburador novo e kit motor deixam o besouro firme de novo."]
    ],
    faq: [
      ["Como preparar o Opala 6cc?", "Os passos mais comuns são escape dimensionado, coletor e carburador Weber, comando de válvulas e embreagem reforçada. Detalhamos no nosso guia."],
      ["Qual carburador usar no Opala?", "O Weber 40 é o mais popular no 4cc e, em dupla ou com coletor específico, no 6cc. Veja o artigo sobre Weber no Opala."],
      ["Ignição eletrônica vale a pena no Maverick?", "Sim. Ela melhora a partida, a marcha lenta e a resposta do motor V8 302."],
      ["As peças são novas?", "Sim, os anúncios indicados são de peças novas vendidas no Mercado Livre."]
    ],
    posts: ["pecas-para-preparar-opala-6cc", "carburador-weber-no-opala", "maverick-v8-302-ignicao-eletronica-coletor", "fusca-1600-carburador-kit-motor"]
  },
  opala: {
    textos: [
      ["Peças para Opala de 4 e 6 cilindros", "O Opala foi fabricado de 1968 a 1992 e tem motores 151 (4 cilindros) e 250 (6 cilindros). Aqui você encontra peças de reposição e de preparação para os dois: carburação, ignição, arrefecimento, escapamento, embreagem e acabamento."],
      ["Restauração e preparação", "Para restaurar, foque em arrefecimento, freios e parte elétrica, que são os pontos que mais dão problema em carro antigo. Para preparar, o 6cc responde muito bem a escape dimensionado, carburação Weber e comando."],
      ["Confira a aplicação", "Muitas peças mudam conforme o ano e a versão (Opala, Caravan, Comodoro, Diplomata). Antes de comprar, confira no anúncio do Mercado Livre se a peça serve no seu ano e motor."]
    ],
    faq: [
      ["Peças de Opala ainda são fáceis de achar?", "Sim. Por ser um carro muito popular, há bastante oferta de peças novas de reposição e de preparação."],
      ["Dá para colocar motor 6cc no Opala 4cc?", "Dá, e é uma das adaptações mais comuns. Explicamos o passo a passo no nosso guia completo."],
      ["Qual o melhor carburador para Opala?", "O Weber 40 é o mais usado. Veja o guia de Weber no Opala para saber qual coletor usar."],
      ["As peças de Opala servem na Caravan?", "Grande parte da mecânica é igual. Confira sempre a aplicação no anúncio."]
    ],
    posts: ["como-adaptar-motor-6cc-no-opala-4cc", "pecas-para-preparar-opala-6cc", "carburador-weber-no-opala", "opala-blue-shark-fabio-wisniewski-armageddon"]
  },
  fusca: {
    textos: [
      ["Peças para Fusca", "O Fusca é o carro antigo mais fácil de manter no Brasil, e a oferta de peças novas é enorme. Aqui estão as peças mais procuradas: carburador, kit motor, ignição, freios, suspensão e acabamento."],
      ["Motor 1300, 1500 e 1600", "Muitas peças de motor são específicas da cilindrada. O kit motor (camisa, pistão e anéis) é o caminho mais comum para recuperar a compressão e a força do motor a ar."],
      ["Carburador", "O H30 é o carburador mais usado no 1500 e 1600 de carburação simples. Um carburador novo resolve falhas, consumo alto e marcha lenta irregular."]
    ],
    faq: [
      ["Qual carburador usar no Fusca 1600?", "O H30 é o mais comum no 1600 de carburação simples. Veja o artigo sobre carburador e kit motor do Fusca."],
      ["Kit motor do Fusca serve em Kombi e Brasília?", "Os motores a ar 1600 compartilham muitas peças. Confira a aplicação no anúncio."],
      ["Quanto custa retificar o motor do Fusca?", "Com kit motor novo, o custo das peças é baixo comparado a outros carros. Os preços aqui são atualizados todo dia."],
      ["Os produtos são vendidos por quem?", "Pelo Mercado Livre. O Grid 402 só indica, com links de afiliado."]
    ],
    posts: ["fusca-1600-carburador-kit-motor"]
  },
  maverick: {
    textos: [
      ["Peças para Maverick", "O Ford Maverick saiu de fábrica no Brasil com motores 4 cilindros, 6 cilindros e o famoso V8 302. Aqui você encontra peças de reposição e de performance, com foco no V8."],
      ["V8 302: ignição e carburação", "Ignição eletrônica, coletor de admissão para quadrijet e escape bem dimensionado são as melhorias que mais acordam o 302 sem perder a confiabilidade."],
      ["Confira o ano e o motor", "Antes de comprar, confira no anúncio se a peça serve no seu motor e ano."]
    ],
    faq: [
      ["Ignição eletrônica vale a pena no Maverick V8?", "Sim. Melhora partida, marcha lenta e resposta do motor."],
      ["Qual carburador usar no 302?", "Um quadrijet com coletor adequado é a escolha mais comum para mais desempenho."],
      ["Ainda existem peças novas para Maverick?", "Sim, principalmente de motor, ignição, freios e acabamento."]
    ],
    posts: ["maverick-v8-302-ignicao-eletronica-coletor"]
  },
  chevette: {
    textos: [
      ["Peças para Chevette", "O Chevette é barato de manter, leve e tem tração traseira, por isso virou base de muito projeto de arrancada. Aqui estão peças de reposição e de preparação: carburação, ignição, motor e acabamento."],
      ["Chevette turbo", "Com kit turbo específico, o 1.6 ganha muita força. Lembre de reforçar alimentação, embreagem e manter a mistura segura."]
    ],
    faq: [
      ["Dá para colocar turbo no Chevette?", "Dá. Existem kits turbo específicos para o motor do Chevette. Veja a categoria turbo."],
      ["Qual distribuidor usar no Chevette com injeção?", "Para injeção programável, há kits de distribuidor com sensor prontos para o 1.4 e 1.6."],
      ["Peças de Chevette servem na Marajó e Chevy 500?", "Boa parte da mecânica é compartilhada. Confira a aplicação no anúncio."]
    ],
    posts: ["carburado-para-injecao-programavel", "kit-turbo-ap-como-escolher"]
  },
  gol: {
    textos: [
      ["Peças para Gol quadrado", "O Gol quadrado (G1) com motor AP é um dos carros mais preparados do Brasil. Aqui você encontra peças de reposição e de preparação: carburação, ignição, motor, suspensão e acabamento."],
      ["Motor AP", "O AP aceita bem turbo, comando e injeção programável. Para projetos turbo, comece pelo kit turbo certo e reforce alimentação e embreagem."]
    ],
    faq: [
      ["Qual o melhor kit turbo para Gol AP?", "Depende do uso. Explicamos no guia de kit turbo para AP."],
      ["Peças de Gol servem em Voyage, Parati e Saveiro?", "Sim, boa parte da mecânica é igual. Confira a aplicação no anúncio."],
      ["Gol quadrado com injeção programável vale a pena?", "Sim, principalmente em projetos turbo. Veja o guia de conversão para injeção."]
    ],
    posts: ["kit-turbo-ap-como-escolher", "carburado-para-injecao-programavel", "como-calcular-bico-injetor-turbo"]
  },
  passat: {
    textos: [
      ["Peças para Passat", "O Passat foi o primeiro VW refrigerado a água do Brasil e virou clássico nas pistas de arrancada. Aqui estão peças de reposição e preparação para o seu Passat."],
      ["Restauração", "Arrefecimento, carburação e acabamento são os pontos que mais pedem atenção na restauração."]
    ],
    faq: [
      ["Ainda tem peça nova para Passat?", "Sim, especialmente de motor, carburação e acabamento."],
      ["Passat é bom para arrancada?", "É. Muitas equipes começaram com Passat, inclusive a MRB do Roderjan Busato."]
    ],
    posts: ["roderjan-busato-equipe-mrb-pro-mod", "kit-turbo-ap-como-escolher"]
  },
  variant: {
    textos: [
      ["Peças para Variant", "A Variant usa motor a ar e divide muitas peças com Fusca, Brasília e TL. Aqui você encontra peças de motor, carburação, freios e acabamento."],
      ["Motor a ar", "Kit motor, carburadores e ignição são os itens que mais devolvem a vida ao motor a ar."]
    ],
    faq: [
      ["Peças de Fusca servem na Variant?", "Muitas peças de motor a ar são compartilhadas, mas acabamento e carroceria são específicos. Confira o anúncio."],
      ["Qual carburador usar na Variant?", "A Variant original usa carburação dupla. Confira o modelo do seu motor antes de comprar."]
    ],
    posts: ["fusca-1600-carburador-kit-motor"]
  },
  c10: {
    textos: [
      ["Peças para C10 e C14", "As picapes Chevrolet C10, C14 e A10 são clássicos muito procurados para restauração. Aqui estão peças de motor, carburação, freios e acabamento."],
      ["Motor 4 e 6 cilindros", "Muitas C10 usam o mesmo motor 250 do Opala 6cc, então várias peças de motor são compartilhadas."]
    ],
    faq: [
      ["Peças de Opala servem na C10?", "As C10 com motor 250 compartilham muitas peças de motor com o Opala 6cc. Confira a aplicação."],
      ["Ainda existem peças novas para C10?", "Sim, principalmente de motor, freios, borrachas e acabamento."]
    ],
    posts: ["pecas-para-preparar-opala-6cc", "carburador-weber-no-opala"]
  },
  rural: {
    textos: [
      ["Peças para Rural Willys", "A Rural Willys é um dos utilitários clássicos mais queridos do Brasil. Aqui você encontra peças de reposição para motor, carburação, freios e acabamento."],
      ["Restauração", "Peças de borracha, freios e ignição são as mais procuradas para deixar a Rural rodando com segurança."]
    ],
    faq: [
      ["Ainda tem peça para Rural Willys?", "Sim, há boa oferta de reposição, principalmente de motor, freio e borrachas."],
      ["Peças de Jeep Willys servem na Rural?", "Muitas peças mecânicas são compartilhadas. Confira a aplicação no anúncio."]
    ],
    posts: []
  },
  landau: {
    textos: [
      ["Peças para Ford Landau e Galaxie", "O Landau é a versão mais luxuosa da família Galaxie, com motor V8. Aqui estão peças de reposição para motor, ignição, freios e acabamento."],
      ["V8 Ford", "Ignição eletrônica e carburação bem regulada deixam o V8 mais confiável no dia a dia."]
    ],
    faq: [
      ["Peças de Galaxie servem no Landau?", "Sim, a mecânica é praticamente a mesma. Confira a aplicação no anúncio."],
      ["Ainda existem peças novas para Landau?", "Sim, especialmente de motor, ignição e acabamento."]
    ],
    posts: ["maverick-v8-302-ignicao-eletronica-coletor"]
  },
  galaxie: {
    textos: [
      ["Peças para Ford Galaxie", "O Galaxie foi o grande sedã V8 da Ford no Brasil. Aqui você encontra peças de reposição para manter o seu rodando."],
      ["Mecânica compartilhada", "Galaxie, LTD e Landau dividem a maior parte da mecânica, o que facilita achar peças."]
    ],
    faq: [
      ["Peças do Landau servem no Galaxie?", "Na maioria dos casos, sim. Confira a aplicação no anúncio."],
      ["Onde comprar peças de Galaxie?", "Aqui reunimos anúncios do Mercado Livre com compra segura e entrega em todo o Brasil."]
    ],
    posts: ["maverick-v8-302-ignicao-eletronica-coletor"]
  },
  omega: {
    textos: [
      ["Peças para Omega", "O Chevrolet Omega, nacional de 1992 a 1998, tem motores 2.0, 2.2, 3.0 e 4.1 de 6 cilindros. Aqui estão peças de reposição de motor, injeção, freios e acabamento."],
      ["Omega 4.1", "O 4.1 usa o bloco do Opala 6cc com injeção, por isso várias peças de motor são parecidas. Confira sempre a aplicação."]
    ],
    faq: [
      ["Peças de Opala servem no Omega 4.1?", "Algumas peças internas do motor são compartilhadas, mas injeção e periféricos são específicos. Confira o anúncio."],
      ["Omega é bom para preparar?", "Sim, especialmente o 4.1 e o 3.0, que aceitam bem preparação e turbo."]
    ],
    posts: ["pecas-para-preparar-opala-6cc"]
  }
};
