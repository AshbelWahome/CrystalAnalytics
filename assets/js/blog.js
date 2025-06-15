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

// Fetch and render blog posts
async function loadBlogs() {
  try {
    const response = await fetch('assets/data/blogs.json');
    if (!response.ok) throw new Error('Could not load blogs');
    const blogs = await response.json();

    const container = document.getElementById('blog-container');
    container.innerHTML = '';

    blogs.forEach(blog => {
      const post = document.createElement('div');
      post.className = 'blog-post fade-in';

      const tags = blog.tags.map(tag => `<span>${tag}</span>`).join('');

      post.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}">
        <div class="blog-post-content">
          <h3>${blog.title}</h3>
          <div class="meta">${blog.date}</div>
          <div class="tags">${tags}</div>
          <a href="${blog.link}" class="button">Read More</a>
        </div>
      `;

      container.appendChild(post);
    });
  } catch (error) {
    console.error('Error loading blogs:', error);
  }
}

window.addEventListener('DOMContentLoaded', loadBlogs);
