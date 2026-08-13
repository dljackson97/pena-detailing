// Pena Detailing Solutions — small, framework-free enhancements (mockup build)

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

// Scroll reveal — progressive enhancement, content is fully visible without JS
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

// Instant estimate widget — only the two publicly-quoted starting prices
// (mobile detail from $250, boat from $30-40/ft) are computed; everything
// else honestly points to "call or text for a quote" rather than guessing.
const estVehicle = document.getElementById('est-vehicle');
const estLength = document.getElementById('est-length');
const estResult = document.getElementById('est-result');

function renderEstimate() {
  if (!estVehicle || !estResult) return;
  const v = estVehicle.value;
  const lengthWrap = document.getElementById('est-length-wrap');

  if (v === 'boat') {
    if (lengthWrap) lengthWrap.style.display = '';
    const ft = parseFloat(estLength && estLength.value) || 0;
    if (ft > 0) {
      const low = Math.round(ft * 30);
      const high = Math.round(ft * 40);
      estResult.innerHTML = `Ballpark for a ${ft}ft boat: <strong>$${low}–$${high}</strong>`;
    } else {
      estResult.textContent = 'Enter your boat length for a ballpark estimate.';
    }
  } else {
    if (lengthWrap) lengthWrap.style.display = 'none';
    if (v === 'car' || v === 'truck') {
      estResult.innerHTML = 'Full mobile detail starts at <strong>$250</strong> — final quote depends on size and condition.';
    } else if (v === 'moped' || v === 'motorcycle' || v === 'golfcart') {
      estResult.textContent = "These are priced per job, not a flat rate — call or text (727) 870-0414 for a fast quote.";
    } else {
      estResult.textContent = 'Pick a vehicle type above for a ballpark estimate.';
    }
  }
}

if (estVehicle) {
  estVehicle.addEventListener('change', renderEstimate);
  if (estLength) estLength.addEventListener('input', renderEstimate);
  renderEstimate();
}

// Quote-request form — progressive enhancement over Web3Forms.
// NOTE: the access_key in contact.html is a placeholder until a real one is
// generated for this client (see build-brief.md) — submissions will fail
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
        status.textContent = 'Got it — Sebastian will follow up shortly.';
        form.reset();
      } else {
        throw new Error(result.message || 'Something went wrong.');
      }
    } catch (err) {
      status.innerHTML = 'Something went wrong sending that — call or text '
        + '<a href="tel:7278700414">(727) 870-0414</a> directly.';
    }
  });
}
