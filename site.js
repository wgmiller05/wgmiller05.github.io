/* ============================================================
   SITE.JS
   Shared behavior for every page. Currently just one feature:
   click-to-enlarge (a "lightbox") for photos. Include this file
   on any page with <script src="site.js"></script> right before
   the closing </body> tag, and it wires itself up automatically —
   no other setup needed, even for new project pages.

   Which images are clickable: anything inside .side-box,
   .headshot-box, or .media-block (see styles.css). Add a new
   image inside one of those containers and it just works.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // Build the overlay once and reuse it for every image on the page.
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close">Close ✕</button>' +
    '<img alt="">';
  document.body.appendChild(overlay);

  var overlayImg = overlay.querySelector('img');
  var closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    overlayImg.setAttribute('src', src);
    overlayImg.setAttribute('alt', alt || '');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // stop background scroll while open
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click the dark background or the Close button to dismiss.
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === closeBtn) closeLightbox();
  });

  // Escape key also dismisses.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // Wire up every eligible image on the page.
  var selector = '.side-box img, .headshot-box img, .media-block img';
  document.querySelectorAll(selector).forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
    });
  });

});
