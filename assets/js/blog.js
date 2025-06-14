let allPosts = [];

async function loadBlogPosts() {
  try {
    const response = await fetch('assets/data/blog.json');
    const posts = await response.json();
    allPosts = posts;

    renderBlogPosts(allPosts);
  } catch (error) {
    console.error('Failed to load blog posts:', error);
  }
}

function renderBlogPosts(posts) {
  const container = document.getElementById('blog-container');
  container.innerHTML = '';

  if (!posts || posts.length === 0) {
    container.innerHTML = '<p>No blog posts found.</p>';
    return;
  }

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'col-6 col-12-medium';

    card.innerHTML = `
      <section class="box">
        <a href="blog-detail.html?slug=${post.slug}" class="image fit">
          <img src="${post.image}" alt="${post.title}">
        </a>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <small>${new Date(post.date).toLocaleDateString()}</small>
        <div class="tags">
          ${post.tags ? post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ') : ''}
        </div>
        <a href="blog-detail.html?slug=${post.slug}" class="button">Read More</a>
      </section>
    `;

    container.appendChild(card);
  });
}

function filterByTag() {
  const selectedTag = document.getElementById('tagFilter')?.value;

  const filtered = selectedTag === 'all'
    ? allPosts
    : allPosts.filter(post => post.tags?.includes(selectedTag));

  renderBlogPosts(filtered);
}

window.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();

  const tagSelect = document.getElementById('tagFilter');
  if (tagSelect) {
    tagSelect.addEventListener('change', filterByTag);
  }
});
