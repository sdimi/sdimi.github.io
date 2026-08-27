document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('#main-nav a');
  const sections = document.querySelectorAll('.page-section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (e) e.preventDefault();
      const targetId = link.getAttribute('data-target');

      // Update active state on nav links
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Hide all sections, show target section
      sections.forEach(section => {
        if (section.id === targetId) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
      
      // Update the URL hash for permalinking
      history.pushState(null, null, '#' + targetId);

      // Optionally scroll to top on mobile
      if(window.innerWidth <= 600) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Check if a hash is present in the URL on load
  if (window.location.hash) {
    const hashTarget = window.location.hash.substring(1);
    const targetLink = document.querySelector(`#main-nav a[data-target="${hashTarget}"]`);
    if (targetLink) {
      targetLink.click();
    }
  }

  // News "Show more" functionality
  const newsItems = [];
  const h2Elements = document.querySelectorAll('h2');
  let newsHeader = null;
  for (const h2 of h2Elements) {
    if (h2.textContent.trim() === 'News') {
      newsHeader = h2;
      break;
    }
  }

  if (newsHeader) {
    let current = newsHeader.nextElementSibling;
    while (current && current.classList && current.classList.contains('news-item')) {
      newsItems.push(current);
      current = current.nextElementSibling;
    }

    const showMoreBtn = document.getElementById('show-more-news-btn');
    if (newsItems.length > 5 && showMoreBtn) {
      // Hide items beyond the first 5
      for (let i = 5; i < newsItems.length; i++) {
        newsItems[i].style.display = 'none';
      }
      showMoreBtn.style.display = 'block';

      showMoreBtn.addEventListener('click', () => {
        for (let i = 5; i < newsItems.length; i++) {
          newsItems[i].style.display = '';
        }
        showMoreBtn.style.display = 'none';
      });
    }
  }
});
