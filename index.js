class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header">
            <div class="inner-header">
                <a class="logo-anchor" href="/index.html"><img class="logo" src="/img/favicon.ico"></a>
                <nav class="nav">
                    <ul class="nav-list">
                        <li><a class="nav-link" href="/index.html#projects">Hotels</a></li>
                        <li><a class="nav-link" href="/index.html#about">About</a></li>
                        <li><a class="nav-link" href="/index.html#contact">Contact</a></li>
                    </ul>
                    <a class="instagram-anchor" href="https://www.instagram.com/slodkiestudio/" target="_blank" aria-label="Instagram">
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
            <a class="footer-privacy-policy" href="/privacy_policy.html">Privacy Policy</a>
            <p class="footer-copyright">&copy; Maciek Ginalski ${new Date().getFullYear()}</p>
        </footer>
        `
    }
}

customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active")
    }
})
