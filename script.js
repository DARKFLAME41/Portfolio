// ===========================
// Dark mode toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-toggle__icon') : null;
const root = document.documentElement;

function setThemeIcon(theme) {
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

setThemeIcon(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    if (next === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    setThemeIcon(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
}

// ===========================
// Project data & modal (original logic, preserved)
// ===========================
const projects = {
  campus: {
    title: 'Campus Connect',
    desc: 'A collaboration platform for students to share notes, discuss, and find teammates.',
    points: ['Login & Signup', 'Notes Sharing', 'Discussion Forum', 'Event Announcements', 'Team Finder', 'Admin Dashboard', 'Real-time Notifications'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/DARKFLAME41'
  },
  traffic: {
    title: 'Traffic Management System',
    desc: 'A C++ based system for monitoring and managing traffic in real time.',
    points: ['Vehicle Tracking', 'Traffic Monitoring', 'OOP Concepts', 'Exception Handling', 'File Handling', 'Real-time Updates'],
    tech: ['C++', 'OOP', 'File Handling'],
    github: 'https://github.com/DARKFLAME41'
  },
  court: {
    title: 'Court Case Management System',
    desc: 'A Java application for tracking court cases, lawyers, and hearing schedules.',
    points: ['Case Registration', 'Case Status Tracking', 'Lawyer Records', 'Hearing Schedules', 'Database Storage', 'Reports'],
    tech: ['Java', 'OOPS', 'MySQL'],
    github: 'https://github.com/DARKFLAME41'
  }
};

const modal = document.getElementById('modal');

function openProject(id) {
  const project = projects[id];
  document.getElementById('title').innerText = project.title;
  document.getElementById('desc').innerText = project.desc;

  const techPoints = project.tech.map(x => `<li>${x}</li>`).join('');
  document.getElementById('points').innerHTML = techPoints;

  const linksEl = document.getElementById('modalLinks');
  linksEl.innerHTML = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener">View on GitHub →</a>`
    : '';

  modal.classList.add('is-open');
}

function closeProject() {
  modal.classList.remove('is-open');
}

// Close modal on outside click or Escape
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeProject();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) closeProject();
});

// ===========================
// Cursor blob follow
// ===========================
const blob = document.getElementById('blob');
let mouseX = 0, mouseY = 0, blobX = 0, blobY = 0;
const isTouch = window.matchMedia('(hover: none)').matches;

if (!isTouch && blob) {
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateBlob = () => {
    blobX += (mouseX - blobX) * 0.15;
    blobY += (mouseY - blobY) * 0.15;
    blob.style.left = `${blobX}px`;
    blob.style.top = `${blobY}px`;
    requestAnimationFrame(animateBlob);
  };
  animateBlob();

  document.querySelectorAll('a, button, .card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      blob.style.width = '56px';
      blob.style.height = '56px';
      blob.style.background = 'var(--coral)';
    });
    el.addEventListener('mouseleave', () => {
      blob.style.width = '28px';
      blob.style.height = '28px';
      blob.style.background = 'var(--sun)';
    });
  });
}

// ===========================
// Mobile nav toggle
// ===========================
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
    });
  });
}

// ===========================
// Scroll reveal animations
// ===========================
const revealTargets = document.querySelectorAll('.card, .about__visual, .about__content, .skills-group, .timeline__item, .achieve-card, .contact');
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));

// ===========================
// Subtle card tilt on mouse move
// ===========================
if (!isTouch) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      card.style.transform = `translate(-4px, -4px) rotate(${x * 1.5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ===========================
// Certificate lightbox
// ===========================
function openCert(imgSrc, title, sub) {
  document.getElementById('certModalImg').src = imgSrc;
  document.getElementById('certModalTitle').textContent = title;
  document.getElementById('certModalSub').textContent = sub;
  document.getElementById('certModal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  document.getElementById('certModal').classList.remove('is-open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCert();
});
