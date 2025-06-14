let allProjects = [];

async function loadProjects() {
  try {
    const response = await fetch('assets/data/projects.json');
    if (!response.ok) throw new Error('Failed to fetch projects');
    allProjects = await response.json();

    renderProjects(allProjects);
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  container.innerHTML = '';

  if (projects.length === 0) {
    container.innerHTML = '<p>No projects found.</p>';
    return;
  }

  projects.forEach(proj => {
    const card = document.createElement('article');
    card.className = 'project-card';

    card.innerHTML = `
      <img src="${proj.image}" alt="${proj.title}" class="project-thumbnail">
      <h3>${proj.title}</h3>
      <p>${proj.description}</p>
      <a href="projects/project-detail.html?title=${encodeURIComponent(proj.title)}">Learn More</a>
    `;

    container.appendChild(card);
  });
}

// Filter projects by selected tool
function filterProjects() {
  const selectedTool = document.getElementById('toolFilter').value.toLowerCase();

  if (selectedTool === 'all') {
    renderProjects(allProjects);
  } else {
    const filtered = allProjects.filter(proj =>
      proj.tool && proj.tool.toLowerCase() === selectedTool
    );
    renderProjects(filtered);
  }
}

// Event listener for filter dropdown
window.addEventListener('DOMContentLoaded', () => {
  loadProjects();

  const filterSelect = document.getElementById('toolFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', filterProjects);
  }
});
