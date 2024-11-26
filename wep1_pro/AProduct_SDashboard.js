document.addEventListener("DOMContentLoaded", () => {
    // Function to display products on the Seller Dashboard
    function displayProducts() {
        const categories = document.querySelectorAll(".category");

        // Retrieve products from local storage
        const products = JSON.parse(localStorage.getItem("sellerProducts")) || [];

        // Check if there are products to display
        if (products.length > 0) {
            products.forEach(product => {
                const categoryDiv = [...categories].find(category => category.parentNode.querySelector(".category-title").innerText.includes(product.category));

                if (categoryDiv) {
                    // Create product element
                    const productDiv = document.createElement("div");
                    productDiv.className = "product";
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name} Image">
                        <p class="name">Name: ${product.name}</p>
                        <p>${product.description}</p>
                    `;
                    categoryDiv.appendChild(productDiv);
                }
            });
        } else {
            alert("No products to display. Please add products from the 'Add New Product' page.");
        }
    }

    // Function to handle adding new products
    function handleAddProductForm() {
        const form = document.querySelector("#addProductForm");
        if (!form) return; // If the form doesn't exist, skip this section (for the Seller Dashboard)

        const productNameInput = document.querySelector("#productName");
        const productCategoryInput = document.querySelector("#productCategory");
        const productDescriptionInput = document.querySelector("#productDescription");
        const productImageInput = document.querySelector("#productImage");

        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent form submission

            const name = productNameInput.value.trim();
            const category = productCategoryInput.value.trim();
            const description = productDescriptionInput.value.trim();
            const image = productImageInput.value.trim();

            // Validate inputs
            if (!name || !category || !description || !image) {
                alert("All fields are required!");
                return;
            }

            if (/^\d/.test(name)) {
                alert("Product name can't start with numbers!");
                return;
            }

            if (!image.match(/\.(jpg|jpeg|png|gif)$/i)) {
                alert("Please provide a valid image URL!");
                return;
            }

            // Retrieve existing products from local storage
            let products = JSON.parse(localStorage.getItem("sellerProducts")) || [];

            // Add new product to the array
            const newProduct = {
                name,
                category,
                description,
                image
            };
            products.push(newProduct);

            // Save updated products to local storage
            localStorage.setItem("sellerProducts", JSON.stringify(products));

            // Show success message
            alert(`Product "${name}" has been added successfully!`);

            // Clear the form
            form.reset();
        });
    }

    // Determine which page the script is running on
    if (document.querySelector(".dashboard")) {
        // If on the Seller Dashboard
        displayProducts();
    } else if (document.querySelector("#addProductForm")) {
        // If on the Add a New Product page
        handleAddProductForm();
    }
});
