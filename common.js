  const contactLink = document.getElementById("email");
  const email = "wrldwide.development@gmail.com";

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // Mobile → open email app
    contactLink.href = `mailto:${email}`;
  } else {
    // Desktop → open Gmail compose
    contactLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    contactLink.target = "_blank";
  }
  
const links = document.querySelectorAll('.nav-link-item');
const current = window.location.pathname.split('/').pop();

links.forEach(link => {
    if (link.getAttribute('href') === current) {
        link.classList.add('active');
    }
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const nav = document.querySelector('nav');
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    if(nav.classList.contains('nav-scrolled') && window.scrollY < 80) {
        nav.classList.remove('nav-scrolled');
    } else {
        nav.classList.add('nav-scrolled'); 
    }
});
