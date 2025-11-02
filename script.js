// Portfolio filtering functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projects.forEach((project) => {
      if (filter === 'all' || project.classList.contains(filter)) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
  });
});
