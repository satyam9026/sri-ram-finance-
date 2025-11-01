    // ===== MOBILE MENU TOGGLE =====
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }

        // ===== HERO SLIDER =====
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));

            slides[n].classList.add('active');
            indicators[n].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto-rotate slider every 5 seconds
        let sliderInterval = setInterval(nextSlide, 5000);

        // Reset interval on manual navigation
        function resetSliderInterval() {
            clearInterval(sliderInterval);
            sliderInterval = setInterval(nextSlide, 5000);
        }

        // Next and Previous buttons
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetSliderInterval();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetSliderInterval();
            });
        }

        // Indicator dots
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                resetSliderInterval();
            });
        });

        // ===== CONTACT FORM VALIDATION =====
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();

                // Basic validation
                if (!name || !email || !phone || !subject || !message) {
                    alert('Please fill in all fields');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                }

                // Phone validation (basic)
                const phoneRegex = /^[0-9]{10,}$/;
                if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                    alert('Please enter a valid phone number');
                    return;
                }

                // If validation passes
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            });
        }

        // ===== SCROLL ANIMATIONS =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe feature cards, service items, and product cards
        document.querySelectorAll('.feature-card, .service-item, .product-card, .team-member').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // ===== NAVBAR SCROLL EFFECT =====
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active nav link
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-menu a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // ===== KEYBOARD NAVIGATION FOR SLIDER =====
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetSliderInterval();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetSliderInterval();
            }
        });