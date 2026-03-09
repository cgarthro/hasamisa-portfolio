// 0. Custom Cursor Logic
const createCursor = () => {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  const drop = document.createElement('div');
  drop.classList.add('water-drop');
  document.body.appendChild(drop);

  window.addEventListener('mousemove', (e) => {
    // Only animate direct cursor visually if not right at the edge (avoids clipping jitter)
    requestAnimationFrame(() => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      drop.style.left = `${e.clientX}px`;
      drop.style.top = `${e.clientY}px`;
    });
  });

  // Add hover effects on clickable elements
  const hoverElements = document.querySelectorAll('a, button, .slider-handle, .skill-card, .project-showcase, input');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursor.style.opacity = '1'; // keep square visible
      drop.style.opacity = '0';   // hide water drop
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      drop.style.opacity = '1';
    });
  });
};
document.addEventListener('DOMContentLoaded', createCursor);

// 1. Mouse Tracking Glow Effect
const mouseGlow = document.querySelector('.mouse-glow');
window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  // Use requestAnimationFrame for smooth performance
  requestAnimationFrame(() => {
    mouseGlow.style.left = `${x}px`;
    mouseGlow.style.top = `${y}px`;
  });
});

// 2. Horizontal Scroll Logic for Multiple Galleries
const gallerySections = document.querySelectorAll('.gallery-section');

window.addEventListener('scroll', () => {
  if (window.innerWidth < 1024) return; // Disabled on mobile to stack vertically

  gallerySections.forEach(section => {
    const track = section.querySelector('.gallery-track');
    const isReverse = section.classList.contains('reverse-scroll');

    // Calculate if section is in sticky view
    const rect = section.getBoundingClientRect();

    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      const scrolledInSection = Math.abs(rect.top);
      const maxScroll = rect.height - window.innerHeight;
      const progress = scrolledInSection / maxScroll;

      const maxTranslate = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.4);

      // If it has reverse-scroll class, it starts off-screen right and moves left.
      // Else it starts normal and moves left.
      if (isReverse) {
        // Start fully translated left, move right to 0
        const currentTranslate = maxTranslate - (maxTranslate * progress);
        track.style.transform = `translateX(-${currentTranslate}px)`;
      } else {
        track.style.transform = `translateX(-${maxTranslate * progress}px)`;
      }
    } else if (rect.top > 0) {
      // Setup initial state before scrolling into view
      if (isReverse) {
        const maxTranslate = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.4);
        track.style.transform = `translateX(-${maxTranslate}px)`;
      } else {
        track.style.transform = `translateX(0px)`;
      }
    }
  });
});


// 3. Image Comparison Slider Logic
const sliders = document.querySelectorAll('.comparison-slider');

sliders.forEach(slider => {
  const afterImage = slider.querySelector('.after-image');
  const innerImg = slider.querySelector('.after-image img');
  const sliderHandle = slider.querySelector('.slider-handle');

  let isSliding = false;

  const syncImageWidth = () => {
    const rect = slider.getBoundingClientRect();
    innerImg.style.width = `${rect.width}px`;
  };

  window.addEventListener('resize', syncImageWidth);
  // Initial sync might need a small delay to ensure images are loaded
  setTimeout(syncImageWidth, 100);

  const moveSlider = (x) => {
    const rect = slider.getBoundingClientRect();
    let position = x - rect.left;

    if (position < 0) position = 0;
    if (position > rect.width) position = rect.width;

    const percentage = (position / rect.width) * 100;

    afterImage.style.width = `${percentage}%`;
    sliderHandle.style.left = `${percentage}%`;
  };

  slider.addEventListener('mousedown', (e) => { isSliding = true; moveSlider(e.clientX); });
  window.addEventListener('mouseup', () => { isSliding = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isSliding) return;
    moveSlider(e.clientX);
  });

  slider.addEventListener('touchstart', (e) => { isSliding = true; moveSlider(e.touches[0].clientX); });
  window.addEventListener('touchend', () => { isSliding = false; });
  window.addEventListener('touchmove', (e) => {
    if (!isSliding) return;
    moveSlider(e.touches[0].clientX);
  }, { passive: true }); // passive true to allow normal page scrolling when not sliding, but might conflict if user drags vertically on slider. Usually OK.

  // Update inner width on scroll just in case sticky positioning messes with it
  window.addEventListener('scroll', syncImageWidth, { passive: true });
});

// 4. Advanced 3D Tilt Effect for Glass Cards
const tiltCards = document.querySelectorAll('.3d-tilt, .gallery-track .glass-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8; // subtle rotation
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});
