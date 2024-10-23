// Particle background
const particleBackground = document.getElementById('particle-background');
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
  particle.style.animationDelay = `${Math.random() * 2}s`;
  particleBackground.appendChild(particle);
}

// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });

    // Close mobile menu after clicking a link
    if (navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
    }
  });
});

// Dynamic header background on scroll
const header = document.querySelector('header');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
  if (window.scrollY > heroSection.offsetHeight - header.offsetHeight) {
    header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
  } else {
    header.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
  }
});

// Intersection Observer for fade-in effect
const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('section > *').forEach(element => {
  fadeInObserver.observe(element);
});

// Parallax effect for sections
const parallaxSections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;

  parallaxSections.forEach((section, index) => {
    const speed = index % 2 === 0 ? 0.5 : -0.5;
    section.style.backgroundPositionY = `${scrollPosition * speed}px`;
  });
});

// Image modal for gallery
const galleryImages = document.querySelectorAll('.gallery-image');
const body = document.body;

galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.classList.add('image-modal');

    const modalImage = document.createElement('img');
    modalImage.src = image.src;
    modalImage.alt = image.alt;

    const caption = document.createElement('p');
    caption.textContent = image.alt;
    caption.classList.add('modal-caption');

    modal.appendChild(modalImage);
    modal.appendChild(caption);
    body.appendChild(modal);

    setTimeout(() => {
      modal.classList.add('show');
    }, 50);

    modal.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => {
        body.removeChild(modal);
      }, 300);
    });
  });
});

// Elvish text hover effect
const elvishPhrases = [
  "Elen síla lúmenn' omentielvo",
  "Aiya Eärendil Elenion Ancalima",
  "Namárië",
  "Mellon",
  "A Elbereth Gilthoniel"
];

const heroContent = document.querySelector('.hero-content');

heroContent.addEventListener('mousemove', (e) => {
  const elvishText = document.createElement('span');
  elvishText.textContent = elvishPhrases[Math.floor(Math.random() * elvishPhrases.length)];
  elvishText.classList.add('elvish-text');
  elvishText.style.left = `${e.clientX}px`;
  elvishText.style.top = `${e.clientY}px`;
  heroContent.appendChild(elvishText);

  setTimeout(() => {
    elvishText.remove();
  }, 2000);
});

// Glowing effect for section titles
const sectionTitles = document.querySelectorAll('.section-title');

sectionTitles.forEach(title => {
  title.addEventListener('mouseover', () => {
    title.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)';
  });

  title.addEventListener('mouseout', () => {
    title.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
  });
});

// Interactive member cards
const memberCards = document.querySelectorAll('.member-card');

memberCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.05) rotateY(10deg)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1) rotateY(0)';
  });
});

// Responsive video sizing
function resizeVideo() {
  const video = document.getElementById('hero-video');
  const heroSection = document.getElementById('hero');

  if (window.innerWidth / window.innerHeight > 16 / 9) {
    video.style.width = '100%';
    video.style.height = 'auto';
  } else {
    video.style.width = 'auto';
    video.style.height = '100%';
  }
}

window.addEventListener('resize', resizeVideo);
resizeVideo();
