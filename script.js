// Navigation
document.addEventListener('DOMContentLoaded', function() {
  // Menu mobile
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
    
    // Fermer le menu en cliquant sur un lien
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
  
  // Navigation scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Filtres de projets
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Ajouter la classe active au bouton cliqué
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Animation des barres de compétences
  const skillBars = document.querySelectorAll('.skill-level');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      setTimeout(() => {
        bar.style.width = level + '%';
        bar.parentElement.nextElementSibling.textContent = level + '%';
      }, 300);
    });
  }
  
  // Observer pour animer les compétences quand elles sont visibles
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const skillsSection = document.querySelector('.skills-grid');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
  
  // Animation des chiffres dans la section À propos
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateNumbers() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + '+';
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + '+';
        }
      }, 16);
    });
  }
  
  const aboutSection = document.querySelector('.about-stats');
  if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
  }
  
  // Validation du formulaire de contact
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Reset des erreurs
      clearErrors();
      
      // Validation du nom
      const name = document.getElementById('name');
      if (name.value.trim().length < 2) {
        showError('name', 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
      }
      
      // Validation de l'email
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        showError('email', 'Veuillez entrer un email valide');
        isValid = false;
      }
      
      // Validation du sujet
      const subject = document.getElementById('subject');
      if (!subject.value) {
        showError('subject', 'Veuillez sélectionner un sujet');
        isValid = false;
      }
      
      // Validation du message
      const message = document.getElementById('message');
      if (message.value.trim().length < 10) {
        showError('message', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
      }
      
      if (isValid) {
        // Simulation d'envoi
        showFormMessage('success', 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
        contactForm.reset();
        
        // Réinitialiser le message après 5 secondes
        setTimeout(() => {
          const messageDiv = document.getElementById('formMessage');
          if (messageDiv) {
            messageDiv.style.display = 'none';
          }
        }, 5000);
      }
    });
    
    function showError(fieldId, message) {
      const errorElement = document.getElementById(fieldId + 'Error');
      const inputElement = document.getElementById(fieldId);
      
      if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.style.borderColor = 'var(--error)';
      }
    }
    
    function clearErrors() {
      const errorElements = document.querySelectorAll('.error-message');
      const inputs = document.querySelectorAll('input, select, textarea');
      
      errorElements.forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
      });
      
      inputs.forEach(input => {
        input.style.borderColor = '';
      });
    }
    
    function showFormMessage(type, message) {
      const messageDiv = document.getElementById('formMessage');
      if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Scroll vers le message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }
  
  // FAQ accordéon
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');
      
      // Fermer les autres réponses
      document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
        if (otherAnswer !== answer && otherAnswer.classList.contains('active')) {
          otherAnswer.classList.remove('active');
          otherAnswer.previousElementSibling.querySelector('i').classList.remove('fa-chevron-up');
          otherAnswer.previousElementSibling.querySelector('i').classList.add('fa-chevron-down');
        }
      });
      
      // Toggle la réponse actuelle
      answer.classList.toggle('active');
      if (answer.classList.contains('active')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
      } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
      }
    });
  });
  
  // Modal
  const modal = document.querySelector('.modal');
  const closeModal = document.querySelector('.close-modal');
  const demoButtons = document.querySelectorAll('[onclick^="openDemo"]');
  
  if (modal && closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  if (demoButtons) {
    demoButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
          modalElement.style.display = 'block';
        }
      });
    });
  }
  
  // Animation au chargement
  const animatedElements = document.querySelectorAll('.feature-card, .project-card');
  animatedElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('fade-in');
    }, index * 100);
  });
});