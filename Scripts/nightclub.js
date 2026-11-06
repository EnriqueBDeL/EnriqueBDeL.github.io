/* ==========================================================================
   NIGHTCLUB MODE — Easter Egg nocturno (02:00 – 05:00 h)
   Persiana industrial, focos de discoteca y música de fondo.
   Autoplay con alternativa manual si el navegador lo bloquea.
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
            ? 'website closed until 5:00 AM'
            : 'Web cerrada hasta las 5:00 AM';

        var prompt = document.createElement('p');
        prompt.className = 'nc-prompt';
        prompt.id = 'nc-sound-prompt';
        prompt.textContent = isEnglish
            ? '🔊 Trying to start the music…'
            : '🔊 Intentando iniciar la música…';

        /* Disculpa por los anuncios */
        var adApology = document.createElement('p');
        adApology.className = 'nc-apology';
        adApology.style.fontSize = '0.85em';
        adApology.style.opacity = '0.7';
        adApology.style.margin = '15px 0 10px 0';
        adApology.textContent = isEnglish
            ? 'Sorry if an ad plays first. You can show the video below to skip it.'
            : 'Disculpa si suena un anuncio primero. Puedes mostrar el vídeo abajo para saltarlo.';

        /* Botón de activación manual principal */
        var soundButton = document.createElement('button');
        soundButton.id = 'nc-sound-btn';
        soundButton.type = 'button';
        soundButton.className = 'nc-sound-btn';
        soundButton.textContent = isEnglish ? '▶ Enable music' : '▶ Activar música';
        soundButton.hidden = true;

        /* Botón estético para mostrar/ocultar el vídeo */
        var toggleVideoBtn = document.createElement('button');
        toggleVideoBtn.id = 'nc-toggle-video-btn';
        toggleVideoBtn.type = 'button';
        toggleVideoBtn.textContent = isEnglish
            ? '👁️ Show video (Skip Ad)'
            : '👁️ Mostrar vídeo (Saltar anuncio)';
        
        // Estilos integrados para el botón
        toggleVideoBtn.style.marginTop = '15px';
        toggleVideoBtn.style.padding = '10px 24px';
        toggleVideoBtn.style.fontSize = '0.9em';
        toggleVideoBtn.style.color = '#fff';
        toggleVideoBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        toggleVideoBtn.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        toggleVideoBtn.style.borderRadius = '30px';
        toggleVideoBtn.style.cursor = 'pointer';
        toggleVideoBtn.style.backdropFilter = 'blur(4px)';
        toggleVideoBtn.style.transition = 'background 0.3s ease, transform 0.2s ease';
        toggleVideoBtn.hidden = true;

        toggleVideoBtn.onmouseover = function() { 
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; 
            this.style.transform = 'scale(1.02)';
        };
        toggleVideoBtn.onmouseout = function() { 
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; 
            this.style.transform = 'scale(1)';
        };

        msgWrap.appendChild(clock);
        msgWrap.appendChild(title);
        msgWrap.appendChild(subtitle);
        msgWrap.appendChild(prompt);
        msgWrap.appendChild(adApology);
        msgWrap.appendChild(soundButton);
        msgWrap.appendChild(toggleVideoBtn);

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
        var isVideoVisible = false;

        function startAudio() {
            if (audioStarted || playerRequested) {
                return;
            }

            playerRequested = true;
            soundButton.disabled = true;
            soundButton.textContent = isEnglish ? '⏳ Loading player…' : '⏳ Cargando reproductor…';

            var iframe = document.createElement('iframe');
            iframe.id = 'nc-audio-player';

            iframe.src =
                'https://www.youtube-nocookie.com/embed/Lrle0x_DHBM' +
                '?autoplay=1' +
                '&loop=1' +
                '&playlist=Lrle0x_DHBM' +
                '&playsinline=1';

            iframe.allow = 'autoplay; encrypted-media';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.setAttribute('title', isEnglish ? 'Music player' : 'Reproductor de música');
            iframe.setAttribute('allowfullscreen', '');
            
            // Estado oculto inicial del iframe
            iframe.style.position = 'absolute';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.style.border = '0';
            iframe.style.opacity = '0';
            iframe.style.pointerEvents = 'none';

            shutter.appendChild(iframe);
            toggleVideoBtn.hidden = false;

            window.setTimeout(function () {
                if (audioStarted) return;

                prompt.textContent = isEnglish
                    ? 'If you cannot hear the music, use the button below.'
                    : 'Si no escuchas la música, pulsa el botón de abajo.';

                soundButton.disabled = false;
                soundButton.hidden = true;
                soundButton.textContent = isEnglish
                    ? '▶ Open music player'
                    : '▶ Abrir reproductor de música';

                playerRequested = false;
            }, 2500);
        }

        /* Lógica para mostrar/ocultar y centrar el vídeo */
        toggleVideoBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            var player = document.getElementById('nc-audio-player');
            if (!player) return;

            if (isVideoVisible) {
                // Ocultar
                player.style.width = '1px';
                player.style.height = '1px';
                player.style.opacity = '0';
                player.style.pointerEvents = 'none';
                player.style.transform = 'none';
                
                toggleVideoBtn.textContent = isEnglish
                    ? '👁️ Show video (Skip Ad)'
                    : '👁️ Mostrar vídeo (Saltar anuncio)';
                isVideoVisible = false;
            } else {
                // Mostrar centrado
                player.style.width = '320px';
                player.style.height = '180px';
                player.style.opacity = '1';
                player.style.pointerEvents = 'auto';
                
                // Posición central inferior
                player.style.bottom = '10%';
                player.style.left = '50%';
                player.style.transform = 'translateX(-50%)';
                player.style.zIndex = '9999';
                
                // Mejoras visuales del marco
                player.style.borderRadius = '12px';
                player.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
                player.style.border = '1px solid rgba(255, 255, 255, 0.1)';

                toggleVideoBtn.textContent = isEnglish ? '❌ Hide video' : '❌ Ocultar vídeo';
                isVideoVisible = true;
            }
        });

        function startAudioManually() {
            var oldPlayer = document.getElementById('nc-audio-player');
            if (oldPlayer) {
                oldPlayer.remove();
            }
            playerRequested = false;
            audioStarted = false;
            isVideoVisible = false;
            
            toggleVideoBtn.textContent = isEnglish
                ? '👁️ Show video (Skip Ad)'
                : '👁️ Mostrar vídeo (Saltar anuncio)';

            startAudio();
        }

        soundButton.addEventListener('click', function (event) {
            event.stopPropagation();
            startAudioManually();
        });

        startAudio();

        var testBtn = document.getElementById('nc-test-btn');
        if (testBtn) {
            testBtn.remove();
        }
    }

    function bindDegreeTrigger() {
        function attachTrigger() {
            var trigger = document.getElementById('nightclub-trigger');

            if (!trigger || trigger.dataset.ncBound) {
                return;
            }

            trigger.dataset.ncBound = 'true';

            trigger.addEventListener('click', function (event) {
                event.stopPropagation();
                initNightclub(true);
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', attachTrigger);
        } else {
            attachTrigger();
        }
    }

    window.initNightclub = initNightclub;
    window.bindDegreeTrigger = bindDegreeTrigger;

    function startNightclub() {
        initNightclub();
        bindDegreeTrigger();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startNightclub);
    } else {
        startNightclub();
    }
})();