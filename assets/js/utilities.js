// ============================================
// UTILITIES - Centralized Helper Functions
// Version 2.0 - All utility functions consolidated
// ============================================

// Debounce function for search inputs
function debounce(func, delay) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get current year for footer
function setCurrentYear() {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

// Smooth scroll to element
function smoothScrollTo(elementId, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

// Toggle body scroll (for mobile menu/modals)
function toggleBodyScroll(disable) {
  if (disable) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Notification helper - FIXED to ensure container exists
function createNotificationContainer() {
  let container = document.getElementById('notificationContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notificationContainer';
    container.className = 'notification-container';
    document.body.appendChild(container);
  }
  return container;
}

function showNotification(message, type = 'info', duration = 6000) {
  const container = createNotificationContainer();
  const toast = document.createElement('div');
  toast.className = `notification-toast notification-${type}`;
  
  // Format the message - preserve line breaks
  let formattedMessage = String(message);
  // Replace newlines with <br> tags
  formattedMessage = formattedMessage.replace(/\n/g, '<br>');
  // Make email and phone numbers clickable
  formattedMessage = formattedMessage.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" style="color: inherit; text-decoration: underline;">$1</a>');
  formattedMessage = formattedMessage.replace(/(\+91[0-9]{10}|[0-9]{10})/g, '<a href="tel:$1" style="color: inherit; text-decoration: underline;">$1</a>');
  
  toast.innerHTML = `
    <div class="notification-content">${formattedMessage}</div>
    <button type="button" class="notification-close" aria-label="Close notification">&times;</button>
  `;

  const closeButton = toast.querySelector('.notification-close');
  let closeTimeout;
  
  const closeToast = () => {
    toast.classList.remove('show');
    clearTimeout(closeTimeout);
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  };

  closeButton?.addEventListener('click', closeToast);
  container.appendChild(toast);

  // Force reflow to enable animation
  toast.offsetHeight;
  toast.classList.add('show');

  closeTimeout = setTimeout(() => {
    if (toast.parentElement) closeToast();
  }, duration);

  return toast;
}

function notifySuccess(message, duration = 4500) {
  return showNotification(message, 'success', duration);
}

function notifyWarning(message, duration = 4500) {
  return showNotification(message, 'warning', duration);
}

function notifyInfo(message, duration = 4500) {
  return showNotification(message, 'info', duration);
}

// Detect if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ============================================
// SCHEDULE CAMPUS VISIT MODAL FUNCTIONS
// ============================================

// Open schedule modal
function openScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  if (!modal) {
    console.error('Schedule modal not found');
    notifyInfo('📅 Please contact our admission office at +91 90470 40413 to schedule a campus visit.');
    return;
  }
  
  modal.classList.add('open');
  toggleBodyScroll(true);
  
  // Set min date for date picker
  const dateInput = document.getElementById('visitDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    dateInput.max = maxDate.toISOString().split('T')[0];
  }
}

// Close schedule modal
function closeScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  if (modal) {
    modal.classList.remove('open');
    toggleBodyScroll(false);
  }
}

// Select visit type (physical/virtual)
function selectVisitType(type) {
  const physicalOption = document.querySelector('.visit-option:first-child');
  const virtualOption = document.querySelector('.visit-option:last-child');
  const visitTypeInput = document.getElementById('visitType');
  
  if (type === 'physical') {
    if (physicalOption) physicalOption.classList.add('active');
    if (virtualOption) virtualOption.classList.remove('active');
    if (visitTypeInput) visitTypeInput.value = 'physical';
  } else {
    if (virtualOption) virtualOption.classList.add('active');
    if (physicalOption) physicalOption.classList.remove('active');
    if (visitTypeInput) visitTypeInput.value = 'virtual';
  }
}

// Initialize schedule form submission
// Initialize schedule form submission - FIXED with shorter message
function initScheduleForm() {
  const form = document.getElementById('scheduleForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('visitName')?.value;
    const email = document.getElementById('visitEmail')?.value;
    const phone = document.getElementById('visitPhone')?.value;
    const date = document.getElementById('visitDate')?.value;
    const time = document.getElementById('visitTime')?.value;
    const course = document.getElementById('visitCourse')?.value;
    const visitType = document.getElementById('visitType')?.value;
    
    // Validation
    if (!name || !email || !phone || !date || !time || !course) {
      notifyWarning('⚠️ Please fill all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notifyWarning('⚠️ Please enter a valid email address.');
      return;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      notifyWarning('⚠️ Please enter a valid 10-digit phone number.');
      return;
    }
    
    // SHORTER SUCCESS MESSAGE - FIXED
    const visitTypeText = visitType === 'physical' ? 'Physical Campus Visit' : 'Virtual Campus Tour';
    notifySuccess(`✅ Visit Scheduled, ${name}!\n\n📅 ${date} at ${time}\n📚 ${course}\n📞 We'll contact you at ${phone}`);
    
    // Close modal and reset form
    closeScheduleModal();
    form.reset();
    
    // Reset visit type to physical
    const visitTypeInput = document.getElementById('visitType');
    if (visitTypeInput) visitTypeInput.value = 'physical';
    const physicalOption = document.querySelector('.visit-option:first-child');
    const virtualOption = document.querySelector('.visit-option:last-child');
    if (physicalOption) physicalOption.classList.add('active');
    if (virtualOption) virtualOption.classList.remove('active');
  });
}
// ============================================
// BROCHURE DOWNLOAD FUNCTIONS
// ============================================

// Download prospectus/brochure
function downloadBrochure(type = 'prospectus') {
  // Create brochure content dynamically
  const prospectusContent = generateProspectusContent();
  
  // Create blob and download
  const blob = new Blob([prospectusContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ELITE_Institute_${type.toUpperCase()}_2026.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Also show notification
  notifyInfo(`📄 Downloading ELITE Institute ${type === 'prospectus' ? 'Prospectus' : 'Brochure'} 2026...`);
}

// Generate prospectus HTML content
function generateProspectusContent() {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ELITE Institute Prospectus 2026</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 0 auto; padding: 40px; }
    h1 { color: #D4AF37; text-align: center; border-bottom: 3px solid #D4AF37; padding-bottom: 15px; }
    h2 { color: #D4AF37; margin-top: 30px; border-left: 4px solid #D4AF37; padding-left: 15px; }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; color: #D4AF37; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background: #D4AF37; color: #000; }
    .footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; }
    .contact-box { background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">ELITE INSTITUTE OF ENGINEERING</div>
    <p>Est. 1978 | NAAC A++ | NIRF #42</p>
    <p><strong>TNEA Counselling Code: 1442</strong></p>
  </div>
  
  <h1>PROSPECTUS 2026</h1>
  
  <h2>About ELITE</h2>
  <p>Since 1978, ELITE Institute has been a beacon of quality education. NAAC A++ accredited with 3.82/4 CGPA, 47 years of shaping futures, 85,000+ alumni worldwide, 94% placement record.</p>
  
  <h2>Academic Programs</h2>
  <table>
    <tr><th>Program</th><th>Duration</th><th>Annual Fee</th><th>Seats</th></tr>
    <tr><td>B.E Computer Science & Engineering</td><td>4 Years</td><td>₹1,35,000</td><td>120</td></tr>
    <tr><td>B.E CSE (Cyber Security)</td><td>4 Years</td><td>₹1,35,000</td><td>120</td></tr>
    <tr><td>B.Tech AI & Data Science</td><td>4 Years</td><td>₹1,45,000</td><td>110</td></tr>
    <tr><td>B.E Information Technology</td><td>4 Years</td><td>₹1,35,000</td><td>100</td></tr>
    <tr><td>B.E Electronics & Communication</td><td>4 Years</td><td>₹1,32,000</td><td>100</td></tr>
    <tr><td>B.E Electrical & Electronics</td><td>4 Years</td><td>₹1,30,000</td><td>90</td></tr>
    <tr><td>B.E Civil Engineering</td><td>4 Years</td><td>₹1,20,000</td><td>90</td></tr>
    <tr><td>B.Tech Biotechnology</td><td>4 Years</td><td>₹1,25,000</td><td>70</td></tr>
    <tr><td>MBA Finance & Marketing</td><td>2 Years</td><td>₹2,40,000</td><td>80</td></tr>
  </table>
  
  <h2>Scholarships (Up to 100%)</h2>
  <table>
    <tr><th>Scholarship</th><th>Eligibility</th><th>Benefit</th></tr>
    <tr><td>Merit Scholarship</td><td>90%+ in 10+2</td><td>50% fee waiver</td></tr>
    <tr><td>Merit Scholarship</td><td>95%+ in 10+2</td><td>75% fee waiver</td></tr>
    <tr><td>Merit Scholarship</td><td>98%+ in 10+2</td><td>100% fee waiver</td></tr>
    <tr><td>Sports Scholarship</td><td>State/National/International</td><td>25-75% waiver</td></tr>
    <tr><td>First Graduate</td><td>First in family for higher education</td><td>₹25,000/year</td></tr>
    <tr><td>Girl Child</td><td>All female students</td><td>10% waiver</td></tr>
  </table>
  
  <h2>Placement Record (2025)</h2>
  <table>
    <tr><th>Parameter</th><th>Statistic</th></tr>
    <tr><td>Placement Rate</td><td>94%</td></tr>
    <tr><td>Highest Package</td><td>₹52 LPA (Microsoft)</td></tr>
    <tr><td>Average Package</td><td>₹11.5 LPA</td></tr>
    <tr><td>Total Recruiters</td><td>500+</td></tr>
  </table>
  
  <h2>Important Dates 2026</h2>
  <table>
    <tr><th>Event</th><th>Date</th></tr>
    <tr><td>Application Start</td><td>March 1, 2026</td></tr>
    <tr><td>Last Date to Apply</td><td>July 31, 2026</td></tr>
    <tr><td>Counselling Start</td><td>August 10, 2026</td></tr>
    <tr><td>Orientation</td><td>September 1, 2026</td></tr>
    <tr><td>Classes Commence</td><td>September 15, 2026</td></tr>
  </table>
  
  <div class="contact-box">
    <h3>Contact Information</h3>
    <p><strong>Address:</strong> Mambakkam – Medavakkam Main Road, Ponmar, Chennai - 600127</p>
    <p><strong>Admissions:</strong> +91 90470 40413 | <strong>Email:</strong> admissions@elite.edu</p>
    <p><strong>Placement:</strong> +91 90470 40414 | <strong>Website:</strong> www.elite.edu</p>
    <p><strong>WhatsApp:</strong> +91 90470 40413</p>
  </div>
  
  <div class="footer">
    <p>© 2026 ELITE Institute of Engineering. All rights reserved.</p>
    <p>Information subject to change. Please visit www.elite.edu for latest updates.</p>
  </div>
</body>
</html>`;
}

// ============================================
// COUNTDOWN TIMER FUNCTIONS
// ============================================

// Update countdown timer for admissions
function updateCountdown() {
  const lastDate = new Date('July 31, 2026 23:59:59').getTime();
  const now = new Date().getTime();
  const distance = lastDate - now;
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  const daysEl = document.getElementById('days') || document.getElementById('timerDays');
  const hoursEl = document.getElementById('hours') || document.getElementById('timerHours');
  const minsEl = document.getElementById('minutes') || document.getElementById('timerMins');
  const secsEl = document.getElementById('seconds') || document.getElementById('timerSecs');
  
  if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
  if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
  if (minsEl) minsEl.innerHTML = minutes.toString().padStart(2, '0');
  if (secsEl) secsEl.innerHTML = seconds.toString().padStart(2, '0');
  
  if (distance < 0) {
    if (daysEl) daysEl.innerHTML = '00';
    if (hoursEl) hoursEl.innerHTML = '00';
    if (minsEl) minsEl.innerHTML = '00';
    if (secsEl) secsEl.innerHTML = '00';
  }
}

// Initialize countdown timer
function initCountdownTimer() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============================================
// RESET FILTERS (for gallery, departments, events)
// ============================================

function resetFilters() {
  // Reset gallery filters
  const searchGallery = document.getElementById('searchGallery');
  if (searchGallery) searchGallery.value = '';
  
  // Reset department filters
  const searchDept = document.getElementById('searchDept');
  if (searchDept) searchDept.value = '';
  
  // Reset event filters
  const searchEvent = document.getElementById('searchEvent');
  if (searchEvent) searchEvent.value = '';
  
  // Reset filter chips
  document.querySelectorAll('.filter-chip, .filter-btn, .event-nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Activate "All" filter
  const allFilter = document.querySelector('.filter-chip[data-filter="all"], .filter-btn[data-filter="all"], .event-nav-btn[data-category="all"]');
  if (allFilter) allFilter.classList.add('active');
  
  // Trigger search input event to refresh
  if (searchGallery) {
    const event = new Event('input');
    searchGallery.dispatchEvent(event);
  }
  if (searchDept) {
    const event = new Event('input');
    searchDept.dispatchEvent(event);
  }
  if (searchEvent) {
    const event = new Event('input');
    searchEvent.dispatchEvent(event);
  }
}

// ============================================
// REGISTER FOR EVENT
// ============================================

function registerEvent(eventName) {
  notifySuccess(`✅ Registration successful for ${eventName}!\n\nYou will receive event details and updates via email.\n\nFor assistance, contact: events@elite.edu or +91 90470 40415`);
}

// ============================================
// LOAD GOOGLE FONTS DYNAMICALLY
// ============================================

function loadGoogleFonts() {
  if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Cinzel"]')) {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}

// ============================================
// SCROLL TO TOP
// ============================================

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// INITIALIZE ALL UTILITIES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  setCurrentYear();
  initScheduleForm();
  loadGoogleFonts();
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeScheduleModal();
    }
  });
  
  // Close modal when clicking outside
  window.onclick = function(event) {
    const modal = document.getElementById('scheduleModal');
    if (event.target === modal) {
      closeScheduleModal();
    }
  };
});

// Export for global use
window.debounce = debounce;
window.formatNumber = formatNumber;
window.setCurrentYear = setCurrentYear;
window.smoothScrollTo = smoothScrollTo;
window.toggleBodyScroll = toggleBodyScroll;
window.isInViewport = isInViewport;
window.openScheduleModal = openScheduleModal;
window.closeScheduleModal = closeScheduleModal;
window.selectVisitType = selectVisitType;
window.downloadBrochure = downloadBrochure;
window.updateCountdown = updateCountdown;
window.initCountdownTimer = initCountdownTimer;
window.resetFilters = resetFilters;
window.registerEvent = registerEvent;
window.scrollToTop = scrollToTop;
window.notifySuccess = notifySuccess;
window.notifyWarning = notifyWarning;
window.notifyInfo = notifyInfo;
window.showNotification = showNotification;