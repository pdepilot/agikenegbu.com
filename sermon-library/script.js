/**
 * AG Ikenebgu — Sermon Library + SermonAudioManager
 */

(function () {
    "use strict";

    /* ========================================================================
       Palette-based demo audio (replace with your sermon MP3 URLs)
       ======================================================================== */
    var AUDIO_BASE = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-";

    /* Local + reliable worship imagery (replace with your sermon artwork paths) */
    var SERMON_IMAGES = [
        "../images/church1.webp",
        "https://images.unsplash.com/photo-1438232992991-99562c75822c?w=800&q=80",
        "https://images.unsplash.com/photo-1507692049790-ef170937883f?w=800&q=80",
        "https://images.unsplash.com/photo-1519491050282-cf00c824fe38?w=800&q=80",
        "https://images.unsplash.com/photo-1470252649370-fca1d096bda9?w=800&q=80",
        "https://images.unsplash.com/photo-1529070538774-1843cb3265da?w=800&q=80"
    ];

    var CATEGORIES = [
        "All", "Faith", "Prayer", "Grace", "Healing", "Evangelism",
        "Leadership", "Discipleship", "Marriage", "Holy Spirit"
    ];

    function buildSermons() {
        var raw = [
            { id: 1, title: "Anchored in Unshakable Faith", speaker: "Rev. Dr. Emmanuel Okonkwo", category: "Faith", date: "2026-05-18", duration: "48:12", views: 2840, desc: "Discover how faith in Christ steadies the soul when storms rise around your family and calling.", featured: true, trending: true, thumb: "thumb-v1" },
            { id: 2, title: "The Power of Persistent Prayer", speaker: "Pastor David Chukwu", category: "Prayer", date: "2026-05-11", duration: "42:05", views: 1920, desc: "A practical teaching on building a prayer life that moves mountains.", trending: true, thumb: "thumb-v2" },
            { id: 3, title: "Grace That Transforms", speaker: "Rev. Dr. Emmanuel Okonkwo", category: "Grace", date: "2026-05-04", duration: "51:30", views: 3105, trending: true, thumb: "thumb-v3" },
            { id: 4, title: "Healing for the Brokenhearted", speaker: "Mrs. Grace Adeyemi", category: "Healing", date: "2026-04-27", duration: "39:44", views: 1675, thumb: "thumb-v4" },
            { id: 5, title: "Go Into All the World", speaker: "Pastor David Chukwu", category: "Evangelism", date: "2026-04-20", duration: "45:18", views: 1432, thumb: "thumb-v1" },
            { id: 6, title: "Leading Like Christ", speaker: "Rev. Dr. Emmanuel Okonkwo", category: "Leadership", date: "2026-04-13", duration: "53:02", views: 2210, trending: true, thumb: "thumb-v2" },
            { id: 7, title: "Disciples Who Make Disciples", speaker: "Pastor David Chukwu", category: "Discipleship", date: "2026-04-06", duration: "46:55", views: 1788, thumb: "thumb-v3" },
            { id: 8, title: "Covenant Love in Marriage", speaker: "Mrs. Grace Adeyemi", category: "Marriage", date: "2026-03-30", duration: "41:20", views: 2560, thumb: "thumb-v4" },
            { id: 9, title: "Filled with the Holy Spirit", speaker: "Rev. Dr. Emmanuel Okonkwo", category: "Holy Spirit", date: "2026-03-23", duration: "55:10", views: 3421, trending: true, thumb: "thumb-v1" },
            { id: 10, title: "Walking by Faith Daily", speaker: "Mrs. Blessing Nwosu", category: "Faith", date: "2026-03-16", duration: "38:33", views: 1290, thumb: "thumb-v2" },
            { id: 11, title: "Midnight Prayer That Shifts Nations", speaker: "Pastor David Chukwu", category: "Prayer", date: "2026-03-09", duration: "44:08", views: 2011, thumb: "thumb-v3" },
            { id: 12, title: "Amazing Grace for Every Saint", speaker: "Rev. Dr. Emmanuel Okonkwo", category: "Grace", date: "2026-03-02", duration: "49:47", views: 1876, thumb: "thumb-v4" },
            { id: 13, title: "Faith for the Next Generation", speaker: "Mrs. Blessing Nwosu", category: "Faith", date: "2026-02-23", duration: "36:22", views: 1544, thumb: "thumb-v1" },
            { id: 14, title: "The Healing Touch of Jesus", speaker: "Mrs. Grace Adeyemi", category: "Healing", date: "2026-02-16", duration: "40:15", views: 2102, thumb: "thumb-v2" }
        ];
        return raw.map(function (s) {
            s.audioUrl = AUDIO_BASE + ((s.id % 16) + 1) + ".mp3";
            s.image = SERMON_IMAGES[(s.id - 1) % SERMON_IMAGES.length];
            return s;
        });
    }

    var SERMONS = buildSermons();

    var SERIES = [
        { id: "s1", title: "Foundations of Faith", count: 8, speaker: "Rev. Dr. Emmanuel Okonkwo", thumb: "thumb-v1", image: SERMON_IMAGES[0] },
        { id: "s2", title: "School of Prayer", count: 6, speaker: "Pastor David Chukwu", thumb: "thumb-v2", image: SERMON_IMAGES[1] },
        { id: "s3", title: "Grace Revolution", count: 5, speaker: "Rev. Dr. Emmanuel Okonkwo", thumb: "thumb-v3", image: SERMON_IMAGES[2] },
        { id: "s4", title: "Family Under God", count: 7, speaker: "Mrs. Grace Adeyemi", thumb: "thumb-v4", image: SERMON_IMAGES[3] },
        { id: "s5", title: "Spirit-Filled Living", count: 9, speaker: "Rev. Dr. Emmanuel Okonkwo", thumb: "thumb-v2", image: SERMON_IMAGES[4] },
        { id: "s6", title: "Kingdom Leadership", count: 4, speaker: "Pastor David Chukwu", thumb: "thumb-v1", image: SERMON_IMAGES[5] }
    ];

    var SPEAKERS = [
        { name: "Rev. Dr. Emmanuel Okonkwo", role: "Senior Pastor", count: 6 },
        { name: "Pastor David Chukwu", role: "Associate Pastor", count: 4 },
        { name: "Mrs. Grace Adeyemi", role: "Women's Ministry", count: 3 },
        { name: "Mrs. Blessing Nwosu", role: "Children's Ministry", count: 2 }
    ];

    var PLAY_SVG = '<svg class="icon-play" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    var PAUSE_SVG = '<svg class="icon-pause" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';

    /* ========================================================================
       SermonAudioManager — single shared Audio instance
       ======================================================================== */
    function SermonAudioManager() {
        this.audio = new Audio();
        this.audio.preload = "metadata";
        this.currentId = null;
        this.isPlaying = false;
        this.isDragging = false;
        this.fallbackDuration = 0;

        this.playerEl = document.getElementById("audioPlayer");
        this.els = {
            thumb: document.getElementById("playerThumb"),
            title: document.getElementById("playerTitle"),
            speaker: document.getElementById("playerSpeaker"),
            playPause: document.getElementById("playerPlayPause"),
            current: document.getElementById("playerCurrent"),
            duration: document.getElementById("playerDuration"),
            fill: document.getElementById("progressFill"),
            thumbProgress: document.getElementById("progressThumb"),
            track: document.getElementById("progressTrack"),
            volume: document.getElementById("playerVolume"),
            speed: document.getElementById("playerSpeed"),
            close: document.getElementById("playerClose"),
            expand: document.getElementById("playerExpand")
        };

        this.bindAudioEvents();
        this.bindPlayerControls();
    }

    SermonAudioManager.prototype.formatTime = function (sec) {
        if (!isFinite(sec) || sec < 0) sec = 0;
        var h = Math.floor(sec / 3600);
        var m = Math.floor((sec % 3600) / 60);
        var s = Math.floor(sec % 60);
        if (h > 0) {
            return h + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
        }
        return m + ":" + String(s).padStart(2, "0");
    };

    SermonAudioManager.prototype.parseDuration = function (str) {
        var p = str.split(":").map(Number);
        if (p.length === 2) return p[0] * 60 + p[1];
        if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
        return 0;
    };

    SermonAudioManager.prototype.getSermon = function (id) {
        return SERMONS.find(function (s) { return String(s.id) === String(id); });
    };

    SermonAudioManager.prototype.showPlayer = function () {
        this.playerEl.hidden = false;
        requestAnimationFrame(function () {
            this.playerEl.classList.add("is-visible");
            document.body.classList.add("has-audio-player");
        }.bind(this));
    };

    SermonAudioManager.prototype.hidePlayer = function () {
        this.playerEl.classList.remove("is-visible", "is-playing");
        document.body.classList.remove("has-audio-player", "player-expanded");
        setTimeout(function () {
            if (!this.playerEl.classList.contains("is-visible")) {
                this.playerEl.hidden = true;
            }
        }.bind(this), 500);
    };

    SermonAudioManager.prototype.syncCards = function () {
        var self = this;
        document.querySelectorAll(".sermon-card[data-id]").forEach(function (card) {
            var id = card.getAttribute("data-id");
            var active = String(id) === String(self.currentId);
            card.classList.toggle("is-active", active);
            card.classList.toggle("is-playing", active && self.isPlaying);
            var btn = card.querySelector(".card-play-btn");
            if (btn) {
                btn.setAttribute("aria-label", active && self.isPlaying
                    ? "Pause " + (self.getSermon(id) || {}).title
                    : "Play " + (self.getSermon(id) || {}).title);
            }
        });
    };

    SermonAudioManager.prototype.updatePlayerUI = function () {
        var sermon = this.getSermon(this.currentId);
        if (!sermon) return;

        this.els.thumb.className = "audio-player__thumb";
        if (sermon.image) {
            this.els.thumb.style.backgroundImage = "url('" + sermon.image.replace(/'/g, "%27") + "')";
        } else {
            this.els.thumb.style.backgroundImage = "";
            this.els.thumb.classList.add(sermon.thumb);
        }
        this.els.title.textContent = sermon.title;
        this.els.speaker.textContent = sermon.speaker;
        this.fallbackDuration = this.parseDuration(sermon.duration);

        this.playerEl.classList.toggle("is-playing", this.isPlaying);
        this.els.playPause.setAttribute("aria-label", this.isPlaying ? "Pause" : "Play");
        this.syncCards();
    };

    SermonAudioManager.prototype.updateProgress = function () {
        var dur = this.audio.duration;
        if (!isFinite(dur) || dur <= 0) dur = this.fallbackDuration;
        var cur = this.audio.currentTime || 0;
        var pct = dur > 0 ? (cur / dur) * 100 : 0;

        this.els.current.textContent = this.formatTime(cur);
        this.els.duration.textContent = this.formatTime(dur);
        this.els.fill.style.width = pct + "%";
        this.els.thumbProgress.style.left = pct + "%";
        this.els.track.setAttribute("aria-valuenow", Math.round(pct));
    };

    SermonAudioManager.prototype.play = function (sermon) {
        if (!sermon) return;

        if (String(this.currentId) !== String(sermon.id)) {
            this.currentId = sermon.id;
            this.audio.src = sermon.audioUrl;
            this.audio.playbackRate = parseFloat(this.els.speed.value) || 1;
        }

        this.showPlayer();
        this.updatePlayerUI();

        var playPromise = this.audio.play();
        if (playPromise && playPromise.catch) {
            playPromise.catch(function () {
                this.isPlaying = false;
                this.updatePlayerUI();
            }.bind(this));
        }
    };

    SermonAudioManager.prototype.pause = function () {
        this.audio.pause();
    };

    SermonAudioManager.prototype.toggle = function (sermonId) {
        var sermon = this.getSermon(sermonId);
        if (!sermon) return;

        if (String(this.currentId) === String(sermonId) && this.isPlaying) {
            this.pause();
            return;
        }
        this.play(sermon);
    };

    SermonAudioManager.prototype.seekToRatio = function (ratio) {
        var dur = this.audio.duration;
        if (!isFinite(dur) || dur <= 0) dur = this.fallbackDuration;
        ratio = Math.max(0, Math.min(1, ratio));
        this.audio.currentTime = ratio * dur;
        this.updateProgress();
    };

    SermonAudioManager.prototype.stopAndClose = function () {
        this.pause();
        this.audio.src = "";
        this.currentId = null;
        this.isPlaying = false;
        this.hidePlayer();
        this.syncCards();
    };

    SermonAudioManager.prototype.bindAudioEvents = function () {
        var self = this;

        this.audio.addEventListener("play", function () {
            self.isPlaying = true;
            self.updatePlayerUI();
        });

        this.audio.addEventListener("pause", function () {
            self.isPlaying = false;
            self.updatePlayerUI();
        });

        this.audio.addEventListener("timeupdate", function () {
            if (!self.isDragging) self.updateProgress();
        });

        this.audio.addEventListener("loadedmetadata", function () {
            self.updateProgress();
        });

        this.audio.addEventListener("ended", function () {
            self.isPlaying = false;
            self.updatePlayerUI();
            self.updateProgress();
        });
    };

    SermonAudioManager.prototype.bindPlayerControls = function () {
        var self = this;

        this.els.playPause.addEventListener("click", function () {
            if (!self.currentId) return;
            if (self.isPlaying) self.pause();
            else self.audio.play();
        });

        this.els.close.addEventListener("click", function () {
            self.stopAndClose();
        });

        this.els.volume.addEventListener("input", function () {
            self.audio.volume = parseFloat(self.els.volume.value);
        });

        this.els.speed.addEventListener("change", function () {
            self.audio.playbackRate = parseFloat(self.els.speed.value);
        });

        this.els.expand.addEventListener("click", function () {
            var expanded = document.body.classList.toggle("player-expanded");
            self.playerEl.classList.toggle("player-expanded", expanded);
            self.els.expand.setAttribute("aria-expanded", String(expanded));
        });

        this.bindSeekBar();
    };

    SermonAudioManager.prototype.bindSeekBar = function () {
        var self = this;
        var track = this.els.track;

        function ratioFromEvent(e) {
            var rect = track.getBoundingClientRect();
            var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            return x / rect.width;
        }

        function startDrag(e) {
            self.isDragging = true;
            track.classList.add("is-dragging");
            self.seekToRatio(ratioFromEvent(e));
        }

        function moveDrag(e) {
            if (!self.isDragging) return;
            self.seekToRatio(ratioFromEvent(e));
        }

        function endDrag() {
            self.isDragging = false;
            track.classList.remove("is-dragging");
        }

        track.addEventListener("mousedown", startDrag);
        track.addEventListener("touchstart", startDrag, { passive: true });
        window.addEventListener("mousemove", moveDrag);
        window.addEventListener("touchmove", moveDrag, { passive: true });
        window.addEventListener("mouseup", endDrag);
        window.addEventListener("touchend", endDrag);

        track.addEventListener("keydown", function (e) {
            if (!self.currentId) return;
            var step = 0.05;
            if (e.key === "ArrowRight") {
                e.preventDefault();
                var r = (self.audio.currentTime || 0) / (self.audio.duration || self.fallbackDuration || 1);
                self.seekToRatio(r + step);
            }
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                var r2 = (self.audio.currentTime || 0) / (self.audio.duration || self.fallbackDuration || 1);
                self.seekToRatio(r2 - step);
            }
        });
    };

    var audioManager = new SermonAudioManager();

    /* ========================================================================
       Page state & DOM
       ======================================================================== */
    var PER_PAGE = 8;
    var state = { query: "", category: "All", page: 1 };

    var filterChips = document.getElementById("filterChips");
    var sermonGrid = document.getElementById("sermonGrid");
    var featuredSermon = document.getElementById("featuredSermon");
    var trendingTrack = document.getElementById("trendingTrack");
    var seriesGrid = document.getElementById("seriesGrid");
    var speakersGrid = document.getElementById("speakersGrid");
    var pagination = document.getElementById("pagination");
    var searchInput = document.getElementById("sermonSearch");
    var searchClear = document.getElementById("searchClear");
    var searchMeta = document.getElementById("searchMeta");
    var emptyState = document.getElementById("emptyState");

    function formatDate(iso) {
        return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }

    function debounce(fn, wait) {
        var t;
        return function () {
            var args = arguments;
            var ctx = this;
            clearTimeout(t);
            t = setTimeout(function () { fn.apply(ctx, args); }, wait);
        };
    }

    function escapeHtml(str) {
        var div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    function getFiltered() {
        var q = state.query.trim().toLowerCase();
        return SERMONS.filter(function (s) {
            var matchCat = state.category === "All" || s.category === state.category;
            if (!matchCat) return false;
            if (!q) return true;
            return (
                s.title.toLowerCase().indexOf(q) !== -1 ||
                s.speaker.toLowerCase().indexOf(q) !== -1 ||
                s.category.toLowerCase().indexOf(q) !== -1
            );
        });
    }

    function thumbPlayBlock(sermon) {
        var imgSrc = sermon.image ? escapeHtml(sermon.image) : "";
        var imgTag = imgSrc
            ? '  <img class="card-thumb-img" src="' + imgSrc + '" alt="" loading="lazy" decoding="async" onerror="this.classList.add(\'is-hidden\')">'
            : "";
        return (
            '<div class="card-thumb ' + sermon.thumb + '">' +
            '  <div class="card-thumb-inner ' + sermon.thumb + '" aria-hidden="true"></div>' +
            imgTag +
            '  <div class="card-play-zone">' +
            '    <span class="play-ring" aria-hidden="true"></span>' +
            '    <button type="button" class="card-play-btn" data-play-id="' + sermon.id + '" aria-label="Play ' + escapeHtml(sermon.title) + '">' +
            PLAY_SVG + PAUSE_SVG +
            "    </button>" +
            "  </div>" +
            '  <span class="now-playing-badge">Now Playing</span>' +
            '  <div class="eq-bars" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
            '  <span class="duration-badge">' + escapeHtml(sermon.duration) + "</span>" +
            '  <span class="category-badge">' + escapeHtml(sermon.category) + "</span>" +
            "</div>"
        );
    }

    function cardHTML(sermon) {
        return (
            '<article class="sermon-card" data-id="' + sermon.id + '" tabindex="0">' +
            thumbPlayBlock(sermon) +
            '  <div class="card-body">' +
            "    <h3>" + escapeHtml(sermon.title) + "</h3>" +
            '    <p class="card-speaker">' + escapeHtml(sermon.speaker) + "</p>" +
            '    <div class="card-footer">' +
            "      <span>" + formatDate(sermon.date) + " · " + sermon.views.toLocaleString() + " views</span>" +
            "    </div>" +
            "  </div>" +
            "</article>"
        );
    }

    function renderFeatured() {
        var s = SERMONS.find(function (x) { return x.featured; }) || SERMONS[0];
        featuredSermon.className = "featured-card sermon-card";
        featuredSermon.setAttribute("data-id", s.id);
        featuredSermon.innerHTML =
            thumbPlayBlock(s) +
            '<div class="featured-body card-body">' +
            '  <span class="category">' + escapeHtml(s.category) + "</span>" +
            "  <h3>" + escapeHtml(s.title) + "</h3>" +
            '  <div class="featured-meta">' +
            "    <span>" + escapeHtml(s.speaker) + "</span>" +
            "    <span>" + formatDate(s.date) + "</span>" +
            "    <span>" + escapeHtml(s.duration) + "</span>" +
            "  </div>" +
            '  <p class="featured-desc">' + escapeHtml(s.desc || "") + "</p>" +
            "</div>";
    }

    function renderFilters() {
        filterChips.innerHTML = CATEGORIES.map(function (cat) {
            var active = cat === state.category ? " is-active" : "";
            return '<button type="button" class="filter-chip' + active + '" data-category="' + escapeHtml(cat) + '" role="tab" aria-selected="' + (cat === state.category) + '">' + escapeHtml(cat) + "</button>";
        }).join("");
    }

    function renderGrid() {
        var list = getFiltered();
        var totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
        if (state.page > totalPages) state.page = totalPages;
        var pageItems = list.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);
        sermonGrid.innerHTML = pageItems.map(cardHTML).join("");
        emptyState.classList.toggle("is-hidden", list.length > 0);
        searchMeta.textContent = list.length ? "Showing " + list.length + " message" + (list.length === 1 ? "" : "s") : "No messages found";
        renderPagination(totalPages);
        audioManager.syncCards();
    }

    function renderPagination(totalPages) {
        if (totalPages <= 1) { pagination.innerHTML = ""; return; }
        var html = '<button type="button" class="page-btn" data-page="prev"' + (state.page === 1 ? " disabled" : "") + ">Prev</button>";
        for (var i = 1; i <= totalPages; i++) {
            html += '<button type="button" class="page-btn' + (i === state.page ? " is-active" : "") + '" data-page="' + i + '">' + i + "</button>";
        }
        html += '<button type="button" class="page-btn" data-page="next"' + (state.page === totalPages ? " disabled" : "") + ">Next</button>";
        pagination.innerHTML = html;
    }

    function renderTrending() {
        trendingTrack.innerHTML = SERMONS.filter(function (s) { return s.trending; }).map(cardHTML).join("");
        audioManager.syncCards();
    }

    function renderSeries() {
        seriesGrid.innerHTML = SERIES.map(function (s) {
            var bg = s.image
                ? ' style="background-image:url(\'' + s.image.replace(/'/g, "%27") + "')"
                : "";
            return '<a href="#" class="series-card"><div class="series-card-bg ' + s.thumb + '"' + bg + '></div><div class="series-overlay"><h3>' + escapeHtml(s.title) + "</h3><p>" + s.count + " teachings · " + escapeHtml(s.speaker) + "</p></div></a>";
        }).join("");
    }

    function renderSpeakers() {
        speakersGrid.innerHTML = SPEAKERS.map(function (sp) {
            return '<div class="speaker-chip"><strong>' + escapeHtml(sp.name) + "</strong><span>" + escapeHtml(sp.role) + " · " + sp.count + " messages</span></div>";
        }).join("");
    }

    function bindPlayDelegation() {
        document.body.addEventListener("click", function (e) {
            var btn = e.target.closest(".card-play-btn");
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                audioManager.toggle(btn.getAttribute("data-play-id"));
                return;
            }
            var card = e.target.closest(".sermon-card[data-id]");
            if (card && !e.target.closest("a")) {
                var id = card.getAttribute("data-id");
                if (String(audioManager.currentId) === String(id) && audioManager.isPlaying) {
                    audioManager.pause();
                } else {
                    audioManager.toggle(id);
                }
            }
        });

        document.body.addEventListener("keydown", function (e) {
            if (e.key !== "Enter" && e.key !== " ") return;
            var card = e.target.closest(".sermon-card[data-id]");
            if (!card || e.target.closest(".card-play-btn")) return;
            e.preventDefault();
            audioManager.toggle(card.getAttribute("data-id"));
        });
    }

    function bindFilters() {
        filterChips.addEventListener("click", function (e) {
            var btn = e.target.closest(".filter-chip");
            if (!btn) return;
            state.category = btn.getAttribute("data-category");
            state.page = 1;
            renderFilters();
            renderGrid();
        });
    }

    function bindSearch() {
        var onSearch = debounce(function () {
            state.query = searchInput.value;
            state.page = 1;
            searchClear.classList.toggle("is-visible", state.query.length > 0);
            renderGrid();
        }, 280);
        searchInput.addEventListener("input", onSearch);
        searchClear.addEventListener("click", function () {
            searchInput.value = "";
            state.query = "";
            state.page = 1;
            searchClear.classList.remove("is-visible");
            searchInput.focus();
            renderGrid();
        });
    }

    function bindPagination() {
        pagination.addEventListener("click", function (e) {
            var btn = e.target.closest(".page-btn");
            if (!btn || btn.disabled) return;
            var p = btn.getAttribute("data-page");
            var totalPages = Math.max(1, Math.ceil(getFiltered().length / PER_PAGE));
            if (p === "prev") state.page = Math.max(1, state.page - 1);
            else if (p === "next") state.page = Math.min(totalPages, state.page + 1);
            else state.page = parseInt(p, 10);
            renderGrid();
            document.getElementById("sermons").scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    function bindTrendingScroll() {
        var track = trendingTrack;
        document.getElementById("trendPrev").addEventListener("click", function () { track.scrollBy({ left: -320, behavior: "smooth" }); });
        document.getElementById("trendNext").addEventListener("click", function () { track.scrollBy({ left: 320, behavior: "smooth" }); });
    }

    function bindHeader() {
        /* Site chrome uses Bootstrap navbar from ../index.html pattern */
    }

    function bindSubscribe() {
        document.getElementById("subscribeForm").addEventListener("submit", function (e) {
            e.preventDefault();
            var email = document.getElementById("subscribeEmail");
            var msg = document.getElementById("subscribeMessage");
            if (!email.validity.valid) { msg.textContent = "Please enter a valid email."; return; }
            msg.textContent = "Thank you! You are subscribed.";
            email.value = "";
        });
    }

    function initReveal() {
        if (!("IntersectionObserver" in window)) {
            document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        document.querySelectorAll(".reveal").forEach(function (el, i) {
            el.style.transitionDelay = Math.min(i * 0.06, 0.36) + "s";
            observer.observe(el);
        });
    }

    function observeGridCards() {
        sermonGrid.querySelectorAll(".sermon-card").forEach(function (card, i) {
            card.style.opacity = "0";
            card.style.transform = "translateY(16px)";
            card.style.transition = "opacity 0.5s ease " + i * 0.05 + "s, transform 0.5s ease " + i * 0.05 + "s";
            requestAnimationFrame(function () {
                card.style.opacity = "1";
                card.style.transform = "";
            });
        });
    }

    var _renderGrid = renderGrid;
    renderGrid = function () {
        _renderGrid();
        observeGridCards();
    };

    function initSiteChrome() {
        var fixedTop = document.querySelector(".fixed-top");
        var topbar = document.querySelector(".topbar");
        if (!fixedTop) return;
        fixedTop.classList.add("bg-white", "shadow");
        if (topbar && topbar.offsetHeight) {
            fixedTop.style.top = "-" + topbar.offsetHeight + "px";
        }
    }

    function init() {
        initSiteChrome();
        renderFilters();
        renderFeatured();
        renderTrending();
        renderSeries();
        renderSpeakers();
        renderGrid();
        bindPlayDelegation();
        bindFilters();
        bindSearch();
        bindPagination();
        bindTrendingScroll();
        bindHeader();
        bindSubscribe();
        initReveal();
        audioManager.syncCards();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
