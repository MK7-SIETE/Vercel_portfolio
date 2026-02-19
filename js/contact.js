/**
 * CONTACT.JS - Contact form handler
 * Submits to /api/contact (Vercel Serverless Function)
 * which sends notification + auto-reply via EmailJS
 */

document.addEventListener('DOMContentLoaded', function () {

  // ── Fade-in animations ────────────────────────────────────────────────
  const contactSection = document.querySelector('#contact');
  if (contactSection) {
    contactSection.style.opacity   = '0';
    contactSection.style.transform = 'translateY(20px)';
    setTimeout(() => {
      contactSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      contactSection.style.opacity    = '1';
      contactSection.style.transform  = 'translateY(0)';
    }, 100);
  }

  const formContainer = document.querySelector('.contact-form-container');
  if (formContainer) {
    formContainer.style.opacity   = '0';
    formContainer.style.transform = 'scale(0.95)';
    setTimeout(() => {
      formContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      formContainer.style.opacity    = '1';
      formContainer.style.transform  = 'scale(1)';
    }, 400);
  }

  // ── Form submission ───────────────────────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const submitBtn    = this.querySelector('.submit-btn') || this.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled  = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        submitBtn.innerHTML        = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        showToast('Message sent! Check your inbox for a confirmation email.', 'success');

        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML        = originalHTML;
          submitBtn.style.background = '';
          submitBtn.disabled         = false;
        }, 3000);
      } else {
        showToast(data.error || 'Something went wrong. Please try again.', 'error');
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled  = false;
      }

    } catch (err) {
      showToast('Could not reach the server. Please check your connection.', 'error');
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled  = false;
    }
  });

  // ── Real-time field validation ────────────────────────────────────────
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function () {
      if (this.value.trim() === '' && this.hasAttribute('required')) {
        this.style.borderColor = '#e74c3c';
      } else {
        this.style.borderColor = '';
      }
    });
    input.addEventListener('focus', function () {
      this.style.borderColor = '';
    });
  });
});

// ── Toast notification helper ─────────────────────────────────────────────
function showToast(message, type) {
  const existing = document.querySelector('.form-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'form-toast';
  toast.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + message;

  const isSuccess = type === 'success';
  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '2rem',
    right:        '2rem',
    background:   isSuccess ? 'linear-gradient(135deg,#27ae60,#2ecc71)' : 'linear-gradient(135deg,#e74c3c,#c0392b)',
    color:        '#fff',
    padding:      '1rem 1.5rem',
    borderRadius: '0.8rem',
    fontSize:     '0.95rem',
    fontWeight:   '600',
    boxShadow:    '0 4px 20px rgba(0,0,0,0.2)',
    zIndex:       '9999',
    display:      'flex',
    alignItems:   'center',
    gap:          '0.6rem',
    maxWidth:     'calc(100vw - 4rem)',
  });

  if (!document.getElementById('toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = '@keyframes slideInToast{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}
