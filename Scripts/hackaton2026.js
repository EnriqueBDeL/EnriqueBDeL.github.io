/**
 * Script de interactividad para hackaton2026.html
 * Animación del contador de puntos (108 puntos) y microinteracciones
 * Sin JavaScript inline, ejecutado tras cargar el DOM
 */

document.addEventListener('DOMContentLoaded', () => {
    // Animación de conteo para el marcador de puntos
    const scoreElement = document.getElementById('vertex-score-count');
    
    if (scoreElement) {
        let hasAnimated = false;
        const targetScore = parseInt(scoreElement.getAttribute('data-target') || '108', 10);
        const duration = 1800; // ms
        const startTime = null;

        const animateCounter = (timestamp) => {
            if (!window._animScoreStart) window._animScoreStart = timestamp;
            const progress = Math.min((timestamp - window._animScoreStart) / duration, 1);
            
            // Easing cuadrático de salida para acabado suave
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentScore = Math.floor(easeOutProgress * targetScore);
            
            scoreElement.textContent = currentScore;

            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                scoreElement.textContent = targetScore;
            }
        };

        const scoreObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    requestAnimationFrame(animateCounter);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        scoreObserver.observe(scoreElement);
    }
});
