function addProduct() {
    const products = getProducts();
    const newProduct = {
        id: Date.now().toString(),
        name: document.getElementById('productName').value,
        price: parseInt(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        stock: parseInt(document.getElementById('productStock').value),
        icon: 'fa-box'
    };
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    loadAdminProducts();
    alert('Product Added Successfully! ✅');
}

function loadAdminProducts() {
    const container = document.getElementById('adminProductsList');
    const products = getProducts();
    container.innerHTML = '';
    
    products.forEach(product => {
        container.innerHTML += `
            <div class="admin-product">
                <h4>${product.name}</h4>
                <p>₹${product.price} | ${product.category} | Stock: ${product.stock}</p>
                <button onclick="deleteProduct('${product.id}')">Delete</button>
            </div>
        `;
    });
}

function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    loadAdminProducts();
}
