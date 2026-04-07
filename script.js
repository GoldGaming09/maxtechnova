/** Modern JS for AI Expo Maxfort - Professional Interactions */
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for nav links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Modal handling (for register if inline)
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    const openBtns = document.querySelectorAll(`[data-modal="${modal.id}"]`);
    const closeBtns = modal.querySelectorAll('.close');
    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'block';
      });
    });
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    });
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Register form handling
  const registerForms = document.querySelectorAll('.register-form');
  registerForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const whatsapp = form.querySelector('#whatsapp').value.trim();
      const email = form.querySelector('#email').value.trim();

      // Simple validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const whatsappRegex = /^\+?[\d\s-()]{10,15}$/;
      if (!name || !whatsapp || !email || !emailRegex.test(email) || !whatsappRegex.test(whatsapp)) {
        alert('Please fill all fields correctly: Valid name, WhatsApp (10+ digits), email.');
        return;
      }

      // Show committees selection (hide form, show list)
      const committeesSection = form.parentElement.querySelector('.committees-selection');
      if (committeesSection) {
        form.style.display = 'none';
        committeesSection.style.display = 'block';
        form.parentElement.querySelector('h2').textContent = `Hi ${name}! Choose committees:`;
      }
    });
  });

  // Committees submit
  const committeesForms = document.querySelectorAll('.committees-form');
  committeesForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const checkboxes = form.querySelectorAll('input[name="committee"]:checked');
      if (checkboxes.length === 0) {
        alert('Select at least one committee!');
        return;
      }
      const selected = Array.from(checkboxes).map(cb => cb.value);
      const data = {
        timestamp: new Date().toISOString(),
        committees: selected
      };
      localStorage.setItem('aiExpoRegistration', JSON.stringify(data));
      alert(`Registration successful for ${selected.join(', ')}! We\'ll contact you via WhatsApp/email.`);
      form.reset();
      // Hide committees, show success
      const container = form.parentElement;
      container.innerHTML = '<p style="text-align:center; font-size:1.2rem; color:#3b82f6;">Thank you! Check your email/WhatsApp for confirmation.</p>';
    });
  });

  // Questions form mailto
  const questionForms = document.querySelectorAll('.question-form');
  questionForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = form.querySelector('#question').value.trim();
      const userEmail = form.querySelector('#user-email').value.trim();
      if (!question) {
        alert('Please enter your question.');
        return;
      }
      const subject = 'AI Expo Maxfort Question';
      const body = `Question: ${question}\nFrom: ${userEmail || 'Anonymous'} from ${window.location.href}`;
      window.location.href = `mailto:yoyoyoakshat09@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });

  // Fade-in animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });
  document.querySelectorAll('.committee-card, .hero').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
  });

  // Mobile nav toggle if needed
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const navUl = document.querySelector('nav ul');
      navUl.classList.toggle('active');
    });
  }
});
