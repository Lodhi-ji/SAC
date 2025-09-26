document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // --- Hero Background Slider ---
    const heroSlides = document.querySelector('.hero-slides');
    if (heroSlides) {
        let currentSlide = 0;
        const slides = heroSlides.querySelectorAll('.hero-slide');
        const totalSlides = slides.length;

        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            heroSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 5000);
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 120; // Nav height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });
    backToTopButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Lightbox for Gallery ---
    const gallery = document.getElementById("lightgallery");
    if (gallery) {
        lightGallery(gallery, {
            selector: '.gallery-item',
            speed: 500,
            download: false
        });
    }

});