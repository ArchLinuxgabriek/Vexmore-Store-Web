/* ============================================================
   VEXMORE CITY — PRODUTOS DA LOJA
   ============================================================
   Este é o único arquivo que você precisa mexer para publicar
   itens na loja. Não existe nenhum produto de exemplo ativo —
   a loja começa vazia de propósito, do jeito que você pediu.

   COMO ADICIONAR UM PRODUTO
   --------------------------------------------------------------
   Copie o bloco abaixo, cole dentro do array PRODUCTS (respeitando
   as vírgulas entre os itens) e preencha os campos:

   {
     id: "vip-ouro",              // único, sem espaços/acentos
     categoria: "vips",           // precisa existir em CATEGORIES (veja mais abaixo)
     nome: "VIP Ouro",
     descricao: "Acesso a garagem extra, salário +20% e tag exclusiva.",
     preco: 29.90,                // preço atual (em R$)
     precoAntigo: null,           // opcional: preço "de" riscado, ex: 39.90
     imagem: "assets/produtos/vip-ouro.png", // veja a seção IMAGENS abaixo
     destaque: false,             // true = aparece na vitrine em destaque
     tag: "MAIS VENDIDO",         // opcional: selo pequeno no canto do card
     linkPagamento: "https://link-do-seu-checkout.com/vip-ouro"
     // ^ link do Mercado Pago, PIX, Stripe, PayPal.me, Tebex, etc.
     //   é para ONDE o botão "Comprar" leva o comprador.
     //   Deixe "" se ainda não tiver o link — o botão avisa o
     //   cliente que a compra ainda não está disponível.
   }

   IMAGENS
   --------------------------------------------------------------
   Coloque as imagens dos seus produtos dentro de assets/produtos/
   (crie essa pasta) e aponte o campo "imagem" para o arquivo.
   Se não tiver imagem, deixe imagem: "" que a loja mostra um
   ícone padrão no estilo da marca.

   CATEGORIAS
   --------------------------------------------------------------
   Já vêm duas prontas (vips e veiculos), do jeito que você pediu.
   Para criar uma nova categoria (ex: "facções"), adicione um
   objeto novo dentro de CATEGORIES com id, nome e emoji.
   ============================================================ */

const CATEGORIES = [
  { id: "vips",     nome: "VIPs",           emoji: "👑" },
  { id: "veiculos", nome: "Veículos VIP",   emoji: "🏎️" },
];

const PRODUCTS = [
  // A loja começa vazia. Adicione seus produtos aqui em cima,
  // seguindo o modelo explicado no comentário acima.
];
