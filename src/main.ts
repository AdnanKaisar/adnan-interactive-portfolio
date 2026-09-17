import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Cursor effect
const cursor = document.getElementById('customCursor') as HTMLElement;

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Change cursor color on hover of interactive elements
const interactive = document.querySelectorAll('a, button, .nav-link, .section');
interactive.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    const hue = Math.floor(Math.random() * 360);
    cursor.style.background = `hsl(${hue}, 100%, 50%)`;
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.background = 'hsl(0, 100%, 50%)';
  });
});

// Simple GSAP scroll animations for elements with data-animate attribute
gsap.utils.toArray('[data-animate]').forEach((elem: Element) => {
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
