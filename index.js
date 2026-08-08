class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header">
            <div class="inner-header">
                <a class="logo-anchor" href="/index.html">
                    <span class="logo-text logo-top">MACIEK GINALSKI</span>
                    <span class="logo-text logo-bottom">Hotel & Lifestyle Photography</span>
                </a>
                <nav class="nav">
                    <ul class="nav-list">
                        <li><a class="nav-link" href="/index.html#projects">Hotels</a></li>
                        <li><a class="nav-link" href="/index.html#about">About</a></li>
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

/* Hero Carousel */

let startX = 0;
let currentX = 0;
let dragging = false;

const hero = document.querySelector(".hero");

let previousSlide = document.querySelector(".previous");
let currentSlide = document.querySelector(".current");
let nextSlide = document.querySelector(".next");

// hero.addEventListener("pointerdown", e => {
//     console.log("pointer down");
//     dragging = true;
//     startX = e.clientX;
//     currentX = startX;
// });

// hero.addEventListener("pointermove", e => {
//     // console.log("pointer move");
//     if (!dragging) return;

//     currentX = e.clientX;
//     const dx = currentX - startX;
//     // console.log(dx);

//     previousSlide.style.transition = "none";
//     currentSlide.style.transition = "none";
//     nextSlide.style.transition = "none";

//     currentSlide.style.transform = `translateX(${dx}px)`;

//     // If swiping left
//     if (dx < 0) {
//         nextSlide.style.transform = `translateX(${hero.offsetWidth + dx}px)`;
//     }
//     // Swiping right
//     else {
//         previousSlide.style.transform = `translateX(${-hero.offsetWidth + dx}px)`;
//     }
// });

// hero.addEventListener("pointerup", () => {
//     console.log("pointer up");
//     dragging = false;

//     const dx = currentX - startX;
//     const threshold = hero.offsetWidth * 0.25;

//     previousSlide.style.transition = "";
//     currentSlide.style.transition = "";
//     nextSlide.style.transition = "";

//     if (dx > threshold) {
//         // Complete animation
//         console.log("swipe right");
//         currentSlide.style.transform = "translateX(100%)";
//         previousSlide.style.transform = "translateX(0)";
//         rotateSlides("right");
//     } else if (dx < -threshold) {
//         console.log("swipe left");
//         currentSlide.style.transform = "translateX(-100%)";
//         nextSlide.style.transform = "translateX(0)";
//         rotateSlides("left");
//     } else {
//         // Snap back
//         console.log("snap back");
//         previousSlide.style.transform = "translateX(-100%)"
//         currentSlide.style.transform = "translateX(0)";
//         nextSlide.style.transform = "translateX(100%)";
//     }
//     // previousSlide.style.transform = "translateX(-100%)"
//     // currentSlide.style.transform = "translateX(0)";
//     // nextSlide.style.transform = "translateX(100%)"
// });

function rotateSlides(direction) {
    if (direction === "left") {
        // old current becomes previous
        // old next becomes current
        // old previous becomes next

        const oldPrevious = previousSlide;
        previousSlide = currentSlide;
        currentSlide = nextSlide;
        nextSlide = oldPrevious;

    } else {
        // old current becomes next
        // old previous becomes current
        // old next becomes previous

        const oldNext = nextSlide;
        nextSlide = currentSlide;
        currentSlide = previousSlide;
        previousSlide = oldNext;
    }

    // Reset positions
    // previousSlide.style.transition = "none";
    // currentSlide.style.transition = "none";
    // nextSlide.style.transition = "none";

    previousSlide.style.transform = "translateX(-100%)";
    currentSlide.style.transform = "translateX(0)";
    nextSlide.style.transform = "translateX(100%)";
}