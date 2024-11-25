 let offers = [
      { id: 1, name: "Huge discount on the women's clothes 70% for just a week!", description: "Huge discount on the women's clothes for a limited time", image: "offer1.jpg" },
      { id: 2, name: "Buy one and get one free for both women's and men's Clothes", description: "Buy one and get one free offer for women's and men's clothes", image: "offer2.jpg" },
      { id: 3, name: "30% discount just for 2 days for all the category!", description: "Huge discount on all categories for 2 days", image: "offer3.jpg" },
      { id: 4, name: "Buy one and get one free for both women's and men's Clothes", description: "Another great offer for women's and men's clothes", image: "kids1.jpg" }
    ];

    function displayOffers() {
      const offersList = document.getElementById("offersList");
      offersList.innerHTML = ''; // Clear current offers
      offers.forEach(offer => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <div class="offer-item">
            <div class="offer-image">
              <img src="${offer.image}" alt="${offer.name}">
            </div>
            <label class="offer-label" for="offer${offer.id}">${offer.name}</label>
            <input type="checkbox" class="checkbox" id="offer${offer.id}" data-id="${offer.id}">
          </div>
        `;
        offersList.appendChild(listItem);
      });
    }

    function deleteSelectedOffers() {
      const selectedOffers = [];
      const checkboxes = document.querySelectorAll('.checkbox:checked');
      
      if (checkboxes.length === 0) {
        alert("Please select at least one offer");
        return;
      }
      
      checkboxes.forEach(checkbox => {
        const offerId = checkbox.getAttribute('data-id');
        selectedOffers.push(parseInt(offerId));
      });

      const confirmDelete = confirm("Are you sure you want to delete the selected offers?");
      if (confirmDelete) {
        // Filter out the deleted offers
        offers = offers.filter(offer => !selectedOffers.includes(offer.id));
        displayOffers(); // Re-display offers after deletion
      }
    }

    document.getElementById("addOfferForm").addEventListener("submit", function(event) {
      event.preventDefault();
      
      const offerName = document.getElementById("offerName").value;
      const offerDescription = document.getElementById("offerDescription").value;
      const offerPhoto = document.getElementById("offerPhoto").files[0];
      
      // Check if the image is selected
     
      // Check if all required fields are filled
      if (!offerName || !offerDescription) {
        alert("Please fill in all the fields.");
        return;
      }

 if (!offerPhoto) {
        alert("Please upload an image for the offer.");
        return;
      }


      const newOffer = {
        id: offers.length + 1,
        name: offerName,
        description: offerDescription,
        image: offerPhoto.name
      };

      offers.push(newOffer);
      displayOffers();
      document.getElementById("addOfferForm").reset();
    });

    displayOffers();
