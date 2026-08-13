// Minimal first-party JS. Alpine handles the mobile nav; this only
// sets the footer year. Smooth scroll is handled by CSS (scroll-behavior).
document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});
