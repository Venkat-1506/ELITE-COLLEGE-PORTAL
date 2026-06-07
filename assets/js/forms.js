// ============================================
// FORMS - Admission, Contact, Newsletter
// ============================================

// Admission Form Handler
function initAdmissionForm() {
  const form = document.getElementById('admissionForm');
  const statusDiv = document.getElementById('formStatus');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('fullName')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const course = document.getElementById('course')?.value;
    const percentage = document.getElementById('percentage')?.value;
    
    // Basic validation
    if (!name || !email || !phone || !course || !percentage) {
      if (statusDiv) {
        statusDiv.innerHTML = '<span style="color: #e74c3c;">⚠️ Please fill all required fields.</span>';
        setTimeout(() => statusDiv.innerHTML = '', 3000);
      }
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (statusDiv) {
        statusDiv.innerHTML = '<span style="color: #e74c3c;">⚠️ Please enter a valid email address.</span>';
        setTimeout(() => statusDiv.innerHTML = '', 3000);
      }
      return;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      if (statusDiv) {
        statusDiv.innerHTML = '<span style="color: #e74c3c;">⚠️ Please enter a valid 10-digit phone number.</span>';
        setTimeout(() => statusDiv.innerHTML = '', 3000);
      }
      return;
    }
    
    // Simulate form submission
    if (statusDiv) {
      statusDiv.innerHTML = '<span style="color: #27ae60;">✓ Thank you ' + name + '! Our admission team will contact you within 24 hours.</span>';
      statusDiv.style.background = 'rgba(39, 174, 96, 0.1)';
      statusDiv.style.padding = '1rem';
      statusDiv.style.borderRadius = '12px';
    }
    
    form.reset();
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      if (statusDiv) statusDiv.innerHTML = '';
    }, 5000);
  });
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('contactFormStatus');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('input[placeholder="Full Name"]')?.value;
    const email = form.querySelector('input[placeholder="Email"]')?.value;
    const message = form.querySelector('textarea')?.value;
    
    if (!name || !email || !message) {
      if (statusDiv) {
        statusDiv.innerHTML = '<span style="color: #e74c3c;">⚠️ Please fill all fields.</span>';
        setTimeout(() => statusDiv.innerHTML = '', 3000);
      }
      return;
    }
    
    if (statusDiv) {
      statusDiv.innerHTML = '<span style="color: #27ae60;">✓ Message sent successfully! Our team will respond within 24 hours.</span>';
      statusDiv.style.background = 'rgba(39, 174, 96, 0.1)';
      statusDiv.style.padding = '1rem';
      statusDiv.style.borderRadius = '12px';
    }
    
    form.reset();
    
    setTimeout(() => {
      if (statusDiv) statusDiv.innerHTML = '';
    }, 5000);
  });
}

// Faculty Contact Form Handler
function initFacultyContactForm() {
  const form = document.getElementById('facultyContactForm');
  const statusDiv = document.getElementById('facultyFormStatus');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('input[placeholder="Your Full Name"]')?.value;
    const email = form.querySelector('input[placeholder="Your Email Address"]')?.value;
    const department = form.querySelector('select')?.value;
    const message = form.querySelector('textarea')?.value;
    
    if (!name || !email || !department || !message) {
      if (statusDiv) {
        statusDiv.innerHTML = '<span style="color: #e74c3c;">⚠️ Please fill all fields.</span>';
        setTimeout(() => statusDiv.innerHTML = '', 3000);
      }
      return;
    }
    
    if (statusDiv) {
      statusDiv.innerHTML = '<span style="color: #27ae60;">✓ Message sent! Our faculty coordinator will respond within 48 hours.</span>';
      statusDiv.style.background = 'rgba(39, 174, 96, 0.1)';
      statusDiv.style.padding = '1rem';
      statusDiv.style.borderRadius = '12px';
    }
    
    form.reset();
    
    setTimeout(() => {
      if (statusDiv) statusDiv.innerHTML = '';
    }, 5000);
  });
}

// Newsletter Form Handler
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]')?.value;
    
    if (email) {
      notifySuccess('✓ Thank you for subscribing to ELITE newsletter!');
      form.reset();
    } else {
      notifyWarning('⚠️ Please enter a valid email address.');
    }
  });
}

// Initialize all forms
document.addEventListener('DOMContentLoaded', () => {
  initAdmissionForm();
  initContactForm();
  initFacultyContactForm();
  initNewsletterForm();
});