document.addEventListener("DOMContentLoaded", () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll(".nav-links a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetHref = this.getAttribute("href");
    
            if (!targetHref.includes(".html") && targetHref.startsWith("#")) {
                e.preventDefault();
                const targetId = targetHref.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // Fade-in animation when elements come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');  
            }
        });
    }, { threshold: 0.3 });
    fadeElements.forEach(el => observer.observe(el));

});

// Preloader Animation
document.addEventListener("DOMContentLoaded", () => {
    const mpText = document.getElementById("mp-text");
    const preloader = document.getElementById("preloader");

    if (mpText && preloader) {
        function animateLoader() {
            mpText.style.opacity = "0";  
            setTimeout(() => {
                mpText.style.opacity = "1";
            }, 500);
        }

        const animationInterval = setInterval(animateLoader, 1000);

        window.addEventListener("load", () => {
            clearInterval(animationInterval); 
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none"; 
            }, 500);
        });
    }
});
