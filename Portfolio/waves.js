const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let waves = [];
const numWaves = 4;
const waveHeight = 50;
const waveSpeed = 0.02;
let seaLevel = window.innerHeight * 0.8;
let scrollProgress = 0;
let showSeafloor = false;

const waveBaseColors = [
    [173, 216, 230], 
    [135, 206, 250], 
    [0, 123, 255],   
    [0, 50, 100]     
];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Waves
for (let i = 0; i < numWaves; i++) {
    waves.push({
        amplitude: waveHeight / (i + 1),
        wavelength: 250 + i * 50,
        phase: Math.random() * Math.PI * 2,
        speed: waveSpeed * (i + 1),
        baseColor: waveBaseColors[i],
        color: `rgba(${waveBaseColors[i][0]}, ${waveBaseColors[i][1]}, ${waveBaseColors[i][2]}, 0.6)`
    });
}

function updateWaveColors() {
    let darknessFactor = Math.min(scrollProgress / window.innerHeight, 1);

    waves.forEach((wave) => {
        let [r, g, b] = wave.baseColor;
        let darkenedR = Math.max(r - (darknessFactor * 50), 0);
        let darkenedG = Math.max(g - (darknessFactor * 50), 0);
        let darkenedB = Math.max(b - (darknessFactor * 50), 0);

        wave.color = `rgba(${darkenedR}, ${darkenedG}, ${darkenedB}, 0.6)`;
    });
}

function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawDepthEffect(); 

    waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, seaLevel);

        for (let x = 0; x < canvas.width; x++) {
            let y = Math.sin((x / wave.wavelength) * Math.PI * 2 + wave.phase) * wave.amplitude;
            ctx.lineTo(x, seaLevel + y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();

        wave.phase += wave.speed;
    });

    if (showSeafloor) {
        drawSeafloor(); 
    }

    requestAnimationFrame(drawWaves);
}

// **💙 Depth Gradient**
function drawDepthEffect() {
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(133, 176, 200, 1)"); 
    gradient.addColorStop(0.3, "rgba(95, 166, 220, 1)");
    gradient.addColorStop(0.6, "rgba(0, 93, 200, 1)");
    gradient.addColorStop(1, "rgba(0, 10, 30, 1)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// **🏝️ Sand**
function drawSeafloor() {
    let seafloorHeight = 100;
    let starfishX = canvas.width * 0.7;
    let starfishY = canvas.height - seafloorHeight + 20;

    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, canvas.height - seafloorHeight, canvas.width, seafloorHeight);

    drawStarfish(starfishX, starfishY, 30, 12);
}

// **🐠 Starfish**
function drawStarfish(x, y, outerR, innerR) {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "yellow"; 
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

    drawStripes(x, y, outerR, innerR);
    drawFixedDots(x, y);
}

// **🌟 Lines on starfish **
function drawStripes(x, y, outerR, innerR) {
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;

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

// **⚪ Dots on starfish**
function drawFixedDots(x, y) {
    const dotPositions = [
        [x - 10, y - 10], [x + 10, y + 10], [x - 15, y + 5],
        [x + 15, y - 5], [x - 5, y + 15], [x + 5, y - 15]
    ];

    ctx.fillStyle = "white";

    dotPositions.forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

drawWaves();

// **🔻 Check Scroll to show Sand onlt at the end of the website**
window.addEventListener("scroll", () => {
    scrollProgress = window.scrollY;
    seaLevel = window.innerHeight * 0.8 - (scrollProgress * 0.3);

    updateWaveColors();

    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;
    let scrollPosition = window.scrollY + windowHeight;

    showSeafloor = scrollPosition >= documentHeight - 5;
});

// **🔹 Update Canvas Dimensions if Screen Changes**
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
