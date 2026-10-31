
/* ==========================================================================
   NIGHTCLUB MODE — Easter Egg nocturno (02:00 – 04:59 h)
   Persiana industrial, focos de discoteca y música de fondo.
   Autoplay con alternativa manual si el navegador lo bloquea.
   Prueba: ?nightclub o #nightclub
   ========================================================================== */

(function () {
    'use strict';

    function initNightclub(force) {
        var hour = new Date().getHours();
        var urlParams = new URLSearchParams(window.location.search);

        var isTest = force ||
            urlParams.has('nightclub') ||
            window.location.hash === '#nightclub';

        /* Activación horaria */
        if (!isTest && (hour < 2 || hour >= 5)) {
            return;
        }

        /* Evitar inicialización duplicada */
        if (document.getElementById('nightclub-shutter')) {
            return;
        }

        /* Idioma */
        var savedLang = localStorage.getItem('language');
        var lang = savedLang ||
            document.documentElement.lang ||
            'es';

        var isEnglish = lang.toLowerCase().indexOf('en') === 0;

        /* Persiana */
        var shutter = document.createElement('section');
        shutter.id = 'nightclub-shutter';

        shutter.setAttribute(
            'aria-label',
            isEnglish
                ? 'Nightclub mode active — come back after 5:00 AM'
                : 'Modo nocturno activo — vuelve después de las 5:00 AM'
        );

        /* Focos */
        for (var i = 1; i <= 5; i++) {
            var spot = document.createElement('span');
            spot.className = 'nc-spotlight nc-spotlight-' + i;
            shutter.appendChild(spot);
        }

        /* Mensaje central */
        var msgWrap = document.createElement('article');
        msgWrap.className = 'nc-message-wrap';

        var clock = document.createElement('p');
        clock.className = 'nc-clock';
        clock.textContent = '🪩';

        var title = document.createElement('h2');
        title.className = 'nc-title';
        title.textContent = isEnglish
            ? 'The website is resting…'
            : 'La web está durmiendo…';

        var subtitle = document.createElement('p');
        subtitle.className = 'nc-subtitle';
        subtitle.textContent = isEnglish
            ? 'Club closed until 5:00 AM'
            : 'Local cerrado hasta las 5:00 AM';

        var prompt = document.createElement('p');
        prompt.className = 'nc-prompt';
        prompt.id = 'nc-sound-prompt';
        prompt.textContent = isEnglish
            ? '🔊 Trying to start the music…'
            : '🔊 Intentando iniciar la música…';

        /* Botón de activación manual */
        var soundButton = document.createElement('button');
        soundButton.id = 'nc-sound-btn';
        soundButton.type = 'button';
        soundButton.className = 'nc-sound-btn';
        soundButton.textContent = isEnglish
            ? '▶ Enable music'
            : '▶ Activar música';

        soundButton.hidden = true;

        msgWrap.appendChild(clock);
        msgWrap.appendChild(title);
        msgWrap.appendChild(subtitle);
        msgWrap.appendChild(prompt);
        msgWrap.appendChild(soundButton);

        shutter.appendChild(msgWrap);

        /* Insertar persiana */
        document.body.appendChild(shutter);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        requestAnimationFrame(function () {
            shutter.classList.add('nc-active');
        });

        /* Audio */
        var audioStarted = false;
        var playerRequested = false;

        function startAudio() {
            if (audioStarted || playerRequested) {
                return;
            }

            playerRequested = true;
            soundButton.disabled = true;
            soundButton.textContent = isEnglish
                ? '⏳ Loading player…'
                : '⏳ Cargando reproductor…';

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

            iframe.setAttribute(
                'title',
                isEnglish ? 'Music player' : 'Reproductor de música'
            );

            iframe.setAttribute('allowfullscreen', '');
            iframe.style.position = 'absolute';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.style.border = '0';
            iframe.style.opacity = '0';
            iframe.style.pointerEvents = 'none';

            shutter.appendChild(iframe);

            /*
             * La carga del iframe no confirma que el audio se esté oyendo.
             * Se ofrece una alternativa manual si no se puede confirmar
             * la reproducción.
             */
            window.setTimeout(function () {
                if (audioStarted) {
                    return;
                }

                prompt.textContent = isEnglish
                    ? 'If you cannot hear the music, use the button below.'
                    : 'Si no escuchas la música, pulsa el botón de abajo.';

                soundButton.disabled = false;
                soundButton.hidden = false;
                soundButton.textContent = isEnglish
                    ? '▶ Open music player'
                    : '▶ Abrir reproductor de música';

                playerRequested = false;
            }, 2500);
        }

        /*
         * Con YouTube incrustado no podemos confirmar de forma fiable
         * el inicio del audio sin utilizar la API oficial del reproductor.
         * El clic manual vuelve a crear el reproductor.
         */
        function startAudioManually() {
            var oldPlayer = document.getElementById('nc-audio-player');

            if (oldPlayer) {
                oldPlayer.remove();
            }

            playerRequested = false;
            audioStarted = false;

            startAudio();
        }

        soundButton.addEventListener('click', function (event) {
            event.stopPropagation();
            startAudioManually();
        });

        /*
         * Intento automático. El navegador puede bloquear el sonido
         * si no existe interacción previa del usuario.
         */
        startAudio();

        /* Evitar que cualquier clic genere múltiples reproductores */
        shutter.addEventListener('click', function () {
            if (!audioStarted && !playerRequested) {
                startAudio();
            }
        });

        /* Ocultar botón de test existente */
        var testBtn = document.getElementById('nc-test-btn');
        if (testBtn) {
            testBtn.remove();
        }
    }

    function bindDegreeTrigger() {
        var degreeTitle = document.querySelector(
            'h3[data-i18n="studies_degree_title"]'
        );

        if (!degreeTitle || degreeTitle.dataset.ncBound) {
            return;
        }

        degreeTitle.dataset.ncBound = 'true';

        degreeTitle.addEventListener('click', function () {
            initNightclub(true);
        });
    }

    /* Inicialización */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initNightclub();
            bindDegreeTrigger();
        });
    } else {
        initNightclub();
        bindDegreeTrigger();
    }
})();
