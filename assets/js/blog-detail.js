function getSlugParam() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('slug');
}

async function loadBlogDetail() {
  const slug = getSlugParam();
  if (!slug) return;

  const titleEl = document.getElementById('blog-title');
  const dateEl = document.getElementById('blog-date');
  const contentEl = document.getElementById('blog-content');
  const imageEl = document.getElementById('blog-image');

  try {
    const response = await fetch('assets/data/blog.json');
    const blogs = await response.json();
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
      titleEl.textContent = 'Blog post not found.';
      return;
    }

    // Display blog content
    titleEl.textContent = blog.title;
    dateEl.textContent = new Date(blog.date).toLocaleDateString();
    contentEl.textContent = blog.content || blog.summary;
    imageEl.src = blog.image;
    imageEl.alt = blog.title;

    // SEO metadata
    document.title = `${blog.title} | Crystal Analytics`;
    document.getElementById('meta-description').setAttribute('content', blog.summary);
    document.getElementById('og-title').setAttribute('content', blog.title);
    document.getElementById('og-description').setAttribute('content', blog.summary);
    document.getElementById('og-image').setAttribute('content', `${window.location.origin}/${blog.image}`);
    document.getElementById('og-url').setAttribute('content', window.location.href);
    document.getElementById('twitter-title').setAttribute('content', blog.title);
    document.getElementById('twitter-description').setAttribute('content', blog.summary);
    document.getElementById('twitter-image').setAttribute('content', `${window.location.origin}/${blog.image}`);

  } catch (err) {
    console.error('Failed to load blog post', err);
    contentEl.textContent = 'Error loading blog post.';
  }
}

window.addEventListener('DOMContentLoaded', loadBlogDetail);

