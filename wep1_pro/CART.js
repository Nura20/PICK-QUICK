  
        // Get necessary elements
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartBtn = document.querySelector('.Gempty-cart');
        const checkoutBtn = document.querySelector('.Gcheckout');

        // Function to update the total price for a product
        function updateTotalPrice(row) {
            const priceElement = row.querySelector('td:nth-child(3)');
            const quantityInput = row.querySelector('.quantity-input');
            const totalPriceElement = row.querySelector('.total-price');

            const price = parseFloat(priceElement.textContent.replace('SR', '').trim());
            const quantity = parseInt(quantityInput.value, 10);
            const totalPrice = price * quantity;

            totalPriceElement.textContent = `${totalPrice.toFixed(2)}SR`;
        }

        // Update the total price whenever the quantity changes
        cartItemsContainer.addEventListener('input', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const row = e.target.closest('tr');
                updateTotalPrice(row);
                updateCartSummary(); // Update cart total when quantity changes
            }
        });

        // Delete product
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('Gdelete-btn')) {
                const row = e.target.closest('tr');
                row.remove();
                updateCartSummary(); // Update cart total when item is removed
            }
        });

        // Empty the cart
        emptyCartBtn.addEventListener('click', () => {
            const rows = cartItemsContainer.querySelectorAll('tr');
            rows.forEach(row => row.remove());
            updateCartSummary(); // Update cart total when cart is emptied
        });

        // Function to update the cart summary (total cost)
        function updateCartSummary() {
            const rows = cartItemsContainer.querySelectorAll('tr');
            let totalCost = 0;

            rows.forEach(row => {
                const totalPriceElement = row.querySelector('.total-price');
                const totalPrice = parseFloat(totalPriceElement.textContent.replace('SR', '').trim());
                totalCost += totalPrice;
            });

            if (rows.length === 0) {
                totalCost = 0;
            }

            // Store total cost in localStorage
            localStorage.setItem('totalCost', totalCost.toFixed(2));
        }

        // Handle checkout
        checkoutBtn.addEventListener('click', () => {
            updateCartSummary();  // Ensure the total is updated before checkout
            const totalCost = localStorage.getItem('totalCost');
            alert(`Thank you for your purchase! Total Cost: ${totalCost} SR`);

            // Redirect to the evaluation page
            window.location.href = 'evaluation.html';
        });

        // Initially update the total prices in the cart
        const allRows = cartItemsContainer.querySelectorAll('tr');
        allRows.forEach(row => {
            updateTotalPrice(row);
        });
 
