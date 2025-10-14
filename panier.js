// ===== MENU BURGER =====
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

document.querySelectorAll('.main-nav a').forEach(lien => {
  lien.addEventListener('click', () => {
    mainNav.classList.remove('active');
  });
});

/* =========================
   Panier + Paiement (client)
   ========================= */
const productButtons = document.querySelectorAll('.product-button');
const cartSidebar = document.getElementById('cart');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const cartClearBtn = document.getElementById('cart-clear');
const cartCheckoutBtn = document.getElementById('cart-checkout');
const cartBtn = document.getElementById('cart-btn');

const paymentSection = document.getElementById('payment-section');
const checkoutForm = document.getElementById('checkout-form');
const checkoutAmountEl = document.getElementById('checkout-amount');
const paymentCloseBtn = document.getElementById('payment-close');

const orderModal = document.getElementById('order-modal');
const modalClose = document.getElementById('modal-close');
const orderNumberEl = document.getElementById('order-number');

const contactForm = document.getElementById('contact-form');
const contactNotification = document.getElementById('contact-notification');

let cart = loadCart();

function parsePrice(text){
  return parseFloat(text.replace(/\s/g,'').replace('€','').replace(',','.')) || 0;
}

function saveCart(){
  localStorage.setItem('lumely_cart_v1', JSON.stringify(cart));
}

function loadCart(){
  try {
    const raw = localStorage.getItem('lumely_cart_v1');
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    return [];
  }
}

function getCartTotals(){
  let total = 0, items = 0;
  cart.forEach(it => { total += it.price * it.quantity; items += it.quantity; });
  return { total, items };
}

function renderCart(){
  cartItemsEl.innerHTML = '';
  if(cart.length === 0){
    const empty = document.createElement('li');
    empty.textContent = "Votre panier est vide.";
    empty.style.opacity = 0.8;
    cartItemsEl.appendChild(empty);
  } else {
    cart.forEach((item, idx) => {
      const row = document.createElement('li');
      row.className = 'cart-item-row';
      row.dataset.index = idx;

      const left = document.createElement('div');
      left.className = 'ci-left';
      const name = document.createElement('div');
      name.className = 'ci-name';
      name.textContent = item.name;
      const price = document.createElement('div');
      price.className = 'ci-price';
      price.textContent = `${(item.price * item.quantity).toFixed(2)}€`;
      left.appendChild(name);
      left.appendChild(price);

      const qtyWrap = document.createElement('div');
      qtyWrap.className = 'ci-qty';
      const minus = document.createElement('button');
      minus.className = 'qty-btn minus';
      minus.type = 'button';
      minus.title = 'Retirer 1';
      minus.textContent = '−';
      const qty = document.createElement('span');
      qty.className = 'qty-value';
      qty.textContent = item.quantity;
      const plus = document.createElement('button');
      plus.className = 'qty-btn plus';
      plus.type = 'button';
      plus.title = 'Ajouter 1';
      plus.textContent = '+';
      qtyWrap.appendChild(minus);
      qtyWrap.appendChild(qty);
      qtyWrap.appendChild(plus);

      const right = document.createElement('div');
      right.className = 'ci-right';
      const remove = document.createElement('button');
      remove.className = 'remove-btn';
      remove.type = 'button';
      remove.title = 'Supprimer';
      remove.textContent = 'Supprimer';
      right.appendChild(remove);

      row.appendChild(left);
      row.appendChild(qtyWrap);
      row.appendChild(right);

      cartItemsEl.appendChild(row);
    });
  }

  const totals = getCartTotals();
  cartTotalEl.textContent = totals.total.toFixed(2);
  cartCountEl.textContent = totals.items;
  saveCart();
}

/* Ajouter produit */
productButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const name = card.querySelector('h3').innerText.trim();
    const price = parsePrice(card.querySelector('.product-price').innerText.trim());

    const existing = cart.find(p => p.name === name);
    if(existing) existing.quantity += 1;
    else cart.push({ name, price, quantity: 1 });

    renderCart();
    openCart();
  });
});

/* Actions sur +/- et supprimer */
cartItemsEl.addEventListener('click', (e) => {
  const row = e.target.closest('.cart-item-row');
  if(!row) return;
  const idx = parseInt(row.dataset.index, 10);
  if(Number.isNaN(idx)) return;

  if(e.target.matches('.qty-btn.plus')){
    cart[idx].quantity += 1;
    renderCart();
  } else if(e.target.matches('.qty-btn.minus')){
    cart[idx].quantity = Math.max(1, cart[idx].quantity - 1);
    renderCart();
  } else if(e.target.matches('.remove-btn')){
    cart.splice(idx, 1);
    renderCart();
  }
});

/* Vider le panier */
cartClearBtn.addEventListener('click', () => {
  if(!confirm("Voulez-vous vraiment vider le panier ?")) return;
  cart = [];
  renderCart();
});

/* Ouvrir/fermer le panier */
cartBtn.addEventListener('click', toggleCart);
function toggleCart(){
  cartSidebar.classList.toggle('open');
}
function openCart(){
  cartSidebar.classList.add('open');
}

/* Checkout -> ouvrir drawer */
cartCheckoutBtn.addEventListener('click', () => {
  if(cart.length === 0){
    alert("Votre panier est vide !!");
    return;
  }
  if(paymentSection){
    checkoutAmountEl.textContent = getCartTotals().total.toFixed(2);
    paymentSection.classList.add('open');
    window.scrollTo({ top: paymentSection.offsetTop - 20, behavior: 'smooth' });
  }
});

/* Fermer drawer paiement */
if(paymentCloseBtn){
  paymentCloseBtn.addEventListener('click', () => {
    paymentSection.classList.remove('open');
  });
}

/* Paiement simulé */
if(checkoutForm){
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('card-name').value.trim();
    const number = document.getElementById('card-number').value.replace(/\s/g,'').trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvc = document.getElementById('cvc').value.trim();

    if(!name || !number || !expiry || !cvc){
      alert("Veuillez remplir tous les champs du paiement.");
      return;
    }

    const orderNum = Math.floor(Math.random() * 900000) + 100000;
    if(orderNumberEl) orderNumberEl.innerHTML = `Numéro de commande : <strong>#${orderNum}</strong>`;

    if(orderModal){
      orderModal.style.display = 'flex';
      orderModal.setAttribute('aria-hidden', 'false');
    }

    cart = [];
    renderCart();
    paymentSection.classList.remove('open');
    checkoutForm.reset();
  });
}

/* Fermer le modal */
if(modalClose){
  modalClose.addEventListener('click', () => {
    orderModal.style.display = 'none';
    orderModal.setAttribute('aria-hidden', 'true');
  });
}

/* Contact */
if(contactForm){
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactNotification.style.display = 'block';
    setTimeout(() => {
      contactNotification.style.display = 'none';
    }, 3000);
    contactForm.reset();
  });
}

/* Initial render */
renderCart();
