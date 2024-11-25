document.addEventListener("DOMContentLoaded", () => {
    // Define the categories in the dashboard
    const categories = {
        "Women’s Fashion": document.querySelector(".category:nth-of-type(1)"),
        "Men’s Fashion": document.querySelector(".category:nth-of-type(2)"),
        "Kids’ Fashion": document.querySelector(".category:nth-of-type(3)"),
        "Accessories": document.querySelector(".category:nth-of-type(4)")
    };

    // Retrieve products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("sellerProducts")) || [];

    // Helper function to create and append product cards
    const addProductToCategory = (category, product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.alt}">
            <p class="name">Name: ${product.name}</p>
            <p>${product.description}</p>
        `;
        categories[category].appendChild(productDiv);
    };

    // Populate products on the dashboard
    if (storedProducts.length > 0) {
        storedProducts.forEach(product => {
            if (categories[product.category]) {
                addProductToCategory(product.category, product);
            }
        });
    } else {
        // If no products, show a message
        Object.values(categories).forEach(category => {
            const noProductMessage = document.createElement("p");
            noProductMessage.textContent = "No products available in this category.";
            category.appendChild(noProductMessage);
        });
    }
});
