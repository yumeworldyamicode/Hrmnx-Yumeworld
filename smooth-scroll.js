const lenis = new Lenis({
    duration: 2,
    smoothWheel: true,
    wheelMultiplier: 0.65,
    touchMultiplier: 1.1,
    lerp: 0.05
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Make anchor links use Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            lenis.scrollTo(target, {
                duration: 1.6,
                easing: t => 1 - Math.pow(1 - t, 3)
            });
        }
    });
});

window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
});

const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {

    const y = window.scrollY;

    heroContent.style.transform =
	`translateY(${lenis.scroll * 0.08}px)`;

});

heroContent.style.setProperty("--scrollY", `${window.scrollY * 0.08}px`);