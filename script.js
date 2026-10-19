const HAMBURGER_BAR_ANIMATION = 400;

let isOpen = false;

class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header">
            <div class="inner-header">
                <a class="logo-anchor" href="/">
                    <span class="logo-text logo-top">MACIEK GINALSKI</span>
                    <span class="logo-text logo-bottom">Hotel & Lifestyle Photography</span>
                </a>

                <nav class="nav-desktop">
                    <ul class="nav-list nav-list-desktop">
                        <li><a class="nav-link" href="#" data-target="projects">HOTELS & RESORTS</a></li>
                        <li><a class="nav-link" href="#" data-target="about">ABOUT ME</a></li>
                    </ul>
                    <a class="instagram-anchor header-instagram-desktop" href="https://www.instagram.com/maciek_ginalski_photography/" target="_blank" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
                            <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
                            <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/>
                        </svg>
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
                        <li><a class="nav-link" href="#" data-target="projects">HOTELS & RESORTS</a></li>
                        <li><a class="nav-link" href="#" data-target="about">ABOUT ME</a></li>
                    </ul>
                    <a class="instagram-anchor" href="https://www.instagram.com/maciek_ginalski_photography/" target="_blank" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/></svg>
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
            <a class="footer-instagram-anchor" href="https://www.instagram.com/maciek_ginalski_photography/" target="_blank" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
                    <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/>
                </svg>
            </a>
        </footer>
        `
    }
}

customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);

const header = document.querySelector('.header');
const hamburger = document.getElementById('menu-toggle');
const navListMobile = document.querySelector('.nav-list-mobile');
const navLinks = document.querySelectorAll('.nav-link[data-target]');
const instagramAnchor = document.querySelector('.nav-mobile').querySelector('.instagram-anchor');
const toTop = document.querySelector(".to-top");

function animateMenu(dir = true) {
    dir = dir ? 'normal' : 'reverse';
    const [top, mid, bot] = hamburger.querySelectorAll('span');

    [top, mid, bot].forEach(s => s.getAnimations().forEach(a => a.cancel()));

        top.animate([
            { transform: 'translateY(0) rotate(0deg)', offset: 0 },
        { transform: 'translateY(11px) rotate(0deg)', offset: 0.8 },
            { transform: 'translateY(11px) rotate(45deg)', offset: 1 }
    ], { duration: HAMBURGER_BAR_ANIMATION, easing: 'ease', fill: 'forwards', direction: dir });

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
            { transform: 'translateY(0) rotate(0deg)', offset: 0 },
            { transform: 'translateY(-11px) rotate(0deg)', offset: 0.8 },
            { transform: 'translateY(-11px) rotate(-45deg)', offset: 1 }
    ], { duration: HAMBURGER_BAR_ANIMATION, easing: 'ease', fill: 'forwards', direction: dir });
}

function closeMenu() {
    isOpen = !isOpen;
    header.classList.toggle('active');
    animateMenu(false);
}

function handleHamburgerClick() {
    isOpen = !isOpen;
    animateMenu(isOpen);
    header.classList.toggle('active');
}

function handleNavLinkClick(e, link) {
    e.preventDefault();
    const target = link.dataset.target;
    console.log(target);

    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = `/?scrollTo=${target}`;
    }

    if (isOpen) {
        closeMenu();
    }
}

function handleScroll() {
    window.pageYOffset > 100 ? toTop.classList.add("active") : toTop.classList.remove("active");
}

function init() {
    hamburger.addEventListener('click', handleHamburgerClick);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            handleNavLinkClick(e, link);
        });
    });

    instagramAnchor.addEventListener('click', closeMenu);
    window.addEventListener("scroll", handleScroll);
}

init();