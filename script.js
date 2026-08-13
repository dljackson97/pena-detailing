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

// Quote-request form, progressive enhancement over Web3Forms.
// NOTE: the access_key in contact.html is a placeholder until a real one is
// generated for this client (see build-brief.md), submissions will fail
// until it's swapped in. Call/text is the working primary CTA in the meantime.
const form = document.getElementById('quote-form');
const status = document.getElementById('formStatus');

if (form && status) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const result = await response.json();

      if (result.success) {
        status.textContent = 'Got it, Sebastian will follow up shortly.';
        form.reset();
      } else {
        throw new Error(result.message || 'Something went wrong.');
      }
    } catch (err) {
      status.innerHTML = 'Something went wrong sending that, call or text '
        + '<a href="tel:7278700414">(727) 870-0414</a> directly.';
    }
  });
}
