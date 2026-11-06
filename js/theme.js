/**
 * Theme Controller: Dark Mode & Light Mode
 * Handles state persistence in localStorage and system preferences
 */

(function() {
  const THEME_KEY = 'peter-portfolio-theme';
  
  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggles = document.querySelectorAll('.theme-toggle-btn');
    toggles.forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      if (theme === 'dark') {
        btn.classList.add('is-dark');
      } else {
        btn.classList.remove('is-dark');
      }
    });
  }

  window.togglePortfolioTheme = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
    applyTheme(next);
  };

  // Apply immediately to prevent flash of wrong theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  function bindEvents() {
    applyTheme(getPreferredTheme());

    const toggles = document.querySelectorAll('.theme-toggle-btn');
    toggles.forEach(btn => {
      btn.removeEventListener('click', window.togglePortfolioTheme);
      btn.addEventListener('click', window.togglePortfolioTheme);
    });

    // Listen for OS theme change
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        try {
          if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        } catch (err) {}
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindEvents);
  } else {
    bindEvents();
  }
})();
