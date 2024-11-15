// Function to apply the theme
function applyTheme(theme) {
    const body = document.body;
    const toggleButton = document.getElementById('theme-toggle-btn');
  
    // Apply the theme based on the saved preference
    if (theme === 'dark') {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      if (toggleButton) {
        toggleButton.textContent = "Switch to Light Theme";
      }
    } else {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      if (toggleButton) {
        toggleButton.textContent = "Switch to Dark Theme";
      }
    }
  }
  
  // Event listener for theme toggle button (only on the home page)
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
    applyTheme(savedTheme); // Apply saved theme on page load
  
    const toggleButton = document.getElementById('theme-toggle-btn');
    
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        // Toggle theme and update localStorage
        const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Save the new theme in localStorage
        localStorage.setItem('theme', newTheme);
        
        // Apply the new theme
        applyTheme(newTheme);
      });
    }
  });
