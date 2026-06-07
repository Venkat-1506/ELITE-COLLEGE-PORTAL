// ============================================
// HERO SLIDER - Fully Functional
// ============================================

class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.prevBtn = document.getElementById('prevSlide');
    this.nextBtn = document.getElementById('nextSlide');
    this.dotsContainer = document.getElementById('dotsContainer');
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;
    
    this.init();
  }
  
  init() {
    if (this.totalSlides === 0) return;
    
    this.createDots();
    this.updateSlides();
    this.startAutoPlay();
    this.bindEvents();
  }
  
  createDots() {
    if (!this.dotsContainer) return;
    
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === this.currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
    this.dots = document.querySelectorAll('.dot');
  }
  
  updateSlides() {
    this.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentIndex);
    });
    
    if (this.dots) {
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlides();
    this.resetAutoPlay();
  }
  
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlides();
    this.resetAutoPlay();
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlides();
    this.resetAutoPlay();
  }
  
  startAutoPlay() {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
  }
  
  resetAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.startAutoPlay();
    }
  }
  
  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Pause on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
      });
      sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }
  
  destroy() {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
  }
}

// Initialize slider when DOM is ready
let heroSlider = null;
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.hero-slider')) {
    heroSlider = new HeroSlider();
  }
});