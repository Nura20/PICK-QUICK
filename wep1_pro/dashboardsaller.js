document.addEventListener("DOMContentLoaded", () => {
    const dashboardContainer = document.querySelector(".category");
    const categoryTitles = document.querySelectorAll(".category-title");
    const categories = ["Women’s Fashion", "Men’s Fashion", "Kids’ Fashion", "Accessories"];

    // Function to create a product card
    const createProductCard = (product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.description}">
            <p class="name">Name: ${product.name}</p>
            <p>${product.description}</p>
        `;

        return productDiv;
    };

    // Retrieve products from local storage
    const products = JSON.parse(localStorage.getItem("sellerProducts")) || {};

    // Display products by category
    categories.forEach((category, index) => {
        const categoryProducts = products[category] || [];
        const categoryContainer = document.querySelectorAll(".category")[index];

        if (categoryProducts.length > 0) {
            categoryProducts.forEach((product) => {
                const productCard = createProductCard(product);
                categoryContainer.appendChild(productCard);
            });
        } else {
            // If no products, display a placeholder message
            categoryContainer.innerHTML = `<p>No products available in ${category}.</p>`;
        }
    });
});

