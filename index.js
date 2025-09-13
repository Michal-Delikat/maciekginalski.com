class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <div id="menu">
                
                    <h1><a href="index.html">Maciek Ginalski Photography</a></h1>
                
                <div id="ikony">
                    <a href="https://www.instagram.com/maciek_ginalski_photography/" target="_blank"><img src="img/instagram.png"></a>
                    <a href="https://www.facebook.com/MaciekGinalski" target="_blank"><img src="img/facebook.png"></a>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html#index">Strona główna</a></li>
                    <li><a href="index.html#o_mnie">O mnie</a></li>
                    <li><a href="index.html#projekty">Projekty</a></li>
                    <li><a href="index.html#kontakt">Kontakt</a></li>
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

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active")
    }
})

const banner = document.getElementById("cookies-banner");
const acceptBtn = document.querySelector("#accept-cookies-button");
const rejectBtn = document.querySelector("#reject-cookies-button");

function loadAnalytics() {
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-52ZZTQ2TBL";
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-52ZZTQ2TBL');
}

acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookies_consent", "accepted");
  loadAnalytics();
  banner.style.display = "none";
});

rejectBtn.addEventListener("click", () => {
  localStorage.setItem("cookies_consent", "rejected");
  banner.style.display = "none";
});

const savedConsent = localStorage.getItem("cookies_consent");
if (savedConsent === "accepted") {
  loadAnalytics();
//   banner.style.display = "none";
} else if (savedConsent === "rejected") {
//   banner.style.display = "none";
}