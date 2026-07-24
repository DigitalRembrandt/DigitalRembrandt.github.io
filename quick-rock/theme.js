/* theme.js — dark/light mode + mobile hamburger menu for all Solitaire Elite pages. */

(function () {
  // Apply saved theme before paint to avoid flash
  const saved = localStorage.getItem('dr-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark-pending');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;

    // Apply pending dark class to body
    if (document.documentElement.classList.contains('dark-pending')) {
      body.classList.add('dark');
      document.documentElement.classList.remove('dark-pending');
    }

    // Update labels on all theme toggle buttons (desktop + mobile)
    function updateAllLabels() {
      const isDark = body.classList.contains('dark');
      document.querySelectorAll('#themeToggle, #themeToggleMobile').forEach(btn => {
        btn.textContent = isDark ? '☀ Light' : '⏾ Dark';
      });
    }

    updateAllLabels();

    // Toggle handler — used by both desktop and mobile buttons
    function toggleTheme() {
      body.classList.toggle('dark');
      localStorage.setItem('dr-theme', body.classList.contains('dark') ? 'dark' : 'light');
      updateAllLabels();
    }

    const desktopToggle = document.getElementById('themeToggle');
    if (desktopToggle) desktopToggle.addEventListener('click', toggleTheme);

    const mobileToggle = document.getElementById('themeToggleMobile');
    if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);

    // Hamburger — opens/closes the mobile dropdown menu
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('navMobileMenu');

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
      });

      // Close menu when a nav link is tapped
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
        });
      });
    }
  });
})();
