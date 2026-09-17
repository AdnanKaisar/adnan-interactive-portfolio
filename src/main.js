// main.js - cursor, Lenis smooth scroll, GSAP scroll animations

// Initialize Lenis for smooth scrolling (CDN global Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ---- Anchor link smooth scroll handler ----
function smoothScrollTo(hash) {
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    e.preventDefault();
    const hash = link.getAttribute('href');
    smoothScrollTo(hash);
    history.pushState(null, '', hash);
  }
});

// Custom cursor element
const cursor = document.getElementById('customCursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Change cursor colour on hover over interactive elements
const interactive = document.querySelectorAll('a, button, .nav-link, .section');
interactive.forEach(el => {
  el.addEventListener('mouseenter', () => {
    const hue = Math.floor(Math.random() * 360);
    cursor.style.background = `hsl(${hue}, 100%, 50%)`;
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.background = 'hsl(0, 100%, 50%)';
  });
});

// GSAP scroll-triggered animations for elements with data-animate attribute
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('[data-animate]').forEach(elem => {
    gsap.fromTo(
      elem,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: elem,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  });
}
