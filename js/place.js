/**
 * place.js — Dynamic place detail page
 * Reads ?id= from URL, finds matching entry in global PLACES, renders the page.
 * Fathima Balika Muslim Maha Vidyalaya — Environmental Project Showcase
 */

/* --------------------------------------------------------------------------
   URL & data helpers
   -------------------------------------------------------------------------- */

/** Read the numeric "id" query parameter from the current URL */
function getPlaceIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('id');
  if (raw === null || raw === '') return null;
  const id = parseInt(raw, 10);
  return Number.isNaN(id) ? null : id;
}

/** Find a place object by id; returns undefined if not found */
function findPlaceById(id) {
  if (typeof PLACES === 'undefined') return undefined;
  return PLACES.find((p) => p.id === id);
}

/** Index of place in PLACES array (-1 if missing) */
function getPlaceIndex(id) {
  if (typeof PLACES === 'undefined') return -1;
  return PLACES.findIndex((p) => p.id === id);
}

/**
 * Update document title and Open Graph / Twitter meta tags for social sharing.
 * @param {{ title: string, description: string, image?: string }} meta
 */
function updatePageMeta({ title, description, image = 'assets/images/After_ENV_01.jpg' }) {
  document.title = title;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.content = description;

  const absImage = resolveAbsoluteUrl(image);
  const setContent = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('content', value);
  };

  setContent('og-title', title);
  setContent('og-description', description);
  setContent('og-image', absImage);
  setContent('og-url', window.location.href);
  setContent('twitter-title', title);
  setContent('twitter-description', description);
  setContent('twitter-image', absImage);
}

/* --------------------------------------------------------------------------
   Before / After comparison slider
   -------------------------------------------------------------------------- */

/**
 * Initialize a drag-to-compare image slider.
 *
 * How it works:
 * 1. The BEFORE image is the base layer (always fully visible).
 * 2. The AFTER image sits in an absolutely-positioned wrapper on top.
 * 3. CSS clip-path on the wrapper reveals only the RIGHT portion of the
 *    after image: inset(0 0 0 X%) clips away the left X%, showing the rest.
 * 4. A vertical handle tracks the split position via the --split CSS variable.
 * 5. Mouse/touch events update --split as a percentage of container width.
 *
 * @param {HTMLElement} container - Element with class .ba-slider
 */
function initBeforeAfterSlider(container) {
  if (!container) return;

  let isDragging = false;
  let splitPercent = 50;

  /** Clamp value between min and max */
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  /**
   * Update split position from a pixel X coordinate relative to the container.
   * Writes --split (for clip-path) and --split-px (for handle transform).
   */
  function setSplitFromClientX(clientX) {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = clamp((x / rect.width) * 100, 2, 98);
    splitPercent = percent;
    const splitStr = `${percent}%`;
    const pixelX = (percent / 100) * rect.width;
    container.style.setProperty('--split', splitStr);
    container.style.setProperty('--split-px', `${pixelX}px`);
    container.setAttribute('aria-valuenow', Math.round(percent));
  }

  /** Re-apply split on window resize without resetting user position */
  function refreshSplitPosition() {
    const rect = container.getBoundingClientRect();
    const pixelX = (splitPercent / 100) * rect.width;
    container.style.setProperty('--split', `${splitPercent}%`);
    container.style.setProperty('--split-px', `${pixelX}px`);
  }

  /** Begin drag — attach move/end listeners on document for smooth tracking */
  function startDrag(clientX) {
    isDragging = true;
    container.classList.add('is-dragging');
    setSplitFromClientX(clientX);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', endDrag);
  }

  function endDrag() {
    isDragging = false;
    container.classList.remove('is-dragging');
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', endDrag);
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    setSplitFromClientX(e.clientX);
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    setSplitFromClientX(e.touches[0].clientX);
  }

  // Click/touch anywhere on slider to jump handle position
  container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startDrag(e.clientX);
  });

  container.addEventListener('touchstart', (e) => {
    startDrag(e.touches[0].clientX);
  }, { passive: true });

  // Set initial 50% split
  container.style.setProperty('--split', '50%');
  refreshSplitPosition();

  // Match after-layer height to the before image once loaded
  const beforeImg = container.querySelector('.ba-slider__before');
  const afterWrap = container.querySelector('.ba-slider__after-wrap');

  function syncHeights() {
    if (beforeImg && afterWrap && beforeImg.offsetHeight) {
      container.style.minHeight = `${beforeImg.offsetHeight}px`;
    }
    refreshSplitPosition();
  }

  if (beforeImg) {
    if (beforeImg.complete) syncHeights();
    else beforeImg.addEventListener('load', syncHeights);
  }

  window.addEventListener('resize', syncHeights);
}

/* --------------------------------------------------------------------------
   Render helpers
   -------------------------------------------------------------------------- */

/** Build pill chips for a list of names */
function renderChips(names) {
  if (!names || !names.length) {
    return '<p class="text-forest/50 text-sm italic">None listed yet</p>';
  }
  return `<div class="flex flex-wrap gap-2">${names
    .map((name) => `<span class="team-chip">${escapeHtml(name)}</span>`)
    .join('')}</div>`;
}

/** Build prev / next navigation footer */
function renderPlaceNav(currentId) {
  const index = getPlaceIndex(currentId);
  const prev = index > 0 ? PLACES[index - 1] : null;
  const next = index >= 0 && index < PLACES.length - 1 ? PLACES[index + 1] : null;

  return `
    <nav class="fade-in-section flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4" aria-label="Place navigation">
      <div class="w-full sm:w-auto flex justify-center sm:justify-start">
        ${
          prev
            ? `<a href="place.html?id=${prev.id}" class="inline-flex items-center justify-center gap-2 text-sm font-semibold text-forest hover:text-amber transition-colors px-5 py-2.5 rounded-full border border-sage/30 hover:border-amber/50 hover:bg-sage/5 w-full sm:w-auto">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                Previous Place
              </a>`
            : ''
        }
      </div>
      <a href="index.html#places" class="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-forest hover:bg-forest-light text-cream px-6 py-2.5 rounded-full transition-colors shadow-md w-full sm:w-auto">
        Back to All Places
      </a>
      <div class="w-full sm:w-auto flex justify-center sm:justify-end">
        ${
          next
            ? `<a href="place.html?id=${next.id}" class="inline-flex items-center justify-center gap-2 text-sm font-semibold text-forest hover:text-amber transition-colors px-5 py-2.5 rounded-full border border-sage/30 hover:border-amber/50 hover:bg-sage/5 w-full sm:w-auto">
                Next Place
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </a>`
            : ''
        }
      </div>
    </nav>
  `;
}

/** Render the full place detail page */
function renderPlace(place) {
  const container = document.getElementById('place-content');
  if (!container) return;

  updatePageMeta({
    title: `${place.placeName} | Environmental Project`,
    description: place.description,
    image: place.afterImage || 'assets/images/After_ENV_01.jpg',
  });

  container.innerHTML = `
    <!-- Header -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 text-center place-header">
      <span class="inline-block bg-amber/15 text-amber-dark font-heading font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
        ${escapeHtml(place.projectNo)}
      </span>
      <h1 class="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest mb-4 leading-tight">
        ${escapeHtml(place.placeName)}
      </h1>
      <p class="text-sage-dark text-base sm:text-lg flex items-center justify-center gap-2">
        <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        ${escapeHtml(place.location)}
      </p>
    </section>

    <!-- Before / After Slider -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 fade-in-section">
      <div
        class="ba-slider"
        role="slider"
        aria-label="Before and after comparison"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="50"
      >
        <img
          class="ba-slider__before"
          src="${escapeHtml(place.beforeImage)}"
          alt="Before — ${escapeHtml(place.placeName)}"
          draggable="false"
          onerror="handleImageError(this, 'cover')"
        />
        <div class="ba-slider__after-wrap">
          <img
            class="ba-slider__after"
            src="${escapeHtml(place.afterImage)}"
            alt="AI Generated Future — ${escapeHtml(place.placeName)}"
            draggable="false"
            onerror="handleImageError(this, 'cover')"
          />
        </div>
        <span class="ba-slider__label ba-slider__label--before">Before</span>
        <span class="ba-slider__label ba-slider__label--after">AI Generated Future</span>
        <div class="ba-slider__handle" aria-hidden="true">
          <div class="ba-slider__grip">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4M8 15l4 4 4-4"/>
            </svg>
          </div>
        </div>
      </div>
      <p class="text-center text-forest/50 text-sm mt-4">Drag the slider to compare before and after</p>
    </section>

    <!-- Description -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 pb-14 sm:pb-16 fade-in-section">
      <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 card-shadow border border-sage/15">
        <h2 class="font-heading font-bold text-xl sm:text-2xl text-forest mb-4">About This Place</h2>
        <p class="text-forest/80 text-base sm:text-lg leading-relaxed">${escapeHtml(place.description)}</p>
      </div>
    </section>

    <!-- Team -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
      <div class="fade-in-section text-center mb-10">
        <span class="inline-block text-amber font-heading font-bold text-sm uppercase tracking-widest mb-2">The Team</span>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl text-forest">People Behind the Project</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <!-- Assigned Grade -->
        <div class="fade-in-section bg-white/70 backdrop-blur-sm rounded-3xl p-5 sm:p-7 border border-sage/20 card-shadow">
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber/15 text-forest shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </span>
            <h3 class="font-heading font-bold text-base sm:text-lg text-forest">Assigned Grade</h3>
          </div>
          ${renderChips(place.grades)}
        </div>

        <!-- Prefects -->
        <div class="fade-in-section bg-white/70 backdrop-blur-sm rounded-3xl p-5 sm:p-7 border border-sage/20 card-shadow" style="transition-delay: 0.05s">
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-sage/20 text-forest shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
            </span>
            <h3 class="font-heading font-bold text-base sm:text-lg text-forest">Prefects</h3>
          </div>
          ${renderChips(place.prefects)}
        </div>

        <!-- In Charge Teachers -->
        <div class="fade-in-section bg-white/70 backdrop-blur-sm rounded-3xl p-5 sm:p-7 border border-sage/20 card-shadow" style="transition-delay: 0.1s">
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-sage/20 text-forest shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7"/>
              </svg>
            </span>
            <h3 class="font-heading font-bold text-base sm:text-lg text-forest">In Charge Teachers</h3>
          </div>
          ${renderChips(place.teachers)}
        </div>

        <!-- OGA Members -->
        <div class="fade-in-section bg-white/70 backdrop-blur-sm rounded-3xl p-5 sm:p-7 border border-sage/20 card-shadow" style="transition-delay: 0.15s">
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-sage/20 text-forest shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </span>
            <h3 class="font-heading font-bold text-base sm:text-lg text-forest">OGA Members</h3>
          </div>
          ${renderChips(place.ogaMembers)}
        </div>
      </div>
    </section>

    <!-- Place navigation -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 border-t border-sage/15 pt-10">
      ${renderPlaceNav(place.id)}
    </section>
  `;

  // Trigger header fade-in
  requestAnimationFrame(() => {
    const header = container.querySelector('.place-header');
    if (header) header.classList.add('visible');
  });

  // Initialize comparison slider
  const slider = container.querySelector('.ba-slider');
  initBeforeAfterSlider(slider);

  initImageFallbacks(container);

  // Re-run fade-in observer for dynamically injected sections
  if (typeof initFadeInObserver === 'function') {
    initFadeInObserver();
  }
}

/** Render friendly 404 when id is missing or invalid */
function renderNotFound(id) {
  const container = document.getElementById('place-content');
  if (!container) return;

  updatePageMeta({
    title: 'Place Not Found | Environmental Project',
    description: 'The requested environmental project location could not be found. Browse all places at Fathima Balika Muslim Maha Vidyalaya.',
    image: 'assets/images/Logo.png',
  });

  container.innerHTML = `
    <section class="max-w-lg mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center fade-in-section">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-sage/15 text-sage-dark mb-8">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h1 class="font-heading font-bold text-2xl sm:text-3xl text-forest mb-4">Place Not Found</h1>
      <p class="text-forest/60 text-base sm:text-lg mb-8 leading-relaxed">
        ${
          id !== null
            ? `We couldn't find a project location with ID <strong>${escapeHtml(String(id))}</strong>.`
            : 'No place ID was provided in the URL.'
        }
        Please check the link or return to the home page.
      </p>
      <a href="index.html#places" class="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-forest font-heading font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all hover:-translate-y-0.5">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to All Places
      </a>
    </section>
  `;

  if (typeof initFadeInObserver === 'function') {
    initFadeInObserver();
  }
}

/* --------------------------------------------------------------------------
   Bootstrap
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const id = getPlaceIdFromUrl();

  if (id === null) {
    renderNotFound(null);
    return;
  }

  const place = findPlaceById(id);

  if (!place) {
    renderNotFound(id);
    return;
  }

  renderPlace(place);
});
