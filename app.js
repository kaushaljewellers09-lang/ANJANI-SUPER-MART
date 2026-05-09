// Categories List
const categories = [
    {name: 'Grocery', icon: 'fa-shopping-basket', color: '#ff6b6b'},
    {name: 'Kids Wear', icon: 'fa-tshirt', color: '#4ecdc4'},
    {name: 'Gents Wear', icon: 'fa-user-tie', color: '#45b7d1'},
    {name: 'Suit & Kurti', icon: 'fa-female', color: '#f9ca24'},
    {name: 'Cosmetics', icon: 'fa-magic', color: '#ff9ff3'},
    {name: 'Toys', icon: 'fa-gamepad', color: '#54a0ff'},
    {name: 'Plastic Ware', icon: 'fa-cubes', color: '#5f27cd'},
    {name: 'Utensils', icon: 'fa-utensils', color: '#00d2d3'},
    {name: 'Decorative', icon: 'fa-gem', color: '#ff6348'},
    {name: 'Jewellery', icon: 'fa-gem', color: '#ffd700'}
];

// 🔥 WHATSAPP ORDER FUNCTION (APNA NUMBER DAALO 👇)
function placeOrder(productId) {
    const product = getProducts().find(p => p.id === productId);
    const name = prompt('👤 आपका नाम:');
    const phone = prompt('📱 Phone Number:');
    const qty = prompt('🔢 Quantity:');
    
    if(name && phone && qty) {
        const message = `🛒 *ANJANI SUPER MART - नया ऑर्डर*\n\n` +
                       `👤 Name: ${name}\n` +
                       `📱 Phone: ${phone}\n` +
                       `📦 Product: ${product.name}\n` +
                       `💰 Price: ₹${product.price}\n` +
                       `🔢 Qty: ${qty}\n` +
                       `💵 Total: ₹${product.price * qty}\n\n` +
                       `*Order Confirmed! हम 30 मिनट में कॉल करेंगे। 📞*`;
        
        // 👇 APNA WHATSAPP NUMBER DAALO (10 digits - 91 ke saath)
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
        alert('✅ Order WhatsApp पर भेज दिया गया!');
    }
}

// 🖼️ IMAGE FUNCTION
function getProductImage(product) {
    return product.image || '';
}

// Load Categories
function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = '';
    categories.forEach(cat => {
        grid.innerHTML += `
            <div class="category-card" style="border-top: 5px solid ${cat.color};" onclick="filterByCategory('${cat.name}')">
                <i class="fas ${cat.icon}" style="color: ${cat.color}; font-size: 3rem;"></i>
                <h4>${cat.name}</h4>
            </div>
        `;
    });
}

// Get Products from Local Storage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [
        {id: "1", name: "Dalda Vanaspati Ghee", price: 250, category: "Grocery", icon: "fa-oil-can", stock: 50},
        {id: "2", name: "Kids T-Shirt Pack of 3", price: 499, category: "Kids Wear", icon: "fa-tshirt", stock: 25},
        {id: "3", name: "Gents Formal Shirt", price: 899, category: "Gents Wear", icon: "fa-user-tie", stock: 30},
        {id: "4", name: "Designer Kurti", price: 1299, category: "Suit & Kurti", icon: "fa-female", stock: 15},
        {id: "5", name: "Lakme Lipstick", price: 350, category: "Cosmetics", icon: "fa-magic", stock: 40},
        {id: "6", name: "Gold Necklace", price: 2500, category: "Jewellery", icon: "fa-gem", stock: 10}
    ];
}

// Load Products (WHATSAPP BUTTON WAALA)
function loadProducts(products = getProducts()) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                    <i class="fas ${product.icon} text-muted" style="font-size: 4rem;"></i>
                </div>
                <div class="product-info p-3">
                    <h5 class="product-name fw-bold mb-2">${product.name}</h5>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="price h4 text-success fw-bold">₹${product.price}</span>
                        <span class="badge bg-primary fs-6">${product.category}</span>
                    </div>
                    <div class="stock-status mb-3">
                        <span class="badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}">
                            ${product.stock > 0 ? '✅ In Stock' : '❌ Out of Stock'}
                        </span>
                    </div>
                    
                    <!-- 🔥 WHATSAPP ORDER BUTTON -->
                    <button class="btn btn-success w-100 mb-2 fs-6 fw-bold" 
                            onclick="placeOrder('${product.id}', event)" 
                            style="background: #25D366 !important; border: none !important; height: 45px;">
                        <i class="fab fa-whatsapp me-2"></i>Order WhatsApp पर
                    </button>
                    
                    <button class="btn btn-warning w-100 fs-6" onclick="addToCart('${product.id}', event)">
                        <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

// Search Products
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const products = getProducts().filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    loadProducts(products);
}

// Add to Cart
function addToCart(productId, event) {
    event.stopPropagation();
    alert('🛒 Cart Coming Soon!');
}

// Filter by Category
function filterByCategory(category) {
    const products = getProducts().filter(p => p.category === category);
    loadProducts(products);
}

// View Product
function viewProduct(id) {
    alert(`Product ID: ${id}`);
}

// Search on Enter
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadProducts();
    
    // Search Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            searchProducts();
        }
    });
});
