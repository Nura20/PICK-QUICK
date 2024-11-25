document.addEventListener("DOMContentLoaded", () => {
  const moreOffersBtn = document.getElementById("more-offers-btn");
  const hiddenOffers = document.querySelectorAll(".offers-container .hidden");

  moreOffersBtn.addEventListener("click", () => {
    hiddenOffers.forEach((offer) => offer.classList.remove("hidden")); // Reveal hidden offers
    moreOffersBtn.style.display = "none"; // Hide the "More" button
  });
});