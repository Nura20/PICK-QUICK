document.addEventListener('DOMContentLoaded', function () {
  // Select all review items
  const reviews = document.querySelectorAll('.review');

  // Loop through each review
  reviews.forEach(review => {
    // When mouse enters the review
    review.addEventListener('mouseover', () => {
      const details = review.querySelector('.review-details');
      if (details) {
        details.style.display = 'block'; // Show the additional details
      }
    });

    // When mouse leaves the review
    review.addEventListener('mouseout', () => {
      const details = review.querySelector('.review-details');
      if (details) {
        details.style.display = 'none'; // Hide the additional details
      }
    });
  });
});
