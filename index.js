class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header">
            <div class="inner-header">
                <h1><a href="/index.html">Maciek Ginalski Photography</a></h1>
                <nav class="nav">
                    <ul>
                        <li><a href="/index.html#index">Main page</a></li>
                        <li><a href="/index.html#o_mnie">About me</a></li>
                        <li><a href="/index.html#projekty">Projects</a></li>
                        <li><a href="/index.html#kontakt">Contact</a></li>
                    </ul>
                    <a class="instagram-image-container" href="https://www.instagram.com/maciek_ginalski_photography/" target="_blank">
                        <img src="/img/instagram.png" class="instagram-image">
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
        <footer>
            <p>&copy; Maciek Ginalski ${new Date().getFullYear()}</p>
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
