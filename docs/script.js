// Load blog posts from JSON file (no-cache to get latest updates)
async function loadBlogs() {
  const res = await fetch('blogs.json', { cache: "no-cache" });
  return res.json();
}

// Render latest posts on homepage
async function renderLatestPosts() {
  const container = document.getElementById('latest-posts');
  if (!container) return;

  const blogs = await loadBlogs();
  const latest = blogs.slice(0, 3);

  container.innerHTML = latest.map(blog => `
    <article class="blog-card">
      <div class="blog-content">
        <div class="blog-date">${new Date(blog.date).toLocaleDateString()}</div>
        <h3 class="blog-title">${blog.title}</h3>
        <p class="blog-excerpt">${blog.excerpt}</p>
        <a href="post.html?id=${blog.id}" class="blog-link">Read More</a>
      </div>
    </article>
  `).join('');
}

// Render all posts
async function renderAllPosts() {
  const container = document.getElementById('all-posts');
  if (!container) return;

  const blogs = await loadBlogs();
  container.innerHTML = blogs.map(blog => `
    <article class="blog-card">
      <div class="blog-content">
        <div class="blog-date">${new Date(blog.date).toLocaleDateString()}</div>
        <h3 class="blog-title">${blog.title}</h3>
        <p class="blog-excerpt">${blog.excerpt}</p>
        <a href="post.html?id=${blog.id}" class="blog-link">Read More</a>
      </div>
    </article>
  `).join('');
}

// Render single post
async function renderSinglePost() {
  const container = document.getElementById('blog-post');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const blogs = await loadBlogs();
  const post = blogs.find(b => b.id === id);

  if (!post) {
    container.innerHTML = '<p>Post not found.</p>';
    return;
  }

  container.innerHTML = `
    <article>
      <div class="blog-date">${new Date(post.date).toLocaleDateString()}</div>
      <h1 class="blog-title">${post.title}</h1>
      <div class="blog-content-body">${post.content}</div>
    </article>
  `;
}

// Run render functions depending on the page
renderLatestPosts();
renderAllPosts();
renderSinglePost();
