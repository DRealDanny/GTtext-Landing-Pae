/* ==========================================================================
   TRANSFORM YOUR KNOWLEDGE — script.js
   Core interactions: FAQ accordion, Vimeo popup modal, sticky mobile CTA
   (GSAP animations live separately in animation.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- FAQ Accordion ---------- */
  var triggers = document.querySelectorAll('.accordion__trigger');

  triggers.forEach(function (trigger) {
    var panel = trigger.nextElementSibling;

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other panels (single-open accordion)
      triggers.forEach(function (otherTrigger) {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherTrigger.nextElementSibling.style.maxHeight = null;
        }
      });

      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Vimeo popup modal ---------- */
  var videoTrigger = document.getElementById('videoTrigger');
  var modal = document.getElementById('videoModal');
  var modalVideoWrap = document.getElementById('modalVideoWrap');
  var closeButtons = modal ? modal.querySelectorAll('[data-close]') : [];
  var lastFocusedEl = null;

  function openModal() {
    var vimeoId = videoTrigger.getAttribute('data-vimeo-id') || '76979871';
    // Responsive Vimeo embed — player fills the 16:9 wrapper defined in CSS (.modal__video)
    modalVideoWrap.innerHTML =
      '<iframe src="https://player.vimeo.com/video/' + vimeoId + '?autoplay=1&title=0&byline=0&portrait=0" ' +
      'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy" ' +
      'title="GText Suites Dubai — Participant Testimonials"></iframe>';

    lastFocusedEl = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalVideoWrap.innerHTML = ''; // stop playback
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  if (videoTrigger) {
    videoTrigger.addEventListener('click', openModal);
  }
  closeButtons.forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  /* ---------- Sticky mobile CTA: hide once real CTAs are in view ---------- */
  var stickyCta = document.getElementById('stickyCta');
  var registerSection = document.getElementById('register');

  if (stickyCta && registerSection && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        stickyCta.style.transform = entry.isIntersecting ? 'translateY(120%)' : 'translateY(0)';
      });
    }, { threshold: 0.15 });

    observer.observe(registerSection);
  }

  /* Also hide sticky CTA near the very top (hero already has its own CTA) */
  var heroSection = document.getElementById('hero');
  if (stickyCta && heroSection && 'IntersectionObserver' in window) {
    var heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) stickyCta.style.transform = 'translateY(120%)';
      });
    }, { threshold: 0.2 });

    heroObserver.observe(heroSection);
  }

  /* ---------- Scroll to top ---------- */
  var scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    var toggleScrollTop = function () {
      if (window.scrollY > window.innerHeight * 0.8) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    };

    toggleScrollTop();
    window.addEventListener('scroll', toggleScrollTop, { passive: true });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});