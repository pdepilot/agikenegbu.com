/**
 * SDTG — Performance & Image SEO (mirrors root seo-performance.js)
 */
(function () {
    'use strict';
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    function init() {
        document.querySelectorAll('img:not([data-seo-processed])').forEach(function (img, index) {
            img.setAttribute('data-seo-processed', 'true');
            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
            var isHero = img.closest('.hero, .ls-hero, .gallery-hero, .donate-hero, .reg-hero, .spk-hero, .contact-hero, .about-hero');
            if (isHero || index < 2) {
                if (!img.hasAttribute('loading')) img.setAttribute('loading', 'eager');
            } else if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            if (!img.getAttribute('alt') || !img.getAttribute('alt').trim()) {
                var name = (img.getAttribute('src') || '').split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
                if (name) img.setAttribute('alt', name);
            }
        });
    }
})();
