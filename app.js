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

// Load Categories
function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = '';
    categories.forEach(cat => {
        grid.innerHTML += `
            <div class="category-card" style="border-top: 5px solid ${cat.color};" onclick="filterByCategory('${cat.name}')">
                <i class="fas ${cat.icon} text-primary" style="color: ${cat.color};"></i>
                <h4>${cat.name}</h4>
            </div>
        `;
    });
}

// Load Products
function loadProducts(products = getProducts()) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        grid.innerHTML += `
            <div class="product-card" onclick="viewProduct('${product.id}')">
                <div class="product-image">
                    <i class="fas ${product.icon} text-muted" style="font-size: 3rem;"></i>
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="d-flex justify-content-between">
                        <span class="price">₹${product.price}</span>
                        <span class="badge bg-success">${product.category}</span>
                    </div>
                    <div class="mt-2">
                        <small class="text-muted">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</small>
                    </div>
                    <button class="btn btn-warning w-100 mt-2" onclick="addToCart('${product.id}', event)">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
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

// Get Products from Local Storage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Add to Cart
function addToCart(productId, event) {
    event.stopPropagation();
    // Cart logic here
    alert('Added to Cart! 🛒');
}

// Filter by Category
function filterByCategory(category) {
    const products = getProducts().filter(p => p.category === category);
    loadProducts(products);
}

// View Product Details
function viewProduct(id) {
    // Product detail page logic
    alert(`Product ID: ${id}`);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadProducts();
});
