
function init404Links() {
    const homeLink = document.getElementById('home-link');
    if (!homeLink) return;
    const path = window.location.pathname;
    let base = '/';
    if (path.includes('/EB-Web-Oficial/')) {
        base = '/EB-Web-Oficial/';
    }
    homeLink.href = base + 'index.html';
}

function initWave() {
    const canvas = document.getElementById('wave-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let time = 0;

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const isLight = document.documentElement.classList.contains('light-mode');

        const rCyan = isLight ? 2 : 0;
        const gCyan = isLight ? 132 : 210;
        const bCyan = isLight ? 199 : 255;

        const rBlue = isLight ? 124 : 0;
        const gBlue = isLight ? 58 : 50;
        const bBlue = isLight ? 237 : 240;

        time += 0.008;

        const numLines = 85;
        const pointsPerLine = 45;
        const cX = width / 2;
        const cY = height * 0.72;

        for (let i = 0; i < numLines; i++) {
            const x3d = (i - numLines / 2) * (width / (numLines * 0.5));

            const points = [];
            for (let j = 0; j < pointsPerLine; j++) {
                const z3d = j * 12;

                const angle1 = x3d * 0.003 + z3d * 0.008 - time * 2.2;
                const angle2 = x3d * 0.0015 - z3d * 0.004 + time * 1.2;
                
                const amp = 105 + Math.sin(x3d * 0.002) * 45;
                let y3d = Math.sin(angle1) * Math.cos(angle2) * amp;

                y3d += Math.sin(x3d * 0.006 - time * 3.0) * 15;

                y3d += (220 - z3d) * 0.28;

                const fov = 350;
                const scale = fov / (fov + z3d);
                const x2d = cX + x3d * scale;
                const y2d = cY + y3d * scale;

                points.push({
                    x: x2d,
                    y: y2d,
                    scale: scale,
                    depthRatio: j / pointsPerLine
                });
            }

            ctx.beginPath();
            ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
            for (let j = points.length - 2; j >= Math.floor(pointsPerLine / 2); j--) {
                ctx.lineTo(points[j].x, points[j].y);
            }
            ctx.lineWidth = points[points.length - 1].scale * 1.2;
            
            let gradBack = ctx.createLinearGradient(
                points[points.length - 1].x, points[points.length - 1].y,
                points[Math.floor(pointsPerLine / 2)].x, points[Math.floor(pointsPerLine / 2)].y
            );
            gradBack.addColorStop(0, `rgba(${rBlue}, ${gBlue}, ${bBlue}, 0.05)`);
            gradBack.addColorStop(1, `rgba(${rBlue}, ${gBlue}, ${bBlue}, 0.5)`);
            ctx.strokeStyle = gradBack;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(points[Math.floor(pointsPerLine / 2)].x, points[Math.floor(pointsPerLine / 2)].y);
            for (let j = Math.floor(pointsPerLine / 2) - 1; j >= 0; j--) {
                ctx.lineTo(points[j].x, points[j].y);
            }
            ctx.lineWidth = points[0].scale * 2.2;

            let gradFront = ctx.createLinearGradient(
                points[Math.floor(pointsPerLine / 2)].x, points[Math.floor(pointsPerLine / 2)].y,
                points[0].x, points[0].y
            );
            gradFront.addColorStop(0, `rgba(${rBlue}, ${gBlue}, ${bBlue}, 0.5)`);
            gradFront.addColorStop(0.5, `rgba(${rCyan}, ${gCyan}, ${bCyan}, 0.8)`);
            gradFront.addColorStop(1, `rgba(${rCyan}, ${gCyan}, ${bCyan}, 1.0)`);
            ctx.strokeStyle = gradFront;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(points[Math.floor(pointsPerLine / 3)].x, points[Math.floor(pointsPerLine / 3)].y);
            for (let j = Math.floor(pointsPerLine / 3) - 1; j >= 0; j--) {
                ctx.lineTo(points[j].x, points[j].y);
            }
            ctx.lineWidth = points[0].scale * 5.0;
            ctx.strokeStyle = `rgba(${rCyan}, ${gCyan}, ${bCyan}, 0.12)`;
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        initWave();
        init404Links();
    });
} else {
    initWave();
    init404Links();
}
