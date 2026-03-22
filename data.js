// ========== OPPORTUNITIES DATA ==========
let opportunities = JSON.parse(localStorage.getItem('opp')) || [
  {
    title: 'Summer Internship at Tech Company',
    desc: '6-month internship with mentoring, work on real projects, competitive stipend, and potential for permanent placement.',
    posted: '2 days ago',
    urgent: true
  },
  {
    title: 'Freelance Web Development Project',
    desc: 'Build a responsive website for a startup, using React and Firebase. Portfolio opportunity with good pay.',
    posted: '5 days ago',
    urgent: false
  },
  {
    title: 'Data Science Research Fellowship',
    desc: 'Full-time research fellowship in AI/ML, collaborate with professors, publish papers, gain research experience.',
    posted: '1 week ago',
    urgent: false
  }
];

// ========== ADD OPPORTUNITY ==========
function addOpportunity() {
  const title = document.getElementById('title').value.trim();
  const desc = document.getElementById('desc').value.trim();

  if (!title || !desc) {
    alert('Please fill in all fields');
    return;
  }

  opportunities.unshift({
    title: title,
    desc: desc,
    posted: 'just now',
    urgent: false
  });

  localStorage.setItem('opp', JSON.stringify(opportunities));
  
  // Update display
  displayOpportunities();
  
  // Reset form
  document.getElementById('title').value = '';
  document.getElementById('desc').value = '';
  
  alert('✓ Opportunity posted successfully!');
}

// ========== DISPLAY OPPORTUNITIES ==========
function displayOpportunities() {
  const container = document.getElementById('opportunities');
  
  if (!container) return;
  
  if (opportunities.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5); padding: 20px;">No opportunities posted yet</p>';
    return;
  }

  container.innerHTML = opportunities.map((opp, index) => `
    <div class="opportunity-item" style="animation-delay: ${index * 0.1}s;">
      <div class="opp-icon">
        <i class="fas ${opp.urgent ? 'fa-bolt' : 'fa-star'}"></i>
      </div>
      <div class="opp-info">
        <h4>${opp.title}</h4>
        <p>${opp.desc}</p>
        <span class="opp-meta">${opp.posted}</span>
      </div>
      <button class="apply-btn" onclick="applyOpportunity('${opp.title}')">Apply</button>
    </div>
  `).join('');
}

function applyOpportunity(title) {
  alert(`✓ Application sent for: "${title}"`);
}

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
  displayOpportunities();
});