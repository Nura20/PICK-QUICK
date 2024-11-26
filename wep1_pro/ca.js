// Function to sort products on the Category page
function sortProducts() {
    const sortOption = document.getElementById("sort-options").value;
    const productGrid = document.querySelector(".product-grid");
    const products = Array.from(productGrid.getElementsByClassName("product"));

    products.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        const nameA = a.dataset.name.toLowerCase();
        const nameB = b.dataset.name.toLowerCase();

        if (sortOption === "high-to-low") return priceB - priceA;
        if (sortOption === "low-to-high") return priceA - priceB;
        if (sortOption === "a-to-z") return nameA.localeCompare(nameB);
        if (sortOption === "z-to-a") return nameB.localeCompare(nameA);
        return 0;
    });

    products.forEach(product => productGrid.appendChild(product)); // Reorder DOM elements
}

// Increment quantity on the Category page
function incrementQuantity(button) {
    var quantitySpan = button.parentElement.querySelector(".quantity");
    var currentQuantity = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = currentQuantity + 1;
}

// Decrement the quantity of the product
function decrementQuantity(button) {
    var quantitySpan = button.parentElement.querySelector(".quantity");
    var currentQuantity = parseInt(quantitySpan.textContent);
    if (currentQuantity > 1) {
        quantitySpan.textContent = currentQuantity - 1;
    }
}

// Add product to cart
function addToCart(button) {
    var productDiv = button.closest(".product");
    var productId = productDiv.getAttribute("data-id");
    var productName = productDiv.getAttribute("data-name");
    var productPrice = parseFloat(productDiv.getAttribute("data-price"));
    var quantity = parseInt(productDiv.querySelector(".quantity").textContent);
    var productImage = productDiv.querySelector("img").getAttribute("src");

    var totalPrice = productPrice * quantity;

    var product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: quantity,
        totalPrice: totalPrice,
        image: productImage
    };

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
        cart[existingProductIndex].totalPrice = cart[existingProductIndex].price * cart[existingProductIndex].quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("This item has been added to your cart!");
}

// Update cart when quantity changes on the Category page
function updateCart(productName, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.name === productName);

    if (productInCart) {
        productInCart.quantity = newQuantity;
        productInCart.totalPrice = productInCart.price * newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Sync Category page quantities with cart
function syncCategoryWithCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productsOnPage = document.querySelectorAll('.product');

    productsOnPage.forEach(product => {
        const productName = product.dataset.name;
        const cartItem = cart.find(item => item.name === productName);

        if (cartItem) {
            const quantityElement = product.querySelector('.quantity');
            quantityElement.value = cartItem.quantity; // Update displayed quantity
        }
    });
}

// Display cart items on the Cart page
function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartHTML = '';

    cart.forEach(item => {
        const totalPrice = (item.price * item.quantity).toFixed(2);
        cartHTML += `
            <div class="product" data-name="${item.name}">
                <div class="product-info">
                    <div class="cart-product-details">
                        <img src="${item.image}" alt="${item.name}" class="cart-product-image">
                        <div class="product-description">
                            <h3>${item.name}</h3>
                            <div class="price-quantity">
                                <span class="price">$${totalPrice}</span>
                                <label for="quantity">Quantity</label>
                                <input type="number" class="quantity" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(this)">
                            </div>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="removeFromCart('${item.name}')">Delete</button>
                </div>
            </div>`;
    });

    if (cart.length === 0) {
        cartHTML = '<p>Your cart is empty.</p>';
    }

    cartContainer.innerHTML = cartHTML;
    updateCartTotal();
}

// Update cart item quantity on the Cart page
function updateCartItemQuantity(inputElement) {
    const productElement = inputElement.closest('.product');
    const productName = productElement.dataset.name;
    const newQuantity = parseInt(inputElement.value);

    updateCart(productName, newQuantity);
    displayCart();
    syncCategoryWithCart();
}

// Remove product from cart
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

// Empty the cart
document.getElementById("empty-cart").addEventListener("click", () => {
    if (confirm("Are you sure you want to empty your cart?")) {
        localStorage.setItem('cart', JSON.stringify([]));
        displayCart();
    }
});

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Show a message confirming the purchase
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);

    // Empty the cart after purchase
    localStorage.setItem('cart', JSON.stringify([]));
    displayCart();

    // Redirect to the evaluation page
    window.location.href = "evaluation.html"; // Replace with the actual evaluation page URL
});


// Ensure the cart is displayed on the Cart page
if (window.location.pathname.includes("CARTpage.html")) {
    displayCart();
}

// Store cart in localStorage when My Cart button is clicked
document.getElementById("my-cart-btn").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart)); // Ensure cart is saved before redirection
        window.location.href = "CARTpage.html"; // Redirect to Cart page
    }
});

// Initialize the pages on load
window.onload = () => {
    syncCategoryWithCart(); // Sync Category page quantities
    if (window.location.pathname.includes("CARTpage.html")) {
        displayCart(); // Display Cart page items
    }
};