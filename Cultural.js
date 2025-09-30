document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // --- Hero Section Background Slider Logic ---
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroBackgroundImages = [
            'images/Cultural/Hero 1.png',
            'images/Cultural/Hero 2.jpg',
            'images/Cultural/Hero 3.png',
        ];
        let currentHeroImageIndex = 0;

        // Set the first background immediately and start preloading
        heroSection.style.backgroundImage = `url('${heroBackgroundImages[0]}')`;
        const preloaded = new Set();
        function preload(src) {
            if (preloaded.has(src)) return;
            const img = new Image();
            img.src = src;
            preloaded.add(src);
        }
        heroBackgroundImages.forEach(preload);

        function changeHeroBackground() {
            currentHeroImageIndex = (currentHeroImageIndex + 1) % heroBackgroundImages.length;
            const img = new Image();
            img.src = heroBackgroundImages[currentHeroImageIndex];
            img.onload = () => {
                heroSection.style.backgroundImage = `url('${img.src}')`;
            };
        }
        setInterval(changeHeroBackground, 5000);
    }

    // --- Kaltarang Slider Logic ---
    let slideIndex = 0;
    let sliderTimer;
    const sliderContainer = document.querySelector('.slider');
    const slides = sliderContainer ? sliderContainer.querySelectorAll('img') : [];

    function showSlide(index) {
        if (!sliderContainer || slides.length === 0) return;
        if (index >= slides.length) { slideIndex = 0; }
        else if (index < 0) { slideIndex = slides.length - 1; }
        sliderContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    window.moveSlide = function (n) {
        slideIndex += n;
        showSlide(slideIndex);
        resetSliderTimer();
    }

    function autoSlide() {
        slideIndex++;
        showSlide(slideIndex);
    }

    function resetSliderTimer() {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(autoSlide, 4000);
    }

    if (slides.length > 0) {
        showSlide(slideIndex);
        resetSliderTimer();
    }
    // End Kaltarang Slider Logic

    document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Adjust for sticky nav
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.club-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    const backToTopButton = document.querySelector(".back-to-top");
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

    const gallery = document.getElementById("lightgallery");
    if (gallery) {
        lightGallery(gallery, {
            selector: '.gallery-item',
            speed: 500,
            download: false
        });
    }

});
