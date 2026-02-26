document.addEventListener("DOMContentLoaded", () => {
    // Hover Effect for Images
    const images = document.querySelectorAll(".article-image");
    images.forEach(img => {
        img.addEventListener("mouseenter", () => {
            img.style.transform = "scale(1.02)";
        });
        img.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1)";
        });
    });
});
