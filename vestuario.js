/* =========================================================
   VESTUÁRIO — camisetas, bonés e acessórios de arrancada
   loja : "shopee" ou "ml"
   link : SEU LINK DE AFILIADO (Shopee ou Mercado Livre)
   img  : link da foto do produto
   ========================================================= */
const VESTUARIO = [
 {"nome":"Camiseta FuelTech Carro Esportivo Arrancada","tipo":"Camiseta","loja":"ml","img":"https://http2.mlstatic.com/D_NQ_NP_822286-MLB95659965175_102025-O-camiseta-fueltech-carro-esportivo-arrancada.webp","preco":29.9,"link":"https://meli.la/2epFNCG","de":0,"vendidos":"+100","nota":4.6},
 {"nome":"Boné Jeans Drag Racing Engine com Bandeira Quadriculada","tipo":"Boné","loja":"ml","img":"https://http2.mlstatic.com/D_NQ_NP_699816-CBT119003117242_112026-O-bone-de-beisebol-jeans-drag-racing-engine-com-bandeira-quadriculada.webp","preco":47.06,"link":"https://meli.la/1P9Frgn","de":0},
 {"nome":"Boné Simpson Racing Arrancada Original","tipo":"Boné","loja":"ml","img":"https://http2.mlstatic.com/D_NQ_NP_705653-MLB115604318515_082026-O-bone-simpson-racing-arrancada-original-turbo-aspirado.webp","preco":249,"link":"https://meli.la/1TtXS1h","de":0},
 {"nome":"Boné Trucker Bordô FuelTech","tipo":"Boné","loja":"ml","img":"https://http2.mlstatic.com/D_NQ_NP_887033-MLA117604888962_102026-O.webp","preco":78,"link":"https://meli.la/1WCwj4o","de":0},
 {"nome":"Boné FuelTech FT Education Icon Cinza 2026","tipo":"Boné","loja":"ml","img":"https://http2.mlstatic.com/D_NQ_NP_670125-MLB109552692172_042026-O-bone-fueltech-modelo-ft-education-icon-cinza-colecao-2026.webp","preco":119.75,"link":"https://meli.la/2Rjmcbh","de":0},
 {"nome":"Jaqueta FuelTech Motorsport Race","tipo":"Jaqueta","loja":"ml","img":"https://http2.mlstatic.com/D_NQ_NP_871493-MLB105565860685_012026-O-jaqueta-fueltech-motorsport-race-m.webp","preco":439.32,"link":"https://meli.la/11zrNys","de":0},
 {"nome":"Jaqueta Bomber Azul Marinho FuelTech","tipo":"Jaqueta","loja":"ml","img":"https://http2.mlstatic.com/D_NQ_NP_664398-MLB120002034665_102026-O-jaqueta-bomber-azul-marinho-fueltech.webp","preco":319,"link":"https://meli.la/2Fuucnc","de":399},
 {"nome":"Camiseta Opaleiro Opala 6 Cilindros Diplomata","tipo":"Camiseta","loja":"ml","img":"https://http2.mlstatic.com/D_NQ_NP_694578-MLB84733085409_052025-O-camiseta-opaleiro-camisa-opala-6-cilindros-antigo-diplomata.webp","preco":30.88,"link":"https://meli.la/2ri1zQ3","de":35.35,"vendidos":"+100","nota":4.7},
 {"nome":"Camiseta Opala 1968-1992 GM Carro Antigo","tipo":"Camiseta","loja":"ml","img":"https://http2.mlstatic.com/D_NQ_NP_710302-MLB106713199474_022026-O-camiseta-masculina-opala-1968-1992-gm-camisa-carro-antigo.webp","preco":28.81,"link":"https://meli.la/1VGgGTM","de":54,"vendidos":"+100","nota":4.6},
 {"nome":"Camiseta Fueltech 100% Algodão","tipo":"Camiseta","loja":"ml","img":"/img/p/d0d8d95763b02cbf.jpg","preco":39.9,"link":"https://meli.la/1XvhhdL","de":0,"vendidos":"+1000","nota":4.4},
 {"nome":"Camiseta Fueltech Automobilismo Gearhead","tipo":"Camiseta","loja":"ml","img":"/img/p/77ac8628de20c58f.jpg","preco":31,"link":"https://meli.la/1q2AM2a","de":39.9,"vendidos":"+100","nota":4.3},
 {"nome":"Camiseta Fueltech Performance Automotiva","tipo":"Camiseta","loja":"ml","img":"/img/p/e24ee71d1e598734.jpg","preco":32,"link":"https://meli.la/1s15j44","de":33.1,"vendidos":"+500","nota":4.5},
 {"nome":"Camiseta West Coast Choppers Paul Walker","tipo":"Camiseta","loja":"ml","img":"/img/p/e64a52face4d53ad.jpg","preco":46.25,"link":"https://meli.la/1NA1Yzn","de":64,"vendidos":"+1000","nota":4.7},
 {"nome":"Camiseta West Coast Choppers Velozes e Furiosos","tipo":"Camiseta","loja":"ml","img":"/img/p/2d3a706b249dfcbf.jpg","preco":48.4,"link":"https://meli.la/1oaM7U2","de":69.9,"vendidos":"+500","nota":4.6},
 {"nome":"Camiseta Preta West Coast Choppers","tipo":"Camiseta","loja":"ml","img":"/img/p/a47e66519d80b8f1.jpg","preco":47.21,"link":"https://meli.la/13f7r5x","baixou":78,"baixouEm":"2026-11-26","de":78.9},
 {"nome":"Camiseta Arrancada Aspirado x Turbo","tipo":"Camiseta","loja":"ml","img":"/img/p/682d2fdb89fa68e5.jpg","preco":41.99,"link":"https://meli.la/22kZPfF","de":49.99},
 {"nome":"Camiseta Hoosier Tire Drag Racing","tipo":"Camiseta","loja":"ml","img":"/img/p/76c35b53fa224cf5.jpg","preco":63.52,"link":"https://meli.la/1ZZtWT9","de":0},
 {"nome":"Camiseta Turbo King Drag Racing","tipo":"Camiseta","loja":"ml","img":"/img/p/902da2a7400b2af9.jpg","preco":59.9,"link":"https://meli.la/2T2rnXB","de":61.75},
 {"nome":"Camiseta Turbo na Veia","tipo":"Camiseta","loja":"ml","img":"/img/p/9f4963cc9f606bea.jpg","preco":39.92,"link":"https://meli.la/1p6f1CR","de":49.9},
 {"nome":"Camiseta Gearhead Boost Turbo Premium","tipo":"Camiseta","loja":"ml","img":"/img/p/b02676b3b4cbf696.jpg","preco":69.9,"link":"https://meli.la/1E2owzF","de":0},
 {"nome":"Camiseta Turbo Gearhead Retrô","tipo":"Camiseta","loja":"ml","img":"/img/p/578620c6154417be.jpg","preco":69.9,"link":"https://meli.la/2ehQNf3","de":0},
 {"nome":"Moletom Gearhead Fueltech","tipo":"Moletom","loja":"ml","img":"/img/p/3a5aa6e9d392da29.jpg","preco":78.9,"link":"https://meli.la/1U1jipC","de":0,"vendidos":"+100","nota":4.6},
 {"nome":"Moletom Fueltech Plus Size","tipo":"Moletom","loja":"ml","img":"/img/p/135d1017149ac474.jpg","preco":85.85,"link":"https://meli.la/2qmtPPH","baixou":95,"baixouEm":"2026-11-26","de":119.9,"vendidos":"+500","nota":4.8},
 {"nome":"Moletom West Coast Choppers Canguru","tipo":"Moletom","loja":"ml","img":"/img/p/451a38b6c26e7d10.jpg","preco":71.9,"link":"https://meli.la/2b3ttDa","de":0},
 {"nome":"Moletom West Coast Choppers com Capuz","tipo":"Moletom","loja":"ml","img":"/img/p/c2353d3ad792ae55.jpg","preco":71.9,"link":"https://meli.la/2tozBah","de":0}
];
