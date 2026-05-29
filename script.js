// =============================================
// ANUJ PORTFOLIO — script.js
// Dynamic Interactions | Typed Effect | Particles | Animations
// =============================================

(function() {
  "use strict";

  // ========== DOM Elements ==========
  const loader = document.getElementById('loader');
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorDot = document.getElementById('cursor-dot');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('backToTop');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const sections = document.querySelectorAll('section');
  const navLinksItems = document.querySelectorAll('.nav-link');
  const skillFillBars = document.querySelectorAll('.skill-fill');
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  // ========== LOADING SCREEN ==========
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    }, 2000);
  });

  // ========== CUSTOM CURSOR ==========
  function initCustomCursor() {
    if (!cursorGlow || !cursorDot) return;
    
    document.body.style.cursor = 'none';
    
    const onMouseMove = (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    };
    
    const onMouseLeave = () => {
      cursorGlow.style.opacity = '0';
      cursorDot.style.opacity = '0';
    };
    
    const onMouseEnter = () => {
      cursorGlow.style.opacity = '1';
      cursorDot.style.opacity = '1';
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    // Hide default cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .cert-card, .project-card, .social-card');
    interactiveElements.forEach(el => {
      el.style.cursor = 'none';
    });
  }

  // ========== SCROLL PROGRESS BAR ==========
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  }

  // ========== NAVBAR SCROLL EFFECT ==========
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ========== BACK TO TOP BUTTON ==========
  function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  // ========== ACTIVE NAV LINK ON SCROLL ==========
  function setActiveNavLink() {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinksItems.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href')?.substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  }

  // ========== HAMBURGER MENU ==========
  function initHamburger() {
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== SCROLL REVEAL OBSERVER ==========
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => observer.observe(el));
  }

  // ========== ANIMATE SKILL BARS ==========
  function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.getAttribute('data-w');
          if (width) {
            setTimeout(() => {
              fill.style.width = width + '%';
            }, 200);
          }
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });
    
    skillFillBars.forEach(bar => observer.observe(bar));
  }

  // ========== TYPED TEXT EFFECT ==========
  function initTypedEffect() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Coder'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeEffect() {
      const fullText = roles[roleIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      typedElement.textContent = currentText;
      
      if (!isDeleting && charIndex === fullText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
      }
      
      const speed = isDeleting ? 50 : 100;
      setTimeout(typeEffect, speed);
    }
    
    typeEffect();
  }

  // ========== PARTICLE CANVAS ==========
  function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    function initParticles() {
      particles = [];
      const particleCount = Math.min(120, Math.floor(width * height / 8000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function connectParticles() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animateParticles() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      for (let particle of particles) {
        particle.update();
        particle.draw();
      }
      connectParticles();
      
      animationId = requestAnimationFrame(animateParticles);
    }
    
    function handleResize() {
      resizeCanvas();
      initParticles();
    }
    
    resizeCanvas();
    initParticles();
    animateParticles();
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }

  // ========== FORM SUBMIT HANDLER ==========
  window.handleFormSubmit = function() {
    const formName = document.getElementById('name');
    const formEmail = document.getElementById('email');
    const formMessage = document.getElementById('message');
    const sendBtn = document.getElementById('sendBtn');
    const formSuccess = document.getElementById('form-success');
    
    if (!formName || !formEmail || !formMessage || !sendBtn) return;
    
    const name = formName.value.trim();
    const email = formEmail.value.trim();
    const message = formMessage.value.trim();
    
    if (!name || !email || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate sending
    const originalText = sendBtn.querySelector('#sendBtnText')?.innerText || 'Send Message';
    sendBtn.disabled = true;
    if (sendBtn.querySelector('#sendBtnText')) {
      sendBtn.querySelector('#sendBtnText').innerText = 'Sending...';
    }
    
    setTimeout(() => {
      sendBtn.disabled = false;
      if (sendBtn.querySelector('#sendBtnText')) {
        sendBtn.querySelector('#sendBtnText').innerText = originalText;
      }
      if (formSuccess) {
        formSuccess.style.display = 'block';
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }
      // Reset form
      formName.value = '';
      formEmail.value = '';
      formMessage.value = '';
    }, 1500);
  };

  // ========== MODAL FUNCTIONS (Resume/CV) ==========
  window.openDocModal = function(type) {
    const modal = document.getElementById('docModal');
    const title = document.getElementById('docModalTitle');
    const viewBtn = document.getElementById('docViewBtn');
    const downloadBtn = document.getElementById('docDownloadBtn');
    
    if (!modal || !title || !viewBtn || !downloadBtn) return;
    
    const isResume = type === 'resume';
    title.innerText = isResume ? 'Resume' : 'Curriculum Vitae';
    
    // Sample PDF URLs
    const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    
    viewBtn.href = pdfUrl;
    downloadBtn.href = pdfUrl;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  
  window.closeDocModal = function(event) {
    const modal = document.getElementById('docModal');
    if (!modal) return;
    if (event && event.target !== modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  window.closeDocModalBtn = function() {
    const modal = document.getElementById('docModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };
  
  // ========== CERTIFICATE MODAL ==========
  window.openCertModal = function(imgSrc, certTitle) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalTitle = document.getElementById('certModalTitle');
    
    if (!modal || !modalImg || !modalTitle) return;
    
    modalImg.src = imgSrc;
    modalTitle.innerText = certTitle;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  
  window.closeCertModal = function(event) {
    const modal = document.getElementById('certModal');
    if (!modal) return;
    if (event && event.target !== modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  window.closeCertModalBtn = function() {
    const modal = document.getElementById('certModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ========== BACK TO TOP CLICK ==========
  function initBackToTop() {
    if (!backToTop) return;
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== PARALLAX EFFECT ON BLOBS ==========
  function initBlobParallax() {
    const blobs = document.querySelectorAll('.blob');
    if (!blobs.length) return;
    
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      blobs.forEach((blob, index) => {
        const factor = (index + 1) * 20;
        const x = (mouseX - 0.5) * factor;
        const y = (mouseY - 0.5) * factor;
        blob.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // ========== LOAD ALL FUNCTIONS ==========
  function init() {
    initCustomCursor();
    initHamburger();
    initSmoothScroll();
    initBackToTop();
    initScrollReveal();
    animateSkillBars();
    initTypedEffect();
    initBlobParallax();
    initParticleCanvas();
    
    window.addEventListener('scroll', () => {
      updateScrollProgress();
      handleNavbarScroll();
      handleBackToTop();
      setActiveNavLink();
    });
    
    // Trigger initial checks
    updateScrollProgress();
    handleNavbarScroll();
    handleBackToTop();
    setActiveNavLink();
  }
  
  // Start everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();