// ============================================
// MAIN - Entry Point for All Features
// ============================================

// Progress Bar Handler
function initProgressBar() {
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });
}

// Back to Top Button
function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });
  
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Close other open FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('open')) {
            otherItem.classList.remove('open');
          }
        });
        item.classList.toggle('open');
      });
    }
  });
}

// Table Sorting
function initTableSorting() {
  const tables = document.querySelectorAll('table');
  
  tables.forEach(table => {
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
      header.style.cursor = 'pointer';
      header.addEventListener('click', () => sortTable(table, index));
    });
  });
}

function sortTable(table, column) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const isAscending = table.dataset.sortDir === 'asc';
  
  rows.sort((a, b) => {
    let aVal = a.cells[column]?.innerText || '';
    let bVal = b.cells[column]?.innerText || '';
    
    // Remove currency symbols and commas for numeric comparison
    aVal = aVal.replace(/[₹,]/g, '');
    bVal = bVal.replace(/[₹,]/g, '');
    
    const aNum = parseFloat(aVal);
    const bNum = parseFloat(bVal);
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return isAscending ? aNum - bNum : bNum - aNum;
    }
    
    return isAscending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });
  
  rows.forEach(row => tbody.appendChild(row));
  table.dataset.sortDir = isAscending ? 'desc' : 'asc';
}

// Department Cards Loading (for home page)
function loadFeaturedDepartments() {
  const container = document.getElementById('featuredDepts');
  if (!container) return;
  
  const featuredDepts = [
    { name: 'Computer Science & Engineering', img: 'assets/images/jpg/Computer Engineering Course.jpg', desc: 'AI, Cybersecurity, Software Engineering' },
    { name: 'AI & Data Science', img: 'assets/images/jpg/AIDS.jpg', desc: 'Machine Learning, Big Data Analytics' },
    { name: 'Electronics & Communication', img: 'assets/images/jpg/ECE.jpg', desc: 'VLSI, IoT, Embedded Systems' },
    { name: 'Civil Engineering', img: 'assets/images/jpg/civil.jpg', desc: 'Structural Design, Smart Cities' }
  ];
  
  container.innerHTML = featuredDepts.map(dept => `
    <div class="dept-card reveal">
      <img src="${dept.img}" alt="${dept.name}" onerror="this.src='assets/images/jpg/logo.jpg'">
      <div class="dept-card-content">
        <h3>${dept.name}</h3>
        <p>${dept.desc}</p>
        <a href="departments.html" class="btn btn-outline btn-sm">Learn More →</a>
      </div>
    </div>
  `).join('');
}

// News & Events Loading
function loadNewsEvents() {
  const container = document.getElementById('newsEventsGrid');
  if (!container) return;
  
  const newsEvents = [
    { title: 'Admissions Open 2026', date: 'March 1, 2026', description: 'Applications for 2026 batch are now open. Last date: July 31, 2026.' },
    { title: 'Tech Fest 2026', date: 'April 5-7, 2026', description: 'Annual technical symposium with robotics, coding competitions.' },
    { title: 'Placement Drive', date: 'August 2026', description: '500+ companies expected for campus placements.' }
  ];
  
  container.innerHTML = newsEvents.map(item => `
    <div class="event-card reveal">
      <div class="event-content">
        <div class="event-date"><i class="fas fa-calendar-alt"></i> ${item.date}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="events.html" class="read-more" style="color: var(--gold);">Read More →</a>
      </div>
    </div>
  `).join('');
}

// Home Gallery Loading
function loadHomeGallery() {
  const container = document.getElementById('homeGalleryGrid');
  if (!container) return;
  
  const galleryImages = [
    'assets/images/jpg/campus.jpg',
    'assets/images/jpg/central-library-interior.jpg',
    'assets/images/jpg/sports-cricket-ground.jpg',
    'assets/images/jpg/students-group-discussion.jpg'
  ];
  
  container.innerHTML = galleryImages.map(src => `
    <div class="gallery-item" onclick="openLightbox('${src}', 'ELITE Campus')">
      <img src="${src}" loading="lazy" alt="Gallery" onerror="this.src='assets/images/jpg/logo.jpg'">
    </div>
  `).join('');
}

// Window Load Handler
window.addEventListener('load', () => {
  loadFeaturedDepartments();
  loadNewsEvents();
  loadHomeGallery();
  setCurrentYear();
});

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initBackToTop();
  initFAQ();
  initTableSorting();
  setCurrentYear();
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = this.getAttribute('href');
      if (target !== '#' && target !== '') {
        const element = document.querySelector(target);
        if (element) {
          e.preventDefault();
          smoothScrollTo(target.substring(1), 80);
        }
      }
    });
  });
});
const helpline = document.querySelector('.counselling-bar');
const navbar = document.querySelector('.navbar');

if (helpline && navbar) {
    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {
            helpline.style.transform = 'translateY(-100%)';
            navbar.classList.add('fixed-nav');
        } else {
            helpline.style.transform = 'translateY(0)';
            navbar.classList.remove('fixed-nav');
        }

    });
}
