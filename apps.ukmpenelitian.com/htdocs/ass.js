import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import './riset/jspdf.umd.js';

const ukmpApp = document.createElement("ukmp-app");
document.body.appendChild(ukmpApp);
const title = "UKM Penelitian Apps";
document.title = title;
for (var scriptName = "script-" + Math.random().toString(36).substr(2, 5), nonce = Math.random().toString(36).slice(2), styles = document.getElementsByTagName("script"), i = 0; i < styles.length; i++) styles[i].setAttribute("nonce", nonce);
for (var scripts = document.getElementsByTagName("script"), i = 0; i < scripts.length; i++) scripts[i].setAttribute("nonce", nonce);
var newScript = document.createElement("script");
newScript.setAttribute("type", "text/javascript"), newScript.setAttribute("nonce", nonce), newScript.setAttribute("id", scriptName);
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

class UkmpApp extends PolymerElement {
    constructor() {
        super();
        window.addEventListener("load", () => {
            const loadElement = this.shadowRoot.querySelector("ukmp-load");
            if (loadElement) {  // Check if the element exists
                loadElement.parentNode.removeChild(loadElement);
            }
            this.style.overflow = "hidden"; // tambahkan baris ini
        });
    }

    static get template() {
        return html`
        <style>
        .splash-screen {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: #ffffff;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .splash-screen img {
            max-width: 100%;
            max-height: 100%;
        }

        .splash-screen img:first-child {
            margin-right: 20px;
            /* Atur jarak antara logo 1 dan logo 2 */
        }

        .splash-screen img:nth-child(1) {
            /* Styling untuk Logo 1 */
            width: 200px;
            /* Contoh ukuran */
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .splash-screen img:nth-child(2) {
            /* Styling untuk Logo 2 */
            width: 100px;
            /* Contoh ukuran */
            position: absolute;
            bottom: 2%;
            left: 50%;
            transform: translateX(-50%);
        }

        .hidden {
            display: none;
        }

        @media (prefers-color-scheme: dark) {
            .splash-screen {
                background-color: black;
            }
        }
        </style>
        <div class$="{{splashApp}} splash-screen">
            <img src="../logo/navavikara.png" alt="Logo 1">
            <img class="ukmp-logo" src="../logo/ukmp-logo-144x144.png" alt="Logo 2">
        </div> 
        <navavikara-app id="homeApp" class$="{{ukmpAppClass}}"></navavikara-app>
        `;
    }

    static get properties() {
        return {
            ukmpAppClass: {
                type: String,
                value: "hidden"
            },
            splashApp: {
                type: String,
                value: ""
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("load", () => {
            setTimeout(() => {
                this.showHome();
            }, 5000);
        });

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';

            // Ubah src image-component cloud menjadi path gambar tema gelap
            const cloudImageComponent = this.shadowRoot.querySelector('.ukmp-logo');
            if (cloudImageComponent) {
                cloudImageComponent.setAttribute('src', '/../../logo/ukmp-logo-512x512-white.png');
            }
        }
    }

    showHome() {
        this.ukmpAppClass = "";
        this.splashApp = "hidden";
    }
}

customElements.define("ukmp-app", UkmpApp);

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
            image.crossOrigin = 'anonymous';
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
                const boxShadowValue = `0 0 200px ${avgColor}`;

                imgElement.style.setProperty('--image-shadow', boxShadowValue);
                imgElement.style.setProperty('--image-glow-color', `${avgColor}77`);
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

customElements.define('image-component', ImageComponent);

class UkmpText extends HTMLElement {
    static get observedAttributes() {
        return ['text', 'href', 'link-text'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
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
          }
          @media (prefers-color-scheme: dark) {
            a {
                color: #f4f4f4 !important
            }
            .ukmp-text {
                color: #f4f4f4 !important;
            }
        </style>
        <span class="ukmp-text">${text}</span>
      `;

        if (href && linkText) {
            const link = document.createElement('a');
            link.href = href;
            link.style.color = 'black';
            link.style.textDecoration = 'none';
            link.ariaLabel = 'Selengkapnya';
            link.textContent = linkText;

            this.shadowRoot.appendChild(link);
        }
    }
}

customElements.define('ukmp-text', UkmpText);

/*
// Define the registration page element
class RegistrationPage extends PolymerElement {
    static get template() {
        return html`
        <style>
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .input {
            margin-bottom: 16px;
          }
          .button {
            margin-top: 16px;
          }
          .link {
            margin-top: 8px;
            text-align: center;
          }
        </style>
        <div class="container">
          <h2>Sign Up</h2>
          <div class="input">
            <label>Full Name:</label>
            <input id="fullNameInput" type="text">
          </div>
          <div class="input">
            <label>Username:</label>
            <input id="usernameInput" type="text">
          </div>
          <div class="input">
            <label>Password:</label>
            <input id="passwordInput" type="password">
          </div>
          <div class="input">
            <label>Department:</label>
            <input id="departmentInput" type="text">
          </div>
          <div class="input">
            <label>Position:</label>
            <input id="positionInput" type="text">
          </div>
          <button class="button" on-click="signup">Sign Up</button>
          <div class="link">
            <a href="/apps/login/login.html">Already have an account? Log in</a>
          </div>
        </div>
      `;
    }

    signup() {
        const fullName = this.$.fullNameInput.value;
        const username = this.$.usernameInput.value;
        const password = this.$.passwordInput.value;
        const department = this.$.departmentInput.value;
        const position = this.$.positionInput.value;

        // Perform validation (e.g., check if username is already taken)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.username === username);

        if (existingUser) {
            alert('Username already exists');
        } else {
            // Store user information in Web Storage
            const newUser = {
                fullName: fullName,
                username: username,
                password: password,
                department: department,
                position: position
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration successful. Please log in.');

            // Redirect to login page
            window.location.href = '/apps/login/login.html';
        }
    }
}

// Register the registration page element
customElements.define('registration-page', RegistrationPage);

// Define the login page element
class LoginPage extends PolymerElement {
    static get template() {
        return html`
        <style>
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .input {
            margin-bottom: 16px;
          }
          .button {
            margin-top: 16px;
          }
          .link {
            margin-top: 8px;
            text-align: center;
          }
        </style>
        <div class="container">
          <h2>Login</h2>
          <div class="input">
            <label>Username:</label>
            <input id="usernameInput" type="text">
          </div>
          <div class="input">
            <label>Password:</label>
            <input id="passwordInput" type="password">
          </div>
          <button class="button" on-click="login">Login</button>
          <div class="link">
            <a href="/apps/reg.html">Sign up</a>
          </div>
        </div>
      `;
    }

    login() {
        const username = this.$.usernameInput.value;
        const password = this.$.passwordInput.value;

        // Authenticate user (replace with your own authentication logic)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Store user information in Web Storage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);

            // Redirect to main page
            window.location.href = '/index.html';
        } else {
            alert('Invalid username or password');
        }
    }
}

// Register the login page element
customElements.define('login-page', LoginPage);

// Define the main page element
class MainPage extends PolymerElement {
    static get template() {
        return html`
        <style>
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: black;
          }
          .button {
            margin-top: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            text-align: center;
            margin-right: 10px;
            padding: 10px;
            border-radius: 20px;
            text-decoration: none;
            min-width: max-content;
            margin-top: 5%;
            background-color: #444;
            color: #f1f1f1;
          }
          @media (prefers-color-scheme: dark) {
            .button {
                background-color: #f1f1f1;
                color: #444;
            }
            .container {
                color: #ccc;
            }
          }
        </style>
        <div class="container">
          <h2>Welcome, [[username]]!</h2>
          <p>Department: [[department]]</p>
          <button class="button" on-click="logout">Logout</button>
        </div>
      `;
    }

    static get properties() {
        return {
            username: {
                type: String,
                value: ''
            },
            department: {
                type: String,
                value: ''
            },
            pdfUrl: {
                type: String,
                value: ''
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();

        // Check if user is logged in
        const loggedIn = localStorage.getItem('loggedIn');
        const username = localStorage.getItem('username');

        if (!loggedIn || !username) {
            // Redirect to login page if not logged in
            window.location.href = '/apps/login/login.html';
        } else {
            this.username = username;

            // Retrieve user data from Web Storage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username);

            if (user) {
                this.department = user.department;
            }
        }
    }

    logout() {
        // Clear user information from Web Storage
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');

        // Redirect to login page
        window.location.href = '/apps/login/login.html';
    }
}

// Register the main page element
customElements.define('main-page', MainPage);
*/
class HomeApp extends PolymerElement {
    static get template() {
        return html`
            <style>
            navavikara-app-now {
                width: 100%;
                height: 100%
            }
            navavikara-app-now navavikara-header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: #212121fa;
                background-color: rgb(248 248 248 / 50%);
                color: black;
                transition: transform 0.3s ease-in-out;
                backdrop-filter: blur(10px);
            }
            navavikara-app-now navavikara-tasksbar {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                height: 60px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                border: #212121fa;
                background-color: #f8f8f8;
                color: black;
                transition: transform 0.3s ease-in-out;
            }

            navavikara-app-now navavikara-tasksbar navavikara-taskbar-home {
                width: 40px;
            }

            navavikara-app-now navavikara-tasksbar navavikara-taskbar-apps {
                width: 40px;
            }

            navavikara-app-now navavikara-tasksbar navavikara-taskbar-apps button {
                background-color: transparent;
                border: none;
            }

            navavikara-app-now navavikara-header .logo {
                position: absolute;
                left: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            navavikara-app-now navavikara-header .logo img {
                width: 50px;
            }
            
            .hidden: {
                display: none;
            }

            .Home-text {
                position: fixed;
                top: 10%;
                z-index:1;
                left: 5%;
                font-size: 1.5em;
                margin-block-start: 0.83em;
                margin-block-end: 0.83em;
                margin-inline-start: 0px;
                margin-inline-end: 0px;
                font-weight: bold;
            }
            .site-header {
                position: fixed;
                top: 40px;
                left: 0;
                right: 0;
                z-index: 9998;
    
            }
    
            .chips-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                justify-content: space-between;
                width: 100%;
                max-width: 800px;
                margin: 0 auto;
            }
    
            .chips-nav button {
                background-color: transparent;
                border: none;
                cursor: pointer;
            }
    
            .chips-nav__prev {
                color: #1c1c1c;
            }
    
            .chips-nav__next {
                color: #1c1c1c;
            }
    
            .chips-wrapper {
                display: flex;
                overflow-x: auto;
                scrollbar-width: none;
                /* untuk menghilangkan scrollbar pada beberapa browser */
                -ms-overflow-style: none;
                /* untuk menghilangkan scrollbar pada beberapa browser */
            }
    
            .chips-wrapper::-webkit-scrollbar {
                display: none;
                /* untuk menghilangkan scrollbar pada beberapa browser */
            }
            .chip {
                background-color: #f1f1f1;
                color: #444;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                text-align: center;
                margin-right: 10px;
                padding: 10px;
                border-radius: 20px;
                text-decoration: none;
                min-width: max-content;
                margin-top: 5%;
            }

            navavikara-story-panel navavikara-list-departement {
                width: 100%;
                height: max-content;
            }

            navavikara-story-panel {
                width: -webkit-fill-available;
                height: max-content;
                position: absolute;
                top: 275px;
                left:0;
                background: radial-gradient(100% 193.51% at 100% 0%, #EDF4F8 0%, #EFF2FA 16.92%, #FAEFF6 34.8%, #FAE6F2 48.8%, #FAF0F7 63.79%, #F1F1FB 81.34%, #F0F4F8 100%);
                color: black;
                z-index: 2;
                border-radius: 25px 25px 0 0;
                display: flex;
                flex-direction: column;
                padding: 20px;
            }

            navavikara-story-panel navavikara-story-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 25px;
            }

            navavikara-departement {
                display: grid;
                grid-template-columns: repeat(3, 1fr); /* Membuat 3 kolom dengan lebar yang sama */
                grid-template-rows: repeat(2, 1fr); /* Membuat 2 baris dengan tinggi yang sama */
                gap: 10px; /* Jarak antara elemen-elemen di dalam grid */
                position: absolute;
                top:40%;
            }
              
              /* Contoh penggunaan untuk elemen di dalam grid */
            departement-slot {
                display: flex;
                align-item: center;
                justify-content: center;
            }

            departement-slot img {
                width: 50px;
                position: absolute;
                left: 0
            }

            departement-slot indetitas-departement {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .slide-top {
                width: 80px;
                height: 10px;
                border-radius: 100px;
                left: 50%;
                transform: translate(-50%, -10px);
                background: #bfbfbf;
                position: relative;
            }
              

            navavikara-story-panel navavikara-story-header ukmp-text.headsto {
                right: 0;
            }

            .modal-apps {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
              }
            
              .modal-content-apps {
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 340px;
                border-radius: 30px;
              }
              .close-button-apps {
                width: 24px;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
                border: none;
              }
              
              .close-button-apps:hover {
                color: #555555;
              }

              .button-container {
                text-align: center;
                margin-top: 20px;
            }
    
            .button-container .list-item {
                margin: 10px;
            }

            .headco-app {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-top: 12px;
                position: relative;
                gap: 28%
            }

              .grid {
                display: grid;
                gap: 5px;
                grid-template-columns: repeat(3, 1fr);
            }
    
            ukmp-grid>ukmp-grid {
                padding: 10px;
                background-color: #ccc;
            }
    
            ukmp-grid img {
                position: relative;
                width: 50%;
                left: 50%;
                transform: translate(-50%, 0);
            }
    
            .list-grid {
                display: grid;
                color: #212121;
                align-content: center;
                align-items: center;
                align-self: center;
                text-align: center;
            }
    
            .img-op {
                width: 60px;
                height: 60px;
                border-radius: 25px;
                align-items: center;
                align-self: center;
                align-content: center;
                left: 50%;
                transform: translate(-50%, 0);
                display: flex;
                position: relative;
            }

            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
              }
            
              .modal-content {
                position: absolute;
                bottom: 70px;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 340px;
                border-radius: 30px;
              }
              .close-button {
                position: relative;
                top: 50%;
                left: 0;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
              }
              
              .close-button:hover {
                color: #555555;
              }
              
              /* Button CSS */
              .centered-button {
                color: #ffffff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
              
              .centered-button:hover {
                background-color: #0056b3;
              }
              
              .button-container {
                text-align: center;
                margin-top: 20px;
              }

              .text-apps {
                color: black;
              }
              
              .modal-button {
                background-color: #f0f0f0;
                color: #333333;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
              }
              
              .modal-button:hover {
                background-color: #dcdcdc;
              }
              .swipe-indicator {
                position: absolute;
                top: 5px;
                left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 8px;
                background-color: #cccccc;
                border-radius: 40px;
              }

            .close-button {
                position: relative;
                top: 50%;
                left: 0;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
                z-index: 1;
            }
            
            .close-button:hover {
                color: #555555;
            }

            .headco {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-top: 12px;
                position: relative;
                gap: 35%
            }

            .headco img {
                width: 50px;
                position: relative;
            }

            .profile {
                border-radius: 125px;
                background-color: #cccccc;
                color: black;
                display: flex;
                justify-content: center;
                text-align: center;
                width: 105px;
                gap: 15%;
            }

            .myprof {
                top: 50%;
                position: relative;
                transform: translateY(70%);
            }

            /* Skeleton CSS styles */
            .skeleton {
                animation: skeleton-loading 1s infinite ease-in-out;
                background: linear-gradient(-90deg, #eeeeee 0%, #f4f4f4 50%, #eeeeee 100%);
                background-size: 200% 100%;
                animation-direction: alternate;
            }

            @keyframes skeleton-loading {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }

            .hidden {
                display: none;
            }

            svg {
                width: 100%;
                height: 100%;
                transition: transform 0.2s ease-in-out;
            }

            .slide-in {
                animation-name: slideIn;
                animation-duration: 0.5s;
                animation-timing-function: ease-in-out;
            }
            
            @keyframes slideIn {
                from {
                    bottom: 0px; /* Mulai dari posisi di luar tampilan */
                }
                to {
                    bottom: 70px; /* Posisi akhir yang diinginkan */
                }
            }
            
            @media (prefers-color-scheme: dark) {
                navavikara-app-now navavikara-header {
                    background-color: rgb(0 0 0 / 50%);
                    backdrop-filter: blur(10px);
                    color: white;
                }
                .modal-content {
                    background-color: black;
                    color: white;
                }
    
                .close-button {
                    color: white;
                }
                .profile {
                    background-color: black;
                    color: #cccccc;
                }
                navavikara-story-panel {
                    background: black;
                    color: #ffffff;
                    border-radius: 25px 25px 0 0;
                }

                navavikara-app-now navavikara-tasksbar {
                    background-color: #1a202c;
                    color: #f4f4f4;
                    transition: transform 0.3s ease-in-out;
                }

                path {
                    fill: #ffff;
                }

                .modal-content-apps {
                    background-color: #1a202c;
                }

                .centered-button {
                    background-color: #333f57;
                }

                .centered-button {
                    background-color: #154e8b;
                }

                .list-grid {
                    color: #f4f4f4;
                }
            }
            </style>
            
            <div id="Apps" class="modal-apps" on-touchstart="handleTouchStartApp" on-touchmove="handleTouchMoveApp" on-touchend="handleTouchEndApp">
                <div class="modal-content-apps" id="Content">
                    <div class="swipe-indicator"></div>
                    <div class="headco-app">
                        <button class="close-button-apps" on-click="closeApp" aria-label="Close" title="Close">&#215;</button>
                        <ukmp-text class="text-apps" text="Aplikasi UKMP">Aplikasi UKMP</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <div class="grid">
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/download" on-click="navigateToLink" >
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/download" on-click="navigateToLink" aria-labelledby="Download" title="Download">
                                            <image-component src="https://apps.ukmpenelitianunnes.com/logo/1.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    Download
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://apps.ukmpenelitianunnes.com/logo/story" on-click="navigateToLink" aria-labelledby="Story" title="Story">
                                        <button class="centered-button"on-click="openStory">
                                            <image-component src="https://apps.ukmpenelitianunnes.com/logo/2.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    UKMP Story
                                </ukmp-grid>
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/medsos" on-click="navigateToLink" aria-labelledby="Media Sosial" title="Media Sosial">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/medsos" on-click="navigateToLink" >
                                            <image-component src="https://apps.ukmpenelitianunnes.com/logo/3.png" alt="ukmp"></image-component>
                                        </button>
                                    </div>
                                    Media Sosial
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://apps.ukmpenelitianunnes.com/logo/karya/SecureJourney" on-click="navigateToLink" aria-labelledby="Aplikasi" title="Aplikasi">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/SecureJourney" on-click="navigateToLink" >
                                            <image-component src="https://apps.ukmpenelitianunnes.com/logo/4.png" alt="ukmp"></image-component>
                                        </button>
                                    </div>
                                    Karya UKMP
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/prestasi" on-click="navigateToLink" aria-labelledby="Prestasi" title="Prestasi">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/prestasi" on-click="navigateToLink" >
                                            <image-component src="https://apps.ukmpenelitianunnes.com/logo/6.png" alt="ukmp"></image-component>
                                        </button>
                                    </div>
                                    Prestasi
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/departement" on-click="navigateToLink" aria-labelledby="Profile Departement" title="Profile Departement">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/departement" on-click="navigateToLink" >
                                            <image-component src="https://apps.ukmpenelitianunnes.com/logo/7.png" alt="ukmp"></image-component>
                                        </button>
                                    </div>
                                    Departement
                                </ukmp-grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hrd-quote progja-HRD="🍃HRD Quote🍃" text-HRD="Hidup bukan tentang menemukan diri kita sendiri. Hidup adalah tentang menciptakan diri kita" hidden></hrd-quote>
            <navavikara-app-now>
                <navavikara-header>
                    <div class="logo">
                        <img src="https://apps.ukmpenelitianunnes.com/logo/navavikara.png" alt="Logo">
                        <h2>Beranda</h2>
                    </div>
                    <div class="site-header">
                        <div class="chips-nav">
                            <button aria-labelledby="mundur" aria-label="mundur" title="mundur" class="chips-nav__prev"><i
                                    class="fas fa-chevron-left"></i></button>
                            <button aria-labelledby="maju" aria-label="maju" title="maju" class="chips-nav__next"><i
                                    class="fas fa-chevron-right"></i></button>
                        </div>
                        <div class="chips-wrapper">
                            <div class="chip active" on-click="showAll">Semua</div>
                            <div class="chip" on-click="showUKMPStory">UKMP Story</div>
                            <div class="chip" on-click="showDocument">Document</div>
                            <div class="chip" on-click="showDepartement">Departement</div>
                            <div class="chip" on-click="showKaryaUKMP">Karya UKMP</div>
                            <div class="chip" on-click="showBerita">Berita</div>
                            <div class="chip" on-click="showLomba">Lomba</div>
                            <div class="chip" on-click="showPrestasi">Prestasi</div>
                        </div>
                    </div>
                </navavikara-header>
                <navavikara-tasksbar>
                    <navavikara-taskbar-home class="home">
                        <svg viewBox="0 0 24 24">
                            <g>
                                <path d="M4,10V21h6V15h4v6h6V10L12,3Z"></path>
                            </g>
                        </svg>
                    </navavikara-taskbar-home>
                    <navavikara-taskbar-apps class="apps">
                        <button class="navavikara-apps" on-click="openApp" aria-label="Apps" title="Apps">
                            <svg width="24" height="24" class="all-app" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 17a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 17a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 10a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 3a2 2 0 110 4 2 2 0 010-4z">
                                </path>
                            </svg>
                        </button>
                    </navavikara-taskbar-apps>
                </navavikara-tasksbar>
                <navavikara-content>
                    <ukmp-text class="Home-text" text="Home"></ukmp-text>
                    <navavikara-content-view></navavikara-content-view>
                    <navavikara-story-panel>
                    <div class="slide-top"></div>
                        <navavikara-list-departement></navavikara-list-departement>
                        <navavikara-story-header class$="[[_isHidden(storyVisible)]]" id="story">
                            <ukmp-text text="Story UKMP"></ukmp-text>
                            <ukmp-text class="headsto" text="" href="https://ukmpapps.web.app/su" link-text="Lihat Selengkapnya"></ukmp-text>
                        </navavikara-story-header>
                        <navavikara-story class$="[[_isHidden(storyVisible)]]" id="story">
                            <navavikara-story-slot slot="kartu-harbar">
                                <kartu-harbar class$="[[_getSkeletonClass(storyVisible)]]"></kartu-harbar>
                            </navavikara-story-slot>
                        </navavikara-story>
                        <navavikara-karya-fungsio class$="[[_isHidden(karyaVisible)]]" id="karya">
                            <navavikara-story-slot class$="[[_getSkeletonClass(karyaVisible)]]"></navavikara-story-slot>
                        </navavikara-karya-fungsio>
                        <navavikara-prestasi class$="[[_isHidden(prestasiVisible)]]" id="prestasi">
                            <navavikara-story-slot class$="[[_getSkeletonClass(prestasiVisible)]]"></navavikara-story-slot>
                        </navavikara-prestasi>
                        <navavikara-story class$="[[_isHidden(storyVisible)]]" id="publikasi-app">
                            <navavikara-story-slot slot="publikasi-app">
                                <publikasi-app class$="[[_getSkeletonClass(publikasi-appVisible)]]"></publikasi-app>
                            </navavikara-story-slot>
                        </navavikara-story>
                        <navavikara-lomba class$="[[_isHidden(lombaVisible)]]" id="lomba">
                            <navavikara-story-slot class$="[[_getSkeletonClass(lombaVisible)]]"></navavikara-story-slot>
                        </navavikara-lomba>
                        <navavikara-medsos id="medsos">
                            <navavikara-story-slot slot="kartu-medsos">
                                <kartu-medsos class$="[[_getSkeletonClass(storyVisible)]]"></kartu-medsos>
                            </navavikara-story-slot>
                        </navavikara-medsos>
                        <navavikara-end class$="[[_isHidden(lombaVisible)]]" id="end">
                            <navavikara-story-slot class$="[[_getSkeletonClass(lombaVisible)]]"></navavikara-story-slot>
                        </navavikara-end>
                    </navavikara-story-panel>
                </navavikara-content>
            </navavikara-app-now>
        `;
    }

    static get properties() {
        return {
            username: {
                type: String,
                value: ''
            },
            storyVisible: {
                type: Boolean,
                value: false,
            },
            documentVisible: {
                type: Boolean,
                value: false,
            },
            karyaVisible: {
                type: Boolean,
                value: false,
            },
            prestasiVisible: {
                type: Boolean,
                value: false,
            },
            lombaVisible: {
                type: Boolean,
                value: false,
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.showComponentsWithDelay();
        this.app = this.shadowRoot.getElementById("Apps");
        this.app.addEventListener("click", this.handleOutsideClickApp.bind(this));
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';

            // Ubah src image-component cloud menjadi path gambar tema gelap
            const cloudImageComponent = this.shadowRoot.querySelector('.ukmp-logo');
            if (cloudImageComponent) {
                cloudImageComponent.setAttribute('src', '/../../logo/ukmp-logo-512x512-white.png');
            }

        }

        /*

        // Check if user is logged in
        const loggedIn = localStorage.getItem('loggedIn');
        const username = localStorage.getItem('username');

        if (!loggedIn || !username) {
            // Redirect to login page if not logged in
            window.location.href = '/apps/login/login.html';
        } else {
            this.username = username;

            // Retrieve user data from Web Storage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username);

            if (user) {
                this.department = user.department;
            }
        }
            */
    }

    showComponentsWithDelay() {
        setTimeout(() => {
            this.storyVisible = true;
            this.documentVisible = true;
            this.karyaVisible = true;
            this.prestasiVisible = true;
            this.lombaVisible = true;
        }, 5000);
    }

    openApp() {
        this.app = this.shadowRoot.getElementById("Apps");
        this.content = this.shadowRoot.getElementById("Content");
        this.content.classList.add("slide-in");

        // Mengatur listener untuk menghapus kelas CSS setelah animasi selesai
        this.content.addEventListener("animationend", () => {
            this.content.classList.remove("slide-in");
            this.content.style.display = "block";
            this.content.style.bottom = "70px";
        });
        this.app.style.display = "block";
        this.appStartPosition = 0;
        this.app.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.app.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.app.addEventListener("touchend", this.handleTouchEnd.bind(this));
        document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
    }

    handleOutsideClickApp(event) {
        if (event.target === this.app) {
            this.closeApp();
        }
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
            this.resetModalPosition();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
    }

    resetModalPosition() {
        this.modal.style.transform = "";
    }


    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
        document.documentElement.style.overflowY = ""; // Menghapus gaya overflow-y: hidden dari tag <html>
    }

    closeApp() {
        this.app.style.display = "none";
        this.app.removeEventListener("touchstart", this.handleTouchStartApp.bind(this));
        this.app.removeEventListener("touchmove", this.handleTouchMoveApp.bind(this));
        this.app.removeEventListener("touchend", this.handleTouchEndApp.bind(this));
        document.documentElement.style.overflowY = ""; // Menghapus gaya overflow-y: hidden dari tag <html>
    }

    handleTouchStartApp(e) {
        this.startY = e.touches[0].pageY;
        this.appStartPosition = this.app.getBoundingClientRect().top;
    }

    handleTouchMoveApp(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModalApp(deltaY);
    }

    handleTouchEndApp(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeApp();
            this.resetModalPositionApp();
        } else {
            this.resetModalPositionApp();
        }
    }

    moveModalApp(deltaY) {
        this.app.style.transform = `translateY(${deltaY}px)`;
    }

    resetModalPositionApp() {
        this.app.style.transform = "";
    }

    showAll() {
        this.showComponents(['story', 'publikasi-app', 'karya', 'prestasi', 'lomba']);
    }

    showUKMPStory() {
        this.showComponents(['story']);
    }

    showDocument() {
        this.showComponents(['publikasi-app']);
    }

    showDepartement() {
        // Add code to show departement component
    }

    showKaryaUKMP() {
        this.showComponents(['karya']);
    }

    showLomba() {
        this.showComponents(['lomba']);
    }

    showPrestasi() {
        this.showComponents(['prestasi']);
    }

    showComponents(componentNames) {
        const components = ['story', 'publikasi-app', 'karya', 'prestasi', 'lomba'];

        components.forEach((component) => {
            const element = this.shadowRoot.getElementById(component);
            if (element) {
                if (componentNames.includes(component)) {
                    element.classList.remove('hidden');
                } else {
                    element.classList.add('hidden');
                }
            }
        });
    }

    _isHidden(visible) {
        return visible ? '' : 'hidden';
    }

    _getSkeletonClass(visible) {
        return visible ? '' : 'skeleton';
    }
}

customElements.define("navavikara-app", HomeApp);

// Main Application Component
class PubApp extends PolymerElement {
    static get properties() {
        return {
            pdfFiles: {
                type: Array,
                value: () => []
            },
            isModalOpen: {
                type: Boolean,
                value: false
            }
        };
    }

    static get template() {
        return html`
        <style>
            :host {
                display: block;
                font-family: 'Samsung Sans', 'Arial', sans-serif;
                padding: 20px;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
            }

            .pdf-grid {
                display: flex;
                gap: 20px;
                justify-content: center;
                margin-top: 20px;
            }

            .pdf-card {
                width: 300px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
            }

            .pdf-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            }

            .pdf-thumbnail {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-bottom: 1px solid #eee;
            }

            .pdf-info {
                padding: 16px;
            }

            .pdf-title {
                font-size: 16px;
                color: #232323;
                margin: 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            /* Modal Styles */
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .modal-content {
                width: 90%;
                height: 90vh;
                background: white;
                border-radius: 12px;
                position: relative;
                display: flex;
                flex-direction: column;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #eee;
            }

            .close-button {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                padding: 8px;
                color: #666;
            }

            .modal-body {
                flex: 1;
                overflow: hidden;
                position: relative;
            }

            [hidden] {
                display: none !important;
            }
        </style>
        
        <div class="container">
            <div class="pdf-grid">
                <template is="dom-repeat" items="{{_getFirst3(pdfFiles)}}">
                    <div class="pdf-card" on-click="openModal">
                        <img class="pdf-thumbnail" src="{{item.thumbnail}}" alt="PDF Thumbnail"/>
                        <div class="pdf-info">
                            <h3 class="pdf-title">{{item.fileName}}</h3>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal-overlay" hidden$="[[!isModalOpen]]">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{selectedPdfTitle}}</h2>
                    <button class="close-button" on-click="closeModal">×</button>
                </div>
                <div class="modal-body">
                    <custom-pdf-viewer src="{{selectedPdfUrl}}"></custom-pdf-viewer>
                </div>
            </div>
        </div>
        `;
    }

    _getFirst3(pdfFiles) {
        return pdfFiles.slice(0, 3);
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchPdfFiles();
    }

    fetchPdfFiles() {
        fetch('https://apps.ukmpenelitianunnes.com/riset/list-pdf.php')
            .then(response => response.json())
            .then(data => {
                const pdfFiles = data.map(file => ({
                    fileName: file,
                    thumbnail: ''
                }));
                this.pdfFiles = pdfFiles;

                this.pdfFiles.forEach((pdfFile, index) => {
                    const fileURL = `https://apps.ukmpenelitianunnes.com/riset/riset/${pdfFile.fileName}`;
                    this.generatePdfThumbnail(fileURL, index);
                });
            })
            .catch(error => {
                console.error('Error fetching PDF files:', error);
            });
    }

    generatePdfThumbnail(pdfUrl, index) {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        loadingTask.promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                page.render(renderContext).promise.then(() => {
                    const thumbnailUrl = canvas.toDataURL();
                    this.set(`pdfFiles.${index}.thumbnail`, thumbnailUrl);
                });
            });
        }).catch(error => {
            console.error('Error generating PDF thumbnail:', error);
        });
    }
    

    openModal(event) {
        const pdfFile = event.model.item.fileName;
        const fileURL = `https://apps.ukmpenelitianunnes.com/riset/riset/${pdfFile}`;
        this.selectedPdfTitle = pdfFile;
        this.selectedPdfUrl = fileURL;
        this.isModalOpen = true;
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.isModalOpen = false;
        document.body.style.overflow = 'auto';
    }
}

// PDF Viewer Component
class CustomPdfViewer extends PolymerElement {
    static get properties() {
        return {
            src: {
                type: String,
                observer: '_srcChanged'
            },
            currentPage: {
                type: Number,
                value: 1
            },
            totalPages: {
                type: Number,
                value: 0
            },
            scale: {
                type: Number,
                value: 1.0
            },
            rotation: {
                type: Number,
                value: 0
            },
            pdfDoc: {
                type: Object,
                value: null
            }
        };
    }

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                flex-direction: column;
                height: 100%;
                background-color: #f5f5f5;
            }

            .toolbar {
                display: flex;
                align-items: center;
                padding: 8px 16px;
                background-color: #2c3e50;
                color: white;
                gap: 16px;
            }

            .viewer-container {
                flex: 1;
                overflow: auto;
                display: flex;
                justify-content: center;
                padding: 20px;
            }

            canvas {
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .nav-button {
                background: none;
                border: none;
                color: white;
                padding: 8px 16px;
                cursor: pointer;
                border-radius: 4px;
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .nav-button:hover {
                background: rgba(255,255,255,0.1);
            }

            .nav-button[disabled] {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .page-info {
                color: white;
                font-size: 14px;
            }
        </style>

        <div class="toolbar">
            <button class="nav-button" on-click="_previousPage" disabled="[[_isFirstPage(currentPage)]]">
                ← Previous
            </button>
            <span class="page-info">Page [[currentPage]] of [[totalPages]]</span>
            <button class="nav-button" on-click="_nextPage" disabled="[[_isLastPage(currentPage, totalPages)]]">
                Next →
            </button>
        </div>

        <div class="viewer-container">
            <canvas id="pdfCanvas"></canvas>
        </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this._initPdfJs();
    }

    _initPdfJs() {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    async _srcChanged(newSrc) {
        if (!newSrc) return;
        try {
            await this._loadPdf(newSrc);
        } catch (err) {
            console.error('Failed to load PDF:', err);
        }
    }

    async _loadPdf(url) {
        try {
            this.pdfDoc = await pdfjsLib.getDocument(url).promise;
            this.totalPages = this.pdfDoc.numPages;
            this._renderPage();
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    }

    async _renderPage() {
        if (!this.pdfDoc) return;

        const page = await this.pdfDoc.getPage(this.currentPage);
        const canvas = this.$.pdfCanvas;
        const context = canvas.getContext('2d');
        
        const viewport = page.getViewport({ 
            scale: this.scale,
            rotation: this.rotation
        });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        await page.render(renderContext).promise;
    }

    _previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this._renderPage();
        }
    }

    _nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this._renderPage();
        }
    }

    _isFirstPage(currentPage) {
        return currentPage <= 1;
    }

    _isLastPage(currentPage, totalPages) {
        return currentPage >= totalPages;
    }
}

// Register elements
customElements.define('publikasi-app', PubApp);
customElements.define('custom-pdf-viewer', CustomPdfViewer);

class ArunikaEnd extends PolymerElement {
    static get template() {
        return html`
      <style>
      .dokument-head {
        display: flex;
        align-items: center;
        gap: 5%;
        margin-top:60px;
      }
      ukmp-text {
        text-align: justify;
      }
      </style>

      <div class="dokument-head">
            <div class="card-title">Sudah Tidak Ada Content Untuk [[username]]</div>
      </div>
    `;
    }

    static get is() {
        return 'navavikara-end';
    }
}

customElements.define(ArunikaEnd.is, ArunikaEnd);

class HRDQuote extends PolymerElement {
    static get template() {
        return html`
        <style>
          :host {
            display: block;
          }
  
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
          }
  
          .modal-content {
            position: absolute;
            bottom: 70px;
            left: 50%;
            transform: translate(-50%);
            background-color: #fff;
            padding: 10px;
            width: 90%;
            border-radius: 25px;
          }
  
          .modal-close {
            text-align: right;
            margin-bottom: 10px;
          }
  
          .slide-top {
            width: 80px;
            height: 10px;
            border-radius: 100px;
            left: 50%;
            transform: translate(-50%);
            background-color: #bfbfbf;
            position: absolute;
            margin-top: 10px;
          }

          .headca {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-top: 40px;
            position: relative;
            gap: 35%
          }
  
          .profile-ac image-component {
            width: 50px;
            position: relative;
          }
  
          .profile-ac {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            left: 0;
            position: relative;
            transform: translateX(-25%);
          }

          [hidden] {
            display: none;
          }
  
          @media (prefers-color-scheme: dark) {
            .modal-content {
              background-color: black;
              color: white;
            }
  
            .close-button {
              color: white;
            }
          }
        </style>
  
        <div id="HRD" class="modal" hidden$="[[!showModal]]" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
          <div class="modal-content">
            <div class="slide-top"></div>
            <div class="headca">
              <div class="modal-close">
                <button on-click="closeModal" aria-label="Close" title="Close">&#215;</button>
              </div>
              <div class="profile-ac">
                <image-component src="/../../images/HRD.jpg"/></image-component>
                <ukmp-text id="progja" text$="[[progjaHRD]]">[[progjaHRD]]</ukmp-text>
              </div>
            </div>
            <ukmp-text id="quote" text$="[[textHRD]]">[[textHRD]]</ukmp-text>
          </div>
        </div>
      `;
    }

    static get properties() {
        return {
            showModal: {
                type: Boolean,
                value: false
            },
            textHRD: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_textHRDChanged'  // added observer
            },
            progjaHRD: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_progjaHRDChanged'  // added observer
            },
            progjaHRDDuha: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_progjaHRDDuhaChanged'  // added observer
            },
        };
    }

    ready() {
        super.ready();
        setTimeout(() => {
            this.toggleProgjaHidden();
        }, 3000);
    }

    toggleProgjaHidden() {
        this.isProgjaHidden = !this.isProgjaHidden;
        setTimeout(() => {
            this.toggleProgjaHidden();
        }, 3000);
    }

    // observer function for namaDepartemen property
    _progjaHRDChanged(newVal) {
        // code to handle the updated value of namaDepartemen
        const ukmpTextElement = this.shadowRoot.querySelector('ukmp-text #progja');
        if (ukmpTextElement) {
            ukmpTextElement.setAttribute('text', newVal);
        }
    }

    _progjaHRDDuhaChanged(hai) {
        // code to handle the updated value of namaDepartemen
        const hali = this.shadowRoot.querySelector('ukmp-text #progjad');
        if (hali) {
            hali.setAttribute('text', hai);
        }
    }

    _textHRDChanged(hallo) {
        // code to handle the updated value of namaDepartemen
        const Hal = this.shadowRoot.querySelector('ukmp-text #quote');
        if (Hal) {
            Hal.setAttribute('text', hallo);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.checkIfMonday();
        this.modal = this.shadowRoot.getElementById("HRD");
        this.modal.addEventListener("click", this.handleOutsideClick.bind(this));
        this.textHRD = this.getAttribute("text-hrd");
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }
        this.progjaHRD = this.getAttribute("progja-hrd");
        this._progjaHRDChanged(this.progjaHRD);  // initial call to the observer function
        this._textHRDChanged(this.textHRD);  // initial call to the observer function
    }

    handleOutsideClick(event) {
        if (event.target === this.modal) {
            this.closeModal();
        }
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
            this.resetModalPosition();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
    }

    resetModalPosition() {
        this.modal.style.transform = "";
    }

    checkIfMonday() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6

        if (dayOfWeek === 1) {
            this.showModal = true;
            document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
        }
    }

    closeModal() {
        this.showModal = false;
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
        document.documentElement.style.overflowY = ""; // Menghapus gaya overflow-y: hidden dari tag <html>
    }
}

customElements.define('hrd-quote', HRDQuote);

class ArunikaPrestasi extends PolymerElement {
    static get template() {
        return html`
      <style>
      .carousel {
        display: flex;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        width: 100%;
      }
      
      .card {
        flex: 0 0 auto;
        width: 210px;
        margin-right: 10px;
        background-color: lightgray;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
      }
      
      .card-title {
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      .card-body {
        width: 100%;
        height: 100%;
        border: none;
      }
      
      .card-footer {
        margin-top: 10px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .card-footer image-component {
        width: 60px;
      }
      .card-footer-deskripsi {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .share-button {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
  
      .share-button:hover {
        background-color: #0056b3;
      }

      .dokument-head {
        display: flex;
        align-items: center;
        gap: 5%;
      }

      .dokument img {
            width: 35px;
      }

      .dokument-head image-component {
            width: 35px;
      }

      ukmp-text {
        text-align: justify;
      }
      @media (prefers-color-scheme: dark) {
        .card {
            background-color: black;
            color: white;
        }
        .share-button {
            background-color: #161b22;
            color: #f4f4f4;
        }
      }
      </style>

      <div slot="kartu-prestasi">
        <kartu-prestasi></kartu-prestasi>
      </div>
    `;
    }

    static get is() {
        return 'navavikara-prestasi';
    }
}

customElements.define(ArunikaPrestasi.is, ArunikaPrestasi);

class ArunikaLomba extends PolymerElement {
    static get template() {
        return html`
        `
    }
}

class KarModPres extends PolymerElement {
    static get template() {
        return html`
            <style>
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
              }
            
              .modal-content {
                position: absolute;
                bottom: 70px;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 340px;
                border-radius: 30px;
              }
              .close-button {
                position: relative;
                top: 50%;
                left: 0;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
              }
              
              .close-button:hover {
                color: #555555;
              }
              
              /* Button CSS */
              .centered-button {
                color: #ffffff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
              
              .centered-button:hover {
                background-color: #0056b3;
              }
              
              .button-container {
                text-align: center;
                margin-top: 20px;
              }

              .text-apps {
                color: black;
              }
              
              .modal-button {
                background-color: #f0f0f0;
                color: #333333;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
              }
              
              .modal-button:hover {
                background-color: #dcdcdc;
              }
              .swipe-indicator {
                position: absolute;
                top: 5px;
                left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 8px;
                background-color: #cccccc;
                border-radius: 40px;
              }

            .close-button {
                position: relative;
                top: 50%;
                left: 0;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
                z-index: 1;
            }
            
            .close-button:hover {
                color: #555555;
            }

            .headco {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-top: 12px;
                position: relative;
                gap: 35%
            }

            .headco img {
                width: 50px;
                position: relative;
            }
            </style>
            <div id="Prestasi" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="swipe-indicator"></div>
                    <div class="headco">
                        <button class="close-button" on-click="closeModal" aria-label="Close" title="Close">&#215;</button>
                        <img src="../logo/ukmp-logo-144x144.png"/>
                    </div>
                    <kartu-pkm></kartu-pkm>
                </div>
            </div>
        `
    }
}

class PKM extends PolymerElement {
    static get template() {
        return html`
        `
    }
}

class CardPres extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
        .modal {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
        
        .modal-content {
            position: absolute;
            bottom: 70px;
            left: 50%;
            transform: translate(-50%);
            background-color: #fff;
            padding: 10px;
            width: 340px;
            border-radius: 30px;
        }
        .close-button {
            position: relative;
            top: 50%;
            left: 0;
            width: 24px;
            height: 24px;
            border: none;
            background-color: transparent;
            font-size: 18px;
            color: #999999;
            cursor: pointer;
            font-size: 28px;
        }

        .swipe-indicator {
            position: absolute;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 8px;
            background-color: #cccccc;
            border-radius: 40px;
        }

        .header-prestasi {
            display: flex;
            align-items: center;
            margin-top: 12px;
            position: relative;
        }

        image-component {
            width: 35px;
        }

        .body-prestasi {
            display: block;
        }
        </style>
        <div id="Account" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
            <div class="modal-content">
                <div class="swipe-indicator"></div>
                <div class="header-prestasi">
                    <div class="profile-prestasi>
                        <image-component style$="background-image: url([[backgroundImage]]);"></image-component>
                        <ukmp-text text$="[[title]]">[[title]]</ukmp-text>
                    </div>
                    <button class="close-button" on-click="closeModal" aria-label="Close" title="Close">&#215;</button>
                </div>
                <div class="body-prestasi">
                    <ukmp-text text$="[[namaOrang]]">[[namaOrang]]</ukmp-text>
                    <ukmp-text text$="[[jenisPrestasi]]">[[jenisPrestasi]]</ukmp-text>
                    <ukmp-text text$="[[tahunPrestasi]]">[[tahunPrestasi]]</ukmp-text>
                    <ukmp-text text$="[[juaraPrestasi]]">[[juaraPrestasi]]</ukmp-text>
                </div>
            </div>
        </div>
      `;
    }

    connectedCallback() {
        super.connectedCallback();
        const ukmpStory = this.closest('ukmp-story');
        if (ukmpStory) {
            this.namaOrang = ukmpStory.dataset.namaOrang || '';
            this.jenisPrestasi = ukmpStory.dataset.jenisPrestasi || '';
            this.tahunPrestasi = ukmpStory.dataset.tahunPrestasi || '';
            this.juaraPrestasi = ukmpStory.dataset.juaraPrestasi || '';
        }
    }

    static get properties() {
        return {
            backgroundImage: {
                type: String,
                value: '',
            },
            title: {
                type: String,
                value: '',
            },
            namaOrang: {
                type: String,
                value: '',
            },
            jenisPrestasi: {
                type: String,
                value: '',
            },
            tahunPrestasi: {
                type: String,
                value: '',
            },
            juaraPrestasi: {
                type: String,
                value: '',
            },
        };
    }

    closeModal() {
        this.style.display = 'none';
    }
}
customElements.define('navavikara-prestasi-detail', CardPres);

class ArunikaContentView extends PolymerElement {
    static get template() {
        return html`
      <style>
      :host {
        display: block;
        position: absolute;
        width: 100%;
        top: 0;
        overflow: hidden;
      }

      #carousel {
        display: flex;
        width: 100%;
        transform: translateX(-0%);
        transition: transform 0.3s ease;
        position: fixed;
        top: 10%;
      }

      .carousel-item {
        flex: 0 0 32.2%;
        height: 200px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        background-color: #f1f1f1;
        color: #333;
        font-size: 24px;
        margin-right: 10px; /* Menambahkan jarak antara slide */
        border-radius: 10px; /* Menambahkan border-radius */
      }

      .carousel-item:last-child {
        margin-left: 6px; /* Menghapus margin-right pada slide terakhir */
      }
      .content {
        align-items: center;
        justify-content: space-between;
      }
      
      .image {
        flex: 1;
        text-align: right;
        margin-right: 20px;
      }
      
      .image img {
        max-width: 100%;
        height: auto;
      }

      .text {
        text-align: left;
        position: absolute;
        z-index: 1;
        flex-direction: column;
        bottom: 35px;
        display: flex;
        width: 20%;
        height: 40%
      }

      .modal-button {
        background-color: #fff;
        color: #0f0f0f;
        padding: 10px 0px;
        border: none;
        border-radius: 100px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-right: 10px;
        margin-top: 10px; /* Jarak atas button */
    }

    ukmp-text {
        margin-bottom: 10px; /* Jarak bawah ukmp-text */
      }
      
      
      @media (prefers-color-scheme: dark) {
        .carousel-item {
            background-color: transparent;
            color: #f4f4f4;
        }
        .modal-button {
            background-color: #0f0f0f;
            color: #fff;
            padding: 10px 0px;
            border: none;
            border-radius: 100px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-right: 10px;
            margin-top: 10px; /* Jarak atas button */
        }
      }
      </style>

      <div id="carousel" class="carousel">
        <div class="carousel-item">
            <div class="text">
                <ukmp-text text="Upgrading 2023">[[JudulGambar]]</ukmp-text>
                <ukmp-text text="Kegiatan Upgrading adalah kegiatan...">[[KeteranganGambar]]</ukmp-text>
                <button class="modal-button" aria-label="Modal" title="Modal"><ukmp-text link-text="Ketahui Lebih Lanjut" text="" href="https://ukmpapps.web.app/"></ukmp-text></button>
            </div>        
            <div class="content">
                <image-component src="./hero.jpg" alt="Gambar 1" show-sinematik></image-component>
            </div>
        </div>
        <div class="carousel-item">            
            <div class="text">
                <ukmp-text text="Upgrading 2023">[[JudulGambar]]</ukmp-text>
                <ukmp-text text="Kegiatan Upgrading adalah kegiatan...">[[KeteranganGambar]]</ukmp-text>
                <button class="modal-button" aria-label="Modal" title="Modal"><ukmp-text link-text="Ketahui Lebih Lanjut" text="" href="https://ukmpapps.web.app/"></ukmp-text></button>
            </div>        
            <div class="content">
                <image-component src="./hero.jpg" alt="Gambar 1" show-sinematik></image-component>
            </div>
        </div>
        <div class="carousel-item">            
            <div class="text">
                <ukmp-text text="Upgrading 2023">[[JudulGambar]]</ukmp-text>
                <ukmp-text text="Kegiatan Upgrading adalah kegiatan...">[[KeteranganGambar]]</ukmp-text>
                <button class="modal-button" aria-label="Modal" title="Modal"><ukmp-text link-text="Ketahui Lebih Lanjut" text="" href="https://ukmpapps.web.app/"></ukmp-text></button>
            </div>    
            <div class="content">
                <image-component src="./hero.jpg" alt="Gambar 1" show-sinematik></image-component>
            </div>
        </div>
      </div>
    `;
    }

    static get is() {
        return 'carousel-component';
    }

    connectedCallback() {
        super.connectedCallback();
        this.initializeCarousel();
    }
    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    initializeCarousel() {
        const carousel = this.shadowRoot.getElementById('carousel');
        const carouselItems = carousel.getElementsByClassName('carousel-item');
        const numItems = carouselItems.length;
        const itemWidthPercentage = 100 / numItems;

        carousel.style.width = `${numItems * 100 - 20}%`;

        Array.from(carouselItems).forEach((item) => {
            item.style.width = `${itemWidthPercentage}%`;
        });

        let currentItem = 0;

        setInterval(() => {
            currentItem = (currentItem + 1) % numItems;
            const translateX = `-${currentItem * itemWidthPercentage}%`;
            carousel.style.transform = `translateX(${translateX})`;
        }, 90000);
    }
}
customElements.define("navavikara-content-view", ArunikaContentView);

class VideoComponent extends PolymerElement {
    static get template() {
        return html`
        <style>
          :host {
            display: block;
          }
  
          #video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
  
          #video.shadow-overlay {
            box-shadow: var(--video-shadow);
            transition: background-color 0.5s ease;
          }
  
          :host([show-sinematik]) #video.shadow-overlay {
            background-color: var(--video-glow-color);
          }
        </style>
  
        <video id="video" class="shadow-overlay" src="[[src]]" alt="[[alt]]" autoplay$="[[autoplay]]" controls></video>
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
            },
            autoplay: {
                type: Boolean,
                value: false
            }
        };
    }

    _srcChanged(src) {
        if (src) {
            const videoElement = this.shadowRoot.querySelector('#video');

            videoElement.addEventListener('loadedmetadata', () => {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const context = canvas.getContext('2d');

                setInterval(() => {
                    context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
                    const imageData = context.getImageData(0, 0, videoElement.videoWidth, videoElement.videoHeight).data;
                    const numPixels = videoElement.videoWidth * videoElement.videoHeight;
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
                    const boxShadowValue = `0 0 200px ${avgColor}`;

                    videoElement.style.setProperty('--video-shadow', boxShadowValue);
                    videoElement.style.setProperty('--video-glow-color', `${avgColor}77`);
                }, 1000 / 30); // Mengambil sampel warna setiap 30 frame per detik (30 FPS)
            });
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

customElements.define('video-component', VideoComponent);

class UKMPKartuDepar extends PolymerElement {
    static get template() {
        return html`
        <style>
          :host {
            display: block;
            background-color: var(--card-background-color);
            color: var(--card-text-color);
            border-radius: 10px;
            padding: 0px;
            height: max-content;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
                 0px 6px 10px rgba(0, 0, 0, 0.1);
          }
  
          .card {
            background-color: #ffffff;
            color: #000000;
            border-radius: 10px;
            padding: 10px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
                        0px 6px 10px rgba(0, 0, 0, 0.1);
            cursor: pointer;
          }
          .card-fungsio{
            background-color: #ffffff;
            color: #000000;
            border-radius: 20px;
            width: var(--card-width);
            height: var(--card-height);
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
                        0px 6px 10px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            --card-height: 210px;
            --card-width: calc(var(--card-height) / 1.5);
            position: relative;
          }
          .card-fungsio .enk {
            position: absolute;
            bottom: 0;
            background: rgb(255 255 255 / 35%);
            border-radius: 20px;
            padding: 20px;
            left: 0;
            width: -webkit-fill-available;
            backdrop-filter: blur(10px);
          }
          
          .card-header {
            font-size: 18px;
            font-weight: bold;
            margin-top: 0;
            margin-bottom: 10px;
          }
          
          .card-body {
            font-size: 9px;
            margin-top: 0;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .card-link {
            color: var(--card-link-color);
            font-weight: bold;
            text-decoration: none;
            font-size: 11px;
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
          .card-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            row-gap: 20px;
            column-gap: 10px;        
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
            }
          }

          /* Modal styles */
          .modal {
            display: none;
            position: fixed;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
          }

          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            width: 80%;
            max-width: 600px;
            border-radius: 25px;
            bottom: 20px;
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0px);
            height: 300px;
            overflow: scroll;
          }

          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1;
            position: relative;
          }

          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
          @media (prefers-color-scheme: dark) {
            .modal-content {
                background-color: #161b22;
            }
          }
          .wel{
            display:flex;
            flex-direction: column;
          }
          .wel .banner  {
            background-size: cover;
            width: 100%;
            aspect-ratio: 16 / 9;
            max-height: max(80vh, 380px);
            mask-image: linear-gradient(rgb(0, 0, 0) 60%, transparent 100%);
            z-index: 0;
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 0 35px 35px 0;

          }
          .slide-top {
            width: 80px;
            height: 10px;
            border-radius: 100px;
            background: #bfbfbf;
            position: sticky;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
          }
          .wel h2, h3, p {
            z-index: 1;
            position: relative;
            margin: 0;
          }
        
          h2, h3, p {
            z-index: 1;
            position: relative;
            margin: revert-layer;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

        </style>
  
        <div class="card" on-click="openModal">
          <h3 class="card-header">[[title]]</h3>
          <p class="card-body">[[description]]</p>
          <a href="[[url]]" class="card-link" on-click="handleLinkClick">Lihat Selengkapnya</a>
        </div>

        <div id="myModal" class="modal">
          <div class="modal-content" id="modalContent">
            <div class="slide-top"></div>
            <span class="close" on-click="closeModal">&times;</span>
            <div class="wel">
                <image-component class="banner" src="[[banner]]"></image-component>
                <h2>[[title]]</h2>
                <p>[[description]]
                <a href="[[url]]" target="_blank">Lihat Selengkapnya</a>
                </p>
            </div>
            <p>Kadep: [[namaKadep]]</p>
            <p>Sekdep: [[namaSekdep]]</p>
            <div class="card-container">
              <template is="dom-repeat" items="[[fungsioData]]">
                <div class="card-fungsio" style$="background-image: url([[item.photo]]); background-size: cover;">
                  <div class="enk">
                    <h3 class="card-header">[[item.nama]]</h3>
                    <p class="card-body">Fungsionaris</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
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
            },
            banner: String,
            jumlahFungsio: Number,
            namaKadep: String,
            photoKadep: String,
            namaSekdep: String,
            namaFungsio: Array,
            photoFungsio: Array,
            fungsioData: {
                type: Array,
                computed: 'computeFungsioData(jumlahFungsio, namaFungsio, photoFungsio)'
            },
        }
    }
    constructor() {
        super();
        this.startY = 0;
        this.modalStartPosition = 0;
    }

    computeFungsioData(jumlahFungsio, namaFungsio, photoFungsio) {
        let data = [];
        for (let i = 0; i < jumlahFungsio; i++) {
            data.push({
                nama: namaFungsio[i],
                photo: photoFungsio[i]
            });
        }
        return data;
    }

    openModal(e) {
        if (!e.target.classList.contains('card-link')) {
            const modal = this.shadowRoot.getElementById('myModal');
            const modalContent = this.shadowRoot.getElementById('modalContent');
            modal.style.display = 'block';
            modalContent.style.transform = 'translate(-50%, 0)';
            document.body.style.overflow = 'hidden';

            this.setupSwipeListeners();
        }
    }

    setupSwipeListeners() {
        const modalContent = this.shadowRoot.getElementById('modalContent');
        modalContent.addEventListener('touchstart', this.handleTouchStart.bind(this));
        modalContent.addEventListener('touchmove', this.handleTouchMove.bind(this));
        modalContent.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].clientY;
        this.currentY = this.startY;
    }

    handleTouchMove(e) {
        e.preventDefault();
        this.currentY = e.touches[0].clientY;
        const deltaY = this.currentY - this.startY;
        if (deltaY > 0) {
            const modalContent = this.shadowRoot.getElementById('modalContent');
            modalContent.style.transform = `translate(-50%, ${deltaY}px)`;
        }
    }

    handleTouchEnd(e) {
        const deltaY = this.currentY - this.startY;
        const modalContent = this.shadowRoot.getElementById('modalContent');
        if (deltaY > 100) {  // Threshold untuk swipe ke bawah
            // Geser modal keluar layar sebelum ditutup
            modalContent.style.transform = 'translate(-50%, 100%)';

            // Tambahkan transisi smooth agar modal bergerak ke bawah
            modalContent.style.transition = 'transform 0.3s ease-in-out';

            // Tunggu sampai transisi selesai sebelum menutup modal
            modalContent.addEventListener('transitionend', () => {
                this.closeModal();  // Tutup modal setelah swipe ke bawah
            }, { once: true });
        } else {
            this.resetModalPosition();  // Kembalikan modal ke posisi semula jika swipe tidak cukup
        }
    }

    closeModal() {
        const modal = this.shadowRoot.getElementById('myModal');
        const modalContent = this.shadowRoot.getElementById('modalContent');

        // Hapus transisi transform
        modalContent.style.transition = '';

        modal.style.display = 'none';  // Sembunyikan modal
        document.body.style.overflow = '';  // Kembalikan scrolling halaman

        this.resetModalPosition();  // Kembalikan posisi modal ke posisi awal
        this.removeSwipeListeners();
    }

    resetModalPosition() {
        const modalContent = this.shadowRoot.getElementById('modalContent');
        modalContent.style.transform = 'translate(-50%, 0)';  // Kembalikan ke posisi tengah
    }


    removeSwipeListeners() {
        const modalContent = this.shadowRoot.getElementById('modalContent');
        modalContent.removeEventListener('touchstart', this.handleTouchStart);
        modalContent.removeEventListener('touchmove', this.handleTouchMove);
        modalContent.removeEventListener('touchend', this.handleTouchEnd);
    }


    handleLinkClick(e) {
        e.stopPropagation();
    }
}

customElements.define("navavikara-kartu-dep", UKMPKartuDepar);

class ListDepartement extends PolymerElement {
    static get template() {
        return html`
        <style>
        .card-grid {
            --card-grid-display: grid;
            --card-grid-columns: repeat(2, 1fr);
            --card-grid-rows: repeat(2, 1fr);
            --card-grid-gap: 20px;
            display: var(--card-grid-display);
            grid-template-columns: var(--card-grid-columns);
            grid-template-rows: var(--card-grid-rows);
            grid-gap: var(--card-grid-gap);
          }      
        </style>
        <ukmp-header-card class="header"></ukmp-header-card>
        <div class="card-grid">
          <navavikara-kartu-dep
            title="PH"
            description="Bidang koordinasi dan administrasi"
            url="./ph"
            jumlah-fungsio="6"
            nama-kadep="Hasan"
            banner="./hero.jpg"
            photo-kadep="./PH_Sekretaris_Bebas_Hanik.jpg"
            nama-sekdep="Amanda"
            nama-fungsio='["Hanik", "Nama Fungsio 2", "Nama Fungsio 3", "Nama Fungsio 4", "Nama Fungsio 5", "Nama Fungsio 6"]'
            photo-fungsio='["./PH_Sekretaris_Bebas_Hanik.jpg", "./PH_Sekretaris_Bebas_Hanik.jpg", "url_photo_3", "url_photo_4", "url_photo_5", "url_photo_6"]'
            skeleton>
          </navavikara-kartu-dep>
          <navavikara-kartu-dep 
            title="HRD" 
            description="Bidang bonding anggota "
            url="./hrd"
            jumlah-fungsio="6"
            nama-kadep="Hasan"
            banner="./hero.jpg"
            photo-kadep="url_photo_kadep"
            nama-sekdep="Amanda"
            nama-fungsio='["Hanik", "Nama Fungsio 2", "Nama Fungsio 3", "Nama Fungsio 4", "Nama Fungsio 5", "Nama Fungsio 6"]'
            photo-fungsio='["./PH_Sekretaris_Bebas_Hanik.jpg", "./PH_Sekretaris_Bebas_Hanik.jpg", "url_photo_3", "url_photo_4", "url_photo_5", "url_photo_6"]'>
          </navavikara-kartu-dep>
          <navavikara-kartu-dep 
            title="DD" 
            description="Bidang digital dan manager media sosial"
            url="./dd"
            jumlah-fungsio="6"
            nama-kadep="Hasan"
            banner="./hero.jpg"
            photo-kadep="url_photo_kadep"
            nama-sekdep="Amanda"
            nama-fungsio='["Hanik", "Nama Fungsio 2", "Nama Fungsio 3", "Nama Fungsio 4", "Nama Fungsio 5", "Nama Fungsio 6"]'
            photo-fungsio='["./PH_Sekretaris_Bebas_Hanik.jpg", "./PH_Sekretaris_Bebas_Hanik.jpg", "url_photo_3", "url_photo_4", "url_photo_5", "url_photo_6"]'>
          </navavikara-kartu-dep>
          <navavikara-kartu-dep 
            title="COMDEV" 
            description="Bidang pengabdian masyarakat"
            url="./cdv"
            jumlah-fungsio="6"
            nama-kadep="Hasan"
            banner="./hero.jpg"
            photo-kadep="url_photo_kadep"
            nama-sekdep="Amanda"
            nama-fungsio='["Hanik", "Nama Fungsio 2", "Nama Fungsio 3", "Nama Fungsio 4", "Nama Fungsio 5", "Nama Fungsio 6"]'
            photo-fungsio='["./PH_Sekretaris_Bebas_Hanik.jpg", "./PH_Sekretaris_Bebas_Hanik.jpg", "url_photo_3", "url_photo_4", "url_photo_5", "url_photo_6"]'>
          </navavikara-kartu-dep>
          <navavikara-kartu-dep 
            title="STD" 
            description="Bidang kepelatihan kepenulisan"
            url="./std"
            jumlah-fungsio="6"
            nama-kadep="Hasan"
            banner="./hero.jpg"
            photo-kadep="url_photo_kadep"
            nama-sekdep="Amanda"
            nama-fungsio='["Hanik", "Nama Fungsio 2", "Nama Fungsio 3", "Nama Fungsio 4", "Nama Fungsio 5", "Nama Fungsio 6"]'
            photo-fungsio='["./PH_Sekretaris_Bebas_Hanik.jpg", "./PH_Sekretaris_Bebas_Hanik.jpg", "url_photo_3", "url_photo_4", "url_photo_5", "url_photo_6"]'>
          </navavikara-kartu-dep>
          <navavikara-kartu-dep 
            title="PRD" 
            description="Bidang hubungan masyarakat"
            url="./prd"
            jumlah-fungsio="6"
            nama-kadep="Hasan"
            banner="./hero.jpg"
            photo-kadep="url_photo_kadep"
            nama-sekdep="Amanda"
            nama-fungsio='["Hanik", "Nama Fungsio 2", "Nama Fungsio 3", "Nama Fungsio 4", "Nama Fungsio 5", "Nama Fungsio 6"]'
            photo-fungsio='["./PH_Sekretaris_Bebas_Hanik.jpg", "./PH_Sekretaris_Bebas_Hanik.jpg", "url_photo_3", "url_photo_4", "url_photo_5", "url_photo_6"]'>
          </navavikara-kartu-dep>
          <navavikara-kartu-dep 
            title="Karya" 
            description="Bidang penghimpun karya anggota"
            url="./karya"
            jumlah-fungsio="6"
            nama-kadep="Hasan"
            banner="./hero.jpg"
            photo-kadep="url_photo_kadep"
            nama-sekdep="Amanda"
            nama-fungsio='["Hanik", "Nama Fungsio 2", "Nama Fungsio 3", "Nama Fungsio 4", "Nama Fungsio 5", "Nama Fungsio 6"]'
            photo-fungsio='["./PH_Sekretaris_Bebas_Hanik.jpg", "./PH_Sekretaris_Bebas_Hanik.jpg", "url_photo_3", "url_photo_4", "url_photo_5", "url_photo_6"]'>
          </navavikara-kartu-dep>
          <navavikara-kartu-dep 
            title="RED" 
            description="Bidang produk kewirausahaan"
            url="./karya"
            jumlah-fungsio="6"
            nama-kadep="Hasan"
            banner="./hero.jpg"
            photo-kadep="url_photo_kadep"
            nama-sekdep="Amanda"
            nama-fungsio='["Hanik", "Nama Fungsio 2", "Nama Fungsio 3", "Nama Fungsio 4", "Nama Fungsio 5", "Nama Fungsio 6"]'
            photo-fungsio='["./PH_Sekretaris_Bebas_Hanik.jpg", "./PH_Sekretaris_Bebas_Hanik.jpg", "url_photo_3", "url_photo_4", "url_photo_5", "url_photo_6"]'>
          </navavikara-kartu-dep>
        </div>
    `
    }

}

customElements.define("navavikara-list-departement", ListDepartement)

class DeksripsiStory extends PolymerElement {
    static get template() {
        return html`
          <style>
            .modal {
                display: none;
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 100%;
                height: max-content;
                z-index: 999;
                transform: translate(-50%);
            }
            
            .modal-content {
                position: absolute;
                bottom: 0px;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 85%;
                border-radius: 20px;
            }

            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
                z-index: 1;
            }
            
            .close-button:hover {
                color: #555555;
            }

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/HRD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
            
            @media (prefers-color-scheme: dark) {
                .modal-content {
                    background: #161b22;
                    color: #f4f4f4;
                }
                .modal-button-li {
                    background-color: #161b22;
                    color: #0f0f0f;
                }

            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal" aria-label="Close" title="Close">&#215;</button>
                        <ukmp-text class="text-wrapper" text="[[namaDepartemen]]">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="list-item">
                        <div class="site-header">
                            <div class="chips-nav">
                                <button aria-labelledby="mundur" aria-label="mundur" title="mundur" class="chips-nav__prev"><i
                                        class="fas fa-chevron-left"></i></button>
                                <button aria-labelledby="maju" aria-label="maju" title="maju" class="chips-nav__next"><i
                                        class="fas fa-chevron-right"></i></button>
                            </div>
                        </div>
                        <span>
                            <br>
                        </span>
                        <span>
                            <br>
                        </span>
                        <ukmp-text class="text-wrapper-justity" text="Kegiatan Upgrading adalah kegiatana peningkatan mutu, pengetahuan dan ilmu berorganisasi dalam suatu organisasi">Kegiatan Upgrading adalah kegiatana peningkatan mutu, pengetahuan dan ilmu berorganisasi dalam suatu organisasi</ukmp-text>
                        <span>
                            <br>
                        </span>
                        <ukmp-text class="text-wrapper-justity" text="Tema Kegiatan Upgrading ini yaitu Melangkah Dalam Kolaborasi Untuk Meningkatkan Harmonisasi Fungsionaris UKM Penelitian UNNES">Tema Kegiatan Upgrading ini yaitu Melangkah Dalam Kolaborasi Untuk Meningkatkan Harmonisasi Fungsionaris UKM Penelitian UNNES</ukmp-text>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper" text="Anggota HRD">Anggota HRD</ukmp-text>
                            <button class="modal-button-li" aria-label="Selanjutnya" title="Selanjutnya" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text text="Lihat Selengkapnya">Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/Zikri Wildan Setiadi_HRD.JPG"></image-component>
                            <image-component src="/../../images/Nina Martian Ningsih _HRD.JPG"></image-component>
                            <button class="button chil-button-prev" on-click="showHome" aria-label="Selanjutnya" title="Selanjutnya">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/Abrar Rizq_HRD.jpg"></image-component>
                            <image-component src="/../../images/Puti Sekar Arginingrum_HRD.png"></image-component>
                            <button class="button chil-button-next" on-click="prevHome" aria-label="Selanjutnya" title="Selanjutnya">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button class="button chil-button-prev" on-click="prevHome2" aria-label="Selanjutnya" title="Selanjutnya">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/BENI AJI SUBEKTI_HRD 2.jpeg"></image-component>
                            <image-component src="/../../images/Rikha Fitriani Umayatun_HRD.jpeg"></image-component>
                            <button class="button chil-button-next" on-click="prevHome" aria-label="Selanjutnya" title="Selanjutnya">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_namaDepartemenChanged'  // added observer
            },
            deskripsiDepartemen: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_deskripsiDepartemenChanged'  // added observer
            },
            imageSrc: String,
        };
    }

    // observer function for namaDepartemen property
    _namaDepartemenChanged(newVal) {
        // code to handle the updated value of namaDepartemen
        const ukmpTextElement = this.shadowRoot.querySelector('ukmp-text');
        if (ukmpTextElement) {
            ukmpTextElement.setAttribute('text', newVal);
        }
    }

    _deskripsiDepartemenChanged(hallo) {
        // code to handle the updated value of namaDepartemen
        const Hal = this.shadowRoot.querySelector('ukmp-text #deskripsi');
        if (Hal) {
            Hal.setAttribute('text', hallo);
        }
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.namaDepartemen = this.getAttribute("nama-departemen");
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }
        this.deksripsiDepartemen = this.getAttribute("deskripsi-departemen");
        this._namaDepartemenChanged(this.namaDepartemen);  // initial call to the observer function
        this._deskripsiDepartemenChanged(this.deksripsiDepartemen);  // initial call to the observer function
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }

    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
        this.moni.style.transform = `translateY(${deltaY}px)`
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}
customElements.define("deskripsi-story", DeksripsiStory);

class UkmpContent extends PolymerElement {
    static get template() {
        return html`
    <style>
      :host {
        display: block;
        box-sizing: border-box;
      }
      #container {
        overflow-y: auto;
      }
      @media only screen and (max-width: 600px) {
        :host {
          display: flex;
          flex-direction: column;
        }
        #container {
          padding: 8px;
          margin-bottom: 16px;
        }
      }
      @media only screen and (max-width: 400px) {
        #container {
          max-width: 100%;
        }
        ::slotted(*) {
          font-size: 16px;
        }
      }
    </style>
    <div id="container">
      <slot name="kartu-harbar"></slot>
      <slot name="kartu-upgrading"></slot>
      <slot name="kartu-pab"></slot>
      <slot name="kartu-hutf"></slot>
      <slot name="kartu-da"></slot>
      <slot name="kartu-prestasi"></slot>
      <slot name="kartu-medsos"></slot>
      <slot></slot>
    </div>
  `;
    }
}
customElements.define("ukmp-content", UkmpContent);

class UKMPKartuMedsosUk extends PolymerElement {
    constructor() {
        super();
        this.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
        this.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
        this._addShadowBox();
    }

    handleMouseEnter() {
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        h3.classList.add("show");
        p.classList.add("show");
        a.classList.add("show");
    }

    handleMouseLeave() {
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        h3.classList.remove("show");
        p.classList.remove("show");
        a.classList.remove("show");
    }

    static get template() {
        return html`
        <style>
          :host {
            display: block;
            --card-height: 170px;
            --card-width: calc(var(--card-height) / 1.5);
            --card-header-color: #1A202C;
            --card-body-color: #1A202C;
            --card-link-color: #1A202C;
            --card-dark-background-color: #161b22;
            --card-dark-color: #f4f4f4;
            --card-header-color-black: #000000;
            --card-body-color-black: #000000;
            --card-link-color-black: #000000;
            --card-skeleton-color: #f4f4f4; /* Warna skeleton */
            --card-skeleton-color-alt: #e0e0e0; /* Warna skeleton alternatif */
          }
            
          .card {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: relative;
            width: var(--card-width);
            height: var(--card-height);
            background-color: var(--card-skeleton-color, #f4f4f4); /* Tambahkan background-color skeleton */
            box-shadow: var(--card-box-shadow, none);
            background-image: var(--card-background-image, url(""));
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            color: var(--card-color, #000000);
            border-radius: 10px;
            padding: 20px;
            animation: skeleton-animation 1.5s infinite linear; /* Tambahkan animasi skeleton */
          }
          
          @keyframes skeleton-animation {
            0% {
              background-color: var(--card-skeleton-color, #f4f4f4);
            }
            50% {
              background-color: var(--card-skeleton-color-alt, #e0e0e0); /* Tambahkan warna skeleton alternatif */
            }
            100% {
              background-color: var(--card-skeleton-color, #f4f4f4);
            }
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
            filter: blur(10px);
            z-index: -1;
          }
  
          @media (prefers-color-scheme: dark) {
            .card {
              --card-color: var(--card-dark-color, #f4f4f4);
              --card-background-color: var(--card-dark-background-color, #161b22);
              --card-background-image: var(--card-dark-background-image, url("") 0.1);
              box-shadow: var(--card-box-shadow, none);
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
            font-size: 12px;
            margin-top: 0;
            color: var(--card-body-color, #1A202C);
          }
          
          .card-link {
            color: var(--card-link-color, #BFBFBF);
            font-weight: bold;
            text-decoration: none;
            color: var(--card-link-color, #1A202C);
            font-size: 13px;
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
        <div class="card" style$="background-image: url([[backgroundImage]]);"> <!-- Hapus tanda kutip ganda ekstra di sini -->
          <h3 class="card-header" style$="color: [[colorH]];">[[title]]</h3>
          <p class="card-body" style$="color: [[colorP]];">[[description]]</p>
          <a href="[[url]]" class="card-link" style$="color: [[colorA]];">Lihat Selengkapnya</a>
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
            },
            modal: {
                type: Boolean,
                value: false,
                observer: '_modalChanged',
            },
            namaOrang: {
                type: String,
                value: '',
            },
            jenisPrestasi: {
                type: String,
                value: '',
            },
            tahunPrestasi: {
                type: String,
                value: '',
            },
            juaraPrestasi: {
                type: String,
                value: '',
            },
        }
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
            this.resetModalPosition();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
    }

    resetModalPosition() {
        this.modal.style.transform = "";
    }


    closeModal() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.remove("modal");
        modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
        document.documentElement.style.overflowY = ""; // Menghapus gaya overflow-y: hidden dari tag <html>
    }

    _modalChanged(modal) {
    }

    _addShadowBox() {
        const cardElement = this.shadowRoot.querySelector(".card");
        const imgElement = new Image();
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = this.backgroundImage;
        imgElement.addEventListener("load", () => {
            const canvas = document.createElement("canvas");
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            const context = canvas.getContext("2d");
            context.drawImage(imgElement, 0, 0);

            const imageData = context.getImageData(0, 0, imgElement.width, imgElement.height).data;
            const numPixels = imgElement.width * imgElement.height;
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
            const boxShadowValue = `0 0 50px ${avgColor}`;

            cardElement.style.setProperty("--card-box-shadow", boxShadowValue);
            cardElement.style.removeProperty("background-color"); // Hapus background-color skeleton setelah gambar dimuat
        });
    }
}
customElements.define("kartu-medsos", UKMPKartuMedsosUk);

class UKMPKartu extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
        .card {
          background: #ffffff;
          color: #000000;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
               0px 6px 10px rgba(0, 0, 0, 0.1);
        }
  
        @media (prefers-color-scheme: dark) {
          .card {
            background: #161b22;
            color: #f4f4f4;
          }
        }
  
        .card:hover {
          transform: translateY(-5px);
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
          color: #BFBFBF;
          font-weight: bold;
          text-decoration: none;
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
      <div class="card">
        <h3 class="card-header">[[title]]</h3>
        <p class="card-body">[[description]]</p>
        <a href="[[url]]" class="card-link">Lihat Selengkapnya</a>
      </div>
    `
    }
    static get properties() {
        return {
            title: String,
            description: String,
            url: String
        }
    }
}
customElements.define("ukmp-kartu", UKMPKartu);

class UKMPKartuSosPres extends PolymerElement {
    constructor() {
        super();
        this.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
        this.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
        this.addEventListener('click', this.showPrestasiDetail)
        this.addEventListener('dbclick', this.cancelPrestasiDetail)
    }

    connectedCallback() {
        super.connectedCallback();
        this._addShadowBox();
        this.modal = this.shadowRoot.getElementById("Prestasi");
        this.modal.addEventListener("click", this.handleOutsideClick.bind(this));
    }

    showPrestasiDetail() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.add("modal");
        document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
    }

    cancelPrestasiDetail() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.remove("modal");
        document.documentElement.style.overflowY = ""; // Menambahkan gaya overflow-y: hidden pada tag <html>
        this.closeModal();
    }
    handleOutsideClick(event) {
        if (event.target === this.modal) {
            this.closeModal();
            this.cancelPrestasiDetail();
        }
    }

    handleMouseEnter() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        modal.classList.add("modal")
        h3.classList.add("show");
        p.classList.add("show");
        a.classList.add("show");
        document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
    }

    handleMouseLeave() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        h3.classList.remove("show");
        modal.classList.remove("modal")
        p.classList.remove("show");
        a.classList.remove("show");
        document.documentElement.style.overflowY = ""; // Menambahkan gaya overflow-y: hidden pada tag <html>
        this.closeModal();
    }

    static get template() {
        return html`
        <style>
          :host([modal]:not([nama-orang]):not([jenis-prestasi]):not([tahun-prestasi]):not([juara-prestasi])) #Prestasi {
            display: none;
          }

          :host {
            display: block;
            --card-height: 170px;
            --card-width: calc(var(--card-height) / 1.5);
            --card-header-color: #1A202C;
            --card-body-color: #1A202C;
            --card-link-color: #1A202C;
            --card-dark-background-color: #161b22;
            --card-dark-color: #f4f4f4;
            --card-header-color-black: #000000;
            --card-body-color-black: #000000;
            --card-link-color-black: #000000;
            --card-skeleton-color: #f4f4f4; /* Warna skeleton */
            --card-skeleton-color-alt: #e0e0e0; /* Warna skeleton alternatif */
          }
            
          .card {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: relative;
            width: var(--card-width);
            height: var(--card-height);
            background-color: var(--card-skeleton-color, #f4f4f4); /* Tambahkan background-color skeleton */
            box-shadow: var(--card-box-shadow, none);
            background-image: var(--card-background-image, url(""));
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            color: var(--card-color, #000000);
            border-radius: 10px;
            padding: 20px;
            animation: skeleton-animation 1.5s infinite linear; /* Tambahkan animasi skeleton */
          }
          
          @keyframes skeleton-animation {
            0% {
              background-color: var(--card-skeleton-color, #f4f4f4);
            }
            50% {
              background-color: var(--card-skeleton-color-alt, #e0e0e0); /* Tambahkan warna skeleton alternatif */
            }
            100% {
              background-color: var(--card-skeleton-color, #f4f4f4);
            }
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
            filter: blur(10px);
            z-index: -1;
          }

          #Prestasi {
            display: none;
          }

          #Prestasi.modal {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
        
        .modal-content {
            position: absolute;
            bottom: 70px;
            left: 50%;
            transform: translate(-50%);
            background-color: #fff;
            padding: 10px;
            width: 340px;
            border-radius: 30px;
        }

        .indentitas-prestasi {
            display: flex;
            align-items: center;
            width: max-content;
            position: relative;
            left: -50%;
            transform: translateX(50%);
        }

        .swipe-indicator {
            position: absolute;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 8px;
            background-color: #cccccc;
            border-radius: 40px;
        }

        .header-prestasi {
            display: flex;
            align-items: center;
            margin-top: 12px;
            position: relative;
            justify-content: space-between;
            height: 60px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
          }
        
          th, td {
            padding: 10px;
            text-align: left;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            color: white;
          }

          tr {
            background-color: #08487b;
          }
        
          th {
            text-align: center;
            background-color: #0056b3;
          }

        image-component {
            width: 50px;
            height: 50px;
            background-size: cover;
        }

        .tahun {
            color: black;
        }

        .body-prestasi {
            display: block;
        }
  
          @media (prefers-color-scheme: dark) {
            .card {
              --card-color: var(--card-dark-color, #f4f4f4);
              --card-background-color: var(--card-dark-background-color, #161b22);
              --card-background-image: var(--card-dark-background-image, url("") 0.1);
              box-shadow: var(--card-box-shadow, none);
            }

            .tahun {
                color: white;
            }

            .modal-content {
                background-color: #161b22;
            }

            th, td {
                color: white;
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
            font-size: 12px;
            margin-top: 0;
            color: var(--card-body-color, #1A202C);
          }
          
          .card-link {
            color: var(--card-link-color, #BFBFBF);
            font-weight: bold;
            text-decoration: none;
            color: var(--card-link-color, #1A202C);
            font-size: 13px;
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
        <div id="Prestasi" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
            <div class="modal-content">
                <div class="swipe-indicator"></div>
                <div class="header-prestasi">
                <image-component style$="background-image: url([[backgroundImage]]);"></image-component>
                <div class="indentitas-prestasi">
                    <image-component src="https://apps.ukmpenelitianunnes.com/logo/6.png" alt=""></image-component>
                    <ukmp-text class="tahun" text$="Prestasi [[tahunPrestasi]]">[[title]]</ukmp-text>
                </div>
                </div>
                <div class="body-prestasi">
                <table>
                    <tr>
                    <th>Nama</th>
                    <th>Jenis Prestasi</th>
                    <th>Tahun Prestasi</th>
                    <th>Juara Prestasi</th>
                    </tr>
                    <tr>
                    <td>[[namaOrang]]</td>
                    <td>[[jenisPrestasi]]</td>
                    <td>[[tahunPrestasi]]</td>
                    <td>[[juaraPrestasi]]</td>
                    </tr>
                </table>
                </div>
            </div>
        </div>
        <div class="card" style$="background-image: url([[backgroundImage]]);"> <!-- Hapus tanda kutip ganda ekstra di sini -->
          <h3 class="card-header" style$="color: [[colorH]];">[[title]]</h3>
          <p class="card-body" style$="color: [[colorP]];">[[description]]</p>
          <a href="[[url]]" class="card-link" style$="color: [[colorA]];">Lihat Selengkapnya</a>
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
            },
            modal: {
                type: Boolean,
                value: false,
                observer: '_modalChanged',
            },
            namaOrang: {
                type: String,
                value: '',
            },
            jenisPrestasi: {
                type: String,
                value: '',
            },
            tahunPrestasi: {
                type: String,
                value: '',
            },
            juaraPrestasi: {
                type: String,
                value: '',
            },
        }
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
            this.resetModalPosition();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
    }

    resetModalPosition() {
        this.modal.style.transform = "";
    }


    closeModal() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.remove("modal");
        modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
        document.documentElement.style.overflowY = ""; // Menghapus gaya overflow-y: hidden dari tag <html>
    }

    _modalChanged(modal) {
    }

    _addShadowBox() {
        const cardElement = this.shadowRoot.querySelector(".card");
        const imgElement = new Image();
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = this.backgroundImage;
        imgElement.addEventListener("load", () => {
            const canvas = document.createElement("canvas");
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            const context = canvas.getContext("2d");
            context.drawImage(imgElement, 0, 0);

            const imageData = context.getImageData(0, 0, imgElement.width, imgElement.height).data;
            const numPixels = imgElement.width * imgElement.height;
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
            const boxShadowValue = `0 0 50px ${avgColor}`;

            cardElement.style.setProperty("--card-box-shadow", boxShadowValue);
            cardElement.style.removeProperty("background-color"); // Hapus background-color skeleton setelah gambar dimuat
        });
    }
}
customElements.define("ukmp-story-prestasi", UKMPKartuSosPres);

class UKMPKartuSos extends PolymerElement {
    constructor() {
        super();
        this.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
        this.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
        this._addShadowBox();
    }

    handleMouseEnter() {
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        h3.classList.add("show");
        p.classList.add("show");
        a.classList.add("show");
    }

    handleMouseLeave() {
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        h3.classList.remove("show");
        p.classList.remove("show");
        a.classList.remove("show");
    }

    static get template() {
        return html`
        <style>
          :host {
            display: block;
            --card-height: 170px;
            --card-width: calc(var(--card-height) / 1.5);
            --card-header-color: #1A202C;
            --card-body-color: #1A202C;
            --card-link-color: #1A202C;
            --card-dark-background-color: #161b22;
            --card-dark-color: #f4f4f4;
            --card-header-color-black: #000000;
            --card-body-color-black: #000000;
            --card-link-color-black: #000000;
            --card-skeleton-color: #f4f4f4; /* Warna skeleton */
            --card-skeleton-color-alt: #e0e0e0; /* Warna skeleton alternatif */
          }
            
          .card {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: relative;
            width: var(--card-width);
            height: var(--card-height);
            background-color: var(--card-skeleton-color, #f4f4f4); /* Tambahkan background-color skeleton */
            box-shadow: var(--card-box-shadow, none);
            background-image: var(--card-background-image, url(""));
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            color: var(--card-color, #000000);
            border-radius: 10px;
            padding: 20px;
            animation: skeleton-animation 1.5s infinite linear; /* Tambahkan animasi skeleton */
          }
          
          @keyframes skeleton-animation {
            0% {
              background-color: var(--card-skeleton-color, #f4f4f4);
            }
            50% {
              background-color: var(--card-skeleton-color-alt, #e0e0e0); /* Tambahkan warna skeleton alternatif */
            }
            100% {
              background-color: var(--card-skeleton-color, #f4f4f4);
            }
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
            filter: blur(10px);
            z-index: -1;
          }
  
          @media (prefers-color-scheme: dark) {
            .card {
              --card-color: var(--card-dark-color, #f4f4f4);
              --card-background-color: var(--card-dark-background-color, #161b22);
              --card-background-image: var(--card-dark-background-image, url("") 0.1);
              box-shadow: var(--card-box-shadow, none);
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
            font-size: 12px;
            margin-top: 0;
            color: var(--card-body-color, #1A202C);
          }
          
          .card-link {
            color: var(--card-link-color, #BFBFBF);
            font-weight: bold;
            text-decoration: none;
            color: var(--card-link-color, #1A202C);
            font-size: 13px;
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
        <div class="card" style$="background-image: url([[backgroundImage]]);"> <!-- Hapus tanda kutip ganda ekstra di sini -->
          <h3 class="card-header" style$="color: [[colorH]];">[[title]]</h3>
          <p class="card-body" style$="color: [[colorP]];">[[description]]</p>
          <a href="[[url]]" class="card-link" style$="color: [[colorA]];">Lihat Selengkapnya</a>
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
            },
            modal: {
                type: Boolean,
                value: false,
                observer: '_modalChanged',
            },
            namaOrang: {
                type: String,
                value: '',
            },
            jenisPrestasi: {
                type: String,
                value: '',
            },
            tahunPrestasi: {
                type: String,
                value: '',
            },
            juaraPrestasi: {
                type: String,
                value: '',
            },
        }
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
            this.resetModalPosition();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
    }

    resetModalPosition() {
        this.modal.style.transform = "";
    }


    closeModal() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.remove("modal");
        modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
        document.documentElement.style.overflowY = ""; // Menghapus gaya overflow-y: hidden dari tag <html>
    }

    _modalChanged(modal) {
    }

    _addShadowBox() {
        const cardElement = this.shadowRoot.querySelector(".card");
        const imgElement = new Image();
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = this.backgroundImage;
        imgElement.addEventListener("load", () => {
            const canvas = document.createElement("canvas");
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            const context = canvas.getContext("2d");
            context.drawImage(imgElement, 0, 0);

            const imageData = context.getImageData(0, 0, imgElement.width, imgElement.height).data;
            const numPixels = imgElement.width * imgElement.height;
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
            const boxShadowValue = `0 0 50px ${avgColor}`;

            cardElement.style.setProperty("--card-box-shadow", boxShadowValue);
            cardElement.style.removeProperty("background-color"); // Hapus background-color skeleton setelah gambar dimuat
        });
    }
}
customElements.define("ukmp-story", UKMPKartuSos);

class kartuMed extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px 0;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
      </style>
      <ukmp-header-card-story-harbar class="header"></ukmp-header-card-story-harbar>
      <div class="card-grid">
          <ukmp-story title="2023" description="Hari Besar 2023" url="./hariraya" color-H="black" color-A="black" color-P="black" background-Image="../images/harbas/kurban.jpg" image-alt="Hari Raya"></ukmp-story>
          <ukmp-story title="2023" description="Hari Besar 2023" url="./hariraya" color-H="black" color-A="black" color-P="black" background-Image="../images/harbas/eid.jpg" image-alt="Hari Raya"></ukmp-story>
      </div
    `;
    }
}
customElements.define("kartu-harbar", kartuMed);

class kartuPab extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px 0;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
      </style>
      <ukmp-header-card-story-pab class="header"></ukmp-header-card-story-pab>
      <div class="card-grid">
          <ukmp-story title="2022" description="PAB 2022" url="./pabukmp/2022" color-H="black" color-A="white" color-P="white" background-Image="../logo/312086426_5550639028376326_5765999735847858872_n.jpg" image-alt="Hari Raya"></ukmp-story>
          <ukmp-story title="2021" description="PAB 2021" url="./pabukmp/2021" color-H="white" color-A="black" color-P="white" background-Image="../logo/244521759_589536129145018_7560806369087012558_n.jpg"></ukmp-story>
      </div>
    `
    }
}
customElements.define("kartu-pab", kartuPab);

class kartuda extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px 0;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
      </style>
      <ukmp-header-card-story-da class="header"></ukmp-header-card-story-da>
      <div class="card-grid">
          <ukmp-story title="2021" description="Daftar Alumni 2021" url="./daukmp/" color-H="black" color-A="black" color-P="black" background-Image="../logo/116223589_1017768482011615_7046452088022274670_n.jpg" image-alt="Hari Raya"></ukmp-story>
          <ukmp-story title="2020" description="Daftar Alumni 2020" url="./daukmp/" color-H="black" color-A="black" color-P="black" background-Image="../logo/116223589_1017768482011615_7046452088022274670_n.jpg"></ukmp-story>
          <ukmp-story title="2019" description="Daftar Alumni 2019" url="./daukmp/" color-H="black" color-A="black" color-P="black" background-Image="../logo/116223589_1017768482011615_7046452088022274670_n.jpg"></ukmp-story>
      </div>
    `
    }
}
customElements.define("kartu-da", kartuda);

class kartuUpgra extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px 0;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
      </style>
      <ukmp-header-card-story-upgrading class="header"></ukmp-header-card-story-upgrading>
      <div class="card-grid">
        <ukmp-story title="2023" description="Upgrading 2023" url="#" color-H="black" color-A="black" color-P="black" background-Image="/../../images/upgrading.png" image-alt="Upgrading"></ukmp-story>
      </div>
    `
    }
}
customElements.define("kartu-upgrading", kartuUpgra);

class kartuHutf extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px 0;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
      </style>
      <ukmp-header-card-story-hutf class="header"></ukmp-header-card-story-hutf>
      <div class="card-grid">
          <ukmp-story title="2022" description="PAB 2022" url="./pabukmp/2022" color-H="black" color-A="white" color-P="white" background-Image="../logo/312086426_5550639028376326_5765999735847858872_n.jpg" image-alt="Hari Raya"></ukmp-story>
          <ukmp-story title="2021" description="PAB 2021" url="./pabukmp/2021" color-H="white" color-A="black" color-P="white" background-Image="../logo/244521759_589536129145018_7560806369087012558_n.jpg"></ukmp-story>
          <ukmp-story title="2020" description="PAB 2019" url="#" color-H="white" color-A="white" color-P="white" background-Image="../logo/navavikara.webp"></ukmp-story>
      </div>
    `
    }
}
customElements.define("kartu-hutf", kartuHutf);

class kartuMedsos extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px 0;
        }
        .card-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(1, 1fr);
            grid-gap: 20px;
            justify-items: center;
            justify-content: space-around;
        }
        .hidden {
            display: none;
        }

        .card-title {
            font-size: 24px;
            margin-bottom: 10px;
          }

        .dokument-head {
            display: flex;
            align-items: center;
            gap: 5%;
            margin-bottom: 15px
          }
    
          .dokument img {
                width: 35px;
          }
    
          .dokument-head image-component {
                width: 35px;
          }
        .story-button-prev-start {
            background-color: black;
            color: #f0f0f0;
            padding: 5px;
            border: none;
            border-radius: 45px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-right: 10px;
            position: absolute;
            right: 0;
            width: 35px;
            bottom: 10%;
        }
        .story-button-prev-secound {
            background-color: black;
            color: #f0f0f0;
            padding: 5px;
            border: none;
            border-radius: 45px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-right: 10px;
            position: absolute;
            left: 0;
            width: 35px;
            bottom: 10%;
            z-index: 1;
        }
      </style>
      <div class="dokument-head">
        <image-component src="https://apps.ukmpenelitianunnes.com/logo/3.png" alt=""></image-component>
        <div class="card-title">Media Sosial</div>
      </div>
      <div class$="{{storyStartApp}} card-grid">
        <ukmp-story title="YouTube" description="YouTube UKMP" url="#" color-H="white" color-A="white" color-P="white" background-Image="https://ukmpapps.web.app/logo/ukmp-logo-yt.png" image-alt="YouTube UKMP"></ukmp-story>
        <ukmp-story title="Instagram" description="Instagram" url="https://www.instagram.com/ukmp_unnes/" color-H="white" color-A="white" color-P="white" background-Image="https://ukmpapps.web.app/logo/ukmp-logo-ig.webp" image-alt="Instagram"></ukmp-story>
      </div>
      <button class="button story-button-prev-start" on-click="startStory" aria-label="Selanjutnya" title="Selanjutnya">
        <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
      </button>
      <div class$="{{storySecoundApp}} card-grid">
            <button class="button story-button-prev-secound" on-click="secoundStory" aria-label="Selanjutnya" title="Selanjutnya">
                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
            </button>
            <ukmp-story title="Twitter" description="Twitter" url="https://ukmpapps.web.app/tw" color-H="white" color-A="white" color-P="white" background-Image="https://ukmpapps.web.app/logo/ukmp-logo-tw.png" image-alt="Twitter"></ukmp-story>
            <ukmp-story title="Facebook" description="Facebook" url="https://ukmpapps.web.app/fb" color-H="white" color-A="white" color-P="white" background-Image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYCAYAAACHjumMAAAO10lEQVR4Ae3dW4xc913A8d//nJnZi2vvrh3b68SpHcshkESxSSg0FNGQokJDS52KBwqViiN44IE2UMmOys0uQqR5cvtYCeEKQR8QTRqB1AekNEB5qErsBGhpWscbO47Xl716L3M7/1//Z3bXXV9313t+u3PmfD/K3sejzc7Md/7//5n5j5MM9D871t/dLQdUo/0ibpcT3a/i+l34kQDIAR0Kt90hFX3daXxCXOPV4S8ODMkqOblDrahUSp8Vp0+EL58QAB0lxOZkiM2x1cRmxYFZCIs6fZYRClAYx0WSoysNzYoCM3joyl8SFqDA1B0ZfmHj0eWefFmBGTw8tlul9GK6tiIAiu60uOTJ4eeXHs1ES51g8NDUp1XiE8QFwLz7VOPXth0aO7DUCW8bmHRKJM4fZ0oEYLHQhIHIxV9vNeL2p7u5ubjoEQGAWwsHm9zRW63L3DQw2w5NHoicvCgAsDSVSA8O/03fV6//wQ2BmVvQTddcmBYBWB4VGXMuefT6hd+brMHErxAXACuRrsmoRl+//vvXBGZ+wWa3AMAKOXE/O3ho4si135uXTo3C6OW0AMAdSqdKtVqyZ/zYwHj69U9GMBodEQBYhXSq1F2Jnl30NaMXANlZPIqZG8H4+AkBgAwsHsW0AqPOfVYAICvO/XLrA9MjAAa0Wks2R0yPAFjoLscHIo14ljSAzLnQln2RE7dPACBzujtd5N0tAJAxJ9E+AgPAhIr0L7mjHQDcCUdgAFgiMADMEBgAZggMADMEBoAZAgPADIEBYIbAADBDYACYITAAzBAYAGYIDAAzBAaAGQIDwAyBAWCGwAAwQ2AAmCEwAMwQGABmCAwAMwQGgBkCA8AMgQFghsAAMENgAJghMADMEBgAZggMADMEBoAZAgPADIEBYKYkwDpy6ZtrfVR3m9P5uZOKpm8qyAkCA3NpGcqxyI4+aWzbWIru2uiie/qkurk3it/T5Srv6RLp63GNSskltzqPsRnf3UzEzTZEak3V6brUZuqqk7MajcxqZWxaZaYm9fEZdRNVX5muhSi1SuSEHq0fAoNMlSPREAvZvcUl92+P5cHBWO7f6nR7XxQP9LhoQ5dzpVhdybnuUnzNP63c/pyvObEL7egKoxrx4V2i6tL/GonE1YZKiI+G+PjJqjZGprQ8PJlEo9Oudm7Cly9OeDc2K83L01oOP9d6U109aZ0fDBAYrFpvWXTP1sg/tqukj+2M3P57Y7l3c1oQF9/8X7ir7+5UmFa1zjwO78rz59dTltKm7oWznfvx3Oetq3l3+s6raIhQNDIdRjoz0nh7NInOjKk7O+b9u+NavjSljeFJLV2e8ml4sEpu8PAk7caKlcLhgTQqTz1USj76cFnu2xKVeirhdr+qbKyfhRFMPQyH0vj84ddm9TtDPqf/N21DGcFg2dJb2+Ze0Y/tqySffKwsD+6I4jDNKUsHWAhjV5i7bdngZEMlcq2lZawKgcGS4nBTe2Aw8p/YX/ZP7ytFg2E9Jdz8uHfHkggMbim9D39ge+w/+b6y/42HStHd/Y7rC1aEKwxukA5NwpEg/YMPlP2nfqEiWzeGgz4CrByBwTXSxdsP/3TJf/4jXemRocgJUyHcOQKDq3ZtjvznfrWsT++vRCE0PI0Eq0Zg0BqifPD+2P/Vb3br3q1RLEBGCEzBbaiI/M7PV5qf+1BXvKmbUQuyRWAKrK9H9I+f7NJnfrESl2PWWpA9AlNQA73O//XHu5OPPxKXI9ICIwSmgAbCyOUrv9utH9gTl3P72H7kAoEpmHRa9PcHe5uPvTfmsoc5FvUK5K4NTr54oDuZjwtDF5jjXqwgKuGS/syvdPmPPVLmMseaYQRTAOlQ5ZnHK41PP152LOhiLRGYAnjq4ZJ/9smuUoVD0VhjBKbD3bs58s99uOLC4i5xwZojMB0sjFj0z3+92+/dxqP/sT4ITIdKhyu/9lDJP/VwumstoxesDwLToe7uj/yffaRb4oi4YP0QmA6UbnH5qfeV9N5+x9wI64rAdKB0/9zfe7wS8SwArDcC02HKsdOD76+kL35GXrDuCEyH2bcz8h99pMRzGNEWCEwHiVprL2Xp73FcrmgLXBE7yM6ByH/wp3gBALQPAtNBfvvnSn5wE5MjtA8C0yG6SqJP7yuncSEwaBsEpkPs31lKdm2JuDzRVrhCdoD0gXW/9WhJeJE0tBsC0wHu2ij65AMxlyXaDlfKDvAz22PdvolD02g/XClzLj1m9P7dscYcPEIbIjA5t6Hi9Jf2llSANsQG0DmX7li3d3thd9rVakN9IxFXa2Z3Z1lrqtQTmp0FApNzj9wdaV+36+jLUcNtvelFhydV37zgm6+9k7jvn0/c0KiPrlQlmalrFEKT3Whc08gIMkBgcu7BHZ372JcQFj112ftvfq+p//b/TfeD4SQExZUT1cUjtoqgbRGYHEvXdR/cUUqkw9bSwgBCT5xJ9B+/29RX3my68xMa6dWoMHXJEwKTY/09LtnZYbvWjc+q//Irdf2n15ru8pRnR76cIzA5ds+Ak8290hHSccmJs0ly+MWa+7/zSawMVDoCgcmxB7ZFvquS/wXeNCYvv9H0n/9GNRqdUR7Q00EITI7t2hy5rpxPItK4/Mv/hri8PBviIugwPNAup9IF3p19Ue63Zzh5LkmO/mtNRqcFHYjA5FS44HTHgGtIjs02xD8X1lzOjXuuhx2KCzan0hdU6++JuiTH/vbbdf2fdxOugx2MCzenSmHtpbec3wXRH170/iv/WY84WtTZCExOVWLnN/Xkc4rU9CovvdHwl6Y4YtTpCExOhSmSdpfzefu8MCn+n/+7wYPoCoDD1DlViiRK3ySHvjPU1LPjyp1bARCYnEoXefO4SWa65vIfP0rEs/ZSCNyL5FR/r5M87gIzOqP63TNN1l4KgsDkVF63mHpnzDffnWD4UhQEBmvqBxc0qta53hUFFzTWVDqCYf2lOAgM1tT5Sd9FX4qDwGBNjc+QlyIhMFgz6R67taYmgsIgMFgzaWDqXtivv0AIDAAzBAaAGQIDwAyBAWCGwAAwQ2AAmCEwAMwQGABmCAwAMwQGgBkCA8AMgQFghsAAMENgAJghMADMEBgAZggMADMEBoAZAgPADIEBYIbAADBDYACYITAAzBAYAGYIDAAzBAaAmZJgST0l0fdujiSOxUmbuG9L1D6/zDK58Avv2RK7SztU2tXFSdXL05q3P23bcoOHJ9v30m4Te7dG9W/+UW9pQ8Ux4utwf/pyNfm7/2rE3CgyodxglsmJ4zrX4VRFz42Fd4KsEBhgXrWpMjzpBdkhMMC82Yb4i1OM6rPEHxOYd35M/VRNmSFliMAA84ZGk2iqxm0iS/wxgXlvXtQm45dsERhg3vfOJ2VBpggMIK1D1GGKpIkgUwQGCEJfdHhCeWR7xggMEIxMS2OqymNgskZggODceFKq+dw9vavtERggOHUpqXMEKXsEBpD0CJJUBJkjMCi8phd/6nJSF2SOwKDwqg2NTl3yXYLMERgU3lTdNS5d8azAGCAwKLwLE+EIUuI4gmSAwKDwRqa1WW+yTaYFAoPCe+uyRhyitkFgUGjpNplvj/qEvtggMCi0alPkR5d8LDBBYFBoM3X158Z5DpIVAoNCCwu8cmGSBV4rBAaFdvGK6pUaG31b4Q+LQgvrL8IRJDsEBoV2ZiRhemSIwKDQ3hlj/GKJwKCwvIo/O876iyX+uCis0SnvR2d4kqMlAoPCOjOubmJWeJCdIQKDwjoz6pNZNso0RWBQWKcua9xgo29TBAaFlL4O0tn0SY6MX0wRGBRSM1F3esTzUrHGCAwKqZGITzeaEpgiMCikqZrIyBQvFWuNwKCQzk/4xiwvVGKOwKCQvn9By3XPNg3WCAwK6fSlpMYRJHsEBoX0xrtJt8Aci1zLMNtQ98PLSb230j497ilLdM8m15WzV/PRd8Z8fTZx67pHpfcqQyOaHqLm+m/MDR6eZKC4DJt6pK02bn14Ryxfe6YnqpTyUxjvxf/+P8zWv/1Wc31faF5bR5Fc6AxrMLY4TLdck7PtNZ2crKrk8Z5hJowG2+1vCTtc0ADMEBgAZggMADMEBoAZAgPADIEBYIbAADBDYACYITAAzBAYAGYIDAAzBAaAGQIDwAyBAWCGwAAwQ2AAmCEwAMwQGABmCAwAMwQGgBkCA8AMgQFghsAAMENgAJghMADMEBgAZggMADMEBoAZAgPADIEBYIbAADBDYACYITAAzBAYAGYIDAAzBAaAGQIDwAyBAWCGwAAwQ2AAmCEwAMwQGABmCAwAMwQGgBkCA8AMgQFghsAAMENgAJghMADMEBgAZggMADMEBoAZAgPADIEBYIbAADBDYACYITAAzBAYAGYIDAAzBAaAGQIDwAyBAWCGwAAwQ2AAmCEwAMwQGABmCAwAMwQGgJlIRcYFAAxEjsAAsDGUjmBOCgBkbyiswejbAgAZU9HXI+cdIxgAWVMXycmo2kheEgDImvpXo/FjA+ki77cEADISpkcnh58fGJp7HIzXVwUAspFOj76UftIKTLXhj/F4GACZCdOj9EMrMOk0yXn9kgDA6h1Pp0fpJ1efKsAoBkAGVFzyhYUvrgamNYpRRjEAVsHpFxZGL6lrnuw4/ELfEVU9IQCwYvrW8PN9RxZ/54ZnU7vIfyJMlcYEAJYpHJYeE+c/dP33bwhMOrxxLvkTAYDlCRMff3Dx1GjBTfeDCSc8HuZSRwUAbk/TVlx8YeAbN/vhLTecas2l5iKjAgA3asUltOKWg5Hb7miXRsZrwpoMgGvMrbnIwdvFJbXklplh6PNSWJN5NJzlaQFQeCEurznnHx1+ftNXlzptSZZhfvFmz+BzE0dE3V+Ez50AKJR01OKcfPnCdYeib2dFm37Prcske8Ka8XGZW5thfQbLxpUln+amQ3q0VvN7hlcQl9SyRjCLzY9mDg4+N5bOvZ5QH33GObd//seMbID8W7gv+FYIy7/Xqv7Y/LYuK7biwCyYD83x9C3EZreksdFonxO3L/x+4Wu3W4BrqTDybTthhDKebv4fDgmdTLfQDesrr1er8tKdRmWxHwO0n4c3jfnW/gAAAABJRU5ErkJggg==" image-alt="Facebook"></ukmp-story>
            <button class="button story-button-prev-start" on-click="secoundStorynex" aria-label="Selanjutnya" title="Selanjutnya">
                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
            </button>
      </div>
      <div class$="{{storyTreeApp}} card-grid">
        <button class="button story-button-prev-secound" on-click="treeStory" aria-label="Selanjutnya" title="Selanjutnya">
            <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
        </button>
        <ukmp-story title="TikTok" description="TikTok" url="https://www.tiktok.com/@ukmp.unnes1" color-H="white" color-A="white" color-P="white" background-Image="https://ukmpapps.web.app/logo/ukmp-logo-tiktok.png" image-alt="TikTok"></ukmp-story>
        <ukmp-story title="LinkTree" description="LinkTree" url="https://linktr.ee/UKMPenelitianUNNES" color-H="white" color-A="white" color-P="white" background-Image="https://ukmpapps.web.app/logo/navavikara.webp" image-alt="LinkTree"></ukmp-story>
      </div>
    `;
    }
    static get properties() {
        return {
            storyStartApp: {
                type: String,
                value: ""
            },
            storySecoundApp: {
                type: String,
                value: "hidden"
            },
            storyTreeApp: {
                type: String,
                value: "hidden"
            }
        };
    }

    startStory() {
        this.storyStartApp = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.storySecoundApp = "";
    }

    secoundStory() {
        this.storySecoundApp = "hidden";
        this.storyStartApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    secoundStorynex() {
        this.storySecoundApp = "hidden";
        this.storyTreeApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    treeStory() {
        this.storyTreeApp = "hidden";
        this.storySecoundApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.secoundStory();
        }
        this.addEventListener("button-clicked", this.handleButtonClick);
    }
}
customElements.define("navavikara-medsos", kartuMedsos);

class kartuPres extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px 0;
        }
        .card-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(1, 1fr);
            grid-gap: 20px;
            justify-items: center;
            justify-content: space-around;
        }
        .hidden {
            display: none;
        }
        .story-button-prev-start {
            background-color: black;
            color: #f0f0f0;
            padding: 5px;
            border: none;
            border-radius: 45px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-right: 10px;
            position: absolute;
            right: 0;
            width: 35px;
            transform: translateY(80px);
        }
        .story-button-prev-secound {
            background-color: black;
            color: #f0f0f0;
            padding: 5px;
            border: none;
            border-radius: 45px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-right: 10px;
            position: absolute;
            left: 0;
            width: 35px;
            z-index: 1;
            transform: translateY(80px);
        }
      </style>
      <ukmp-header-card-story-prestasi class="header"></ukmp-header-card-story-prestasi>
      <div class$="{{storyStartApp}} card-grid">
        <ukmp-story-prestasi title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/353822697_1290665238496493_6227867768103515191_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Jabar" jenis-prestasi="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-story-prestasi>
        <ukmp-story-prestasi title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/353861515_640079521512682_3370790497817475094_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Fajar" jenis-prestasi="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-story-prestasi>
        <button class="button story-button-prev-start" on-click="startStory" aria-label="Selanjutnya" title="Selanjutnya">
          <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
        </button>
      </div>
      <div class$="{{storySecoundApp}} card-grid">
            <button class="button story-button-prev-secound" on-click="secoundStory" aria-label="Selanjutnya" title="Selanjutnya">
                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
            </button>
            <ukmp-story-prestasi title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/353880985_1258843091438694_2786285672251724551_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Hasan" jenis-prestasi="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-story-prestasi>
            <ukmp-story-prestasi title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/354013433_626073636154699_356598338880584908_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Hanina" jenis-prestasi="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-story-prestasi>
            <button aria-label="Selanjutnya" title="Selanjutnya" class="button story-button-prev-start" on-click="secoundStorynex">
                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
            </button>
      </div>
      <div class$="{{storyTreeApp}} card-grid">
        <button aria-label="Selanjutnya" title="Selanjutnya" class="button story-button-prev-secound" on-click="treeStory">
            <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
        </button>
        <ukmp-story-prestasi title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/354436069_6435225773224205_7802162265042735503_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Evin" jenis-prestasi="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-story-prestasi>
        <ukmp-story-prestasi title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/354508328_802993194507779_8681963008183073113_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Intan" jenis-prestasi="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-story-prestasi>
      </div>
    `;
    }
    static get properties() {
        return {
            storyStartApp: {
                type: String,
                value: ""
            },
            storySecoundApp: {
                type: String,
                value: "hidden"
            },
            storyTreeApp: {
                type: String,
                value: "hidden"
            }
        };
    }

    startStory() {
        this.storyStartApp = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.storySecoundApp = "";
    }

    secoundStory() {
        this.storySecoundApp = "hidden";
        this.storyStartApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    secoundStorynex() {
        this.storySecoundApp = "hidden";
        this.storyTreeApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    treeStory() {
        this.storyTreeApp = "hidden";
        this.storySecoundApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.secoundStory();
        }
        this.addEventListener("button-clicked", this.handleButtonClick);
    }
}
customElements.define("kartu-prestasi", kartuPres);

class UkmpHeaderCardSto extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Story UKMP"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" href="https://ukmpapps.web.app/su" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story", UkmpHeaderCardSto);

class UkmpHeaderCardSosPab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Penerimaan Anggota Baru"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-pab", UkmpHeaderCardSosPab);

class UkmpHeaderCardSosHarbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Hari Besar"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-harbar", UkmpHeaderCardSosHarbar);

class UkmpHeaderCardSosDa extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Daftar Alumni"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-da", UkmpHeaderCardSosDa);

class UkmpHeaderCardSosMedsos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Media Sosial UKMP"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-medsos", UkmpHeaderCardSosMedsos);

class UkmpHeaderCardSosPres extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Prestasi UKMP"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-prestasi", UkmpHeaderCardSosPres);

class UkmpHeaderCardSosUpgradingr extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Upgrading"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-upgrading", UkmpHeaderCardSosUpgradingr);

class UkmpHeaderCardSosHutf extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Hari Ulang Tahun"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-hutf", UkmpHeaderCardSosHutf);

class Card extends PolymerElement {
    static get template() {
        return html`
        <style>
        .card-container {
            display: flex;
            justify-content: space-between;
            background-color: #0d1117;
            color: #0d1117;
            overflow-x: hidden;
          }

          .modal-button {
            width: max-content;
            padding: 20px 0 0px 0;
            height: 185px;
            background-color: white;
            border-radius: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin: 0 5px;
          }
          
          .card-content {
            height: 200px;
          }
          
          iframe {
            width: 100%;
            height: 100%;
            border: none;
            overflow: hidden;
            margin-top: 10px
          }
          .text-wrapper {
            color: #545454;
            font-weight: 800;
            margin-bottom: 20px
          }         
        </style>
        <div class="card-container">
            <button class="modal-button" data-link="https://apps.ukmpenelitianunnes.com/logo/" on-click="navigateToLink" aria-label="Selanjutnya" title="Selanjutnya">
                <ukmp-text class="text-wrapper">Beranda</ukmp-text>
                <iframe scrolling="no" src="https://ukmpapps.web.app/apps" frameborder="0"></iframe>
            </button>
            <button class="modal-button" data-link="https://apps.ukmpenelitianunnes.com/logo/story/" on-click="navigateToLink" aria-label="Selanjutnya" title="Selanjutnya">
                <ukmp-text class="text-wrapper">Yang anda Kunjungi</ukmp-text>
                <iframe scrolling="no" src="https://apps.ukmpenelitianunnes.com/logo/story" frameborder="0"></iframe>
            </button>
        </div>
        `
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }
}

customElements.define('ukmp-card', Card);

class DepartementCardHRD extends PolymerElement {
    static get template() {
        return html`
          <style>
            .modal {
                display: none;
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 100%;
                height: max-content;
                z-index: 999;
                transform: translate(-50%);
            }
            
            .modal-content {
                position: absolute;
                bottom: 0px;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 85%;
                border-radius: 20px;
            }

            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
                z-index: 1;
            }
            
            .close-button:hover {
                color: #555555;
            }

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/HRD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
            @media (prefers-color-scheme: dark) {
                .modal-content {
                    background: #161b22;
                    color: #f4f4f4;
                }
                .modal-button-li {
                    background-color: #161b22;
                    color: #0f0f0f;
                }

            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal" aria-label="Close" title="Close">&#215;</button>
                        <ukmp-text class="text-wrapper" text="[[namaDepartemen]]">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text class="text-wrapper" id="deskripsi" text$="[[deskripsiDepartemen]]">[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" aria-label="Selanjutnya" title="Selanjutnya" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text text="Ketahui Lebih lanjut">Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper" text="Anggota HRD">Anggota HRD</ukmp-text>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text text="Lihat Selengkapnya">Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/Zikri Wildan Setiadi_HRD.JPG"></image-component>
                            <image-component src="/../../images/Nina Martian Ningsih _HRD.JPG"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/Abrar Rizq_HRD.jpg"></image-component>
                            <image-component src="/../../images/Puti Sekar Arginingrum_HRD.png"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/BENI AJI SUBEKTI_HRD 2.jpeg"></image-component>
                            <image-component src="/../../images/Rikha Fitriani Umayatun_HRD.jpeg"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_namaDepartemenChanged'  // added observer
            },
            deskripsiDepartemen: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_deskripsiDepartemenChanged'  // added observer
            },
            imageSrc: String,
        };
    }

    // observer function for namaDepartemen property
    _namaDepartemenChanged(newVal) {
        // code to handle the updated value of namaDepartemen
        const ukmpTextElement = this.shadowRoot.querySelector('ukmp-text');
        if (ukmpTextElement) {
            ukmpTextElement.setAttribute('text', newVal);
        }
    }

    _deskripsiDepartemenChanged(hallo) {
        // code to handle the updated value of namaDepartemen
        const Hal = this.shadowRoot.querySelector('ukmp-text #deskripsi');
        if (Hal) {
            Hal.setAttribute('text', hallo);
        }
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.namaDepartemen = this.getAttribute("nama-departemen");
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }
        this.deksripsiDepartemen = this.getAttribute("deskripsi-departemen");
        this._namaDepartemenChanged(this.namaDepartemen);  // initial call to the observer function
        this._deskripsiDepartemenChanged(this.deksripsiDepartemen);  // initial call to the observer function
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }

    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
        this.moni.style.transform = `translateY(${deltaY}px)`
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-hrd', DepartementCardHRD)

class DepartementCardDD extends PolymerElement {
    static get template() {
        return html`
          <style>
            .modal {
                display: none;
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 100%;
                height: max-content;
                z-index: 999;
                transform: translate(-50%);
            }
            
            .modal-content {
                position: absolute;
                bottom: 0px;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 85%;
                border-radius: 20px;
            }

            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
                z-index: 1;
            }
            
            .close-button:hover {
                color: #555555;
            }

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
            @media (prefers-color-scheme: dark) {
                .modal-content {
                    background: #161b22;
                    color: #f4f4f4;
                }
                .modal-button-li {
                    background-color: #161b22;
                    color: #0f0f0f;
                }

            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal" aria-label="Close" title="Close">&#215;</button>
                        <ukmp-text class="text-wrapper" text="[[namaDepartement]]">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text id="deskripsi" text$="[[deskripsiDepartemen]]">[[deskripsiDepartemen]]</ukmp-text>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text text="Ketahui Lebih lanjut">Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper" text="Anggota DD">Anggota DD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text text="Lihat Selengkapnya">Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/dd/FAIZA GALUH MARTA_DD.HEIC"></image-component>
                            <image-component src="/../../images/dd/Fajar Wahyushi Fuedsi_DD.HEIC"></image-component>
                            <image-component src="/../../images/dd/Fatimah_DD.jpg"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/dd/Nur Fadiyah Choirunnissa_DD.HEIC"></image-component>
                            <image-component src="/../../images/dd/GALIH RIDHO UTOMO_DD.HEIC"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/dd/IMG_20220601_165412_070723.jpg"></image-component>
                            <image-component src="/../../images/dd/Nining Hardiyanti_DD.HEIC"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_namaDepartemenChanged'  // added observer
            },
            deskripsiDepartemen: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_deskripsiDepartemenChanged'  // added observer
            },
            imageSrc: String,
        };
    }

    // observer function for namaDepartemen property
    _namaDepartemenChanged(newVal) {
        // code to handle the updated value of namaDepartemen
        const ukmpTextElement = this.shadowRoot.querySelector('ukmp-text');
        if (ukmpTextElement) {
            ukmpTextElement.setAttribute('text', newVal);
        }
    }

    _deskripsiDepartemenChanged(hallo) {
        // code to handle the updated value of namaDepartemen
        const Hal = this.shadowRoot.querySelector('ukmp-text #deskripsi');
        if (Hal) {
            Hal.setAttribute('text', hallo);
        }
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.namaDepartemen = this.getAttribute("nama-departemen");
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }
        this.deksripsiDepartemen = this.getAttribute("deskripsi-departemen");
        this._namaDepartemenChanged(this.namaDepartemen);  // initial call to the observer function
        this._deskripsiDepartemenChanged(this.deksripsiDepartemen);  // initial call to the observer function
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }

    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
        this.moni.style.transform = `translateY(${deltaY}px)`
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-dd', DepartementCardDD)

class DepartementCardComdev extends PolymerElement {
    static get template() {
        return html`
          <style>
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999;
            }
            
            .modal-content {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 85%;
                border-radius: 20px;
            }
            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
            }

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button aria-label="Close" title="Close" class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota Comdev</ukmp-text>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/comdev/Comdev_Ahmad Nurul Romadhon_Foto Formal.png"></image-component>
                            <image-component src="/../../images/comdev/Alvito Surya Nugraha_COMDEV..jpg"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/comdev/Dilla Andini_Comdev.jpg"></image-component>
                            <image-component src="/../../images/comdev/Medi Elfiani_COMDEV.jpg"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/comdev/Izzuddin Muhammad_COMDEV.jpeg"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }

    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
        this.moni.style.transform = `translateY(${deltaY}px)`
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-comdev', DepartementCardComdev)

class DepartementCardKarya extends PolymerElement {
    static get template() {
        return html`
          <style>
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999;
            }
            
            .modal-content {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 85%;
                border-radius: 20px;
            }
            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
            }

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button aria-label="Close" title="Close" class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota Karya</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/karya/Christian Suan F.T_KARYA.JPG"></image-component>
                            <image-component src="/../../images/karya/Hamzah Naufal Zuhdi_Karya.JPG"></image-component>
                            <image-component src="/../../images/karya/Norita Agustina Subagyo_Karya.JPG"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/karya/Intan Nor Aini_Karya.JPG"></image-component>
                            <image-component src="/../../images/karya/Lamia Rozianna Putri_Karya.JPG"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/karya/Livia Citra Atrianda_Karya_Formal.png"></image-component>
                            <image-component src="/../../images/karya/M ABDUL JABAR_KARYA.JPG"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }

    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
        this.moni.style.transform = `translateY(${deltaY}px)`
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-karya', DepartementCardKarya)

class DepartementCardPh extends PolymerElement {
    static get template() {
        return html`
          <style>
          .modal-apps {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
        
          .modal-content-apps {
            position: absolute;
            bottom: 70px;
            left: 50%;
            transform: translate(-50%);
            background-color: #fff;
            padding: 10px;
            width: 340px;
            border-radius: 30px;
          }
          .close-button-apps {
            width: 24px;
            background-color: transparent;
            font-size: 18px;
            color: #999999;
            cursor: pointer;
            font-size: 28px;
            border: none;
          }
          
          .close-button-apps:hover {
            color: #555555;
          }
          </style>

          <div id="Apps" class="modal-apps" on-touchstart="handleTouchStartApp" on-touchmove="handleTouchMoveApp" on-touchend="handleTouchEndApp">
            <div class="modal-content-apps">
                <div class="swipe-indicator"></div>
                <div class="headco-app">
                    <button aria-label="Close" title="Close" class="close-button-apps" on-click="closeApp">&#215;</button>
                    <ukmp-text class="text-apps" text="Aplikasi UKMP">Aplikasi UKMP</ukmp-text>
                </div>
            </div>
          </div>
        `;
    }
}

customElements.define('ukmp-departement-ph', DepartementCardPh)

class DepartementCardPRD extends PolymerElement {
    static get template() {
        return html`
          <style>
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999;
            }
            
            .modal-content {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 85%;
                border-radius: 20px;
            }
            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
            }

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button  aria-label="Close" title="Close" class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota PRD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/prd/Ade yuliana_PRD.HEIC"></image-component>
                            <image-component src="/../../images/prd/Ema Kartika_PRD.JPG"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/prd/Indah Permata N_PRD.HEIC"></image-component>
                            <image-component src="/../../images/prd/Muhammad Fuad Hasyim_PRD.JPG"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/prd/Rizki Nurfauziah_PRD.HEIC"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }

    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
        this.moni.style.transform = `translateY(${deltaY}px)`
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-prd', DepartementCardPRD)

class DepartementCardRED extends PolymerElement {
    static get template() {
        return html`
          <style>
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999;
            }
            
            .modal-content {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 85%;
                border-radius: 20px;
            }
            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
            }

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button aria-label="Close" title="Close" class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota RED</ukmp-text>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/red/Dini Sukmawati_RED_Formal.png"></image-component>
                            <image-component src="/../../images/red/Dita Alinda Restiani_RED.JPG"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/red/Hidayatul Munadhiroh _RED.png"></image-component>
                            <image-component src="/../../images/red/Putri Dinda Muliana_RED.jpg"></image-component>
                            <image-component src="/../../images/red/Siti Khotimah_RED_Formal.jpg"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/red/RED_Widya Indri Hapsari.JPG"></image-component>
                            <image-component src="/../../images/red/Riska Vitasari _RED.jpg"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }

    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
        this.moni.style.transform = `translateY(${deltaY}px)`
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-red', DepartementCardRED)

class DepartementCardSTD extends PolymerElement {
    static get template() {
        return html`
          <style>
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999;
            }
            
            .modal-content {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 85%;
                border-radius: 20px;
            }
            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
            }

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button  aria-label="Close" title="Close" class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota STD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/std/DWI CAHAYANING A_ STD..JPG"></image-component>
                            <image-component src="/../../images/std/FATIMATUZZAHRO_STD.JPG"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/std/HANINA HUMAIRA_STD.JPG"></image-component>
                            <image-component src="/../../images/std/Rismanda Asyifatul A_STD.jpg"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/std/Wafda Nailal Izza_STD.png"></image-component>
                            <button aria-label="Selanjutnya" title="Selanjutnya" class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }

    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
        this.moni.style.transform = `translateY(${deltaY}px)`
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-std', DepartementCardSTD)

class Carousel extends PolymerElement {
    static get template() {
        return html`
      <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
        bottom: 0;
        overflow: hidden;
      }

      #carousel {
        display: flex;
        width: 100%;
        transform: translateX(-0%);
        transition: transform 0.3s ease;
        position: fixed;
        bottom: 5%;
      }

      .carousel-item {
        flex: 0 0 32.2%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f1f1f1;
        color: #333;
        font-size: 24px;
        margin-right: 10px; /* Menambahkan jarak antara slide */
        border-radius: 10px; /* Menambahkan border-radius */
      }

      .carousel-item:last-child {
        margin-left: 6px; /* Menghapus margin-right pada slide terakhir */
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .image {
        flex: 1;
        text-align: right;
        margin-right: 20px;
      }
      
      .image img {
        max-width: 100%;
        height: auto;
      }
      
      .text {
        flex: 1;
        text-align: left;
      }
      
      .text h1 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      .text p {
        font-size: 16px;
        margin-bottom: 20px;
      }
      
      .text button {
        padding: 10px 20px;
        font-size: 16px;
      }

      .modal-button {
        background-color: black;
        color: #f0f0f0;
        padding: 10px 20px;
        border: none;
        border-radius: 45px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-right: 10px;
      }

      .modal-button:hover {
        background-color: #ede3e3;
        color: black;
      }
      </style>

      <div id="carousel" class="carousel">
        <div class="carousel-item">
            <div class="content">
                <div class="image">
                    <image-component src="/../../images/day1/IMG_0052.JPG" alt="Gambar 1"></image-component>
                </div>
                <div class="text">
                    <h1><ukmp-text>Day 1</ukmp-text></h1>
                    <p><ukmp-text>Upgrading 2023</ukmp-text></p>
                </div>
            </div>
        </div>
        <div class="carousel-item">            
            <div class="content">
                <div class="image">
                    <image-component src="/../../images/day2/IMG_0217.JPG" alt="Gambar 1"></image-component>
                </div>
                <div class="text">
                    <h1><ukmp-text>Day 2</ukmp-text></h1>
                    <p><ukmp-text>Upgrading 2023</ukmp-text></p>
                </div>
            </div>
        </div>
      </div>
    `;
    }

    static get is() {
        return 'carousel-component';
    }

    connectedCallback() {
        super.connectedCallback();
        this.initializeCarousel();
    }
    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    initializeCarousel() {
        const carousel = this.shadowRoot.getElementById('carousel');
        const carouselItems = carousel.getElementsByClassName('carousel-item');
        const numItems = carouselItems.length;
        const itemWidthPercentage = 100 / numItems;

        carousel.style.width = `${numItems * 100}%`;

        Array.from(carouselItems).forEach((item) => {
            item.style.width = `${itemWidthPercentage}%`;
        });

        let currentItem = 0;

        setInterval(() => {
            currentItem = (currentItem + 1) % numItems;
            const translateX = `-${currentItem * itemWidthPercentage}%`;
            carousel.style.transform = `translateX(${translateX})`;
        }, 3000);
    }
}

customElements.define(Carousel.is, Carousel);

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