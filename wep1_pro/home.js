const currentDate = new Date();
const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
const formattedDate = currentWeekStart.toLocaleDateString();
document.getElementById("current-week-date").innerText = `This week starts on: ${formattedDate}`;
// 2. Show more offers
const moreOffersButton = document.getElementById("more-offers-btn");
const offerContainer = document.getElementById("offer-container");
moreOffersButton.addEventListener("click", () => {
  // Append additional offers when the button is clicked
  const additionalOffers = `
    <div class="offer-item">
      <a href="offer4.html">
        <img src="offer5.AVIF" alt="Offer 4" class="offer-image">
      </a>
      <h3 class="offer-title">New sales for kids clothing in all ages!</h3>
    </div>
    <div class="offer-item">
      <a href="offer5.html">
        <img src="kids1.jpg" alt="Offer 5" class="offer-image">
      </a>
      <h3 class="offer-title">30% sales for the kids clothes limited edition</h3>
    </div>
    <div class="offer-item">
      <a href="offer6.html">
        <img src="acc.jpg" alt="Offer 6" class="offer-image">
      </a>
      <h3 class="offer-title">30% off for the women's limited edition clothes for one week!</h3>
    </div>
  `;
  offerContainer.innerHTML += additionalOffers;
});


