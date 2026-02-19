/**
 * EXPERIENCE.JS - Masonry Layout Functionality
 * Contains functionality for collapsible masonry categories and modal popups
 */

// Skill descriptions for modal
const skillDetails = {
  word: {
    icon: '<i class="fas fa-file-word"></i>',
    title: 'Microsoft Word',
    description: 'Created professional documents including business proposals, technical reports, and formatted documentation. Developed custom templates with styles, table of contents, and mail merge functionality. Built comprehensive user manuals and training materials with advanced formatting, images, and cross-references.'
  },
  excel: {
    icon: '<i class="fas fa-file-excel"></i>',
    title: 'Microsoft Excel',
    description: 'Built complex financial models and budgeting spreadsheets with advanced formulas (VLOOKUP, INDEX-MATCH, array formulas). Created interactive dashboards with pivot tables, charts, and conditional formatting. Automated repetitive tasks using macros and developed data validation systems for accurate data entry.'
  },
  powerpoint: {
    icon: '<i class="fas fa-file-powerpoint"></i>',
    title: 'Microsoft PowerPoint',
    description: 'Designed engaging presentations for client pitches, training sessions, and conferences. Created custom slide templates with brand guidelines and animations. Built interactive presentations with hyperlinks, embedded videos, and transition effects that effectively communicate complex ideas.'
  },
  html: {
    icon: '<i class="fab fa-html5"></i>',
    title: 'HTML',
    description: 'Developed semantic, accessible websites using HTML5 best practices. Built responsive layouts with proper document structure, meta tags for SEO, and ARIA labels for accessibility. Created portfolio sites, landing pages, and multi-page web applications with clean, maintainable markup.'
  },
  css: {
    icon: '<i class="fab fa-css3-alt"></i>',
    title: 'CSS',
    description: 'Designed beautiful, responsive interfaces using CSS3, Flexbox, and Grid layouts. Implemented smooth animations, transitions, and custom styling systems. Created mobile-first responsive designs that work seamlessly across all devices. Built reusable component libraries with modern CSS techniques.'
  },
  javascript: {
    icon: '<i class="fab fa-js"></i>',
    title: 'JavaScript',
    description: 'Built interactive web applications with vanilla JavaScript and modern ES6+ features. Implemented dynamic DOM manipulation, event handling, and asynchronous programming with Promises and async/await. Created form validations, interactive UI components, and API integrations for real-time data.'
  },
  php: {
    icon: '<i class="fab fa-php"></i>',
    title: 'PHP',
    description: 'Developed server-side web applications with PHP using OOP principles and MVC architecture. Built content management systems, user authentication systems, and RESTful APIs. Created database-driven websites with secure form processing, session management, and data validation.'
  },
  nextjs: {
    icon: '<i class="fas fa-react"></i>',
    title: 'Next.js',
    description: 'Built modern web applications using Next.js with server-side rendering (SSR) and static site generation (SSG). Developed fast, SEO-optimized websites with dynamic routing, API routes, and optimized image handling. Created full-stack applications leveraging React components and Next.js features.'
  },
  mysql: {
    icon: '<i class="fas fa-database"></i>',
    title: 'MySQL',
    description: 'Designed and implemented normalized database schemas for web applications. Wrote complex SQL queries with joins, subqueries, and aggregations for data retrieval and reporting. Optimized database performance with indexes, query optimization, and proper table relationships.'
  },
  'data-excel': {
    icon: '<i class="fas fa-chart-line"></i>',
    title: 'Data Analysis (Excel)',
    description: 'Performed statistical analysis and data visualization using Excel\'s advanced features. Created comprehensive reports with pivot tables, charts, and conditional formatting. Analyzed business metrics, sales data, and KPIs to provide actionable insights. Built automated reporting systems with formulas and data connections.'
  },
  'data-mysql': {
    icon: '<i class="fas fa-chart-bar"></i>',
    title: 'Data Analysis (MySQL)',
    description: 'Conducted data mining and analysis using complex MySQL queries. Generated business intelligence reports with aggregations, grouping, and statistical functions. Built data warehouses and created ETL processes for data integration. Analyzed large datasets to identify trends and support decision-making.'
  },
  c: {
    icon: '<i class="fas fa-code"></i>',
    title: 'C Programming',
    description: 'Developed efficient algorithms and data structures in C for performance-critical applications. Built system-level programs with memory management, pointers, and file I/O operations. Created command-line utilities, implemented sorting and searching algorithms, and solved computational problems with optimized C code.'
  }
};

/**
 * Toggle category masonry section
 */
function toggleCategoryMasonry(headerElement) {
  const wrapper = headerElement.nextElementSibling;
  
  // Toggle current category
  headerElement.classList.toggle('active');
  wrapper.classList.toggle('expanded');
}

/**
 * Open skill detail modal
 */
function openSkillModal(skillId) {
  const modal = document.getElementById('skillModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  
  const skill = skillDetails[skillId];
  
  if (skill) {
    modalIcon.innerHTML = skill.icon;
    modalTitle.textContent = skill.title;
    modalDescription.textContent = skill.description;
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close skill detail modal
 */
function closeSkillModal() {
  const modal = document.getElementById('skillModal');
  modal.style.display = 'none';
  
  // Restore body scroll
  document.body.style.overflow = 'auto';
}

/**
 * Close modal when clicking outside of it
 */
window.onclick = function(event) {
  const modal = document.getElementById('skillModal');
  if (event.target === modal) {
    closeSkillModal();
  }
}

/**
 * Close modal with Escape key
 */
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeSkillModal();
  }
});

/**
 * Initialize experience page specific features
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to experience section
  const experienceSection = document.querySelector('#experience');
  const skillCategories = document.querySelectorAll('.skill-category');
  
  if (experienceSection) {
    experienceSection.style.opacity = '0';
    experienceSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      experienceSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      experienceSection.style.opacity = '1';
      experienceSection.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Animate categories
  skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      category.style.opacity = '1';
      category.style.transform = 'translateY(0)';
    }, 200 + (index * 100));
  });
});
