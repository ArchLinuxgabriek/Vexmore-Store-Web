# Vexmore City — Loja

Site estático (sem backend) para vender **VIPs** e **veículos VIP** do servidor Vexmore City, no mesmo estilo visual da arte/logo do servidor. Feito para publicar direto no **GitHub Pages**.

A loja começa **sem nenhum produto** de propósito — você adiciona os seus.

## Páginas do site

| Página | O que é |
|---|---|
| `index.html` | Loja — vitrine de VIPs e veículos |
| `whitelist.html` | Formulário oficial de whitelist (embutido do Google Forms) |
| `regras.html` | Livro de regras da cidade |

As três já estão linkadas entre si pelo menu do topo.

---

## 1. Estrutura do projeto

```
vexmore-store/
├── index.html          → loja (não precisa mexer)
├── whitelist.html       → página de whitelist (não precisa mexer)
├── regras.html           → livro de regras (não precisa mexer)
├── css/style.css         → visual da loja e da whitelist (não precisa mexer)
├── js/
│   ├── products.js      → 🟡 ARQUIVO QUE VOCÊ EDITA (produtos e categorias)
│   └── app.js            → lógica da loja (carrinho, filtros — não precisa mexer)
└── assets/
    ├── logo.png          → sua logo (fundo transparente, usada em todas as páginas)
    ├── hero-bg.png        → imagem de fundo da capa da loja e da whitelist
    ├── whitelist-banner.png → banner opcional para o tema do Google Forms
    └── produtos/          → 🟡 pasta pra você criar e colocar fotos dos produtos
```

> `regras.html` é um arquivo à parte, com seu próprio CSS embutido — por isso o visual dele é levemente diferente da loja (mesma paleta âmbar, tipografia própria). Se quiser deixá-lo idêntico ao resto do site, é só pedir.


## 2. Como adicionar um produto

Abra `js/products.js`. Existe um array `PRODUCTS` vazio com um modelo comentado em cima explicando cada campo. Exemplo de um item pronto:

```js
const PRODUCTS = [
  {
    id: "vip-ouro",
    categoria: "vips",
    nome: "VIP Ouro",
    descricao: "Garagem extra, salário +20% e tag exclusiva no jogo.",
    preco: 29.90,
    precoAntigo: 39.90,
    imagem: "assets/produtos/vip-ouro.png",
    destaque: true,
    tag: "MAIS VENDIDO",
    linkPagamento: "https://mpago.la/xxxxxxx"
  },
  {
    id: "dodge-charger-vex",
    categoria: "veiculos",
    nome: "Dodge Charger Vexmore",
    descricao: "Veículo exclusivo VIP, edição limitada da cidade.",
    preco: 59.90,
    precoAntigo: null,
    imagem: "assets/produtos/charger.png",
    destaque: false,
    tag: "",
    linkPagamento: "https://mpago.la/yyyyyyy"
  },
];
```

Basta salvar o arquivo — o produto aparece na loja automaticamente, na categoria certa.

### Categorias

Já vêm duas, do jeito que você pediu:

```js
const CATEGORIES = [
  { id: "vips",     nome: "VIPs",         emoji: "👑" },
  { id: "veiculos", nome: "Veículos VIP", emoji: "🏎️" },
];
```

Para criar uma categoria nova (ex: facções), adicione outro objeto nesse array com um `id` novo e use esse mesmo `id` no campo `categoria` dos produtos.

## 3. Sobre o pagamento (importante)

Este é um site **estático** (só HTML/CSS/JS), então ele **não processa pagamento sozinho** — não existe backend nem contas de usuário aqui. O jeito que ele foi montado pra resolver isso:

Cada produto tem um campo `linkPagamento`. É o link de **checkout externo** desse item — pode ser:

- Um link de pagamento do **Mercado Pago** ("Link de pagamento" no painel deles)
- Um **Payment Link** do Stripe
- Um link do **PayPal.me**
- Uma loja do **Tebex** (como a que você usou de referência)
- Qualquer outro link de checkout que você já use hoje

Quando o cliente clica em **Comprar**, ele é levado direto pra esse link em uma nova aba. Se o campo estiver vazio, a loja avisa que aquele item ainda não está disponível para compra — assim você pode publicar o produto antes mesmo de ter o link pronto, sem quebrar nada.

> O carrinho (ícone no topo) serve para o cliente organizar/visualizar os itens que quer comprar — a compra em si acontece item por item, no link configurado. Isso é uma limitação de qualquer site 100% estático (sem servidor); se no futuro você quiser um carrinho com pagamento único combinando vários itens, vai precisar de um backend (ex: Mercado Pago Checkout Pro com um servidor simples, ou uma plataforma pronta como o Tebex do seu exemplo).

## 4. Publicando no GitHub Pages

1. Crie um repositório novo no GitHub (ex: `vexmore-store`).
2. Suba todos os arquivos desta pasta para a raiz do repositório.
3. No GitHub, vá em **Settings → Pages**.
4. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
5. Salve. Depois de ~1 minuto o GitHub mostra o link do site (algo como `https://seuusuario.github.io/vexmore-store/`).

Qualquer alteração que você fizer depois (novo produto, nova categoria, trocar imagem) — é só editar o arquivo, subir (`commit` + `push`) e o site atualiza sozinho.

## 5. Outros ajustes rápidos

- **Link do Discord**: no `index.html`, procure `id="discordLink"` e troque o `href="#"` pelo link do seu servidor.
- **Redes sociais do rodapé**: mesmo arquivo, na seção `<footer>`, troque os `href="#"` dos ícones de Discord/Instagram.
- **Imagem de fundo da capa**: substitua `assets/hero-bg.png` por outra imagem (mantenha o mesmo nome, ou troque a referência em `css/style.css` na regra `.hero-bg`).
- **Cores**: todas as cores ficam no topo do `css/style.css`, dentro de `:root`, fáceis de ajustar.

---

Feito para o servidor **Vexmore City** — mesma paleta e composição da arte oficial (pôr do sol âmbar, silhueta da cidade, néon).
