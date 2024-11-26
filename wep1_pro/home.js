// 1. Display the current week's starting date
const currentDate = new Date();
const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));

// Format the date to display as "Month Day" (e.g., "November 27")
const options = { month: 'long', day: 'numeric' };
const formattedDate = currentWeekStart.toLocaleDateString(undefined, options);

// Display the formatted date in the element with ID "current-week-date"
document.getElementById("current-week-date").innerText = formattedDate;

// 2. Show more offers
const moreOffersButton = document.getElementById("more-offers-btn");
const offerContainer = document.getElementById("offers-container");

moreOffersButton.addEventListener("click", () => {
  // HTML content for new offers
  const additionalOffers = `
    <div class="offer-item">
      <a href="Women.html">
        <img src="offer4.jpg" alt="Offer 4" class="offer-image">
      </a>
      <h3 class="offer-title">Up to 30% off on women's clothing this weekend only!</h3>
    </div>
    <div class="offer-item">
      <a href="Kids.html">
        <img src="offer5.AVIF" alt="Offer 5" class="offer-image">
      </a>
      <h3 class="offer-title">30% sales for the kids' clothes limited edition</h3>
    </div>
    <div class="offer-item">
      <a href="Men.html">
        <img src="offer1.jpg" alt="Offer 6" class="offer-image">
      </a>
      <h3 class="offer-title">30% off for the men's clothes for one week!</h3>
    </div>
  `;
  
  // Append new offers to the existing container
  offerContainer.innerHTML += additionalOffers;
  
  // Optional: Hide the "Show More Offers" button after adding more offers
  moreOffersButton.style.display = "none";
});
