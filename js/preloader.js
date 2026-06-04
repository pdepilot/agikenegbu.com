/**
 * Homepage spiritual preloader — dove flight + logo perch sequence
 */
(function () {
    "use strict";

    var preloader = document.getElementById("agPreloader");
    if (!preloader) {
        return;
    }

    var minDisplayMs = 5000;
    var maxDisplayMs = 9000;
    var startTime = Date.now();
    var hidden = false;

    document.body.classList.add("preloader-active");

    function hidePreloader() {
        if (hidden) {
            return;
        }
        hidden = true;

        var elapsed = Date.now() - startTime;
        var wait = Math.max(0, minDisplayMs - elapsed);

        setTimeout(function () {
            preloader.classList.add("is-done");
            preloader.classList.remove("show");
            preloader.setAttribute("aria-hidden", "true");

            setTimeout(function () {
                preloader.remove();
                document.body.classList.remove("preloader-active");
            }, 950);
        }, wait);
    }

    if (document.readyState === "complete") {
        hidePreloader();
    } else {
        window.addEventListener("load", hidePreloader);
    }

    setTimeout(hidePreloader, maxDisplayMs);
})();
