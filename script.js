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
  
    /* ---------- Mobile menu - FIXED ---------- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBackdrop = document.getElementById('menu-backdrop');
  
    if (menuToggle && mobileMenu) {
      // Open menu function
      const openMenu = () => {
        mobileMenu.classList.add('open');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
      };
      
      // Close menu function
      const closeMenu = () => {
        const scrollY = document.body.style.top;
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      };
  
      // Toggle menu on hamburger click
      menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (mobileMenu.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
  
      // Close menu on backdrop click
      if (menuBackdrop) {
        menuBackdrop.addEventListener('click', closeMenu);
      }
  
      // Close menu on any link click inside mobile menu
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
  
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
          closeMenu();
        }
      });
  
      // Debug
      console.log('Mobile menu initialized');
      console.log('Menu toggle:', menuToggle);
      console.log('Mobile menu:', mobileMenu);
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