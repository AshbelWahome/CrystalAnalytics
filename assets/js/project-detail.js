// Helper: get query param from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function loadProjectDetail() {
  const titleParam = getQueryParam('title');
  const container = document.getElementById('project-detail-container');

  if (!titleParam) {
    container.innerHTML = '<p>No project specified.</p>';
    return;
  }

  try {
    const response = await fetch('../assets/data/projects.json');
    if (!response.ok) throw new Error('Failed to fetch projects');

    const projects = await response.json();
    // Find project by title (case-insensitive)
    const project = projects.find(p => p.title.toLowerCase() === decodeURIComponent(titleParam).toLowerCase());

    if (!project) {
      container.innerHTML = '<p>Project not found.</p>';
      return;
    }

    // Render project details
    container.innerHTML = `
      <h1>${project.title}</h1>
      <img src="../${project.image}" alt="${project.title}" class="project-image" />
      <p>${project.description}</p>
      <ul>
        <li><strong>Tool:</strong> ${project.tool || 'N/A'}</li>
        <li><strong>Industry:</strong> ${project.industry || 'N/A'}</li>
        <li><strong>Tech Stack:</strong> ${project.techStack || 'N/A'}</li>
      </ul>
      <a href="../projects.html">← Back to Projects</a>
    `;
  } catch (error) {
    console.error('Error loading project detail:', error);
    container.innerHTML = '<p>Failed to load project details.</p>';
  }
}

window.addEventListener('DOMContentLoaded', loadProjectDetail);

