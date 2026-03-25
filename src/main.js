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

  // The hover square element (hidden by default)
  const square = document.createElement('div');
  square.classList.add('cursor-square');
  cursor.appendChild(square);

  document.body.appendChild(cursor);

  // Make visible instantly
  cursor.style.left = '50%';
  cursor.style.top = '50%';

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  const hoverElements = document.querySelectorAll('a, button, .slider-handle, .skill-card, .project-showcase, input');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
};
document.addEventListener('DOMContentLoaded', createCursor);

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

function animateMoths() {
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
animateMoths();

// 1.5 Dynamic JSON Gallery Loader
async function loadDynamicGallery() {
  const track = document.getElementById('json-gallery-track');
  if (!track) return;
  
  try {
    const response = await fetch('/data.json');
    if (!response.ok) throw new Error('Could not fetch data.json');
    
    const projects = await response.json();

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
    
    projects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-showcase glass-card dynamic-card';
      // Pass the aspect ratio to CSS so widths variably adjust!
      card.style.setProperty('--card-ratio', proj.aspectRatio || '16/9');

      const hasLink = !!proj.link;
      if (hasLink) card.dataset.link = proj.link;
      
      const iconHtml = hasLink 
        ? `<div class="card-icon link-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/></svg></div>`
        : `<div class="card-icon expand-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"/></svg></div>`;

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
          <h3>${proj.title}</h3>
          <div class="media-container" ${proj.hdImage ? `data-hd="${proj.hdImage}"` : ''}>
            ${renderMedia(proj.image, `ambient-img ${proj.animation || ''}`, proj.title)}
          </div>
        `;
      }
      
      track.appendChild(card);
    });

    // Re-bind hover cursors for the new dynamic cards
    const hoverElements = track.querySelectorAll('.project-showcase');
    const cursor = document.querySelector('.custom-cursor');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('hover');
      });
    });

    // Re-bind 3D Spatial depth array so newly injected cards get the 3D scroll effect
    cards3D = document.querySelectorAll('.glass-card, .project-showcase, .skill-card');

    // Re-bind newly injected comparison sliders
    if (typeof bindSliders === 'function') bindSliders(track);
    if (typeof bindLightbox === 'function') bindLightbox(track);

  } catch (error) {
    console.error('JSON Load Error:', error);
  }
}
document.addEventListener('DOMContentLoaded', loadDynamicGallery);

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
    <div class="lightbox-close">&times;</div>
    <div class="lightbox-content"></div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.lightbox-close');
  const content = modal.querySelector('.lightbox-content');

  const closeLightbox = () => {
    modal.classList.remove('active');
    setTimeout(() => { content.innerHTML = ''; }, 300);
  };

  closeBtn.addEventListener('click', closeLightbox);
  
  let modalDownX = 0, modalDownY = 0;
  modal.addEventListener('mousedown', (e) => {
    modalDownX = e.clientX;
    modalDownY = e.clientY;
  });
  modal.addEventListener('click', (e) => {
    if (e.target !== modal) return;
    if (Math.abs(e.clientX - modalDownX) > 5 || Math.abs(e.clientY - modalDownY) > 5) return;
    closeLightbox();
  });

  window.bindLightbox = (scope = document) => {
    const cards = scope.querySelectorAll('.project-showcase:not(.lightbox-bound)');
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

        // Lightbox Expansion
        content.innerHTML = ''; 

        const slider = card.querySelector('.comparison-slider');
        if (slider) {
          const clonedSlider = slider.cloneNode(true);
          clonedSlider.classList.remove('bound');
          
          const ratio = card.style.getPropertyValue('--card-ratio');
          if (ratio) clonedSlider.style.setProperty('--card-ratio', ratio);
          
          if (slider.dataset.hdBefore) {
            const beforeMedia = clonedSlider.querySelector('.before-image img, .before-image video');
            if (beforeMedia) beforeMedia.src = slider.dataset.hdBefore;
          }
          if (slider.dataset.hdAfter) {
            const afterMedia = clonedSlider.querySelector('.after-image img, .after-image video');
            if (afterMedia) afterMedia.src = slider.dataset.hdAfter;
          }

          content.appendChild(clonedSlider);
          if (typeof bindSliders === 'function') bindSliders(modal);
        } else {
          const mediaContainer = card.querySelector('.media-container');
          if (!mediaContainer) return;
          let media = mediaContainer.querySelector('img, video');
          if (!media) return;
          
          const clonedMedia = media.cloneNode(true);
          clonedMedia.className = '';
          
          if (mediaContainer.dataset.hd) {
            clonedMedia.src = mediaContainer.dataset.hd;
          }
          content.appendChild(clonedMedia);
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
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
