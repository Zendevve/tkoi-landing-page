// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  mobileMenuBtn.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      // Set focus to the target element for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  });
});

// Form submission handler with validation
const joinForm = document.getElementById('join-form');
const formStatus = document.getElementById('form-status');

joinForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const characterName = document.getElementById('character-name').value.trim();
  const characterClass = document.getElementById('class').value.trim();
  const characterLevel = document.getElementById('level').value;
  const message = document.getElementById('message').value.trim();

  if (!characterName || !characterClass || !characterLevel || !message) {
    showFormStatus('Please fill out all fields.', 'error');
    return;
  }

  if (characterLevel < 1 || characterLevel > 140) {
    showFormStatus('Character level must be between 1 and 140.', 'error');
    return;
  }

  // Show loading indicator
  showFormStatus('Submitting application...', 'info');

  // Simulate form submission (replace with actual API call in production)
  setTimeout(() => {
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { characterName, characterClass, characterLevel, message });

    // Show a success message
    showFormStatus(`Thank you for your interest in joining The Knights of Iluvatar, ${characterName}! An officer will contact you in-game soon.`, 'success');
    this.reset();
  }, 1500);
});

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = type;
  formStatus.classList.remove('hidden');
}

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
    const expanded = question.getAttribute('aria-expanded') === 'true' || false;
    question.setAttribute('aria-expanded', !expanded);
    answer.classList.toggle('active');
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
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

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

// Gallery carousel functionality
const galleryCarousel = document.querySelector('.gallery-carousel');
const galleryImages = galleryCarousel.querySelectorAll('img');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');
let currentIndex = 0;

function showImage(index) {
  galleryCarousel.style.transform = `translateX(-${index * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});

// Touch swipe functionality for gallery
let touchStartX = 0;
let touchEndX = 0;

galleryCarousel.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

galleryCarousel.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    // Swipe left
    nextBtn.click();
  } else if (touchEndX - touchStartX > 50) {
    // Swipe right
    prevBtn.click();
  }
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    lightbox.style.display = 'block';
    currentIndex = index;
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'block') {
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      updateLightboxImage();
    } else if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    }
  }
});

function updateLightboxImage() {
  const img = galleryImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
} else {
  // Fallback for browsers that don't support IntersectionObserver
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
}

// Add animation to features on scroll
const features = document.querySelectorAll('.feature');
const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.5s ease-out forwards';
      featureObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

features.forEach(feature => {
  featureObserver.observe(feature);
});
