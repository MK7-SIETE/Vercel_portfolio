/**
 * COMMON.JS - Shared JavaScript functionality across all pages
 * Contains: Menu toggle, Theme toggle, and initialization functions
 */

/**
 * Toggle the mobile hamburger menu
 * Opens/closes the drawer navigation menu on mobile devices
 */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const isOpen = menu.classList.contains("open");
  
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  
  // Prevent body scroll when menu is open
  if (!isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

/**
 * Close menu when clicking outside (on backdrop)
 */
document.addEventListener('click', function(event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  
  if (menu && menu.classList.contains("open")) {
    // Check if click is outside menu and hamburger icon
    if (!menu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
      menu.classList.remove("open");
      icon.classList.remove("open");
      document.body.style.overflow = 'auto';
    }
  }
});

/**
 * Toggle between light and dark theme
 * Saves user preference to localStorage for persistence
 */
function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.querySelectorAll('.theme-toggle i, .theme-toggle-mobile i');
  
  // Get current theme and switch to opposite
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Apply new theme
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update theme toggle icon
  themeIcon.forEach(icon => {
    if (newTheme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
}

/**
 * Initialize theme on page load
 * Loads saved theme preference from localStorage
 */
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const html = document.documentElement;
  const themeIcon = document.querySelectorAll('.theme-toggle i, .theme-toggle-mobile i');
  
  // Apply saved theme
  html.setAttribute('data-theme', savedTheme);
  
  // Set correct icon based on saved theme
  themeIcon.forEach(icon => {
    if (savedTheme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
}

/**
 * Run initialization when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  
  // Add scroll effect to navbar
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
});
