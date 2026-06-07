// ============================================
// GALLERY - Filterable Gallery with Lightbox
// ============================================

// Gallery Data (can be populated dynamically)
const galleryData = [
  { src: 'assets/images/jpg/campus.jpg', category: 'Campus', title: 'Main Campus', description: 'Beautiful 120-acre green campus' },
  { src: 'assets/images/jpg/campus-arial-view.jpg', category: 'Campus', title: 'Aerial View', description: 'Campus panorama' },
  { src: 'assets/images/jpg/central-library-interior.jpg', category: 'Facilities', title: 'Central Library', description: '2.5L+ books and digital resources' },
  { src: 'assets/images/jpg/students-library-studying.jpg', category: 'Students', title: 'Library Study', description: 'Students at library' },
  { src: 'assets/images/jpg/students-group-discussion.jpg', category: 'Students', title: 'Group Discussion', description: 'Collaborative learning' },
  { src: 'assets/images/jpg/engineering-lab-practical.jpg', category: 'Facilities', title: 'Engineering Lab', description: 'Advanced research equipment' },
  { src: 'assets/images/jpg/smart-classroom-lecture.jpg', category: 'Facilities', title: 'Smart Classroom', description: 'Digital learning' },
  { src: 'assets/images/jpg/hostel-accommodation-exterior.jpg', category: 'Facilities', title: 'Modern Hostels', description: 'Comfortable accommodation' },
  { src: 'assets/images/jpg/sports-cricket-ground.jpg', category: 'Sports', title: 'Cricket Ground', description: 'International standard pitch' },
  { src: 'assets/images/jpg/indoor-sports-gymnasium.jpg', category: 'Sports', title: 'Indoor Sports', description: 'Gymnasium & indoor games' },
  { src: 'assets/images/jpg/cultural-fest-stage.jpg', category: 'Events', title: 'Cultural Fest', description: 'Annual cultural celebration' },
  { src: 'assets/images/jpg/convocation-graduation-ceremony.jpg', category: 'Events', title: 'Convocation', description: 'Graduation ceremony' },
  { src: 'assets/images/jpg/techfest-robotics-competition.jpg', category: 'Events', title: 'Tech Fest', description: 'Robotics competition' },
  { src: 'assets/images/jpg/campus-canteen-dining.jpg', category: 'Facilities', title: 'Cafeteria', description: 'Multi-cuisine food court' }
];

let currentGalleryFilter = 'all';
let currentGallerySearch = '';

// Render Gallery
function renderGallery() {
  const galleryGrid = document.getElementById('fullGalleryGrid') || document.getElementById('homeGalleryGrid') || document.getElementById('galleryGrid');
  if (!galleryGrid) return;
  
  const filtered = galleryData.filter(item => {
    const matchesFilter = currentGalleryFilter === 'all' || item.category === currentGalleryFilter;
    const matchesSearch = item.title.toLowerCase().includes(currentGallerySearch) || 
                          item.description.toLowerCase().includes(currentGallerySearch) ||
                          item.category.toLowerCase().includes(currentGallerySearch);
    return matchesFilter && matchesSearch;
  });
  
  if (filtered.length === 0) {
    galleryGrid.innerHTML = `<div class="no-results" style="grid-column:1/-1; text-align:center; padding:3rem;">
      <i class="fas fa-search fa-3x" style="color:var(--gold); opacity:0.5;"></i>
      <p style="margin-top:1rem;">No images found. Try a different search.</p>
    </div>`;
    return;
  }
  
  galleryGrid.innerHTML = filtered.map(item => `
    <div class="gallery-item" onclick="openLightbox('${item.src}', '${item.title} - ${item.description}')">
      <img src="${item.src}" loading="lazy" alt="${item.title}" onerror="this.src='assets/images/jpg/logo.jpg'">
      <div class="gallery-overlay">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <span class="gallery-category">${item.category}</span>
      </div>
    </div>
  `).join('');
}

// Lightbox Functions
function openLightbox(src, caption) {
  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <img id="lightboxImg" src="">
      <div class="lightbox-caption" id="lightboxCaption"></div>
    `;
    document.body.appendChild(lightbox);
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.onclick = () => closeLightbox();
    lightbox.onclick = (e) => {
      if (e.target === lightbox) closeLightbox();
    };
    
    // Keyboard close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }
  
  const img = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');
  if (img) img.src = src;
  if (captionEl) captionEl.textContent = caption || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Gallery Filter Functions
function initGalleryFilters() {
  const filterContainer = document.getElementById('galleryFilters');
  if (!filterContainer) return;
  
  const categories = ['all', ...new Set(galleryData.map(item => item.category))];
  filterContainer.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
      ${cat === 'all' ? 'All' : cat}
    </button>
  `).join('');
  
  filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGalleryFilter = btn.dataset.category;
      renderGallery();
    });
  });
}

// Gallery Search
function initGallerySearch() {
  const searchInput = document.getElementById('gallerySearch');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      currentGallerySearch = e.target.value.toLowerCase();
      renderGallery();
    }, 300));
  }
}

// Initialize Gallery
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initGalleryFilters();
  initGallerySearch();
});

// Make lightbox globally available
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;