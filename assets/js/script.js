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
      card.setAttribute('data-tool', proj.tool.toLowerCase()); // Add data-tool attribute

      card.innerHTML = `
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        <a href="${proj.link}">Learn More</a>
      `;

      container.appendChild(card);
    });

    // Setup filter event listener after projects are loaded
    const filterSelect = document.getElementById("toolFilter");
    filterSelect.addEventListener("change", function () {
      const selectedTool = this.value;

      const projectCards = container.querySelectorAll(".project-card");
      projectCards.forEach(card => {
        const tool = card.getAttribute("data-tool");
        if (selectedTool === "all" || tool === selectedTool) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });

  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

window.addEventListener('DOMContentLoaded', loadProjects);
