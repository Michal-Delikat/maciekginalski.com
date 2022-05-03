class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <div id="menu">
                <a href="index.html">
                    <h1>Maciek Ginalski Photography</h1>
                </a>
                <div id="ikony">
                    <a href="https://www.instagram.com/maciek_ginalski_photography/" target="_blank"><img src="img/instagram.png"></a>
                    <a href="https://www.facebook.com/MaciekGinalski" target="_blank"><img src="img/facebook.png"></a>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html">Strona główna</a></li>
                    <li><a href="o_mnie.html">O mnie</a></li>
                    <li><a href="projekty.html">Projekty</a></li>
                    <li><a href="milosc.html">Miłość</a></li>
                    <li><a href="kontakt.html">Kontakt</a></li>
                </ul>
            </nav>
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