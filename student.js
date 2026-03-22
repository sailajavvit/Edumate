// ========== LOGIN PAGE ==========
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const pass = document.getElementById('pass').value.trim();
    
    // Validation
    if (name.length < 2) {
      showError('name', 'Name must be at least 2 characters');
      return;
    }
    
    if (pass.length < 6) {
      showError('pass', 'Password must be at least 6 characters');
      return;
    }
    
    // Save user
    localStorage.setItem('studentName', name);
    localStorage.setItem('studentEmail', name.toLowerCase().replace(/\s/g, '') + '@student.edu.in');
    
    // Redirect
    setTimeout(() => {
      window.location.href = 'student-dashboard.html';
    }, 500);
  });
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + 'Error');
  
  if (field && errorEl) {
    field.classList.add('error');
    errorEl.textContent = message;
  }
  
  // Clear error on input
  if (field) {
    field.addEventListener('input', function() {
      field.classList.remove('error');
      errorEl.textContent = '';
    });
  }
}

// ========== DASHBOARD PAGE ==========
document.addEventListener('DOMContentLoaded', function() {
  // Set user name
  const studentName = document.getElementById('studentName');
  const savedName = localStorage.getItem('studentName') || 'Student';
  if (studentName) {
    studentName.textContent = savedName;
  }
  
  // Sidebar toggle
  const sidebarToggle = document.getElementById('sidebarToggle');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }
  
  // Close sidebar on nav item click
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      navItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      
      const pageTitle = document.getElementById('pageTitle');
      if (pageTitle) {
        const sectionName = this.textContent.trim().split('\n')[0];
        pageTitle.textContent = sectionName;
      }
      
      // Close sidebar on mobile
      if (window.innerWidth < 768) {
        sidebar.classList.remove('active');
      }
    });
  });
  
  // Search functionality
  const searchBox = document.querySelector('.search-box input');
  if (searchBox) {
    searchBox.addEventListener('input', function(e) {
      console.log('Searching:', e.target.value);
    });
  }
});

// ========== FUNCTIONS ==========
function studentLogin() {
  const name = document.getElementById('name').value;
  const pass = document.getElementById('pass').value;

  if (name === '' || pass === '') {
    alert('Please enter all fields');
    return;
  }

  localStorage.setItem('studentName', name);
  window.location.href = 'student-dashboard.html';
}