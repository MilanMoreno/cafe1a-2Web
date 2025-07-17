document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      nav.classList.remove('active');
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.padding = '1rem 0';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });
  
  // Form submission
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would normally send the form data to a server
      // For now, we'll just show an alert
      alert('Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze bei Ihnen melden.');
      
      // Reset the form
      this.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add animation to menu items when they come into view
  const menuItems = document.querySelectorAll('.menu-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  menuItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
  });

  // KI-Assistent Funktionalität
  const aiButton = document.getElementById('ai-button');
  const aiChatContainer = document.getElementById('ai-chat-container');
  const aiCloseBtn = document.getElementById('ai-close-btn');
  const aiUserInput = document.getElementById('ai-user-input');
  const aiSendBtn = document.getElementById('ai-send-btn');
  const aiChatMessages = document.getElementById('ai-chat-messages');
  
  // Öffnen und Schließen des Chat-Fensters
  aiButton.addEventListener('click', () => {
    aiChatContainer.classList.toggle('active');
    if (aiChatContainer.classList.contains('active')) {
      aiUserInput.focus();
    }
  });
  
  aiCloseBtn.addEventListener('click', () => {
    aiChatContainer.classList.remove('active');
  });
  
  // Nachricht senden Funktion
  function sendMessage() {
    const userMessage = aiUserInput.value.trim();
    if (userMessage === '') return;
    
    // Benutzer-Nachricht anzeigen
    addMessage(userMessage, 'outgoing');
    aiUserInput.value = '';
    
    // Typing-Indikator anzeigen
    showTypingIndicator();
    
    // Simuliere eine Antwort nach einer kurzen Verzögerung
    // Hier würdest du später die API-Anfrage implementieren
    setTimeout(() => {
      // Typing-Indikator entfernen
      removeTypingIndicator();
      
      // Beispielantworten basierend auf Schlüsselwörtern
      let response = getAIResponse(userMessage);
      addMessage(response, 'incoming');
    }, 1500);
  }
  
  // Event-Listener für das Senden von Nachrichten
  aiSendBtn.addEventListener('click', sendMessage);
  aiUserInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Funktion zum Hinzufügen einer Nachricht zum Chat
  function addMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('ai-message', `ai-${type}`);
    
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('ai-avatar');
    
    const iconElement = document.createElement('i');
    iconElement.classList.add(type === 'incoming' ? 'fas' : 'fas', type === 'incoming' ? 'fa-robot' : 'fa-user');
    avatarElement.appendChild(iconElement);
    
    const contentElement = document.createElement('div');
    contentElement.classList.add('ai-message-content');
    contentElement.textContent = message;
    
    messageElement.appendChild(avatarElement);
    messageElement.appendChild(contentElement);
    
    aiChatMessages.appendChild(messageElement);
    
    // Scroll zum Ende des Chat-Fensters
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }
  
  // Typing-Indikator anzeigen
  function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('ai-message', 'ai-incoming', 'ai-typing-container');
    
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('ai-avatar');
    
    const iconElement = document.createElement('i');
    iconElement.classList.add('fas', 'fa-robot');
    avatarElement.appendChild(iconElement);
    
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('ai-typing');
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    
    typingElement.appendChild(avatarElement);
    typingElement.appendChild(typingIndicator);
    
    aiChatMessages.appendChild(typingElement);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }
  
  // Typing-Indikator entfernen
  function removeTypingIndicator() {
    const typingContainer = document.querySelector('.ai-typing-container');
    if (typingContainer) {
      typingContainer.remove();
    }
  }
  
  // Einfache Antwortlogik basierend auf Schlüsselwörtern
  // Hier würdest du später die API-Integration implementieren
  function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('öffnungszeit') || message.includes('offen') || message.includes('uhr')) {
      return 'Unsere Öffnungszeiten sind: Montag - Freitag: 8:00 - 18:00 Uhr, Samstag: 9:00 - 17:00 Uhr, Sonntag: 10:00 - 16:00 Uhr.';
    } else if (message.includes('frühstück') || message.includes('essen') || message.includes('speisekarte') || message.includes('menü')) {
      return 'Wir bieten verschiedene Frühstücksoptionen an, von Französischem Frühstück (9,90 €) bis zum Veganen Frühstück (12,90 €). Schauen Sie gerne in unsere Speisekarte im Angebote-Bereich.';
    } else if (message.includes('kaffee') || message.includes('getränk')) {
      return 'Wir haben eine große Auswahl an Kaffeespezialitäten, von Espresso (2,50 €) bis zu unserem Café 1a Spezial (4,50 €). Außerdem bieten wir frisch gepresste Säfte und hausgemachte Limonaden an.';
    } else if (message.includes('kuchen') || message.includes('torte') || message.includes('dessert')) {
      return 'Unsere hausgemachten Kuchen und Torten werden täglich frisch zubereitet. Besonders beliebt sind unser Apfelkuchen und unsere Schokoladentorte.';
    } else if (message.includes('reserv') || message.includes('tisch') || message.includes('platz')) {
      return 'Für Reservierungen können Sie unser Formular im Kontaktbereich nutzen oder uns direkt unter 07821 / 12345 anrufen.';
    } else if (message.includes('adresse') || message.includes('ort') || message.includes('standort') || message.includes('wo')) {
      return 'Sie finden uns in der Musterstraße 123, 77933 Lahr.';
    } else if (message.includes('kontakt') || message.includes('telefon') || message.includes('email') || message.includes('mail')) {
      return 'Sie können uns telefonisch unter 07821 / 12345 oder per E-Mail an info@cafe1a.de erreichen.';
    } else if (message.includes('danke') || message.includes('dank')) {
      return 'Gerne! Ich helfe Ihnen jederzeit weiter.';
    } else if (message.includes('hallo') || message.includes('hi') || message.includes('hey') || message.includes('servus')) {
      return 'Hallo! Wie kann ich Ihnen heute helfen?';
    } else {
      return 'Entschuldigung, ich konnte Ihre Anfrage nicht verstehen. Sie können mich nach Öffnungszeiten, Speisekarte, Reservierungen oder Kontaktinformationen fragen.';
    }
  }
});