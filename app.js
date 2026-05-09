// All 12 Categories
const categories = [
    {name: 'Grocery', icon: 'fa-shopping-basket', color: '#ff6b6b'},
    {name: 'Saree', icon: 'fa-female', color: '#f9ca24'},
    {name: 'Kids Wear', icon: 'fa-child', color: '#4ecdc4'},
    {name: 'Gents Wear', icon: 'fa-user-tie', color: '#45b7d1'},
    {name: 'Suit & Kurti', icon: 'fa-user', color: '#ff9ff3'},
    {name: 'Cosmetics', icon: 'fa-magic', color: '#f8b500'},
    {name: 'Toys', icon: 'fa-gamepad', color: '#54a0ff'},
    {name: 'Plastic Ware', icon: 'fa-cubes', color: '#5f27cd'},
    {name: 'Utensils', icon: 'fa-utensils', color: '#00d2d3'},
    {name: 'Decorative Material', icon: 'fa-gem', color: '#ff6348'},
    {name: 'Jewelleries', icon: 'fa-diamond', color: '#ffd700'},
    {name: 'All Products', icon: 'fa-th-large', color: '#6c757d'}
];

// Demo Products (Admin se add honge)
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [
        // Grocery
        {id:1, name:"Dalda Ghee 1L", price:250, category:"Grocery", weight:"1L", unit:"liter", size:"", stock:50, offer:0, img:"https://images.unsplash.com/photo-1571877226626-b7f49f19d99b?w=300"},
        // Saree
        {id:2, name:"Banarasi Silk Saree", price:2500, category:"Saree", weight:"500gm", unit:"piece", size:"Free Size", stock:12, offer:15, img:"https://images.unsplash.com/photo-1608251947187-cd6b4be7ef48?w=300"},
        // Kids Wear
        {id:3, name:"Kids Cotton T-Shirt", price:299, category:"Kids Wear", weight:"150gm", unit:"piece", size:"2-8 Years", stock:35, offer:20, img:"https://images.unsplash.com/photo-1578906951269-2b8646a3b988?w=300"},
        // Gents Wear
        {id:4, name:"Gents Formal Shirt", price:899, category:"Gents Wear", weight:"250gm", unit:"piece", size:"S-XXL", stock:28, offer:0, img:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300"},
        // Cosmetics
        {id:5, name:"Lakme Lipstick", price:350, category:"Cosmetics", weight:"5gm", unit:"piece", size:"", stock:45, offer:10, img:"https://images.unsplash.com/photo-1625772299848-361b803ffa25?w=300"},
        // Utensils
        {id:6, name:"Steel Kadai 24cm", price:450, category:"Utensils", weight:"1.2kg", unit:"piece", size:"24x12cm", stock:22, offer:5, img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300"},
        // Jewellery
        {id:7, name:"Gold Plated Necklace", price:1800, category:"Jewelleries", weight:"50gm", unit:"piece", size:"", stock:8, offer:25, img:"https://images.unsplash.com/photo-1574129157308-768d68585c1a?w=300"}
    ];
}

// WHATSAPP ORDER - PERFECT
function placeOrder(productId, event) {
    event.preventDefault(); event.stopPropagation();
    const product = getProducts().find(p => p.id === productId);
    const name = prompt('👤 आपका नाम:');
    const phone = prompt('📱 Phone Number:');
    const address = prompt('📍 Address:');
    const qty = prompt('🔢 Quantity:');
    
    if(name && phone && qty && !isNaN(qty)) {
        const total = product.price * qty * (1 - product.offer/100);
        const message = `🛒 *ANJANI SUPER MART - नया ऑर्डर*\n\n`+
                       `👤 Customer: ${name}\n`+
                       `📱 Phone: ${phone}\n`+
                       `📍 Address: ${address}\n\n`+
                       `📦 Product: ${product.name}\n`+
                       `⚖️ ${product.weight} (${product.unit})\n`+
                       `${product.size ? `📏 Size: ${product.size}\n` : ''}`+
                       `💰 MRP: ₹${product.price}\n`+
                       `${product.offer ? `🎉 Offer: ${product.offer}% OFF\n` : ''}`+
                       `🔢 Qty: ${qty}\n`+
                       `💵 Total: ₹${total.toFixed(0)}\n`+
                       `📦 Stock Available: ${product.stock}\n\n`+
                       `*Delivery/Pickup? Call करें!*`;
        
        // 👇 APNA WHATSAPP NUMBER यहाँ डालें (91 + 10 digits)
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
        alert('✅ Order WhatsApp पर भेज दिया गया! 📱');
    }
}

// Load Categories
function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    categories.forEach(cat => {
        grid.innerHTML += `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
                <div class="card category-card h-100 text-center p-4 shadow-lg" onclick="filterProducts('${cat.name}')" 
                     style="border-top: 6px solid ${cat.color} !important;">
                    <div class="icon-wrapper mb-3">
                        <i class="fas ${cat.icon} fs-1" style="color: ${cat.color}; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"></i>
                    </div>
                    <h5 class="fw-bold text-dark mb-0">${cat.name}</h5>
                </div>
            </div>
        `;
    });
}

// Load Products
function loadProducts(prods = getProducts()) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    prods.forEach(product => {
        const discountPrice = product.price * (1 - product.offer / 100);
        grid.innerHTML += `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div class="card product-card h-100 shadow-lg">
                    <img src="${product.img}" class="img-product" alt="${product.name}" 
                         onerror="this.src='https://via.placeholder.com/300x220/e9ecef/666666?text=${product.category[0]}'">
                    <div class="card-body p-3">
                        <h6 class="fw-bold text-truncate">${product.name}</h6>
                        <div class="small text-muted mb-2">
                            <i class="fas fa-weight-hanging me-1"></i>${product.weight} (${product.unit})
                            ${product.size ? `<br><i class="fas fa-ruler-combined me-1"></i>${product.size}` : ''}
                        </div>
                        <div class="price-section mb-3">
                            ${product.offer ? `
                                <div class="d-flex align-items-baseline">
                                    <span class="h5 text-success fw-bold me-2">₹${discountPrice.toFixed(0)}</span>
                                    <span class="text-decoration-line-through text-muted fs-6">₹${product.price}</span>
                                    <span class="badge bg-danger ms-2 fs-6">${product.offer}% OFF</span>
                                </div>
                            ` : `<h5 class="text-success fw-bold mb-0">₹${product.price}</h5>`}
                        </div>
                        <div class="stock-badge mb-3">
                            <span class="badge fs-6 ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}">
                                ${product.stock > 0 ? `✅ ${product.stock} Available` : '❌ Out of Stock'}
                            </span>
                        </div>
                        <button class="btn whatsapp-btn w-100 mb-2 py-3 fs-6 fw-bold shadow-sm" 
                                onclick="placeOrder(${product.id}, event)">
                            <i class="fab fa-whatsapp me-2"></i>WhatsApp Order
                        </button>
                        <button class="btn btn-outline-warning w-100 py-2 fw-bold" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filter & Search
function filterProducts(category) {
    const products = getProducts();
    const filtered = category === 'All Products' ? products : products.filter(p => p.category === category);
    loadProducts(filtered);
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase() || document.getElementById('heroSearch').value.toLowerCase();
    const filtered = getProducts().filter(p => 
        p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
    loadProducts(filtered);
}

function addToCart(id) {
    const product = getProducts().find(p => p.id === id);
    alert(`🛒 "${product.name}" Cart में add हो गया!\n💰 ₹${product.price} (${product.offer}% OFF)`);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadProducts();
    
    // Search on Enter
    document.getElementById('searchInput').addEventListener('keypress', e => e.key === 'Enter' && searchProducts());
    document.getElementById('heroSearch').addEventListener('keypress', e => e.key === 'Enter' && searchProducts());
});
