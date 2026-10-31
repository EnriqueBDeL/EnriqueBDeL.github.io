/* ==========================================================================
   NIGHTCLUB MODE — Easter Egg nocturno (02:00 – 04:59 h)
   Persiana metálica industrial con focos de discoteca y audio de fondo.
   Permite test manual con ?nightclub o #nightclub en la URL.
   ========================================================================== */

(function () {
    'use strict';

    function initNightclub(force) {
        var hour = new Date().getHours();
        var urlParams = new URLSearchParams(window.location.search);
        var isTest = force || urlParams.has('nightclub') || window.location.hash === '#nightclub';

        /* Solo se activa entre las 02:00 AM y las 04:59 AM (o con parámetro de test / botón) */
        if (!isTest && (hour < 2 || hour >= 5)) {
            return;
        }

        /* Evitar doble inicialización */
        if (document.getElementById('nightclub-shutter')) {
            return;
        }

        /* --- Detectar idioma activo (con soporte bilingüe) --- */
        var savedLang = localStorage.getItem('language');
        var lang = savedLang || document.documentElement.lang || 'es';

        /* --- Crear elemento semántico <section> para la persiana --- */
        var shutter = document.createElement('section');
        shutter.id = 'nightclub-shutter';
        shutter.setAttribute(
            'aria-label',
            lang === 'en'
                ? 'Nightclub mode active — come back after 5:00 AM'
                : 'Modo nocturno activo — vuelve después de las 5:00 AM'
        );

        /* --- Focos de discoteca (5 focos de colores animados en CSS) --- */
        for (var i = 1; i <= 5; i++) {
            var spot = document.createElement('span');
            spot.className = 'nc-spotlight nc-spotlight-' + i;
            shutter.appendChild(spot);
        }

        /* --- Bloque de mensaje central (semántica <article>) --- */
        var msgWrap = document.createElement('article');
        msgWrap.className = 'nc-message-wrap';

        var clock = document.createElement('p');
        clock.className = 'nc-clock';
        clock.textContent = '🪩';

        var title = document.createElement('h2');
        title.className = 'nc-title';
        title.textContent = lang === 'en'
            ? 'The website is resting…'
            : 'La web está durmiendo…';

        var subtitle = document.createElement('p');
        subtitle.className = 'nc-subtitle';
        subtitle.textContent = lang === 'en'
            ? 'Club closed until 5:00 AM'
            : 'Local cerrado hasta las 5:00 AM';

        var prompt = document.createElement('p');
        prompt.className = 'nc-prompt';
        prompt.id = 'nc-sound-prompt';
        prompt.textContent = lang === 'en'
            ? '🔊 Tap anywhere to enable sound'
            : '🔊 Toca en cualquier lugar para la música';

        msgWrap.appendChild(clock);
        msgWrap.appendChild(title);
        msgWrap.appendChild(subtitle);
        msgWrap.appendChild(prompt);
        shutter.appendChild(msgWrap);

        /* --- Inserción en el DOM y bloqueo total de interacción con la web --- */
        document.body.appendChild(shutter);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        /* Activar la animación de bajada de la persiana */
        requestAnimationFrame(function () {
            shutter.classList.add('nc-active');
        });

        /* --- Audio de fondo: YouTube (Lrle0x_DHBM) --- */
        var audioStarted = false;

        function startAudio() {
            if (audioStarted) return;

            var iframe = document.createElement('iframe');

            iframe.id = 'nc-audio-player';

            iframe.src =
                'https://www.youtube.com/embed/Lrle0x_DHBM' +
                '?autoplay=1' +
                '&loop=1' +
                '&playlist=Lrle0x_DHBM' +
                '&playsinline=1';

            iframe.allow = 'autoplay; encrypted-media';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';

            iframe.setAttribute('title', 'Reproductor de música');
            iframe.setAttribute('aria-hidden', 'true');
            iframe.setAttribute('tabindex', '-1');

            shutter.appendChild(iframe);

            audioStarted = true;

            prompt.classList.add('nc-prompt-hidden');
        }

        shutter.addEventListener('click', startAudio);

        /* Ocultar el botón de test si existe */
        var testBtn = document.getElementById('nc-test-btn');
        if (testBtn) testBtn.remove();
    }

    function createTestButton() {
        if (
            document.getElementById('nc-test-btn') ||
            document.getElementById('nightclub-shutter')
        ) {
            return;
        }

        var btn = document.createElement('button');
        btn.id = 'nc-test-btn';
        btn.textContent = '🪩';
        btn.title = 'Probar modo persiana';
        btn.setAttribute('aria-label', 'Probar modo persiana');

        btn.addEventListener('click', function () {
            btn.remove();
            initNightclub(true);
        });

        document.body.appendChild(btn);
    }


    function bindDegreeTrigger() {
        var degreeTitle = document.querySelector(
            'h3[data-i18n="studies_degree_title"]'
        );

        if (!degreeTitle || degreeTitle.dataset.ncBound) return;

        degreeTitle.dataset.ncBound = 'true';

        degreeTitle.addEventListener('click', function () {
            initNightclub(true);
        });
    }

    /* --- Inicialización --- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initNightclub();
            createTestButton();
            bindDegreeTrigger();
        });
    } else {
        initNightclub();
        createTestButton();
        bindDegreeTrigger();
    }
})();