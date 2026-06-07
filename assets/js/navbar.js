// ============================================
// NAVBAR - Sticky Navigation with Mobile Menu
// ============================================

// Mobile Menu Toggle
function initMobileMenu() {
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (!burger || !navLinks) return;
  
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
    
    // Animate burger icon
    const spans = burger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close menu when clicking on nav links
  const navLinksItems = document.querySelectorAll('.nav-link');
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && 
        !navLinks.contains(e.target) && 
        !burger.contains(e.target)) {
      navLinks.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;
  
  // Check saved theme
  const savedTheme = localStorage.getItem('elite-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark';
  } else {
    themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
  }
  
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('elite-theme', isDark ? 'dark' : 'light');
    themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i> Dark' : '<i class="fas fa-sun"></i> Light';
  });
}

// Active Link Highlighting
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Sticky Navbar on Scroll
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.padding = '8px 0';
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.padding = '15px 0';
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

// Load Navbar from Component (if using external HTML)
async function loadNavbarComponent() {
  const navbarContainer = document.getElementById('navbar-container');
  if (!navbarContainer) return;
  
  try {
    const response = await fetch('/assets/components/navbar.html');
    if (response.ok) {
      const html = await response.text();
      navbarContainer.innerHTML = html;
    }
  } catch (error) {
    console.log('Using inline navbar');
  }
}

// Initialize all navbar features
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initThemeToggle();
  setActiveNavLink();
  initStickyNavbar();
  // loadNavbarComponent(); // Uncomment if using external component
});

// Load Footer Component
async function loadFooterComponent() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;
  
  try {
    const response = await fetch('/assets/components/footer.html');
    if (response.ok) {
      const html = await response.text();
      footerContainer.innerHTML = html;
    }
  } catch (error) {
    console.log('Using inline footer');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFooterComponent();
});