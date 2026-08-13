// Pena Detailing Solutions — small, framework-free enhancements (mockup build)

// Quote-request form — progressive enhancement over Web3Forms.
// NOTE: the access_key in index.html is a placeholder until a real one is
// generated for this client (see build-brief.md) — submissions will fail
// until it's swapped in. Call/text is the working primary CTA in the meantime.
const form = document.getElementById('quote-form');
const status = document.getElementById('formStatus');
const defaultStatusText = status ? status.textContent : '';

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
        status.textContent = "Got it — Sebastian will follow up shortly.";
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
