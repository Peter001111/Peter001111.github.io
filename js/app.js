/**
 * Main Portfolio Application Script
 * Theme toggle, scroll spy, mobile menu, animated counters, role cycler
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollSpy();
  initMetricCounters();
  initRoleCycler();
});

/* ================= Theme Toggle ================= */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('opp-portfolio-theme');

  const currentTheme = savedTheme || (prefersDark.matches ? 'dark' : 'dark'); // default dark
  setTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const nextTheme = isDark ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('opp-portfolio-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('opp-portfolio-theme', theme);
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
    }
  }
}

/* ================= Mobile Menu ================= */
function initMobileNav() {
  const trigger = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const navLinks = drawer ? drawer.querySelectorAll('.mobile-nav-link') : [];

  if (!trigger || !drawer) return;

  function openDrawer() {
    drawer.classList.remove('hidden');
    setTimeout(() => {
      drawer.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('opacity-100');
    setTimeout(() => {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }

  trigger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ================= Scroll Spy ================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');
  const header = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header blur effect
    if (header) {
      if (scrollY > 40) {
        header.classList.add('shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
    }

    // Active link highlighting
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentId) {
        link.classList.add('text-purple-400', 'font-bold');
        link.classList.remove('text-slate-300');
      } else {
        link.classList.remove('text-purple-400', 'font-bold');
        link.classList.add('text-slate-300');
      }
    });
  });
}

/* ================= Animated Metric Counters ================= */
function initMetricCounters() {
  const counters = document.querySelectorAll('.counter-animate');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
          const duration = 2000;
          const startTime = performance.now();

          function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            if (decimals > 0) {
              counter.textContent = prefix + currentVal.toFixed(decimals) + suffix;
            } else {
              counter.textContent = prefix + Math.floor(currentVal).toLocaleString() + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              if (decimals > 0) {
                counter.textContent = prefix + target.toFixed(decimals) + suffix;
              } else {
                counter.textContent = prefix + target.toLocaleString() + suffix;
              }
            }
          }

          requestAnimationFrame(update);
        });
      }
    });
  }, { threshold: 0.2 });

  const metricsSection = document.getElementById('metrics') || document.getElementById('metrics-strip');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ================= Dynamic Role Cycler ================= */
function initRoleCycler() {
  const roleElem = document.getElementById('dynamic-role-text');
  if (!roleElem) return;

  const roles = [
    "Brand & Communications Strategist",
    "Digital Growth Architect",
    "Audience & Campaign Specialist",
    "Content Marketing Lead"
  ];
  let roleIdx = 0;

  setInterval(() => {
    roleElem.style.opacity = '0';
    roleElem.style.transform = 'translateY(8px)';
    setTimeout(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      roleElem.textContent = roles[roleIdx];
      roleElem.style.opacity = '1';
      roleElem.style.transform = 'translateY(0)';
    }, 280);
  }, 3500);
}
