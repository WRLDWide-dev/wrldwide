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

// Make sure GSAP is loaded first
const track = document.querySelector(".carousel-track");
const images = gsap.utils.toArray(".carousel-track img");

// Calculate total width of all images (including gaps)
const totalWidth = track.scrollWidth / 2; // half because we duplicated the images

// GSAP infinite horizontal scroll
gsap.to(track, {
  x: -totalWidth,       // move left across its total width
  duration: 30,         // slower/faster scroll
  ease: "none",         // constant speed
  repeat: -1,           // infinite
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % -totalWidth) // seamless loop
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const flexContainers = document.querySelectorAll('.flex');

    flexContainers.forEach(container => {
        const divs = container.querySelectorAll('div[data-text]');
        const benefitBox = container.closest('.flex_benefit').querySelector('.box');

        // Set the first item as active by default
        if (divs.length > 0) {
            divs[0].classList.add('active');
            if (benefitBox) {
                benefitBox.textContent = divs[0].getAttribute('data-text');
            }
        }

        divs.forEach(div => {
            div.addEventListener('mouseenter', () => {
                // Do nothing if it's already active
                if (div.classList.contains('active')) {
                    return;
                }

                // Remove .active class from all divs in the same container
                divs.forEach(d => {
                    d.classList.remove('active');
                });

                // Add .active class to the currently hovered div
                div.classList.add('active');

                // Update the text in the .box
                if (benefitBox) {
                    const newText = div.getAttribute('data-text');
                    benefitBox.textContent = newText;
                }
            });
        });
    });
});
