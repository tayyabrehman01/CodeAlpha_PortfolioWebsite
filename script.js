const filterButtons = document.querySelectorAll('.filter-btn');
const gallery = document.querySelector('.gallery');
const allImages = Array.from(document.querySelectorAll('.gallery img'));

let filteredImages = [...allImages];
let currentIndex = 0;

function updateGallery(filtered) {
  gallery.innerHTML = '';
  filtered.forEach(img => gallery.appendChild(img));
}

// Filter button click event
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active class on buttons
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    if (filter === 'all') {
      filteredImages = [...allImages];
    } else {
      filteredImages = allImages.filter(img => img.dataset.category === filter);
    }

    updateGallery(filteredImages);
    attachImageClickListeners(); // re-attach click listeners after filtering
  });
});

// Attach click listeners to images for lightbox
function attachImageClickListeners() {
  filteredImages.forEach((img, index) => {
    img.onclick = () => {
      currentIndex = index;
      showLightbox();
    };
  });
}

attachImageClickListeners();

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function showLightbox() {
  lightbox.style.display = 'flex';
  lightboxImg.src = filteredImages[currentIndex].src;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
  showLightbox();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % filteredImages.length;
  showLightbox();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});
