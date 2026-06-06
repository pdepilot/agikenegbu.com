/**
 * SDTG Speakers Page — CMS-ready speaker data & interactions
 * Future: replace SPEAKERS_DATA fetch with PHP API / MySQL
 */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- Speaker database (CMS placeholder) ---- */
    const SPEAKERS_DATA = {
        previous: [
            { id: 'don-moen', name: 'Don Moen', ministry: 'Worship Leader & Psalmist', country: 'USA', years: '2019, 2023', photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80', bio: 'Globally recognized worship leader whose songs have shaped generations of believers. Don Moen has led nations into the presence of God through timeless worship anthems.', appearances: 'SDTG 2019 — Nations Arise, SDTG 2023 — Revival Fire', gallery: ['img/lifted_hands.jpeg', 'img/main1.jpg'], social: { facebook: '#', instagram: '#', youtube: '#' } },
            { id: 'frank-edwards', name: 'Frank Edwards', ministry: 'Gospel Recording Artist', country: 'Nigeria', years: '2020, 2024', photo: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80', bio: 'Multi-award winning gospel artist and producer known for electrifying worship experiences and prophetic ministrations across Africa.', appearances: 'SDTG 2020 — Faith In The Fire, SDTG 2024 — Heaven\'s Sound', gallery: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80'], social: { instagram: '#', youtube: '#' } },
            { id: 'ada-ehi', name: 'Ada Ehi', ministry: 'Worship Leader & Songwriter', country: 'Nigeria', years: '2021, 2025', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', bio: 'Internationally acclaimed worship leader whose anointed voice has ministered healing and hope to millions across the globe.', appearances: 'SDTG 2021 — Digital Reach, SDTG 2025 — Glory Without Limits', gallery: ['img/hero-poster.jpg'], social: { instagram: '#', youtube: '#' } },
            { id: 'judikay', name: 'Judikay', ministry: 'Gospel Music Minister', country: 'Nigeria', years: '2022, 2024', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', bio: 'Soul-stirring vocalist whose worship ministrations create atmospheres of divine encounter and breakthrough.', appearances: 'SDTG 2022 — Return Of Glory, SDTG 2024 — Heaven\'s Sound', gallery: [], social: { instagram: '#' } },
            { id: 'nathaniel-bassey', name: 'Nathaniel Bassey', ministry: 'Trumpeter & Worship Leader', country: 'Nigeria', years: '2018, 2023', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', bio: 'Renowned trumpeter and worship leader whose Hallelujah Challenge movement has united millions in global prayer and worship.', appearances: 'SDTG 2018 — Breaking 5,000, SDTG 2023 — Revival Fire', gallery: [], social: { youtube: '#', instagram: '#' } },
            { id: 'tim-godfrey', name: 'Tim Godfrey', ministry: 'Gospel Artist & Producer', country: 'Nigeria', years: '2019, 2022', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', bio: 'Dynamic worship leader and X2D founder whose energetic praise sessions ignite congregations across West Africa.', appearances: 'SDTG 2019, SDTG 2022', gallery: [], social: { instagram: '#' } },
            { id: 'sinach', name: 'Sinach', ministry: 'Worship Leader & Songwriter', country: 'Nigeria', years: '2020, 2025', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', bio: 'Award-winning worship leader whose songs are sung in churches worldwide. A true psalmist of this generation.', appearances: 'SDTG 2020, SDTG 2025', gallery: [], social: { youtube: '#', instagram: '#' } },
            { id: 'paul-wilbur', name: 'Paul Wilbur', ministry: 'Messianic Worship Leader', country: 'USA', years: '2021', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', bio: 'Internationally recognized Messianic worship leader bringing the Hebrew roots of worship to global audiences.', appearances: 'SDTG 2021 — Digital Reach', gallery: [], social: { facebook: '#' } },
            { id: 'chioma-jesus', name: 'Chioma Jesus', ministry: 'Gospel Evangelist', country: 'Nigeria', years: '2017, 2023', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', bio: 'Powerful gospel evangelist whose ministrations have brought deliverance and salvation to thousands.', appearances: 'SDTG 2017, SDTG 2023', gallery: [], social: { instagram: '#' } },
            { id: 'travis-greene', name: 'Travis Greene', ministry: 'Pastor & Worship Leader', country: 'USA', years: '2024', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', bio: 'Pastor, GRAMMY-nominated artist, and revivalist whose ministry bridges worship and prophetic preaching.', appearances: 'SDTG 2024 — Heaven\'s Sound', gallery: [], social: { youtube: '#', instagram: '#' } },
            { id: 'mercy-chinwo', name: 'Mercy Chinwo', ministry: 'Gospel Recording Artist', country: 'Nigeria', years: '2022, 2025', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', bio: 'Spirit-filled vocalist whose worship ministrations carry a unique anointing for breakthrough and restoration.', appearances: 'SDTG 2022, SDTG 2025', gallery: [], social: { instagram: '#' } },
            { id: 'william-mcdowell', name: 'William McDowell', ministry: 'Worship Leader & Author', country: 'USA', years: '2023', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cfe2?w=400&q=80', bio: 'Worship leader and author of "As We Worship" whose teachings on intimacy with God have transformed worship culture globally.', appearances: 'SDTG 2023 — Revival Fire', gallery: [], social: { youtube: '#' } }
        ],
        upcoming: [
            { name: 'Pastor Emmanuel Adeyemi', ministry: 'Global Worship Leader', country: 'Nigeria', topic: 'The Weight of Glory', bio: 'Renowned for leading nations into deep worship encounters. His ministry has sparked revivals across West Africa and beyond.', photo: '../img/pastor-emmanuel-adeyemi.jpg', featured: true },
            { name: 'Rev. Dr. James Morrison', ministry: 'International Speaker', country: 'United Kingdom', topic: 'Kingdom Dominion', bio: 'Author and conference speaker whose teachings on kingdom glory have shaped leaders across the global church.', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80', featured: true },
            { name: 'Minister Chioma Okonkwo', ministry: 'Gospel Recording Artist', country: 'Nigeria', topic: 'Worship As Warfare', bio: 'Multi-award winning vocalist whose anointed voice has ministered healing and hope to millions worldwide.', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80', featured: true },
            { name: 'Bishop Samuel Adeleke', ministry: 'Revivalist & Evangelist', country: 'Ghana', topic: 'Revival Fire', bio: 'Fire-brand preacher whose messages on the glory of God have transformed congregations across five continents.', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80', featured: false },
            { name: 'Psalmist Grace Nwachukwu', ministry: 'Worship Psalmist', country: 'Nigeria', topic: 'Atmosphere of Heaven', bio: 'Known for creating atmospheres of divine presence through prophetic worship and spontaneous melodies.', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80', featured: false },
            { name: 'Prophetess Sarah Williams', ministry: 'Prophetic Minister', country: 'USA', topic: 'Prophetic Worship', bio: 'Prophetic voice whose ministrations have brought clarity, direction, and divine encounters to believers globally.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80', featured: false }
        ],
        keynote: {
            name: 'Rev. Dr. David Okafor',
            ministry: 'International Revivalist & Author',
            bio: 'Rev. Dr. David Okafor is a globally recognized revivalist whose ministry spans over three decades. He has preached in over 60 nations, authored 12 books on worship and revival, and is the founder of Glory Revival Network. His messages on the manifest glory of God have catalyzed some of the largest altar calls in modern crusade history.',
            session: 'Opening Keynote — "When Glory Descends" · Friday, August 15, 2026 · 7:00 PM WAT · Main Arena',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80'
        },
        worship: [
            { name: 'Frank Edwards', ministry: 'Rocktown Gospel', country: 'Nigeria', photo: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80' },
            { name: 'Ada Ehi', ministry: 'Loveworld Records', country: 'Nigeria', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
            { name: 'Nathaniel Bassey', ministry: 'Hallelujah Challenge', country: 'Nigeria', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
            { name: 'Judikay', ministry: 'Minister Judikay', country: 'Nigeria', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
            { name: 'Mercy Chinwo', ministry: 'Gospel Minister', country: 'Nigeria', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' }
        ],
        hosts: [
            { role: 'Host Pastor', name: 'Rev. Pastor John Ikenegbu', bio: 'Senior Pastor of AG Ikenebgu and visionary behind Send Down Thy Glory. His heart for revival has birthed a movement that reaches nations.', photo: '../img/pastor-emmanuel-adeyemi.jpg' },
            { role: 'Event Convener', name: 'Dr. Samuel Okwu', bio: 'Convener of SDTG and director of the International Music Crusade. Over 15 years leading worship gatherings across West Africa.', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
            { role: 'Organizing Chairman', name: 'Pastor Grace Adebayo', bio: 'Chairman of the SDTG organizing committee. Oversees logistics, partnerships, and the volunteer army that makes each crusade possible.', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' }
        ],
        videos: [
            { name: 'Rev. Dr. David Okafor', label: 'Invitation Message — SDTG 2026', type: 'local', src: 'videos/worship-hero.mp4', thumb: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=640&q=80' },
            { name: 'Pastor Emmanuel Adeyemi', label: 'Worship Preview — Coming Soon', type: 'local', src: 'videos/worship-crowd.mp4', thumb: 'img/lifted_hands.jpeg' },
            { name: 'Minister Chioma Okonkwo', label: 'Personal Invitation', type: 'youtube', src: 'LXb3EKWsInQ', thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=640&q=80' }
        ],
        timeline: [
            { year: '2020', theme: 'Faith In The Fire', speakers: 'Frank Edwards, Sinach, Paul Wilbur', highlights: 'Hybrid virtual/in-person edition reaching 80K viewers globally.' },
            { year: '2021', theme: 'Digital Reach', speakers: 'Ada Ehi, Paul Wilbur, Chioma Jesus', highlights: '200K live viewers. Launch of SDTG global prayer network.' },
            { year: '2022', theme: 'Return Of Glory', speakers: 'Judikay, Tim Godfrey, Mercy Chinwo', highlights: 'Doubled attendance. SDTG Youth Movement launched.' },
            { year: '2023', theme: 'Revival Fire', speakers: 'Don Moen, Nathaniel Bassey, William McDowell', highlights: '500K+ livestream viewers. 32 nations represented.' },
            { year: '2024', theme: 'Heaven\'s Sound', speakers: 'Frank Edwards, Judikay, Travis Greene', highlights: 'Documented healings. Three nights uninterrupted worship.' },
            { year: '2025', theme: 'Glory Without Limits', speakers: 'Ada Ehi, Sinach, Mercy Chinwo', highlights: '30,000 attendees. 5,000+ souls saved. Global media coverage.' }
        ]
    };

    function initPageLoad() {
        document.body.classList.add('speakers-page');
        requestAnimationFrame(() => document.body.classList.add('is-loaded'));
    }

    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const toggle = document.getElementById('navToggle');
        const menu = document.getElementById('navMenu');
        const backdrop = document.getElementById('navBackdrop');
        if (!navbar || !toggle || !menu) return;

        const close = () => {
            menu.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
            backdrop?.classList.remove('active');
        };

        window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        toggle.addEventListener('click', () => menu.classList.contains('open') ? close() : (menu.classList.add('open'), toggle.classList.add('active'), toggle.setAttribute('aria-expanded', 'true'), backdrop?.classList.add('active'), document.body.classList.add('no-scroll')));
        backdrop?.addEventListener('click', close);
        document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
    }

    function initVideoLogos() {
        document.querySelectorAll('.logo-video__el').forEach(v => {
            v.muted = true;
            v.playsInline = true;
            const play = () => v.play().catch(() => {});
            v.readyState >= 2 ? play() : v.addEventListener('loadeddata', play, { once: true });
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
            particles = Array.from({ length: 40 }, () => ({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                r: Math.random() * 2 + 0.5, dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.4 + 0.15
            }));
        };
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
                ctx.fill();
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            requestAnimationFrame(draw);
        };
        resize(); draw();
        window.addEventListener('resize', resize);
    }

    function initHeroReveal() {
        document.querySelectorAll('.spk-hero .reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), 200 + (parseInt(el.dataset.delay, 10) || i * 100));
        });
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

    function buildMarqueeCard(speaker) {
        return `<article class="spk-marquee-card" data-speaker-id="${speaker.id}" tabindex="0" role="button" aria-label="View ${speaker.name}">
            <div class="spk-marquee-card__photo"><img src="${speaker.photo}" alt="${speaker.name}" loading="lazy" width="260" height="260"></div>
            <div class="spk-marquee-card__body">
                <h3 class="spk-marquee-card__name">${speaker.name}</h3>
                <span class="spk-marquee-card__ministry">${speaker.ministry}</span>
                <div class="spk-marquee-card__meta"><span>${speaker.country}</span><span>${speaker.years}</span></div>
            </div>
        </article>`;
    }

    function renderMarquee() {
        const track = document.getElementById('speakerMarquee');
        if (!track) return;
        const cards = SPEAKERS_DATA.previous.map(buildMarqueeCard).join('');
        track.innerHTML = cards + cards;

        track.querySelectorAll('.spk-marquee-card').forEach(card => {
            const open = () => {
                const id = card.dataset.speakerId;
                const speaker = SPEAKERS_DATA.previous.find(s => s.id === id);
                if (speaker) openSpeakerModal(speaker);
            };
            card.addEventListener('click', open);
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
            });
        });
    }

    function openSpeakerModal(speaker) {
        const modal = document.getElementById('speakerModal');
        const body = document.getElementById('speakerModalBody');
        if (!modal || !body) return;

        const galleryHtml = speaker.gallery?.length
            ? `<div class="spk-modal__section"><h4>Gallery</h4><div class="spk-modal__gallery">${speaker.gallery.map(g => `<img src="${g}" alt="" loading="lazy">`).join('')}</div></div>`
            : '';

        const socialHtml = speaker.social
            ? `<div class="spk-modal__social">${Object.entries(speaker.social).map(([k, url]) => `<a href="${url}" aria-label="${k}"><i class="fab fa-${k === 'x' ? 'x-twitter' : k}"></i></a>`).join('')}</div>`
            : '';

        body.innerHTML = `
            <div class="spk-modal__grid">
                <div class="spk-modal__photo"><img src="${speaker.photo}" alt="${speaker.name}"></div>
                <div class="spk-modal__body">
                    <h2 class="spk-modal__name">${speaker.name}</h2>
                    <span class="spk-modal__ministry">${speaker.ministry} · ${speaker.country}</span>
                    <p class="spk-modal__bio">${speaker.bio}</p>
                    <div class="spk-modal__section"><h4>SDTG Appearances</h4><p>${speaker.appearances}</p></div>
                    ${galleryHtml}
                    ${socialHtml}
                </div>
            </div>`;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
        modal.querySelector('.spk-modal__close')?.focus();
    }

    function closeSpeakerModal() {
        const modal = document.getElementById('speakerModal');
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    }

    function renderTimeline() {
        const track = document.getElementById('speakerTimeline');
        if (!track) return;
        track.innerHTML = SPEAKERS_DATA.timeline.map(t => `
            <article class="spk-year-card reveal">
                <p class="spk-year-card__year">SDTG ${t.year}</p>
                <h3 class="spk-year-card__theme">${t.theme}</h3>
                <div class="spk-year-card__speakers"><strong>Featured Speakers</strong>${t.speakers}</div>
                <p class="spk-year-card__highlights">${t.highlights}</p>
            </article>`).join('');
    }

    function initUpcomingScroll() {
        const track = document.getElementById('upcomingSpeakers');
        if (!track) return;

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
    }

    function renderUpcoming() {
        const grid = document.getElementById('upcomingSpeakers');
        if (!grid) return;
        grid.innerHTML = SPEAKERS_DATA.upcoming.map(s => `
            <article class="spk-featured-card reveal" role="listitem">
                <div class="spk-featured-card__img">
                    <img src="${s.photo}" alt="${s.name}" loading="lazy" width="400" height="500">
                    ${s.featured ? '<span class="spk-featured-card__badge">Featured</span>' : ''}
                </div>
                <div class="spk-featured-card__body">
                    <h3 class="spk-featured-card__name">${s.name}</h3>
                    <span class="spk-featured-card__ministry">${s.ministry}</span>
                    <p class="spk-featured-card__country"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${s.country}</p>
                    <p class="spk-featured-card__topic">${s.topic}</p>
                    <p class="spk-featured-card__bio">${s.bio}</p>
                </div>
            </article>`).join('');
    }

    function renderKeynote() {
        const k = SPEAKERS_DATA.keynote;
        const el = document.getElementById('keynoteContent');
        if (!el) return;
        el.innerHTML = `
            <div class="spk-keynote__visual reveal">
                <img src="${k.photo}" alt="${k.name}" loading="lazy" width="420" height="560">
                <span class="spk-keynote__frame" aria-hidden="true"></span>
            </div>
            <div class="reveal" data-delay="150">
                <span class="spk-keynote__label">Keynote Speaker · SDTG 2026</span>
                <h2 class="spk-keynote__name">${k.name}</h2>
                <p class="spk-keynote__ministry">${k.ministry}</p>
                <p class="spk-keynote__bio">${k.bio}</p>
                <div class="spk-keynote__session"><h4>Speaking Session</h4><p>${k.session}</p></div>
            </div>`;
    }

    function renderWorship() {
        const grid = document.getElementById('worshipMinisters');
        if (!grid) return;
        grid.innerHTML = SPEAKERS_DATA.worship.map(w => `
            <article class="spk-worship-card reveal">
                <div class="spk-worship-card__ring"><img src="${w.photo}" alt="${w.name}" loading="lazy" width="140" height="140"></div>
                <h3 class="spk-worship-card__name">${w.name}</h3>
                <span class="spk-worship-card__ministry">${w.ministry}</span>
                <span class="spk-worship-card__country">${w.country}</span>
            </article>`).join('');
    }

    function renderHosts() {
        const grid = document.getElementById('spkHosts');
        if (!grid) return;
        grid.innerHTML = SPEAKERS_DATA.hosts.map(h => `
            <article class="spk-host-card reveal">
                <div class="spk-host-card__photo"><img src="${h.photo}" alt="${h.name}" loading="lazy" width="120" height="120"></div>
                <p class="spk-host-card__role">${h.role}</p>
                <h3 class="spk-host-card__name">${h.name}</h3>
                <p class="spk-host-card__bio">${h.bio}</p>
            </article>`).join('');
    }

    function renderVideos() {
        const grid = document.getElementById('speakerVideos');
        if (!grid) return;
        grid.innerHTML = SPEAKERS_DATA.videos.map((v, i) => `
            <article class="spk-video-card reveal" data-delay="${i * 80}" tabindex="0" data-video-type="${v.type}" data-video-src="${v.src}" data-video-title="${v.label}">
                <div class="spk-video-card__thumb">
                    <img src="${v.thumb}" alt="" loading="lazy" width="640" height="400">
                    <div class="spk-video-card__play"><span><i class="fas fa-play" aria-hidden="true"></i></span></div>
                </div>
                <div class="spk-video-card__body">
                    <p class="spk-video-card__name">${v.name}</p>
                    <p class="spk-video-card__label">${v.label}</p>
                </div>
            </article>`).join('');

        grid.querySelectorAll('.spk-video-card').forEach(card => {
            const open = () => openVideoModal(card.dataset.videoType, card.dataset.videoSrc, card.dataset.videoTitle);
            card.addEventListener('click', open);
            card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
        });
    }

    function openVideoModal(type, src, title) {
        const modal = document.getElementById('speakerVideoModal');
        const frame = document.getElementById('speakerVideoFrame');
        const titleEl = document.getElementById('speakerVideoTitle');
        if (!modal || !frame) return;

        frame.innerHTML = '';
        if (type === 'youtube') {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${src}?autoplay=1&rel=0`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            frame.appendChild(iframe);
        } else {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            frame.appendChild(video);
        }

        if (titleEl) titleEl.textContent = title;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    }

    function closeVideoModal() {
        const modal = document.getElementById('speakerVideoModal');
        const frame = document.getElementById('speakerVideoFrame');
        if (frame) frame.innerHTML = '';
        modal?.classList.remove('is-open');
        modal?.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    }

    function initTimelineDrag() {
        document.querySelectorAll('.spk-timeline__track').forEach(track => {
            let isDown = false, startX, scrollLeft;
            track.addEventListener('mousedown', e => { isDown = true; track.classList.add('is-dragging'); startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
            track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('is-dragging'); });
            track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('is-dragging'); });
            track.addEventListener('mousemove', e => {
                if (!isDown) return;
                e.preventDefault();
                track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.5;
            });
        });
    }

    function initTestimonialSlider() {
        const track = document.getElementById('spkSliderTrack');
        const dotsEl = document.getElementById('spkSliderDots');
        if (!track) return;

        const slides = track.querySelectorAll('.spk-slide');
        let current = 0;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsEl?.appendChild(dot);
        });

        const dots = dotsEl?.querySelectorAll('button') || [];
        const goTo = i => {
            slides[current]?.classList.remove('is-active');
            dots[current]?.classList.remove('is-active');
            current = ((i % slides.length) + slides.length) % slides.length;
            slides[current]?.classList.add('is-active');
            dots[current]?.classList.add('is-active');
        };

        document.getElementById('spkSliderPrev')?.addEventListener('click', () => goTo(current - 1));
        document.getElementById('spkSliderNext')?.addEventListener('click', () => goTo(current + 1));
        goTo(0);
        if (!prefersReducedMotion) setInterval(() => goTo(current + 1), 7000);
    }

    function initScrollReveal() {
        if (prefersReducedMotion) {
            document.querySelectorAll('.reveal:not(.spk-hero .reveal)').forEach(el => el.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('is-visible'), parseInt(entry.target.dataset.delay, 10) || 0);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal:not(.spk-hero .reveal)').forEach(el => observer.observe(el));
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }); }
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

    function initModals() {
        document.getElementById('speakerModal')?.addEventListener('click', e => {
            if (e.target.id === 'speakerModal' || e.target.closest('.spk-modal__close')) closeSpeakerModal();
        });
        document.getElementById('speakerVideoModal')?.addEventListener('click', e => {
            if (e.target.id === 'speakerVideoModal' || e.target.closest('.spk-video-modal__close')) closeVideoModal();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') { closeSpeakerModal(); closeVideoModal(); }
        });
    }

    function renderAll() {
        renderMarquee();
        renderTimeline();
        renderUpcoming();
        renderKeynote();
        renderWorship();
        renderHosts();
        renderVideos();
    }

    document.addEventListener('DOMContentLoaded', () => {
        initPageLoad();
        initNavbar();
        initVideoLogos();
        initParticles('spkHeroParticles');
        initParticles('spkCtaParticles');
        initHeroReveal();
        renderAll();
        initUpcomingScroll();
        initCounters();
        initTimelineDrag();
        initTestimonialSlider();
        initModals();
        initScrollReveal();
        initSmoothScroll();
        initNewsletter();
        initScrollTop();
    });

    window.SDTG_SPEAKERS = SPEAKERS_DATA;
})();
