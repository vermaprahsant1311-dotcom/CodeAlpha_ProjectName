console.log('main.js loaded');
const API = '/api';

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) cartCountEl.innerText = total;
}

async function loadProducts() {
  console.log('Loading products...');
    const container = document.getElementById('products');
    if (!container) {
      console.error('Products container not found');
      return;
    }
  try {
    const res = await fetch(`${API}/products`);
    console.log('Fetch response:', res);
    const products = await res.json();
    console.log('Products received:', products);
    container.innerHTML = products.map(p => `
      <div class="col-md-4 mb-4">
        <div class="card product-card">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">${p.description}</p>
            <p class="fw-bold">$${p.price}</p>
            <button class="btn btn-primary" onclick="addToCartById(${p.id})">Add to Cart</button>
            <a href="/product/${p.id}" class="btn btn-outline-secondary">View</a>
          </div>
        </div>
      </div>
    `).join('');
    console.log('Products rendered');
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

async function addToCartById(id) {
  const res = await fetch(`${API}/products/${id}`);
  const product = await res.json();
  addToCart(product);
}

// Load products and update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();

  // If on cart page, render cart
  if (document.getElementById("cart-items")) {
    renderCart();
  }
});