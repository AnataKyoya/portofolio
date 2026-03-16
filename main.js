// ── Custom Cursor ─────────────────────────────
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
document
    .querySelectorAll(
        "a, button, .shot, .proj-item, .cti, .cert-award-card, .hero-photo-frame, .cl",
    )
    .forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("big"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
    });

// ── Language ──────────────────────────────────
let lang = "en";

function applyLang(l) {
    const t = translations[l];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (t[key] !== undefined) el.innerHTML = t[key];
    });
    document.getElementById("langCurrent").textContent = l.toUpperCase();
    document.getElementById("langOther").textContent = l === "en" ? "ID" : "EN";
    document.documentElement.lang = l;
}

function toggleLang() {
    lang = lang === "en" ? "id" : "en";
    applyLang(lang);
}

document.getElementById("langBtn").addEventListener("click", toggleLang);

// ── Hamburger ─────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
});
mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
    });
});

// ── Scroll Reveal ─────────────────────────────
const revealTargets = document.querySelectorAll(
    ".work-item, .proj-item, .cti, .cert-award-card, .ach-card, .shot, .cl, .skill-name-big",
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                // stagger siblings
                const parent = e.target.parentElement;
                const siblings = [...parent.querySelectorAll(".reveal")];
                const idx = siblings.indexOf(e.target);
                setTimeout(() => e.target.classList.add("visible"), idx * 60);
                io.unobserve(e.target);
            }
        });
    },
    { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
);

revealTargets.forEach((el) => io.observe(el));

// ── Lightbox ──────────────────────────────────
function openLightbox(src, caption) {
    const lb = document.getElementById("lightbox");
    document.getElementById("lbImg").src = src;
    document.getElementById("lbCaption").textContent = caption.toUpperCase();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
}
function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
    document.body.style.overflow = "";
}
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

// ── Init ──────────────────────────────────────
applyLang(lang);
