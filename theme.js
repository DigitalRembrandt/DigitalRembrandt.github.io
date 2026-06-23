/* theme.js — shared dark/light mode logic.
   Applies saved preference before paint to avoid flash of wrong theme. */
(function () {
  const saved = localStorage.getItem('dr-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark-pending');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const btn  = document.getElementById('themeToggle');

    if (document.documentElement.classList.contains('dark-pending')) {
      body.classList.add('dark');
      document.documentElement.classList.remove('dark-pending');
    }

    function updateLabel() {
      if (btn) btn.textContent = body.classList.contains('dark') ? '☀ Light' : '⏾ Dark';
    }

    updateLabel();

    if (btn) {
      btn.addEventListener('click', function () {
        body.classList.toggle('dark');
        localStorage.setItem('dr-theme', body.classList.contains('dark') ? 'dark' : 'light');
        updateLabel();
      });
    }
  });
})();
