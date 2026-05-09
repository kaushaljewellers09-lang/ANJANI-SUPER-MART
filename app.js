// Products Data
const products = [
    {id:1, name:"Dalda Vanaspati Ghee", price:250, category:"Grocery", icon:"fa-oil-can", stock:50},
    {id:2, name:"Kids T-Shirt Pack", price:499, category:"Kids Wear", icon:"fa-tshirt", stock:25},
    {id:3, name:"Gents Formal Shirt", price:899, category:"Gents Wear", icon:"fa-user-tie", stock:30},
    {id:4, name:"Designer Kurti", price:1299, category:"Suit & Kurti", icon:"fa-female", stock:15},
    {id:5, name:"Lakme Lipstick", price:350, category:"Cosmetics", icon:"fa-magic", stock:40},
    {id:6, name:"Gold Necklace", price:2500, category:"Jewellery", icon:"fa-gem", stock:10}
];

// Categories
const categories = ["Grocery","Kids Wear","Gents Wear","Suit & Kurti","Cosmetics","Jewellery"];

// 🔥 WHATSAPP ORDER (APNA NUMBER DAALO 👇 919876543210)
function placeOrder(productId) {
    const product = products.find(p => p.id == productId);
    const name = prompt('👤 आपका नाम:');
    const phone = prompt('📱 Phone Number:');
    const qty = prompt('🔢 Quantity:');
    
    if(name && phone && qty) {
        const message = `🛒 *ANJANI SUPER MART ऑर्डर*\n\n👤 ${name}\n📱 ${phone}\n📦 ${product.name}\n💰 ₹${product.price}\n🔢 ${qty}\n💵 Total: ₹${product.price*qty}`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    }
}

// Load Categories
function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    categories.forEach(cat => {
        grid.innerHTML += `
            <div class="col-md-2 col-sm-4 col-6 mb-3">
                <div class="category-card h-100 text-center p-3" onclick="filterProducts('${cat}')">
                    <i class="fas fa-${cat === 'Grocery' ? 'shopping-basket' : 
                                  cat === 'Kids Wear' ? 'tshirt' : 
                                  cat === 'Gents Wear' ? 'user-tie' : 
                                  cat === 'Suit & Kurti' ? 'female' : 
                                  cat === 'Cosmetics' ? 'magic' : 'gem'} fs-1 mb-3 text-primary"></i>
                    <h5>${cat}</h5>
                </div>
            </div>
        `;
    });
}

// Load Products
function loadProducts(prods = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    prods.forEach(product => {
        grid.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card product-card h-100">
                    <div class="card-body text-center p-4">
                        <i class="fas fa-${product.icon} text-muted mb-3" style="font-size: 4rem;"></i>
                        <h5 class="card-title">${product.name}</h5>
                        <h4 class="text-success fw-bold">₹${product.price}</h4>
                        <span class="badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'} mb-3">
                            ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <br>
                        <button class="btn btn-success whatsapp-btn w-100 mb-2 fs-6 fw-bold" 
                                onclick="placeOrder(${product.id})">
                            <i class="fab fa-whatsapp me-2"></i>WhatsApp Order
                        </button>
                        <button class="btn btn-warning w-100" onclick="addToCart(${product.id})">
                            🛒 Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filter Products
function filterProducts(category) {
    const filtered = category === 'All' ? products : products.filter(p => p.category === category);
    loadProducts(filtered);
}

// Search
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
    loadProducts(filtered);
}

// Cart
function addToCart(id) {
    alert('🛒 Added to Cart!');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadProducts();
});
