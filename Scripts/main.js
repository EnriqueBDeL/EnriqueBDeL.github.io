const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});

const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

const themeToggleBtn = document.getElementById('theme-toggle');
const langToggleBtn = document.getElementById('lang-toggle');
const rootElement = document.documentElement;

function getCurrentTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
    if (theme === 'light') {
        rootElement.classList.add('light-mode');
        updateToggleIcon('light');
    } else {
        rootElement.classList.remove('light-mode');
        updateToggleIcon('dark');
    }
}

function updateToggleIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
        if (theme === 'light') {
            icon.className = 'ph ph-moon';
        } else {
            icon.className = 'ph ph-sun';
        }
    }
}

const currentTheme = getCurrentTheme();
applyTheme(currentTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = rootElement.classList.contains('light-mode') ? 'light' : 'dark';
        const nextTheme = activeTheme === 'light' ? 'dark' : 'light';

        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    });
}

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
    }
});

/* ==========================================================================
   SISTEMA DE INTERNACIONALIZACIÓN (i18n) - ES / EN
   ========================================================================== */

function getCurrentLanguage() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en' || savedLang === 'es') {
        return savedLang;
    }
    const browserLang = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    return browserLang.startsWith('en') ? 'en' : 'es';
}

function applyLanguage(lang) {
    const dict = (window.EB_TRANSLATIONS && window.EB_TRANSLATIONS[lang]) || (window.EB_TRANSLATIONS && window.EB_TRANSLATIONS['es']);
    if (!dict) return;

    document.documentElement.lang = lang;

    // Actualizar elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            el.innerHTML = dict[key];
        }
    });

    // Actualizar placeholders con data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (dict[key] !== undefined) {
            el.setAttribute('placeholder', dict[key]);
        }
    });

    // Si el modo dislexia estaba activo, detenerlo limpiamente al cambiar de idioma
    if (window.dyslexiaInterval) {
        clearInterval(window.dyslexiaInterval);
        window.dyslexiaInterval = null;
    }

    // Actualizar botón de alternancia de idioma con banderas SVG
    if (langToggleBtn) {
        // Bandera de España (para volver a español si estamos en inglés)
        const flagSpainSvg = `<svg class="lang-flag-svg" viewBox="0 0 640 480" width="20" height="15" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#aa151b" d="M0 0h640v480H0z"/><path fill="#f1bf00" d="M0 120h640v240H0z"/></svg>`;
        // Bandera de Reino Unido (para cambiar a inglés si estamos en español)
        const flagUkSvg = `<svg class="lang-flag-svg" viewBox="0 0 60 30" width="20" height="12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><clipPath id="s-dyn"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="t-dyn"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#s-dyn)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#t-dyn)" stroke="#c8102e" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></g></svg>`;

        // Si el idioma activo es es, el botón muestra la bandera de Reino Unido (para cambiar a inglés)
        // Si el idioma activo es en, el botón muestra la bandera de España (para volver a español)
        langToggleBtn.innerHTML = lang === 'es' ? flagUkSvg : flagSpainSvg;
        langToggleBtn.setAttribute('title', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
        langToggleBtn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
    }

    // Volver a enlazar los easter eggs tras inyectar HTML nuevo
    initEasterEggs();

    if (typeof window.bindDegreeTrigger === 'function') {
        window.bindDegreeTrigger();
    }
}

/* ==========================================================================
   EASTER EGGS (Gonzalo, Jorge, Dislexia)
   ========================================================================== */

function initEasterEggs() {
    // 1. Easter Egg Dislexia (trigger letra "D")
    const easterEggTrigger = document.getElementById('easter-egg-trigger');
    if (easterEggTrigger && !easterEggTrigger.dataset.bound) {
        easterEggTrigger.dataset.bound = 'true';
        let textNodes = [];

        function getTextNodes(node) {
            if (node.nodeType === 3) {
                if (node.nodeValue.trim() !== '') {
                    textNodes.push({
                        node: node,
                        originalText: node.nodeValue
                    });
                }
            } else {
                for (let i = 0; i < node.childNodes.length; i++) {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }

        easterEggTrigger.addEventListener('click', () => {
            if (window.dyslexiaInterval) {
                clearInterval(window.dyslexiaInterval);
                window.dyslexiaInterval = null;

                for (let i = 0; i < textNodes.length; i++) {
                    textNodes[i].node.nodeValue = textNodes[i].originalText;
                }
                return;
            }

            textNodes = [];
            getTextNodes(document.body);

            window.dyslexiaInterval = setInterval(() => {
                for (let i = 0; i < textNodes.length; i++) {
                    if (Math.random() < 0.1) {
                        let newWords = textNodes[i].originalText.split(' ');

                        for (let j = 0; j < newWords.length; j++) {
                            if (Math.random() < 0.2 && newWords[j].length > 3) {
                                let wordArr = newWords[j].split('');
                                let swapIdx = Math.floor(Math.random() * (wordArr.length - 3)) + 1;
                                let temp = wordArr[swapIdx];
                                wordArr[swapIdx] = wordArr[swapIdx + 1];
                                wordArr[swapIdx + 1] = temp;
                                newWords[j] = wordArr.join('');
                            }
                        }
                        textNodes[i].node.nodeValue = newWords.join(' ');
                    }
                }
            }, 300);
        });
    }

    // 2. Easter Egg Jorge (trigger letra "j" en Universidad)
    const jorgeEasterEggTrigger = document.getElementById('jorge-easter-egg');
    const jorgeCloud = document.getElementById('jorge-cloud');
    if (jorgeEasterEggTrigger && jorgeCloud && !jorgeEasterEggTrigger.dataset.bound) {
        jorgeEasterEggTrigger.dataset.bound = 'true';
        jorgeEasterEggTrigger.addEventListener('click', () => {
            jorgeCloud.classList.toggle('visible');
        });
    }

    // 3. Easter Egg Gonzalo (trigger "grupo" en GDG)
    const gonzaloEasterEggTrigger = document.getElementById('gonzalo-easter-egg');
    const gonzaloCloud = document.getElementById('gonzalo-cloud');
    if (gonzaloEasterEggTrigger && gonzaloCloud && !gonzaloEasterEggTrigger.dataset.bound) {
        gonzaloEasterEggTrigger.dataset.bound = 'true';
        gonzaloEasterEggTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            gonzaloCloud.classList.toggle('visible');
        });
    }

    // 4. Easter Egg Nightclub (trigger letra "G" o "D")
   const nightclubTrigger = document.getElementById('nightclub-trigger');
    if (nightclubTrigger && !nightclubTrigger.dataset.bound) {
        nightclubTrigger.dataset.bound = 'true';
        
        nightclubTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window.initNightclub === 'function') {
                window.initNightclub(true);
            }
        });
    }
  

}

const currentLanguage = getCurrentLanguage();
applyLanguage(currentLanguage);

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const activeLang = document.documentElement.lang === 'en' ? 'en' : 'es';
        const nextLang = activeLang === 'es' ? 'en' : 'es';
        localStorage.setItem('lang', nextLang);
        applyLanguage(nextLang);
    });
}

document.querySelectorAll('.post-it img').forEach(img => {
    img.addEventListener('error', () => {
        img.style.display = 'none';
    });
});

/* ==========================================================================
   Project Carousels Controller
   ========================================================================== */
function initProjectCarousels() {
    const carousels = document.querySelectorAll('.projects-carousel');
    if (!carousels.length) return;

    carousels.forEach(carousel => {
        const carouselId = carousel.id;
        const track = carousel.querySelector('.projects-carousel-track');
        const prevBtn = document.querySelector(`.carousel-btn.prev[data-carousel="${carouselId}"]`);
        const nextBtn = document.querySelector(`.carousel-btn.next[data-carousel="${carouselId}"]`);

        const isAutoplay = carousel.dataset.autoplay === 'true';
        const autoplaySpeed = parseInt(carousel.dataset.autoplaySpeed, 10) || 4000;

        let autoplayTimer = null;
        let isUserInteracting = false;

        function getScrollStep() {
            const firstCard = track ? track.querySelector('.project-card') : null;
            if (!firstCard) return carousel.clientWidth * 0.8;
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap) || 28;
            return firstCard.offsetWidth + gap;
        }

        function scrollNext() {
            const step = getScrollStep();
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            if (carousel.scrollLeft >= maxScroll - 15) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: step, behavior: 'smooth' });
            }
        }

        function scrollPrev() {
            const step = getScrollStep();
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            if (carousel.scrollLeft <= 15) {
                carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: -step, behavior: 'smooth' });
            }
        }

        function startAutoplay() {
            if (!isAutoplay || autoplayTimer || isUserInteracting) return;
            autoplayTimer = setInterval(() => {
                if (!document.hidden) {
                    scrollNext();
                }
            }, autoplaySpeed);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            if (!isUserInteracting) {
                startAutoplay();
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                scrollNext();
                resetAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                scrollPrev();
                resetAutoplay();
            });
        }

        carousel.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            stopAutoplay();
        });

        carousel.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            startAutoplay();
        });

        carousel.addEventListener('touchstart', () => {
            isUserInteracting = true;
            stopAutoplay();
        }, { passive: true });

        carousel.addEventListener('touchend', () => {
            isUserInteracting = false;
            setTimeout(startAutoplay, 1500);
        }, { passive: true });

        let isDown = false;
        let startX = 0;
        let scrollLeftPos = 0;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            isUserInteracting = true;
            stopAutoplay();
            carousel.classList.add('is-dragging');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeftPos = carousel.scrollLeft;
        });

        window.addEventListener('mouseup', () => {
            if (isDown) {
                isDown = false;
                carousel.classList.remove('is-dragging');
                isUserInteracting = false;
                setTimeout(startAutoplay, 1500);
            }
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 1.5;
            carousel.scrollLeft = scrollLeftPos - walk;
        });

        startAutoplay();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectCarousels);
} else {
    initProjectCarousels();
}

/* ── Settings popover (bocadillo móvil) ───────────────────────────── */
(function initSettingsPopover() {
    const settingsBtn = document.getElementById('settings-toggle');
    const popover = document.getElementById('settings-popover');
    if (!settingsBtn || !popover) return;

    function openPopover() {
        popover.classList.add('open');
        settingsBtn.setAttribute('aria-expanded', 'true');
    }

    function closePopover() {
        popover.classList.remove('open');
        settingsBtn.setAttribute('aria-expanded', 'false');
    }

    function togglePopover() {
        if (popover.classList.contains('open')) {
            closePopover();
        } else {
            openPopover();
        }
    }

    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePopover();
    });

    /* Cerrar al pulsar fuera del popover */
    document.addEventListener('click', (e) => {
        if (!settingsBtn.contains(e.target) && !popover.contains(e.target)) {
            closePopover();
        }
    });

    /* Cerrar con Escape */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopover();
    });

    /* Cerrar el popover automáticamente cuando el usuario selecciona un botón dentro */
    popover.addEventListener('click', () => {
        setTimeout(closePopover, 200);
    });
})();

