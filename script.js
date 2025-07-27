// Variables globales
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Navigation mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animation de l'icône hamburger
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Effet de scroll sur la navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animation des barres de progression des compétences
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth + '%';
    });
};

// Observer pour déclencher les animations au scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animation spéciale pour les compétences
            if (entry.target.classList.contains('skills')) {
                setTimeout(animateProgressBars, 300);
            }
            
            // Animation pour les cartes de projet
            if (entry.target.classList.contains('projects')) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
            
            // Animation pour les statistiques
            if (entry.target.classList.contains('about-stats')) {
                const stats = entry.target.querySelectorAll('.stat');
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        animateNumber(stat.querySelector('.stat-number'));
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observer les sections pour les animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Animation des nombres (compteur)
const animateNumber = (element) => {
    const finalNumber = parseInt(element.textContent);
    let currentNumber = 0;
    const increment = finalNumber / 50;
    
    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            element.textContent = finalNumber + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentNumber) + '+';
        }
    }, 30);
};

// Initialisation des cartes de projet (pour l'animation au scroll)
const initProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
    });
};

// Gestion du formulaire de contact
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération des données du formulaire
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validation simple
    if (!name || !email || !message) {
        showNotification('Veuillez remplir tous les champs.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Veuillez entrer une adresse email valide.', 'error');
        return;
    }
    
    // Simulation d'envoi du message
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Votre message a été envoyé avec succès ! Je vous recontacterai bientôt.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Validation email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Système de notifications
const showNotification = (message, type) => {
    // Supprimer les notifications existantes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
};

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset pour la navbar fixe
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Effet de parallaxe léger sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroShape = document.querySelector('.hero-shape');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        if (heroShape) {
            heroShape.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
        }
    }
});

// Animation au chargement de la page
window.addEventListener('load', () => {
    // Initialiser les animations
    initProjectCards();
    
    // Animation d'entrée pour le hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Fermer le menu mobile si la fenêtre est redimensionnée
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Easter egg: Animation spéciale sur double-clic du logo
const logo = document.querySelector('.nav-logo a');
let clickCount = 0;

logo.addEventListener('click', (e) => {
    clickCount++;
    
    if (clickCount === 2) {
        e.preventDefault();
        
        // Animation fun
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 1s ease';
        
        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
            showNotification('🎉 Easter egg trouvé ! Merci de visiter mon portfolio !', 'success');
        }, 1000);
        
        clickCount = 0;
    }
    
    setTimeout(() => {
        clickCount = 0;
    }, 500);
});

// Effet de tape à la machine pour le titre du hero
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Détecter si l'utilisateur préfère les animations réduites
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
    // Activer toutes les animations seulement si l'utilisateur ne préfère pas les animations réduites
    document.body.classList.add('animations-enabled');
}

// Performance: Throttle des événements de scroll
let scrollTimer = null;
const throttledScroll = () => {
    if (scrollTimer !== null) return;
    
    scrollTimer = setTimeout(() => {
        // Code de scroll ici
        scrollTimer = null;
    }, 16); // ~60fps
};

// Loader
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            const main = document.getElementById('main-content');
            loader.style.display = 'none';
            main.style.display = 'block';
        });

        // Formulaire dynamique
        document.getElementById("contact-form").addEventListener("submit", function (e) {
            e.preventDefault();
            const confirmation = document.getElementById("confirmation-message");
            confirmation.style.display = "block";
            setTimeout(() => {
                confirmation.style.display = "none";
                this.reset();
            }, 3000);
        });
window.addEventListener('scroll', throttledScroll, { passive: true });