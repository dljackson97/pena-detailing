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
// The mobile sticky call/text bar stays hidden until the popup has been shown
// and dismissed, so the two never stack up and clutter the bottom of the screen,
// unless the popup has already been seen on a prior visit, in which case the
// bar is free to show right away since the popup won't appear again.
const promoToast = document.getElementById('promoToast');
const promoClose = document.getElementById('promoToastClose');
const stickyCall = document.querySelector('.sticky-call');

function revealStickyCall() {
  if (stickyCall) stickyCall.classList.add('show');
  document.body.classList.add('sticky-call-visible');
}

if (promoToast) {
  const seenKey = 'penaPromoSeen';
  if (!localStorage.getItem(seenKey)) {
    localStorage.setItem(seenKey, '1');
    setTimeout(() => promoToast.classList.add('show'), 3200);
  } else {
    revealStickyCall();
  }
  if (promoClose) {
    promoClose.addEventListener('click', () => {
      promoToast.classList.remove('show');
      revealStickyCall();
    });
  }
} else {
  revealStickyCall();
}

// Auto-advancing photo slideshow (used for the real Nissan Rogue "after" tile)
document.querySelectorAll('.tile-slideshow').forEach((tile) => {
  const imgs = tile.querySelectorAll('img');
  const dots = tile.querySelectorAll('.slide-dots button');
  let index = 0;
  let timer;

  function show(i) {
    imgs.forEach((img, n) => img.classList.toggle('active', n === i));
    dots.forEach((dot, n) => dot.classList.toggle('active', n === i));
    index = i;
  }

  function next() { show((index + 1) % imgs.length); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 3200);
  }

  dots.forEach((dot, n) => {
    dot.addEventListener('click', (event) => {
      event.stopPropagation();
      show(n);
      restart();
    });
  });

  if (imgs.length > 1) restart();
});

// Lightbox for the gallery's featured showcase images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
}

document.querySelectorAll('.showcase-media').forEach((media) => {
  media.addEventListener('click', (event) => {
    if (event.target.closest('.slide-dots')) return;
    const activeImg = media.querySelector('img.active') || media.querySelector('img');
    if (activeImg) openLightbox(activeImg.src, activeImg.alt);
  });
});
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

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
