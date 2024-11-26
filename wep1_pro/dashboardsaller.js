document.addEventListener("DOMContentLoaded", () => {
    displayProducts();

    const photoInput = document.getElementById("product-photo");
    const imagePreview = document.getElementById("image-preview");

    if (photoInput && imagePreview) {
        photoInput.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Function to display the products
function displayProducts() {
    const WomenID = document.getElementById("womenID");
    const MenID = document.getElementById("menID");
    const KidID = document.getElementById("kidID");
    const AccessoriesID = document.getElementById("AccessoriesID");

    // Check if elements exist
    if (!WomenID || !MenID || !KidID || !AccessoriesID) {
        console.error("One or more product containers not found in the Seller Dashboard.");
        return;
    }

    // Clear previous content
    WomenID.innerHTML = "";
    MenID.innerHTML = "";
    KidID.innerHTML = "";
    AccessoriesID.innerHTML = "";

    // Fetch products from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    console.log(products); // Log the products to verify if they're being fetched correctly

    // Populate categories with products
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        // Create product content
        productDiv.innerHTML = `
            <img src="${product.photo}" alt="${product.name} Image">
            <p class="name">Name: ${product.name}</p>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <p>${product.description}</p>
        `;

        // Append to the respective category
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
