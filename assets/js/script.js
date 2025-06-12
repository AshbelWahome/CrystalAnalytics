// Fetch projects from JSON and render them
async function loadProjects() {
  try {
    const response = await fetch('assets/data/projects.json');
    if (!response.ok) throw new Error('Failed to fetch projects');
    const projects = await response.json();

    const container = document.getElementById('projects-container');
    container.innerHTML = ''; // Clear existing content

    projects.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'project-card';

      card.innerHTML = `
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        <a href="${proj.link}">Learn More</a>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Call on page load
window.addEventListener('DOMContentLoaded', loadProjects);

