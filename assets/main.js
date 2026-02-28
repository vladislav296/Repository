// Tracking
window.dataLayer = window.dataLayer || [];
function trackEvent(eventName) {
  window.dataLayer.push({ 'event': eventName });
  console.log('Tracked:', eventName);
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Intersection Observer for fade-up animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // Forms
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Honeypot check
      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) return;

      trackEvent('subscribe_submit');

      const action = form.getAttribute('action');
      if (!action || action === '') {
        // Mailto fallback
        const email = form.querySelector('input[type="email"]')?.value || '';
        const name = form.querySelector('input[name="nome"]')?.value || '';
        const whatsapp = form.querySelector('input[name="whatsapp"]')?.value || '';
        const interesse = form.querySelector('select[name="interesse"]')?.value || '';
        
        const body = `Nome: ${name}%0AEmail: ${email}%0AWhatsApp: ${whatsapp}%0AInteresse: ${interesse}`;
        window.location.href = `mailto:contato@seudominio.com?subject=Assinar newsletter&body=${body}`;
      }

      // Show success message
      const successMsg = form.nextElementSibling;
      if (successMsg && successMsg.classList.contains('success-msg')) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      }
    });
  });

  // Tracking clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.addEventListener('click', () => trackEvent('call_click'));
  });
  document.querySelectorAll('a[href^="https://wa.me"]').forEach(el => {
    el.addEventListener('click', () => trackEvent('whatsapp_click'));
  });
  document.querySelectorAll('a[href="#assinar"]').forEach(el => {
    el.addEventListener('click', () => trackEvent('subscribe_click'));
  });

  // Cookie Notice
  const cookieNotice = document.getElementById('cookie-notice');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');

  if (cookieNotice && !localStorage.getItem('cookies_accepted')) {
    cookieNotice.style.display = 'flex';
  } else if (cookieNotice) {
    cookieNotice.style.display = 'none';
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookies_accepted', 'true');
      cookieNotice.style.display = 'none';
    });
  }
  
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookies_accepted', 'false');
      cookieNotice.style.display = 'none';
    });
  }
});
