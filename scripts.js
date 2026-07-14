lucide.createIcons();

/* ---------- DATA ---------- */
const menuData = [
  { id:1, cat:'Burgers', name:'Signature Burger', desc:'Bœuf maturé 45 jours, cheddar affiné, oignons confits', price:16.5, img:'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&auto=format&fit=crop' },
  { id:2, cat:'Burgers', name:'Double Cheese', desc:'Double bœuf, double cheddar, bacon fumé, pickles', price:18.9, img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80&auto=format&fit=crop' },
  { id:3, cat:'Burgers', name:'Chicken Deluxe', desc:'Poulet croustillant, sauce miel-moutarde, coleslaw maison', price:15.9, img:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80&auto=format&fit=crop' },
  { id:4, cat:'Burgers', name:'Veggie Prime', desc:'Galette de légumes grillés, avocat, sauce yaourt-citron', price:14.5, img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop' },
  { id:5, cat:'Pizzas', name:'Pizza Truffe', desc:'Crème de truffe noire, mozzarella di bufala, parmesan', price:19.9, img:'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600&q=80&auto=format&fit=crop' },
  { id:6, cat:'Pizzas', name:'Margherita Premium', desc:'San Marzano, mozzarella di bufala, basilic frais', price:14.9, img:'images/delicious-margherita-pizza.png' },
  { id:7, cat:'Pizzas', name:'Quattro Formaggi', desc:'Mozzarella, gorgonzola, parmesan, chèvre affiné', price:17.5, img:'images/946f07b7b5ec4f23a6fea58a2ac72650.png' },
  { id:8, cat:'Pizzas', name:'Prosciutto e Funghi', desc:'Jambon de Parme, champignons de Paris, roquette', price:16.9, img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&auto=format&fit=crop' },
  { id:9, cat:'Boissons', name:'Limonade Artisanale', desc:'Citron frais pressé, menthe, eau pétillante', price:5.5, img:'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80&auto=format&fit=crop' },
  { id:10, cat:'Boissons', name:'Thé Glacé Maison', desc:'Infusion de thé noir, pêche et agrumes', price:5.0, img:'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=600&q=80&auto=format&fit=crop' },
  { id:11, cat:'Boissons', name:'Mocktail Rouge', desc:'Fruits rouges, sirop dorgeat, citron vert', price:6.5, img:'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&q=80&auto=format&fit=crop' },
  { id:12, cat:'Desserts', name:'Tiramisu Signature', desc:'Mascarpone, café arabica, cacao amer', price:7.9, img:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&auto=format&fit=crop' },
  { id:13, cat:'Desserts', name:'Cheesecake Doré', desc:'Base sablée, coulis de fruits de saison', price:8.5, img:'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&q=80&auto=format&fit=crop' },
  { id:14, cat:'Desserts', name:'Fondant Chocolat', desc:'Cœur coulant, glace vanille bourbon', price:8.9, img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80&auto=format&fit=crop' },
];

let activeCat = 'all';
let searchTerm = '';
let cart = [];

const menuGrid = document.getElementById('menuGrid');
const noResults = document.getElementById('noResults');

function money(v){ return v.toFixed(2).replace('.',',') + ' €'; }

function renderMenu(){
  const filtered = menuData.filter(item => {
    const matchCat = activeCat === 'all' || item.cat === activeCat;
    const matchSearch = item.name.toLowerCase().includes(searchTerm) || item.desc.toLowerCase().includes(searchTerm);
    return matchCat && matchSearch;
  });

  menuGrid.innerHTML = filtered.map(item => `
    <div class="card-lift bg-surface rounded-xl2 overflow-hidden shadow-softer border border-soft flex flex-col">
      <div class="img-zoom h-52 overflow-hidden relative">
        <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
        <span class="absolute top-3 left-3 bg-charcoal/70 backdrop-blur-sm text-cream text-[10px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full">${item.cat}</span>
      </div>
      <div class="p-6 flex flex-col flex-1">
        <div class="flex items-start justify-between gap-3 mb-2">
          <h3 class="font-serif text-lg leading-snug">${item.name}</h3>
          <span class="font-semibold text-gold-dark shrink-0">${money(item.price)}</span>
        </div>
        <p class="text-sm opacity-65 mb-5 flex-1">${item.desc}</p>
        <button data-id="${item.id}" class="add-cart-btn btn-primary rounded-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i> Ajouter au panier
        </button>
      </div>
    </div>
  `).join('');

  noResults.classList.toggle('hidden', filtered.length !== 0);
  lucide.createIcons();

  document.querySelectorAll('.add-cart-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> addToCart(parseInt(btn.dataset.id)));
  });
}
renderMenu();

/* category tabs */
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    renderMenu();
  });
});

/* search */
document.getElementById('menuSearch').addEventListener('input', (e)=>{
  searchTerm = e.target.value.trim().toLowerCase();
  renderMenu();
});

/* ---------- CART ---------- */
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');

function addToCart(id){
  const product = menuData.find(m=>m.id===id);
  const existing = cart.find(c=>c.id===id);
  if(existing){ existing.qty++; } else { cart.push({...product, qty:1}); }
  renderCart();
  showToast(`${product.name} ajouté au panier`);
  openCart();
}

function changeQty(id, delta){
  const item = cart.find(c=>c.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(c=>c.id!==id);
  renderCart();
}

function renderCart(){
  const totalQty = cart.reduce((s,c)=>s+c.qty,0);
  cartCountEl.textContent = totalQty;
  cartCountEl.classList.toggle('hidden', totalQty===0);
  cartEmptyEl.classList.toggle('hidden', cart.length>0);
  cartItemsEl.classList.toggle('hidden', cart.length===0);

  cartItemsEl.innerHTML = cart.map(item=>`
    <div class="flex gap-4 items-center">
      <img src="${item.img}" class="w-16 h-16 rounded-lg object-cover" alt="${item.name}">
      <div class="flex-1">
        <p class="font-medium text-sm">${item.name}</p>
        <p class="text-xs opacity-60">${money(item.price)}</p>
        <div class="flex items-center gap-3 mt-2">
          <button class="qty-btn w-6 h-6 rounded-full border border-soft flex items-center justify-center" data-id="${item.id}" data-d="-1">−</button>
          <span class="text-sm w-4 text-center">${item.qty}</span>
          <button class="qty-btn w-6 h-6 rounded-full border border-soft flex items-center justify-center" data-id="${item.id}" data-d="1">+</button>
        </div>
      </div>
      <span class="font-semibold text-sm">${money(item.price*item.qty)}</span>
    </div>
  `).join('');

  const total = cart.reduce((s,c)=>s + c.price*c.qty, 0);
  cartTotalEl.textContent = money(total);

  document.querySelectorAll('.qty-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> changeQty(parseInt(btn.dataset.id), parseInt(btn.dataset.d)));
  });
}
renderCart();

function openCart(){ cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); }
function closeCart(){ cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); }
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  if(cart.length===0){ showToast('Votre panier est vide'); return; }
  showToast('Commande confirmée, merci !');
  cart = [];
  renderCart();
  closeCart();
});

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(msg){
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('show'), 2600);
}

/* ---------- DARK MODE ---------- */
const darkToggle = document.getElementById('darkToggle');
const darkIcon = document.getElementById('darkIcon');
let isDark = false;
darkToggle.addEventListener('click', ()=>{
  isDark = !isDark;
  document.documentElement.classList.toggle('dark', isDark);
  darkIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  lucide.createIcons();
});

/* ---------- NAVBAR SCROLL STATE ---------- */
const navbar = document.getElementById('navbar');
const logo = document.getElementById('logo');
const navLinks = document.querySelectorAll('#navLinks a, #darkToggle, #cartBtn, #mobileMenuBtn');
function updateNavbar(){
  if(window.scrollY > 60){
    navbar.classList.add('bg-secondary/95','backdrop-blur-md','shadow-softer');
  } else {
    navbar.classList.remove('bg-secondary/95','backdrop-blur-md','shadow-softer');
  }
}
updateNavbar();
window.addEventListener('scroll', updateNavbar);

/* mobile menu */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));
document.querySelectorAll('.mobile-link').forEach(l=> l.addEventListener('click', ()=> mobileMenu.classList.add('hidden')));

/* ---------- BACK TO TOP ---------- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 500){
    backToTop.classList.remove('opacity-0','pointer-events-none');
  } else {
    backToTop.classList.add('opacity-0','pointer-events-none');
  }
});
backToTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* ---------- RESERVATION FORM ---------- */
document.getElementById('reservationForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  document.getElementById('reservationMsg').classList.remove('hidden');
  showToast('Réservation envoyée avec succès');
  e.target.reset();
});

/* ---------- GSAP SCROLL ANIMATIONS ---------- */
gsap.registerPlugin(ScrollTrigger);

gsap.to('.hero-in', {
  opacity:1, y:0, duration:1, ease:'power3.out', stagger:0.12, delay:0.2
});
gsap.set('.hero-in', { opacity:0, y:30 });
gsap.to('.hero-in', { opacity:1, y:0, duration:1, ease:'power3.out', stagger:0.12, delay:0.2 });

document.querySelectorAll('.reveal').forEach(el=>{
  gsap.to(el, {
    opacity:1, y:0, duration:0.9, ease:'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});