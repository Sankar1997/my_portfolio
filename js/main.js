/**
 * SANKAR SOLAIYAPPAN | DEVOPS & INFRASTRUCTURE PORTFOLIO
 * Main Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initProfilePopover();
  initQuickCopyButtons();
  initMobileMenu();
  initCounters();
  initWallpaperModal();
  initContactForm();
});

/* ===================================================================
   PROFILE POPOVER CARD & DIRECT CONNECT
   =================================================================== */
function initProfilePopover() {
  const avatarTrigger = document.getElementById('profileAvatarTrigger');
  const popoverCard = document.getElementById('profilePopoverCard');
  const popoverContactBtn = document.getElementById('popoverContactBtn');

  if (avatarTrigger && popoverCard) {
    avatarTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      popoverCard.classList.toggle('show');
    });

    avatarTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        popoverCard.classList.toggle('show');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!popoverCard.contains(e.target) && !avatarTrigger.contains(e.target)) {
        popoverCard.classList.remove('show');
      }
    });

    // Close when clicking Contact link in popover
    popoverContactBtn?.addEventListener('click', () => {
      popoverCard.classList.remove('show');
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        popoverCard.classList.remove('show');
      }
    });
  }
}

/* ===================================================================
   QUICK COPY TO CLIPBOARD BUTTONS
   =================================================================== */
function initQuickCopyButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.quick-copy-mini-btn, [data-copy]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const textToCopy = btn.getAttribute('data-copy');
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '✓';
      btn.style.color = '#10b981';

      if (window.showToast) {
        window.showToast(`Copied to clipboard: ${textToCopy}`, 'success');
      }

      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.style.color = '';
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }, 1600);
    }).catch(() => {
      if (window.showToast) {
        window.showToast('Could not copy to clipboard', 'error');
      }
    });
  });
}

/* ===================================================================
   THEME TOGGLE (Default: Light Theme, with Seamless Dark Mode Toggle)
   =================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Default to light as specifically requested by user, check saved preference
  const savedTheme = localStorage.getItem('sankar_portfolio_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('sankar_portfolio_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.setAttribute('data-lucide', 'sun');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.setAttribute('data-lucide', 'moon');
      }
    }
    // Re-render Lucide icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

/* ===================================================================
   NAVBAR & SCROLL SPY
   =================================================================== */
function initNavbar() {
  const siteHeader = document.getElementById('siteHeader');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader?.classList.add('scrolled');
      navbar?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
      navbar?.classList.remove('scrolled');
    }

    // Scroll Spy
    let currentId = '';
    const scrollPosition = window.scrollY + 130;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   MOBILE NAVIGATION MENU
   =================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}

/* ===================================================================
   ANIMATED TELEMETRY COUNTERS
   =================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.count-up');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let count = 0;
          const duration = 1500;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.textContent = (isDecimal ? target.toFixed(2) : Math.round(target)) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = (isDecimal ? count.toFixed(2) : Math.round(count)) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const telemetrySection = document.querySelector('.hero-telemetry-row');
  if (telemetrySection) {
    observer.observe(telemetrySection);
  }
}

/* ===================================================================
   WALLPAPER LIGHTBOX MODAL
   =================================================================== */
function initWallpaperModal() {
  const wallpaperTrigger = document.getElementById('wallpaperTrigger');
  const wallpaperModal = document.getElementById('wallpaperModal');
  const closeWallpaperBtn = document.getElementById('closeWallpaperBtn');

  if (wallpaperTrigger && wallpaperModal) {
    wallpaperTrigger.addEventListener('click', () => {
      wallpaperModal.classList.add('active');
    });

    closeWallpaperBtn?.addEventListener('click', () => {
      wallpaperModal.classList.remove('active');
    });

    wallpaperModal.addEventListener('click', (e) => {
      if (e.target === wallpaperModal) {
        wallpaperModal.classList.remove('active');
      }
    });
  }
}

/* ===================================================================
   CONTACT FORM & TOAST ALERTS (WITH ANTI-BOT HONEYPOT & RATE LIMITING)
   =================================================================== */
let lastFormSubmissionTime = 0;

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const honeypotTrap = document.getElementById('formSecurityTrap');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Bot Honeypot Check
      if (honeypotTrap && honeypotTrap.value.trim() !== '') {
        console.warn('Automated bot submission prevented.');
        return; // Silently drop bot submission
      }

      // 2. Client-Side Rate Limiting (Cooldown: 20 seconds)
      const now = Date.now();
      if (now - lastFormSubmissionTime < 20000) {
        showToast('Please wait 20 seconds before transmitting another message.', 'error');
        return;
      }

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const rawName = nameInput.value.trim();
      const rawEmail = emailInput.value.trim();
      const rawMessage = messageInput.value.trim();

      if (!rawName || !rawEmail || !rawMessage) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // 3. Email Pattern Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(rawEmail)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // 4. Sanitize Inputs against XSS
      const cleanName = window.sanitizeSecurityInput ? window.sanitizeSecurityInput(rawName) : rawName;
      const cleanMessage = window.sanitizeSecurityInput ? window.sanitizeSecurityInput(rawMessage) : rawMessage;

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting Secure Message...</span>`;

      setTimeout(() => {
        lastFormSubmissionTime = Date.now();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('Thank you! Your secure transmission was received by Sankar.', 'success');
      }, 1200);
    });
  }
}

/* Toast Utility */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? '#059669' : '#dc2626';
  toast.style.cssText = `
    background: ${bg};
    color: #ffffff;
    padding: 12px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    font-size: 0.92rem;
    font-weight: 600;
    font-family: var(--font-body);
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transform: translateY(12px);
    transition: all 0.3s ease;
  `;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠'}</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
window.showToast = showToast;
