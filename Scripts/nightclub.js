
(() => {
    const NIGHTCLUB_DAYS = [5, 6, 0]; // Viernes, sábado y domingo
    const START_HOUR = 2;
    const END_HOUR = 5;
    const YOUTUBE_VIDEO_ID = "Lrle0x_DHBM";

    let player = null;
    let overlay = null;
    let debugMode = false;

    function isNightclubTime() {
        const now = new Date();

        return (
            NIGHTCLUB_DAYS.includes(now.getDay()) &&
            now.getHours() >= START_HOUR &&
            now.getHours() < END_HOUR
        );
    }

    function getPlayerUrl() {
        const params = new URLSearchParams({
            autoplay: "1",
            playsinline: "1",
            enablejsapi: "1"
        });

        return `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?${params}`;
    }

    function createNightclub() {
        if (overlay) return;

        if (!debugMode && !isNightclubTime()) return;

        overlay = document.createElement("div");
        overlay.id = "nightclub-shutter";

        overlay.innerHTML = `
            <div class="nightclub-content">
                <div class="nightclub-icon">🌙</div>

                <h1>NIGHTCLUB MODE</h1>

                <p class="nightclub-description">
                    Es hora de dejar que la noche tome el control.
                </p>

                <div class="nightclub-equalizer" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <p id="music-status" role="status">
                    🎵 Intentando iniciar la música...
                </p>

                <button id="start-nightclub-music" type="button">
                    🔊 Activar música
                </button>

                <p class="music-help">
                    ¿No suena la música? Pulsa «Activar música».
                    Tu navegador podría bloquear la reproducción automática.
                </p>

                ${debugMode ? `
                    <p class="nightclub-debug">DEBUG MODE ACTIVADO</p>
                    <button id="close-nightclub-debug" type="button">
                        ✖ Cerrar modo de prueba
                    </button>
                ` : ""}
            </div>
        `;

        document.body.appendChild(overlay);

        player = document.createElement("iframe");
        player.id = "nc-audio-player";
        player.title = "Reproductor de música Nightclub";
        player.allow = "autoplay; encrypted-media; picture-in-picture";
        player.src = getPlayerUrl();

        document.body.appendChild(player);

        document.getElementById("start-nightclub-music")
            .addEventListener("click", () => {
                if (!player) return;

                player.src = getPlayerUrl();

                document.getElementById("music-status").textContent =
                    "🎵 Reintentando reproducir la música...";
            });

        const closeButton = document.getElementById(
            "close-nightclub-debug"
        );

        if (closeButton) {
            closeButton.addEventListener("click", () => {
                debugMode = false;
                stopNightclub();
            });
        }
    }

    function stopNightclub() {
        if (player) {
            player.src = "about:blank";
            player.remove();
            player = null;
        }

        if (overlay) {
            overlay.remove();
            overlay = null;
        }
    }

    function checkSchedule() {
        if (debugMode || isNightclubTime()) {
            createNightclub();
        } else {
            stopNightclub();
        }
    }

    // DEBUG: clic en la primera letra G del título de estudios.
    const degreeTitle = document.querySelector(
        'h3[data-i18n="studies_degree_title"]'
    );

    if (degreeTitle) {
        degreeTitle.style.cursor = "pointer";
        degreeTitle.title = "Pulsa la G inicial para probar Nightclub";

        degreeTitle.addEventListener("click", (event) => {
            const rect = degreeTitle.getBoundingClientRect();

            // Activar solo si el clic cae en la zona de la primera letra.
            if (
                event.clientX >= rect.left &&
                event.clientX <= rect.left + 18
            ) {
                debugMode = true;
                createNightclub();
            }
        });
    }

    // Comprobar horario al cargar y mientras la página siga abierta.
    checkSchedule();

    window.setInterval(checkSchedule, 15000);

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            checkSchedule();
        }
    });
})();
