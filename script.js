// =========== PARALLAX EFFECTS ===========
const logoParallax = document.getElementById('logoParallax');

window.addEventListener('mousemove', (e) => {
  if (logoParallax) {
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;
    logoParallax.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
  }
});

// Reset parallax on mouse leave
document.addEventListener('mouseleave', () => {
  if (logoParallax) {
    logoParallax.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  }
});

// =========== PAGE NAVIGATION ===========
function goToStudent() {
  window.location.href = "student-login.html";
}

function goToFaculty() {
  window.location.href = "faculty-login.html";
}

function handleExplore() {
  document.getElementById('exploreModal').classList.add('active');
}

function closeModal() {
  document.getElementById('exploreModal').classList.remove('active');
}

// =========== MOBILE MENU ===========
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
});

// =========== NAVBAR SCROLL EFFECT ===========
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show/hide back to top button
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// =========== SMOOTH SCROLL ===========
function scrollTo(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========== SEARCH FUNCTIONALITY ===========
const courseDatabase = [
  { title: 'Web Development Basics', category: 'Programming' },
  { title: 'Advanced JavaScript', category: 'Programming' },
  { title: 'Python for Data Science', category: 'Data Science' },
  { title: 'Machine Learning 101', category: 'AI/ML' },
  { title: 'Digital Marketing Essentials', category: 'Marketing' },
  { title: 'Graphic Design Fundamentals', category: 'Design' },
  { title: 'React.js Mastery', category: 'Programming' },
  { title: 'UI/UX Design Principles', category: 'Design' },
  { title: 'Cloud Computing with AWS', category: 'Cloud' },
  { title: 'Mobile App Development', category: 'Programming' },
  { title: 'Excel for Business Analytics', category: 'Business' },
  { title: 'Communication Skills Workshop', category: 'Professional' }
];

const courseSearch = document.getElementById('courseSearch');
const searchResults = document.getElementById('searchResults');

if (courseSearch) {
  courseSearch.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query.length === 0) {
      searchResults.classList.remove('active');
      return;
    }

    const results = courseDatabase.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      searchResults.innerHTML = results.map(result =>
        `<div class="search-result-item">
          <strong>${result.title}</strong> <br>
          <small style="color: rgba(255, 255, 255, 0.6);">${result.category}</small>
        </div>`
      ).join('');
      searchResults.classList.add('active');
    } else {
      searchResults.innerHTML = '<div class="search-result-item">No courses found</div>';
      searchResults.classList.add('active');
    }
  });

  // Close search results when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
      searchResults.classList.remove('active');
    }
  });
}

// =========== FORM VALIDATION ===========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error', 'success');
    });

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate name
    if (name.length < 2) {
      showFieldError('name', 'Name must be at least 2 characters');
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFieldError('email', 'Please enter a valid email address');
      isValid = false;
    }

    // Validate subject
    if (subject.length < 3) {
      showFieldError('subject', 'Subject must be at least 3 characters');
      isValid = false;
    }

    // Validate message
    if (message.length < 10) {
      showFieldError('message', 'Message must be at least 10 characters');
      isValid = false;
    }

    if (isValid) {
      // Show success message
      showSuccessMessage();
      contactForm.reset();
      
      // Simulate sending
      console.log('Form submitted:', { name, email, subject, message });
    }
  });
}

function showFieldError(fieldId, errorMsg) {
  const field = document.getElementById(fieldId);
  const container = field.closest('.form-group');
  const errorElement = document.getElementById(fieldId + 'Error');

  container.classList.add('error');
  errorElement.textContent = errorMsg;
}

function showSuccessMessage() {
  alert('✓ Message sent successfully! We will get back to you soon.');
  // Optional: You can add a notification here instead of alert
}

// =========== MODAL ===========
const modal = document.getElementById('exploreModal');

// Close modal when clicking the X
window.addEventListener('click', function(e) {
  if (e.target === modal) {
    closeModal();
  }
});

// =========== ANIMATIONS ON SCROLL ===========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all feature cards for animation on scroll
document.querySelectorAll('.feature-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});

// =========== EASTER EGG ===========
let easterEggCount = 0;
document.querySelector('.logo')?.addEventListener('click', function() {
  easterEggCount++;
  if (easterEggCount === 5) {
    alert('🎉 You found the Easter Egg! Welcome to EduMate AI!');
    easterEggCount = 0;
  }
});

// =========== KEYBOARD SHORTCUTS ===========
document.addEventListener('keydown', function(e) {
  // Press "/" to focus search
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    courseSearch?.focus();
  }
  
  // Press "Escape" to close modal
  if (e.key === 'Escape') {
    closeModal();
  }
});

// =========== INITIALIZATION ===========
console.log('✓ EduMate AI loaded successfully!');