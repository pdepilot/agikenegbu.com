/* SEO Manager Module */
(function () {
    'use strict';

    function $(sel) { return document.querySelector(sel); }

    function updatePreviews() {
        var ogTitle = $('#ogTitle');
        var ogDesc = $('#ogDescription');
        var ogUrl = $('#ogUrl');
        var twTitle = $('#twitterTitle');
        var twDesc = $('#twitterDescription');

        if (ogTitle) {
            $$('.cms-og-preview__title').forEach(function (el, i) {
                if (i === 0) el.textContent = ogTitle.value || 'Page Title';
            });
        }
        if (ogDesc) {
            $$('.cms-og-preview__desc').forEach(function (el, i) {
                if (i === 0) el.textContent = ogDesc.value || 'Meta description preview…';
            });
        }
        if (ogUrl) {
            $$('.cms-og-preview__url').forEach(function (el) {
                el.textContent = ogUrl.value || 'agikenebgu.org';
            });
        }
        if (twTitle) {
            var twPreview = $('#twitterPreviewTitle');
            if (twPreview) twPreview.textContent = twTitle.value || ogTitle && ogTitle.value || 'Twitter Title';
        }
        if (twDesc) {
            var twDescEl = $('#twitterPreviewDesc');
            if (twDescEl) twDescEl.textContent = twDesc.value || ogDesc && ogDesc.value || 'Twitter description…';
        }
    }

    function $$(sel) { return Array.from(document.querySelectorAll(sel)); }

    function initPageSelector() {
        var select = $('#seoPageSelect');
        if (!select) return;

        var pages = {
            'index.html': { title: 'AG Ikenebgu | Assemblies of God Church Port Harcourt', description: 'AG Ikenebgu Assemblies of God in Port Harcourt, Nigeria — spirit-filled worship, Bible teaching, family ministries.', keywords: 'Assemblies of God Port Harcourt, AG Ikenebgu', canonical: 'https://agikenebgu.org/' },
            'about.html': { title: 'About AG Ikenebgu | Vision, Mission & Our Story', description: 'Discover AG Ikenebgu Assemblies of God — our vision, mission, leadership.', keywords: 'about AG Ikenebgu, church vision mission', canonical: 'https://agikenebgu.org/about' },
            'sdgt/index.html': { title: 'Send Down Thy Glory | International Music Crusade', description: 'Send Down Thy Glory International Music Crusade — worship, revival, global gathering.', keywords: 'Send Down Thy Glory, SDTG, music crusade', canonical: 'https://agikenebgu.org/sdgt/' }
        };

        select.addEventListener('change', function () {
            var data = pages[select.value];
            if (!data) return;
            if ($('#seoTitle')) $('#seoTitle').value = data.title;
            if ($('#seoDescription')) $('#seoDescription').value = data.description;
            if ($('#seoKeywords')) $('#seoKeywords').value = data.keywords;
            if ($('#canonicalUrl')) $('#canonicalUrl').value = data.canonical;
            if ($('#ogTitle')) $('#ogTitle').value = data.title;
            if ($('#ogDescription')) $('#ogDescription').value = data.description;
            if ($('#ogUrl')) $('#ogUrl').value = data.canonical;
            updatePreviews();
            if (window.CMS) CMS.showToast('Loaded SEO data for ' + select.value, 'info');
        });
    }

    function updateSerp() {
        var title = $('#seoTitle');
        var desc = $('#seoDescription');
        var serpTitle = $('#serpTitle');
        var serpDesc = $('#serpDesc');
        if (title && serpTitle) serpTitle.textContent = title.value || 'Page Title';
        if (desc && serpDesc) serpDesc.textContent = desc.value || 'Meta description…';
    }

    function initLivePreview() {
        $$('#ogTitle, #ogDescription, #ogUrl, #twitterTitle, #twitterDescription, #seoTitle, #seoDescription').forEach(function (el) {
            el.addEventListener('input', function () {
                updatePreviews();
                updateSerp();
            });
        });
    }

    function initSitemapActions() {
        var regen = $('#regenerateSitemap');
        if (regen) {
            regen.addEventListener('click', function () {
                if (window.CMS) CMS.showToast('Sitemap regeneration queued — PHP backend integration', 'success');
            });
        }
    }

    function init() {
        initPageSelector();
        initLivePreview();
        initSitemapActions();
        updatePreviews();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
