// ==========================================================================
// Pulp & Press — interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Header scroll state ---------- */
    const header = document.getElementById('site-header');
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  
    /* ---------- Mobile menu ---------- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBackdrop = document.getElementById('menu-backdrop');
  
    const openMenu = () => {
      mobileMenu.classList.add('open');
      menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    };
  
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
      });
      menuBackdrop.addEventListener('click', closeMenu);
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }
  
    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-question');
      if (q) {
        q.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        });
      }
    });
  
    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll('.reveal, .product-card, .swatch, .testi-card');
    revealEls.forEach(el => el.classList.add('reveal'));
  
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('in'));
    }
  
    /* ---------- Pause testimonial marquee on touch ---------- */
    const track = document.getElementById('testi-track');
    if (track) {
      track.addEventListener('touchstart', () => track.style.animationPlayState = 'paused', { passive: true });
      track.addEventListener('touchend', () => track.style.animationPlayState = 'running', { passive: true });
    }
  
  });