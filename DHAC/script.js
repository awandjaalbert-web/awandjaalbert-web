// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const inscriptionBtn = document.getElementById('inscriptionBtn');
const ctaInscription = document.getElementById('ctaInscription');
const inscriptionModal = document.getElementById('inscriptionModal');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');
const inscriptionForm = document.getElementById('inscriptionForm');

// Variables pour le carousel
let currentSlide = 0;
let slideInterval;

// Fonction pour changer de slide
function changeSlide(slideIndex) {
    // Retirer la classe active de tous les slides et dots
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Ajouter la classe active au slide et dot sélectionné
    carouselSlides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    currentSlide = slideIndex;
}

// Fonction pour passer au slide suivant
function nextSlide() {
    let nextIndex = (currentSlide + 1) % carouselSlides.length;
    changeSlide(nextIndex);
}

// Initialiser le carousel
function initCarousel() {
    // Démarrer l'autoplay
    slideInterval = setInterval(nextSlide, 5000);
    
    // Ajouter des événements aux dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            changeSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
}

// Gestion du menu mobile
mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Gestion de la modal d'inscription
function openInscriptionModal() {
    inscriptionModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeInscriptionModal() {
    inscriptionModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

inscriptionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openInscriptionModal();
});

ctaInscription.addEventListener('click', (e) => {
    e.preventDefault();
    openInscriptionModal();
});

modalClose.addEventListener('click', closeInscriptionModal);

// Fermer la modal en cliquant à l'extérieur
inscriptionModal.addEventListener('click', (e) => {
    if (e.target === inscriptionModal) {
        closeInscriptionModal();
    }
});

// Gestion du formulaire de contact
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simuler l'envoi du formulaire (dans un cas réel, utiliser une API)
    const emailBody = `Nom: ${name}%0D%0AEmail: ${email}%0D%0ASujet: ${subject}%0D%0AMessage: ${message}`;
    const mailtoLink = `mailto:awandjaalbert@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
    
    // Ouvrir le client de messagerie
    window.location.href = mailtoLink;
    
    // Réinitialiser le formulaire
    contactForm.reset();
    
    // Afficher un message de confirmation
    alert('Merci pour votre message! Un client de messagerie va s\'ouvrir pour finaliser l\'envoi.');
});

// Gestion du formulaire d'inscription
inscriptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const name = document.getElementById('inscriptionName').value;
    const email = document.getElementById('inscriptionEmail').value;
    const phone = document.getElementById('inscriptionPhone').value;
    const formation = document.getElementById('formationSelect').value;
    const message = document.getElementById('inscriptionMessage').value;
    
    // Préparer l'email
    const formationText = document.getElementById('formationSelect').options[document.getElementById('formationSelect').selectedIndex].text;
    const emailSubject = `Inscription à la formation: ${formationText}`;
    const emailBody = `Nom: ${name}%0D%0AEmail: ${email}%0D%0ATéléphone: ${phone}%0D%0AFormation: ${formationText}%0D%0AMessage: ${message || 'Aucun message'}`;
    const mailtoLink = `mailto:awandjaalbert@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
    
    // Ouvrir le client de messagerie
    window.location.href = mailtoLink;
    
    // Réinitialiser le formulaire
    inscriptionForm.reset();
    
    // Fermer la modal
    closeInscriptionModal();
    
    // Afficher un message de confirmation
    alert('Merci pour votre inscription! Un client de messagerie va s\'ouvrir pour finaliser l\'envoi.');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Initialiser le carousel au chargement de la page
document.addEventListener('DOMContentLoaded', initCarousel);

// Fermer la modal avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inscriptionModal.classList.contains('active')) {
        closeInscriptionModal();
    }
});

// Animation au défilement pour les sections
function animateOnScroll() {
    const sections = document.querySelectorAll('.formations-section, .contact-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialiser l'animation au défilement
document.addEventListener('DOMContentLoaded', animateOnScroll);