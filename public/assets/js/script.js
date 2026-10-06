const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('jairo-theme');
if (savedTheme === 'dark') body.classList.add('dark');

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('jairo-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();
