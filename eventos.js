/* =========================================================
   EVENTOS DE ARRANCADA
   inicio / fim : "AAAA-MM-DD"
   insta        : link do Instagram do evento (deixe "" se não tiver)
   ingresso     : link para comprar ingresso (deixe "" se não tiver)
   site         : site oficial (opcional)
   Eventos com data que já passou somem sozinhos da lista "Próximos".
   Coloque data:"" em eventos sem data confirmada (aparecem em "Em breve").
   Fonte das datas: SPID CUP, FuelTech/imprensa, PascoalDragster, Sympla (conferido em 23/11/2026)
   ========================================================= */
const EVENTOS = [
  { nome:"Super Final SPID CUP 2026", prova:"A etapa que decide os campeões da temporada do SPID CUP. São quatro dias de treinos, classificatórias e eliminatórias em mais de dez categorias, com destaque para a Pro Mod, onde carros passam dos 300 km/h nos 201 metros. Boxes abertos para o público, praça de alimentação e área de expositores.", metros:201, pista:'Pista de arrancada asfaltada com preparação (prep), 2 raias, cronometragem eletrônica e árvore de largada oficial.', tipo:"Campeonato", inicio:"2026-11-19", fim:"2026-11-22",
    local:"São Paulo International Dragway (SPID)", cidade:"Itatiba", uf:"SP",
    desc:"Decisão da temporada do campeonato do SPID, com títulos em aberto e grid forte de Pro Mod.",
    insta:"https://www.instagram.com/spidcup/", ingresso:"https://agendaesportiva.com.br/superfinal_spidcup_ingressos", site:"https://www.spidcup.com.br" },
  { nome:"Festival FT Viemar — 5ª Etapa Copa FT BR Sport", prova:"Última etapa da Copa FT BR Sport junto com o Festival FT, no autódromo da FuelTech. Categorias de rua e de competição, carros de cliente com injeção FuelTech e premiação de fim de temporada.", metros:201, pista:'Reta de arrancada do Autódromo FuelTech Velopark, 2 raias com preparação.', tipo:"Festival", inicio:"2026-12-01", fim:"2026-12-06",
    local:"Autódromo FuelTech Velopark", cidade:"Nova Santa Rita", uf:"RS",
    desc:"Última etapa da Copa FT BR Sport de Arrancada junto com o Festival FT Viemar. Cerca de 350 pilotos e mais de 30 categorias.",
    insta:"", ingresso:"", site:"https://www.fueltech.com.br" },
  { nome:"KM de Arrancada BSB", prova:"Dois dias de arrancada na reta do Autódromo Internacional de Brasília. Aberto a carros de rua e preparados, com tomada de tempo e disputas por categoria.", metros:402, pista:'Reta principal do autódromo adaptada para arrancada, com 2 raias e cronometragem.', tipo:"Arrancada", inicio:"2026-12-04", fim:"2026-12-05",
    local:"Autódromo Internacional de Brasília", cidade:"Brasília", uf:"DF",
    desc:"Dois dias de arrancada no autódromo de Brasília.",
    insta:"", ingresso:"https://www.sympla.com.br/evento/km-de-arrancada-bsb-4-e-5-de-dezembro/3619669", site:"" },
  { nome:"A Lista 012", prova:"Lista No Prep da região 012: os carros mais rápidos do Vale do Paraíba se desafiam em disputas diretas, sem preparação de pista. Quem vence sobe na lista.", metros:201, pista:'Pista No Prep: asfalto sem cola, 2 raias, largada no "flash" ou árvore.', tipo:"No Prep", inicio:"2026-12-05", fim:"2026-12-05",
    local:"Race Valley", cidade:"Tremembé", uf:"SP",
    desc:"Lista dos carros mais rápidos da região 012 frente a frente.",
    insta:"https://www.instagram.com/racevalley/", ingresso:"", site:"" },
  { nome:"5ª Etapa Raiz Race Valley", prova:"Etapa do campeonato Raiz, focado em carros com cara de rua e preparação acessível. Bom evento para estrear o carro na pista.", metros:201, pista:'Race Valley: complexo com pista de arrancada de 2 raias.', tipo:"Campeonato", inicio:"2026-12-05", fim:"2026-12-05",
    local:"Race Valley", cidade:"Tremembé", uf:"SP",
    desc:"Etapa do campeonato Raiz no complexo Race Valley.",
    insta:"https://www.instagram.com/racevalley/", ingresso:"", site:"" },
  { nome:"2º Festival Outlaws Race Valley", prova:"Festival Outlaws fechando o ano: categorias livres, carros muito rápidos e clima de festa com som, exposição e food trucks.", metros:201, pista:'Race Valley: pista de arrancada de 2 raias.', tipo:"Festival", inicio:"2026-12-12", fim:"2026-12-13",
    local:"Race Valley", cidade:"Tremembé", uf:"SP",
    desc:"Festival Outlaws fechando o ano em São Paulo.",
    insta:"https://www.instagram.com/racevalley/", ingresso:"https://www.sympla.com.br/evento/festival-outlaws-a-maior-corrida-fora-da-lei/3656460", site:"" },

  { nome:"Leva Tudo Sul", prova:"Os carros No Prep mais rápidos do Rio Grande do Sul (Áreas 51, 53, 54 e 55) e de Santa Catarina (Áreas 47, 48 e 49) frente a frente nos 201 metros, disputando R$ 30 mil e o título de mais rápido da região Sul. Organização da Lista Área 43.", metros:201, pista:'Autódromo Internacional de Santa Cruz do Sul em modo No Prep, 2 raias.', tipo:"No Prep", inicio:"2026-11-28", fim:"2026-11-28",
    local:"Autódromo Internacional de Santa Cruz do Sul", cidade:"Santa Cruz do Sul", uf:"RS",
    desc:"Listas do RS e SC se enfrentando por R$ 30 mil em prêmios.",
    insta:"", ingresso:"https://www.sympla.com.br/evento/leva-tudo-sul-28-novembro/3612168", site:"https://www.listaarea43.com" },
  { nome:"KM Festival Brasília", prova:"Festival automotivo do Km de Arrancada no autódromo de Brasília, com exposição de carros de várias culturas (arrancada, rebaixados, clássicos) no dia seguinte ao KM de Arrancada.", metros:402, pista:'Autódromo Internacional de Brasília.', tipo:"Festival", inicio:"2026-12-06", fim:"2026-12-06",
    local:"Autódromo Internacional de Brasília", cidade:"Brasília", uf:"DF",
    desc:"Festival e exposição automotiva do Km de Arrancada.",
    insta:"", ingresso:"https://www.sympla.com.br/evento/km-festival-brasilia/3658211", site:"" },
  { nome:"Raiz — O Verdadeiro Pega de Rua", prova:"Dia de disputas marcadas entre carros de rua no Race Valley: quem é o mais rápido da sua categoria, com segurança de pista.", metros:201, pista:'Race Valley: pista de arrancada de 2 raias.', tipo:"Campeonato", inicio:"2026-12-19", fim:"2026-12-19",
    local:"Race Valley Motorsport Park", cidade:"Tremembé", uf:"SP",
    desc:"Pega de rua organizado no Race Valley, ingresso a partir de R$ 40.",
    insta:"https://www.instagram.com/racevalley/", ingresso:"https://www.sympla.com.br/evento/raiz-o-verdadeiro-pega-de-rua-race-valley/3653440", site:"" },
  { nome:"Lista Área 43 — Londrina", prova:"Festa da lista No Prep de Londrina e região: disputas entre o TOP 20 da Lista Área 43, desafios do Shark Tank e carros atração.", metros:201, pista:'Pista No Prep de 2 raias em Londrina.', tipo:"No Prep", inicio:"2026-12-12", fim:"2026-12-12",
    local:"Av. Henrique Mansano, 777 — Jardim dos Alpes I", cidade:"Londrina", uf:"PR",
    desc:"TOP 20 da Lista Área 43 e Shark Tank no mesmo dia.",
    insta:"", ingresso:"https://www.sympla.com.br/evento/lista-area-43-londrina-12-de-dezembro/3652394", site:"https://www.listaarea43.com" },

  /* ---- Próxima edição ainda sem data ---- */
  { nome:"Armageddon", prova:"O maior evento No Prep da América Latina reúne as principais listas do país em um fim de semana de duelos sem preparação de pista. Edição de 10 anos realizada em outubro de 2026.", metros:201, pista:'Velopark: reta de arrancada usada em modo No Prep, 2 raias.', tipo:"No Prep", inicio:"", fim:"",
    local:"Autódromo Velopark", cidade:"Nova Santa Rita", uf:"RS",
    desc:"O maior evento No Prep da América Latina. A 16ª edição foi em 30 e 31/10/2026; próxima data a confirmar.",
    insta:"https://www.instagram.com/listasbrasiloficial/", ingresso:"", site:"" },
  { nome:"Leva Tudo", prova:"Encontro dos carros No Prep mais rápidos, divididos por área (DDD), disputando os 201 metros no mano a mano.", metros:201, pista:'Pistas No Prep de 2 raias (Race Valley e outras).', tipo:"No Prep", inicio:"", fim:"",
    local:"Race Valley e outras pistas", cidade:"Tremembé", uf:"SP",
    desc:"Os carros No Prep mais rápidos se enfrentando nos 201 metros. A edição de São Paulo foi em 22/08/2026; próximas etapas a confirmar.",
    insta:"", ingresso:"", site:"" }
];
