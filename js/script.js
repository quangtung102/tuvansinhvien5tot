// Navigation: bật/tắt section khi click menu
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    // ẩn hết
    sections.forEach(s => s.classList.remove('active-section'));
    // active section
    const sec = document.getElementById(id);
    if (sec) sec.classList.add('active-section');
    // active menu
    links.forEach(a => a.classList.toggle('active', a.dataset.section === id));
    // focus main
    const main = document.getElementById('mainContent');
    if (main) main.focus();
  }

  // bind click
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.dataset.section;
      showSection(id);
      // scroll to top of main
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // mở mặc định trang chủ
  showSection('home');
});
