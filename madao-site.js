
// tema claro/escuro (persiste a escolha)
const LOGO_DARK = 'site-assets/logo-madao-branco.png', LOGO_LIGHT = 'site-assets/logo-madao-oficial-t.png';
function aplicarTema(t) {
  document.documentElement.dataset.theme = t;
  document.getElementById('logoNav').src = t === 'light' ? LOGO_LIGHT : LOGO_DARK;
  document.getElementById('logoFt').src = t === 'light' ? LOGO_LIGHT : LOGO_DARK;
  try { localStorage.setItem('madao-theme', t); } catch (e) {}
}
let temaSalvo = 'light';
try { temaSalvo = localStorage.getItem('madao-theme') || 'light'; } catch (e) {}
aplicarTema(temaSalvo);
document.getElementById('themeBtn').addEventListener('click', () =>
  aplicarTema(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));

// menu mobile
const burger = document.getElementById('burger'), menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open'); document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
}));

// reveal orquestrado com stagger
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.rv').forEach((el, i) => {
  el.style.transitionDelay = (Math.min(i % 6, 4) * 90) + 'ms';
  io.observe(el);
});

// count-up dos números (respeita reduced-motion)
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ioNum = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  ioNum.unobserve(e.target);
  const alvo = +e.target.dataset.count;
  if (reduce) { e.target.textContent = alvo; return; }
  let t0 = null;
  const tick = ts => {
    if (!t0) t0 = ts;
    const p = Math.min(1, (ts - t0) / 900);
    e.target.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => ioNum.observe(el));
