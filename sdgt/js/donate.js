/**
 * SDTG Donate Page
 */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const BANK_DATA = {
        tithes: {
            nigeria: { bank: 'Zenith Bank', accountName: 'Send Down Thy Glory Ministry', accountNumber: '1234567890' },
            international: { bank: 'Zenith Bank Nigeria', accountName: 'Send Down Thy Glory Ministry', accountNumber: '1234567890', swift: 'ZENINNG', iban: 'NG1234567890123456789012' }
        },
        offering: {
            nigeria: { bank: 'GTBank', accountName: 'SDTG Offering Account', accountNumber: '0987654321' },
            international: { bank: 'GTBank Nigeria', accountName: 'SDTG Offering Account', accountNumber: '0987654321', swift: 'GTBINGLA', iban: 'NG9876543210987654321098' }
        },
        charity: {
            nigeria: { bank: 'Access Bank', accountName: 'SDTG Charity Outreach', accountNumber: '1122334455' },
            international: { bank: 'Access Bank Nigeria', accountName: 'SDTG Charity Outreach', accountNumber: '1122334455', swift: 'ABNGNGLA', iban: 'NG1122334455112233445566' }
        },
        missions: {
            nigeria: { bank: 'First Bank', accountName: 'SDTG Missions Fund', accountNumber: '5566778899' },
            international: { bank: 'First Bank Nigeria', accountName: 'SDTG Missions Fund', accountNumber: '5566778899', swift: 'FBNINGLA', iban: 'NG5566778899556677889900' }
        },
        project: {
            nigeria: { bank: 'UBA', accountName: 'SDTG Project Support', accountNumber: '6677889900' },
            international: { bank: 'UBA Nigeria', accountName: 'SDTG Project Support', accountNumber: '6677889900', swift: 'UNAFNGLA', iban: 'NG6677889900667788990011' }
        },
        partnership: {
            nigeria: { bank: 'Stanbic IBTC', accountName: 'SDTG Partnership Giving', accountNumber: '3344556677' },
            international: { bank: 'Stanbic IBTC Nigeria', accountName: 'SDTG Partnership Giving', accountNumber: '3344556677', swift: 'SBICNGLX', iban: 'NG3344556677334455667788' }
        }
    };

    function initPageLoad() {
        document.body.classList.add('donate-page');
        requestAnimationFrame(() => document.body.classList.add('is-loaded'));
    }

    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const toggle = document.getElementById('navToggle');
        const menu = document.getElementById('navMenu');
        const backdrop = document.getElementById('navBackdrop');
        if (!navbar || !toggle || !menu) return;

        const closeMenu = () => {
            menu.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
            if (backdrop) backdrop.classList.remove('active');
        };

        window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        toggle.addEventListener('click', () => menu.classList.contains('open') ? closeMenu() : (menu.classList.add('open'), toggle.classList.add('active'), toggle.setAttribute('aria-expanded', 'true'), backdrop?.classList.add('active'), document.body.classList.add('no-scroll')));
        if (backdrop) backdrop.addEventListener('click', closeMenu);
        document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));
    }

    function initVideoLogos() {
        document.querySelectorAll('.logo-video__el').forEach(video => {
            video.muted = true;
            video.playsInline = true;
            const play = () => video.play().catch(() => {});
            if (video.readyState >= 2) play();
            else video.addEventListener('loadeddata', play, { once: true });
        });
    }

    function initParticles(id) {
        const canvas = document.getElementById(id);
        if (!canvas || prefersReducedMotion) return;
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            particles = Array.from({ length: 35 }, () => ({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                r: Math.random() * 2 + 0.5, dx: (Math.random() - 0.5) * 0.25, dy: -Math.random() * 0.4 - 0.05,
                alpha: Math.random() * 0.35 + 0.1
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 208, 97, ${p.alpha})`;
                ctx.fill();
                p.x += p.dx; p.y += p.dy;
                if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
            });
            requestAnimationFrame(draw);
        };

        resize(); draw();
        window.addEventListener('resize', resize);
    }

    function initHeroReveal() {
        document.querySelectorAll('.donate-hero .reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), 200 + (parseInt(el.dataset.delay, 10) || i * 100));
        });
    }

    function renderBankDetails(category, region, container) {
        const data = BANK_DATA[category]?.[region];
        if (!data || !container) return;

        let html = `
            <div class="give-bank__row"><span>Bank Name</span><span>${data.bank}</span></div>
            <div class="give-bank__row"><span>Account Name</span><span>${data.accountName}</span></div>
            <div class="give-bank__row"><span>Account Number</span><span id="acct-${region}">${data.accountNumber}</span></div>`;

        if (region === 'international') {
            html += `
            <div class="give-bank__row"><span>SWIFT Code</span><span>${data.swift}</span></div>
            <div class="give-bank__row"><span>IBAN</span><span>${data.iban}</span></div>`;
        }

        html += `<button type="button" class="btn btn--primary give-bank__copy" data-copy="${data.accountNumber}"><i class="fas fa-copy" aria-hidden="true"></i> Copy Account Number</button>`;
        container.innerHTML = html;

        container.querySelector('.give-bank__copy')?.addEventListener('click', function () {
            navigator.clipboard?.writeText(this.dataset.copy).then(() => {
                this.classList.add('is-copied');
                this.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Copied!';
                setTimeout(() => {
                    this.classList.remove('is-copied');
                    this.innerHTML = '<i class="fas fa-copy" aria-hidden="true"></i> Copy Account Number';
                }, 2500);
            }).catch(() => {});
        });
    }

    function initGiveCategories() {
        const details = document.getElementById('giveDetails');
        const ngBank = document.getElementById('giveNigeria');
        const intlBank = document.getElementById('giveInternational');
        let active = 'tithes';

        const update = () => {
            renderBankDetails(active, 'nigeria', ngBank);
            renderBankDetails(active, 'international', intlBank);
            details?.classList.add('is-visible');
        };

        document.querySelectorAll('.give-cat').forEach(cat => {
            cat.addEventListener('click', () => {
                document.querySelectorAll('.give-cat').forEach(c => c.classList.remove('is-active'));
                cat.classList.add('is-active');
                active = cat.dataset.category;
                update();
            });
        });

        document.querySelector('.give-cat')?.classList.add('is-active');
        update();
    }

    function initCounters() {
        document.querySelectorAll('[data-count]').forEach(el => {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && !el.dataset.counted) {
                    el.dataset.counted = '1';
                    const target = parseInt(el.dataset.count, 10);
                    const suffix = el.dataset.suffix || '';
                    const start = performance.now();
                    const step = now => {
                        const p = Math.min((now - start) / 2200, 1);
                        el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString() + suffix;
                        if (p < 1) requestAnimationFrame(step);
                        else el.textContent = target.toLocaleString() + suffix;
                    };
                    requestAnimationFrame(step);
                }
            }, { threshold: 0.35 });
            observer.observe(el);
        });
    }

    function initImpactBars() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.impact-card__bar span').forEach(bar => {
                        bar.style.width = bar.dataset.pct + '%';
                    });
                }
            });
        }, { threshold: 0.3 });
        document.querySelectorAll('.impact-grid').forEach(g => observer.observe(g));
    }

    function initDonorWall() {
        const track = document.getElementById('donorTrack');
        if (!track || prefersReducedMotion) return;
        const clone = track.innerHTML;
        track.innerHTML += clone;
    }

    function initScrollReveal() {
        if (prefersReducedMotion) {
            document.querySelectorAll('.reveal:not(.donate-hero .reveal)').forEach(el => el.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('is-visible'), parseInt(entry.target.dataset.delay, 10) || 0);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal:not(.donate-hero .reveal)').forEach(el => observer.observe(el));
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                }
            });
        });
    }

    function initNewsletter() {
        document.getElementById('newsletterForm')?.addEventListener('submit', e => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            e.target.querySelector('input').value = '';
            setTimeout(() => { btn.textContent = 'Subscribe'; }, 2000);
        });
    }

    function initScrollTop() {
        const btn = document.getElementById('scrollTop');
        if (!btn) return;
        window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
    }

    document.addEventListener('DOMContentLoaded', () => {
        initPageLoad();
        initNavbar();
        initVideoLogos();
        initParticles('donateHeroParticles');
        initParticles('donateCtaParticles');
        initHeroReveal();
        initGiveCategories();
        initCounters();
        initImpactBars();
        initDonorWall();
        initScrollReveal();
        initSmoothScroll();
        initNewsletter();
        initScrollTop();
    });
})();
