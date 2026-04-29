// 0. Custom Cursor — Glowing Lantern SVG + Hover Square
const createCursor = () => {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');

  // The lantern element
  const lantern = document.createElement('div');
  lantern.classList.add('cursor-lantern');
  lantern.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="72" viewBox="0 0 56 72" fill="none">
      <!-- Hanging ring -->
      <circle cx="28" cy="5" r="4" stroke="rgba(17,164,212,0.5)" stroke-width="1.2" fill="none"/>
      <!-- Chain -->
      <line x1="28" y1="9" x2="28" y2="16" stroke="rgba(17,164,212,0.4)" stroke-width="1.2" stroke-dasharray="2 1.5"/>
      <!-- Top cap -->
      <path d="M18 16 L38 16 L40 20 L16 20 Z" fill="rgba(17,164,212,0.15)" stroke="rgba(17,164,212,0.5)" stroke-width="0.8"/>
      <!-- Roof vent -->
      <rect x="24" y="13" width="8" height="3" rx="1" fill="rgba(17,164,212,0.1)" stroke="rgba(17,164,212,0.3)" stroke-width="0.5"/>
      <!-- Left frame rail -->
      <line x1="16" y1="20" x2="18" y2="56" stroke="rgba(17,164,212,0.5)" stroke-width="1.2"/>
      <!-- Right frame rail -->
      <line x1="40" y1="20" x2="38" y2="56" stroke="rgba(17,164,212,0.5)" stroke-width="1.2"/>
      <!-- Glass body -->
      <rect x="18" y="20" width="20" height="36" rx="2" fill="rgba(17,164,212,0.04)" stroke="rgba(17,164,212,0.25)" stroke-width="0.6"/>
      <!-- Horizontal glass dividers -->
      <line x1="18" y1="32" x2="38" y2="32" stroke="rgba(17,164,212,0.15)" stroke-width="0.4"/>
      <line x1="18" y1="44" x2="38" y2="44" stroke="rgba(17,164,212,0.15)" stroke-width="0.4"/>
      <!-- Vertical glass divider -->
      <line x1="28" y1="20" x2="28" y2="56" stroke="rgba(17,164,212,0.12)" stroke-width="0.4"/>
      <!-- Outer flame glow -->
      <ellipse cx="28" cy="38" rx="17.5" ry="25" fill="rgba(17,164,212,0.12)">
        <animate attributeName="ry" values="25;20;27.5;25" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      <!-- Main flame -->
      <ellipse cx="28" cy="38" rx="10" ry="17.5" fill="rgba(17,164,212,0.5)">
        <animate attributeName="ry" values="17.5;14;20;17.5" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0.7;0.4;0.5" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      <!-- Inner flame core -->
      <ellipse cx="28" cy="37" rx="5" ry="8.75" fill="rgba(180,240,255,0.9)">
        <animate attributeName="ry" values="8.75;6.25;10;8.75" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      <!-- Flame tip -->
      <ellipse cx="28" cy="28" rx="2.5" ry="5" fill="rgba(220,250,255,0.6)">
        <animate attributeName="ry" values="5;2.5;6.25;5" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="28;26;30;28" dur="1.8s" repeatCount="indefinite"/>
      </ellipse>
      <!-- Bottom base plate -->
      <path d="M16 56 L40 56 L42 60 L14 60 Z" fill="rgba(17,164,212,0.15)" stroke="rgba(17,164,212,0.5)" stroke-width="0.8"/>
      <!-- Feet -->
      <rect x="16" y="60" width="4" height="4" rx="1" fill="rgba(17,164,212,0.2)"/>
      <rect x="36" y="60" width="4" height="4" rx="1" fill="rgba(17,164,212,0.2)"/>
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

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  window.bindCursorHover = (scope = document) => {
    const hoverElements = scope.querySelectorAll('a, button, .skill-card, .project-showcase, input, .settings-wrapper, .settings-dropdown, .asset-card, .story-image-card');
    hoverElements.forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = 'true';
      el.addEventListener('mouseenter', () => {
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) customCursor.classList.add('hover');
        if (typeof AudioManager !== 'undefined') {
          AudioManager.stop('lantern');
          AudioManager.play('hover');
        }
      });
      el.addEventListener('mouseleave', () => {
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

window.PARTICLES_ENABLED = true;
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

    const isVideo = (path) => {
      if (!path) return false;
      const ext = path.split('.').pop().toLowerCase();
      return ['mp4', 'webm', 'ogg', 'mov'].includes(ext);
    };

    const renderMedia = (src, className = '', alt = '') => {
      if (isVideo(src)) {
        return `<video class="${className}" src="${src}" autoplay loop muted playsinline loading="lazy"></video>`;
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
      if (categoryKey === 'games' || categoryKey === 'skills') return;
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
const tiltCards = document.querySelectorAll('.tilt-effect');

tiltCards.forEach(card => {
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

        // Routing Logic
        if (card.dataset.link) {
          window.location.href = card.dataset.link;
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
    if (e.target.closest('a, button, .project-showcase, input, .lightbox-close, .switcher__option')) {
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
  isMuted: true, // Auto-play policies usually require this to be true initially
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
    ambient2OverlapDelay: 39.83     // Loop trigger point for overlapping (39s + (20frames/24fps))
  },
  nextAmbient2Track: 'ambient2A',

  init() {
    // Note: Update these paths to your actual public/audio/ files
    this.sounds.ambient1 = new Audio('/audio/ambient1.mp3');
    this.sounds.ambient1.loop = false;
    this.sounds.ambient1.volume = 0.5;

    // We use two tracks so they can overlap and play simultaneously
    this.sounds.ambient2A = new Audio('/audio/ambient2.mp3');
    this.sounds.ambient2A.loop = false;
    this.sounds.ambient2A.volume = 0.3;

    this.sounds.ambient2B = new Audio('/audio/ambient2.mp3');
    this.sounds.ambient2B.loop = false;
    this.sounds.ambient2B.volume = 0.3;

    this.sounds.lantern = new Audio('/audio/lantern-burn.mp3');
    this.sounds.lantern.loop = true;
    this.sounds.lantern.volume = 0.5;

    this.sounds.hover = new Audio('/audio/ui-hover.mp3');
    this.sounds.hover.loop = true;
    this.sounds.hover.volume = 0.4;

    this.sounds.click = new Audio('/audio/ui-click.mp3');
    this.sounds.click.volume = 0.8;

    this.sounds.glitch = new Audio('/audio/glitch.mp3');
    this.sounds.glitch.volume = 0.6;

    // Listen for the first user interaction to unlock audio engine safely
    window.addEventListener('click', () => {
      // Don't auto-start music if click is opening a lightbox
      if (this.lightboxOpen) return;
      if (!this.hasInteracted) {
        this.hasInteracted = true;
        this.isMuted = false;
        this.play('ambient1');

        // Adjustable seconds before the looping ambient2 starts
        setTimeout(() => {
          this.playOverlappingAmbient2();
        }, this.ambientSettings.transitionDelaySeconds * 1000);

        this.play('lantern');
      }
    }, { once: true });
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

  // Check session storage to see if user already dismissed it this session
  const hasVisited = sessionStorage.getItem('hasamisa_visited');

  if (landingOverlay) {
    if (hasVisited === 'true') {
      // User already clicked start previously, remove it immediately
      landingOverlay.style.display = 'none';
      setTimeout(() => landingOverlay.remove(), 10);
      document.body.style.overflow = '';
      if (typeof AudioManager !== 'undefined') AudioManager.init();
    } else {
      // Lock scroll while overlay is visible
      document.body.style.overflow = 'hidden';
    }
  }

  if (startBtn && landingOverlay && hasVisited !== 'true') {
    // Show rotating lens cursor on hover over the start button
    startBtn.addEventListener('mouseenter', () => {
      if (cursor) cursor.classList.add('hover');
    });
    startBtn.addEventListener('mouseleave', () => {
      if (cursor) cursor.classList.remove('hover');
    });

    startBtn.addEventListener('click', () => {
      // Unlock scroll
      document.body.style.overflow = '';

      // Initialize Audio on User Interaction
      if (typeof AudioManager !== 'undefined') {
        AudioManager.init();
      }
      
      // Save state so it doesn't reappear
      sessionStorage.setItem('hasamisa_visited', 'true');
      
      // Fade out and remove overlay
      landingOverlay.classList.add('fade-out');
      setTimeout(() => {
        landingOverlay.remove();
      }, 800);
    });
  } else if (!landingOverlay) {
    // If not on landing page, init audio directly so click listeners bind
    if (typeof AudioManager !== 'undefined') AudioManager.init();
  }
});

// --- SETTINGS PANEL LOGIC --- //
document.addEventListener('DOMContentLoaded', () => {
  const landingOverlay = document.getElementById('landing-overlay');
  
  if (!landingOverlay && typeof AudioManager !== 'undefined') {
    // If we're on a sub-page without landing overlay, initialize audio listener
    AudioManager.init();
  }
  
  const settingsTrigger = document.getElementById('settings-trigger');
  const settingsDropdown = document.querySelector('.settings-dropdown');
  const toggleMoths = document.getElementById('toggle-moths');
  const toggleCursors = document.getElementById('toggle-cursors');
  const togglePerf = document.getElementById('toggle-perf');
  const ambientVolSlider = document.getElementById('ambient-vol');
  const sfxVolSlider = document.getElementById('sfx-vol');

  if (settingsTrigger) {
    // Toggle Dropdown
    settingsTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      settingsDropdown.classList.toggle('active');
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!settingsDropdown.contains(e.target) && !settingsTrigger.contains(e.target)) {
        settingsDropdown.classList.remove('active');
      }
    });

    // Moth Particles Logic
    if (toggleMoths) {
      toggleMoths.addEventListener('change', (e) => {
        window.PARTICLES_ENABLED = e.target.checked;
      });
    }

    // Custom Cursor Logic
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(styleBlock);
    
    if (toggleCursors) {
      toggleCursors.addEventListener('change', (e) => {
        const customCursor = document.querySelector('.custom-cursor');
        if (e.target.checked) {
          if (customCursor) customCursor.style.display = 'block';
          styleBlock.innerHTML = '* { cursor: none !important; }';
        } else {
          if (customCursor) customCursor.style.display = 'none';
          styleBlock.innerHTML = `
            * { cursor: auto !important; }
            a, a *, button, button *, input:not([type="range"]), .settings-wrapper, .settings-wrapper *, .lightbox-close, .skill-card, .menu, .dock img, .switcher__option, .switcher__text, .nav-switcher, .nav-switcher *, .card-icon, label, .toggle-switch, .toggle-slider, .project-showcase { cursor: pointer !important; }
            input[type="range"], .slider-handle { cursor: ew-resize !important; }
          `;
        }
      });
    }
    
    // Audio Sliders Logic
    if (typeof AudioManager !== 'undefined') {
      const baseVolumes = {
        ambient1: 0.5, ambient2A: 0.3, ambient2B: 0.3,
        lantern: 0.5, hover: 0.4, click: 0.8, glitch: 0.6
      };

      if (ambientVolSlider) {
        ambientVolSlider.addEventListener('input', (e) => {
           const masterVol = parseFloat(e.target.value); 
           ['ambient1', 'ambient2A', 'ambient2B'].forEach(key => {
             if (AudioManager.sounds[key]) {
               AudioManager.sounds[key].volume = baseVolumes[key] * masterVol;
             }
           });
        });
      }

      if (sfxVolSlider) {
        sfxVolSlider.addEventListener('input', (e) => {
           const masterVol = parseFloat(e.target.value); 
           ['lantern', 'hover', 'click', 'glitch'].forEach(key => {
             if (AudioManager.sounds[key]) {
               AudioManager.sounds[key].volume = baseVolumes[key] * masterVol;
             }
           });
        });
      }
    }

    // Performance Mode Logic
    if (togglePerf) {
      togglePerf.addEventListener('change', (e) => {
        if (e.target.checked) {
          document.body.classList.add('perf-mode');
        } else {
          document.body.classList.remove('perf-mode');
        }
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
            <h2>${project.visionTitle}</h2>
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
        <h2>${project.deepDiveTitle}</h2>
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
        <h2>Asset Gallery</h2>
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
        <h2>Experience the Game</h2>
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
