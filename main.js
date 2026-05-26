/* ========================================
   PORTFOLIO - SCRIPTS PRINCIPAUX
======================================== */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('dom-ready');
  
  // ----- Menu mobile -----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Fermer le menu au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
  
  // ----- Animation au scroll -----
  const elementsToReveal = document.querySelectorAll(
    '.hero-text, .hero-image, .section-header, .card, .sport-layout, .exercise-card, .game-card, .book-card, .process-item, .project-cover'
  );

  elementsToReveal.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${Math.min((index % 8) * 45, 220)}ms`;
  });

  const animatedElements = document.querySelectorAll('.animate-on-scroll, .reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          window.setTimeout(() => {
            entry.target.style.transitionDelay = '';
          }, 800);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // ----- Micro-interactions des cartes -----
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    });
  });

  // ----- Images cliquables -----
  const images = document.querySelectorAll('img');
  const lightbox = document.createElement('div');
  const lightboxImage = document.createElement('img');
  const closeLightbox = document.createElement('button');
  const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Aperçu de l’image');

  closeLightbox.type = 'button';
  closeLightbox.setAttribute('aria-label', 'Fermer l’aperçu');
  closeLightbox.textContent = '×';
  lightboxImage.src = emptyImage;
  lightboxImage.style.display = 'none';

  lightbox.append(closeLightbox, lightboxImage);
  document.body.appendChild(lightbox);

  const hideLightbox = () => {
    lightbox.classList.remove('active');
    lightboxImage.src = emptyImage;
    lightboxImage.style.display = 'none';
    document.body.style.overflow = '';
  };

  images.forEach(image => {
    if (image.closest('a')) {
      return;
    }

    image.classList.add('clickable-image');
    image.addEventListener('click', () => {
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || '';
      lightboxImage.style.display = 'block';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeLightbox.addEventListener('click', hideLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      hideLightbox();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.classList.contains('active')) {
      hideLightbox();
    }
  });
  
  // ----- Animation des barres de compétences -----
  const skillBars = document.querySelectorAll('.skill-level-fill');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => skillObserver.observe(bar));
  
  // ----- Navbar scroll effect -----
  const navbar = document.querySelector('.navbar');
  let ticking = false;
  
  const updateNavbar = () => {
    const currentScroll = window.pageYOffset;

    if (navbar) {
      navbar.classList.toggle('scrolled', currentScroll > 24);
    }

    ticking = false;
  };

  updateNavbar();

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
  
  // ----- Formulaire de contact (simulation) -----
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulation d'envoi
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = 'Message envoyé ✓';
        btn.style.background = 'var(--accent)';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }
  
});
