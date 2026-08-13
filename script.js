// Pena Detailing Solutions, small, framework-free enhancements (mockup build)

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Highlight the current page in the nav
const currentPage = (location.pathname.split('/').pop() || 'index.html');
document.querySelectorAll('.nav__links a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('is-active');
  }
});

// Scroll reveal, progressive enhancement, content is fully visible without JS
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// One-time review popup, bottom-right, shows once per browser ever (localStorage),
// regardless of whether it's manually closed or the visitor just navigates away.
const promoToast = document.getElementById('promoToast');
const promoClose = document.getElementById('promoToastClose');
if (promoToast) {
  const seenKey = 'penaPromoSeen';
  if (!localStorage.getItem(seenKey)) {
    localStorage.setItem(seenKey, '1');
    setTimeout(() => promoToast.classList.add('show'), 3200);
  }
  if (promoClose) {
    promoClose.addEventListener('click', () => promoToast.classList.remove('show'));
  }
}

// Copy-phone-number button (desktop convenience since there's no email)
const copyBtn = document.getElementById('copyPhoneBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('7278700414');
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy number';
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      copyBtn.textContent = '(727) 870-0414';
    }
  });
}
