document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 800,
        once: true,
    });
    
    // --- Header Scroll Logic ---
    let lastScrollTop = 0;
    const header = document.querySelector('.college-header');
    const nav = document.querySelector('.main-nav');
    const body = document.body;

    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 60){
            // Scroll Down
            header.style.top = "-60px";
            body.style.paddingTop = "0";
            nav.style.top = "0px";
        } else {
            // Scroll Up
            header.style.top = "0";
            body.style.paddingTop = "60px";
            nav.style.top = "60px";
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    }, false);


    // --- Hero Background Slider ---
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroBackgroundImages = [
            'images/SnT/Hero1.jpg',
            'images/SnT/Hero3.jpg',
            'images/SnT/Hero2.jpg',
        ];
        let currentHeroImageIndex = 0;

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

    // --- Urjotsav Slider ---
    let slideIndex = 0;
    let sliderTimer;
    const slides = document.querySelectorAll('.slider img');
    const sliderContainer = document.querySelector('.slider');

    if (sliderContainer) {
        const totalSlides = slides.length;

        function showSlide(index) {
            if (index >= totalSlides) { slideIndex = 0; }
            else if (index < 0) { slideIndex = totalSlides - 1; }
            sliderContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        }

        window.moveSlide = function(n) {
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
    }

    // --- Smooth Scroll for Nav Links ---
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Tab Functionality ---
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

    // --- Animated Counter ---
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, '');
        const speed = 200;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.innerText = target.toLocaleString('en-IN');
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    // --- Image Gallery Lightbox ---
    const gallery = document.getElementById('lightgallery');
    if (gallery) {
        lightGallery(gallery, {
            speed: 500,
            download: false
        });
    }
});
