// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.remove('active');
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form submission handler
document.getElementById('join-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const characterName = document.getElementById('character-name').value;
  const characterClass = document.getElementById('class').value;
  const characterLevel = document.getElementById('level').value;
  const message = document.getElementById('message').value;

  // In a real application, you would send this data to a server
  console.log('Form submitted:', { characterName, characterClass, characterLevel, message });

  // Show a success message
  alert(`Thank you for your interest in joining The Knights of Iluvatar, ${characterName}! An officer will contact you in-game soon.`);
  this.reset();
});

// Add parallax effect to the header
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const scrollPosition = window.pageYOffset;
  header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Intersection Observer for fade-in effect
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('i');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
  });
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Scroll to top button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});