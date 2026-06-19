/**
 * main.js — Shared utilities & home page interactivity
 * Fathima Balika Muslim Maha Vidyalaya — Environmental Project Showcase
 */

/* --------------------------------------------------------------------------
   Utilities
   -------------------------------------------------------------------------- */

/** Escape HTML to prevent injection when rendering user-editable data */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Resolve a relative path to an absolute URL (needed for Open Graph images) */
function resolveAbsoluteUrl(path) {
  try {
    return new URL(path, window.location.href).href;
  } catch {
    return path;
  }
}

/** Leaf icon markup used inside image fallback placeholders */
const FALLBACK_LEAF_SVG =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.06-2.44C8.14 17.24 10.18 14 17 14V8zm-1.5-4C19 4 21 6 21 9.5c0 7.5-7 10-14 12.5C5.5 18 3 14.5 3 10.5 3 6.5 6 4 9.5 4c1.5 0 3 .5 4 1.5C14.5 4.5 16 4 15.5 4z"/></svg>';

/**
 * Replace a broken <img> with a green leaf placeholder.
 * Callable inline via onerror="handleImageError(this, 'logo')".
 * @param {HTMLImageElement} img
 * @param {'logo'|'cover'} [variant='cover']
 */
function handleImageError(img, variant = 'cover') {
  if (!img || img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = 'true';

  const isLogo = variant === 'logo';
  const placeholder = document.createElement('div');
  placeholder.className = `img-fallback ${isLogo ? 'img-fallback--logo' : 'img-fallback--cover'} ${img.className}`;
  placeholder.setAttribute('role', 'img');
  placeholder.setAttribute('aria-label', img.alt || 'Image unavailable');
  placeholder.innerHTML = FALLBACK_LEAF_SVG;

  if (img.width) placeholder.style.width = `${img.width}px`;
  if (img.height) placeholder.style.height = `${img.height}px`;

  img.replaceWith(placeholder);
}

/**
 * Attach error handlers to all images inside a root element.
 * @param {ParentNode} [root=document]
 */
function initImageFallbacks(root = document) {
  root.querySelectorAll('img:not([data-fallback-bound])').forEach((img) => {
    img.dataset.fallbackBound = 'true';
    const variant = img.classList.contains('rounded-full') ? 'logo' : 'cover';
    img.addEventListener('error', () => handleImageError(img, variant));
  });
}

/* --------------------------------------------------------------------------
   Page load transition & social meta
   -------------------------------------------------------------------------- */

/** Brief fade-in of #page-root on load (< 400ms) */
function initPageLoadTransition() {
  const root = document.getElementById('page-root');
  if (!root) return;
  requestAnimationFrame(() => {
    root.classList.add('page-loaded');
  });
}

/** Resolve relative og:image / twitter:image URLs to absolute for social sharing */
function initSocialMeta() {
  document.querySelectorAll('meta[data-relative]').forEach((meta) => {
    const relative = meta.getAttribute('data-relative');
    if (relative) meta.content = resolveAbsoluteUrl(relative);
  });

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = window.location.href.split('#')[0];
}

/* --------------------------------------------------------------------------
   Sticky nav — forest green background on scroll
   -------------------------------------------------------------------------- */
function initScrollNav() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('header-scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   Back to top button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   IntersectionObserver — fade-in sections
   -------------------------------------------------------------------------- */

/**
 * Initialize scroll-triggered fade-in animations.
 * @param {Object} options
 * @param {string} [options.selector='.fade-in-section'] - Elements to observe
 * @param {number} [options.threshold=0.12] - Visibility ratio to trigger
 * @param {string} [options.rootMargin='0px 0px -40px 0px'] - Observer margin
 * @param {boolean} [options.repeat=false] - Keep observing (don't unobserve)
 * @returns {IntersectionObserver|null}
 */
function initFadeInObserver(options = {}) {
  const {
    selector = '.fade-in-section',
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    repeat = false,
  } = options;

  const elements = document.querySelectorAll(selector);
  if (!elements.length) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (!repeat) observer.unobserve(entry.target);
        }
      });
    },
    { threshold, rootMargin }
  );

  elements.forEach((el) => observer.observe(el));
  return observer;
}

/* --------------------------------------------------------------------------
   Stats — compute from PLACES & animate counters
   -------------------------------------------------------------------------- */

/**
 * Derive unique participant counts from the PLACES array.
 * @param {Array} places
 */
function computeStats(places) {
  const students = new Set();
  const teachers = new Set();
  const oga = new Set();

  places.forEach((place) => {
    (place.students || []).forEach((s) => students.add(s));
    (place.teachers || []).forEach((t) => teachers.add(t));
    (place.ogaMembers || []).forEach((o) => oga.add(o));
  });

  return {
    locations: places.length,
    students: students.size,
    teachers: teachers.size,
    oga: oga.size,
  };
}

/**
 * Animate a number from 0 to target over duration ms.
 * @param {HTMLElement} el
 * @param {number} target
 * @param {number} duration
 * @param {string} suffix
 */
function animateCounter(el, target, duration = 1800, suffix = '') {
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = `${current}${suffix}`;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/**
 * Wire stat elements to computed values and animate on scroll into view.
 * @param {Array} places
 */
function initStatsCounters(places) {
  const statsSection = document.getElementById('stats');
  if (!statsSection || typeof PLACES === 'undefined') return;

  const stats = computeStats(places);
  const statEls = statsSection.querySelectorAll('[data-stat]');

  const targets = {
    locations: { value: stats.locations, suffix: '+' },
    students: { value: stats.students, suffix: '' },
    teachers: { value: stats.teachers, suffix: '' },
    oga: { value: stats.oga, suffix: '' },
  };

  statEls.forEach((el) => {
    const key = el.dataset.stat;
    if (targets[key]) {
      el.dataset.target = targets[key].value;
      el.dataset.suffix = targets[key].suffix;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        statEls.forEach((el) => {
          const target = parseInt(el.dataset.target, 10) || 0;
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, 1800, suffix);
        });

        observer.disconnect();
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   Places grid — render cards from global PLACES array
   -------------------------------------------------------------------------- */

/**
 * Build HTML for a single place card.
 * @param {Object} place
 * @param {number} index - Used for stagger delay
 */
function buildPlaceCard(place, index) {
  const delay = (index * 0.08).toFixed(2);
  const href = `place.html?id=${place.id}`;

  return `
    <a
      href="${href}"
      class="place-card fade-in-section hover-lift group block bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden card-shadow border border-sage/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      style="transition-delay: ${delay}s"
      aria-label="View details for ${escapeHtml(place.placeName)}"
    >
      <!-- Before / After thumbnails -->
      <div class="thumb-pair grid grid-cols-2 gap-0.5 bg-cream-dark">
        <div class="relative aspect-[4/3] overflow-hidden">
          <img
            src="${escapeHtml(place.beforeImage)}"
            alt="Before — ${escapeHtml(place.placeName)}"
            class="w-full h-full object-cover"
            loading="lazy"
            width="400"
            height="300"
            onerror="handleImageError(this, 'cover')"
          />
          <span class="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-forest/80 text-cream px-2 py-0.5 rounded-full">Before</span>
        </div>
        <div class="relative aspect-[4/3] overflow-hidden">
          <img
            src="${escapeHtml(place.afterImage)}"
            alt="After — ${escapeHtml(place.placeName)}"
            class="w-full h-full object-cover"
            loading="lazy"
            width="400"
            height="300"
            onerror="handleImageError(this, 'cover')"
          />
          <span class="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-amber/90 text-forest px-2 py-0.5 rounded-full">After</span>
        </div>
      </div>

      <div class="p-5 sm:p-6">
        <span class="inline-block bg-amber/15 text-amber-dark font-heading font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          ${escapeHtml(place.projectNo)}
        </span>
        <h3 class="font-heading font-bold text-lg sm:text-xl text-forest group-hover:text-forest-light transition-colors mb-1.5 line-clamp-2">
          ${escapeHtml(place.placeName)}
        </h3>
        <p class="text-sage-dark text-sm flex items-center gap-1.5 mb-5">
          <svg class="w-3.5 h-3.5 shrink-0 opacity-70" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="line-clamp-1">${escapeHtml(place.location)}</span>
        </p>
        <span class="inline-flex items-center gap-2 text-sm font-semibold text-forest group-hover:text-amber transition-colors">
          View Details
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </span>
      </div>
    </a>
  `;
}

/**
 * Read global PLACES and inject cards into #places-grid.
 */
function renderPlacesGrid() {
  const container = document.getElementById('places-grid');
  if (!container || typeof PLACES === 'undefined') return;

  if (!PLACES.length) {
    container.innerHTML = `
      <p class="col-span-full text-center text-forest/60 py-12">
        No project places have been added yet.
      </p>
    `;
    return;
  }

  container.innerHTML = PLACES.map((place, i) => buildPlaceCard(place, i)).join('');

  initImageFallbacks(container);
  initFadeInObserver({ selector: '.places-grid .place-card', threshold: 0.08 });
}

/* --------------------------------------------------------------------------
   DOM ready — shared bootstrap (runs on every page)
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initPageLoadTransition();
  initScrollNav();
  initBackToTop();
  initSocialMeta();
  initImageFallbacks();
  initFadeInObserver();

  if (typeof PLACES !== 'undefined' && document.getElementById('places-grid')) {
    renderPlacesGrid();
    initStatsCounters(PLACES);
  }
});
