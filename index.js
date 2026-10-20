const SLIDE_ANIMATION_DURATION = 4000;
const SLIDE_TRANSITION_DURATION = 800;
const SCROLL_THRESHOLD = 50;

const hero = document.querySelector('.hero');
const header = document.querySelector('.header');
const slideTrack = document.querySelector('.slide-track');
const slides = slideTrack.querySelectorAll('.slide');
const titles = document.querySelectorAll('.project-title');

let currentIndex = 0;
let currentSlide = slides[currentIndex];
let nextIndex = (currentIndex + 1) % slides.length;
let nextSlide = slides[nextIndex];
let previousIndex = (currentIndex - 1 + slides.length) % slides.length;
let previousSlide = slides[previousIndex];

let startX = 0;
let currentX = 0;
let dragging = false;

let advanceTimeout = null;
let isAdvancing = false;

function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function updateHeaderColor() {
    const color = currentSlide.dataset.headerColor ?? 'black';
    header.classList.toggle('white', color === 'white');
}

function rotateSlides(direction) {
    if (direction === 'left') {
        previousSlide = currentSlide;
        previousIndex = currentIndex;
        currentSlide = nextSlide;
        currentIndex = nextIndex;
        nextIndex = (currentIndex + 1) % slides.length;
        nextSlide = slides[nextIndex];
        nextSlide.style.transition = 'none';
        nextSlide.style.transform = 'translateX(100%)';
    } else {
        nextSlide = currentSlide;
        nextIndex = currentIndex;
        currentSlide = previousSlide;
        currentIndex = previousIndex;
        previousIndex = (currentIndex - 1 + slides.length) % slides.length;
        previousSlide = slides[previousIndex];
        previousSlide.style.transition = 'none';
        previousSlide.style.transform = 'translateX(-100%)';
        nextSlide.style.transition = 'none';
        nextSlide.style.transform = 'translateX(100%)';
    }

    updateHeaderColor();
}

function syncSlidePositions() {
    slides.forEach((slide, index) => {
        slide.style.transition = 'none';

        if (index === currentIndex) {
            slide.style.transform = 'translateX(0%)';
        } else if (index === previousIndex) {
            slide.style.transform = 'translateX(-100%)';
        } else {
            slide.style.transform = 'translateX(100%)';
        }
    });
}

function scheduleAdvance() {
    clearTimeout(advanceTimeout);

    if (document.hidden) return;

    advanceTimeout = setTimeout(
        advanceSlide,
        Math.max(0, SLIDE_ANIMATION_DURATION - SLIDE_TRANSITION_DURATION)
    );
}

function advanceSlide() {
    if (dragging || isAdvancing || document.hidden) return;

    isAdvancing = true;

    const a1 = currentSlide.animate([
        { transform: 'translateX(0%)' },
        { transform: 'translateX(-100%)' }
    ], { duration: SLIDE_TRANSITION_DURATION, easing: 'ease' });

    const a2 = nextSlide.animate([
        { transform: 'translateX(100%)' },
        { transform: 'translateX(0%)' }
    ], { duration: SLIDE_TRANSITION_DURATION, easing: 'ease' });

    currentSlide.style.transform = 'translateX(-100%)';
    nextSlide.style.transform = 'translateX(0%)';

    Promise.all([a1.finished, a2.finished])
        .then(() => rotateSlides('left'))
        .catch(() => {})
        .finally(() => {
            isAdvancing = false;
            scheduleAdvance();
        });
}

function pauseCarousel() {
    clearTimeout(advanceTimeout);
    isAdvancing = false;
    [currentSlide, nextSlide].forEach(slide => {
        slide.getAnimations().forEach(animation => animation.cancel());
    });
}

function resumeCarousel() {
    syncSlidePositions();
    updateHeaderColor();
    scheduleAdvance();
}

function handleVisibilityChange() {
    if (document.hidden) {
        pauseCarousel();
    } else {
        resumeCarousel();
    }
}

function handlePageShow(event) {
    if (event.persisted) {
        resumeCarousel();
    }
}

function handleScroll() {
    header.classList.toggle('scrolled', window.pageYOffset > SCROLL_THRESHOLD);
}

function handleLoad() {
    const params = new URLSearchParams(window.location.search);
    const target = params.get('scrollTo');

    if (target) {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState({}, '', '/');
    }
}

function init() {
    syncSlidePositions();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    titles.forEach(title => observer.observe(title));

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleLoad);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', pauseCarousel);
    window.addEventListener('pageshow', handlePageShow);
    screen.orientation.addEventListener('change', () => setTimeout(setVH, 100));

    scheduleAdvance();

    setVH();
    updateHeaderColor();
}

init();

/*
hero.addEventListener("pointerdown", e => {
    // Zatrzymaj i zapisz bieżące animacje — fill:forwards blokowałoby style.transform
    [previousSlide, currentSlide, nextSlide].forEach(slide => {
        slide.getAnimations().forEach(anim => commitAndCancel(anim));
    });

    dragging = true;
    startX = e.clientX;
    currentX = startX;
    hero.setPointerCapture(e.pointerId); // ← kluczowe na mobile!
});

hero.addEventListener("pointermove", e => {
    if (!dragging) return;
    currentX = e.clientX;
    const dx = currentX - startX;

    currentSlide.style.transition = "none";
    currentSlide.style.transform = `translateX(${dx}px)`;

    if (dx < 0) {
        nextSlide.style.transition = "none";
        nextSlide.style.transform = `translateX(${hero.offsetWidth + dx}px)`;
    } else if (dx > 0) {
        previousSlide.style.transition = "none";
        previousSlide.style.transform = `translateX(${-hero.offsetWidth + dx}px)`;
    }
});

// pointercancel obsługuje przerwanie gestu przez przeglądarkę
hero.addEventListener("pointerup", handlePointerEnd);
hero.addEventListener("pointercancel", handlePointerEnd);

function handlePointerEnd() {
    if (!dragging) return;
    dragging = false;

    const dx = currentX - startX;
    const threshold = hero.offsetWidth * 0.25;

    if (dx < -threshold) {
        completeSwipe("left", dx);
    } else if (dx > threshold) {
        completeSwipe("right", dx);
    } else {
        snapBack(dx);
    }
}

// Dokończ animację po swipe (płynnie, z aktualnej pozycji palca)
function completeSwipe(direction, dx) {
    const w = hero.offsetWidth;

    if (direction === "left") {
        const a1 = currentSlide.animate([
            { transform: `translateX(${dx}px)` },
            { transform: 'translateX(-100%)' }
        ], { duration: 250, easing: 'ease-out', fill: 'forwards' });

        const a2 = nextSlide.animate([
            { transform: `translateX(${w + dx}px)` },
            { transform: 'translateX(0%)' }
        ], { duration: 250, easing: 'ease-out', fill: 'forwards' });

        Promise.all([a1.finished, a2.finished]).then(() => {
            commitAndCancel(a1);
            commitAndCancel(a2);
            rotateSlides("left");
        });
    } else {
        const a1 = currentSlide.animate([
            { transform: `translateX(${dx}px)` },
            { transform: 'translateX(100%)' }
        ], { duration: 250, easing: 'ease-out', fill: 'forwards' });

        const a2 = previousSlide.animate([
            { transform: `translateX(${-w + dx}px)` },
            { transform: 'translateX(0%)' }
        ], { duration: 250, easing: 'ease-out', fill: 'forwards' });

        Promise.all([a1.finished, a2.finished]).then(() => {
            commitAndCancel(a1);
            commitAndCancel(a2);
            rotateSlides("right");
        });
    }
}

function snapBack(dx) {
    const w = hero.offsetWidth;

    currentSlide.animate([
        { transform: `translateX(${dx}px)` },
        { transform: 'translateX(0%)' }
    ], { duration: 250, easing: 'ease-out', fill: 'forwards' });

    if (dx < 0) {
        nextSlide.animate([
            { transform: `translateX(${w + dx}px)` },
            { transform: 'translateX(100%)' }
        ], { duration: 250, easing: 'ease-out', fill: 'forwards' });
    } else if (dx > 0) {
        previousSlide.animate([
            { transform: `translateX(${-w + dx}px)` },
            { transform: 'translateX(-100%)' }
        ], { duration: 250, easing: 'ease-out', fill: 'forwards' });
    }
}

*/