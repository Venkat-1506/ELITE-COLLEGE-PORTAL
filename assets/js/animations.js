// ============================================
// ANIMATIONS - Scroll Reveal & Counter Animations
// ============================================

// Counter Animation for Statistics
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.count.includes('+') ? '+' : (el.dataset.count.includes('%') ? '%' : '');
        const isFloat = target % 1 !== 0;
        let current = 0;
        const step = Math.ceil(target / 45);
        
        const updateCounter = setInterval(() => {
          current += step;
          if (current >= target) {
            el.innerText = (isFloat ? target.toFixed(1) : target) + suffix;
            clearInterval(updateCounter);
          } else {
            el.innerText = Math.floor(current) + suffix;
          }
        }, 25);
        
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation
        // revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(element => revealObserver.observe(element));
}

// Parallax Effect on Hero
function initParallax() {
  const heroSection = document.querySelector('.hero-slider, .page-hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
  }
}

// Hover Animation for Cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.course-card, .dept-card, .facility-card, .stat-card, .leader-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
}

// Typing Animation for Hero Text (Optional)
function initTypingAnimation() {
  const heroText = document.querySelector('.hero-title .gradient-gold');
  if (heroText && heroText.dataset.words) {
    const words = JSON.parse(heroText.dataset.words);
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        heroText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        heroText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
        return;
      }
      
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    
    setTimeout(typeEffect, 500);
  }
}

// Animate on Scroll - Fade In Up
function initAOS() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  animatedElements.forEach(el => aosObserver.observe(el));
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initScrollReveal();
  initParallax();
  initCardHoverEffects();
  initAOS();
  // initTypingAnimation(); // Uncomment if needed
});