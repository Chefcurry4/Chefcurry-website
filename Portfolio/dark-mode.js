document.addEventListener("DOMContentLoaded", () => {

    // 🌙 Check if dark mode was previously enabled
    const isDarkMode = localStorage.getItem("dark-mode") === "true";

    // 🌙 Create Dark Mode Toggle Button (Floating)
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = "dark-mode-toggle";
    darkModeToggle.innerText = isDarkMode ? "☀️" : "🌙"; // Adjust icon based on mode
    document.body.appendChild(darkModeToggle);

    // 🌙 Apply Saved Dark Mode Preference
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        updateWaveDarkMode(true);
        adjustImageContrast();
    }

    // 🌙 Function to Toggle Dark Mode
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        const isDarkModeActive = document.body.classList.contains("dark-mode");

        // 🔄 Update Button Icon
        darkModeToggle.innerText = isDarkModeActive ? "☀️" : "🌙";

        // 🔄 Save Mode in Local Storage
        localStorage.setItem("dark-mode", isDarkModeActive);

        // 🔄 Update Waves for Dark Mode
        updateWaveDarkMode(isDarkModeActive);
        adjustImageContrast();
    }

    // 🌙 Attach Event Listener to Button
    darkModeToggle.addEventListener("click", toggleDarkMode);

    // 🔹 Auto-detect Dark Mode on First Visit (Optional)
    if (localStorage.getItem("dark-mode") === null) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark-mode");
            darkModeToggle.innerText = "☀️";
            updateWaveDarkMode(true);
            adjustImageContrast();
            localStorage.setItem("dark-mode", "true"); // Save dark mode as default if system prefers it
        } else {
            localStorage.setItem("dark-mode", "false"); // Default to light mode on first visit
        }
    }

    // 🌊 Update Waves for Dark Mode
    function updateWaveDarkMode(isDarkModeActive) {
        let darknessFactor = isDarkModeActive ? 1 : Math.min(scrollProgress / window.innerHeight, 1);

        waves.forEach((wave) => {
            let [r, g, b] = wave.baseColor;
            let darkenedR = Math.max(r - (darknessFactor * 80), 0);
            let darkenedG = Math.max(g - (darknessFactor * 80), 0);
            let darkenedB = Math.max(b - (darknessFactor * 80), 0);

            wave.color = `rgba(${darkenedR}, ${darkenedG}, ${darkenedB}, 0.6)`;
        });
    }

    // 🔄 Adjust Waves in Real Time When Scrolling
    window.addEventListener("scroll", () => {
        scrollProgress = window.scrollY;
        seaLevel = window.innerHeight * 0.8 - (scrollProgress * 0.3);
        updateWaveDarkMode(document.body.classList.contains("dark-mode"));
    });

    // 🔄 Smooth Fade-in Effect
    document.querySelectorAll(".fade-in").forEach((el) => {
        el.classList.add("visible");
    });

    // 🔄 Fix Image Inversion in Dark Mode
    function adjustImageContrast() {
        document.querySelectorAll("img").forEach((img) => {
            img.style.filter = document.body.classList.contains("dark-mode")
                ? "brightness(0.85) contrast(1.1)"
                : "none";
        });
    }

    // 🔄 Run Image Adjustments on Toggle
    darkModeToggle.addEventListener("click", adjustImageContrast);

    // 🔄 Apply Changes on Load
    adjustImageContrast();
});
