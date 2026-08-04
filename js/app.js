/* ============================================================
   VEXMORE CITY — LÓGICA DA LOJA
   Não precisa editar este arquivo para adicionar produtos —
   edite js/products.js.
   ============================================================ */

const CART_KEY = "vexmore_cart";
const state = {
  activeCategory: "todos",
  cart: JSON.parse(localStorage.getItem(CART_KEY) || "{}"), // { productId: qty }
};

const fmtBRL = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const placeholderIcon = `
<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="#ffb020" stroke-width="1.5">
  <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/>
  <path d="M3 7l9 5 9-5"/>
  <path d="M12 12v10"/>
</svg>`;

/* ---------------- CATEGORY PILLS ---------------- */

function renderCategoryPills() {
  const wrap = document.getElementById("catPills");
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "cat-pill";
    btn.dataset.cat = cat.id;
    btn.textContent = `${cat.emoji ? cat.emoji + " " : ""}${cat.nome}`;
    wrap.appendChild(btn);
  });

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-pill");
    if (!btn) return;
    state.activeCategory = btn.dataset.cat;
    wrap.querySelectorAll(".cat-pill").forEach((b) => b.classList.toggle("active", b === btn));
    renderGrid();
  });
}

/* ---------------- PRODUCT GRID ---------------- */

function categoryName(id) {
  const cat = CATEGORIES.find((c) => c.id === id);
  return cat ? cat.nome : id;
}

function renderGrid() {
  const wrap = document.getElementById("gridWrap");
  const list = PRODUCTS.filter(
    (p) => state.activeCategory === "todos" || p.categoria === state.activeCategory
  );

  if (list.length === 0) {
    wrap.innerHTML = `
      <div class="empty-state">
        <span class="tape">Vitrine vazia</span>
        <h3>Nenhum produto por aqui ainda</h3>
        <p>Assim que você adicionar itens em <code>js/products.js</code>, eles aparecem aqui automaticamente — sem precisar mexer no resto do site.</p>
      </div>`;
    return;
  }

  wrap.innerHTML = `<div class="grid">${list.map(renderCard).join("")}</div>`;
}

function renderCard(p) {
  const media = p.imagem
    ? `<img src="${p.imagem}" alt="${escapeHtml(p.nome)}" loading="lazy">`
    : placeholderIcon;

  const priceBlock = p.precoAntigo
    ? `<span class="old">${fmtBRL(p.precoAntigo)}</span>${fmtBRL(p.preco)}`
    : fmtBRL(p.preco);

  return `
    <article class="card" data-id="${p.id}">
      <div class="card-media">
        ${p.tag ? `<span class="card-tag">${escapeHtml(p.tag)}</span>` : ""}
        ${media}
      </div>
      <div class="card-body">
        <span class="card-cat">${escapeHtml(categoryName(p.categoria))}</span>
        <h3 class="card-name">${escapeHtml(p.nome)}</h3>
        <p class="card-desc">${escapeHtml(p.descricao || "")}</p>
        <div class="card-foot">
          <div class="plate">${priceBlock}</div>
          <div style="display:flex; gap:8px;">
            <button class="buy-btn" data-action="add" data-id="${p.id}" title="Adicionar ao carrinho" aria-label="Adicionar ao carrinho" style="padding:8px 10px;">+</button>
            <button class="buy-btn" data-action="buy" data-id="${p.id}">Comprar</button>
          </div>
        </div>
      </div>
    </article>`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

/* ---------------- CART ---------------- */

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function cartCountTotal() {
  return Object.values(state.cart).reduce((a, b) => a + b, 0);
}

function addToCart(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  saveCart();
  renderCartUI();
  showToast("Adicionado ao carrinho");
}

function changeQty(id, delta) {
  if (!state.cart[id]) return;
  state.cart[id] += delta;
  if (state.cart[id] <= 0) delete state.cart[id];
  saveCart();
  renderCartUI();
}

function removeFromCart(id) {
  delete state.cart[id];
  saveCart();
  renderCartUI();
}

function renderCartUI() {
  const count = cartCountTotal();
  const countEl = document.getElementById("cartCount");
  countEl.textContent = count;
  countEl.dataset.empty = count === 0 ? "true" : "false";

  const itemsWrap = document.getElementById("drawerItems");
  const ids = Object.keys(state.cart);

  if (ids.length === 0) {
    itemsWrap.innerHTML = `<p class="drawer-empty">Seu carrinho está vazio.<br>Explore a vitrine e adicione um item.</p>`;
    document.getElementById("drawerTotal").textContent = fmtBRL(0);
    return;
  }

  let total = 0;
  itemsWrap.innerHTML = ids
    .map((id) => {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) return "";
      const qty = state.cart[id];
      total += p.preco * qty;
      const media = p.imagem
        ? `<img src="${p.imagem}" alt="${escapeHtml(p.nome)}">`
        : `<div class="ph"></div>`;
      return `
        <div class="drawer-item" data-id="${id}">
          ${media}
          <div class="drawer-item-info">
            <div class="drawer-item-cat">${escapeHtml(categoryName(p.categoria))}</div>
            <div class="drawer-item-name">${escapeHtml(p.nome)}</div>
            <div class="drawer-item-row">
              <div class="qty-ctrl">
                <button data-action="dec" data-id="${id}" aria-label="Diminuir">−</button>
                <span>${qty}</span>
                <button data-action="inc" data-id="${id}" aria-label="Aumentar">+</button>
              </div>
              <span class="drawer-item-price">${fmtBRL(p.preco * qty)}</span>
            </div>
            <div class="drawer-item-row">
              <button class="drawer-item-remove" data-action="remove" data-id="${id}">remover</button>
              <button class="buy-btn" data-action="buy" data-id="${id}" style="font-size:.76rem;padding:5px 10px;">Comprar</button>
            </div>
          </div>
        </div>`;
    })
    .join("");

  document.getElementById("drawerTotal").textContent = fmtBRL(total);
}

/* ---------------- CHECKOUT (per-item external link) ---------------- */

function goToCheckout(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  if (p.linkPagamento) {
    window.open(p.linkPagamento, "_blank", "noopener");
  } else {
    showToast("Pagamento ainda não configurado para este item");
  }
}

/* ---------------- TOAST ---------------- */

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------------- DRAWER OPEN/CLOSE ---------------- */

function openDrawer() {
  document.getElementById("drawer").classList.add("open");
  document.getElementById("overlay").classList.add("open");
}
function closeDrawer() {
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}

/* ---------------- EVENTS ---------------- */

document.addEventListener("click", (e) => {
  const buyBtn = e.target.closest('[data-action="buy"]');
  if (buyBtn) {
    goToCheckout(buyBtn.dataset.id);
    return;
  }
  const addBtn = e.target.closest('[data-action="add"]');
  if (addBtn) {
    addToCart(addBtn.dataset.id);
    return;
  }
  const inc = e.target.closest('[data-action="inc"]');
  if (inc) return changeQty(inc.dataset.id, 1);
  const dec = e.target.closest('[data-action="dec"]');
  if (dec) return changeQty(dec.dataset.id, -1);
  const rem = e.target.closest('[data-action="remove"]');
  if (rem) return removeFromCart(rem.dataset.id);
});

document.getElementById("cartOpenBtn").addEventListener("click", openDrawer);
document.getElementById("drawerClose").addEventListener("click", closeDrawer);
document.getElementById("overlay").addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

/* ---------------- INIT ---------------- */

document.getElementById("year").textContent = new Date().getFullYear();
renderCategoryPills();
renderGrid();
renderCartUI();
