// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialisation de la navigation
    initNavigation();
    
    // Initialisation des animations
    initAnimations();
    
    // Initialisation du thème
    initTheme();
    
    // Initialisation du modal de profil
    initProfileModal();
    
    // Initialisation des interactions des photos
    initPhotoInteractions();
});

// ===== NAVIGATION =====
function initNavigation() {
    const sidebar = document.getElementById('sidebar');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle navigation mobile
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
    }
    
    // Navigation active
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Retirer la classe active de tous les liens
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Fermer la sidebar sur mobile
            if (window.innerWidth <= 768) {
                mobileNavToggle.classList.remove('active');
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Fermer la sidebar en cliquant à l'extérieur sur mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                mobileNavToggle.classList.remove('active');
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Gestion du scroll pour la navigation active
    window.addEventListener('scroll', function() {
        updateActiveNavigation();
    });
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
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Réinitialiser la largeur pour l'animation
                progressBar.style.width = '0%';
                
                // Animer vers la largeur finale
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Animation des statistiques
    animateStats();
}

// ===== ANIMATION DES STATISTIQUES =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const finalValue = parseInt(statNumber.textContent);
                
                animateNumber(statNumber, 0, finalValue, 2000);
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + '+';
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// ===== THÈME =====
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-moon')) {
                // Passer au mode sombre
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                // Passer au mode clair
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Restaurer le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            document.body.classList.add('dark-theme');
        }
    }
}

// ===== PARTICULES =====
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ff6b35'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ff6b35',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORMULAIRE DE CONTACT =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Validation basique
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Simulation d'envoi
        showNotification('Message envoyé avec succès !', 'success');
        this.reset();
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== RESPONSIVE UTILITIES =====
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    
    if (window.innerWidth > 768) {
        // Desktop
        if (mobileNavToggle) mobileNavToggle.classList.remove('active');
        if (sidebar) sidebar.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

// ===== MODAL DE PROFIL =====
function initProfileModal() {
    const profileImg = document.querySelector('.profile-img');
    const profileModal = document.getElementById('profileModal');
    const profileModalClose = document.getElementById('profileModalClose');
    
    if (profileImg && profileModal) {
        profileImg.addEventListener('click', function() {
            profileModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        profileModalClose.addEventListener('click', function() {
            profileModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        profileModal.addEventListener('click', function(e) {
            if (e.target === profileModal) {
                profileModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Fermer avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && profileModal.classList.contains('active')) {
                profileModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// ===== INTERACTIONS DES PHOTOS =====
function initPhotoInteractions() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.about-img');
            const src = img.src;
            
            // Ouvrir le modal avec cette photo
            const profileModal = document.getElementById('profileModal');
            const modalImg = profileModal.querySelector('.profile-modal-img');
            
            modalImg.src = src;
            profileModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

// ===== PERFORMANCE =====
// Lazy loading des images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
