document.addEventListener('DOMContentLoaded', () => {

    // Initialize Animate on Scroll (AOS) library
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

        // Change slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            heroSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 5000);
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Adjust this value based on your nav height
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
    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = "flex";
            } else {
                backToTopButton.style.display = "none";
            }
        });
        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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
