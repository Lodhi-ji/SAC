document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 800,
        once: true,
    });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroBackgroundImages = [
            'images/Social/Hero 1.png',
            'images/Social/Hero 2.png',
            'images/Social/Hero 3.png',
        ];
        let currentHeroImageIndex = 0;
        
        const setHeroBackground = (imageUrl) => {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                heroSection.style.backgroundImage = `url('${img.src}')`;
            };
        };
        
        setHeroBackground(heroBackgroundImages[0]);

        function cycleHeroBackground() {
            currentHeroImageIndex = (currentHeroImageIndex + 1) % heroBackgroundImages.length;
            setHeroBackground(heroBackgroundImages[currentHeroImageIndex]);
        }
        
        setInterval(cycleHeroBackground, 5000);
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