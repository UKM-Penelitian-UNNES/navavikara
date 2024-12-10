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
            <img src="https://riset.ukmpenelitianunnes.com/logo/navavikara.png" alt="Logo 1">
            <img class="ukmp-logo" src="https://riset.ukmpenelitianunnes.com/logo/ukmp-logo-144x144.png" alt="Logo 2">
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
                <template is="dom-repeat" items="{{pdfFiles}}">
                        <li class="pdf-card" on-click="openPdf">
                            <img src="{{item.thumbnail}}" alt="PDF Thumbnail"/>
                            <span>{{item.fileName}}</span>
                        </li>
                    </template>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal-overlay" hidden$="[[!isModalOpen]]">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close-button" on-click="closeModal">Ã—</button>
                </div>
                <div class="modal-body">
                    <custom-pdf-viewer src="{{selectedPdfUrl}}"></custom-pdf-viewer>
                </div>
            </div>
        </div>
        `;
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
customElements.define("navavikara-app", PubApp);

class NavavikaraView extends PolymerElement {
    static get properties() {
        return {
            title: {
                type: String,
                value: ''
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
        }
        .view-container {
            flex: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        h2 {
            font-size: 20px;
            color: #232323;
            margin: 0 0 15px 0;
            padding-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
        }
        slot {
            flex: 1;
            display: block;
            overflow: hidden;
        }
        </style>
        <div class="view-container">
            <h2>{{title}}</h2>
            <slot></slot>
        </div>
        `;
    }
}

customElements.define("navavikara-view", NavavikaraView);

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
            },
            searchText: {
                type: String,
                value: ''
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
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            }

            .toolbar {
                display: flex;
                align-items: center;
                padding: 8px 16px;
                background-color: #2c3e50;
                color: white;
                height: 48px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .toolbar-group {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 0 12px;
                border-right: 1px solid rgba(255,255,255,0.2);
            }

            .toolbar-group:last-child {
                border-right: none;
            }

            .search-container {
                position: relative;
                margin-left: auto;
                display: flex;
            }

            .search-input {
                padding: 6px 12px;
                border-radius: 4px;
                border: none;
                background: rgba(255,255,255,0.1);
                color: white;
                width: 200px;
            }

            .search-input::placeholder {
                color: rgba(255,255,255,0.6);
            }
            [hidden] {
                display: none;
            }

            .tool-button {
                background: none;
                border: none;
                color: white;
                padding: 8px;
                cursor: pointer;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .tool-button:hover {
                background: rgba(255,255,255,0.1);
            }

            .tool-button[disabled] {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .tooltip {
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                display: none;
                z-index: 1000;
            }

            .tool-button:hover .tooltip {
                display: block;
            }

            .page-display {
                display: flex;
                align-items: center;
                gap: 8px;
                color: white;
                font-size: 14px;
            }

            .viewer-container {
                flex: 1;
                overflow: hidden;
                position: relative;
                background: #e0e0e0;
            }

            .pages-container {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 24px;
            }

            .page-wrapper {
                position: relative;
                margin-bottom: 24px;
                background: white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                transition: transform 0.3s;
            }

            .page-wrapper::after {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 30px;
                background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1));
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .page-wrapper:hover::after {
                opacity: 1;
            }

            .page-edge {
                position: absolute;
                right: -2px;
                top: 0;
                bottom: 0;
                width: 2px;
                background: #d1d1d1;
                transform-origin: right;
                cursor: pointer;
                transition: transform 0.2s;
            }

            .page-edge:hover {
                transform: scaleX(2);
            }

            .page-turn-area {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .page-turn-area.left {
                left: 0;
                background: linear-gradient(to right, rgba(0,0,0,0.05), transparent);
            }

            .page-turn-area.right {
                right: 0;
                background: linear-gradient(to left, rgba(0,0,0,0.05), transparent);
            }

            .pages-container:hover .page-turn-area {
                opacity: 1;
            }

            .page-turn-alt {
                background: rgb(153 153 153 / 60%);
                padding: 12px;
                border-radius: 50%;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }

            .loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .loading-spinner {
                width: 24px;
                height: 24px;
                border: 3px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            .initial-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: #666;
                text-align: center;
                padding: 24px;
            }

            .initial-state-alt {
                font-size: 64px;
                margin-bottom: 16px;
                color: #999;
            }

            .error-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: #d32f2f;
                text-align: center;
                padding: 24px;
            }

            .loading-skeleton {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #f5f5f5;
                display: flex;
                flex-direction: column;
                padding: 24px;
            }

            .skeleton-page {
                width: 100%;
                max-width: 800px;
                height: 1000px;
                margin: 0 auto;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
        </style>

        <div class="toolbar">
            <div class="toolbar-group">
                <button class="tool-button" on-click="_previousPage" disabled="[[_isFirstPage(currentPage)]]">
                    <img src="https://riset.ukmpenelitianunnes.com/logo/prev.png" alt="chevron-left">
                    <span class="tooltip">Previous Page</span>
                </button>
                <div class="page-display">
                    <span>[[currentPage]]/[[totalPages]]</span>
                </div>
                <button class="tool-button" on-click="_nextPage" disabled="[[_isLastPage(currentPage, totalPages)]]">
                    <img src="https://riset.ukmpenelitianunnes.com/logo/next.png" alt="chevron-right">
                    <span class="tooltip">Next Page</span>
                </button>
            </div>

            <div class="toolbar-group">
                <button class="tool-button" on-click="_zoomOut">
                    <img src="https://riset.ukmpenelitianunnes.com/logo/zoomout.png" alt="remove">
                    <span class="tooltip">Zoom Out</span>
                </button>
                <button class="tool-button" on-click="_zoomIn">
                    <img src="https://riset.ukmpenelitianunnes.com/logo/zoomin.png" alt="add">
                    <span class="tooltip">Zoom In</span>
                </button>
                <button class="tool-button" on-click="_fitWidth">
                    <img src="https://riset.ukmpenelitianunnes.com/logo/fit.png" alt="unfold-more">
                    <span class="tooltip">Fit to Width</span>
                </button>
            </div>

            <div class="toolbar-group">
                <button class="tool-button" on-click="_rotate">
                    <img src="https://riset.ukmpenelitianunnes.com/logo/rotate.png" alt="rotate-right">
                    <span class="tooltip">Rotate Clockwise</span>
                </button>
            </div>

            <div class="toolbar-group">
                <button class="tool-button" on-click="_downloadPdf">
                    <img src="https://riset.ukmpenelitianunnes.com/logo/download.png" alt="file-download">
                    <span class="tooltip">Download</span>
                </button>
                <button class="tool-button" on-click="_printPdf">
                    <img src="https://riset.ukmpenelitianunnes.com/logo/print.png" alt="print">
                    <span class="tooltip">Print</span>
                </button>
            </div>

            <div class="search-container">
                <img src="https://riset.ukmpenelitianunnes.com/logo/search.png" alt="search">
                <input type="text" class="search-input" placeholder="Search in document..."
                    value="{{searchText::input}}" on-keyup="_handleSearch">
            </div>
        </div>

        <div class="viewer-container">
            <div class="pages-container" id="pagesContainer">
                <div class="page-wrapper">
                    <canvas id="pdfCanvas"></canvas>
                    <div class="page-edge"></div>
                    <div class="page-turn-area left" on-click="_previousPage">
                        <img src="https://riset.ukmpenelitianunnes.com/logo/prev.png" alt="chevron-left" class="page-turn-alt">
                    </div>
                    <div class="page-turn-area right" on-click="_nextPage">
                        <img src="https://riset.ukmpenelitianunnes.com/logo/next.png" alt="chevron-right" class="page-turn-alt">
                    </div>
                </div>
            </div>
        </div>
        <!-- Initial State -->
        <template is="dom-if" if="[[!initialized]]">
            <div class="initial-state">
                <iron-image class="initial-state-alt" alt="description"></iron-image>
                <h2>Select a PDF to view</h2>
                <p>Choose a PDF file from the list to start viewing</p>
            </div>
        </template>

        <!-- Error State -->
        <template is="dom-if" if="[[error]]">
            <div class="error-state">
                <img alt="error">
                <h2>Error loading PDF</h2>
                <p>[[error]]</p>
            </div>
        </template>

        <!-- Loading State -->
        <template is="dom-if" if="[[loading]]">
            <div class="loading-skeleton">
                <div class="skeleton-page"></div>
            </div>
        </template>

        <!-- PDF Viewer -->
        <template is="dom-if" if="[[_showViewer(initialized, loading, error)]]">
            <!-- Previous viewer template content -->
        </template>
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

        this.initialized = true;
        this.loading = true;
        this.error = '';

        try {
            await this._loadPdf(newSrc);
        } catch (err) {
            this.error = 'Failed to load PDF. Please try again.';
            console.error(err);
        } finally {
            this.loading = false;
        }
    }

    async _loadPdf(url) {
        try {
            this.pdfDoc = await pdfjsLib.getDocument(url).promise;
            this.totalPages = this.pdfDoc.numPages;
            this._renderPage();
            this._fitWidth();
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
            this._animatePageTurn('left');
        }
    }

    _nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this._renderPage();
            this._animatePageTurn('right');
        }
    }

    _animatePageTurn(direction) {
        const wrapper = this.shadowRoot.querySelector('.page-wrapper');
        wrapper.style.transform = `translateX(${direction === 'left' ? '20px' : '-20px'})`;
        setTimeout(() => {
            wrapper.style.transform = 'none';
        }, 300);
    }

    _zoomIn() {
        this.scale = Math.min(this.scale + 0.25, 3.0);
        this._renderPage();
    }

    _zoomOut() {
        this.scale = Math.max(this.scale - 0.25, 0.5);
        this._renderPage();
    }

    _fitWidth() {
        const container = this.$.pagesContainer;
        const containerWidth = container.clientWidth - 48; // Accounting for padding
        this.pdfDoc.getPage(this.currentPage).then(page => {
            const viewport = page.getViewport({ scale: 1 });
            this.scale = containerWidth / viewport.width;
            this._renderPage();
        });
    }

    _rotate() {
        this.rotation = (this.rotation + 90) % 360;
        this._renderPage();
    }

    _downloadPdf() {
        if (this.src) {
            const link = document.createElement('a');
            link.href = this.src;
            link.download = this.src.split('/').pop();
            link.click();
        }
    }

    _printPdf() {
        if (this.src) {
            window.open(this.src + '#toolbar=0&navpanes=0&scrollbar=0&print-dialog=1', '_blank');
        }
    }

    async _handleSearch(e) {
        if (e.key === 'Enter' && this.searchText && this.pdfDoc) {
            // Basic search implementation - could be enhanced with PDF.js text layer
            const page = await this.pdfDoc.getPage(this.currentPage);
            const textContent = await page.getTextContent();
            const text = textContent.items.map(item => item.str).join(' ');
            
            if (text.toLowerCase().includes(this.searchText.toLowerCase())) {
                // Highlight functionality would go here
                console.log('Text found on current page');
            }
        }
    }

    _isFirstPage(currentPage) {
        return currentPage <= 1;
    }

    _isLastPage(currentPage, totalPages) {
        return currentPage >= totalPages;
    }
     _showViewer(initialized, loading, error) {
        return initialized && !loading && !error;
    }
}

customElements.define('custom-pdf-viewer', CustomPdfViewer);