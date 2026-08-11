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
                        <li><a class="nav-link" href="#" data-target="projects">HOTELS & RESORTS</a></li>
                        <li><a class="nav-link" href="#" data-target="about">ABOUT ME</a></li>
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

    console.log(navLinks);
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            handleNavLinkClick(e, link);
        });
    });

    instagramAnchor.addEventListener('click', closeMenu);
    window.addEventListener("scroll", handleScroll);
}

init();