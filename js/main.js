// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialisé');
    
    // Initialisation AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
        console.log('AOS initialisé');
    } else {
        console.log('AOS non disponible');
    }

    // Initialisation de la navigation
    initNavigation();
    
    // Initialisation des animations
    initAnimations();
    
    // Initialisation du thème
    initTheme();
    
    // Initialisation du smooth scrolling
    initSmoothScrolling();
    
    // Initialisation des barres de compétences
    initSkillBars();
    
    // Initialisation des fonctionnalités supplémentaires
    initScrollEffects();
    initButtonAnimations();
    initFormHandling();
});

// ===== NAVIGATION MOBILE =====
function initNavigation() {
    console.log('Initialisation de la navigation');
    
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Éléments trouvés:', {
        mobileNavToggle: !!mobileNavToggle,
        mainNav: !!mainNav,
        navLinks: navLinks.length
    });
    
    // Toggle navigation mobile
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle menu mobile');
            
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Fermer le menu en cliquant sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Lien cliqué:', this.getAttribute('href'));
                mobileNavToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', function(e) {
            if (!mobileNavToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mobileNavToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
    
    // Gestion du scroll pour la navigation active
    window.addEventListener('scroll', function() {
        updateActiveNavigation();
    });
    
    // Initialiser la navigation active au chargement
    updateActiveNavigation();
}

// ===== MISE À JOUR DE LA NAVIGATION ACTIVE =====
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    console.log('Section active:', current);
}

// ===== THÈME SOMBRE/CLAIR =====
function initTheme() {
    console.log('Initialisation du thème');
    
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    console.log('Éléments thème trouvés:', {
        themeToggle: !!themeToggle,
        themeIcon: !!themeIcon
    });
    
    if (themeToggle && themeIcon) {
        // Vérifier le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        console.log('Thème initial:', { savedTheme, prefersDark });
        
        // Appliquer le thème initial
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme === 'dark');
        } else if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon(true);
        }
        
        // Toggle du thème
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle thème');
            
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme === 'dark');
            
            console.log('Nouveau thème:', newTheme);
            
            // Animation du bouton
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
}

function updateThemeIcon(isDark) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        console.log('Icône thème mise à jour:', isDark ? 'lune' : 'soleil');
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    console.log('Initialisation du smooth scrolling');
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Scroll vers:', targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    console.log('Initialisation des animations');
    
    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };
    
    // Observer pour déclencher l'animation
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
}

// ===== BARRES DE COMPÉTENCES =====
function initSkillBars() {
    console.log('Initialisation des barres de compétences');
    
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        const percentage = progressBar.style.width;
        
        // Créer un élément pour afficher le pourcentage
        const percentageDisplay = document.createElement('span');
        percentageDisplay.className = 'skill-percentage';
        percentageDisplay.textContent = percentage;
        item.appendChild(percentageDisplay);
        
        // Animation au scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBar.style.width = percentage;
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

// ===== ANIMATIONS AU SCROLL =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ===== GESTION DU SCROLL =====
function initScrollEffects() {
    console.log('Initialisation des effets de scroll');
    
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        // Effet de transparence du header
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== ANIMATIONS DES BOUTONS =====
function initButtonAnimations() {
    console.log('Initialisation des animations des boutons');
    
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ===== GESTION DES FORMULAIRES =====
function initFormHandling() {
    console.log('Initialisation de la gestion des formulaires');
    
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation de soumission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi (remplacer par votre logique d'envoi)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// ===== UTILITAIRES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== GESTION DU REDIMENSIONNEMENT =====
window.addEventListener('resize', debounce(function() {
    console.log('Redimensionnement de la fenêtre');
    
    // Fermer le menu mobile si la fenêtre est redimensionnée
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (window.innerWidth > 768) {
        mobileNavToggle?.classList.remove('active');
        mainNav?.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
}, 250));

// ===== DEBUG =====
console.log('Script main.js chargé');
