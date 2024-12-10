import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import './jspdf.umd.js'
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
                .splash-screen { background-color: #333; }
            }
        </style>
        <div class$="[[splashApp]] splash-screen">
            <img src="https://story.ukmpenelitianunnes.com/logo/navavikara.png" alt="Logo 1">
            <img class="ukmp-logo" src="https://story.ukmpenelitianunnes.com/logo/ukmp-logo-144x144.png" alt="Logo 2">
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
        cloudImageComponent.setAttribute('src', '/../../logo/ukmp-logo-512x512-white.png');
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
  static get properties() {
    return {
      stories: {
        type: Array,
        value: () => []
      },
      currentStoryIndex: {
        type: Number,
        value: 0
      },
      isViewingStory: {
        type: Boolean,
        value: false,
        observer: '_isViewingStoryChanged'
      },
      isDescriptionOpen: {
        type: Boolean,
        value: false
      },
      isLongPress: {
        type: Boolean,
        value: false
      },
      longPressTimeout: {
        type: Object,
        value: null
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          height: 100%;
        }
        .stories-container {
          display: flex;
          flex-direction: column;
          overflow-x: auto;
          padding: 20px;
          background-color: #f0f0f0;
          border-radius: 25px;
        }
        .container {
          display: flex;
        }
        .heading {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .story-viewer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1000;
        }
        .bck {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        .story-content {
          width: 100%;
          max-width: 400px;
          height: -webkit-fill-available;
          max-height: 700px;
          background-size: cover;
          background-position: center;
          position: relative;
          z-index: 2;
        }
        .story-viewer.visible {
          opacity: 1;
          pointer-events: auto;
        }
        .story-navigation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
        }

        .story-navigation.active {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .nav-button {
          flex: 1;
          opacity: 0;
        }
        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 3;
        }
        .closeM-button {
          position: absolute;
          right: 20px;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }
        .story-title {
          position: absolute;
          top: 20px;
          left: 20px;
          color: white;
          font-size: 20px;
        }
        .description-button {
          display: -webkit-box;
          -webkit-line-clamp: 2; /* adjust the number of lines to your liking */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: black;
        }
        .description-panel {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background-color: white;
          transition: height 0.3s ease;
          overflow: hidden;
          color: black;
        }
        .description-panel.open {
          height: 50%;
          border-radius:  20px 20px 0 0;
          z-index: 4;
        }
        .contents {
          overflow-y: auto;
          height: -webkit-fill-available;
        }

        .share-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .share-modal-content {
          background: #fff;
          padding: 0 20px 20px 20px;
          border-radius: 25px;
          width: 80%;
          max-width: 400px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          bottom: 10px;
          position: absolute;
        }

        .share-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid;
        }

        .share-modal-header h2 {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }

        .close-button {
          font-size: 24px;
          cursor: pointer;
        }
        .res {
          transform: translate(0%, 0);
        }

        .share-button-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .whatsapp {
          background-color: #34C759;
          color: #fff;
          gap: 10px;
        }

        .telegram {
          background-color: #0088CC;
          color: #fff;
          gap: 10px
        }
        [hidden] {
          display: none;
        }
        .panel {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0px;
          z-index:2;
          height: 100%;
          background: linear-gradient(to right, rgb(0 0 0 / 1%), rgba(0, 0, 0, 0.1));
        }
        .panel-story {
          position: relative;
          top: 50%;
          right: 0px;
        }
        .description-content {
          padding: 20px;
          text-align: justify;
          text-justify: inter-word;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 25px;
        }
        .abst {
          left: 20px;
          position: relative;
        }
        .download-button {
          color: black;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          flex-direction: column;
          display: flex;
          width: 50px;
          align-items: center;
          width: 50px;
        }
        .share-button {
          color: black;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          flex-direction: column;
          display: flex;
          width: 50px;
          align-items: center;
          width: 50px;
        }
        span {
          display: -webkit-box;
          -webkit-line-clamp: 2; /* adjust the number of lines to your liking */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: black;
        }
        .desc {
          font-size: 14px;
        }
        .swipe-indicator {
          width: 40px;
          height: 5px;
          background-color: black;
          border-radius: 2.5px;
          margin: 15px auto 15px;
          15px auto 15px
        }
        .coab {
          display: flex;
          height: 100%;
          flex-direction: column;
          height: 100%;
          overflow: auto;
          padding: 20px;
          row-gap: 5px;
        }
        .ind {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          padding: 0 20px 20px;
        }
        .time {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px
        }
        .desc-download {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px
        }
        svg path {
          fill: black;
        }
        .den {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(255, 255, 255, 0.5);
          color: black;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          width: 90%;
          column-gap: 20px;
          z-index: 3;
        }
        .ist {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          row-gap: 5px;
        }
        .author {
          font-weight: 600;
        }
        img {
          width: 50px;
        }
        .str {
            font-size: 1.2em;
            line-height: 2.8rem;
            font-weight: 700;
            overflow: hidden;
            display: block;
            max-height: 2.8rem;
            -webkit-line-clamp: 1;
            display: box;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            white-space: normal;
            margin: 0;
          }
        @media (prefers-color-scheme: dark) {
          .description-panel {
            background: black;
            color: white;
          }
          .swipe-indicator {
            background-color: white;
          }
          svg path {
            fill: white;
          }
          .share-modal-content {
            background: black;
            color: white;
          }
          .whatsapp {
            color: white;
          }
          .telegram {
            color: white;
          }
          span {
            color: white;
          }
          .stories-container {
            background-color: #1A202C;
            display: flex;
            flex-direction: column;
        
          }

        }
        .hanging-indent {
          text-indent: -2em;
          padding-left: 2em;
          word-break: break-all;
        }
        h1 {
            font-size: 1.4rem;
            line-height: 2.8rem;
            font-weight: 700;
            overflow: hidden;
            display: block;
            max-height: 2.8rem;
            -webkit-line-clamp: 1;
            display: box;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            white-space: normal;
        }
        .heas {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
        }
        .closeS-modal {
            font-size: 24px;
            cursor: pointer;
        }
        @media (min-width: 768px) {
          @media (prefers-color-scheme: dark) {
            .description-panel {
              background: black;
              color: white;
            }
            .description-panel.open { 
              background: black;
              color: white;
            }
          }
          .description-panel { 
            position: relative; 
            bottom: 0; 
            right: -20px; 
            width: 100%;
            max-width: 400px;
            height: -webkit-fill-available; 
            background: white; 
            transition: height 0.3s ease; 
            overflow: hidden; 
            color: black; 
            max-height: 700px;
          }
          .heas {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
          }
          h1 {
            font-size: 1rem;
            line-height: 2.8rem;
            font-weight: 700;
            overflow: hidden;
            display: block;
            max-height: 2.8rem;
            -webkit-line-clamp: 1;
            display: box;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            white-space: normal;
          }
          
          .res {
            transform: translate(50%, 0);
            animation: move 2s forwards; /* add animation property */
          }

          @keyframes move {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(50%, 0);
            }
          }
          .description-panel.open { 
            border-radius: 0px 20px 0 0; 
            z-index: 4; 
            max-height: 700px;
            height: 100%;
            display: flex;
            flex-direction: column;
            animation: movi 2s forwards; /* add animation property */
          }
          @keyframes movi {
            0% {
              transform: translate(-50%, 0);
            }
            100% {
              transform: translate(0%, 0);
            }
          }
          .closeS-modal {
            font-size: 24px;
            cursor: pointer;
          }
          [hidden] {
            display: none;
          }
          
        }
        navavikara-header {
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
        navavikara-header .logo {
            position: absolute;
            left: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        navavikara-app-now navavikara-header .logo img {
            width: 50px;
        }
      </style>

      <navavikara-header>
          <div class="logo">
              <img src="../logo/navavikara.png" alt="Logo">
              <h2>Beranda</h2>
          </div>
      </navavikara-header>
      
      <div class="stories-container">
        <h1 class="str">Story Publikasi UKMP</h1>
        <div class="container">
          <template is="dom-repeat" items="{{stories}}">
            <navavikara-story-ilmiah 
              title="[[item.title]]" 
              image="[[item.image]]" 
              url="[[item.url]]"
              on-story-clicked="openStoryViewer">
            </navavikara-story-ilmiah>
          </template>
        </div>
      </div>

      <div class$="story-viewer [[_getViewerClass(isViewingStory)]]">
          <div class="bck"></div>
          <div class="story-content res">
            <div class="panel">
              <div class="panel-story">
                <div class="download-button" on-click="downloadPDF">
                  <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_4_30)">
                        <path d="M42.1875 0H57.8125C60.4102 0 62.5 2.08984 62.5 4.6875V37.5H79.6289C83.1055 37.5 84.8438 41.6992 82.3828 44.1602L52.6758 73.8867C51.2109 75.3516 48.8086 75.3516 47.3438 73.8867L17.5977 44.1602C15.1367 41.6992 16.875 37.5 20.3516 37.5H37.5V4.6875C37.5 2.08984 39.5898 0 42.1875 0ZM100 73.4375V95.3125C100 97.9102 97.9102 100 95.3125 100H4.6875C2.08984 100 0 97.9102 0 95.3125V73.4375C0 70.8398 2.08984 68.75 4.6875 68.75H33.3398L42.9102 78.3203C46.8359 82.2461 53.1641 82.2461 57.0898 78.3203L66.6602 68.75H95.3125C97.9102 68.75 100 70.8398 100 73.4375ZM75.7812 90.625C75.7812 88.4766 74.0234 86.7188 71.875 86.7188C69.7266 86.7188 67.9688 88.4766 67.9688 90.625C67.9688 92.7734 69.7266 94.5312 71.875 94.5312C74.0234 94.5312 75.7812 92.7734 75.7812 90.625ZM88.2812 90.625C88.2812 88.4766 86.5234 86.7188 84.375 86.7188C82.2266 86.7188 80.4688 88.4766 80.4688 90.625C80.4688 92.7734 82.2266 94.5312 84.375 94.5312C86.5234 94.5312 88.2812 92.7734 88.2812 90.625Z"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_4_30">
                          <rect width="100" height="100" fill="white"/>
                        </clipPath>
                      </defs>
                  </svg>
                  <span>Download PDF</span>
                </div>
                <div class="share-button" on-click="openShareModal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none"><path fill="%23fff" d="m21.1 25.4 9.87-9.86 1.42 1.42-9.86 9.87z"/><path stroke="%23fff" stroke-linecap="round" stroke-width="1.9" d="m16.85 19.82 15.33-4.14c.04 0 .07.03.06.06l-4.02 15.34a1.6 1.6 0 0 1-2.97.33l-2.93-5.73-5.77-2.88a1.6 1.6 0 0 1 .3-2.98Z"/></svg>
                  <span>Bagikan</span>
                </div>
              </div>
            </div>

            <div class="share-modal" hidden>
              <div class="share-modal-content">
                <div class="swipe-indicator"></div>
                <div class="share-modal-header">
                  <h2>Bagikan Cerita</h2>
                  <div class="close-button" on-click="closeShareModal">×</div>
                </div>
                <div class="share-modal-body">
                  <div class="share-button-container">
                    <div class="share-button whatsapp" on-click="shareOnWhatsapp">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                      </svg>
                      Whatsapp
                    </div>
                    <div class="share-button telegram" on-click="shareOnTelegram">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                      </svg>
                      Telegram
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class=" close-button" on-click="closeStoryViewer">×</div>
            <div class="story-title">[[_getCurrentStoryTitle(stories, currentStoryIndex)]]</div>
              <div class="den">
                <img src="../logo/ukmp-logo-512x512.png" alt="ukmplogo"/>
                <div class="ist">
                  <div class="description-button desc" on-click="toggleDescription">[[_getCurrentStoryDescription(stories, currentStoryIndex)]]</div>
                  <div class="author">[[_getCurrentStoryAuthor(stories, currentStoryIndex)]]</div>
                </div>
                <img src="../logo/ukmp-logo-512x512.png" alt="ukmplogo"/>
              </div>
              <div class$="story-navigation [[_getNavigationClass(isLongPress)]]">
                <div class="nav-button" on-click="previousStory">⟨</div>
                <div class="nav-button" on-click="nextStory">⟩</div>
              </div
          </div>
        </div>
        <div class$="description-panel [[_getDescriptionPanelClass(isDescriptionOpen)]]">
            <div class="swipe-indicator"></div>
            <div class="heas">
              <h1>Deskripsi</h1>
              <div class="closeS-modal" on-click="closeModal">×</div>
            </div
            <div class="contents">
              <div class="ind">
                <div class="time">              
                  <svg width="15" height="15" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 1.5625C23.2422 1.5625 1.5625 23.2422 1.5625 50C1.5625 76.7578 23.2422 98.4375 50 98.4375C76.7578 98.4375 98.4375 76.7578 98.4375 50C98.4375 23.2422 76.7578 1.5625 50 1.5625ZM61.1523 69.9414L43.9258 57.4219C43.3203 56.9727 42.9688 56.2695 42.9688 55.5273V22.6562C42.9688 21.3672 44.0234 20.3125 45.3125 20.3125H54.6875C55.9766 20.3125 57.0312 21.3672 57.0312 22.6562V49.5508L69.4336 58.5742C70.4883 59.3359 70.7031 60.8008 69.9414 61.8555L64.4336 69.4336C63.6719 70.4688 62.207 70.7031 61.1523 69.9414Z"/>
                  </svg>
                  2023
                </div>
                <div class="desc-download" on-click="downloadPDF">                
                  <svg width="15" height="15" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_4_30)">
                      <path d="M42.1875 0H57.8125C60.4102 0 62.5 2.08984 62.5 4.6875V37.5H79.6289C83.1055 37.5 84.8438 41.6992 82.3828 44.1602L52.6758 73.8867C51.2109 75.3516 48.8086 75.3516 47.3438 73.8867L17.5977 44.1602C15.1367 41.6992 16.875 37.5 20.3516 37.5H37.5V4.6875C37.5 2.08984 39.5898 0 42.1875 0ZM100 73.4375V95.3125C100 97.9102 97.9102 100 95.3125 100H4.6875C2.08984 100 0 97.9102 0 95.3125V73.4375C0 70.8398 2.08984 68.75 4.6875 68.75H33.3398L42.9102 78.3203C46.8359 82.2461 53.1641 82.2461 57.0898 78.3203L66.6602 68.75H95.3125C97.9102 68.75 100 70.8398 100 73.4375ZM75.7812 90.625C75.7812 88.4766 74.0234 86.7188 71.875 86.7188C69.7266 86.7188 67.9688 88.4766 67.9688 90.625C67.9688 92.7734 69.7266 94.5312 71.875 94.5312C74.0234 94.5312 75.7812 92.7734 75.7812 90.625ZM88.2812 90.625C88.2812 88.4766 86.5234 86.7188 84.375 86.7188C82.2266 86.7188 80.4688 88.4766 80.4688 90.625C80.4688 92.7734 82.2266 94.5312 84.375 94.5312C86.5234 94.5312 88.2812 92.7734 88.2812 90.625Z"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_4_30">
                        <rect width="100" height="100" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  Download PDF
                </div>
              </div>
              <div class="coab">
                <div class="abst">Abstrak</div>
                <div class="description-content">[[_getCurrentStoryDescription(stories, currentStoryIndex)]]</div>
                <div class="abst">Introdunce</div>
                <div class="description-content introdunce">[[_getCurrentStoryIntrodunce(stories, currentStoryIndex)]]</div>
                <div class="abst">Kajian Teori</div>
                <div class="description-content" review>[[_getCurrentStoryReview(stories, currentStoryIndex)]]
                  <ol class="list"></ol>
                </div>
                <div class="abst">Metode</div>
                <div class="description-content">[[_getCurrentStoryMethod(stories, currentStoryIndex)]]</div>
                <div class="abst">Hasil dan Pembahasan</div>
                <div class="description-content">[[_getCurrentStoryResults(stories, currentStoryIndex)]]
                  <ol class="result"></ol>
                </div>
                <div class="abst">Kesimpulan</div>
                <div class="description-content">[[_getCurrentStoryConclusion(stories, currentStoryIndex)]]</div>
                <div class="abst">Daftar Pusaka</div>
                <div class="description-content">
                  <ul>
                    <template is="dom-repeat" items="{{_getCurrentStoryDapus(stories, currentStoryIndex)}}">
                      <li class="hanging-indent">[[item]]</li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
    `;
  }

  // Fungsi untuk memulai long press
  startLongPress(event) {
    this.set('isLongPress', false);
    this.longPressTimeout = setTimeout(() => {
      this.set('isLongPress', true);
    }, 500); // Set durasi klik tahan (500ms)
  }

  // Fungsi untuk membatalkan long press
  cancelLongPress(event) {
    clearTimeout(this.longPressTimeout);
    if (this.isLongPress) {
      this.set('isLongPress', false); // Sembunyikan navigasi saat long press dibatalkan
    }
  }

  _getNavigationClass(isLongPress) {
    return isLongPress ? 'active' : '';
  }


  connectedCallback() {
    super.connectedCallback();
    fetch('bookend.json')
      .then(response => response.json())
      .then(data => {
        this.stories = data.components.filter(c => c.type !== 'heading' && c.type !== 'cta-link');
        if (this.isViewingStory) {
          this.updateStoryBackground();
        }
      })
      .catch(error => {
        console.error('Error fetching stories:', error);
      });

    this._setupSwipeListeners();
  }

  openShareModal() {
    this.shadowRoot.querySelector('.share-modal').hidden = false;
  }

  closeShareModal() {
    this.shadowRoot.querySelector('.share-modal').hidden = true;
  }

  closeModal() {
    this.set('isDescriptionOpen', false);
    const storyContent = this.shadowRoot.querySelector('.story-content');
    const descriptionPanel = this.shadowRoot.querySelector('.description-panel');
    if (this.isDescriptionOpen && descriptionPanel.innerHTML !== '') {
      storyContent.classList.remove("res");
    } else {
      storyContent.classList.add("res");
    }
  }

  shareOnWhatsapp() {
    const story = this.stories[this.currentStoryIndex];
    const url = `${window.location.href}?story=${story.author}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
  }

  shareOnTelegram() {
    const story = this.stories[this.currentStoryIndex];
    const url = `${window.location.href}?story=${story.author}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${story.author}`;
    window.open(telegramUrl, '_blank');
  }

  downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const story = this.stories[this.currentStoryIndex];

    // Fungsi untuk menambahkan teks dengan justify
    const addWrappedText = (text, x, y, maxWidth, lineHeight) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      for (let i = 0; i < lines.length; i++) {
        doc.text(lines[i], x, y + (i * lineHeight));
      }
      return lines.length;
    };

    // Halaman cover
    doc.addImage(story.image, 'JPEG', 0, 0, 210, 297);  // A4 size

    // Halaman judul dan deskripsi
    doc.addPage();

    // Judul (centered)
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    const titleWidth = doc.getTextWidth(story.title);
    doc.text(story.title, (210 - titleWidth) / 2, 30);

    // Deskripsi (justified)
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    const lineHeight = 7;
    const textWidth = 170;
    const startY = 50;

    const lines = addWrappedText(story.description, 20, startY, textWidth, lineHeight);

    // Simpan PDF
    doc.save(`${story.title}.pdf`);
  }

  _setupSwipeListeners() {
    let startY;
    let currentY;
    const descriptionPanel = this.shadowRoot.querySelector('.description-panel');
    const storyContent = this.shadowRoot.querySelector('.story-content');
    const shareModal = this.shadowRoot.querySelector('.share-modal');


    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      currentY = e.touches[0].clientY;
    };
    const handleTouchStartM = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchEndM = (e) => {
      currentY = e.changedTouches[0].clientY;
      this.style.transition = 'transform 0.3s ease-in';
      if (currentY > startY + 50) {
        this.closeShareModal();
        this.style.transform = 'translateX(0)';
      }
    };

    const handleTouchEnd = () => {
      const deltaY = currentY - startY;
      if (Math.abs(deltaY) > 50) {  // Minimal swipe distance
        if (deltaY < 0 && !this.isDescriptionOpen) {
          // Swipe up
          this.isDescriptionOpen = true;
          this.style.transition = 'transform 0.3s ease-in';
        } else if (deltaY > 0 && this.isDescriptionOpen) {
          // Swipe down
          this.isDescriptionOpen = false;
          this.style.transition = 'translateX(0)';
        }
      }
    };

    storyContent.addEventListener('touchstart', handleTouchStart);
    storyContent.addEventListener('touchmove', handleTouchMove, { passive: false });
    storyContent.addEventListener('touchend', handleTouchEnd);
    shareModal.addEventListener('touchstart', handleTouchStartM);
    shareModal.addEventListener('touchend', handleTouchEndM);
  }

  _getCurrentStoryAuthor(stories, currentStoryIndex) {
    if (stories && stories.length > currentStoryIndex && stories[currentStoryIndex]) {
      return stories[currentStoryIndex].author || '';
    }
    return '';
  }

  _getViewerClass(isViewingStory) {
    return isViewingStory ? 'visible' : '';
  }

  _getDescriptionPanelClass(isOpen) {
    return isOpen ? 'open' : '';
  }

  _getCurrentStoryTitle(stories, currentStoryIndex) {
    if (stories && stories.length > currentStoryIndex && stories[currentStoryIndex]) {
      return stories[currentStoryIndex].title || '';
    }
    return '';
  }

  _getCurrentStoryDescription(stories, currentStoryIndex) {
    if (stories && stories.length > currentStoryIndex && stories[currentStoryIndex]) {
      return stories[currentStoryIndex].description || '';
    }
    return '';
  }

  _getCurrentStoryIntrodunce(stories, currentStoryIndex) {
    if (stories && stories.length > currentStoryIndex && stories[currentStoryIndex]) {
      let text = stories[currentStoryIndex].introdunce || '';
      let regex = /\b([A-Za-z\s]+),\s(\d{4})\b/g; // Regular expression untuk menemukan sitasi (nama, tahun)
      let regexDkk = /\b([A-Za-z\s]+),\s(dkk\.,\s\d{4})\b/g; // Regular expression untuk menemukan sitasi (nama, dkk., tahun)
      let regexEtAl = /\b([A-Za-z\s]+),\s(et al\.,\s\d{4})\b/g; // Regular expression untuk menemukan sitasi (nama, et al., tahun)
      let sitations = text.match(regex);
      let sitationsDkk = text.match(regexDkk);
      let sitationsEtAl = text.match(regexEtAl);

      if (sitations) {
        sitations.forEach((sitation) => {
          let match = sitation.match(/([A-Za-z\s]+),\s(\d{4})/);
          if (match) {
            let nama = match[1].trim().replace(/\s+/g, '-').toLowerCase();
            let tahun = match[2];
            let linkText = `${match[1]}, ${match[2]}`;
            let link = `<a href="#dapus-${nama}-${tahun}">${linkText}</a>`;
            text = text.replace(sitation, link); // Menggantikan sitasi dengan link
          }
        });
      }

      if (sitationsDkk) {
        sitationsDkk.forEach((sitation) => {
          let match = sitation.match(/([A-Za-z\s]+),\s(dkk\.,\s\d{4})/);
          if (match) {
            let nama = match[1].trim().replace(/\s+/g, '-').toLowerCase();
            let tahun = match[2].replace('dkk., ', '');
            let linkText = `${match[1]}, dkk., ${tahun}`;
            let link = `<a href="#dapus-${nama}-${tahun}">${linkText}</a>`;
            text = text.replace(sitation, link); // Menggantikan sitasi dengan link
          }
        });
      }

      if (sitationsEtAl) {
        sitationsEtAl.forEach((sitation) => {
          let match = sitation.match(/([A-Za-z\s]+),\s(et al\.,\s\d{4})/);
          if (match) {
            let nama = match[1].trim().replace(/\s+/g, '-').toLowerCase();
            let tahun = match[2].replace('et al., ', '');
            let linkText = `${match[1]}, et al., ${tahun}`;
            let link = `<a href="#dapus-${nama}-${tahun}">${linkText}</a>`;
            text = text.replace(sitation, link); // Menggantikan sitasi dengan link
          }
        });
      }

      let introdunceElement = this.shadowRoot.querySelector('.introdunce');
      if (introdunceElement) {
        introdunceElement.innerHTML = text; // Menambahkan text ke dalam elemen introdunce
      }

      return '';
    }
    return '';
  }

  _getCurrentStoryReview(stories, currentStoryIndex) {
    if (stories && stories.length > currentStoryIndex && stories[currentStoryIndex]) {
      let reviewText = stories[currentStoryIndex].review || '';

      // Process review text
      let regex = /\b([A-Za-z\s]+),\s(\d{4})\b/g; // Regular expression untuk menemukan sitasi (nama, tahun)
      let regexDkk = /\b([A-Za-z\s]+),\s(dkk\.,\s\d{4})\b/g; // Regular expression untuk menemukan sitasi (nama, dkk., tahun)
      let regexEtAl = /\b([A-Za-z\s]+),\s(et al\.,\s\d{4})\b/g; // Regular expression untuk menemukan sitasi (nama, et al., tahun)
      let sitations = reviewText.match(regex);
      let sitationsDkk = reviewText.match(regexDkk);
      let sitationsEtAl = reviewText.match(regexEtAl);

      if (sitations) {
        sitations.forEach((sitation) => {
          let match = sitation.match(/([A-Za-z\s]+),\s(\d{4})/);
          if (match) {
            let nama = match[1].trim().replace(/\s+/g, '-').toLowerCase();
            let tahun = match[2];
            let linkText = `${match[1]}, ${match[2]}`;
            let link = `<a href="#dapus-${nama}-${tahun}">${linkText}</a>`;
            reviewText = reviewText.replace(sitation, link); // Menggantikan sitasi dengan link
          }
        });
      }

      if (sitationsDkk) {
        sitationsDkk.forEach((sitation) => {
          let match = sitation.match(/([A-Za-z\s]+),\s(dkk\.,\s\d{4})/);
          if (match) {
            let nama = match[1].trim().replace(/\s+/g, '-').toLowerCase();
            let tahun = match[2];
            let linkText = `${match[1]}, ${match[2]}`;
            let link = `<a href="#dapus-${nama}-${tahun}" target="_self">${linkText}</a>`;
            reviewText = reviewText.replace(sitation, link); // Menggantikan sitasi dengan link
          }
        });
      }

      if (sitationsEtAl) {
        sitationsEtAl.forEach((sitation) => {
          let match = sitation.match(/([A-Za-z\s]+),\s(et al\.,\s\d{4})/);
          if (match) {
            let nama = match[1].trim().replace(/\s+/g, '-').toLowerCase();
            let tahun = match[2].replace('et al., ', '');
            let linkText = `${match[1]}, et al., ${tahun}`;
            let link = `<a href="#dapus-${nama}-${tahun}">${linkText}</a>`;
            reviewText = reviewText.replace(sitation, link); // Menggantikan sitasi dengan link
          }
        });
      }

      let reviewElement = this.shadowRoot.querySelector('.review');
      if (reviewElement) {
        reviewElement.innerHTML = reviewText; // Menambahkan text ke dalam elemen review
      }

      // Process review text
      let regexReview = /(\d+)\.\s/g; // Regular expression untuk menemukan angka diikuti oleh titik
      let parts = reviewText.split(regexReview); // Memisahkan teks berdasarkan angka

      let listElement = this.shadowRoot.querySelector('.list');
      listElement.innerHTML = ''; // Mengosongkan elemen list

      let currentNumber = 0;
      let subList = [];
      let subListElement = null;
      let lastListItem = null;

      // Menggabungkan bagian-bagian teks untuk membuat list bernomor
      for (let i = 1; i < parts.length; i += 2) {
        let number = parts[i]; // Ambil angka
        let content = parts[i + 1] ? parts[i + 1].trim() : ''; // Ambil konten setelah angka

        if (content) {
          if (number === '1' && !subListElement) {
            currentNumber++;
            let listItem = document.createElement('li');
            listItem.textContent = `${currentNumber}. ${content}`; // Format list item
            listElement.appendChild(listItem);
            lastListItem = listItem;
          } else if (number === '1' && subListElement) {
            let subListItem = document.createElement('li');
            subListItem.textContent = `${number}. ${content}`; // Format sub-list item
            subListElement.appendChild(subListItem);
          } else if (number !== '1' && !subListElement) {
            let listItem = document.createElement('li');
            listItem.textContent = `${number}. ${content}`; // Format list item
            listElement.appendChild(listItem);
            lastListItem = listItem;
          } else if (number !== '1' && subListElement) {
            let subListItem = document.createElement('li');
            subListItem.textContent = `${number}. ${content}`; // Format sub-list item
            subListElement.appendChild(subListItem);
          }

          if (number === '1' && !subListElement) {
            subListElement = document.createElement('ol');
            lastListItem.appendChild(subListElement);
          } else if (number !== '1' && !subListElement) {
            subListElement = null;
          }
        }
      }
    }
  }

  _getCurrentStoryMethod(stories, currentStoryIndex) {
    if (stories && stories.length > currentStoryIndex && stories[currentStoryIndex]) {
      let text = stories[currentStoryIndex].method || '';
      let regex = /\b([A-Za-z\s]+,\s\d{4})\b/g; // Regular expression untuk menemukan sitasi (nama, tahun)
      let sitations = text.match(regex);

      if (sitations) {
        sitations.forEach((sitation) => {
          let link = document.createElement('a');
          link.textContent = sitation;
          link.href = `#dapus-${sitation.replace(/,/g, '').trim()}`; // Membuat link ke daftar dapus sesuai nama sitasi
          link.target = '_self';
          text = text.replace(sitation, link.outerHTML); // Menggantikan sitasi dengan link
        });
      }

      return text;
    }
    return '';
  }

  _getCurrentStoryConclusion(stories, currentStoryIndex) {
    if (stories && stories.length > currentStoryIndex && stories[currentStoryIndex]) {
      let text = stories[currentStoryIndex].conclusion || '';
      let regex = /\b([A-Za-z\s]+,\s\d{4})\b/g; // Regular expression untuk menemukan sitasi (nama, tahun)
      let sitations = text.match(regex);

      if (sitations) {
        sitations.forEach((sitation) => {
          let link = document.createElement('a');
          link.textContent = sitation;
          link.href = `#dapus-${sitation.replace(/,/g, '').trim()}`; // Membuat link ke daftar dapus sesuai nama sitasi
          link.target = '_self';
          text = text.replace(sitation, link.outerHTML); // Menggantikan sitasi dengan link
        });
      }

      return text;
    }
    return '';
  }

  _getCurrentStoryDapus(stories, currentStoryIndex) {
    if (stories && stories.length > currentStoryIndex && stories[currentStoryIndex]) {
      const dapusString = stories[currentStoryIndex].dapus || '';
      return dapusString.split(';').map(item => item.trim());
    }
    return [];
  }

  _getCurrentStoryResults(stories, currentStoryIndex) {
    if (stories && stories.length > currentStoryIndex && stories[currentStoryIndex]) {
      let text = stories[currentStoryIndex].result || '';
      let regex = /(\d+)\.\s/g; // Regular expression untuk menemukan angka diikuti oleh titik
      let parts = text.split(regex); // Memisahkan teks berdasarkan angka

      let listElement = this.shadowRoot.querySelector('.result');
      listElement.innerHTML = ''; // Mengosongkan elemen list

      let currentNumber = 0;
      let subList = [];
      let subListElement = null;
      let lastListItem = null;

      // Menggabungkan bagian-bagian teks untuk membuat list bernomor
      for (let i = 1; i < parts.length; i += 2) {
        let number = parts[i]; // Ambil angka
        let content = parts[i + 1] ? parts[i + 1].trim() : ''; // Ambil konten setelah angka

        if (content) {
          if (number === '1' && !subListElement) {
            currentNumber++;
            let listItem = document.createElement('li');
            listItem.textContent = `${currentNumber}. ${content}`; // Format list item
            listElement.appendChild(listItem);
            lastListItem = listItem;
          } else if (number === '1' && subListElement) {
            let subListItem = document.createElement('li');
            subListItem.textContent = `${number}. ${content}`; // Format sub-list item
            subListElement.appendChild(subListItem);
          } else if (number !== '1' && !subListElement) {
            let listItem = document.createElement('li');
            listItem.textContent = `${number}. ${content}`; // Format list item
            listElement.appendChild(listItem);
            lastListItem = listItem;
          } else if (number !== '1' && subListElement) {
            let subListItem = document.createElement('li');
            subListItem.textContent = `${number}. ${content}`; // Format sub-list item
            subListElement.appendChild(subListItem);
          }

          if (number === '1' && !subListElement) {
            subListElement = document.createElement('ol');
            lastListItem.appendChild(subListElement);
          } else if (number !== '1' && !subListElement) {
            subListElement = null;
          }
        }
      }
    }
  }


  _isViewingStoryChanged(newValue, oldValue) {
    if (newValue) {
      this.updateStoryBackground();
    }
  }

  openStoryViewer(event) {
    console.log('Story Ilmiah UKMP Versi 1.0');
    if (this.stories && this.stories.length > 0) {
      const storyIndex = this.stories.findIndex(story => story.title === event.detail.title);
      console.log('Story index:', storyIndex);
      if (storyIndex !== -1) {
        this.currentStoryIndex = storyIndex;
        this.isViewingStory = true;
      } else {
        console.error('Story not found');
      }
    } else {
      console.error('No stories available');
    }
  }

  updateStoryBackground() {
    console.log('Updating story background');
    if (this.stories && this.stories.length > this.currentStoryIndex) {
      const story = this.stories[this.currentStoryIndex];
      console.log('Current story:', story);
      const storyContent = this.shadowRoot.querySelector('.story-content');
      const storyB = this.shadowRoot.querySelector('.bck');
      console.log('Story content element:', storyContent);

      if (storyContent && story && story.image) {
        storyContent.style.backgroundImage = `url(${story.image})`;
        console.log('Updated background image');
      } else {
        console.error('Story content or image not found!');
      }
      if (storyB && story && story.image) {
        console.log('Updated background image');

        const image = new Image();
        image.src = story.image;
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
          const ap = document.createElement('div');
          storyB.style.backgroundImage = `url(${story.image})`;
          storyB.style.filter = `blur(25px)`;
          storyB.style.backgroundRepeat = `no-repeat`;
          storyB.style.backgroundSize = `cover`;
          storyB.style.backgroundPosition = `center center`;
        };
        console.log('Updated background image');
      } else {
        console.error('Story content or image not found!');
      }
    } else {
      console.error('Invalid story index or empty stories array');
    }
  }

  closeStoryViewer() {
    this.isViewingStory = false;
  }

  toggleDescription() {
    this.isDescriptionOpen = !this.isDescriptionOpen;
    const storyContent = this.shadowRoot.querySelector('.story-content');
    const descriptionPanel = this.shadowRoot.querySelector('.description-panel');
    if (this.isDescriptionOpen && descriptionPanel.innerHTML !== '') {
      storyContent.classList.remove("res");
    } else {
      storyContent.classList.add("res");
    }
  }

  previousStory() {
    if (this.currentStoryIndex > 0) {
      this.currentStoryIndex--;
      this.updateStoryBackground();
    } else {
      this.closeStoryViewer();
    }
  }

  nextStory() {
    if (this.currentStoryIndex < this.stories.length - 1) {
      this.currentStoryIndex++;
      this.updateStoryBackground();
    } else {
      this.closeStoryViewer();
    }
  }
}

customElements.define("navavikara-app", HomeApp);

class MyStoryItem extends PolymerElement {
  static get properties() {
    return {
      title: String,
      image: String,
      url: String
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          height: 100%;
        }
        .story-item {
          position: relative;
          width: 80px;
          height: -webkit-fill-available;;
          margin: 0 10px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s;
          display: flex;
          height: 120px;
          flex-direction: column;
        }
        .img  {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .story-item:hover {
          transform: scale(1.05);
        }
        .story-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        .story-title {
          position: relative;
          bottom: -10px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 12px;
          color: #333;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* adjust the number of lines to your liking */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (prefers-color-scheme: dark) {
            .story-title {
              color: white;
            }
          }
      </style>

      <div class="story-item" on-click="handleClick">
        <div class="img">
          <img class="story-image" src="[[image]]" alt="[[title]]">
        </div>
        <div class="story-title">[[title]]</div>
      </div>
    `;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('story-clicked', {
      detail: {
        title: this.title,
        image: this.image,
        url: this.url
      },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('navavikara-story-ilmiah', MyStoryItem);
