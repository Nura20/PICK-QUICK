// Ensure the code runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
});

// Function to display products on the Seller Dashboard
function displayProducts() {
    const WomenID = document.getElementById("womenID");
    const MenID = document.getElementById("menID");
    const KidID = document.getElementById("kidID");
    const AccessoriesID = document.getElementById("AccessoriesID");

    // Check if category elements exist
    if (!WomenID || !MenID || !KidID || !AccessoriesID) {
        console.error("One or more product containers not found in the Seller Dashboard.");
        return;
    }

    // Clear previous content in the containers
    WomenID.innerHTML = "";
    MenID.innerHTML = "";
    KidID.innerHTML = "";
    AccessoriesID.innerHTML = "";

    // Fetch products from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Populate categories with products
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.photo}" alt="${product.name} Image" class="product-image">
            <p class="name">Name: ${product.name}</p>
            <p>${product.description}</p>
        `;

        // Append product to the respective category
        if (product.category === "Women") {
            WomenID.appendChild(productDiv);
        } else if (product.category === "Men") {
            MenID.appendChild(productDiv);
        } else if (product.category === "Kids") {
            KidID.appendChild(productDiv);
        } else if (product.category === "Accessories") {
            AccessoriesID.appendChild(productDiv);
        }
    });
}
