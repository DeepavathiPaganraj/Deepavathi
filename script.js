document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================================= */
    /* 1. Theme Toggle (Dark / Light Mode)
    /* ========================================================================= */
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('portfolio-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolio-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    /* ========================================================================= */
    /* 2. Mobile Navigation Toggle
    /* ========================================================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    /* ========================================================================= */
    /* 3. Scroll Events & Active Links
    /* ========================================================================= */
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollBar = document.getElementById('scrollBar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Indicator
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + '%';

        // Scroll to Top Button Visibility
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }

        // Active Navigation Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ========================================================================= */
    /* 4. Typing Animation for Hero Subtitle
    /* ========================================================================= */
    const typingText = document.querySelector('.typing-text');
    const words = [
        "Computer Science Expert", 
        "Passionate Educator", 
        "Researcher", 
        "OS & DBMS Specialist"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(typeEffect, 1000);

    /* ========================================================================= */
    /* 5. Scroll Reveal Animation & Skill Bars Fill
    /* ========================================================================= */
    const reveals = document.querySelectorAll('.reveal');
    const skillSection = document.getElementById('skills');
    const progressLines = document.querySelectorAll('.progress-line span');
    const circularProgresses = document.querySelectorAll('.circular-progress');
    let skillsAnimated = false;

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        // Reveal effect
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });

        // Skill Bars & Circular Progress fill on visibility
        if (skillSection) {
            const skillsTop = skillSection.getBoundingClientRect().top;
            
            if (skillsTop < windowHeight - elementVisible && !skillsAnimated) {
                // Linear Progress Bars
                progressLines.forEach(line => {
                    const width = line.parentElement.getAttribute('data-width');
                    line.style.width = width;
                });

                // Circular Progress Bars
                circularProgresses.forEach(progress => {
                    let progressValue = progress.querySelector('.progress-value');
                    let endValue = parseInt(progress.getAttribute('data-value'));
                    let speed = 20; // ms
                    let startValue = 0;
                    
                    let counter = setInterval(() => {
                        startValue += 1;
                        progressValue.textContent = startValue + '%';
                        
                        // Update gradient background dynamically
                        // We extract actual primary/secondary colors from computed style or just use var
                        progress.style.background = `conic-gradient(var(--secondary) ${startValue * 3.6}deg, rgba(0,0,0,0.1) 0deg)`;
                        
                        // For dark mode compatibility
                        if (document.body.classList.contains('dark-theme')) {
                             progress.style.background = `conic-gradient(var(--secondary) ${startValue * 3.6}deg, rgba(255,255,255,0.1) 0deg)`;
                        }

                        if (startValue === endValue) {
                            clearInterval(counter);
                        }
                    }, speed);
                });

                skillsAnimated = true; // prevent re-animating
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    /* ========================================================================= */
    /* 6. Update Copyright Year
    /* ========================================================================= */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ========================================================================= */
    /* 7. Particles Canvas Background Effect
    /* ========================================================================= */
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    
    let particlesArray;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // Particle Object
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Check particle position, move particle, draw particle
        update() {
            // Check canvas bounds
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            // Optional mouse interaction could be added here
            
            this.draw();
        }
    }

    // Initialize particle array
    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        
        // Limit max particles
        if(numberOfParticles > 100) numberOfParticles = 100;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1) - 0.5;
            
            // Get color from CSS variables (simplified)
            let color = 'rgba(59, 130, 246, 0.2)'; // Tailwind blue-500 semi-transparent
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connect particles with lines
    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    // Match the color tone of the website roughly
                    let isDark = document.body.classList.contains('dark-theme');
                    let color = isDark ? `rgba(96, 165, 250, ${opacityValue * 0.2})` : `rgba(30, 58, 138, ${opacityValue * 0.1})`;
                    
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    // Start particles
    initParticles();
    animateParticles();
    
    // Update particle colors slightly when theme changes
    themeBtn.addEventListener('click', () => {
         // The connectParticles function dynamically checks the theme every frame, 
         // so it updates automatically.
    });

    /* ========================================================================= */
    /* 8. Form Submission Handling (Prevent Default)
    /* ========================================================================= */
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'var(--accent-alt)';
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }
});
