// --- 1. PRELOADER LOGIC ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('preloader-hidden');
        }
    }, 1000); 
});

// --- 2. MAIN WEBSITE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- TYPING EFFECT FOR HERO SECTION ---
    const heroElement = document.querySelector('.hero h1');
    const textToType = "Where Words Come Alive";
    let index = 0;

    if (heroElement) {
        heroElement.innerHTML = ''; 
        
        function typeWriter() {
            if (index < textToType.length) {
                heroElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 100); 
            } else {
                heroElement.innerHTML += '<span class="cursor">|</span>';
            }
        }
        setTimeout(typeWriter, 1200);
    }

    // --- ACTIVE NAVBAR LINK HIGHLIGHTING ---
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-btn)');
    
    if(navLinks.length > 0) {
        navLinks[0].classList.add('active-link');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });

    // --- BACK-TO-TOP BUTTON ---
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- MOBILE HAMBURGER MENU LOGIC ---
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            });
        });
    }

    // --- MIDNIGHT READING MODE (DARK MODE) LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const mainBody = document.body;
    const iframe = document.getElementById('contentFrame');

    const savedTheme = localStorage.getItem('quills-theme');
    if (savedTheme === 'dark') {
        mainBody.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerText = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            mainBody.classList.toggle('dark-mode');
            
            if (mainBody.classList.contains('dark-mode')) {
                themeToggle.innerText = '☀️';
                localStorage.setItem('quills-theme', 'dark');
            } else {
                themeToggle.innerText = '🌙';
                localStorage.setItem('quills-theme', 'light');
            }

            applyThemeToIframe();
        });
    }

    function applyThemeToIframe() {
        if (!iframe) return;
        try {
            const iframeBody = iframe.contentWindow.document.body;
            if (mainBody.classList.contains('dark-mode')) {
                iframeBody.classList.add('dark-mode');
            } else {
                iframeBody.classList.remove('dark-mode');
            }
        } catch (error) {
            console.log("Iframe not ready or blocked by local cross-origin rules.");
        }
    }

    if (iframe) {
        iframe.addEventListener('load', applyThemeToIframe);
    }

});