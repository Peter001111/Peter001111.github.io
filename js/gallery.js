/**
 * Gallery Filter & Multi-Slide Carousel Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initCarousels();
});

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

function initCarousels() {
  const carousels = document.querySelectorAll('.interactive-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const counter = carousel.querySelector('.carousel-counter');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      if (counter) {
        counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
      });
    }

    // Touch swipe support
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        // swipe left -> next
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
      } else if (endX - startX > 50) {
        // swipe right -> prev
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
      }
    }, { passive: true });

    updateCarousel();
  });
}
