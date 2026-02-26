document.addEventListener("DOMContentLoaded", () => {

    // 🌙 Check if dark mode was previously enabled
    const isDarkMode = localStorage.getItem("dark-mode") === "true";

    // 🌙 Create Dark Mode Toggle Button (Floating)
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = "dark-mode-toggle";
    darkModeToggle.innerText = isDarkMode ? "☀️" : "🌙";
    document.body.appendChild(darkModeToggle);

    // 🌙 Apply Saved Dark Mode Preference
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }

    // 🌙 Function to Toggle Dark Mode
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        const isDarkModeActive = document.body.classList.contains("dark-mode");

        // 🔄 Update Button Icon
        darkModeToggle.innerText = isDarkModeActive ? "☀️" : "🌙";

        // 🔄 Save Mode in Local Storage
        localStorage.setItem("dark-mode", isDarkModeActive);
    }

    // 🌙 Attach Event Listener to Button
    darkModeToggle.addEventListener("click", toggleDarkMode);

    // 🔹 Auto-detect Dark Mode on First Visit (Optional)
    if (localStorage.getItem("dark-mode") === null) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark-mode");
            darkModeToggle.innerText = "☀️";
            localStorage.setItem("dark-mode", "true");
        } else {
            localStorage.setItem("dark-mode", "false");
        }
    }
});
