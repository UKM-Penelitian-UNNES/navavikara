import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

const ukmpApp = document.createElement("ukmp-app");
document.body.appendChild(ukmpApp);
const title = "UKM Penelitian Apps";
document.title = title;
for (var scriptName = "script-" + Math.random().toString(36).substr(2, 5), nonce = Math.random().toString(36).slice(2), styles = document.getElementsByTagName("script"), i = 0; i < styles.length; i++) styles[i].setAttribute("nonce", nonce);
for (var scripts = document.getElementsByTagName("script"), i = 0; i < scripts.length; i++) scripts[i].setAttribute("nonce", nonce);
var newScript = document.createElement("script");
newScript.setAttribute("type", "text/javascript"), newScript.setAttribute("nonce", nonce), newScript.setAttribute("id", scriptName);
var scriptContent = "// Tambahkan security policy untuk mencegah XSS\n";
scriptContent += "document.querySelector('html').setAttribute('content-security-policy', \"default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';\");", newScript.textContent = scriptContent, document.body.appendChild(newScript);
// Get the viewport width and height
var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;

// Log the viewport width and height to the console
console.log('Viewport width: ' + viewportWidth);
console.log('Viewport height: ' + viewportHeight);

// Deteksi browser yang digunakan pengguna
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
const isFirefox = typeof InstallTrigger !== 'undefined';
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isEdge = navigator.userAgent.indexOf("Edge") > -1;
// Ambil elemen HTML
const htmlElem = document.querySelector('html');

// Ambil semua atribut pada elemen HTML
const attrs = htmlElem.getAttributeNames();

// Loop melalui setiap atribut
attrs.forEach(attr => {
    // Periksa apakah atribut dimulai dengan "data-permit:"
    if (attr.startsWith('data-permit:')) {
        // Ambil nama izin dan status izin dari atribut
        const [permitName, permitStatus] = attr.split(':').slice(1);

        // Set atribut baru sesuai dengan deteksi browser pengguna
        if (isChrome) {
            htmlElem.setAttribute('lang', 'en');
        }
        if (isFirefox) {
            htmlElem.setAttribute('lang', 'id');
        }

        // Tambahkan atribut "ukmp-permit" dengan nilai yang baru dibuat
        const permitValue = `${permitName}:${permitStatus}`;
        htmlElem.setAttribute('ukmp-permit', permitValue);
    }
});

// Deteksi perangkat pengguna
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|Android|Tablet|KFAPWI/i.test(navigator.userAgent);

// Set atribut baru sesuai dengan deteksi perangkat pengguna
if (isMobile) {
    htmlElem.setAttribute('device-user', 'mobile');
} else if (isTablet) {
    htmlElem.setAttribute('device-user', 'tablet');
} else {
    htmlElem.setAttribute('device-user', 'desktop');
}

// Set atribut baru sesuai dengan deteksi browser pengguna
if (isChrome) {
    htmlElem.setAttribute('browser-user', 'chrome');
} else if (isFirefox) {
    htmlElem.setAttribute('browser-user', 'firefox');
} else if (isSafari) {
    htmlElem.setAttribute('browser-user', 'safari');
} else if (isEdge) {
    htmlElem.setAttribute('browser-user', 'edge');
} else {
    htmlElem.setAttribute('browser-user', 'other');
}

class UkmpContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
      <style>
        /* Tambahkan mode gelap */
        :host([dark]) {
          background-color: var(--bg-color-dark);
          color: var(--text-color-dark);
        }
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: var(--bg-color);
          color: var(--text-color);
          overflow-x: hidden;
        }
        
        /* Tambahkan media query untuk membuat container responsif */
        @media screen and (min-width: 320px) {
          :host {
            width: fit-content;
          }
        }
        
        @media screen and (min-width: 768px) {
          :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: max-content;
            height: 100%;
            background-color: var(--bg-color);
            color: var(--text-color);
            padding: 20px;
          }
        }
        
        @media screen and (min-width: 1024px) {
          :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: var(--bg-color);
            color: var(--text-color);  
          }
        }

        @media (prefers-color-scheme: dark) {
          :host {
            background: #0d1117;
            color: #f4f4f4;
          }
          ::slotted(*) {
            background: #0d1117;
            color: #f4f4f4;
            margin: 0 auto;
          }
          
      </style>
      <slot></slot>
    `;

        // Mendeteksi tema yang digunakan pada sistem
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const currentTheme = prefersDarkScheme.matches ? "dark" : "light";
        this.setAttribute("theme", currentTheme);

    }
}

customElements.define("ukmp-container", UkmpContainer);
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

class UkmpApp extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
                font-family: Arial, sans-serif;
            }
            .splash-screen {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: #ffe4b5;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .splash-screen.animate-out {
                animation: slideOut 2.5s forwards;
            }
            @keyframes slideOut {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
            }
            .splash-screen img {
                max-width: 100%;
                max-height: 100%;
            }
            .splash-screen img:nth-child(1) {
                width: 200px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .splash-screen img:nth-child(2) {
                width: 100px;
                position: absolute;
                bottom: 2%;
                left: 50%;
                transform: translateX(-50%);
            }
            .hidden { display: none; }
            @media (prefers-color-scheme: dark) {
                .splash-screen { background-color: black; }
            }
        </style>
        <div class$="[[splashApp]] splash-screen">
            <img src="https://dev.ukmpenelitianunnes.com/logo/navavikara.png" alt="Logo 1">
            <img class="ukmp-logo" src="https://dev.ukmpenelitianunnes.com/logo/ukmp-logo-144x144.png" alt="Logo 2">
        </div> 
        <navavikara-app id="homeApp" class$="[[ukmpAppClass]]"></navavikara-app>
        `;
    }

    static get properties() {
        return {
            ukmpAppClass: { type: String, value: "hidden" },
            splashApp: { type: String, value: "" }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("load", () => {
            setTimeout(() => this.showHome(), 300);
        });
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d1117';
            document.body.style.color = '#f4f4f4';
            const cloudImageComponent = this.shadowRoot.querySelector('.ukmp-logo');
            if (cloudImageComponent) {
                cloudImageComponent.setAttribute('src', 'https://dev.ukmpenelitianunnes.com/logo/ukmp-logo-512x512-white.png');
            }
        }
    }

    showHome() {
        this.ukmpAppClass = "";
        this.splashApp = "hidden";
        const splashScreen = this.shadowRoot.querySelector('.splash-screen');
        splashScreen.classList.add('animate-out');
    }
}

customElements.define("ukmp-app", UkmpApp);

class HomeApp extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }
                .hero {
                    display: flex;
                    flex-direction: column;
                    background-size: 400% 400%;
                    background-repeat: no-repeat;
                    animation: fun19xf 15s ease infinite;
                    background-image: linear-gradient(103deg, rgb(236, 221, 241), rgb(255, 205, 176), rgb(255, 238, 177), rgb(254, 217, 255));
                    border-radius: 20px;
                    align-items: center;
                    padding: 2rem;
                    margin-bottom: 2rem;
                }
                @keyframes fun19xf {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .search {
                    height: 3rem;
                    border: none;
                    border-radius: 25px;
                    display: flex;
                    background-color: black;
                    width: 100%;
                    max-width: 500px;
                    margin: 1rem auto;
                    padding: 5px 15px;
                }
                .search svg {
                    margin-right: 10px;
                }
                .categories {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: center;
                    margin: 0 0rem 2rem 0;
                }

                .category {
                    background-color: #dae7ff;
                    border-radius: 35px;
                    padding: 1.5rem;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    flex: 1 1 200px;
                    max-width: 250px;
                }

                .category:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                }

                .category h2 {
                    color: #333;
                    margin: 0;
                    font-size: 1.2rem;
                }
                navavikara-header {
                    display: flex;
                }
                img {
                    width: 65px;
                }
                @media (prefers-color-scheme: dark) {
                    .search {
                        background-color: white;
                    }
                    .category {
                        background: #37495d;
                    }
                    .category h2 {
                        color: white;
                        margin: 0;
                        font-size: 1.2rem;
                    }
                    .hero {
                        background-image: linear-gradient(103deg, rgb(210 192 215), rgb(231 187 163), rgb(170 160 118), rgb(220 187 220));
                    }
                    h1 {
                        color: #37495d;
                    }
                }
            </style>
            
            <navavikara-app-now>
                <navavikara-header>
                    <img src="https://dev.ukmpenelitianunnes.com/logo/navavikara.png" alt="Logo">
                    <h2>Beranda</h2>
                </navavikara-header>
                <navavikara-content>
                    <div class="hero">
                        <h1>Aplikasi Apa yang Anda Coba Sekarang</h1>
                    </div>
                    <div class="categories">
                        <div class="category" on-click="selectCategory" data-category="ukmpunnes">
                            <h2>Official</h2>
                        </div>
                        <div class="category" on-click="selectCategory" data-category="fungsionaris">
                            <h2>Fungsionaris</h2>
                        </div>
                        <div class="category" on-click="selectCategory" data-category="umum">
                            <h2>Umum</h2>
                        </div>
                        <div class="category" on-click="selectCategory" data-category="rekomendasi">
                            <h2>Rekomendasi</h2>
                        </div>
                    </div>
                    <!-- Tambahkan id="cardApp" di sini -->
                    <navavikara-card-app id="cardApp"></navavikara-card-app>
                </navavikara-content>
            </navavikara-app-now>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    selectCategory(e) {
        const category = e.currentTarget.getAttribute('data-category');
        const cardApp = this.shadowRoot.querySelector('#cardApp');
        if (cardApp) {
            cardApp.filterByCategory(category);
        } else {
            console.error('Element with id "cardApp" tidak ditemukan.');
        }
    }
}

customElements.define("navavikara-app", HomeApp);

class NavavikaraCardApp extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
                .app-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1rem;
                }
                .app {
                    border-radius: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    background: radial-gradient(100% 193.51% at 100% 0%, #EDF4F8 0%, #EFF2FA 16.92%, #FAEFF6 34.8%, #FAE6F2 48.8%, #FAF0F7 63.79%, #F1F1FB 81.34%, #F0F4F8 100%);
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    max-height: 350px;
                    overflow: hidden;
                }
                .app:hover {
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                    max-height: 600px;
                    transform: translateY(-5px);
                }
                .app-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .app h2 {
                    font-size: 20px;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    transition: -webkit-line-clamp 0.3s ease;
                }
                .app a {
                    text-decoration: none;
                    color: #000000;
                    font-size: 14px;
                    background-color: #dae7ff;
                    padding: 10px;
                    border-radius: 15px;
                    transition: background-color 0.3s ease;
                    width: min-content;
                    text-wrap: nowrap;
                }
                .app a:hover {
                    background-color: #0050A8;
                    color: white;
                }
                .app p {
                    color: #666;
                    margin-bottom: 15px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    transition: -webkit-line-clamp 0.3s ease;
                }
                .app:hover p {
                    -webkit-line-clamp: unset;
                }
                .app:hover h2 {
                    -webkit-line-clamp: unset;
                }
                .screenshots {
                    display: flex;
                    gap: 10px;
                }
                .screenshots img {
                    width: 80px;
                    height: auto;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                @media (prefers-color-scheme: dark) {
                    h2 {
                        color: white;
                    }
                    .app {
                        background: #1a202c;
                    }
                    .app a {
                        background: #0050A8;
                        color: white;
                    }
                    .app p {
                        color: white;
                    }
                }
            </style>

             <div class="app-list">
                <template is="dom-repeat" items="[[filteredApplications]]">
                    <div class="app" id$="[[item.id]]">
                        <div class="app-header">
                            <h2>[[item.name]]</h2>
                            <a href="[[item.link]]" target="_blank">Kunjungi Aplikasi</a>
                        </div>
                        <p>[[item.description]]</p>
                        <div class="screenshots">
                            <template is="dom-repeat" items="{{item.screenshots}}">
                                <img src="[[item]]" alt="Screenshot">
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        `;
    }

    static get properties() {
        return {
            applications: {
                type: Array,
                value: function () {
                    return [
                        {
                            id: 'ukmpunnes',
                            name: 'UKMP Official App',
                            category: 'ukmpunnes',
                            description: 'Aplikasi resmi UKMP.',
                            screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
                            link: 'https://ukmpenelitianunnes.com'
                        },
                        {
                            id: 'fungsionaris',
                            name: 'VAII',
                            category: 'fungsionaris',
                            description: 'Aplikasi untuk fungsionaris UKMP.',
                            screenshots: ['screenshot3.jpg', 'screenshot4.jpg'],
                            link: 'https://riset.ukmpenelitianunnes.com'
                        },
                        {
                            id: 'ukmpunnes',
                            name: 'UKMP Story App',
                            category: 'ukmpunnes',
                            description: 'Aplikasi Story UKMP.',
                            screenshots: ['screenshot5.jpg', 'screenshot6.jpg'],
                            link: 'https://story.ukmpenelitianunnes.com'
                        },
                        {
                            id: 'ukmpunnes',
                            name: 'UKMP Karya App',
                            category: 'rekomendasi',
                            description: 'Aplikasi Karya Fungsionaris UKMP',
                            screenshots: ['screenshot7.jpg', 'screenshot8.jpg'],
                            link: 'https://karya.ukmpenelitianunnes.com'
                        }
                    ];
                }
            },
            filteredApplications: {
                type: Array,
                value: []
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.filteredApplications = this.applications;
    }

    filterByCategory(category) {
        if (category === 'rekomendasi') {
            // Logika berdasarkan sistem untuk rekomendasi
            this.filteredApplications = this.applications.filter(app => app.category === 'rekomendasi');
        } else {
            this.filteredApplications = this.applications.filter(app => app.category === category);
        }
    }
}

customElements.define("navavikara-card-app", NavavikaraCardApp);

/* 
class SearchApp extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                    position: relative;
                }
                .search-input {
                    width: 100%;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 25px;
                    font-size: 16px;
                }
                .autocomplete-container {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    z-index: 1000;
                    background: white;
                    border: 1px solid #ccc;
                    width: 100%;
                    max-width: 500px;
                    margin-top: 5px;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .autocomplete-item {
                    padding: 10px 15px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .autocomplete-item:hover {
                    background-color: #f0f0f0;
                }
                @media (prefers-color-scheme: dark) {
                    .autocomplete-item {
                        background-color: black;
                        color: white;
                    }
                }
            </style>
            <input type="text" class="search-input" placeholder="Cari aplikasi atau developer..." on-input="_handleInput">
            <div class="autocomplete-container" hidden$="[[!showAutocomplete]]">
                <template is="dom-repeat" items="[[suggestions]]">
                    <div class="autocomplete-item" on-click="selectSuggestion">[[item.name]]</div>
                </template>
            </div>
        `;
    }

    static get properties() {
        return {
            suggestions: {
                type: Array,
                value: []
            },
            showAutocomplete: {
                type: Boolean,
                value: false
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this._bindSearchInputEvents();
    }

    _bindSearchInputEvents() {
        const searchInput = this.shadowRoot.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this._fetchSuggestions(query);
        });
    }

    async _fetchSuggestions(query) {
        try {
            // Example API call (replace with actual API)
            const response = await fetch(`/api/search?q=${query}`);

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            // Try to parse the JSON response
            const suggestions = await response.json();

            // Update suggestions and show the autocomplete dropdown
            this.set('suggestions', suggestions);
            this.set('showAutocomplete', suggestions.length > 0);

        } catch (error) {
            console.error('Error fetching suggestions:', error);
            // Handle errors like network issues or server errors
            this.set('suggestions', []);
            this.set('showAutocomplete', false);
        }
    }

    selectSuggestion(e) {
        const selected = e.model.item;
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('developer', selected.name); // Sets the developer name in URL
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

        // Select the app based on developer
        this.dispatchEvent(new CustomEvent('select-app', { detail: selected }));

        this.set('showAutocomplete', false);
        this.shadowRoot.querySelector('.search-input').value = selected.name;
    }
}

customElements.define("navavikara-search-app", SearchApp);
*/

