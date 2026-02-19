/**
 * HOME.JS - JavaScript specific to the home page (index.html)
 * Contains functionality for profile section interactions
 */

/**
 * Initialize home page specific features
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scroll behavior for social icons
  const socialIcons = document.querySelectorAll('#socials-container .icon');
  
  socialIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      // Add a subtle animation on click
      this.style.transform = 'scale(1.3)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
  
  // Add animation to profile section on page load
  const profileSection = document.querySelector('#profile');
  if (profileSection) {
    profileSection.style.opacity = '0';
    profileSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      profileSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      profileSection.style.opacity = '1';
      profileSection.style.transform = 'translateY(0)';
    }, 100);
  }
});
