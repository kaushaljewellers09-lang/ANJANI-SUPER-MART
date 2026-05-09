// Complete Products with Categories, Weight, Rate, Images
const products = [
    {
        id: 1,
        name: "अमूल ताजा दूध",
        category: "dairy",
        price: 62,
        weight: "1 लीटर",
        image: "https://images.unsplash.com/photo-1579147813126-42f769133405?w=400&h=300&fit=crop",
        available: ["1 लीटर", "2 लीटर", "5 लीटर"]
    },
    {
        id: 2,
        name: "मदर डेयरी घी",
        category: "dairy",
        price: 650,
        weight: "1 लीटर",
        image: "https://images.unsplash.com/photo-1606890658317-7d4e69b8b6e9?w=400&h=300&fit=crop",
        available: ["500ml", "1 लीटर"]
    },
    {
        id: 3,
        name: "सतोल बीज",
        category: "grains",
        price: 95,
        weight: "1 किलो",
        image: "https://images.unsplash.com/photo-1542994893-b2a8a3e6e9e3?w=400&h=300&fit=crop",
        available: ["500gm", "1 किलो", "5 किलो"]
    },
    {
        id: 4,
        name: "फोर्ट्यून सोया तेल",
        category: "oil",
        price: 195,
        weight: "1 लीटर",
        image: "https://images.unsplash.com/photo-1601001435828-419e309a2f53?w=400&h=300&fit=crop",
        available: ["1 लीटर", "5 लीटर", "15 लीटर"]
    },
    {
        id: 5,
        name: "मद्रास हल्दी पाउडर",
        category: "spices",
        price: 85,
        weight: "100gm",
        image: "https://images.unsplash.com/photo-1588033561359-6d9e4c5a0de6?w=400&h=300&fit=crop",
        available: ["100gm", "250gm", "500gm"]
    },
    {
        id: 6,
        name: "लायंस चिप्स",
        category: "snacks",
        price: 20,
        weight: "32gm",
        image: "https://images.unsplash.com/photo-1632534846408-89b4f6d5a215?w=400&h=300&fit=crop",
        available: ["32gm", "64gm"]
    },
    {
        id: 7,
        name: "चावल (सोनम)",
        category: "grains",
        price: 65,
        weight: "1 किलो",
        image: "https://images.unsplash.com/photo-1542838132-b44153245b4a?w=400&h=300&fit=crop",
        available: ["1 किलो", "5 किलो", "10 किलो", "25 किलो"]
    },
    {
        id: 8,
        name: "सनफ्लावर तेल",
        category: "oil",
        price: 175,
        weight: "1 लीटर",
        image: "https://images.unsplash.com/photo-1542994893-b2a8a3e6e9e3?w=400&h=300&fit=crop",
        available: ["1 लीटर", "5 लीटर"]
    }
];

let cart = [];
let currentCategory = 'all';

// WhatsApp Number - अपना नंबर यहाँ डालें
const WHATSAPP_NUMBER = "+918467820968"; // अपना WhatsApp नंबर डालें

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    showLocationAlert();
});

// Show Location Alert
function showLocationAlert() {
    setTimeout(() => {
        document.getElementById('locationAlert').style.display = 'block';
    }, 1000);
}

function closeLocationAlert() {
    document.getElementById('locationAlert').style.display = 'none';
}

// Load Products
function loadProducts(filteredCategory = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    let filteredProducts = filteredCategory === 'all' ? products : products.filter(p => p.category === filteredCategory);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3>${product.name}</h3>
                <div class="product-details">
                    <span>${product.weight}</span>
                    <span class="product-price">₹${product.price}</span>
                </div>
                <div class="product-selector">
                    <div class="select-group">
                        <label>वजन चुनें:</label>
                        <select onchange="updateProductPrice(${product.id}, this.value)">
                            ${product.available.map(w => `<option value="${w}" data-price="${getPriceByWeight(product, w)}">${w} - ₹${getPriceByWeight(product, w)}</option>`).join('')}
                        </select>
                    </div>
                    <div class="select-group">
                        <label>मात्रा:</label>
                        <select id="quantity-${product.id}">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> कार्ट में जोड़ें
                </button>
            </div>
        </div>
    `).join('');
}

// Category Filter
function filterCategory(category) {
    currentCategory = category;
    loadProducts(category);
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Scroll to top of products
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function getCategoryName(category) {
    const categories = {
        suit: 'suit',
        saree: 'saree',
        toys: 'khilone',
        utensils: 'bartan',
        grocery: 'kirana'
        kids wear: ' bacho ke kapde 
  };
    return categories[category] || category;
}

// Update Product Price based on Weight
function updateProductPrice(productId, weight) {
    const product = products.find(p => p.id === productId);
    const price = getPriceByWeight(product, weight);
    const select = document.querySelector(`#product-${productId} .product-price`);
    if (select) select.textContent = `₹${price}`;
}

function getPriceByWeight(product, weight) {
    // Simple price calculation based on weight
    const baseWeight = product.weight;
    const basePrice = product.price;
    
    if (weight.includes('500gm') || weight.includes('500ml')) return Math.round(basePrice / 2);
    if (weight.includes('5 किलो') || weight.includes('5 लीटर')) return basePrice * 5;
    if (weight.includes('10 किलो')) return basePrice * 10;
    if (weight.includes('15 लीटर')) return basePrice * 15;
    if (weight.includes('25 किलो')) return basePrice * 25;
    
    return basePrice;
}

// Add to Cart with Weight & Quantity
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const weightSelect = document.querySelector(`select[onchange="updateProductPrice(${productId}, this.value)"]`);
    const quantitySelect = document.querySelector(`#quantity-${productId}`);
    
    const selectedWeight = weightSelect.value;
    const selectedQuantity = parseInt(quantitySelect.value);
    const unitPrice = getPriceByWeight(product, selectedWeight);
    
    const cartItem = {
        id: product.id,
        name: product.name,
        weight: selectedWeight,
        price: unitPrice,
        quantity: selectedQuantity,
        total: unitPrice * selectedQuantity,
        category: product.category
    };
    
    // Check if already in cart
    const existingItem = cart.find(item => item.id === productId && item.weight === selectedWeight);
    if (existingItem) {
        existingItem.quantity += selectedQuantity;
        existingItem.total = existingItem.price * existingItem.quantity;
    } else {
        cart.push(cartItem);
    }
    
    updateCartCount();
    showSuccessMessage(`${product.name} (${selectedWeight}) x${selectedQuantity} कार्ट में जोड़ा गया!`);
}

// Success Message
function showSuccessMessage(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 5000;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(40,167,69,0.4);
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Cart Functions
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function showCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;"><i class="fas fa-shopping-cart" style="font-size: 4rem; margin-bottom: 20px; opacity: 0.5;"></i><p>आपका कार्ट खाली है<br>खरीदारी शुरू करें!</p></div>';
        totalAmount.textContent = '0';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.weight} × ${item.quantity} = ₹${item.total.toLocaleString()}</p>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                    <span style="font-weight: bold; min-width: 25px; text-align: center;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <br><br>
                    <button class="qty-btn" style="background: #dc3545; color: white; border-color: #dc3545; margin-top: 10px;" onclick="removeFromCart(${item.id}, '${item.weight}')">🗑️</button>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + item.total, 0);
        totalAmount.textContent = total.toLocaleString();
    }
    
    document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].total = cart[index].price * cart[index].quantity;
    }
    showCart();
    updateCartCount();
}

function removeFromCart(productId, weight) {
    cart = cart.filter(item => !(item.id === productId && item.weight === weight));
    showCart();
    updateCartCount();
}

// WhatsApp Order
function placeOrder() {
    if (cart.length === 0) {
        alert('कृपया पहले उत्पाद चुनें!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    
    let message = `🛒 *अंजनी सुपर मार्ट ऑर्डर*\n\n`;
    message += `📍 *स्थान:* कुंडा, प्रतापगढ़\n`;
    message += `⏰ *समय:* ${new Date().toLocaleString('hi-IN')}\n\n`;
    message += `📋 *आपका ऑर्डर:*\n`;
    
    cart.forEach(item => {
        message += `• ${item.name} (${item.weight}) x${item.quantity} = ₹${item.total.toLocaleString()}\n`;
    });
    
    message += `\n💰 *कुल राशि:* ₹${total.toLocaleString()}\n`;
    message += `\n📦 फ्री डिलीवरी (20km रेंज में)\n`;
    message += `कृपया जल्द से जल्द डिलीवर करें 🙏`;
    
    const whatsappURL = `https://wa.me/${8467820968}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    
    // Optional: Clear cart after order
    // cart = [];
    // updateCartCount();
    // closeCart();
}

// Event Listeners
document.getElementById('cartBtn').onclick = showCart;
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}