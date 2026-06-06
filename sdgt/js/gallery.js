/**
 * SDTG Gallery Page — Interactions
 */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- Navbar ---- */
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const toggle = document.getElementById('navToggle');
        const menu = document.getElementById('navMenu');
        const backdrop = document.getElementById('navBackdrop');
        const links = document.querySelectorAll('.nav-link');

        if (!navbar || !toggle || !menu) return;

        const closeMenu = () => {
            menu.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
            if (backdrop) backdrop.classList.remove('active');
        };

        const openMenu = () => {
            menu.classList.add('open');
            toggle.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('no-scroll');
            if (backdrop) backdrop.classList.add('active');
        };

        const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        toggle.addEventListener('click', () => {
            menu.classList.contains('open') ? closeMenu() : openMenu();
        });

        if (backdrop) backdrop.addEventListener('click', closeMenu);

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
        });

        links.forEach(link => link.addEventListener('click', closeMenu));
    }

    /* ---- Video logos ---- */
    function initVideoLogos() {
        document.querySelectorAll('.logo-video__el').forEach(video => {
            video.muted = true;
            video.playsInline = true;
            const play = () => video.play().catch(() => {});
            if (video.readyState >= 2) play();
            else video.addEventListener('loadeddata', play, { once: true });
        });
    }

    /* ---- Hero particles ---- */
    function initHeroParticles() {
        const canvas = document.getElementById('galleryParticles');
        if (!canvas || prefersReducedMotion) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const createParticles = () => {
            particles = [];
            const count = Math.min(50, Math.floor(canvas.width / 24));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 2 + 0.5,
                    dx: (Math.random() - 0.5) * 0.4,
                    dy: (Math.random() - 0.5) * 0.4,
                    alpha: Math.random() * 0.5 + 0.2
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            animId = requestAnimationFrame(draw);
        };

        resize();
        createParticles();
        draw();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        return () => cancelAnimationFrame(animId);
    }

    /* ---- Counters ---- */
    function initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        const animate = el => {
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            const duration = 2000;
            const start = performance.now();

            const step = now => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target.toLocaleString() + suffix;
            };

            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = '1';
                    animate(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(c => observer.observe(c));
    }

    /* ---- Gallery filter ---- */
    function initGalleryFilter() {
        const filters = document.querySelectorAll('.gallery-filters__btn');
        const grid = document.getElementById('galleryMasonry');
        const items = grid ? grid.querySelectorAll('.gallery-masonry__item') : [];

        if (!filters.length || !grid) return;

        const applyFilter = category => {
            grid.classList.add('is-filtering');

            filters.forEach(btn => {
                const isActive = btn.dataset.filter === category;
                btn.classList.toggle('is-active', isActive);
                btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });

            setTimeout(() => {
                items.forEach(item => {
                    const cats = item.dataset.category || '';
                    const match = category === 'all' || cats.split(' ').includes(category);
                    item.classList.toggle('is-hidden', !match);
                });
                grid.classList.remove('is-filtering');
            }, 180);
        };

        filters.forEach(btn => {
            btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
        });
    }

    /* ---- Lightbox ---- */
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        const img = document.getElementById('lightboxImg');
        const title = document.getElementById('lightboxTitle');
        const year = document.getElementById('lightboxYear');
        const caption = document.getElementById('lightboxCaption');
        const counter = document.getElementById('lightboxCounter');
        const btnPrev = lightbox.querySelector('.lightbox__btn--prev');
        const btnNext = lightbox.querySelector('.lightbox__btn--next');
        const btnClose = lightbox.querySelector('.lightbox__close');

        let items = [];
        let currentIndex = 0;
        let touchStartX = 0;

        const getVisibleItems = () =>
            Array.from(document.querySelectorAll('.gallery-masonry__item:not(.is-hidden):not(.is-video)'));

        const show = index => {
            items = getVisibleItems();
            if (!items.length) return;

            currentIndex = ((index % items.length) + items.length) % items.length;
            const item = items[currentIndex];
            const src = item.dataset.src || item.querySelector('img')?.src;
            const alt = item.querySelector('img')?.alt || '';

            img.src = src;
            img.alt = alt;
            title.textContent = item.dataset.title || '';
            year.textContent = item.dataset.year || '';
            caption.textContent = item.dataset.caption || '';
            counter.textContent = `${currentIndex + 1} / ${items.length}`;

            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('no-scroll');
            btnClose.focus();
        };

        const hide = () => {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('no-scroll');
            img.src = '';
        };

        const prev = () => show(currentIndex - 1);
        const next = () => show(currentIndex + 1);

        document.querySelectorAll('.gallery-masonry__item:not(.is-video)').forEach(item => {
            item.addEventListener('click', () => {
                const visible = getVisibleItems();
                const idx = visible.indexOf(item);
                if (idx >= 0) show(idx);
            });
            item.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const visible = getVisibleItems();
                    const idx = visible.indexOf(item);
                    if (idx >= 0) show(idx);
                }
            });
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
        });

        btnPrev.addEventListener('click', prev);
        btnNext.addEventListener('click', next);
        btnClose.addEventListener('click', hide);

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) hide();
        });

        document.addEventListener('keydown', e => {
            if (!lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') hide();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        });

        lightbox.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 50) diff > 0 ? prev() : next();
        }, { passive: true });
    }

    /* ---- Video modal ---- */
    function initVideoModal() {
        const modal = document.getElementById('videoModal');
        if (!modal) return;

        const frame = document.getElementById('videoModalFrame');
        const titleEl = document.getElementById('videoModalTitle');
        const btnClose = modal.querySelector('.video-modal__close');
        let activeCard = null;

        const open = card => {
            activeCard = card;
            const type = card.dataset.videoType;
            const src = card.dataset.videoSrc;
            const title = card.dataset.videoTitle || '';

            frame.innerHTML = '';

            if (type === 'youtube') {
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${src}?autoplay=1&rel=0`;
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                iframe.title = title;
                frame.appendChild(iframe);
            } else {
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.autoplay = true;
                video.playsInline = true;
                frame.appendChild(video);
            }

            titleEl.textContent = title;
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('no-scroll');
            btnClose.focus();
        };

        const close = () => {
            frame.innerHTML = '';
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('no-scroll');
            if (activeCard) activeCard.focus();
            activeCard = null;
        };

        document.querySelectorAll('.video-card, .gallery-masonry__item.is-video').forEach(card => {
            card.addEventListener('click', () => open(card));
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    open(card);
                }
            });
            if (card.classList.contains('gallery-masonry__item')) {
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
            }
        });

        btnClose.addEventListener('click', close);
        modal.addEventListener('click', e => { if (e.target === modal) close(); });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
        });
    }

    /* ---- Years timeline drag scroll ---- */
    function initYearsTimeline() {
        document.querySelectorAll('.years-timeline__track').forEach(track => {
            let isDown = false;
            let startX;
            let scrollLeft;

            track.addEventListener('mousedown', e => {
                isDown = true;
                track.classList.add('is-dragging');
                startX = e.pageX - track.offsetLeft;
                scrollLeft = track.scrollLeft;
            });

            track.addEventListener('mouseleave', () => {
                isDown = false;
                track.classList.remove('is-dragging');
            });

            track.addEventListener('mouseup', () => {
                isDown = false;
                track.classList.remove('is-dragging');
            });

            track.addEventListener('mousemove', e => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - track.offsetLeft;
                track.scrollLeft = scrollLeft - (x - startX) * 1.5;
            });
        });
    }

    /* ---- Scroll reveal ---- */
    function initScrollReveal() {
        if (prefersReducedMotion) {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.delay, 10) || 0;
                    setTimeout(() => entry.target.classList.add('is-visible'), delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    /* ---- Parallax ---- */
    function initParallax() {
        if (prefersReducedMotion) return;

        const visuals = document.querySelectorAll('.featured-block__visual img');

        window.addEventListener('scroll', () => {
            visuals.forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (rect.top - window.innerHeight / 2) * 0.04;
                    img.style.transform = `scale(1.04) translateY(${offset}px)`;
                }
            });
        }, { passive: true });
    }

    /* ---- Lazy load enhancement ---- */
    function initLazyLoad() {
        if (!('IntersectionObserver' in window)) return;

        const images = document.querySelectorAll('img[loading="lazy"]');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        delete img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });

        images.forEach(img => observer.observe(img));
    }

    /* ---- Share form ---- */
    function initShareForm() {
        const form = document.getElementById('shareForm');
        const success = document.getElementById('shareSuccess');
        if (!form) return;

        form.addEventListener('submit', e => {
            e.preventDefault();
            form.hidden = true;
            if (success) {
                success.classList.add('is-visible');
                success.setAttribute('aria-live', 'polite');
            }
        });
    }

    /* ---- Newsletter ---- */
    function initNewsletter() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;

        form.addEventListener('submit', e => {
            e.preventDefault();
            const input = form.querySelector('input');
            const btn = form.querySelector('button');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            input.value = '';
            setTimeout(() => { btn.innerHTML = 'Subscribe'; }, 2000);
        });
    }

    /* ---- Scroll to top ---- */
    function initScrollTop() {
        const btn = document.getElementById('scrollTop');
        if (!btn) return;

        const toggle = () => btn.classList.toggle('visible', window.scrollY > 400);
        window.addEventListener('scroll', toggle, { passive: true });
        toggle();

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    /* ---- CTA particles ---- */
    function initCtaParticles() {
        const canvas = document.getElementById('ctaParticles');
        if (!canvas || prefersReducedMotion) return;

        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            particles = Array.from({ length: 30 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.5,
                dx: (Math.random() - 0.5) * 0.3,
                dy: -Math.random() * 0.5 - 0.1,
                alpha: Math.random() * 0.4 + 0.1
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 208, 97, ${p.alpha})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.y < 0) p.y = canvas.height;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            });
            requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener('resize', resize);
    }

    /* ---- Smooth anchor scroll ---- */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                }
            });
        });
    }

    /* ---- Hero reveal on load ---- */
    function initHeroReveal() {
        document.querySelectorAll('.gallery-hero .reveal').forEach((el, i) => {
            const delay = parseInt(el.dataset.delay, 10) || i * 120;
            setTimeout(() => el.classList.add('is-visible'), 200 + delay);
        });
    }

    /* ---- Init ---- */
    document.addEventListener('DOMContentLoaded', () => {
        initNavbar();
        initVideoLogos();
        initHeroReveal();
        initHeroParticles();
        initCounters();
        initGalleryFilter();
        initLightbox();
        initVideoModal();
        initYearsTimeline();
        initScrollReveal();
        initParallax();
        initLazyLoad();
        initShareForm();
        initNewsletter();
        initScrollTop();
        initCtaParticles();
        initSmoothScroll();
    });
})();
