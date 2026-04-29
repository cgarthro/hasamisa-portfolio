import re

with open("src/main.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Inject bindCursorHover function
cursor_block_regex = r"(const hoverElements = document\.querySelectorAll\('a, button, \.skill-card, \.project-showcase, input, \.settings-wrapper, \.settings-dropdown'\);\n\s*hoverElements\.forEach\(el => \{[\s\S]*?AudioManager\.play\('lantern'\);\n\s*\}\);\n\s*\}\);\n\s*\}\);)"
cursor_replacement = """window.bindCursorHover = (scope = document) => {
    const hoverElements = scope.querySelectorAll('a, button, .skill-card, .project-showcase, input, .settings-wrapper, .settings-dropdown, .asset-card, .story-image-card');
    hoverElements.forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = 'true';
      el.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        if(cursor) cursor.classList.add('hover');
        if (typeof AudioManager !== 'undefined') {
          AudioManager.stop('lantern');
          AudioManager.play('hover');
        }
      });
      el.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        if(cursor) cursor.classList.remove('hover');
        if (typeof AudioManager !== 'undefined') {
          AudioManager.stop('hover');
          AudioManager.play('lantern');
        }
      });
    });
  };
  window.bindCursorHover();"""
code = re.sub(cursor_block_regex, cursor_replacement, code)

# 2. Replace redundant cursor logic in loadDynamicGallery
dynamic_cursor_regex = r"(// Re-bind hover cursors for all the new dynamic cards\n\s*const hoverElements = document\.querySelectorAll\('\.dynamic-card'\);\n\s*const cursor = document\.querySelector\('\.custom-cursor'\);\n\s*hoverElements\.forEach\(el => \{[\s\S]*?AudioManager\.play\('lantern'\);\n\s*\}\);\n\s*\}\);\n\s*\}\);)"
dynamic_cursor_replacement = """// Re-bind hover cursors for all the new dynamic cards
    if (window.bindCursorHover) window.bindCursorHover();"""
code = re.sub(dynamic_cursor_regex, dynamic_cursor_replacement, code)

# 3. Replace redundant cursor logic in renderProjectPage
project_cursor_regex = r"(// Hover events for gallery cards\n\s*const newCards = document\.querySelectorAll\('\.gallery-card'\);\n\s*const cursor = document\.querySelector\('\.custom-cursor'\);\n\s*newCards\.forEach\(card => \{[\s\S]*?AudioManager\.play\('lantern'\);\n\s*\}\);\n\s*\}\);\n\s*\}\);)"
project_cursor_replacement = """// Hover events for new elements
    if (window.bindCursorHover) window.bindCursorHover();"""
code = re.sub(project_cursor_regex, project_cursor_replacement, code)

# 4. Make Asset gallery image boxes square (card-ratio 1/1)
ratio_regex = r"style=\"--card-ratio: \$\{a\.aspectRatio \|\| 'auto'\}\" data-hd-ratio=\"\$\{a\.aspectRatio \|\| 'auto'\}\""
ratio_replacement = """style="--card-ratio: 1/1" data-hd-ratio="${a.aspectRatio || 'auto'}" """
code = re.sub(ratio_regex, ratio_replacement, code)

# 5. Make Vision Image and Deep Dive image lightboxable
vision_regex = r"(<img src=\"\$\{project\.visionImage\}\" alt=\"Vision\" class=\"story-image\">)"
vision_replacement = """<div class="asset-card story-image-card" data-hd="${project.visionImage}"><div class="media-container" style="border:none;background:none;box-shadow:none;"><img src="${project.visionImage}" alt="Vision" class="story-image"></div></div>"""
code = re.sub(vision_regex, vision_replacement, code)

deep_regex = r"(<img src=\"\$\{project\.deepDiveImage\}\" alt=\"Deep Dive\" class=\"story-image\">)"
deep_replacement = """<div class="asset-card story-image-card" data-hd="${project.deepDiveImage}"><div class="media-container" style="border:none;background:none;box-shadow:none;"><img src="${project.deepDiveImage}" alt="Deep Dive" class="story-image"></div></div>"""
code = re.sub(deep_regex, deep_replacement, code)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(code)

print("done")
