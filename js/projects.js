/**
 * PROJECTS.JS - JavaScript specific to the projects page
 * Contains functionality for project modals, tech stack toggles, and animations
 */

// Project data for modal
const projectData = {
  1: {
    title: "Portfolio Website",
    status: "Completed",
    statusClass: "status-done",
    description: "A modern, responsive portfolio website built from scratch to showcase my skills, projects, and professional experience.",
    features: [
      "Responsive design that works on all devices",
      "Dark/Light theme toggle with localStorage persistence",
      "Smooth scroll animations and transitions",
      "Contact form with Node.js backend and email integration",
      "Optimized performance and fast loading times",
      "SEO-friendly structure and semantic HTML"
    ],
    technologies: "HTML5, CSS3, JavaScript ES6+, Node.js, Express, Nodemailer",
    challenges: "Implementing a professional email system with auto-replies and creating smooth theme transitions without page reloads.",
    github: "#",
    demo: "index.html"
  },
  2: {
    title: "Mobile Banking System",
    status: "In Progress",
    statusClass: "status-progress",
    description: "A command-line banking application developed in C Programming, simulating core banking operations with secure file-based data management.",
    features: [
      "Account creation and management",
      "Balance inquiry and transaction history",
      "Deposit and withdrawal operations",
      "Money transfer between accounts",
      "Secure PIN authentication",
      "Transaction logging and file persistence"
    ],
    technologies: "C Programming, File I/O, Data Structures, Algorithms",
    challenges: "Managing data persistence using file operations and implementing secure authentication without a database.",
    github: "#",
    demo: null
  },
  3: {
    title: "E-commerce Platform",
    status: "In Progress",
    statusClass: "status-progress",
    description: "A full-stack e-commerce solution built with Next.js, featuring product management, shopping cart, and payment integration.",
    features: [
      "Product catalog with search and filtering",
      "Shopping cart with real-time updates",
      "Secure checkout with Stripe integration",
      "User authentication and profiles",
      "Admin dashboard for inventory management",
      "Order tracking and history"
    ],
    technologies: "Next.js, React, Node.js, MongoDB, Stripe API, Tailwind CSS",
    challenges: "Implementing real-time cart updates across sessions and integrating secure payment processing with Stripe.",
    github: "#",
    demo: null
  },
  4: {
    title: "School Management System",
    status: "In Progress",
    statusClass: "status-progress",
    description: "Comprehensive school administration platform for managing students, teachers, courses, and academic operations.",
    features: [
      "Student and teacher profile management",
      "Attendance tracking and reporting",
      "Grade and transcript generation",
      "Course scheduling and management",
      "Parent-teacher communication portal",
      "Analytics dashboard with insights"
    ],
    technologies: "Next.js, React, Node.js, PostgreSQL, REST API, Chart.js",
    challenges: "Designing a scalable database schema to handle complex relationships between students, courses, and grades.",
    github: "#",
    demo: null
  }
};

/**
 * Initialize projects page
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to projects section
  const projectsSection = document.querySelector('#projects');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (projectsSection) {
    projectsSection.style.opacity = '0';
    projectsSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      projectsSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      projectsSection.style.opacity = '1';
      projectsSection.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Add staggered animation to project cards
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 200 + (index * 150));
  });
});

/**
 * Toggle tech stack dropdown
 */
function toggleTechStack(projectId) {
  const dropdown = document.getElementById(`tech-${projectId}`);
  const allDropdowns = document.querySelectorAll('.tech-stack-dropdown');
  
  // Close other dropdowns
  allDropdowns.forEach(d => {
    if (d !== dropdown) {
      d.classList.remove('active');
    }
  });
  
  // Toggle current dropdown
  dropdown.classList.toggle('active');
}

/**
 * Open project details modal
 */
function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const project = projectData[projectId];
  
  if (!project) return;
  
  // Build modal content
  const modalHTML = `
    <h2>${project.title}</h2>
    <span class="modal-status ${project.statusClass}">
      ${project.status === 'Completed' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-spinner"></i>'}
      ${project.status}
    </span>
    
    <div class="modal-section">
      <h3><i class="fas fa-info-circle"></i> Overview</h3>
      <p>${project.description}</p>
    </div>
    
    <div class="modal-section">
      <h3><i class="fas fa-star"></i> Key Features</h3>
      <ul>
        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>
    
    <div class="modal-section">
      <h3><i class="fas fa-code"></i> Technologies Used</h3>
      <p>${project.technologies}</p>
    </div>
    
    <div class="modal-section">
      <h3><i class="fas fa-lightbulb"></i> Technical Challenges</h3>
      <p>${project.challenges}</p>
    </div>
    
    <div class="modal-section" style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="project-btn btn-github" onclick="window.open('${project.github}', '_blank')" style="flex: 1; min-width: 200px;">
        <i class="fab fa-github"></i> View on GitHub
      </button>
      ${project.demo ? `
        <button class="project-btn btn-view" onclick="window.open('${project.demo}', '_blank')" style="flex: 1; min-width: 200px;">
          <i class="fas fa-external-link-alt"></i> View Live Demo
        </button>
      ` : `
        <button class="project-btn btn-coming-soon" disabled style="flex: 1; min-width: 200px;">
          <i class="fas fa-clock"></i> Coming Soon
        </button>
      `}
    </div>
  `;
  
  modalBody.innerHTML = modalHTML;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close project details modal
 */
function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});
