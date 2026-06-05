/**
 * Homepage video preloader — reveals site when video ends
 */
(function () {
    "use strict";

    var preloader = document.getElementById("agPreloader");
    var video = document.getElementById("agPreloaderVideo");
    var skipBtn = document.getElementById("agPreloaderSkip");

    if (!preloader || !video) {
        return;
    }

    var hidden = false;
    var maxWaitMs = 120000;
    var VIDEO_SRC = "videos/Create_a_cinematic_D_animatio.mp4";

    document.body.classList.add("preloader-active");

    function hidePreloader() {
        if (hidden) {
            return;
        }
        hidden = true;

        try {
            video.pause();
        } catch (e) { /* ignore */ }

        preloader.classList.add("is-done");
        preloader.classList.remove("show");
        preloader.setAttribute("aria-hidden", "true");

        setTimeout(function () {
            preloader.remove();
            document.body.classList.remove("preloader-active");
        }, 900);
    }

    function startPlayback() {
        video.muted = false;
        var playPromise = video.play();
        if (!playPromise || !playPromise.catch) {
            return;
        }
        playPromise.catch(function () {
            video.muted = true;
            return video.play();
        }).catch(function () {
            hidePreloader();
        });
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hidePreloader();
        return;
    }

    if (skipBtn) {
        skipBtn.addEventListener("click", hidePreloader);
    }

    video.addEventListener("ended", hidePreloader);
    video.addEventListener("error", hidePreloader);

    if (video.getAttribute("src") !== VIDEO_SRC) {
        video.setAttribute("src", VIDEO_SRC);
    }

    if (video.readyState >= 2) {
        startPlayback();
    } else {
        video.addEventListener("loadeddata", startPlayback, { once: true });
        video.load();
    }

    setTimeout(hidePreloader, maxWaitMs);
})();
