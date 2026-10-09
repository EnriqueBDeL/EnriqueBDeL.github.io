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

const easterEggTrigger = document.getElementById('easter-egg-trigger');
if (easterEggTrigger) {
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

        if (textNodes.length === 0) {
            getTextNodes(document.body);
        }

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

const jorgeEasterEggTrigger = document.getElementById('jorge-easter-egg');
const jorgeCloud = document.getElementById('jorge-cloud');
if (jorgeEasterEggTrigger && jorgeCloud) {
    jorgeEasterEggTrigger.addEventListener('click', () => {
        jorgeCloud.classList.toggle('visible');
    });
}

const gonzaloEasterEggTrigger = document.getElementById('gonzalo-easter-egg');
const gonzaloCloud = document.getElementById('gonzalo-cloud');
if (gonzaloEasterEggTrigger && gonzaloCloud) {
    gonzaloEasterEggTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        gonzaloCloud.classList.toggle('visible');
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

