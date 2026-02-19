/**
 * ABOUT.JS - JavaScript specific to the about page
 * Contains functionality for about section animations and interactions
 */

/**
 * Initialize about page specific features
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to about section elements
  const aboutSection = document.querySelector('#about');
  const detailsContainers = document.querySelectorAll('.details-container');
  
  if (aboutSection) {
    // Animate section on load
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      aboutSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      aboutSection.style.opacity = '1';
      aboutSection.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Add staggered animation to detail containers
  detailsContainers.forEach((container, index) => {
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 300 + (index * 150));
  });
});
