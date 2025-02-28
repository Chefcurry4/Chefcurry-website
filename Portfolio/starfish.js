document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("starfishCanvas");
    const ctx = canvas.getContext("2d");

    const starfishX = 200;
    const starfishY = 200;
    const outerRadius = 60;
    const innerRadius = 25;

    function drawStarfish(x, y, outerR, innerR) {
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < 10; i++) {
            let angle = (Math.PI / 5) * i;
            let radius = i % 2 === 0 ? outerR : innerR;
            let px = x + Math.cos(angle) * radius;
            let py = y + Math.sin(angle) * radius;
            ctx.lineTo(px, py);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    function drawStripes(x, y, outerR, innerR) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 4;
        
        for (let i = 0; i < 5; i++) {
            let angle = (Math.PI / 180) * (i * 72);
            let startX = x + Math.cos(angle) * innerR;
            let startY = y + Math.sin(angle) * innerR;
            let endX = x + Math.cos(angle) * outerR;
            let endY = y + Math.sin(angle) * outerR;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }

    function drawDots(x, y, numDots) {
        ctx.fillStyle = "white";

        for (let i = 0; i < numDots; i++) {
            let angle = Math.random() * Math.PI * 2;
            let radius = Math.random() * outerRadius * 0.9;
            let dotX = x + Math.cos(angle) * radius;
            let dotY = y + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawStarfish(starfishX, starfishY, outerRadius, innerRadius);
    drawStripes(starfishX, starfishY, outerRadius, innerRadius);
    drawDots(starfishX, starfishY, 20);
});
