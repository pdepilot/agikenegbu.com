/* CMS Shell — Sidebar, Topbar, Layout Injection */
(function () {
    'use strict';

    function getBasePath() {
        var depth = parseInt(document.body.getAttribute('data-depth') || '0', 10);
        return depth > 0 ? '../'.repeat(depth) : '';
    }

    function resolveHref(href, base) {
        if (href.indexOf('http') === 0) return href;
        return base + href;
    }

    function buildNav(base, activePage) {
        var html = '';
        CMS_CONFIG.nav.forEach(function (item) {
            if (item.type === 'group') {
                var groupClass = 'cms-nav-group' + (item.sdtg ? ' cms-nav-group--sdtg' : '');
                html += '<div class="' + groupClass + '" data-group="' + item.id + '">';
                html += '<button type="button" class="cms-nav-group__label" aria-expanded="true">';
                html += '<span>' + item.label + '</span>';
                html += '<i class="fas fa-chevron-down chevron" aria-hidden="true"></i>';
                html += '</button><ul class="cms-nav-group__items">';
                item.children.forEach(function (child) {
                    var isActive = child.id === activePage ? ' is-active' : '';
                    html += '<li class="cms-nav-item' + isActive + '">';
                    html += '<a href="' + resolveHref(child.href, base) + '">';
                    html += '<i class="fas ' + child.icon + ' cms-nav-item__icon" aria-hidden="true"></i>';
                    html += '<span>' + child.label + '</span>';
                    if (child.badge) {
                        html += '<span class="cms-nav-item__badge">' + child.badge + '</span>';
                    }
                    html += '</a></li>';
                });
                html += '</ul></div>';
            } else {
                var active = item.id === activePage ? ' is-active' : '';
                html += '<div class="cms-nav-group"><ul class="cms-nav-group__items">';
                html += '<li class="cms-nav-item' + active + '">';
                html += '<a href="' + resolveHref(item.href, base) + '">';
                html += '<i class="fas ' + item.icon + ' cms-nav-item__icon" aria-hidden="true"></i>';
                html += '<span>' + item.label + '</span></a></li></ul></div>';
            }
        });
        return html;
    }

    function buildNotifications() {
        return CMS_CONFIG.notifications.map(function (n) {
            return '<div class="cms-notify-item">' +
                '<div class="cms-notify-item__icon cms-notify-item__icon--' + n.icon + '"><i class="fas fa-bell" aria-hidden="true"></i></div>' +
                '<div class="cms-notify-item__text"><strong>' + n.title + '</strong><span>' + n.text + '</span>' +
                '<div class="cms-notify-item__time">' + n.time + '</div></div></div>';
        }).join('');
    }

    function injectShell() {
        var base = getBasePath();
        var activePage = document.body.getAttribute('data-page') || 'dashboard';
        var content = document.getElementById('cmsPageContent');
        if (!content) return;

        var brand = CMS_CONFIG.brand;
        var depth = parseInt(document.body.getAttribute('data-depth') || '0', 10);
        var mediaPrefix = '../'.repeat(depth + 1);
        var agVideo = mediaPrefix + 'videos/3D_video.mp4';

        var shell = document.createElement('div');
        shell.className = 'cms-layout';
        shell.innerHTML =
            '<div class="cms-sidebar-overlay" id="cmsSidebarOverlay" aria-hidden="true"></div>' +
            '<aside class="cms-sidebar" id="cmsSidebar" aria-label="Main navigation">' +
                '<div class="cms-sidebar__brand">' +
                    '<div class="cms-sidebar__logo"><video src="' + agVideo + '" autoplay muted loop playsinline aria-hidden="true"></video></div>' +
                    '<div class="cms-sidebar__brand-text"><strong>' + brand.name + '</strong><span>' + brand.subtitle + '</span></div>' +
                '</div>' +
                '<nav class="cms-sidebar__nav" role="navigation">' + buildNav(base, activePage) + '</nav>' +
                '<div class="cms-sidebar__footer">' +
                    '<button type="button" class="cms-sidebar__collapse" id="cmsSidebarCollapse" aria-label="Collapse sidebar">' +
                        '<i class="fas fa-angles-left" aria-hidden="true"></i><span>Collapse</span>' +
                    '</button>' +
                '</div>' +
            '</aside>' +
            '<div class="cms-main">' +
                '<header class="cms-topbar" role="banner">' +
                    '<button type="button" class="cms-topbar__menu" id="cmsMobileMenu" aria-label="Open menu"><i class="fas fa-bars"></i></button>' +
                    '<div class="cms-topbar__search" role="search">' +
                        '<i class="fas fa-search" aria-hidden="true"></i>' +
                        '<input type="search" id="cmsGlobalSearch" placeholder="Search members, events, pages…" aria-label="Global search">' +
                    '</div>' +
                    '<div class="cms-topbar__actions">' +
                        '<div class="cms-profile" style="position:relative">' +
                            '<button type="button" class="cms-topbar__btn" id="cmsNotifyBtn" aria-label="Notifications" aria-expanded="false">' +
                                '<i class="fas fa-bell"></i><span class="cms-dot" aria-hidden="true"></span>' +
                            '</button>' +
                            '<div class="cms-notify-panel" id="cmsNotifyPanel" role="region" aria-label="Notifications">' +
                                '<div class="cms-notify-panel__head"><span>Notifications</span><button type="button" class="cms-btn cms-btn--sm cms-btn--ghost" id="cmsMarkRead">Mark all read</button></div>' +
                                buildNotifications() +
                            '</div>' +
                        '</div>' +
                        '<div class="cms-profile" id="cmsProfile">' +
                            '<button type="button" class="cms-profile__trigger" id="cmsProfileTrigger" aria-expanded="false">' +
                                '<div class="cms-profile__avatar" aria-hidden="true">AN</div>' +
                                '<div class="cms-profile__info"><strong>Admin</strong><span>Super Administrator</span></div>' +
                                '<i class="fas fa-chevron-down cms-profile__chevron" aria-hidden="true"></i>' +
                            '</button>' +
                            '<div class="cms-dropdown" id="cmsProfileDropdown" role="menu">' +
                                '<a href="' + resolveHref('settings.html', base) + '" role="menuitem"><i class="fas fa-user"></i> Profile</a>' +
                                '<a href="' + resolveHref('settings.html', base) + '" role="menuitem"><i class="fas fa-gear"></i> Settings</a>' +
                                '<div class="cms-dropdown__divider"></div>' +
                                '<a href="' + resolveHref('admin-logout.html', base) + '" role="menuitem"><i class="fas fa-right-from-bracket"></i> Sign Out</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</header>' +
                '<main class="cms-page" id="cmsPageMain" role="main"></main>' +
            '</div>';

        document.body.insertBefore(shell, content);
        document.getElementById('cmsPageMain').appendChild(content);
        content.style.display = 'block';
        content.removeAttribute('id');

        document.querySelectorAll('.cms-sidebar__logo video').forEach(function (v) {
            v.muted = true;
            v.play().catch(function () {});
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectShell);
    } else {
        injectShell();
    }
})();
