import { PolymerElement, html } from "http://ukmpenelitianunnes.com/node_modules/@polymer/polymer/polymer-element.js";

const ukmpApp = document.createElement("ukmp-app");
document.body.appendChild(ukmpApp);
const title = "UKM Penelitian Apps";
document.title = title;
for (var scriptName = "script-" + Math.random().toString(36).substr(2, 5), nonce = Math.random().toString(36).slice(2), styles = document.getElementsByTagName("script"), i = 0; i < styles.length; i++) styles[i].setAttribute("nonce", nonce);
var script = document.createElement("script");
script.setAttribute("nonce", nonce), script.setAttribute("src", "app.js"), script.setAttribute("id", scriptName), document.head.appendChild(script);
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
        // Set max-width dari slot berdasarkan viewport width
        this.updateSlottedMaxWidth();

        // Menambahkan event listener untuk resize event
        window.addEventListener('resize', () => this.updateSlottedMaxWidth());
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
          overflow: hidden;
          max-width: min-content;
        }
          
        ::part(header) {
          position: fixed;
          top: 0;
          width: 100%;
        }

        ::part(sidebar) {
          position: fixed;
          left: 0;
          height: 100%;
          width: 250px; /* Adjust width if needed */
        }

        ::part(toolbar) {
          position: fixed;
          bottom: 0;
          width: 100%;
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
          
          ::part(header) {
            position: fixed;
            top: 0;
            width: 100%;
          }

          ::part(sidebar) {
            position: fixed;
            left: 0;
            height: 100%;
            width: 250px; /* Adjust width if needed */
          }

          ::part(toolbar) {
            position: fixed;
            bottom: 0;
            width: 100%;
          }
        }
          
      </style>
      <slot></slot>
    `;

        // Mendeteksi tema yang digunakan pada sistem
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const currentTheme = prefersDarkScheme.matches ? "dark" : "light";
        this.setAttribute("theme", currentTheme);

    }
    connectedCallback() {
        super.connectedCallback();
    }

    updateSlottedMaxWidth() {
        const viewportWidth = window.innerWidth;
        const maxWidth = Math.min(viewportWidth * 0.8, 1200) + 'px'; // Contoh, 80% dari viewport atau max 1200px

        // Terapkan nilai max-width ke ::slotted menggunakan variabel CSS
        this.style.setProperty('--slotted-max-width', maxWidth);
    }
}

customElements.define("ukmp-container", UkmpContainer);

class UkmpApp extends PolymerElement {
    constructor() {
        super(), window.addEventListener("load", () => {
            const loadElement = this.shadowRoot.querySelector("ukmp-load");
            loadElement.parentNode.removeChild(loadElement);
            this.style.overflow = "hidden"; // tambahkan baris ini
            this.updateSlottedMaxWidth();
        });
        window.addEventListener('resize', () => this.updateSlottedMaxWidth());
    }

    static get template() {
        return html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        --app-background-color: #dbe0e5; /* variabel kustom ditambahkan ke host */
        --app-border-radius: 25px; /* variabel kustom ditambahkan ke host */
      }

      ::slotted(*) {
        background: #0d1117;
        color: #f4f4f4;
        margin: 0 auto;
        max-width: var(--slotted-max-width, 100%);
      }
      
      [prestasi] {
        background: #dbe0e5;
        padding: 10px;
        border-radius: 20px;
      }

      .ukmp-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .apps{
        background-color: var(--app-background-color); 
        border-radius: var(--app-border-radius); 
        overflow: auto;
        padding: 1rem;
      }
      @media (prefers-color-scheme: dark) {
        [aplikasi] {
          background: #242b34;
          color: #f4f4f4;
          border-radius: 25px;
        }
        
        [prestasi] {
          background: #242b34;
          color: #f4f4f4;
          padding: 10px;
          border-radius: 20px;
        }

        body {
          background-color: #161b22;
          color: #f4f4f4;
        }
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          --app-background-color: #0d1117; /* variabel kustom ditambahkan ke host */
          --app-border-radius: 10px; /* variabel kustom ditambahkan ke host */
        }
      }
      
      :host::-webkit-scrollbar {
        width: 0.5em;
        background-color: #F5F5F5;
      }
      
      :host::-webkit-scrollbar-thumb {
        background-color: #000000;
      }

      div::slotted(kartu-prestasi) {
        background: white !important;
        color: #f4f4f4;
      })

      /* CSS untuk perangkat seluler dengan layar kecil */
      @media only screen and (max-width: 320px) {
        :host {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: space-around;
          justify-content: center;
          align-items: center;
          width: max-content;
          height: 100%;
          zoom: 0.33;          
        }
      }

      /* CSS untuk perangkat seluler dengan layar sedang */
      @media only screen and (min-width: 321px) and (max-width: 375px) {
        :host {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: space-around;
          justify-content: center;
          align-items: center;
          width: max-content;
          height: 100%;
        }
      }

      /* CSS untuk perangkat seluler dengan layar besar */
      @media only screen and (min-width: 376px) and (max-width: 414px) {
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: max-content;
          zoom: 0.43;
        }
      
        /* tambahkan margin atau padding pada elemen */
        .apps {
          margin: 1rem;
        }
      }

    </style>
    <ukmp-container>
      <ukmp-header></ukmp-header>
      <ukmp-content>
        <div slot="kartu-welcome">
            <kartu-welcome></kartu-welcome>
        </div>
        <div slot="kartu-fungsio">
          <kartu-fungsio></kartu-fungsio>
        </div>
        <div slot="kartu-progker">
          <kartu-progker></kartu-progker>
        </div>
        <div slot="kartu-dep">
          <kartu-dep></kartu-dep>
        </div>
      </ukmp-content>
      <ukmp-load></ukmp-load>
    </ukmp-container>
  `
    }
    connectedCallback() {
        super.connectedCallback();
        function deteksiKoneksi() {
            var koneksi = {};

            // Deteksi jenis koneksi
            if (navigator.connection) {
                if (navigator.connection.type === 'wifi') {
                    koneksi.jenis = 'WiFi';
                } else if (navigator.connection.type === 'cellular') {
                    koneksi.jenis = 'seluler';
                } else {
                    koneksi.jenis = 'lainnya';
                }
            } else {
                koneksi.jenis = 'tidak diketahui';
            }

            // Deteksi nama provider
            if (koneksi.jenis === 'WiFi') {
                if (navigator.connection && navigator.connection.ssid) {
                    koneksi.provider = navigator.connection.ssid;
                } else {
                    koneksi.provider = 'tidak diketahui';
                }
            } else if (koneksi.jenis === 'seluler') {
                if (navigator.connection && navigator.connection.effectiveType) {
                    koneksi.provider = navigator.connection.effectiveType;
                } else {
                    koneksi.provider = 'tidak diketahui';
                }
            } else {
                koneksi.provider = 'tidak diketahui';
            }

            // Set atribut koneksi-perangkat pada elemen HTML
            var html = document.querySelector('html');
            html.setAttribute('koneksi-perangkat', JSON.stringify(koneksi));
        }

        deteksiKoneksi();

        // Get the viewport width and height
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        // Set the data-info attribute on the HTML element
        document.querySelector('html').setAttribute('data-info', 'Ukuran layar: ' + viewportWidth + 'x' + viewportHeight);
        // Check if the user prefers a dark color scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }

        // Check if the device supports motion sensors
        if (window.DeviceMotionEvent) {
            // Add an event listener for device motion
            window.addEventListener('devicemotion', function (event) {
                // Get the acceleration including gravity
                var acceleration = event.accelerationIncludingGravity;
                // Set the data-motion attribute on the HTML element
                document.querySelector('html').setAttribute('data-motion', 'Acceleration: ' + acceleration.x + ',' + acceleration.y + ',' + acceleration.z);
            });
        }

        // Get the HTML element
        var html = document.querySelector('html');

        // Set default animasi value
        var animasi = {
            jenis: 'rotate',
            durasi: '10s'
        };

        var respon = {
            display: 'flex',
            flexflow: 'row-wrap',
            placecon: 'space-around-center',
            alitem: 'center',
            mar: '0 auto',
            tinggi: '100%',
        }

        // Check if animasi attribute is already set, and parse the value if it exists
        if (html.hasAttribute('animasi')) {
            animasi = JSON.parse(html.getAttribute('animasi'));
        } else {
            // Set the animasi attribute to the default value
            html.setAttribute('animasi', JSON.stringify(animasi));
        }

        if (html.hasAttribute('respon')) {
            animasi = JSON.parse(html.getAttribute('respon'));
        } else {
            // Set the animasi attribute to the default value
            html.setAttribute('respon', JSON.stringify(respon));
        }

        // Apply the animation to the HTML element
        html.style.animation = animasi.jenis + ' ' + animasi.durasi + ' infinite';
        html.style.respon = respon.display + 'flex' + respon.flexflow + 'row-wrap' + respon.placecon + 'space-around-center' + respon.alitem + 'center' + respon.lebar + 'max-content' + respon.tinggi + '100% infinite';


        // Get the typography from localStorage or set the default value
        var typography = localStorage.getItem('typography');
        if (typography) {
            typography = JSON.parse(typography);
        } else {
            typography = {
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                lineHeight: '1.5'
            };
            localStorage.setItem('typography', JSON.stringify(typography));
        }

        // Get the HTML element
        var html = document.querySelector('html');

        // Set the typograph properties to the HTML element
        html.style.fontSize = typography.fontSize;
        html.style.fontFamily = typography.fontFamily;
        html.style.lineHeight = typography.lineHeight;
        html.style.margin = respon.mar;

        // Set the typograph properties to the typograph attribute of the HTML element
        html.setAttribute('typograph', JSON.stringify(typography));
        // Get the HTML element
        var html = document.querySelector('html');

        // Set the "dir" attribute based on the user's language
        if (navigator.language.startsWith('ar')) {
            html.setAttribute('dir', 'rtl');
        } else {
            html.setAttribute('dir', 'ltr');
        }
    }
    updateSlottedMaxWidth() {
        const viewportWidth = window.innerWidth;
        const maxWidth = Math.min(viewportWidth * 0.8, 1200) + 'px'; // Contoh, 80% dari viewport atau max 1200px

        // Terapkan nilai max-width ke ::slotted menggunakan variabel CSS
        this.style.setProperty('--slotted-max-width', maxWidth);
    }

}
customElements.define("ukmp-app", UkmpApp);

class UkmpContent extends PolymerElement {
    static get template() {
        return html`
    <style>
      :host {
        display: block;
        padding: 50px 0 0 0;
        box-sizing: border-box;
        margin: 20px;
      }
      #container {
        overflow-y: auto;
      }
    </style>
    <div id="container">
      <slot name="kartu-welcome"></slot>
      <slot name="kartu-fungsio"></slot>
      <slot name="kartu-progker"></slot>
      <slot name="kartu-dep"></slot>
      <slot></slot>
    </div>
  `;
    }
}
customElements.define("ukmp-content", UkmpContent);

class UkmpSidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary-color: #3498db;
          --background-color: #f8f8f8;
          --text-color: #333;
          --shadow-color: rgba(0, 0, 0, 0.1);
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --background-color: #1a202c;
            --text-color: #f4f4f4;
            --shadow-color: rgba(255, 255, 255, 0.1);
          }
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9998;
          height: 60px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background-color: var(--background-color);
          box-shadow: 0 -2px 10px var(--shadow-color);
          transition: transform 0.3s ease-in-out;
        }

        .sidebar-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          transition: transform 0.2s ease;
          left: 20px;
          position: relative;
        }

        .sidebar-button:hover {
          transform: scale(1.1);
        }

        .sidebar-button svg {
          width: 24px;
          height: 24px;
          fill: var(--text-color);
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .modal.visible {
          opacity: 1;
        }

        .modal-content {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: var(--background-color);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          padding: 20px;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.3s ease-in;
          width: max-content;
          height: 100%;
        }

        .modal.visible .modal-content {
          transform: translateX(0);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-title {
          font-size: 1.2em;
          font-weight: bold;
          color: var(--text-color);
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5em;
          cursor: pointer;
          color: var(--text-color);
        }

        .app-grid {
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: space-evenly;
          align-items: center;
          flex-wrap: wrap;
          left: 0;
          position: relative;
          height: max-content;
          gap: 0;
          row-gap: 100px
        }

        .app-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .app-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          margin-bottom: 8px;
          transition: transform 0.2s ease;
        }

        .app-icon:hover {
          transform: scale(1.1);
        }

        .app-name {
          font-size: 0.9em;
          color: var(--text-color);
        }

        @media (max-width: 600px) {
          .app-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      </style>

      <div class="sidebar">
        <button class="sidebar-button apps-button">☰</button>
      </div>

      <div class="modal" id="appsModal">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close-button">&times;</button>
          </div>
          <div class="app-grid">
            <!-- App items will be dynamically added here -->
          </div>
        </div>
      </div>
    `;

        this.populateAppGrid();
        this.modal = this.shadowRoot.getElementById('appsModal');
        this.modalContent = this.modal.querySelector('.modal-content');
    }

    setupEventListeners() {
        const appsButton = this.shadowRoot.querySelector('.apps-button');
        const closeButton = this.shadowRoot.querySelector('.close-button');
        const modal = this.shadowRoot.getElementById('appsModal');
        const modalContent = modal.querySelector('.modal-content');

        appsButton.addEventListener('click', () => this.openModal());
        closeButton.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => this.handleOutsideClick(e));

        modalContent.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        modalContent.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        modalContent.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        this.removeModalEventListeners();

        // Add new event listeners
        this.addModalEventListeners();
    }

    populateAppGrid() {
        const appGrid = this.shadowRoot.querySelector('.app-grid');
        const apps = [
            { name: 'Riset UKMP', icon: 'https://ukmpapps.web.app/apps/4.png', link: 'https://ukmpapps.web.app/apps/karya/SecureJourney' },
            { name: 'Berita', icon: 'https://ukmpapps.web.app/apps/5.png', link: 'https://ukmpapps.web.app/berita' },
            { name: 'Prestasi', icon: 'https://ukmpapps.web.app/apps/6.png', link: 'https://ukmpapps.web.app/prestasi' },
            { name: 'Departement', icon: 'https://ukmpapps.web.app/apps/7.png', link: 'https://ukmpapps.web.app/departement' },
        ];

        apps.forEach(app => {
            const appItem = document.createElement('div');
            appItem.className = 'app-item';
            appItem.innerHTML = `
        <img src="${app.icon}" alt="${app.name}" class="app-icon">
        <span class="app-name">${app.name}</span>
      `;
            appItem.addEventListener('click', () => window.location.href = app.link);
            appGrid.appendChild(appItem);
        });
    }

    addModalEventListeners() {
        this.handleTouchStartBound = this.handleTouchStart.bind(this);
        this.handleTouchMoveBound = this.handleTouchMove.bind(this);
        this.handleTouchEndBound = this.handleTouchEnd.bind(this);

        this.modalContent.addEventListener('touchstart', this.handleTouchStartBound);
        this.modalContent.addEventListener('touchmove', this.handleTouchMoveBound);
        this.modalContent.addEventListener('touchend', this.handleTouchEndBound);
    }

    removeModalEventListeners() {
        if (this.handleTouchStartBound) {
            this.modalContent.removeEventListener('touchstart', this.handleTouchStartBound);
            this.modalContent.removeEventListener('touchmove', this.handleTouchMoveBound);
            this.modalContent.removeEventListener('touchend', this.handleTouchEndBound);
        }
    }

    openModal() {
        this.modalContent.style.transform = 'translateX(100%)';
        this.modal.style.display = 'block';
        requestAnimationFrame(() => {
            this.modal.classList.add('visible');
            this.modalContent.style.transform = 'translateX(0)';
        });
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('visible');
        this.modalContent.style.transform = 'translateX(100%)';
        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
            this.modalContent.style.transform = ''; // Reset transform
        }, 300);
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.modalContent.style.transition = 'none';
    }

    handleTouchMove(e) {
        if (!this.touchStartX) return;
        const touchCurrentX = e.touches[0].clientX;
        const deltaX = touchCurrentX - this.touchStartX;

        if (deltaX < 0) {
            e.preventDefault(); // Prevent scrolling of background content
            const newTransform = Math.min(deltaX, window.innerHeight / 2);
            this.modalContent.style.transform = `translateX(${newTransform}px)`;
        }
    }

    handleTouchEnd(e) {
        if (!this.touchStartX) return;
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - this.touchStartX;

        this.modalContent.style.transition = 'transform 0.3s ease-in';

        if (deltaX < 0) {
            this.closeModal();
        } else {
            this.modalContent.style.transform = 'translateX(0)';
        }
        this.touchStartY = null;
    }

    handleOutsideClick(event) {
        if (event.target === this.modal) {
            this.closeModal();
        }
    }
}

customElements.define('ukmp-sidebar', UkmpSidebar);

class UkmpHeader extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
          width: 100%;
        }
        ukmp-header-ui::part(header) {
          position: fixed;
          top: 0;
          width: 100%;
        }

        ukmp-header-ui::part(sidebar) {
          position: fixed;
          left: 0;
          height: 100%;
          width: 250px; /* Adjust width if needed */
        }

        ukmp-header-ui::part(toolbar) {
          position: fixed;
          bottom: 0;
          width: 100%;
        }
        @media (prefers-color-scheme: dark) {
            :host {
                background: #0d1117;
                color: #f4f4f4;
            }
        }
      </style>
      <ukmp-header-ui part$="[[part]]"></ukmp-header-ui>
    `;
    }

    static get properties() {
        return {
            part: {
                type: String,
                reflectToAttribute: true,
                observer: '_partChanged'
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this._updatePart();
        window.addEventListener('resize', this._updatePart.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('resize', this._updatePart.bind(this));
    }

    _updatePart() {
        if (window.matchMedia('(max-width: 600px)').matches) {
            this.part = 'toolbar';  // Smartphone
        } else if (window.matchMedia('(min-width: 601px) and (max-width: 1024px)').matches) {
            this.part = 'sidebar';  // Tablet
        } else {
            this.part = 'header';   // Laptop/PC
        }
    }

    _partChanged(part) {
        // Logic handled by ukmp-header-ui
    }
}

customElements.define('ukmp-header', UkmpHeader);

class UkmpHeaderUI extends HTMLElement {
    static get observedAttributes() {
        return ['part'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'part') {
            this.renderPart(newValue);
        }
    }

    renderPart(part) {
        if (part === 'header') {
            this.shadowRoot.innerHTML = `<ukmp-header-content></ukmp-header-content>`;
        } else if (part === 'toolbar') {
            this.shadowRoot.innerHTML = `<ukmp-toolbar></ukmp-toolbar>`;
        } else if (part === 'sidebar') {
            this.shadowRoot.innerHTML = `<ukmp-sidebar></ukmp-sidebar>`;
        }
        // Replace only the content, without affecting styles
        this.shadowRoot.querySelector('part').innerHTML = `<style>
        :host {
          display: block;
          width: 100%;
        }
        ukmp-header-ui::part(header) {
          position: fixed;
          top: 0;
          width: 100%;
        }

        ukmp-header-ui::part(sidebar) {
          position: fixed;
          left: 0;
          height: 100%;
          width: 250px; /* Adjust width if needed */
        }

        ukmp-header-ui::part(toolbar) {
          position: fixed;
          bottom: 0;
          width: 100%;
        }
        @media (prefers-color-scheme: dark) {
            :host {
                background: #0d1117;
                color: #f4f4f4;
            }
        }
      </style>`;
    }
}

customElements.define('ukmp-header-ui', UkmpHeaderUI);

class UkmpToolbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary-color: #3498db;
          --background-color: #f8f8f8;
          --text-color: #333;
          --shadow-color: rgba(0, 0, 0, 0.1);
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --background-color: #1a202c;
            --text-color: #f4f4f4;
            --shadow-color: rgba(255, 255, 255, 0.1);
          }
        }

        .toolbar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9998;
          height: 60px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: var(--background-color);
          box-shadow: 0 -2px 10px var(--shadow-color);
          transition: transform 0.3s ease-in-out;
        }

        .toolbar-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          transition: transform 0.2s ease;
        }

        .toolbar-button:hover {
          transform: scale(1.1);
        }

        .toolbar-button svg {
          width: 24px;
          height: 24px;
          fill: var(--text-color);
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .modal.visible {
          opacity: 1;
        }

        .modal-content {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--background-color);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          padding: 20px;
          max-height: 80vh;
          overflow-y: auto;
          transform: translateY(100%);
          transition: transform 0.3s ease-out;
        }

        .modal.visible .modal-content {
          transform: translateY(0);
        }

        .swipe-indicator {
          width: 40px;
          height: 5px;
          background-color: var(--shadow-color);
          border-radius: 2.5px;
          margin: 0 auto 15px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-title {
          font-size: 1.2em;
          font-weight: bold;
          color: var(--text-color);
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5em;
          cursor: pointer;
          color: var(--text-color);
        }

        .app-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 20px;
          justify-items: center;
        }

        .app-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .app-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          margin-bottom: 8px;
          transition: transform 0.2s ease;
        }

        .app-icon:hover {
          transform: scale(1.1);
        }

        .app-name {
          font-size: 0.9em;
          color: var(--text-color);
        }

        @media (max-width: 600px) {
          .app-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      </style>

      <div class="toolbar">
        <button class="toolbar-button home-button">
          <svg viewBox="0 0 24 24">
            <path d="M4,10V21h6V15h4v6h6V10L12,3Z"></path>
          </svg>
        </button>
        <button class="toolbar-button apps-button">
          <svg viewBox="0 0 24 24">
            <path d="M12 17a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 17a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 10a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 3a2 2 0 110 4 2 2 0 010-4z"></path>
          </svg>
        </button>
      </div>

      <div class="modal" id="appsModal">
        <div class="modal-content">
          <div class="swipe-indicator"></div>
          <div class="modal-header">
            <span class="modal-title">Aplikasi UKMP</span>
            <button class="close-button">&times;</button>
          </div>
          <div class="app-grid">
            <!-- App items will be dynamically added here -->
          </div>
        </div>
      </div>
    `;

        this.populateAppGrid();
        this.modal = this.shadowRoot.getElementById('appsModal');
        this.modalContent = this.modal.querySelector('.modal-content');
    }

    setupEventListeners() {
        const appsButton = this.shadowRoot.querySelector('.apps-button');
        const closeButton = this.shadowRoot.querySelector('.close-button');
        const modal = this.shadowRoot.getElementById('appsModal');
        const modalContent = modal.querySelector('.modal-content');

        appsButton.addEventListener('click', () => this.openModal());
        closeButton.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => this.handleOutsideClick(e));

        modalContent.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        modalContent.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        modalContent.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        this.removeModalEventListeners();

        // Add new event listeners
        this.addModalEventListeners();
    }

    populateAppGrid() {
        const appGrid = this.shadowRoot.querySelector('.app-grid');
        const apps = [
            { name: 'Download', icon: 'https://ukmpapps.web.app/apps/1.png', link: 'https://ukmpapps.web.app/download' },
            { name: 'UKMP Story', icon: 'https://ukmpapps.web.app/apps/2.png', link: 'https://ukmpapps.web.app/apps/story' },
            { name: 'Media Sosial', icon: 'https://ukmpapps.web.app/apps/3.png', link: 'https://ukmpapps.web.app/medsos' },
            { name: 'Karya UKMP', icon: 'https://ukmpapps.web.app/apps/4.png', link: 'https://ukmpapps.web.app/apps/karya/SecureJourney' },
            { name: 'Berita', icon: 'https://ukmpapps.web.app/apps/5.png', link: 'https://ukmpapps.web.app/berita' },
            { name: 'Prestasi', icon: 'https://ukmpapps.web.app/apps/6.png', link: 'https://ukmpapps.web.app/prestasi' },
            { name: 'Departement', icon: 'https://ukmpapps.web.app/apps/7.png', link: 'https://ukmpapps.web.app/departement' },
        ];

        apps.forEach(app => {
            const appItem = document.createElement('div');
            appItem.className = 'app-item';
            appItem.innerHTML = `
        <img src="${app.icon}" alt="${app.name}" class="app-icon">
        <span class="app-name">${app.name}</span>
      `;
            appItem.addEventListener('click', () => window.location.href = app.link);
            appGrid.appendChild(appItem);
        });
    }

    addModalEventListeners() {
        this.handleTouchStartBound = this.handleTouchStart.bind(this);
        this.handleTouchMoveBound = this.handleTouchMove.bind(this);
        this.handleTouchEndBound = this.handleTouchEnd.bind(this);

        this.modalContent.addEventListener('touchstart', this.handleTouchStartBound);
        this.modalContent.addEventListener('touchmove', this.handleTouchMoveBound);
        this.modalContent.addEventListener('touchend', this.handleTouchEndBound);
    }

    removeModalEventListeners() {
        if (this.handleTouchStartBound) {
            this.modalContent.removeEventListener('touchstart', this.handleTouchStartBound);
            this.modalContent.removeEventListener('touchmove', this.handleTouchMoveBound);
            this.modalContent.removeEventListener('touchend', this.handleTouchEndBound);
        }
    }

    openModal() {
        this.modalContent.style.transform = 'translateY(100%)';
        this.modal.style.display = 'block';
        requestAnimationFrame(() => {
            this.modal.classList.add('visible');
            this.modalContent.style.transform = 'translateY(0)';
        });
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('visible');
        this.modalContent.style.transform = 'translateY(100%)';
        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
            this.modalContent.style.transform = ''; // Reset transform
        }, 300);
    }

    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
        this.modalContent.style.transition = 'none';
    }

    handleTouchMove(e) {
        if (!this.touchStartY) return;
        const touchCurrentY = e.touches[0].clientY;
        const deltaY = touchCurrentY - this.touchStartY;

        if (deltaY > 0) {
            e.preventDefault(); // Prevent scrolling of background content
            const newTransform = Math.min(deltaY, window.innerHeight / 2);
            this.modalContent.style.transform = `translateY(${newTransform}px)`;
        }
    }

    handleTouchEnd(e) {
        if (!this.touchStartY) return;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchEndY - this.touchStartY;

        this.modalContent.style.transition = 'transform 0.3s ease-out';

        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.modalContent.style.transform = 'translateY(0)';
        }
        this.touchStartY = null;
    }

    handleOutsideClick(event) {
        if (event.target === this.modal) {
            this.closeModal();
        }
    }
}

customElements.define('ukmp-toolbar', UkmpToolbar);

class UkmpHeaderContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 9999;
        }
        .header_header__fIQUh {
            height: 60px;
            padding: 14px 32px;
        }
        .shared_horizontalCenteredFlex__RU29j {
            justify-content: center;
            align-items: center;
        }
        .shared_horizontalFlex__3OY6i {
            flex-direction: row;
        }
        .shared_flex__bW95Y {
            display: flex;
            left: 0;
            position: fixed;
            background: #e0e4e9;
            width: 100%;
            color: #0d1117;
        }
        .header_identity__0AzRU {
            display: flex;
            Right: 80px;
            position: relative;
            width: max-content;
            flex-direction: row;
            flex-wrap: nowrap;
            align-content: space-between;
            justify-content: space-between;
            align-items: center;
            column-gap: 30px;
        }
        .header_msLogo__PFnQS {
            margin-right: 18px;
            position: relative;
            top: 3px;
        }
        a, button, [role="button"], label {
            touch-action: manipulation;
        }
        a {
            text-decoration: none;
            background-color: transparent;
            outline: none;
            cursor: pointer;
            transition: color 0.3s;
            -webkit-text-decoration-skip: objects;
        }
        .header_clarityLogo__zYzCf {
            font-size: 20px;
            color: black;
            position: relative;
            line-height: 28px;
            margin-left: 18px;
            margin-right: 44px;
        }
        .header_clarityLogo__zYzCf::before {
            height: 18px;
            width: 1px;
            background-color: black;
            content: "";
            display: block;
            position: absolute;
            left: -18px;
            top: 5px;
        }
        .flexSpacer {
            flex: 1 0 auto;
        }
        .tabs {
            position: absolute;
        }
        .root-178 {
            font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            font-weight: 400;
            box-shadow: none;
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            position: relative;
            color: rgb(0, 120, 212);
            white-space: nowrap;
        }
        .tabs button {
            text-transform: capitalize;
        }
        .tabs button {
            padding: 0;
        }
        .ms-Button {
            border-radius: 4px;
            padding: 0 12px;
        }
        button {
            margin: 0;
            color: inherit;
            font-size: inherit;
            font-family: inherit;
            line-height: inherit;
        }
        .linkIsSelected-188 {
            outline: transparent;
            position: relative;
            font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            font-weight: 600;
            border: 0px;
            box-sizing: border-box;
            cursor: pointer;
            display: inline-block;
            text-decoration: none;
            text-align: center;
            height: 44px;
            color: rgb(50, 49, 48);
            background-color: transparent;
            line-height: 44px;
            margin-right: 8px;
            user-select: none;
        }
        .ms-Pivot-link.is-selected::before {
            background-color: #9692FF;
        }
        .linkIsSelected-188::before {
            background-color: rgb(0, 120, 212);
            bottom: 0px;
            content: "";
            height: 2px;
            left: 8px;
            position: absolute;
            right: 8px;
            transition: left 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9), right 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9);
        }
        .flexContainer-189 {
            display: flex;
            height: 100%;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: center;
        }
        .tabs .ms-Pivot-linkContent {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .linkContent-184 {
            flex: 0 1 100%;
        }
        .tabs .ms-Pivot-icon {
            line-height: 14px;
            margin: 0;
        }
        .linkContent-184>:first-child {
            margin-left: 0px;
        }
        .linkContent-184>* {
            margin-left: 0px;
        }
        .root-89 {
            display: inline-block;
        }
        svg:not(:root) {
            overflow: hidden;
        }
        .link-193 {
          outline: transparent;
          position: relative;
          font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          font-weight: 400;
          border: 0px;
          box-sizing: border-box;
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          text-align: center;
          height: 44px;
          color: rgb(50, 49, 48);
          background-color: transparent;
          line-height: 44px;
          margin-right: 8px;
          user-select: none;
      }
      .link-193::before {
          background-color: transparent;
          bottom: 0px;
          content: "";
          height: 2px;
          left: 8px;
          position: absolute;
          right: 8px;
          transition: left 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9), right 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9);
      }
      @media (prefers-color-scheme: dark) {
            :host {
                background: #0d1117;
                color: #f4f4f4;
            }
            .shared_flex__bW95Y {
                display: flex;
                left: 0;
                position: fixed;
                background: #0d1117;
                width: 100%;
            }
            .header_clarityLogo__zYzCf::before {
                height: 18px;
                width: 1px;
                background-color: #f4f4f4;
                content: "";
                display: block;
                position: absolute;
                left: -18px;
                top: 5px;
            }
        }
      </style>
      <div data-testid=pageHeader
    class="navHeader header_header__fIQUh shared_horizontalCenteredFlex__RU29j shared_horizontalFlex__3OY6i shared_flex__bW95Y"
    role=banner>
    <a href=https://www.ukmpenelitianunnes.com/ id=msLogo class="header_msLogo__PFnQS headerButton" tabindex=0>
        <picture><img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAHf1AAB39QG+gBuGAAAFjGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OSwgMjAyMi8wNi8xMy0xNzo0NjoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjUgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wMy0yMVQwOToxNzo1OSswNzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wMy0yMVQwOToxNzo1OSswNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjMtMDMtMjFUMDk6MTc6NTkrMDc6MDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA4Y2U0OTY3LTViMTYtMGM0My1iNDg5LTg0NjI3ODZhYjFjYiIgeG1wTU06RG9jdW1lbnRJRD0i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WRZXA78BfnPa//v3l+9/83uufP5Ln33N4z/8xpKmjnbm5eZgAp9IKfqURViLkSG+AWww9HFXswyNdvi04vBPm7W20oYFJNhM/LVRBiEiPAS+DiAyRE15ThL+6nv+7O/fft33f3gIlzbY8XuMEwCO6aJWlPXFsmywYljGOFv58bYTxwGM7serFvyZ5MVoYQksFLr6iITA+IpZra0PAT0THROFtw+99gYaMLYPkx2TL8hku9+4Kyp+kra279B46sMQlOJogLGX2g/8pGX5X24odK9Yv3fPvacoecZkEhD5P/7j97ypuHHdu5uWNzY3HOqjtLOf3tkLopr/+54nmt9783eb5yz+Te+erU9O6mFML3cCd172j5/6xYFrXnvZ41/74pvW3X7r3IX9isb6GvbmDN2+x5JDTczthX21RayoTBVVmxoatW3428PCoWIHGDIOxDkJEJWshghEPsWyuha6th943V1/+qeFG7/5v38FdB77bTscxx9OADimBVsqLzQDhdM9bREyttVXpv+RFmy1fP9HIQAmdS0WdKU4T7G3n0I5xG9qom7BvGLbL38x4XFNl45dV+gq0Zz999GrJTAHUJ1b3rVr3qJP4ssIopMmanoL8M/jbahvvpSevYeNEvn7n+S5Pesu44e3vfWa1obm/fsHeDrK61lvvOb51e/9wBfT551/3+7924/Hjn80d7ace/Fvrjr3/Ds33XDLK/b903+92dx13+yW1lqytWBFQFfaiyNFsBXzzuQFAPLw+zHWATV2ht5aEEphoyQMhJw/pzl3z4N3v+HRf/3EY82XX/7l+VdceQy36nAcnzgB4JgWwmJxmegvnxcYgZRx4h9TSTUrbPVQsEkX+DnCviOOkwIRasp9ecomwm+qpa51Tnqi/b0VE88M7Ov7Y9JqEXUNp9PfE9Hffq9B/OjNJbP+tQlO/gnwH1SxLExEffM4igNO6PmH//rA+XWZZdsOhnTNX9Oz+CNv//7SN9/4zeiB9Xcf7TleZCLg14svvf6381detG7XJ//ljQe+9D9X1fd1kZwLhwJBMkzEXvxHbEqMGvYPcwIc9R0ZU5OpYgHQxqCDDFFUImXLnDqnvu6ur335/VddfvlG4AF+d4EKDseLghMAjmlBF8tG5ks6YaUnTJybPS7najFUD/V7wRFx0ZiwUCAaKGAseLMaehKNDRsmvH6qugaM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"
                aria-label="UKMP Logo" height=48 alt="UKMP Logo" srcset sizes></picture>
    </a><a class="header_clarityLogo__zYzCf headerButton" tabindex=0
        href=https://departement.ukmpenelitianunnes.com /><span><ukmp-text text="Departement PH"></ukmp-text></span></a>
    <div class=flexSpacer></div>
    <div class=tabs>
        <div role=tablist class="ms-FocusZone css-187 ms-Pivot root-178"><button type=button role=tab aria-selected=true id=Pivot21-Tab0
                class="ms-Button ms-Button--action ms-Button--command ms-Pivot-link is-selected linkIsSelected-188"
                name=dashboard><span
                    class="ms-Button-flexContainer flexContainer-189" data-automationid=splitbuttonprimary><span
                        class="ms-Pivot-linkContent linkContent-184"><ukmp-text text="Home"></ukmp-text></span></span></button><button
                type=button role=tab aria-selected=false id=Pivot21-Tab1
                class="ms-Button ms-Button--action ms-Button--command ms-Pivot-link link-193" name=recordings><span
                    class="ms-Button-flexContainer flexContainer-189" data-automationid=splitbuttonprimary><span
                        class="ms-Pivot-linkContent linkContent-184"><ukmp-text text="
                                    Prestasi"
                            class="ms-Pivot-text text-185"></ukmp-text></span></span></button><button type=button
                role=tab aria-selected=false id=Pivot21-Tab2
                class="ms-Button ms-Button--action ms-Button--command ms-Pivot-link link-193" name=heatmaps><span
                    class="ms-Button-flexContainer flexContainer-189" data-automationid=splitbuttonprimary><span
                        class="ms-Pivot-linkContent linkContent-184"><ukmp-text text="Riset"
                            class="ms-Pivot-text text-185"></ukmp-text></span></span></button></div>
        <div role=tabpanel aria-hidden=false aria-labelledby=Pivot21-Tab0 class=itemContainer-179>
            <div data-clarity-id=dashboard></div>
        </div>
    </div>
    <div class=flexSpacer></div>
    <div class=header_identity__0AzRU data-clarity-mask=true id=signInIdentity><button type=button id=headerSignIn
            class="ms-Button ms-Button--default identityButton root-174"><span
                class="ms-Button-flexContainer flexContainer-162" data-automationid=splitbuttonprimary><span
                    class="ms-Button-textContainer textContainer-163"><span class="ms-Button-label label-175"
                        id=id__14>Sign
                        in</span></span></span></button><button type=button id=headerGetStarted
            class="ms-Button ms-Button--primary identityButton root-176"><span
                class="ms-Button-flexContainer flexContainer-162" data-automationid=splitbuttonprimary><span
                    class="ms-Button-textContainer textContainer-163"><span class="ms-Button-label label-175"
                        id=id__17>Sign up</span></span></span></button>
    </div>
</div>
    `;
    }
}

customElements.define('ukmp-header-content', UkmpHeaderContent);


class UKMPKartu extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
          background-color: var(--card-background-color);
          color: var(--card-text-color);
          border-radius: 10px;
          padding: 20px;
        }

        .card {
          background-color: #ffffff;
          color: #000000;
          border-radius: 25px;
          padding: 20px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
                      0px 6px 10px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          font-size: 28px;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 10px;
        }
        
        .card-body {
          font-size: 16px;
          margin-top: 0;
        }
        
        .card-link {
          color: var(--card-link-color);;
          font-weight: bold;
          text-decoration: none;
          animation: shake 1.5s;
        }
        
        .card:hover {
          animation: up-down 1s ease-in-out infinite;
        }
        
        @keyframes up-down {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
                
        @keyframes shake {
          0% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }        

        @media (prefers-color-scheme: dark) {
          .card-link {
            color: #ffff;
            font-weight: bold;
            text-decoration: none;
          }
          .card {
            background: #1A202C;
            color: #f4f4f4;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.1);
          }
          :host {
            z-index: 1;
            position: relative;  
          }
        }

      </style>

      <div class="card">
        <h3 class="card-header">[[title]]</h3>
        <p class="card-body">[[description]]</p>
        <a href="[[url]]" class="card-link">Lihat Selengkapnya</a>
      </div>
    `;
    }

    static get properties() {
        return {
            title: String,
            description: String,
            url: String,
            loading: {
                type: Boolean,
                value: true,
            }
        }
    }
}

customElements.define("ukmp-kartu", UKMPKartu);

class UKMPKartuWel extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
          background-color: var(--card-background-color);
          color: var(--card-text-color);
          border-radius: 10px;
          padding: 20px;
        }

        .card {
          background-color: #ffffff;
          color: #000000;
          border-radius: 25px;
          padding: 20px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
                      0px 6px 10px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          font-size: 28px;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 10px;
        }
        
        .card-body {
          font-size: 16px;
          margin-top: 0;
        }
        
        .card-link {
          color: var(--card-link-color);;
          font-weight: bold;
          text-decoration: none;
          animation: shake 1.5s;
        }
        
        image-ui-model {
            background-size: cover;
            width: 100%;
            aspect-ratio: 16 / 9;
            max-height: max(80vh, 380px);
            border-radius: var(--sl-border-radius-large);
            mask-image: linear-gradient(rgb(0, 0, 0) 60%, transparent 100%);
            z-index: -1;
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 35px;
        }
        
        @media (prefers-color-scheme: dark) {
          .card-link {
            color: #ffff;
            font-weight: bold;
            text-decoration: none;
          }
          .card {
            background: #1A202C;
            color: #f4f4f4;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.1);
          }
          .card-header {
            z-index: 1;
            position: relative;
          }
          .card-body {
            z-index: 1;
            position: relative;
          }
          image-ui-model {
            background-size: cover;
            width: 100%;
            aspect-ratio: 16 / 9;
            max-height: max(80vh, 380px);
            border-radius: var(--sl-border-radius-large);
            mask-image: linear-gradient(rgb(0, 0, 0) 60%, transparent 100%);
            z-index: 0;
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 35px;
          }
        }

      </style>

      <div class="card">
        <image-ui-model src="[[src]]" alt="[[alt]]" show-sinematik></image-ui-model>
        <h3 class="card-header">[[title]]</h3>
        <p class="card-body">[[description]]</p>
      </div>
    `;
    }

    static get properties() {
        return {
            title: String,
            description: String,
            loading: {
                type: Boolean,
                value: true,
            },
            src: {
                type: String,
                observer: '_srcChanged'
            },
            alt: {
                type: String,
                value: ''
            },
        }
    }
}

customElements.define("ukmp-kartu-welcome", UKMPKartuWel);

class ImageComponent extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
  
                #image {
                    width: 100%;
                    height: 100%;
                }
  
                :host([show-sinematik]) #image {
                    box-shadow: var(--image-shadow);
                }
            </style>
  
            <img id="image" src="[[src]]" alt="[[alt]]">
        `;
    }

    static get properties() {
        return {
            src: {
                type: String,
                observer: '_srcChanged'
            },
            alt: {
                type: String,
                value: ''
            },
            showSinematik: {
                type: Boolean,
                value: false,
                observer: '_showSinematikChanged'
            }
        };
    }

    _srcChanged(src) {
        if (src) {
            const imgElement = this.shadowRoot.querySelector('#image');

            const image = new Image();
            image.src = src;
            image.crossOrigin = "Anonymous";
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);

                const imageData = context.getImageData(0, 0, image.width, image.height).data;
                const numPixels = image.width * image.height;
                let totalR = 0;
                let totalG = 0;
                let totalB = 0;

                for (let i = 0; i < numPixels * 4; i += 4) {
                    totalR += imageData[i];
                    totalG += imageData[i + 1];
                    totalB += imageData[i + 2];
                }

                const avgR = Math.round(totalR / numPixels);
                const avgG = Math.round(totalG / numPixels);
                const avgB = Math.round(totalB / numPixels);

                const avgColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
                const boxShadowValue = `0 0 10px 10px ${avgColor}`;

                imgElement.style.setProperty('--image-shadow', boxShadowValue);
                imgElement.style.setProperty('--image-glow-color', `0 0 10px 10px ${avgColor}77`);
            };
        }
    }

    _showSinematikChanged(showSinematik) {
        if (showSinematik) {
            this.setAttribute('show-sinematik', '');
        } else {
            this.removeAttribute('show-sinematik');
        }
    }
}

customElements.define('image-ui-model', ImageComponent);

class KartuDep extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
          :host {
            --host-display: block;
            --host-margin: 20px;
            display: var(--host-display);
            margin: var(--host-margin);
            z-index: 1;
            position: relative;
          }
          
          .card-grid {
            --card-grid-display: grid;
            --card-grid-columns: repeat(3, 1fr);
            --card-grid-rows: repeat(2, 1fr);
            --card-grid-gap: 20px;
            display: var(--card-grid-display);
            grid-template-columns: var(--card-grid-columns);
            grid-template-rows: var(--card-grid-rows);
            grid-gap: var(--card-grid-gap);
          }      
        </style>
        <ukmp-header-card title="Departemen UKMP"></ukmp-header-card>
        <div class="card-grid">
          <ukmp-kartu title="HRD" description="HRD" url="./hrd" skeleton></ukmp-kartu>
          <ukmp-kartu title="DD" description="DD" url="./dd" skeleton></ukmp-kartu>
          <ukmp-kartu title="COMDEV" description="COMDEV" url="./cdv" skeleton></ukmp-kartu>
          <ukmp-kartu title="STD" description="STD" url="./std" skeleton></ukmp-kartu>
          <ukmp-kartu title="PRD" description="PRD" url="./prd" skeleton></ukmp-kartu>
          <ukmp-kartu title="RED" description="RED" url="./red" skeleton></ukmp-kartu>
          <ukmp-kartu title="KARYA" description="KARYA" url="./kr" skeleton></ukmp-kartu>
        </div>
      `;
    }
}

customElements.define('kartu-dep', KartuDep);

class UKMPKartuSor extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
          --card-height: 250px;
          --card-width: calc(var(--card-height) / 1.5);
          --card-header-color: #1A202C;
          --card-body-color: #1A202C;
          --card-link-color: #1A202C;
          --card-dark-background-color: #161b22;
          --card-dark-color: #f4f4f4;
          --card-header-color-black: #000000;
          --card-body-color-black: #000000;
          --card-link-color-black: #000000;
        }
            
        .card {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          width: var(--card-width);
          height: var(--card-height);
          background: var(--card-background-color, #ffffff);
          background-image: var(--card-background-image, url(""));
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          color: var(--card-color, #000000);
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
                     0px 6px 10px rgba(0, 0, 0, 0.1);
        }
        
        .card:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: inherit;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          border-radius: 17px;
          z-index: -1;
        }
        .oc {
          backdrop-filter: blur(13px);
          border-radius: 17px 17px 10px 10px;
          width: 187px;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: flex-end;
          align-content: center;
          bottom: 0;
          position: absolute;
          left: 0;
          padding: 10px;
          background: rgb(255 255 255 / 50%);
        }
  
        @media (prefers-color-scheme: dark) {
          
          .card {
            --card-color: var(--card-dark-color, #f4f4f4);
            --card-background-color: var(--card-dark-background-color, #161b22);
            --card-background-image: var(--card-dark-background-image, url("") 0.1);
          }
        }
  
        .card:hover {
          transform: translateY(-5px);
        }
        
        .card-header {
          font-size: 18px;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 10px;
          color: var(--card-header-color, #1A202C);
        }
        
        .card-body {
          font-size: 13px;
          margin-top: 0;
          color: var(--card-body-color, #1A202C);
        }
        
        .card-link {
          color: var(--card-link-color, #BFBFBF);
          font-weight: bold;
          text-decoration: none;
          color: var(--card-link-color, #1A202C);
          mask-image: linear-gradient(rgb(0, 0, 0) 60%, transparent 100%);
        }
        
        .card-link:hover {
          animation: shake 0.5s;
        }
        
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
       
      </style>
      <div class="card" style$="background-image:url([[backgroundImage]]);"">
        <div class="oc">
            <h3 class="card-header" style$="color: [[colorH]];">[[title]]</h3>
            <p class="card-body" style$="color: [[colorP]];">[[description]]</p>
            <a href="[[url]]" class="card-link" style$="color: [[colorA]];">Lihat Selengkapnya</a>
        </div>
      </div>
    `;
    }

    static get properties() {
        return {
            title: String,
            description: String,
            url: String,
            backgroundImage: {
                type: String,
                value: ""
            },
            colorH: {
                type: String,
                value: "default"
            },
            colorA: {
                type: String,
                value: "default"
            },
            colorP: {
                type: String,
                value: "default"
            }
        }
    }
}

customElements.define("ukmp-kartu-story", UKMPKartuSor);

class UKMPKartuPro extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
          --card-height: 350px;
          --card-width: calc(var(--card-height) / 1.2);
          --card-header-color: #1A202C;
          --card-body-color: #1A202C;
          --card-link-color: #1A202C;
          --card-dark-background-color: #161b22;
          --card-dark-color: #f4f4f4;
          --card-header-color-black: #000000;
          --card-body-color-black: #000000;
          --card-link-color-black: #000000;
        }
            
        .card {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          width: var(--card-width);
          height: var(--card-height);
          background: var(--card-background-color, #ffffff);
          background-image: var(--card-background-image, url(""));
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          color: var(--card-color, #000000);
          border-radius: 10px;
          padding: 20px;
          transition: height 0.3s ease;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
                     0px 6px 10px rgba(0, 0, 0, 0.1);
        }
        
        .card:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: inherit;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          border-radius: 17px;
          z-index: -1;
        }
        
        .oc {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          color: white;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
        }
  
        @media (prefers-color-scheme: dark) {
          
          .card {
            --card-color: var(--card-dark-color, #f4f4f4);
            --card-background-color: var(--card-dark-background-color, #161b22);
            --card-background-image: var(--card-dark-background-image, url("") 0.1);
          }
        }
  
        .card:hover {
          transform: translateY(-5px);
          height: 300px;
        }
        
        .card-header {
          font-size: 18px;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 10px;
          color: var(--card-header-color, #1A202C);
        }
        
        .card-body {
          font-size: 13px;
          margin-top: 0;
          color: var(--card-body-color, #1A202C);
        }
        
        .card-link {
          color: var(--card-link-color, #BFBFBF);
          font-weight: bold;
          text-decoration: none;
          color: var(--card-link-color, #1A202C);
          mask-image: linear-gradient(rgb(0, 0, 0) 60%, transparent 100%);
        }
        
        .card-link:hover {
          animation: shake 0.5s;
        }
        
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
       
      </style>
      <div class="card" style$="background-image:url([[backgroundImage]]);"">
        <div class="oc">
            <h3 class="card-header" style$="color: [[colorH]];">[[title]]</h3>
            <p class="card-body" style$="color: [[colorP]];">[[description]]</p>
            <a href="[[url]]" class="card-link" style$="color: [[colorA]];">Lihat Selengkapnya</a>
        </div>
      </div>
    `;
    }

    static get properties() {
        return {
            title: String,
            description: String,
            url: String,
            backgroundImage: {
                type: String,
                value: ""
            },
            colorH: {
                type: String,
                value: "default"
            },
            colorA: {
                type: String,
                value: "default"
            },
            colorP: {
                type: String,
                value: "default"
            }
        }
    }
}

customElements.define("ukmp-kartu-progker", UKMPKartuPro);

class kartuPro extends PolymerElement {
    constructor() {
        super();
        // Menambahkan event listener untuk resize event
        window.addEventListener('resize', () => this.updateSlottedMaxWidth());
    }
    static get template() {
        return html`
      <style>
          :host {
            display: block;
            margin: 20px;
            padding: 20px;
          }
          .card-grid {
            display: flex;
            grid-gap: 10px;
            justify-content: center;
            align-items: center;
            justify-items: stretch;
            width: 100%;
            max-width: calc(var(--slotted-max-width, 100%) + 120px);
          }
          .left-column {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
          }
          .right-column {
            display: flex;
            flex-diraction: row;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 45px;
          }
          .card-description {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            width: calc(var(--slotted-max-width, 100%) / 25px);
            position: relative;
            left: 50px;
          }
  
          @media only screen and (max-width: 320px) {
            .left-column {
              display:none;
            }
    
            .card-grid {
              display: grid;
              grid-template-columns: repeat(2, 43%);
              grid-gap: 10px;
              justify-content: center;
              align-items: center;
              justify-items: stretch;
              width: max-content;
            }
            .right-column {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 15%;
            }
  
          }
    
          /* CSS untuk perangkat seluler dengan layar sedang */
          @media only screen and (min-width: 321px) and (max-width: 375px) {
            .left-column {
              display:none;
            }
    
            .card-grid {
              display: grid;
              grid-template-columns: repeat(2, 43%);
              grid-gap: 10px;
              justify-content: center;
              align-items: center;
              justify-items: stretch;
              width: max-content;
            }
            .right-column {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 15%;
            }
          }
    
          /* CSS untuk perangkat seluler dengan layar besar */
          @media only screen and (min-width: 376px) and (max-width: 414px) {
            .left-column {
              display:none;
            }
    
            .card-grid {
              display: grid;
              grid-template-columns: repeat(2, 43%);
              grid-gap: 10px;
              justify-content: center;
              align-items: center;
              justify-items: stretch;
              width: max-content;
            }
            .right-column {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 15%;
            }
          }
          @media only screen and (min-width: 414px) and (max-width: 768px) {
            .left-column {
              display:none;
            }
    
            .card-grid {
              display: grid;
              grid-template-columns: repeat(2, 43%);
              grid-gap: 10px;
              justify-content: center;
              align-items: center;
              justify-items: stretch;
              width: max-content;
            }
            .right-column {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 15%;
            }
          }
        </style>  
        <ukmp-header-card title="Progam Kerja Departement" class="header" url="./pph"></ukmp-header-card>
        <div class="card-grid">
          <div class="right-column">
            <expanding-card title="Open Recruiment" subtitle="Muhammad Hasan Mustofa" description="Acara untuk meregenerasi kepengurusan baru UKMP 2024" image="http://ukmpenelitianunnes.com/content/image1.png" background-color="#1E90FF"></expanding-card>
            <expanding-card title="Pelantikan dan Rapat Kerja" subtitle="Amanda Nur Azizah" description="Menetapkan pengurus, memantau, dan melakukan sinkronisasi program kerja UKMP 2024" image="http://ukmpenelitianunnes.com/content/image2.png" background-color="#FFFF00"></expanding-card>
            <expanding-card title="Pelatihan Kesekretariatan" subtitle="Hanik Rahma Shintya, Intan Shabrina Budiani" description="Melakukan koordinasi kesekertariatan dan manajemen administrasi" image="http://ukmpenelitianunnes.com/content/image3.png" background-color="#FFFF00">
            </expanding-card>
          </div>
        </div>  
      `;
    }
    connectedCallback() {
        super.connectedCallback();
    }

    updateSlottedMaxWidth() {
        const viewportWidth = window.innerWidth;
        const maxWidth = Math.min(viewportWidth * 0.8, 1200) + 'px'; // Contoh, 80% dari viewport atau max 1200px

        // Terapkan nilai max-width ke ::slotted menggunakan variabel CSS
        this.style.setProperty('--slotted-max-width', maxWidth);
    }
}

customElements.define("kartu-progker", kartuPro);

class ExpandingCard extends PolymerElement {
    static get properties() {
        return {
            title: String,
            subtitle: String,
            description: String,
            image: String,
            backgroundColor: String
        };
    }

    static get template() {
        return html`
        <style>
          :host {
            display: inline-block;
            margin: 10px;
          }
          .card {
            width: 300px;
            height: 200px;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            transition: all 0.3s ease;
            cursor: pointer;
            color: var(--text-color, white);
          }
          .card:hover {
            height: 300px;
          }
          .card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s ease;
          }
          .card:hover .card-image {
            height: 60%;
          }
          .card-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            background: var(--card-bg-color, rgba(0,0,0,0.7));
            border-radius: 50% 50% 0 0;
            transition: all 0.3s ease;
            transform: translateY(50%);
          }
          .card:hover .card-content {
            border-radius: 0;
            transform: translateY(0);
          }
          .card-title {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
            transition: all 0.3s ease;
            opacity: 0.7;
            -webkit-line-clamp: 1; /* Tampilkan hanya 1 baris dengan ellipsis */
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .card:hover .card-title {
            opacity: 1;
          }
          .card-subtitle {
            margin: 5px 0 0;
            font-size: 18px;
            opacity: 0;
            transition: all 0.3s ease;
          }
          .card:hover .card-subtitle {
            opacity: 0.8;
          }
          .card-description {
            margin: 10px 0 0;
            font-size: 14px;
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
            -webkit-line-clamp: 1; /* Tampilkan hanya 1 baris dengan ellipsis */
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .card:hover .card-description {
            opacity: 1;
            max-height: 100px;
          }

            .card:hover .card-title,
            .card:hover .card-description {
            -webkit-line-clamp: unset; /* Hapus ellipsis saat hover */
            white-space: normal; /* Biarkan teks muncul dalam banyak baris */
            text-overflow: unset;
            overflow: visible; /* Tampilkan seluruh teks */
            }

        </style>
        
        <div class="card">
          <img class="card-image" src="[[image]]" alt="[[title]]">
          <div class="card-content">
            <h3 class="card-title">[[title]]</h3>
            <p class="card-subtitle">[[subtitle]]</p>
            <p class="card-description">[[description]]</p>
          </div>
        </div>
      `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.extractDominantColor();
    }

    extractDominantColor() {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Pastikan gambar dapat diakses
        img.src = this.image;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            // Atur ukuran canvas sesuai gambar
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            // Ambil data piksel gambar
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            let r = 0, g = 0, b = 0;
            for (let i = 0; i < pixels.length; i += 4) {
                r += pixels[i];     // Red
                g += pixels[i + 1]; // Green
                b += pixels[i + 2]; // Blue
            }

            const pixelCount = pixels.length / 4;
            r = Math.floor(r / pixelCount);
            g = Math.floor(g / pixelCount);
            b = Math.floor(b / pixelCount);

            const dominantColor = `rgb(${r},${g},${b})`;
            this.backgroundColor = dominantColor;
            this.style.setProperty('--card-bg-color', dominantColor);

            // Tentukan apakah teks harus terang atau gelap
            const brightness = Math.sqrt(
                0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)
            );

            const textColor = brightness > 128 ? 'black' : 'white';
            this.style.setProperty('--text-color', textColor);
        };
    }
}

customElements.define('expanding-card', ExpandingCard);

class kartuFung extends PolymerElement {
    constructor() {
        super();
        // Menambahkan event listener untuk resize event
        window.addEventListener('resize', () => this.updateSlottedMaxWidth());
    }
    static get template() {
        return html`
      <style>
          :host {
            display: block;
            margin: 20px;
            background: rgb(240 248 255 / 30%);
            padding: 20px;
            backdrop-filter: blur(30px);
            border-radius: 25px;
          }
          .card-grid {
            display: flex;
            grid-gap: 10px;
            justify-content: center;
            align-items: center;
            justify-items: stretch;
            width: max-content;
            max-width: calc(var(--slotted-max-width, 100%) + 120px);
          }
          .left-column {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
          }
          .right-column {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 45px;
          }
          .card-description {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #0d1117;
            width: calc(var(--slotted-max-width, 100%) / 25px);
            position: relative;
            left: 50px;
          }
  
          @media only screen and (max-width: 320px) {
            .left-column {
              display:none;
            }
    
            .card-grid {
              display: grid;
              grid-template-columns: repeat(2, 43%);
              grid-gap: 10px;
              justify-content: center;
              align-items: center;
              justify-items: stretch;
              width: max-content;
            }
            .right-column {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 15%;
            }
  
          }
          @media (prefers-color-scheme: dark) {
            .card-description{
                color: #fff;
            }
          }
    
          /* CSS untuk perangkat seluler dengan layar sedang */
          @media only screen and (min-width: 321px) and (max-width: 375px) {
            .left-column {
              display:none;
            }
    
            .card-grid {
              display: grid;
              grid-template-columns: repeat(2, 43%);
              grid-gap: 10px;
              justify-content: center;
              align-items: center;
              justify-items: stretch;
              width: max-content;
            }
            .right-column {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 15%;
            }
          }
    
          /* CSS untuk perangkat seluler dengan layar besar */
          @media only screen and (min-width: 376px) and (max-width: 414px) {
            .left-column {
              display:none;
            }
    
            .card-grid {
              display: grid;
              grid-template-columns: repeat(2, 43%);
              grid-gap: 10px;
              justify-content: center;
              align-items: center;
              justify-items: stretch;
              width: max-content;
            }
            .right-column {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 15%;
            }
          }
          @media only screen and (min-width: 414px) and (max-width: 768px) {
            .left-column {
              display:none;
            }
    
            .card-grid {
              display: grid;
              grid-template-columns: repeat(2, 43%);
              grid-gap: 10px;
              justify-content: center;
              align-items: center;
              justify-items: stretch;
              width: max-content;
            }
            .right-column {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 15%;
            }
          }
        </style>  
        <ukmp-header-card title="Fungsionaris UKMP" url="./fungsionaris" class="header"></ukmp-header-card>
        <div class="card-grid">
          <div class="left-column">
            <div class="card-description">Fungsionaris UKMP</div>
          </div>
          <div class="right-column">
            <ukmp-kartu-story tag="Muhammad Hasan Mustofa" title="Muhammad Hasan Mustofa" color-H="black" color-A="black" color-P="black" description="Ketua Umum UKMP" url="" background-Image="http://ukmpenelitianunnes.com/photo/PH_Kadep_bebas_Hasan.jpg"></ukmp-kartu-story>
            <ukmp-kartu-story tag="ukmp-kartu-story" title="Amanda Nur Azizah" description="Wakil Ketua" url="" background-Image="http://ukmpenelitianunnes.com/photo/PH_Wakil_Bebas_Amanda.jpg"></ukmp-kartu-story>
            <ukmp-kartu-story tag="ukmp-kartu-story" title="Hanik Rahma Shintya" description="Sekretaris 1" url="" background-Image="http://ukmpenelitianunnes.com/photo/PH_Sekretaris_Bebas_Hanik.jpg"></ukmp-kartu-story>
          </div>
        </div>  
      `;
    }
    connectedCallback() {
        super.connectedCallback();
    }

    updateSlottedMaxWidth() {
        const viewportWidth = window.innerWidth;
        const maxWidth = Math.min(viewportWidth * 0.8, 1200) + 'px'; // Contoh, 80% dari viewport atau max 1200px

        // Terapkan nilai max-width ke ::slotted menggunakan variabel CSS
        this.style.setProperty('--slotted-max-width', maxWidth);
    }
}

customElements.define("kartu-fungsio", kartuFung);


class UkmpHeaderCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'url'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || '';
        const url = this.getAttribute('url');

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            --header-display: flex;
            --header-justify-content: space-between;
            --header-align-items: center;
            --header-margin-bottom: 20px;
          
            --left-header-font-weight: bold;
            --left-header-font-size: 24px;
          
            --right-header-a-font-size: 16px;
            --right-header-a-text-decoration: none;
            --right-header-a-color: #0d1117;
          }
          
          .header {
            display: var(--header-display);
            justify-content: var(--header-justify-content);
            align-items: var(--header-align-items);
            margin-bottom: var(--header-margin-bottom);
          }
          
          .left-header {
            font-weight: var(--left-header-font-weight);
            font-size: var(--left-header-font-size);
          }
          
          .right-header a {
            font-size: var(--right-header-a-font-size);
            text-decoration: var(--right-header-a-text-decoration);
            color: var(--right-header-a-color);
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="${title}"></ukmp-text>
          ${url ? `
            <div class="right-header">
              <ukmp-text href="${url}" link-text="Lihat Selengkapnya"></ukmp-text>
            </div>
          ` : ''}
        </div>
      `;
    }
}

customElements.define('ukmp-header-card', UkmpHeaderCard);


class kartuWel extends PolymerElement {
    static get template() {
        return html`
      <style>
      :host {
        --host-display: block;
        --host-margin: 20px;
        display: var(--host-display);
        margin: var(--host-margin);
      }      
    </style>
    <ukmp-kartu-welcome src="http://ukmpenelitianunnes.com/logo/heroph.jpg" alt="hero" title="Departement PH" description="Bidang Koordinasi dan Administrasi" skeleton></ukmp-header-welcome>
  `
    }
}
customElements.define("kartu-welcome", kartuWel);

/*
class ModalUKMP extends HTMLElement {

  connectedCallback() {
    const menu = this.querySelector(".menu");
    const appMenuContainer = this.querySelector(".app-menu-container");
    const menuBackground = this.querySelector(".menu-background");
    let isSwipeInProgress = false;
    let startY = 0;
    let startX = 0;
    let deltaX = 0;
    let deltaY = 0;
    let isMenuVisible = false;
    let isAnimating = false;
    let menuWidth = 0;
    let startXPos = 0;
    let startYPos = 0;
    let opacity = "";
    let transitionEndEventName =
      "transitionend" ||
      "webkitTransitionEnd" ||
      "oTransitionEnd" ||
      "MSTransitionEnd";

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.pageX;
      startY = touch.pageY;

      if (this.querySelector(".bottom").scrollTop <= 0) {
        isSwipeInProgress = true;
        isAnimating = true;
        const isMenuVisibleNow = !!document.querySelector(".menu.menu--visible");
        menu.classList.add("no-transition");
        appMenuContainer.classList.add("no-transition");
        menuWidth = document.querySelector(".app-menu").offsetWidth;
        startXPos = startX;
        startYPos = startY;
        deltaX = 0;
        deltaY = 0;
        opacity = "";
        isMenuVisible = isMenuVisibleNow;
        menu.classList.add("menu--background-visible");
      }
    };

    const onTouchMove = (e) => {
      if (!isSwipeInProgress) {
        return;
      }

      const touch = e.touches[0];
      const curX = touch.pageX;
      const curY = touch.pageY;
      const absDeltaX = Math.abs(curX - startX);
      const absDeltaY = Math.abs(curY - startY);

      if (!isAnimating) {
        if (absDeltaX > absDeltaY) {
          isAnimating = true;
          requestAnimationFrame(animateSwipe);
        } else {
          isSwipeInProgress = false;
        }
      }

      if (!isSwipeInProgress) {
        return;
      }

      deltaX = curX - startXPos;
      deltaY = curY - startYPos;

      if (isMenuVisible) {
        if (deltaX < 0) {
          deltaX = 0;
        } else if (deltaX > menuWidth) {
          deltaX = menuWidth;
        }
      } else {
        if (deltaX > 0) {
          deltaX = 0;
        } else if (deltaX < -menuWidth) {
          deltaX = -menuWidth;
        }
      }

      if (absDeltaX > absDeltaY) {
        e.preventDefault();
        menu.classList.add("no-transition");
        menuBackground.classList.add("no-transition");
        const progress = Math.abs(deltaX) / menuWidth;
        const opacityVal = 0.5 * (1 - progress);
        opacity = opacityVal.toFixed(2);

        if (deltaX < 0 && deltaX > -menuWidth) {
          e.stopPropagation();
        }
      }
    };

    const onTouchEnd = (e) => {
      if (!isSwipeInProgress) {
        return;
      }
    
      isSwipeInProgress = false;
      const duration = new Date().getTime() - touchStartTime;
      const speed = deltaX / duration;
      isAnimating = true;
      const threshold = 0.3;
    
      if (deltaX === 0) {
        if (isMenuVisible) {
          closeMenu();
        } else {
          openMenu();
        }
      } else if (deltaX < -threshold || (deltaX < 0 && speed <= -0.5)) {
        // swipe to the left
        openMenu();
      } else {
        // swipe to the right
        closeMenu();
      }
    };
    
    const openMenu = () => {
      isAnimating = true;
      menu.style.transform = 'translateX(0)';
      isMenuVisible = true;
      requestAnimationFrame(() => {
        isAnimating = false;
      });
    };
    
    const closeMenu = () => {
      isAnimating = true;
      menu.style.transform = 'translateX(-100%)';
      isMenuVisible = false;
      requestAnimationFrame(() => {
        isAnimating = false;
      });
    };
    
    const onTransitionEnd = () => {
      if (!isAnimating) {
        return;
      }
    
      isAnimating = false;
    };
  }    

}
*/

class UkmpText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['text', 'href', 'link-text'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const text = this.getAttribute('text');
        const href = this.getAttribute('href');
        const linkText = this.getAttribute('link-text');

        this.shadowRoot.innerHTML = `
        <style>
          .ukmp-text {
            font-size: 16px;
            line-height: 1.5;
            --ukmp-text-color: black;
            color: var(--ukmp-text-color);
            text-decoration: none;
          }
          
          .ukmp-text:hover {
            animation: shake 0.5s;
          }
          
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
          
          @media (prefers-color-scheme: dark) {
            .ukmp-text {
              --ukmp-text-color-dark: white;
              color: var(--ukmp-text-color-dark);
            }
          }
        </style>
        ${text ? `<span class="ukmp-text">${text}</span>` : ''}
        ${href && linkText ? `<a href="${href}" class="ukmp-text" aria-label="Alamat URL">${linkText}</a>` : ''}
      `;
    }
}

customElements.define('ukmp-text', UkmpText);

class UkmpLoad extends PolymerElement {
    static get template() {
        return html`
      <style>
      html, body {
        overflow: hidden;
      }
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url('../logo/ukmp-logo-512x512.png');
        background-repeat: no-repeat;
        background-position: center;
        background-color: #fff;
        z-index: 9999;
        overflow: hidden;
      }
      @media (prefers-color-scheme: dark) {
        :host {
          background-color: #161b22;
          background-image: url('../logo/ukmp-logo-512x512-white.png');
          color: #f4f4f4;
          overflow: hidden;
        }
      }         
      </style>
      <slot></slot>
    `
    }
}
customElements.define("ukmp-load", UkmpLoad);