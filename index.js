class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header">
            <div class="inner-header">
                <a class="logo-anchor" href="/index.html">
                    <span class="logo-text logo-top">MACIEK GINALSKI</span>
                    <span class="logo-text logo-bottom">Hotel & Lifestyle Photography</span>
                </a>

                <nav class="nav-desktop">
                    <ul class="nav-list nav-list-desktop">
                        <li><a class="nav-link" href="/index.html#projects">FEATURED HOTELS & RESORTS</a></li>
                        <li><a class="nav-link" href="/index.html#about">ABOUT ME</a></li>
                    </ul>
                    <a class="instagram-anchor header-instagram-desktop" href="https://www.instagram.com/maciek_ginalski_photography/" target="_blank" aria-label="Instagram">
                        <i class="fa-brands fa-instagram social-media-icon fa-lg"></i>
                    </a>
                </nav>

                <div class="hamburger-wrapper">
                    <button class="hamburger" id="menu-toggle" aria-label="Menu">
                        <span class="top-bar"></span>
                        <span class="middle-bar"></span>
                        <span class="bottom-bar"></span>
                    </button>
                </div>

                <nav class="nav-mobile">
                    <ul class="nav-list-mobile">
                        <li><a class="nav-link" href="/index.html#projects">FEATURED HOTELS & RESORTS</a></li>
                        <li><a class="nav-link" href="/index.html#about">ABOUT ME</a></li>
                    </ul>
                    <a class="instagram-anchor" href="https://www.instagram.com/maciek_ginalski_photography/" target="_blank" aria-label="Instagram">
                        <i class="fa-brands fa-instagram social-media-icon fa-lg"></i>
                    </a>
                </nav>
            </div>
        </header>		
        `
    }
}

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
            <p class="footer-copyright">&copy; Maciek Ginalski ${new Date().getFullYear()}</p>
            <a class="footer-instagram-anchor" href="https://www.instagram.com/maciek_ginalski_photography/" target="_blank">
                <i class="fa-brands fa-instagram social-media-icon fa-lg"></i>
            </a>
        </footer>
        `
    }
}

customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);

const hero = document.querySelector('.hero');
const header = document.querySelector('.header');

// const observer = new IntersectionObserver((entries) => {
//     if (entries[0].intersectionRatio < 1) {
//         header.classList.toggle('scrolled');
//     }
// }, { threshold: 0.8});

// observer.observe(hero);

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled")
    }
})

/* Toggle Mobile Menu */ 

let isOpen = false;

const hamburger = document.getElementById('menu-toggle');
const navListMobile = document.querySelector('.nav-list-mobile');

const animateMenu = (dir = true) => {
    dir = dir ? 'normal' : 'reverse';
    const [top, mid, bot] = hamburger.querySelectorAll('span');

    [top, mid, bot].forEach(s => s.getAnimations().forEach(a => a.cancel()));

    top.animate([
        { transform: 'translateY(0) rotate(0deg)' },
        { transform: 'translateY(8px) rotate(0deg)', offset: 0.5 },
        { transform: 'translateY(8px) rotate(45deg)' }
    ], { duration: 400, easing: 'ease', fill: 'forwards', direction: dir });

    mid.animate([
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 200,
        easing: 'ease',
        fill: 'both',
        direction: dir,
        delay: isOpen ? 0 : 200
    });

    bot.animate([
        { transform: 'translateY(0) rotate(0deg)' },
        { transform: 'translateY(-8px) rotate(0deg)', offset: 0.5 },
        { transform: 'translateY(-8px) rotate(-45deg)' }
    ], { duration: 400, easing: 'ease', fill: 'forwards', direction: dir });
}

hamburger.addEventListener('click', function () {
    isOpen = !isOpen;

    header.classList.toggle('active');

    animateMenu(isOpen);
});

/* Hide mobile menu when option is clicked */ 

const closeMenu = () => {
    isOpen = !isOpen;
    header.classList.toggle('active');
    animateMenu(false);
}

navListMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.querySelector('.nav-mobile').querySelector('.instagram-anchor').addEventListener('click', closeMenu);

/* To top widget */

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active")
    }
})

/* Hero Height */

function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();

screen.orientation.addEventListener("change", () => setTimeout(setVH, 100));

/* Hero Carousel */

const slideTrack = document.querySelector(".slide-track");
const slides = slideTrack.querySelectorAll(".slide");

let currentIndex = slides.length - 1;
let currentSlide = slides[currentIndex];
let nextIndex = (currentIndex - 1 + slides.length) % slides.length;
let nextSlide = slides[nextIndex];
let previousIndex = (currentIndex + 1) % slides.length;
let previousSlide = slides[previousIndex];

let startX = 0;
let currentX = 0;
let dragging = false;

previousSlide.style.transform = 'translateX(-100%)';
currentSlide.style.transform = 'translateX(0%)';
nextSlide.style.transform = 'translateX(100%)';

function rotateSlides(direction) {
    if (direction === "left") {
        previousSlide = currentSlide;
        previousIndex = currentIndex;
        currentSlide = nextSlide;
        currentIndex = nextIndex;
        nextIndex = (currentIndex - 1 + slides.length) % slides.length;
        nextSlide = slides[nextIndex];
        nextSlide.style.transform = 'translateX(100%)';

        nextSlide.style.transition = 'none';
        nextSlide.style.transform = 'translate(100%)';
    } else {
        nextSlide = currentSlide;
        nextIndex = currentIndex;
        currentSlide = previousSlide;
        currentIndex = previousIndex;
        previousIndex = (currentIndex + 1) % slides.length;
        previousSlide = slides[previousIndex];
        previousSlide.style.transform = 'translateX(-100%)';
        nextSlide.style.transition = 'none';
        nextSlide.style.transform = 'translate(-100%)';
    }
}

// Auto-play
setInterval(() => {
    if (dragging) return;

    const a1 = currentSlide.animate([
        { transform: 'translateX(0%)' },
        { transform: 'translateX(-100%)' }
    ], { duration: 800, easing: 'ease' });

    const a2 = nextSlide.animate([
        { transform: 'translateX(100%)' },
        { transform: 'translateX(0%)' }
    ], { duration: 800, easing: 'ease' });

    currentSlide.style.transform = 'translateX(-100%)';
    nextSlide.style.transform = 'translateX(0%)';

    Promise.all([a1.finished, a2.finished]).then(() => {
        rotateSlides("left");
    });
}, 5000);
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

function rotateSlides(direction) {
    if (direction === "left") {
        previousSlide = currentSlide;
        previousIndex = currentIndex;
        currentSlide = nextSlide;
        currentIndex = nextIndex;
        nextIndex = (currentIndex - 1 + slides.length) % slides.length;
        nextSlide = slides[nextIndex];
        nextSlide.style.transform = 'translateX(100%)'; // nowy slajd czeka po prawej
    } else {
        nextSlide = currentSlide;
        nextIndex = currentIndex;
        currentSlide = previousSlide;
        currentIndex = previousIndex;
        previousIndex = (currentIndex + 1) % slides.length;
        previousSlide = slides[previousIndex];
        previousSlide.style.transform = 'translateX(-100%)'; // nowy slajd czeka po lewej
    }
}
*/

/* project titles show on scroll in */

const titles = document.querySelectorAll('.project-title');

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer2.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

titles.forEach(title => observer2.observe(title));