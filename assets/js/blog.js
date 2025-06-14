async function loadBlogPosts() {
  try {
    const response = await fetch('assets/data/blog.json');
    const posts = await response.json();

    const container = document.getElementById('blog-container');
    container.innerHTML = '';

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
          <a href="blog-detail.html?slug=${post.slug}" class="button">Read More</a>
        </section>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load blog posts:', error);
  }
}

window.addEventListener('DOMContentLoaded', loadBlogPosts);

