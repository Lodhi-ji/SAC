document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 800,
        once: true,
    });

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

    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 120;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    const backToTopButton = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    const gallery = document.getElementById('lightgallery');
    if (gallery) {
        lightGallery(gallery, {
            speed: 500,
            download: false
        });
    }
});