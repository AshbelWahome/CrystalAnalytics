// Helper: get query param from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Helper: update meta tag by ID or create it
function updateMeta(id, attr, value) {
  let tag = document.getElementById(id);
  if (!tag) {
    tag = document.createElement('meta');
    tag.id = id;
    tag.setAttribute(attr === 'name' ? 'name' : 'property', id.replace(/^(og|twitter)-/, ''));
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, id.replace(/^(og|twitter)-/, ''));
  tag.setAttribute('content', value);
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
    const project = projects.find(p => p.title.toLowerCase() === decodeURIComponent(titleParam).toLowerCase());

    if (!project) {
      container.innerHTML = '<p>Project not found.</p>';
      return;
    }

    // Render project content
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

    // 🧠 SEO & Social Meta Tags
    const pageTitle = `${project.title} | Crystal Analytics`;
    document.title = pageTitle;

    const pageDescription = project.description || 'A data project by Crystal Analytics';
    const imageUrl = new URL(`../${project.image}`, window.location.origin).href;
    const pageUrl = window.location.href;

    // Standard meta
    updateMeta('meta-description', 'name', pageDescription);

    // Open Graph
    updateMeta('og-title', 'property', pageTitle);
    updateMeta('og-description', 'property', pageDescription);
    updateMeta('og-image', 'property', imageUrl);
    updateMeta('og-url', 'property', pageUrl);

    // Twitter
    updateMeta('twitter-title', 'name', pageTitle);
    updateMeta('twitter-description', 'name', pageDescription);
    updateMeta('twitter-image', 'name', imageUrl);

  } catch (error) {
    console.error('Error loading project detail:', error);
    container.innerHTML = '<p>Failed to load project details.</p>';
  }
}

window.addEventListener('DOMContentLoaded', loadProjectDetail);
