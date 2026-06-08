/* CMS Core Interactions */
(function () {
    'use strict';

    function $(sel, ctx) { return (ctx || document).querySelector(sel); }
    function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

    function hideLoader() {
        var loader = $('#cmsLoader');
        if (loader) {
            setTimeout(function () { loader.classList.add('is-hidden'); }, 600);
        }
    }

    function initSidebar() {
        var sidebar = $('#cmsSidebar');
        var collapseBtn = $('#cmsSidebarCollapse');
        var mobileBtn = $('#cmsMobileMenu');
        var overlay = $('#cmsSidebarOverlay');

        if (collapseBtn && sidebar) {
            collapseBtn.addEventListener('click', function () {
                sidebar.classList.toggle('is-collapsed');
                document.body.classList.toggle('sidebar-collapsed');
                var icon = collapseBtn.querySelector('i');
                if (icon) {
                    icon.className = sidebar.classList.contains('is-collapsed')
                        ? 'fas fa-angles-right' : 'fas fa-angles-left';
                }
            });
        }

        if (mobileBtn && sidebar && overlay) {
            mobileBtn.addEventListener('click', function () {
                sidebar.classList.add('is-mobile-open');
                overlay.classList.add('is-visible');
            });
            overlay.addEventListener('click', function () {
                sidebar.classList.remove('is-mobile-open');
                overlay.classList.remove('is-visible');
            });
        }

        $$('.cms-nav-group__label').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var group = btn.closest('.cms-nav-group');
                if (group) {
                    group.classList.toggle('is-collapsed');
                    btn.setAttribute('aria-expanded', !group.classList.contains('is-collapsed'));
                }
            });
        });
    }

    function initDropdowns() {
        var profile = $('#cmsProfile');
        var profileTrigger = $('#cmsProfileTrigger');
        var profileDropdown = $('#cmsProfileDropdown');
        var notifyBtn = $('#cmsNotifyBtn');
        var notifyPanel = $('#cmsNotifyPanel');

        if (profileTrigger && profileDropdown) {
            profileTrigger.addEventListener('click', function (e) {
                e.stopPropagation();
                profile.classList.toggle('is-open');
                profileDropdown.classList.toggle('is-open');
                profileTrigger.setAttribute('aria-expanded', profile.classList.contains('is-open'));
                if (notifyPanel) notifyPanel.classList.remove('is-open');
            });
        }

        if (notifyBtn && notifyPanel) {
            notifyBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                notifyPanel.classList.toggle('is-open');
                notifyBtn.setAttribute('aria-expanded', notifyPanel.classList.contains('is-open'));
                if (profile) {
                    profile.classList.remove('is-open');
                    if (profileDropdown) profileDropdown.classList.remove('is-open');
                }
            });
        }

        document.addEventListener('click', function () {
            if (profile) profile.classList.remove('is-open');
            if (profileDropdown) profileDropdown.classList.remove('is-open');
            if (notifyPanel) notifyPanel.classList.remove('is-open');
        });

        var markRead = $('#cmsMarkRead');
        if (markRead) {
            markRead.addEventListener('click', function () {
                var dot = notifyBtn && notifyBtn.querySelector('.cms-dot');
                if (dot) dot.style.display = 'none';
                showToast('All notifications marked as read', 'info');
            });
        }
    }

    function initTabs() {
        $$('[data-tabs]').forEach(function (container) {
            var tabs = container.querySelectorAll('.cms-tab');
            var panels = container.parentElement.querySelectorAll('.cms-tab-panel');
            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    var target = tab.getAttribute('data-tab');
                    tabs.forEach(function (t) { t.classList.remove('is-active'); });
                    panels.forEach(function (p) { p.classList.remove('is-active'); });
                    tab.classList.add('is-active');
                    var panel = container.parentElement.querySelector('[data-panel="' + target + '"]');
                    if (panel) panel.classList.add('is-active');
                });
            });
        });
    }

    function initCounters() {
        $$('[data-count]').forEach(function (el) {
            var target = parseFloat(el.getAttribute('data-count'));
            var suffix = el.getAttribute('data-suffix') || '';
            var prefix = el.getAttribute('data-prefix') || '';
            var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
            var duration = 1800;
            var start = 0;
            var startTime = null;

            function step(ts) {
                if (!startTime) startTime = ts;
                var progress = Math.min((ts - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = start + (target - start) * eased;
                el.textContent = prefix + current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    function showToast(message, type) {
        var container = $('#cmsToasts');
        if (!container) {
            container = document.createElement('div');
            container.id = 'cmsToasts';
            container.className = 'cms-toasts';
            container.setAttribute('aria-live', 'polite');
            document.body.appendChild(container);
        }
        var toast = document.createElement('div');
        toast.className = 'cms-toast cms-toast--' + (type || 'info');
        toast.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'info-circle') + '"></i><span>' + message + '</span>';
        container.appendChild(toast);
        setTimeout(function () { toast.remove(); }, 4000);
    }

    function initGlobalSearch() {
        var input = $('#cmsGlobalSearch');
        if (!input) return;
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && input.value.trim()) {
                showToast('Search: "' + input.value.trim() + '" — backend integration pending', 'info');
            }
        });
    }

    function initExportButtons() {
        $$('[data-export]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                showToast('Export to ' + btn.getAttribute('data-export') + ' — ready for PHP backend', 'success');
            });
        });
    }

    function initForms() {
        $$('[data-cms-form]').forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                showToast('Changes saved — awaiting backend integration', 'success');
            });
        });
    }

    window.CMS = { showToast: showToast, initCounters: initCounters };

    function init() {
        initSidebar();
        initDropdowns();
        initTabs();
        initCounters();
        initGlobalSearch();
        initExportButtons();
        initForms();
        hideLoader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
