/**
 * AG Ikenebgu — Donate page interactions
 */
(function () {
    "use strict";

    var CATEGORIES = {
        offering: {
            label: "Offering",
            icon: "fa-hand-holding-heart",
            nigeria: {
                bankName: "Zenith Bank Plc",
                accountName: "AG Ikenebgu — Offering Fund",
                accountNumber: "1234567890"
            },
            international: {
                bankName: "Zenith Bank Plc (International)",
                accountName: "AG Ikenebgu Assemblies of God",
                accountNumber: "1234567890",
                swift: "ZEBLNGLA",
                iban: "Not applicable (NGN account)"
            }
        },
        tithes: {
            label: "Tithes",
            icon: "fa-percent",
            nigeria: {
                bankName: "First Bank of Nigeria",
                accountName: "AG Ikenebgu — Tithes Account",
                accountNumber: "3045678912"
            },
            international: {
                bankName: "First Bank of Nigeria",
                accountName: "AG Ikenebgu Assemblies of God",
                accountNumber: "3045678912",
                swift: "FBNINGLA",
                iban: "Not applicable (NGN account)"
            }
        },
        charity: {
            label: "Charity",
            icon: "fa-heart",
            nigeria: {
                bankName: "United Bank for Africa",
                accountName: "AG Ikenebgu — Charity & Outreach",
                accountNumber: "2098765431"
            },
            international: {
                bankName: "United Bank for Africa",
                accountName: "AG Ikenebgu Charity Fund",
                accountNumber: "2098765431",
                swift: "UNAFNGLA",
                iban: "Not applicable (NGN account)"
            }
        },
        building: {
            label: "Building / Project Fund",
            icon: "fa-church",
            nigeria: {
                bankName: "Guaranty Trust Bank",
                accountName: "AG Ikenebgu — Building Project",
                accountNumber: "0156789234"
            },
            international: {
                bankName: "Guaranty Trust Bank",
                accountName: "AG Ikenebgu Building Fund",
                accountNumber: "0156789234",
                swift: "GTBINGLA",
                iban: "Not applicable (NGN account)"
            }
        }
    };

    var RECENT_DONORS = [
        { name: "Grace Adeyemi", phone: "07081234567", category: "Charity", amount: 150000, date: "2026-05-25" },
        { name: "Emmanuel Okonkwo", phone: "+2348039876543", category: "Building / Project Fund", amount: 500000, date: "2026-05-22" },
        { name: "Chidi Amadi", phone: "08123456789", category: "Charity", amount: 75000, date: "2026-05-19" },
        { name: "Faith Uche", phone: "+2349076543210", category: "Building / Project Fund", amount: 200000, date: "2026-05-15" },
        { name: "Samuel Ibe", phone: "08099887766", category: "Charity", amount: 35000, date: "2026-05-12" }
    ];

    function isPublicDonorCategory(category) {
        var key = (category || "").toLowerCase();
        return key !== "tithes" && key !== "tithe" && key !== "offering" && key !== "offerings";
    }

    function maskPhone(phone) {
        var digits = phone.replace(/\D/g, "");
        if (digits.length < 7) return phone;

        if (phone.indexOf("+") === 0 || digits.indexOf("234") === 0) {
            var national = digits.length > 10 ? digits.slice(-10) : digits;
            return "+234 " + national.slice(0, 3) + "****" + national.slice(-3);
        }

        if (digits.length >= 10) {
            return digits.slice(0, 4) + "****" + digits.slice(-3);
        }

        return digits.slice(0, 3) + "****" + digits.slice(-3);
    }

    function formatAmount(n) {
        return "₦" + n.toLocaleString("en-NG");
    }

    function formatDate(iso) {
        return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }

    function escapeHtml(str) {
        var d = document.createElement("div");
        d.textContent = str;
        return d.innerHTML;
    }

    function renderDonors() {
        var tbody = document.getElementById("donorTableBody");
        if (!tbody) return;
        tbody.innerHTML = RECENT_DONORS.filter(function (d) {
            return isPublicDonorCategory(d.category);
        }).map(function (d) {
            return (
                "<tr>" +
                "<td data-label=\"Donor\"><span class=\"donate-donor-name\">" + escapeHtml(d.name) + "</span></td>" +
                "<td data-label=\"Phone\">" + escapeHtml(maskPhone(d.phone)) + "</td>" +
                "<td data-label=\"Category\"><span class=\"donate-donor-cat\">" + escapeHtml(d.category) + "</span></td>" +
                "<td data-label=\"Amount\">" + escapeHtml(formatAmount(d.amount)) + "</td>" +
                "<td data-label=\"Date\">" + escapeHtml(formatDate(d.date)) + "</td>" +
                "</tr>"
            );
        }).join("");
    }

    function accountRow(label, value, copyable) {
        var copyBtn = copyable
            ? ' <button type="button" class="donate-copy-btn" data-copy="' + escapeHtml(value) + '" aria-label="Copy ' + escapeHtml(label) + '"><i class="far fa-copy"></i></button>'
            : "";
        return (
            '<div class="donate-account-row">' +
            '  <span class="donate-account-label">' + escapeHtml(label) + "</span>" +
            '  <span class="donate-account-value">' + escapeHtml(value) + copyBtn + "</span>" +
            "</div>"
        );
    }

    function renderAccounts(key) {
        var panel = document.getElementById("donateAccountPanel");
        var cat = CATEGORIES[key];
        if (!panel || !cat) return;

        var n = cat.nigeria;
        var i = cat.international;

        panel.innerHTML =
            '<div class="donate-account-panel__header">' +
            '  <span class="donate-account-panel__badge"><i class="fas ' + cat.icon + '"></i> ' + escapeHtml(cat.label) + "</span>" +
            '  <p>Transfer to the account below. Use <strong>' + escapeHtml(cat.label) + "</strong> as your payment reference.</p>" +
            "</div>" +
            '<div class="row g-4">' +
            '  <div class="col-lg-6">' +
            '    <div class="donate-account-card donate-account-card--ng">' +
            '      <h3><i class="fas fa-flag me-2"></i>Nigerian Donations</h3>' +
            accountRow("Bank Name", n.bankName, false) +
            accountRow("Account Name", n.accountName, false) +
            accountRow("Account Number", n.accountNumber, true) +
            "    </div>" +
            "  </div>" +
            '  <div class="col-lg-6">' +
            '    <div class="donate-account-card donate-account-card--intl">' +
            '      <h3><i class="fas fa-globe-africa me-2"></i>International Donations</h3>' +
            accountRow("Bank Name", i.bankName, false) +
            accountRow("Account Name", i.accountName, false) +
            accountRow("Account Number", i.accountNumber, true) +
            accountRow("SWIFT Code", i.swift, true) +
            accountRow("IBAN", i.iban, false) +
            "    </div>" +
            "  </div>" +
            "</div>";

        panel.classList.add("is-visible");
        panel.setAttribute("aria-hidden", "false");

        bindCopyButtons(panel);
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function bindCopyButtons(scope) {
        (scope || document).querySelectorAll(".donate-copy-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var text = btn.getAttribute("data-copy");
                if (!text) return;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(function () {
                        btn.classList.add("is-copied");
                        setTimeout(function () { btn.classList.remove("is-copied"); }, 1800);
                    });
                }
            });
        });
    }

    function bindCategories() {
        document.querySelectorAll(".donate-category-card").forEach(function (card) {
            card.addEventListener("click", function () {
                document.querySelectorAll(".donate-category-card").forEach(function (c) {
                    c.classList.remove("is-active");
                    c.setAttribute("aria-pressed", "false");
                });
                card.classList.add("is-active");
                card.setAttribute("aria-pressed", "true");
                renderAccounts(card.getAttribute("data-category"));
            });
        });
    }

    function animateCounters() {
        document.querySelectorAll(".donate-stat__num").forEach(function (el) {
            var target = parseInt(el.getAttribute("data-count"), 10);
            if (!target || el.dataset.done) return;
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    el.dataset.done = "1";
                    observer.disconnect();
                    var start = 0;
                    var dur = 1800;
                    var t0 = performance.now();
                    function tick(now) {
                        var p = Math.min((now - t0) / dur, 1);
                        var eased = 1 - Math.pow(1 - p, 3);
                        el.textContent = Math.floor(start + (target - start) * eased).toLocaleString();
                        if (p < 1) requestAnimationFrame(tick);
                        else el.textContent = target.toLocaleString() + (el.getAttribute("data-suffix") || "");
                    }
                    requestAnimationFrame(tick);
                });
            }, { threshold: 0.35 });
            observer.observe(el);
        });
    }

    function initReveal() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            document.querySelectorAll(".donate-reveal").forEach(function (el) {
                el.classList.add("is-visible");
            });
            return;
        }
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add("is-visible");
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        document.querySelectorAll(".donate-reveal").forEach(function (el) {
            obs.observe(el);
        });
    }

    function initParallax() {
        var hero = document.querySelector(".donate-hero__bg");
        if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        window.addEventListener("scroll", function () {
            var y = window.scrollY * 0.35;
            hero.style.transform = "translate3d(0, " + y + "px, 0) scale(1.08)";
        }, { passive: true });
    }

    function init() {
        renderDonors();
        bindCategories();
        animateCounters();
        initReveal();
        initParallax();

        document.querySelectorAll('a[href="#give-categories"]').forEach(function (link) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                var target = document.getElementById("give-categories");
                if (target) target.scrollIntoView({ behavior: "smooth" });
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
