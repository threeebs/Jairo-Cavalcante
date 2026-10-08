const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('jairo-theme'); } catch {}
if (savedTheme === 'dark') body.classList.add('dark');
themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  try { localStorage.setItem('jairo-theme', body.classList.contains('dark') ? 'dark' : 'light'); } catch {}
});
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
function closeMenu() { nav?.classList.remove('open'); navToggle?.setAttribute('aria-expanded', 'false'); }
navToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (nav?.classList.contains('open') && !event.target.closest('.nav-wrap')) closeMenu();
});
const elements = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion || !('IntersectionObserver' in window)) {
  elements.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
  elements.forEach(el => observer.observe(el));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
