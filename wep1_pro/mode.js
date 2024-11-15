const toggleButton = document.getElementById('theme-toggle-btn');
const body = document.body;

// Function to apply the theme
function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    toggleButton.textContent = "Switch to Light Theme";
  } else {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    toggleButton.textContent = "Switch to Dark Theme";
  }
}

// Event listener for toggle button
toggleButton.addEventListener('click', () => {
  const currentTheme = body.classList.contains('theme-dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  localStorage.setItem('theme', newTheme); // Save theme preference
  applyTheme(newTheme);
});

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
  applyTheme(savedTheme);
});
