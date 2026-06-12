/* panier.js — Lumely Radiance */

// ===== MENU BURGER =====
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('main-nav').classList.toggle('active');
});


// ===== PANIER =====
let panier = JSON.parse(localStorage.getItem('lumely_panier') || '[]');

function sauvegarder() {
    localStorage.setItem('lumely_panier', JSON.stringify(panier));
}

function total() {
    return panier.reduce((sum, a) => sum + a.prix * a.quantite, 0);
}

function afficher() {
    const liste = document.getElementById('cart-items');
    liste.innerHTML = '';

    if (panier.length === 0) {
        liste.innerHTML = '<li style="opacity:0.6">Panier vide</li>';
    } else {
        panier.forEach((a, i) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${a.nom}</span>
                <span>${(a.prix * a.quantite).toFixed(2)}€</span>
                <div>
                    <button class="qty-btn" data-action="moins" data-i="${i}">−</button>
                    <span style="margin:0 5px">${a.quantite}</span>
                    <button class="qty-btn" data-action="plus" data-i="${i}">+</button>
                </div>
                <button class="remove-btn" data-action="sup" data-i="${i}">✕</button>
            `;
            liste.appendChild(li);
        });
    }

    document.getElementById('cart-total').textContent   = total().toFixed(2);
    document.getElementById('cart-count').textContent   = panier.reduce((s, a) => s + a.quantite, 0);
    sauvegarder();
}


// ===== AJOUTER AU PANIER =====
document.querySelectorAll('.product-button').forEach(btn => {
    btn.addEventListener('click', () => {
        const carte = btn.closest('.product-card');
        const nom   = carte.querySelector('h3').textContent;
        const prix  = parseFloat(carte.querySelector('.product-price').textContent);

        const existant = panier.find(a => a.nom === nom);
        if (existant) existant.quantite++;
        else panier.push({ nom, prix, quantite: 1 });

        afficher();
        document.getElementById('cart').classList.add('open');
    });
});


// ===== ACTIONS +/- SUPPRIMER =====
document.getElementById('cart-items').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const i = parseInt(btn.dataset.i);

    if (btn.dataset.action === 'plus')  panier[i].quantite++;
    if (btn.dataset.action === 'moins') panier[i].quantite--;
    if (btn.dataset.action === 'sup' || panier[i]?.quantite <= 0) panier.splice(i, 1);

    afficher();
});


// ===== OUVRIR / VIDER =====
document.getElementById('cart-btn').addEventListener('click', () => {
    document.getElementById('cart').classList.toggle('open');
});

document.getElementById('cart-clear').addEventListener('click', () => {
    panier = [];
    afficher();
});


// ===== OUVRIR PAIEMENT =====
document.getElementById('cart-checkout').addEventListener('click', () => {
    if (panier.length === 0) { alert('Panier vide !'); return; }

    if (!estConnecte) {
        if (confirm('Vous devez être connecté pour commander. Aller à la connexion ?'))
            window.location.href = 'connexion.php';
        return;
    }

    document.getElementById('checkout-amount').textContent = total().toFixed(2);
    document.getElementById('payment-section').classList.add('open');
});

document.getElementById('payment-close').addEventListener('click', () => {
    document.getElementById('payment-section').classList.remove('open');
});


// ===== VALIDER LA COMMANDE =====
document.getElementById('checkout-form').addEventListener('submit', async e => {
    e.preventDefault();

    // Envoie le total au serveur PHP
    const rep = await fetch('commander.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: total() })
    });
    const data = await rep.json();

    if (data.succes) {
        document.getElementById('order-number').textContent = `Commande #${data.commande_id} enregistrée. Merci !`;
        document.getElementById('order-modal').style.display = 'flex';
        panier = [];
        afficher();
        document.getElementById('payment-section').classList.remove('open');
        document.getElementById('checkout-form').reset();
    } else {
        alert('Erreur. Veuillez vous reconnecter.');
        window.location.href = 'connexion.php';
    }
});


// ===== FERMER MODAL =====
document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('order-modal').style.display = 'none';
});


// ===== FORMULAIRE CONTACT =====
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('contact-notif').style.display = 'block';
    setTimeout(() => document.getElementById('contact-notif').style.display = 'none', 3000);
    e.target.reset();
});


// ===== INIT =====
afficher();
