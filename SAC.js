AOS.init({
  duration: 800,
  once: false,
  offset: 100
});

VANTA.NET({
  el: "#hero",
  mouseControls: true, touchControls: true, gyroControls: false,
  minHeight: 200.00, minWidth: 200.00, scale: 1.00, scaleMobile: 1.00,
  color: 0x21ffdc, backgroundColor: 0x232c52, points: 9.00
});

gsap.to("#sac-title", { opacity: 1, scale: 1.2, duration: 1, ease: "bounce" });
gsap.to("#expanded-title", { opacity: 1, delay: 1.5, duration: 1 });

new Typed("#typing-text", {
  strings: [
    "Beyond academics — we build leaders, events, and vibes. Join us for tech, culture, sports, and social action.",
    "Your adventure begins here: connect, create, and lead at the heart of campus life."
  ],
  typeSpeed: 40, backSpeed: 20, backDelay: 1500, loop: true, showCursor: false
});

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y - 80, behavior: 'smooth' });
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.style.display = 'none';
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}

function scrollToSlide(slideNumber) {
  const slider = document.querySelector('.slider-container');
  const slide = document.getElementById('slide-' + slideNumber);
  if (slider && slide) {
    slider.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  }
}

const slider = document.querySelector('.slider-container');
let scrollInterval;
const startScroll = () => {
  if (slider) {
    scrollInterval = setInterval(() => {
      const { scrollLeft, clientWidth, scrollWidth } = slider;
      let nextScroll = scrollLeft + clientWidth;
      if (nextScroll >= scrollWidth) {
        nextScroll = 0;
      }
      slider.scrollTo({ left: nextScroll, behavior: 'smooth' });
    }, 4000);
  }
};
startScroll();
if (slider) {
  slider.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  slider.addEventListener('mouseleave', startScroll);
}

document.getElementById('footer-logo').addEventListener('click', function () {
  document.getElementById('sr-credit').classList.toggle('hidden');
});