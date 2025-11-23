document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        // Add 'nav-scrolled' class if user scrolls more than 50px, otherwise remove it
        if (window.scrollY > 80) { 
            nav.classList.add('nav-scrolled');
        } else { 
            nav.classList.remove('nav-scrolled');
        }
    });
});

const links = document.querySelectorAll('.nav-link-item');
const current = window.location.pathname.split('/').pop();

links.forEach(link => {
    if (link.getAttribute('href') === current) {
        link.classList.add('active');
    }
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active"); 
});

// Make sure GSAP is loaded first
const track = document.querySelector(".carousel-track");
const images = gsap.utils.toArray(".carousel-track img");

// Calculate total width of all images (including gaps)
const totalWidth = track.scrollWidth / 2; // half because we duplicated the images

// GSAP infinite horizontal scroll
gsap.to(track, {
  x: -totalWidth,       // move left across its total width
  duration: 40,         // slower/faster scroll
  ease: "none",         // constant speed
  repeat: -1,           // infinite
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % -totalWidth) // seamless loop
  }
});