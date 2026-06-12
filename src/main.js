// =====================================================================
// UNIVERSAL SETTINGS APPLIER — runs on every page, before DOM ready
// Reads sessionStorage and applies persisted settings immediately.
// No DOM element dependencies — works on index + all blog pages.
// =====================================================================
(function applyPersistedSettings() {
  // 1. Perf mode
  if (localStorage.getItem('hasamisa_perf') === 'true') {
    document.documentElement.classList.add('perf-mode');
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('perf-mode');
      document.documentElement.classList.remove('perf-mode');
    });
  }

  // 2. Custom cursor — CSS already hides it globally via * { cursor: none }.
  //    Only restore native cursor if user turned custom cursor OFF.
  if (localStorage.getItem('hasamisa_cursor') === 'false') {
    const styleEl = document.createElement('style');
    styleEl.id = 'universal-cursor-style';
    styleEl.innerHTML = `
      * { cursor: auto !important; }
      a, a *, button, button *, input:not([type="range"]),
      .settings-wrapper, .settings-wrapper *, .lightbox-close,
      .skill-card, .menu, .dock img, .switcher__option, .switcher__text,
      .nav-switcher, .nav-switcher *, .card-icon, label, .toggle-switch,
      .toggle-slider, .project-showcase, .asset-card { cursor: pointer !important; }
      input[type="range"], .slider-handle { cursor: ew-resize !important; }
    `;
    document.head.appendChild(styleEl);
  }

  // 3. Moths
  if (localStorage.getItem('hasamisa_moths') === 'false') {
    window.PARTICLES_ENABLED = false;
  }
})();

// 0. Custom Cursor — Glowing Lantern SVG + Hover Square

const createCursor = () => {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  
  if (localStorage.getItem('hasamisa_cursor') === 'false') {
    cursor.style.display = 'none';
  }

  // The lantern element
  const lantern = document.createElement('div');
  lantern.classList.add('cursor-lantern');
  lantern.innerHTML = `
    <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" style="width: 80px; height: 100px; overflow: visible;">
      <defs>
        <radialGradient id="lanternGlass" cx="50%" cy="50%" r="60%">
          <stop offset="0%"  stop-color="#b8f8ff" stop-opacity="0.95"/>
          <stop offset="50%" stop-color="#33e0ff" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#0091a8" stop-opacity="0.35"/>
        </radialGradient>
        <linearGradient id="frame" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stop-color="#5ff5ff"/>
          <stop offset="100%" stop-color="#0a6b7a"/>
        </linearGradient>
        <linearGradient id="cap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stop-color="#9ffaff"/>
          <stop offset="100%" stop-color="#1a8fa3"/>
        </linearGradient>
        <radialGradient id="fireCore" cx="50%" cy="65%" r="50%">
          <stop offset="0%"  stop-color="#ffffff" stop-opacity="1"/>
          <stop offset="25%" stop-color="#b8f8ff" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#33e0ff" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#006978" stop-opacity="0"/>
        </radialGradient>

        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="globalBlur">
          <feGaussianBlur stdDeviation="1.5"/>
        </filter>

        <!-- Flame gradients -->
        <radialGradient id="coreGradient" cx="50%" cy="30%" r="60%">
          <stop offset="0%"  stop-color="#ffffff"/>
          <stop offset="40%" stop-color="#00ffff"/>
          <stop offset="100%" stop-color="#005577" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g transform="translate(0 6) scale(1 0.85)">
      <!-- Handle ring -->
      <g filter="url(#softGlow)"><circle cx="200" cy="40" r="10" fill="none" stroke="url(#cap)" stroke-width="3"/></g>
      <!-- Top cap -->
      <g filter="url(#softGlow)">
        <path d="M 130 95 L 200 70 L 270 95 L 260 115 L 140 115 Z" fill="url(#cap)" stroke="#b8f8ff" stroke-width="1" opacity="0.95"/>
        <line x1="200" y1="70" x2="200" y2="115" stroke="#b8f8ff" stroke-width="0.8" opacity="0.6"/>
        <line x1="160" y1="105" x2="240" y2="105" stroke="#b8f8ff" stroke-width="0.6" opacity="0.5"/>
      </g>
      <!-- Chain link -->
      <line x1="200" y1="50" x2="200" y2="70" stroke="#5ff5ff" stroke-width="5" stroke-linecap="round" opacity="0.95"/>
      <line x1="200" y1="50" x2="200" y2="70" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
      <!-- Top lens cap -->
      <ellipse cx="200" cy="120" rx="75" ry="10" fill="url(#frame)" stroke="#b8f8ff" stroke-width="1.2"/>
      <!-- Lantern body -->
      <g filter="url(#softGlow)">
        <path d="M 130 120 C 125 200, 120 280, 135 380 L 265 380 C 280 280, 275 200, 270 120 Z" fill="url(#lanternGlass)" stroke="url(#frame)" stroke-width="2.5"/>
        <line x1="170" y1="125" x2="167" y2="378" stroke="url(#frame)" stroke-width="1.2" opacity="0.7"/>
        <line x1="200" y1="125" x2="200" y2="378" stroke="url(#frame)" stroke-width="1.2" opacity="0.7"/>
        <line x1="230" y1="125" x2="233" y2="378" stroke="url(#frame)" stroke-width="1.2" opacity="0.7"/>
        <line x1="125" y1="190" x2="275" y2="190" stroke="url(#frame)" stroke-width="1" opacity="0.5"/>
        <line x1="122" y1="270" x2="278" y2="270" stroke="url(#frame)" stroke-width="1" opacity="0.5"/>
        <line x1="128" y1="340" x2="272" y2="340" stroke="url(#frame)" stroke-width="1" opacity="0.5"/>
        <path d="M 150 140 Q 145 250, 155 360" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.35" stroke-linecap="round"/>
        <path d="M 158 150 Q 153 250, 162 350" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.6" stroke-linecap="round"/>
      </g>
      <!-- FLAME -->
      <g transform="translate(85 215) scale(1.2)">
        <g filter="url(#globalBlur)">
          <path d="M100,30 Q130,90 115,150 Q100,110 85,150 Q70,90 100,30" fill="#0088aa" opacity="0.6">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" values="M100,30 Q130,90 115,150 Q100,110 85,150 Q70,90 100,30; M100,30 Q135,85 112,155 Q100,115 88,155 Q65,85 100,30; M100,30 Q130,90 115,150 Q100,110 85,150 Q70,90 100,30"/>
          </path>
          <path d="M100,50 Q120,100 110,140 Q100,115 90,140 Q80,100 100,50" fill="#00ccff" opacity="0.8">
            <animate attributeName="d" dur="1.5s" repeatCount="indefinite" values="M100,50 Q120,100 110,140 Q100,115 90,140 Q80,100 100,50; M100,50 Q125,95 108,145 Q100,120 92,145 Q75,95 100,50; M100,50 Q120,100 110,140 Q100,115 90,140 Q80,100 100,50"/>
          </path>
          <path d="M100,70 Q112,105 105,130 Q100,115 95,130 Q88,105 100,70" fill="#ffffff" opacity="0.9">
            <animate attributeName="d" dur="1s" repeatCount="indefinite" values="M100,70 Q112,105 105,130 Q100,115 95,130 Q88,105 100,70; M100,70 Q115,100 103,135 Q100,120 97,135 Q85,100 100,70; M100,70 Q112,105 105,130 Q100,115 95,130 Q88,105 100,70"/>
          </path>
          <path d="M100,60 Q125,110 108,160 Q100,120 92,160 Q75,110 100,60" fill="url(#coreGradient)" opacity="0.7">
            <animate attributeName="d" dur="2.5s" repeatCount="indefinite" values="M100,60 Q125,110 108,160 Q100,120 92,160 Q75,110 100,60; M100,60 Q130,105 105,165 Q100,125 95,165 Q70,105 100,60; M100,60 Q125,110 108,160 Q100,120 92,160 Q75,110 100,60"/>
          </path>
        </g>
      </g>
      <!-- Bottom lens cap -->
      <ellipse cx="200" cy="380" rx="68" ry="9" fill="url(#frame)" stroke="#b8f8ff" stroke-width="1.2"/>
      <!-- Bottom cap -->
      <g filter="url(#softGlow)">
        <path d="M 140 380 L 260 380 L 250 400 L 150 400 Z" fill="url(#cap)" stroke="#b8f8ff" stroke-width="1" opacity="0.95"/>
        <ellipse cx="200" cy="400" rx="50" ry="6" fill="url(#cap)" stroke="#b8f8ff" stroke-width="1"/>
      </g>
      </g>
    </svg>`;
  cursor.appendChild(lantern);

  // The hover lens element (hidden by default)
  const square = document.createElement('div');
  square.classList.add('cursor-lens');
  cursor.appendChild(square);

  document.body.appendChild(cursor);

  // Make visible instantly
  cursor.style.left = '50%';
  cursor.style.top = '50%';

  // --- Better Motion Physics for Lantern Swing ---
  lantern.style.transformOrigin = '50% 16%';
  
  let angle = 0;
  let angVel = 0;
  let lastX = window.innerWidth / 2;
  let lastY = window.innerHeight / 2;
  
  const restoring = 0.005;    // Gravity pull back
  const airDrag   = 0.04;     // Motion damping
  const maxAngle  = 45;
  const sensitivity = 0.9;    // Displacement to angular impulse

  function updateMouse(x, y) {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    const dx = x - lastX;
    const impulse = Math.max(-40, Math.min(40, dx * sensitivity));
    angVel += impulse;
    
    lastX = x; 
    lastY = y;
  }

  window.addEventListener('mousemove', (e) => {
    updateMouse(e.clientX, e.clientY);
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches[0]) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  function animFrame() {
    angVel += -angle * restoring;
    angVel -= angVel * airDrag;
    angle += angVel;

    if (angle >  maxAngle) { angle =  maxAngle; angVel *= -0.35; }
    if (angle < -maxAngle) { angle = -maxAngle; angVel *= -0.35; }

    lantern.style.transform = `translate(-50%, -16%) rotate(${angle}deg)`;
    requestAnimationFrame(animFrame);
  }
  requestAnimationFrame(animFrame);

  window.bindCursorHover = (scope = document) => {
    const hoverElements = scope.querySelectorAll('a, button, .skill-card, .project-showcase, input, .settings-wrapper, .settings-dropdown, .asset-card, .story-image-card');
    hoverElements.forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = 'true';
      el.addEventListener('mouseenter', () => {
        if (localStorage.getItem('hasamisa_cursor') === 'false') return;
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) customCursor.classList.add('hover');
        if (typeof AudioManager !== 'undefined') {
          AudioManager.stop('lantern');
          AudioManager.play('hover');
        }
      });
      el.addEventListener('mouseleave', () => {
        if (localStorage.getItem('hasamisa_cursor') === 'false') return;
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) customCursor.classList.remove('hover');
        if (typeof AudioManager !== 'undefined') {
          AudioManager.stop('hover');
          AudioManager.play('lantern');
        }
      });
    });
  };
  window.bindCursorHover();

  // Slider handle: show native ew-resize arrow, hide ALL custom cursors
  const sliderHandles = document.querySelectorAll('.slider-handle');
  sliderHandles.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('sliding');
      cursor.classList.remove('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('sliding');
      cursor.classList.add('hover'); // Re-enter the parent image area
    });
  });
};
document.addEventListener('DOMContentLoaded', createCursor);

// 0.5 Dynamic Liquid Glass Navigation Pill
document.addEventListener('DOMContentLoaded', () => {
  const switchers = document.querySelectorAll('.switcher__input');
  const navPill = document.querySelector('.nav-switcher');

  function updatePill() {
    const checked = document.querySelector('.switcher__input:checked');
    if (!checked || !navPill) return;

    const label = checked.closest('.switcher__option');
    if (label) {
      const left = label.offsetLeft;
      const width = label.offsetWidth;
      navPill.style.setProperty('--pill-left', `${left}px`);
      navPill.style.setProperty('--pill-width', `${width}px`);
    }
  }

  // Initialize pill geometry
  updatePill();
  // Listen for active tab changes
  switchers.forEach(radio => radio.addEventListener('change', updatePill));
  // Keep the pill anchored smoothly if the user dynamically resizes the mobile/desktop viewport
  window.addEventListener('resize', updatePill);
});

/// 1. Moth Particle Swarm Cursor — Dual-canvas for 3D depth
const canvasBack = document.getElementById('moth-canvas-back');
const canvasFront = document.getElementById('moth-canvas-front');
const ctxBack = canvasBack.getContext('2d');
const ctxFront = canvasFront.getContext('2d');
let width, height;

function resize() {
  width = canvasBack.width = canvasFront.width = window.innerWidth;
  height = canvasBack.height = canvasFront.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Offscreen sprite: tiny dot with radial glow baked in (no shadowBlur needed at runtime)
const spriteSize = 16;
const sprite = document.createElement('canvas');
sprite.width = spriteSize;
sprite.height = spriteSize;
const sCtx = sprite.getContext('2d');
const grad = sCtx.createRadialGradient(spriteSize / 2, spriteSize / 2, 0, spriteSize / 2, spriteSize / 2, spriteSize / 2);
grad.addColorStop(0, 'rgba(180, 240, 255, 1)');
grad.addColorStop(0.15, 'rgba(17, 164, 212, 0.8)');
grad.addColorStop(0.5, 'rgba(17, 164, 212, 0.25)');
grad.addColorStop(1, 'rgba(17, 164, 212, 0)');
sCtx.fillStyle = grad;
sCtx.fillRect(0, 0, spriteSize, spriteSize);

const moths = [];
const NUM_SWARM = 650;
const NUM_AMBIENT = 150;
let mouseX = width / 2;
let mouseY = height / 2;
let mouseSpeed = 0;
let lastMouseX = mouseX;
let lastMouseY = mouseY;
let isTouching = false;
let hasMouseMoved = false;

function updateMouse(x, y) {
  const dx = x - lastMouseX;
  const dy = y - lastMouseY;
  mouseSpeed = Math.sqrt(dx * dx + dy * dy);
  mouseX = x;
  mouseY = y;
  lastMouseX = x;
  lastMouseY = y;
}

document.addEventListener('mousemove', (e) => {
  hasMouseMoved = true;
  updateMouse(e.clientX, e.clientY);
});
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    isTouching = true;
    updateMouse(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });
document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 0) {
    isTouching = true;
    updateMouse(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });
document.addEventListener('touchend', () => {
  isTouching = false;
}, { passive: true });
document.addEventListener('touchcancel', () => {
  isTouching = false;
}, { passive: true });

class Moth {
  constructor(isSwarmer) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.isSwarmer = isSwarmer;

    this.drawSize = isSwarmer ? Math.random() * 6 + 4 : Math.random() * 4 + 3;
    this.alpha = isSwarmer ? Math.random() * 0.5 + 0.3 : Math.random() * 0.2 + 0.05;
    this.speed = isSwarmer ? Math.random() * 0.16 + 0.06 : Math.random() * 0.015 + 0.005;
    this.wander = Math.random() * 1.2 + 0.3;
    this.angle = Math.random() * Math.PI * 2;

    // Firefly blink — each moth gets a random phase offset and pulse rate
    this.blinkPhase = Math.random() * Math.PI * 2;
    this.blinkSpeed = isSwarmer ? Math.random() * 0.3 + 0.15 : Math.random() * 0.012 + 0.005;

    // 50/50 z-depth layer assignment: 0 = back (behind content), 1 = front (above content)
    this.layer = Math.random() < 0.5 ? 0 : 1;
  }

  update() {
    this.angle += (Math.random() - 0.5) * 0.4;
    const wx = Math.cos(this.angle) * this.wander;
    const wy = Math.sin(this.angle) * this.wander;

    if (this.isSwarmer) {
      const shouldAttract = isTouching || hasMouseMoved;

      if (shouldAttract) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        const attractionScale = 1 + mouseSpeed * 0.12;
        const orbitRadius = 40 + mouseSpeed * 1.5;

        if (dist > orbitRadius) {
          this.vx += (dx / dist) * this.speed * attractionScale + wx * 0.15;
          this.vy += (dy / dist) * this.speed * attractionScale + wy * 0.15;
        } else {
          const ox = -dy / dist;
          const oy = dx / dist;
          this.vx += ox * this.speed * 3 + wx * 0.15;
          this.vy += oy * this.speed * 3 + wy * 0.15;
          this.vx += (dx / dist) * this.speed * 0.3;
          this.vy += (dy / dist) * this.speed * 0.3;
        }
      } else {
        this.vx += wx * 0.08;
        this.vy += wy * 0.08;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
      }
    } else {
      this.vx += wx * 0.08;
      this.vy += wy * 0.08;
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }

    this.vx *= 0.92;
    this.vy *= 0.92;
    this.x += this.vx;
    this.y += this.vy;

    // Advance blink phase
    this.blinkPhase += this.blinkSpeed;
  }

  draw(targetCtx) {
    if (this.isSwarmer) {
      const blink = 0.5 + 0.5 * Math.sin(this.blinkPhase);
      // targetCtx.globalAlpha = this.alpha * (0.3 + 0.7 * blink); // smooth oscillate
      targetCtx.globalAlpha = this.alpha * (blink > 0.5 ? 1 : 0.1); // raw on/off flicker
      targetCtx.drawImage(sprite, this.x - this.drawSize / 2, this.y - this.drawSize / 2, this.drawSize, this.drawSize);
    } else {
      const breathe = 0.5 + 0.5 * Math.sin(this.blinkPhase);
      const radius = (this.drawSize / 3.5) * (0.4 + 0.6 * breathe);
      targetCtx.globalAlpha = 0.3 + 0.7 * breathe;
      targetCtx.beginPath();
      targetCtx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      targetCtx.fillStyle = 'rgba(17, 164, 212, 0.6)';
      targetCtx.shadowBlur = this.drawSize * 2 * breathe;
      targetCtx.shadowColor = 'rgba(17, 164, 212, 1)';
      targetCtx.fill();
      targetCtx.shadowBlur = 0;
    }
  }
}

// Create ambient moths first, then swarm moths
for (let i = 0; i < NUM_AMBIENT; i++) moths.push(new Moth(false));
for (let i = 0; i < NUM_SWARM; i++) moths.push(new Moth(true));

if (window.PARTICLES_ENABLED === undefined) window.PARTICLES_ENABLED = true;
function animateMoths() {
  if (!window.PARTICLES_ENABLED) {
    ctxBack.clearRect(0, 0, width, height);
    ctxFront.clearRect(0, 0, width, height);
    requestAnimationFrame(animateMoths);
    return;
  }
  mouseSpeed *= 0.92;
  ctxBack.globalAlpha = 1;
  ctxFront.globalAlpha = 1;
  ctxBack.clearRect(0, 0, width, height);
  ctxFront.clearRect(0, 0, width, height);
  for (let i = 0; i < moths.length; i++) {
    moths[i].update();
    moths[i].draw(moths[i].layer === 0 ? ctxBack : ctxFront);
  }
  requestAnimationFrame(animateMoths);
}
animateMoths();// 1.5 Dynamic JSON Gallery Loader
async function loadDynamicGallery() {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) throw new Error('Could not fetch data.json');

    const categories = await response.json();

    // --- Populate main page text from site config ---
    if (categories.site) {
      const s = categories.site;
      // Page title
      if (s.title) document.title = s.title;
      // Hero
      const heroH1 = document.querySelector('#home .chromatic-text');
      if (heroH1 && s.heroName1 && s.heroName2) {
        heroH1.setAttribute('data-text', s.heroName1 + s.heroName2);
        heroH1.innerHTML = `${s.heroName1}<span class="cyan-text">${s.heroName2}</span>`;
      }
      const heroSub = document.querySelector('.hero-subtitle');
      if (heroSub && s.heroSubtitle) heroSub.textContent = s.heroSubtitle;
      const heroDesc = document.querySelector('.hero-desc');
      if (heroDesc && s.heroDesc) heroDesc.textContent = s.heroDesc;
      const heroBtn = document.querySelector('.hero .liquid-button span');
      if (heroBtn && s.heroButton) heroBtn.textContent = s.heroButton;
      // Nav labels
      if (s.nav && s.nav.length) {
        const navTexts = document.querySelectorAll('#main-nav .switcher__text');
        s.nav.forEach((label, i) => { if (navTexts[i]) navTexts[i].textContent = label; });
      }
      // Section headings & descriptions
      if (s.sections) {
        Object.entries(s.sections).forEach(([key, sec]) => {
          const heading = document.querySelector(`#${key} .chromatic-text`);
          if (heading && sec.heading) {
            heading.setAttribute('data-text', sec.heading);
            heading.textContent = sec.heading;
          }
          const desc = document.querySelector(`#${key} .section-subtext`);
          if (desc && sec.desc) desc.innerHTML = sec.desc;
        });
      }
      // Footer
      const footer = document.querySelector('footer p');
      if (footer && s.footer) footer.innerHTML = s.footer;
      // Overlay
      if (s.overlay) {
        const ot = document.querySelector('.overlay-title');
        if (ot) ot.textContent = s.overlay.title;
        const otxt = document.querySelector('.overlay-text');
        if (otxt) otxt.innerHTML = s.overlay.text;
        const osub = document.querySelector('.overlay-subtext');
        if (osub) osub.innerHTML = s.overlay.subtext;
        const obtn = document.querySelector('.landing-start-btn .liquidGlass-text');
        if (obtn) obtn.textContent = s.overlay.button;
      }
    }

    const isVideo = (path) => {
      if (!path) return false;
      const ext = path.split('.').pop().toLowerCase();
      return ['mp4', 'webm', 'ogg', 'mov'].includes(ext);
    };

    const renderMedia = (src, className = '', alt = '') => {
      if (isVideo(src)) {
        return `<video class="${className}" src="${src}" autoplay loop muted playsinline preload="auto"></video>`;
      }
      return `<img class="${className}" src="${src}" alt="${alt}" loading="lazy" />`;
    };

    // Extract YouTube video ID from any YouTube URL format
    const getYouTubeId = (url) => {
      if (!url) return null;
      const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      return match ? match[1] : null;
    };

    Object.keys(categories).forEach(categoryKey => {
      if (categoryKey === 'games' || categoryKey === 'skills' || categoryKey === 'site' || categoryKey === 'projects') return;
      const track = document.getElementById(`${categoryKey}-track`);
      if (!track) return;
      track.innerHTML = ''; // Ensure cleanly empty

      const projects = categories[categoryKey];

      projects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-showcase glass-card dynamic-card';
        // Pass the aspect ratio to CSS so widths variably adjust!
        card.style.setProperty('--card-ratio', proj.aspectRatio || '16/9');
        if (proj.hdAspectRatio) card.dataset.hdRatio = proj.hdAspectRatio;

        const hasLink = !!proj.link;
        if (hasLink) card.dataset.link = proj.link;

        // YouTube embed support
        const youtubeId = proj.youtubeUrl ? getYouTubeId(proj.youtubeUrl) : null;
        if (youtubeId) card.dataset.youtube = youtubeId;

        // Choose icon: YouTube play > external link > expand
        let iconHtml;
        if (youtubeId) {
          iconHtml = `<div class="card-icon yt-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z"/></svg></div>`;
        } else if (hasLink) {
          iconHtml = `<div class="card-icon link-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/></svg></div>`;
        } else {
          iconHtml = `<div class="card-icon expand-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"/></svg></div>`;
        }

        // YouTube play button overlay
        const ytOverlay = youtubeId
          ? `<div class="yt-play-overlay"><svg viewBox="0 0 68 48"><path d="M66.52,7.74C65.66,4.54 63.16,2.04 59.96,1.18C54.76,0 34,0 34,0S13.24,0 8.04,1.18C4.84,2.04 2.34,4.54 1.48,7.74C0.3,12.94 0.3,24 0.3,24S0.3,35.06 1.48,40.26C2.34,43.46 4.84,45.96 8.04,46.82C13.24,48 34,48 34,48S54.76,48 59.96,46.82C63.16,45.96 65.66,43.46 66.52,40.26C67.7,35.06 67.7,24 67.7,24S67.7,12.94 66.52,7.74Z" fill="#FF0000" fill-opacity="0.8"/><path d="M 45,24 27,14 27,34" fill="#fff"/></svg></div>`
          : '';

        if (proj.beforeImage) {
          card.innerHTML = `
            ${iconHtml}
            <h3>${proj.title}</h3>
            <div class="comparison-slider" 
                 ${proj.hdBeforeImage ? `data-hd-before="${proj.hdBeforeImage}"` : ''}
                 ${proj.hdImage ? `data-hd-after="${proj.hdImage}"` : ''}>
              <div class="before-image">${renderMedia(proj.beforeImage, '', 'Before')}</div>
              <div class="after-image">${renderMedia(proj.image, '', 'Final')}</div>
              <div class="slider-handle"></div>
            </div>
          `;
        } else {
          card.innerHTML = `
            ${iconHtml}
            ${ytOverlay}
            <h3>${proj.title}</h3>
            <div class="media-container" 
                 ${proj.hdImage ? `data-hd="${proj.hdImage}"` : ''} 
                 ${proj.hdBeforeImage ? `data-hd-before="${proj.hdBeforeImage}"` : ''}>
              ${renderMedia(proj.image, `ambient-img ${proj.animation || ''}`, proj.title)}
            </div>
          `;
        }

        track.appendChild(card);
      });
    });

    // Render Games
    if (categories.games) {
      const gamesGrid = document.getElementById('games-grid');
      if (gamesGrid) {
        gamesGrid.innerHTML = '';
        categories.games.forEach(game => {
          const isProjectLink = game.link && game.link.startsWith('/projects/');
          const projectId = isProjectLink ? game.link.split('/projects/')[1].replace('.html', '') : null;
          
          if (isProjectLink) {
            gamesGrid.innerHTML += `
              <div class="skill-card glass-card tilt-effect dynamic-card" style="cursor:pointer;" onclick="navigateToProject('${projectId}')">
                <div class="media-container" style="margin-bottom: 1.5rem;">
                  ${renderMedia(game.image, `ambient-img ${game.animation || ''}`, game.title)}
                </div>
                <h3>${game.title}</h3>
                <p>${game.desc}</p>
              </div>
            `;
          } else {
            gamesGrid.innerHTML += `
              <a href="${game.link}" style="text-decoration:none;">
                <div class="skill-card glass-card tilt-effect dynamic-card">
                  <div class="media-container" style="margin-bottom: 1.5rem;">
                    ${renderMedia(game.image, `ambient-img ${game.animation || ''}`, game.title)}
                  </div>
                  <h3>${game.title}</h3>
                  <p>${game.desc}</p>
                </div>
              </a>
            `;
          }
        });
      }
    }

    // Render Skills
    if (categories.skills) {
      const skillsGrid = document.getElementById('skills-grid');
      if (skillsGrid) {
        skillsGrid.innerHTML = '';
        categories.skills.forEach(skill => {
          skillsGrid.innerHTML += `
            <div class="skill-card glass-card tilt-effect dynamic-card">
              <h3>${skill.title}</h3>
              <p>${skill.desc}</p>
            </div>
          `;
        });
      }
    }

    // Re-bind hover cursors for all the new dynamic cards
    if (window.bindCursorHover) window.bindCursorHover();

    // Re-bind slider handles for new dynamic cards (sliding class hides custom cursor)
    const newHandles = document.querySelectorAll('.slider-handle');
    newHandles.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursor) {
          cursor.classList.add('sliding');
          cursor.classList.remove('hover');
        }
      });
      el.addEventListener('mouseleave', () => {
        if (cursor) {
          cursor.classList.remove('sliding');
          cursor.classList.add('hover');
        }
      });
    });

    // Re-bind 3D Spatial depth array so newly injected cards get the 3D scroll effect
    cards3D = document.querySelectorAll('.glass-card, .project-showcase, .skill-card');

    // Re-bind newly injected comparison sliders
    const galleries = document.querySelectorAll('.gallery-track');
    if (typeof bindSliders === 'function') galleries.forEach(track => bindSliders(track));
    if (typeof bindLightbox === 'function') galleries.forEach(track => bindLightbox(track));

    // Apply strict mathematical geometry limits to prevent mobile CSS squishing
    if (typeof calculateCardDimensions === 'function') calculateCardDimensions();
    if (typeof updateGalleryDimensions === 'function') setTimeout(updateGalleryDimensions, 100);

    // Re-bind 3D tilt for dynamically loaded cards
    if (window.bindTiltEffect) window.bindTiltEffect();

  } catch (error) {
    console.error('JSON Load Error:', error);
  }
}
document.addEventListener('DOMContentLoaded', loadDynamicGallery);

// Force mathematical bounds on Dynamic Gallery cards so aspect ratio never distorts!
window.calculateCardDimensions = () => {
  const cards = document.querySelectorAll('.project-showcase.dynamic-card');

  // The outer card is 90vw max. We MUST subtract its 4rem (64px) horizontal padding 
  // so the inner media box doesn't burst out of the glass boundary on narrow screens!
  const maxW = (window.innerWidth * 0.90) - 64;
  const targetH = window.innerHeight * 0.45;

  cards.forEach(card => {
    const ratioStr = card.style.getPropertyValue('--card-ratio') || '16/9';
    let [rw, rh] = ratioStr.split('/').map(Number);
    if (!rw || !rh) { rw = 16; rh = 9; }
    const ratio = rw / rh;

    let h = targetH;
    let w = h * ratio;

    // If calculated width is too wide for screen, shrink the height proportionally!
    if (w > maxW) {
      w = maxW;
      h = w / ratio;
    }

    const boxes = card.querySelectorAll('.media-container, .comparison-slider');
    boxes.forEach(box => {
      box.style.width = `${Math.floor(w)}px`;
      box.style.height = `${Math.floor(h)}px`;
      box.style.maxWidth = 'none';
      box.style.maxHeight = 'none';
      box.style.aspectRatio = 'auto'; // Disable CSS
    });
  });
};

window.addEventListener('resize', () => {
  if (typeof calculateCardDimensions === 'function') calculateCardDimensions();
});

// 2. Horizontal Scroll Logic for Multiple Galleries
const gallerySections = document.querySelectorAll('.gallery-section');

function updateGalleryDimensions() {
  gallerySections.forEach(section => {
    const track = section.querySelector('.gallery-track');
    if (!track) return;

    // Dynamic 1:1 scroll speed: Track width dictates section scroll height
    const trackWidth = track.scrollWidth;
    // adding innerHeight ensures we have enough scroll distance to fully view it at a natural 1:1 speed
    section.style.height = `${trackWidth + window.innerHeight}px`;
  });
}

// Call on load and resize
window.addEventListener('load', updateGalleryDimensions);
window.addEventListener('resize', updateGalleryDimensions);
// Also call immediately after dynamic injection
document.addEventListener('DOMContentLoaded', () => setTimeout(updateGalleryDimensions, 500));

window.addEventListener('scroll', () => {
  gallerySections.forEach(section => {
    const sticky = section.querySelector('.gallery-sticky-container');
    const track = section.querySelector('.gallery-track');
    if (!sticky || !track || track.children.length === 0) return;

    const sectionRect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Calculate progress (0 to 1) perfectly inside the sticky container bound
    const scrollProgress = -sectionRect.top / (sectionHeight - viewportHeight);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Calculate exact start and end transforms to perfectly center the first and last cards
    const firstCard = track.firstElementChild;
    const lastCard = track.lastElementChild;

    // Starting offset: pushes the first card's center to the window's center
    const startTranslateX = (window.innerWidth / 2) - (firstCard.offsetLeft + (firstCard.offsetWidth / 2));

    // Ending offset: pushes the last card's center to the window's center
    const endTranslateX = (window.innerWidth / 2) - (lastCard.offsetLeft + (lastCard.offsetWidth / 2));

    // Interpolate
    const currentTranslateX = startTranslateX + (clampedProgress * (endTranslateX - startTranslateX));

    track.style.transform = `translateX(${currentTranslateX}px)`;
  });
}, { passive: true });

// 3. Image Comparison Slider Logic
function bindSliders(scope = document) {
  const sliders = scope.querySelectorAll('.comparison-slider:not(.bound)');

  sliders.forEach(slider => {
    slider.classList.add('bound');
    const afterImage = slider.querySelector('.after-image');
    const innerImg = slider.querySelector('.after-image img, .after-image video');
    const sliderHandle = slider.querySelector('.slider-handle');

    let isSliding = false;

    const syncImageWidth = () => {
      innerImg.style.width = `${slider.clientWidth}px`;
      innerImg.style.height = `${slider.clientHeight}px`;

      const beforeImg = slider.querySelector('.before-image img, .before-image video');
      if (beforeImg) {
        beforeImg.style.width = `${slider.clientWidth}px`;
        beforeImg.style.height = `${slider.clientHeight}px`;
      }
    };

    window.addEventListener('resize', syncImageWidth);
    setTimeout(syncImageWidth, 100);
    setTimeout(syncImageWidth, 350); // After Lightbox 0.3s CSS opacity transition

    if (window.ResizeObserver) {
      new ResizeObserver(() => syncImageWidth()).observe(slider);
    }

    const moveSlider = (x) => {
      const rect = slider.getBoundingClientRect();
      let position = x - rect.left;

      if (position < 0) position = 0;
      if (position > rect.width) position = rect.width;

      const percentage = (position / rect.width) * 100;

      afterImage.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
    };

    sliderHandle.addEventListener('mousedown', (e) => { isSliding = true; moveSlider(e.clientX); });
    window.addEventListener('mouseup', () => { isSliding = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isSliding) return;
      moveSlider(e.clientX);
    });

    sliderHandle.addEventListener('touchstart', (e) => { isSliding = true; moveSlider(e.touches[0].clientX); });
    window.addEventListener('touchend', () => { isSliding = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isSliding) return;
      moveSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('scroll', syncImageWidth, { passive: true });
  });
}
bindSliders(document);

// 4. 3D Spatial Depth Engine for Cards (Scroll Driven)
let cards3D = document.querySelectorAll('.glass-card, .project-showcase, .skill-card');

function update3DScroll() {
  const windowCenterX = window.innerWidth / 2;

  cards3D.forEach(card => {
    const isHorizontal = card.closest('.gallery-track') !== null;
    if (!isHorizontal) return;

    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;

    let distFromCenter = cardCenterX - windowCenterX;
    let maxDist = window.innerWidth * 0.6;

    let rawRatio = distFromCenter / maxDist;
    let ratio = Math.max(-1, Math.min(1, rawRatio));
    const absRatio = Math.abs(ratio);

    const zTranslate = -Math.pow(absRatio, 1.5) * 500;
    const rotateY = -ratio * 35;
    const scale = 1 - (absRatio * 0.2);
    const opacity = 1 - Math.pow(absRatio, 3);

    card.style.transform = `perspective(1200px) translate3d(0, 0, ${zTranslate}px) rotateX(0deg) rotateY(${rotateY}deg) scale(${scale})`;
    card.style.opacity = Math.max(0.1, opacity);
    card.style.zIndex = Math.round((1 - absRatio) * 100);
  });

  requestAnimationFrame(update3DScroll);
}
update3DScroll();

// 5. 3D Hover Tilt for Grid Cards (same pattern as hasamisa-studio)
window.bindTiltEffect = (scope = document) => {
  const tiltCards = scope.querySelectorAll('.tilt-effect');
  tiltCards.forEach(card => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = 'true';
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
  });
};
window.bindTiltEffect();

// 6. Anti-Save & Right-Click Prevention Global
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dragstart', e => {
  if (e.target.nodeName.toUpperCase() === 'IMG') {
    e.preventDefault();
  }
});

// 7. Lightbox and Routing System
function initLightbox() {
  const modal = document.createElement('div');
  modal.id = 'lightbox-modal';
  modal.innerHTML = `
    <div class="lightbox-content">
      <div class="lightbox-close">&times;</div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.lightbox-close');
  const content = modal.querySelector('.lightbox-content');

  // Helper: duck all audio to 0 and save volumes for restore
  const duckAudio = () => {
    if (typeof AudioManager === 'undefined') return;
    AudioManager.lightboxOpen = true;
    AudioManager._savedVolumes = {};
    Object.keys(AudioManager.sounds).forEach(key => {
      if (AudioManager.sounds[key]) {
        AudioManager._savedVolumes[key] = AudioManager.sounds[key].volume;
        AudioManager.sounds[key].volume = 0;
      }
    });
  };

  // Helper: restore all audio volumes after lightbox close
  const restoreAudio = () => {
    if (typeof AudioManager === 'undefined' || AudioManager.isMuted) return;
    AudioManager.lightboxOpen = false;
    Object.keys(AudioManager.sounds).forEach(key => {
      if (AudioManager.sounds[key] && AudioManager._savedVolumes && AudioManager._savedVolumes[key] !== undefined) {
        AudioManager.sounds[key].volume = AudioManager._savedVolumes[key];
      }
    });
    AudioManager._savedVolumes = {};
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    restoreAudio();
    setTimeout(() => {
      Array.from(content.children).forEach(child => {
        if (!child.classList.contains('lightbox-close')) child.remove();
      });
    }, 300);
  };

  closeBtn.addEventListener('click', closeLightbox);

  window.bindLightbox = (scope = document) => {
    const cards = scope.querySelectorAll('.project-showcase:not(.lightbox-bound), .asset-card:not(.lightbox-bound)');
    cards.forEach(card => {
      card.classList.add('lightbox-bound');

      let startX = 0;
      let startY = 0;

      card.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
      });

      card.addEventListener('click', (e) => {
        // Prevent click if mouse dragged more than 5 pixels
        if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) return;

        // Ignore clicks on handles
        if (e.target.closest('.slider-handle')) return;

        // Routing Logic — use SPA navigation for project links
        if (card.dataset.link) {
          const link = card.dataset.link;
          if (link.startsWith('/projects/')) {
            const projectId = link.split('/projects/')[1].replace('.html', '');
            navigateToProject(projectId);
          } else {
            window.location.href = link;
          }
          return;
        }

        // YouTube Embed Lightbox
        if (card.dataset.youtube) {
          Array.from(content.children).forEach(child => {
            if (!child.classList.contains('lightbox-close')) child.remove();
          });

          const ytId = card.dataset.youtube;
          const ratioStr = card.style.getPropertyValue('--card-ratio') || '16/9';
          const parts = ratioStr.split('/').map(Number);
          const ratio = (parts[0] && parts[1]) ? parts[0] / parts[1] : 16 / 9;

          let w = window.innerWidth * 0.95;
          let h = w / ratio;
          const maxH = window.innerHeight * 0.9;
          if (h > maxH) { h = maxH; w = h * ratio; }

          const iframe = document.createElement('iframe');
          iframe.className = 'yt-embed-frame';
          iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
          iframe.style.width = `${Math.floor(w)}px`;
          iframe.style.height = `${Math.floor(h)}px`;
          iframe.allow = 'autoplay; fullscreen; picture-in-picture';
          iframe.allowFullscreen = true;
          iframe.frameBorder = '0';

          content.appendChild(iframe);
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
          duckAudio();
          return;
        }

        // Lightbox Expansion
        // We only clear the media elements, not the close button
        Array.from(content.children).forEach(child => {
          if (!child.classList.contains('lightbox-close')) child.remove();
        });

        const slider = card.querySelector('.comparison-slider');
        if (slider) {
          const clonedSlider = slider.cloneNode(true);
          clonedSlider.classList.remove('bound');

          const ratioStr = card.dataset.hdRatio || card.style.getPropertyValue('--card-ratio') || '16/9';
          let [rw, rh] = ratioStr.split('/').map(Number);
          if (!rw || !rh) { rw = 16; rh = 9; }
          const ratio = rw / rh;

          let w = window.innerWidth * 0.95;
          let h = w / ratio;

          const maxH = window.innerHeight * 0.95;
          if (h > maxH) {
            h = maxH;
            w = h * ratio;
          }

          clonedSlider.style.width = `${Math.floor(w)}px`;
          clonedSlider.style.height = `${Math.floor(h)}px`;
          clonedSlider.style.maxWidth = 'none';
          clonedSlider.style.maxHeight = 'none';
          clonedSlider.style.aspectRatio = 'auto'; // Disable CSS

          if (slider.dataset.hdBefore) {
            const beforeMedia = clonedSlider.querySelector('.before-image img');
            if (beforeMedia) {
              const loader = document.createElement('div');
              loader.className = 'hd-loader';
              clonedSlider.querySelector('.before-image').appendChild(loader);

              const loadHdBefore = () => {
                const hdImg = new Image();
                hdImg.onload = () => {
                  beforeMedia.src = hdImg.src;
                  loader.remove();
                };
                hdImg.src = slider.dataset.hdBefore;
              };

              if (beforeMedia.complete) loadHdBefore();
              else { beforeMedia.onload = loadHdBefore; beforeMedia.onerror = loadHdBefore; }
            }
          }
          if (slider.dataset.hdAfter) {
            const afterMedia = clonedSlider.querySelector('.after-image img');
            if (afterMedia) {
              const loader = document.createElement('div');
              loader.className = 'hd-loader';
              clonedSlider.querySelector('.after-image').appendChild(loader);

              const loadHdAfter = () => {
                const hdImg = new Image();
                hdImg.onload = () => {
                  afterMedia.src = hdImg.src;
                  loader.remove();
                };
                hdImg.src = slider.dataset.hdAfter;
              };

              if (afterMedia.complete) loadHdAfter();
              else { afterMedia.onload = loadHdAfter; afterMedia.onerror = loadHdAfter; }
            }
          }

          content.appendChild(clonedSlider);
          if (typeof bindSliders === 'function') bindSliders(modal);
        } else {
          const mediaContainer = card.querySelector('.media-container');
          if (!mediaContainer) return;

          if (mediaContainer.dataset.hdBefore) {
            // Secretly construct a full slider for the lightbox since the card itself is static
            const newSlider = document.createElement('div');
            newSlider.className = 'comparison-slider';
            
            // Extract ratio from parent dynamic card for this manual slider build
            const ratioStr = card.dataset.hdRatio || card.style.getPropertyValue('--card-ratio') || '16/9';
            let [rw, rh] = ratioStr.split('/').map(Number);
            if (!rw || !rh) { rw = 16; rh = 9; }
            const ratio = rw / rh;

            let w = window.innerWidth * 0.95;
            let h = w / ratio;

            const maxH = window.innerHeight * 0.95;
            if (h > maxH) {
              h = maxH;
              w = h * ratio;
            }

            newSlider.style.width = `${Math.floor(w)}px`;
            newSlider.style.height = `${Math.floor(h)}px`;
            newSlider.style.maxWidth = 'none';
            newSlider.style.maxHeight = 'none';
            newSlider.style.aspectRatio = 'auto'; 

            newSlider.innerHTML = `
              <div class="before-image"><img src=""></div>
              <div class="after-image"><img src=""></div>
              <div class="slider-handle"></div>
            `;
            const beforeMedia = newSlider.querySelector('.before-image img');
            const afterMedia = newSlider.querySelector('.after-image img');
            
            const loaderBefore = document.createElement('div');
            loaderBefore.className = 'hd-loader';
            newSlider.querySelector('.before-image').appendChild(loaderBefore);

            const loadHdBefore = () => {
              const hdImg = new Image();
              hdImg.onload = () => {
                beforeMedia.src = hdImg.src;
                loaderBefore.remove();
              };
              hdImg.src = mediaContainer.dataset.hdBefore;
            };
            loadHdBefore();
            
            const loaderAfter = document.createElement('div');
            loaderAfter.className = 'hd-loader';
            newSlider.querySelector('.after-image').appendChild(loaderAfter);

            const loadHdAfter = () => {
              const hdImg = new Image();
              hdImg.onload = () => {
                afterMedia.src = hdImg.src;
                loaderAfter.remove();
              };
              hdImg.src = mediaContainer.dataset.hd || mediaContainer.querySelector('img, video').src;
            };
            loadHdAfter();
            
            content.appendChild(newSlider);
            if (typeof bindSliders === 'function') bindSliders(modal);

          } else {
            let media = mediaContainer.querySelector('img, video');
            if (!media) return;

            const clonedMedia = media.cloneNode(true);
            clonedMedia.className = '';

            // HD Image swapping with Progressive Loading
            if (mediaContainer.dataset.hd) {
              if (clonedMedia.tagName.toLowerCase() === 'img') {
                const loader = document.createElement('div');
                loader.className = 'hd-loader';
                content.appendChild(loader); // Append loader to content, it will be removed after image loads

                const loadHd = () => {
                  const hdImg = new Image();
                  hdImg.onload = () => {
                    clonedMedia.src = hdImg.src;
                    loader.remove();
                  };
                  hdImg.src = mediaContainer.dataset.hd;
                };

                if (clonedMedia.complete) loadHd();
                else { clonedMedia.onload = loadHd; clonedMedia.onerror = loadHd; }
              } else if (clonedMedia.tagName.toLowerCase() === 'video') {
                clonedMedia.src = mediaContainer.dataset.hd;
              }
            }
            content.appendChild(clonedMedia);
          }
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
        // Duck site audio if lightbox contains video (keeps audio in sync)
        if (content.querySelector('video, iframe')) duckAudio();

        // Bind cursor hover for lightbox content (rotating lens inside, lantern outside)
        const cursorEl = document.querySelector('.custom-cursor');
        if (cursorEl) {
          content.addEventListener('mouseenter', () => cursorEl.classList.add('hover'));
          content.addEventListener('mouseleave', () => cursorEl.classList.remove('hover'));

          // Re-bind slider handles inside lightbox for sliding class
          const lbHandles = content.querySelectorAll('.slider-handle');
          lbHandles.forEach(h => {
            h.addEventListener('mouseenter', () => {
              cursorEl.classList.add('sliding');
              cursorEl.classList.remove('hover');
            });
            h.addEventListener('mouseleave', () => {
              cursorEl.classList.remove('sliding');
              cursorEl.classList.add('hover');
            });
          });
        }
      });
    });
  };

  bindLightbox(document);

  // Custom observer to release scroll lock when closing
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (!modal.classList.contains('active')) {
        document.body.style.overflow = '';
      }
    });
  });
  observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
}
document.addEventListener('DOMContentLoaded', initLightbox);

// --- Nav Scroll Observer ---
let isManualScrolling = false;

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section, header, footer');
  const navRadios = document.querySelectorAll('.nav-switcher input[type="radio"]');
  const navOptions = document.querySelectorAll('.nav-switcher .switcher__option');

  if (navRadios.length === 0) return;

  // 1. Handle Manual Clicks (Prevent Flicker)
  navOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const input = opt.querySelector('input');
      const targetId = input.value;

      isManualScrolling = true;

      // Perform the scroll
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }

      // Re-enable observer strictly when scroll fully finishes
      clearTimeout(window.manualScrollTimeout);
      const onScrollEnd = () => {
        isManualScrolling = false;
        window.removeEventListener('scrollend', onScrollEnd);
      };
      window.addEventListener('scrollend', onScrollEnd);
      // Fallback for older browsers
      window.manualScrollTimeout = setTimeout(onScrollEnd, 1500);
    });

    // Add hover mutually exclusive audio to nav options
    opt.addEventListener('mouseenter', () => {
      if (typeof AudioManager !== 'undefined') {
        AudioManager.stop('lantern');
        AudioManager.play('hover');
      }
    });
    opt.addEventListener('mouseleave', () => {
      if (typeof AudioManager !== 'undefined') {
        AudioManager.stop('hover');
        AudioManager.play('lantern');
      }
    });
  });

  // Global click audio delegation
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('a, button, .project-showcase, input, .lightbox-close, .switcher__option, .asset-card, .story-image-card, .liquid-button, .spec-item, .skill-card')) {
      if (typeof AudioManager !== 'undefined') {
        AudioManager.play('click');
      }
    }
  });

  // Global glitch audio delegation
  document.body.addEventListener('mouseover', (e) => {
    const chromaticText = e.target.closest('.chromatic-text');
    // Ensure we only trigger once when entering the bounds of the element (like mouseenter)
    if (chromaticText && !chromaticText.contains(e.relatedTarget)) {
      if (typeof AudioManager !== 'undefined') {
        if (AudioManager.sounds?.glitch) {
          AudioManager.sounds.glitch.currentTime = 0;
        }
        AudioManager.play('glitch');
      }
    }
  });

  // Global glitch audio delegation
  document.body.addEventListener('mouseover', (e) => {
    const chromaticText = e.target.closest('.chromatic-text');
    // Ensure we only trigger once when entering the bounds of the element (like mouseenter)
    if (chromaticText && !chromaticText.contains(e.relatedTarget)) {
      if (typeof AudioManager !== 'undefined') {
        if (AudioManager.sounds?.glitch) {
          AudioManager.sounds.glitch.currentTime = 0;
        }
        AudioManager.play('glitch');
      }
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    if (isManualScrolling) return; // FIX: Ignore while manually scrolling

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const correspondingRadio = document.querySelector(`.nav-switcher input[value="${id}"]`);
        if (correspondingRadio) {
          correspondingRadio.checked = true;
          correspondingRadio.dispatchEvent(new Event('change'));
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.id) observer.observe(section);
  });
});

/* --- Dynamic Audio Manager --- */
const AudioManager = {
  isMuted: true,
  hasInteracted: false,
  sounds: {
    ambient1: null,
    ambient2A: null,
    ambient2B: null,
    lantern: null,
    hover: null,
    click: null,
    glitch: null
  },

  // Custom Overlapping Loop Settings mapping directly to seconds
  ambientSettings: {
    transitionDelaySeconds: 53.00,  // End of ambient 1 / Start of ambient 2
    ambient2OverlapDelay: 39.83     // Loop trigger point for overlapping
  },
  nextAmbient2Track: 'ambient2A',

  init() {
    if (this.sounds.ambient1) return; // Already initialized

    const savedAmbientVol = parseFloat(localStorage.getItem('hasamisa_ambientVol') ?? '1');
    const savedSfxVol = parseFloat(localStorage.getItem('hasamisa_sfxVol') ?? '1');
    const baseVolumes = { ambient1: 0.5, ambient2A: 0.3, ambient2B: 0.3, lantern: 0.5, hover: 0.4, click: 0.8, glitch: 0.6 };

    this.sounds.ambient1 = new Audio('/audio/ambient1.mp3');
    this.sounds.ambient1.loop = false;
    this.sounds.ambient1.volume = baseVolumes.ambient1 * savedAmbientVol;

    this.sounds.ambient2A = new Audio('/audio/ambient2.mp3');
    this.sounds.ambient2A.loop = false;
    this.sounds.ambient2A.volume = baseVolumes.ambient2A * savedAmbientVol;

    this.sounds.ambient2B = new Audio('/audio/ambient2.mp3');
    this.sounds.ambient2B.loop = false;
    this.sounds.ambient2B.volume = baseVolumes.ambient2B * savedAmbientVol;

    this.sounds.lantern = new Audio('/audio/lantern-burn.mp3');
    this.sounds.lantern.loop = true;
    this.sounds.lantern.volume = baseVolumes.lantern * savedSfxVol;

    this.sounds.hover = new Audio('/audio/ui-hover.mp3');
    this.sounds.hover.loop = true;
    this.sounds.hover.volume = baseVolumes.hover * savedSfxVol;

    this.sounds.click = new Audio('/audio/ui-click.mp3');
    this.sounds.click.volume = baseVolumes.click * savedSfxVol;

    this.sounds.glitch = new Audio('/audio/glitch.mp3');
    this.sounds.glitch.volume = baseVolumes.glitch * savedSfxVol;
  },

  // Called once on user's first click (start button or any click)
  startPlayback() {
    if (this.hasInteracted) return;
    this.hasInteracted = true;
    this.isMuted = false;

    // Try to play — if browser blocks it (no user gesture), reset and retry on click
    const p = this.sounds.ambient1.play();
    if (p && p.then) {
      p.then(() => {
        // Audio started successfully — schedule ambient2 and lantern
        setTimeout(() => {
          this.playOverlappingAmbient2();
        }, this.ambientSettings.transitionDelaySeconds * 1000);
        this.play('lantern');
      }).catch(() => {
        // Autoplay blocked — reset state and wait for a real user click
        this.hasInteracted = false;
        this.isMuted = true;
        window.addEventListener('click', () => this.startPlayback(), { once: true });
      });
    } else {
      // Fallback for browsers that don't return a promise
      setTimeout(() => {
        this.playOverlappingAmbient2();
      }, this.ambientSettings.transitionDelaySeconds * 1000);
      this.play('lantern');
    }
  },

  playOverlappingAmbient2() {
    if (this.isMuted) return;

    // Play the current track
    this.play(this.nextAmbient2Track);

    // Swap tracks for the next loop so they can overlap
    this.nextAmbient2Track = this.nextAmbient2Track === 'ambient2A' ? 'ambient2B' : 'ambient2A';

    // Schedule the next track to start overlapping based on the delay setting
    setTimeout(() => {
      this.playOverlappingAmbient2();
    }, this.ambientSettings.ambient2OverlapDelay * 1000);
  },

  play(soundName) {
    if (this.isMuted || !this.sounds[soundName]) return;

    const audio = this.sounds[soundName];
    // Reset time for quick consecutive sound effects (like rapid hovering/clicking)
    if (!audio.loop) {
      audio.currentTime = 0;
    }

    // Play with catch to prevent console spam if browser blocks it
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => { /* Audio blocked */ });
    }
  },

  stop(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
    }
  },

    toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      Object.keys(this.sounds).forEach(key => this.stop(key));
    } else {
      this.play('ambient');
    }
  }
};

// --- LANDING OVERLAY LOGIC --- //
document.addEventListener('DOMContentLoaded', () => {
  const landingOverlay = document.getElementById('landing-overlay');
  const startBtn = document.getElementById('start-btn');
  const cursor = document.querySelector('.custom-cursor');

  const hasVisited = sessionStorage.getItem('hasamisa_visited');

  // Always init AudioManager (creates Audio objects but doesn't play yet)
  AudioManager.init();

  if (landingOverlay) {
    if (hasVisited === 'true') {
      // Already visited this session — remove overlay, start audio
      landingOverlay.style.display = 'none';
      setTimeout(() => landingOverlay.remove(), 10);
      document.body.style.overflow = '';
      AudioManager.startPlayback();
    } else {
      document.body.style.overflow = 'hidden';
    }
  } else {
    // Blog page loaded directly (not via SPA) — wait for user click to start audio
    window.addEventListener('click', () => AudioManager.startPlayback(), { once: true });
  }

  if (startBtn && landingOverlay && hasVisited !== 'true') {
    startBtn.addEventListener('mouseenter', () => {
      if (cursor) cursor.classList.add('hover');
    });
    startBtn.addEventListener('mouseleave', () => {
      if (cursor) cursor.classList.remove('hover');
    });

    startBtn.addEventListener('click', () => {
      document.body.style.overflow = '';
      sessionStorage.setItem('hasamisa_visited', 'true');
      AudioManager.startPlayback();

      landingOverlay.classList.add('fade-out');
      setTimeout(() => landingOverlay.remove(), 800);
    });
  }
});

// =====================================================================
// SPA NAVIGATION — Navigate to projects without full page reload.
// Audio keeps playing because we never leave the page.
// =====================================================================
window._mainPageScrollY = 0;

window.navigateToProject = (projectId) => {
  // Save scroll position
  window._mainPageScrollY = window.scrollY;

  // Hide main page content
  const mainNav = document.getElementById('main-nav');
  const mainContent = document.querySelector('main');
  const footer = document.querySelector('footer');
  const settingsContainer = document.querySelector('.settings-container');
  if (mainNav) mainNav.style.display = 'none';
  if (mainContent) mainContent.style.display = 'none';
  if (footer) footer.style.display = 'none';

  // Show project wrapper
  const wrapper = document.getElementById('project-page-wrapper');
  wrapper.style.display = 'block';

  // Render project content
  renderProjectPage(projectId);

  // Scroll to top
  window.scrollTo(0, 0);

  // Update URL without reload
  history.pushState({ project: projectId }, '', '/projects/' + projectId);

  // Initialize project nav pill position on the "Overview" button
  setTimeout(() => {
    const projectNav = document.getElementById('project-nav');
    if (projectNav) {
      const overviewRadio = projectNav.querySelector('input[value="overview"]');
      if (overviewRadio) overviewRadio.checked = true;
      const checkedLabel = overviewRadio ? overviewRadio.closest('.switcher__option') : null;
      if (checkedLabel) {
        projectNav.style.setProperty('--pill-left', `${checkedLabel.offsetLeft}px`);
        projectNav.style.setProperty('--pill-width', `${checkedLabel.offsetWidth}px`);
      }
    }
  }, 50);

  // Re-bind cursor hovers for the project nav
  if (window.bindCursorHover) setTimeout(() => window.bindCursorHover(), 200);
};

window.navigateHome = (hash) => {
  // Hide project wrapper and clear its content
  const wrapper = document.getElementById('project-page-wrapper');
  wrapper.style.display = 'none';
  document.getElementById('project-container').innerHTML = '';

  // Show main page content
  const mainNav = document.getElementById('main-nav');
  const mainContent = document.querySelector('main');
  const footer = document.querySelector('footer');
  if (mainNav) mainNav.style.display = '';
  if (mainContent) mainContent.style.display = '';
  if (footer) footer.style.display = '';

  // Update URL
  history.pushState(null, '', '/' + (hash || ''));

  // Restore scroll or scroll to hash target
  if (hash) {
    const target = document.getElementById(hash.replace('#', ''));
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  } else {
    window.scrollTo(0, window._mainPageScrollY || 0);
  }
};

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.project) {
    navigateToProject(e.state.project);
  } else {
    // Going back to home
    const wrapper = document.getElementById('project-page-wrapper');
    if (wrapper && wrapper.style.display !== 'none') {
      // We're on a project page, go back to main
      wrapper.style.display = 'none';
      document.getElementById('project-container').innerHTML = '';
      document.getElementById('main-nav').style.display = '';
      document.querySelector('main').style.display = '';
      document.querySelector('footer').style.display = '';
      window.scrollTo(0, window._mainPageScrollY || 0);
    }
  }
});

// Bind the project back button and nav pill
document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('project-back-btn');
  const projectNav = document.getElementById('project-nav');

  // Make the project nav pill respond to radio changes
  if (projectNav) {
    const projectRadios = projectNav.querySelectorAll('.switcher__input');
    projectRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        const label = radio.closest('.switcher__option');
        if (label) {
          projectNav.style.setProperty('--pill-left', `${label.offsetLeft}px`);
          projectNav.style.setProperty('--pill-width', `${label.offsetWidth}px`);
        }
      });
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Play click sound
      if (typeof AudioManager !== 'undefined') AudioManager.play('click');
      // Slide pill to the Back button first
      if (projectNav) {
        const backLabel = backBtn.closest('.switcher__option') || backBtn;
        projectNav.style.setProperty('--pill-left', `${backLabel.offsetLeft}px`);
        projectNav.style.setProperty('--pill-width', `${backLabel.offsetWidth}px`);
      }
      // Smooth scroll to top, then navigate home after delay
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        navigateHome('#games');
      }, 500);
    });
  }
});

// --- SETTINGS PANEL LOGIC --- //
document.addEventListener('DOMContentLoaded', () => {
  const settingsTrigger = document.getElementById('settings-trigger');
  const settingsDropdown = document.querySelector('.settings-dropdown');
  const toggleMoths = document.getElementById('toggle-moths');
  const toggleCursors = document.getElementById('toggle-cursors');
  const togglePerf = document.getElementById('toggle-perf');
  const ambientVolSlider = document.getElementById('ambient-vol');
  const sfxVolSlider = document.getElementById('sfx-vol');

  // --- Restore persisted settings ---
  const savedAmbientVol = localStorage.getItem('hasamisa_ambientVol');
  const savedSfxVol = localStorage.getItem('hasamisa_sfxVol');
  const savedPerf = localStorage.getItem('hasamisa_perf');
  const savedCursor = localStorage.getItem('hasamisa_cursor');
  const savedMoths = localStorage.getItem('hasamisa_moths');

  if (ambientVolSlider && savedAmbientVol !== null) ambientVolSlider.value = savedAmbientVol;
  if (sfxVolSlider && savedSfxVol !== null) sfxVolSlider.value = savedSfxVol;
  if (togglePerf && savedPerf !== null) {
    togglePerf.checked = savedPerf === 'true';
    if (savedPerf === 'true') document.body.classList.add('perf-mode');
  }
  if (toggleCursors && savedCursor !== null) toggleCursors.checked = savedCursor === 'true';
  if (toggleMoths && savedMoths !== null) {
    toggleMoths.checked = savedMoths === 'true';
    window.PARTICLES_ENABLED = savedMoths === 'true';
  }

  if (settingsTrigger) {
    settingsTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      settingsDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
      if (!settingsDropdown.contains(e.target) && !settingsTrigger.contains(e.target)) {
        settingsDropdown.classList.remove('active');
      }
    });
    if (toggleMoths) {
      toggleMoths.addEventListener('change', (e) => {
        window.PARTICLES_ENABLED = e.target.checked;
        localStorage.setItem('hasamisa_moths', e.target.checked);
      });
    }

    // Reuse the style tag from IIFE (only exists when cursor is OFF), or create one on demand
    const getStyleBlock = () => {
      let s = document.getElementById('universal-cursor-style');
      if (!s) {
        s = document.createElement('style');
        s.id = 'universal-cursor-style';
        document.head.appendChild(s);
      }
      return s;
    };

    if (toggleCursors) {
      toggleCursors.addEventListener('change', (e) => {
        const customCursor = document.querySelector('.custom-cursor');
        localStorage.setItem('hasamisa_cursor', e.target.checked);
        const styleBlock = getStyleBlock();
        if (e.target.checked) {
          // Custom cursor ON: CSS already hides native cursor, just show custom element
          if (customCursor) customCursor.style.display = 'block';
          styleBlock.innerHTML = ''; // Remove any native-cursor override
        } else {
          // Custom cursor OFF: restore native cursor and hide element
          if (customCursor) customCursor.style.display = 'none';
          styleBlock.innerHTML = `
            * { cursor: auto !important; }
            a, a *, button, button *, input:not([type="range"]), .settings-wrapper, .settings-wrapper *, .lightbox-close, .skill-card, .menu, .dock img, .switcher__option, .switcher__text, .nav-switcher, .nav-switcher *, .card-icon, label, .toggle-switch, .toggle-slider, .project-showcase, .asset-card { cursor: pointer !important; }
            input[type="range"], .slider-handle { cursor: ew-resize !important; }
          `;
        }
      });
    }
    
    if (typeof AudioManager !== 'undefined') {
      const baseVolumes = {
        ambient1: 0.5, ambient2A: 0.3, ambient2B: 0.3,
        lantern: 0.5, hover: 0.4, click: 0.8, glitch: 0.6
      };

      if (ambientVolSlider) {
        ambientVolSlider.addEventListener('input', (e) => {
          const masterVol = parseFloat(e.target.value);
          localStorage.setItem('hasamisa_ambientVol', masterVol);
          ['ambient1', 'ambient2A', 'ambient2B'].forEach(key => {
            if (AudioManager.sounds[key]) AudioManager.sounds[key].volume = baseVolumes[key] * masterVol;
          });
        });
      }

      if (sfxVolSlider) {
        sfxVolSlider.addEventListener('input', (e) => {
          const masterVol = parseFloat(e.target.value);
          localStorage.setItem('hasamisa_sfxVol', masterVol);
          ['lantern', 'hover', 'click', 'glitch'].forEach(key => {
            if (AudioManager.sounds[key]) AudioManager.sounds[key].volume = baseVolumes[key] * masterVol;
          });
        });
      }
    }

    if (togglePerf) {
      togglePerf.addEventListener('change', (e) => {
        localStorage.setItem('hasamisa_perf', e.target.checked);
        if (e.target.checked) document.body.classList.add('perf-mode');
        else document.body.classList.remove('perf-mode');
      });
    }
  }
});

// --- PROJECT PAGE RENDERER --- //
window.renderProjectPage = async (projectId) => {
  try {
    let response;
    try {
      response = await fetch('/data.json');
      if (!response.ok) throw new Error('Not found at root');
    } catch(e) {
      // Fallback for live-server/static hosting where public isn't mapped to root
      response = await fetch('/public/data.json'); 
    }
    const data = await response.json();
    const project = data.projects && data.projects[projectId];
    if (!project) return;
    
    const container = document.getElementById('project-container');
    if (!container) return;
    
    const title3 = project.titlePath3 ? project.titlePath3 : '';
    
    // Header
    const titleHTML = `
      <header class="project-header">
        <img src="${project.heroBg}" alt="Hero" class="project-header-bg">
        <div class="project-title-area">
          <h1 class="chromatic-text" data-text="${project.titlePath1}${project.titlePath2}${title3}">${project.titlePath1}<span class="cyan-text">${project.titlePath2}</span>${title3}</h1>
          <div class="project-meta">
            ${project.meta.map(m => `<span>${m}</span>`).join('')}
          </div>
        </div>
      </header>
    `;

    // Overview
    const overviewHTML = `
      <section class="story-section visible">
        <div class="story-grid">
          <div class="story-text">
            <h2 class="chromatic-text" data-text="${project.visionTitle}">${project.visionTitle}</h2>
            <p>${project.visionText}</p>
            <div class="tech-specs">
              ${project.specs.map(s => `
                <div class="spec-item">
                  <span class="spec-val">${s.val}</span>
                  <span class="spec-label">${s.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="asset-card story-image-card" data-hd="${project.visionImage}"><div class="media-container" style="border:none;background:none;box-shadow:none;"><img src="${project.visionImage}" alt="Vision" class="story-image"></div></div>
        </div>
      </section>
    `;

    // Deep Dive
    const deepDiveHTML = `
      <section class="story-section visible">
        <h2 class="chromatic-text" data-text="${project.deepDiveTitle}">${project.deepDiveTitle}</h2>
        <div class="story-grid">
          <div class="asset-card story-image-card" data-hd="${project.deepDiveImage}"><div class="media-container" style="border:none;background:none;box-shadow:none;"><img src="${project.deepDiveImage}" alt="Deep Dive" class="story-image"></div></div>
          <div class="story-text">
            <p>${project.deepDiveText}</p>
          </div>
        </div>
      </section>
    `;

    // Gallery
    const galleryHTML = `
      <section class="story-section visible">
        <h2 class="chromatic-text" data-text="Asset Gallery">Asset Gallery</h2>
        <p class="story-text">${project.galleryText}</p>
        <div class="asset-grid">
          ${project.assets.map(a => `
            <div class="asset-card gallery-card" style="--card-ratio: 1/1" data-hd-ratio="${a.aspectRatio || 'auto'}" >
              <div class="media-container" style="aspect-ratio: 1/1;" data-hd="${a.hd}">
                <img src="${a.thumb}" alt="Asset">
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    // CTA
    const ctaHTML = `
      <section class="story-section cta-container visible">
        <h2 class="chromatic-text" data-text="Experience the Game">Experience the Game</h2>
        <p class="story-text" style="margin-bottom: 30px;">Play the game now on Itch.io.</p>
        <a href="${project.itchLink}" target="_blank" style="text-decoration:none;">
          <button class="liquid-button">
            <span>Play on Itch.io</span>
            <div class="liquid"></div>
          </button>
        </a>
      </section>
    `;

    container.innerHTML = titleHTML + `<main class="project-content">` + ctaHTML + overviewHTML + deepDiveHTML + galleryHTML + `</main>`;
    
    // Remove is-loading so the background is visible right away without loader delay
    document.body.classList.remove('is-loading');

    // Bind lightbox logic for any hd assets
    if (window.bindLightbox) {
      setTimeout(() => window.bindLightbox(), 100);
    }
    
    // Bind cursor hovers for newly injected elements
    if (window.bindCursorHover) {
      setTimeout(() => window.bindCursorHover(), 100);
    }

    // Scroll reveal observer (Optional: Removed initial hidden CSS above to ensure visibility)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    container.querySelectorAll('.story-section').forEach(s => observer.observe(s));
    
  } catch (err) {
    console.error('Error loading project HTML:', err);
  }
};
