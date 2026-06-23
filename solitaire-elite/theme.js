/* theme.js — shared dark/light mode logic for all Solitaire Elite pages.
   Include this script in every page's <head> (before the closing </head>)
   to apply the saved preference instantly and avoid a flash of wrong theme. */

(function () {
  // Apply saved theme immediately — runs before paint to avoid flash
  const saved = localStorage.getItem('dr-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark-pending');
  }

  // Once DOM is ready, move the class to body and wire up the toggle button
  document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const btn  = document.getElementById('themeToggle');

    // Carry over class applied to <html> above
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
