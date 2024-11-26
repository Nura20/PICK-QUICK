document.addEventListener("DOMContentLoaded", () => {
    displayProducts();

    const form = document.getElementById("product-form");
    if (form) {
        form.addEventListener("submit", addProduct);
    }

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

        productDiv.innerHTML = `
            <img src="${product.photo}" alt="${product.name} Image">
            <p class="name">Name: ${product.name}</p>
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

function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById("product-name").value.trim();
    const price = document.getElementById("product-price").value.trim();
    const category = document.getElementById("product-category").value.trim();
    const quantity = document.getElementById("product-quantity").value.trim();
    const photo = document.getElementById("product-photo").files[0];
    const description = document.getElementById("description").value.trim();

    // Validation
    if (!name || !price || !category || !quantity || !photo || !description) {
        alert("All fields must be filled out.");
        return;
    }

    if (/^\d/.test(name)) {
        alert("The product name cannot start with a number.");
        return;
    }

    if (isNaN(parseFloat(price)) || isNaN(parseInt(quantity))) {
        alert("Price and quantity must be numbers.");
        return;
    }

    // Create the reader to get the product image
    const reader = new FileReader();
    reader.onload = function(event) {
        const product = {
            name: name,
            price: price,
            category: category,
            quantity: quantity,
            photo: event.target.result,  // Base64 image data
            description: description
        };

        // Get the current products from localStorage
        const products = JSON.parse(localStorage.getItem("products")) || [];

        // Log the current products to verify that we're getting them correctly
        console.log(products);

        // Push the new product into the array
        products.push(product);

        // Save the updated products back to localStorage
        localStorage.setItem("products", JSON.stringify(products));

        // Log the updated products to ensure the new one was added
        console.log(JSON.parse(localStorage.getItem("products")));

        // Notify the user that the product has been added successfully
        alert(`The product ${name} has been added successfully.`);

        // Reset the form
        document.querySelector("form").reset();
        const imagePreview = document.getElementById("image-preview");
        if (imagePreview) {
            imagePreview.style.display = "none";
        }

        // Clear the file input value
        const photoInput = document.getElementById("product-photo");
        if (photoInput) {
            photoInput.value = "";
        }

        // Display the products again
        displayProducts();
    };

    reader.readAsDataURL(photo);  // Read the photo as base64 data
}
