// ========== LOGIN PAGE ==========
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fname = document.getElementById('fname').value.trim();
    const fpass = document.getElementById('fpass').value.trim();
    
    // Validation
    if (fname.length < 2) {
      showError('fname', 'Faculty ID/Email must be at least 2 characters');
      return;
    }
    
    if (fpass.length < 6) {
      showError('fpass', 'Password must be at least 6 characters');
      return;
    }
    
    // Save user
    localStorage.setItem('facultyName', fname);
    localStorage.setItem('facultyID', fname);
    
    // Redirect
    setTimeout(() => {
      window.location.href = 'faculty-dashboard.html';
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
  // Set faculty name
  const facultyName = document.getElementById('facultyName');
  const savedName = localStorage.getItem('facultyName') || 'Faculty';
  if (facultyName) {
    facultyName.textContent = savedName;
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
  
  // Nav item click
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
  
  // Post form handling
  const postForm = document.getElementById('postForm');
  if (postForm) {
    postForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('title').value.trim();
      const desc = document.getElementById('desc').value.trim();
      
      if (!title || !desc) {
        alert('Please fill in all fields');
        return;
      }
      
      // Show success message
      alert('✓ Announcement posted successfully!');
      postForm.reset();
    });
  }
  
  // Search functionality
  const searchBox = document.querySelector('.search-box input');
  if (searchBox) {
    searchBox.addEventListener('input', function(e) {
      console.log('Searching:', e.target.value);
    });
  }
});

// ========== FUNCTIONS ==========
function facultyLogin() {
  const name = document.getElementById('fname').value;
  const pass = document.getElementById('fpass').value;

  if (name === '' || pass === '') {
    alert('Please enter all fields');
    return;
  }

  localStorage.setItem('facultyName', name);
  window.location.href = 'faculty-dashboard.html';
}

function addOpportunity() {
  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;
  
  if (title === '' || desc === '') {
    alert('Please fill in all fields');
    return;
  }
  
  alert('✓ Opportunity posted successfully!');
  document.getElementById('title').value = '';
  document.getElementById('desc').value = '';
}