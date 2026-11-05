/**
 * Interactive Lightbox Modal Component
 * Supports keyboard navigation, responsive scaling, and high-res inspection
 */

class Lightbox {
  constructor() {
    this.modal = null;
    this.image = null;
    this.caption = null;
    this.items = [];
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.createDom();
    this.bindEvents();
    this.scanTriggers();
  }

  createDom() {
    let existing = document.getElementById('global-lightbox');
    if (existing) {
      this.modal = existing;
      this.image = existing.querySelector('.lightbox-image');
      this.caption = existing.querySelector('.lightbox-caption');
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'global-lightbox';
    modal.className = 'lightbox-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Image preview');

    modal.innerHTML = `
      <button class="lightbox-close" aria-label="Close preview">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <button class="lightbox-nav-btn lightbox-prev" aria-label="Previous image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <button class="lightbox-nav-btn lightbox-next" aria-label="Next image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
      <div class="lightbox-content">
        <img class="lightbox-image" src="" alt="Preview">
        <p class="lightbox-caption"></p>
      </div>
    `;

    document.body.appendChild(modal);
    this.modal = modal;
    this.image = modal.querySelector('.lightbox-image');
    this.caption = modal.querySelector('.lightbox-caption');
  }

  scanTriggers() {
    const triggers = document.querySelectorAll('[data-lightbox-src]');
    this.items = Array.from(triggers).map((el, index) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(index);
      });
      return {
        src: el.getAttribute('data-lightbox-src'),
        caption: el.getAttribute('data-lightbox-caption') || el.getAttribute('alt') || '',
        element: el
      };
    });
  }

  bindEvents() {
    this.modal.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    this.modal.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    this.modal.querySelector('.lightbox-next').addEventListener('click', () => this.next());

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Mobile touch swipe gestures
    let touchStartX = 0;
    let touchStartY = 0;
    this.modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    this.modal.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      // Horizontal swipe threshold 45px
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }, { passive: true });
  }

  open(index) {
    if (!this.items[index]) return;
    this.currentIndex = index;
    const current = this.items[index];

    this.image.src = current.src;
    this.image.alt = current.caption;
    this.caption.textContent = current.caption;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Show/hide navigation if single item
    const prevBtn = this.modal.querySelector('.lightbox-prev');
    const nextBtn = this.modal.querySelector('.lightbox-next');
    if (this.items.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    this.image.src = '';
  }

  prev() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.open(this.currentIndex);
  }

  next() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.open(this.currentIndex);
  }
}

// Instantiate and expose globally
window.addEventListener('DOMContentLoaded', () => {
  window.portfolioLightbox = new Lightbox();
});
