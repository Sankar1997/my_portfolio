/**
 * SANKAR SOLAIYAPPAN | DEVOPS & INFRASTRUCTURE PORTFOLIO
 * Client-Side Security & Content Copy Protection Module
 */

(function initPortfolioSecurity() {
  'use strict';

  // 1. Anti-Clickjacking Frame-Busting Protection
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch (err) {
    console.warn('Frame protection active.');
  }

  // 2. Right-Click Context Menu Restriction
  document.addEventListener('contextmenu', (e) => {
    // Allow context menu only inside form inputs/textareas
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    e.preventDefault();
    if (window.showToast) {
      window.showToast('Content protection active: Right-click is restricted.', 'error');
    }
  });

  // 3. Keyboard Shortcut Protection (Anti-Copy / Anti-Theft)
  document.addEventListener('keydown', (e) => {
    const isInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';

    // Restrict Ctrl+C / Cmd+C (Copy) on portfolio text
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
      if (!isInput) {
        e.preventDefault();
        if (window.showToast) {
          window.showToast('Text copying is restricted to protect portfolio work.', 'error');
        }
      }
    }

    // Restrict Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
    }

    // Restrict Ctrl+U / Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
    }

    // Deter F12 key (DevTools shortcut)
    if (e.key === 'F12') {
      e.preventDefault();
    }
  });

  // 4. Prevent Image Dragging
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // 5. Anti-XSS Sanitizer Utility
  window.sanitizeSecurityInput = function (str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };
})();
