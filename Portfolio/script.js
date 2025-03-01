document.addEventListener("DOMContentLoaded", () => {

    // 🟢 Adds hover scaling effect to project and post items
    document.querySelectorAll('.project-item, .post-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // 🟢 Implements fade-in animation when elements come into view
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');  
            }
        });
    }, { threshold: 0.3 });

    fadeElements.forEach(el => observer.observe(el)); 

    // 🟢 Enables smooth scrolling when clicking navigation links
    document.querySelectorAll(".nav-links a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetHref = this.getAttribute("href");
    
            // Controlla se il link punta a un'altra pagina
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
    

    // 🟢 Creates a dynamic "moving light" effect that follows the mouse
    let light = document.createElement('div');  
    light.classList.add('moving-light');
    document.body.appendChild(light);

    document.addEventListener('mousemove', (event) => {
        light.style.top = `${event.clientY - 50}px`;
        light.style.left = `${event.clientX - 50}px`;
    });

    // Hide the moving light effect on small screens
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            light.style.display = "none";
        } else {
            light.style.display = "block";
        }
    });

    // 🟢 Typewriter effect for Hero Section
    function typeWriterEffect(element, text, speed = 100) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        element.innerHTML = ""; 
        type();
    }

    typeWriterEffect(document.querySelector(".hero h1"), "Massimo Perfetti");
    typeWriterEffect(document.querySelector(".hero p"), "MSc Mechanical Engineering | Machine Learning | CFD Enthusiast", 50);

    // 🟢 Auto-scroll for portfolio & posts sections
    function autoScroll(containerSelector, speed = 2) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        let scrollAmount = 0;
        function scroll() {
            if (scrollAmount < container.scrollWidth) {
                container.scrollLeft += speed;
                scrollAmount += speed;
            } else {
                scrollAmount = 0;
                container.scrollLeft = 0;
            }
            requestAnimationFrame(scroll);
        }
        scroll();
    }

    autoScroll(".scroll-container");

    // 🟢 Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerText = "🌙 Toggle Dark Mode";
    darkModeToggle.style.position = "fixed";
    darkModeToggle.style.bottom = "20px";
    darkModeToggle.style.right = "20px";
    darkModeToggle.style.padding = "10px 15px";
    darkModeToggle.style.zIndex = "1000";
    darkModeToggle.style.cursor = "pointer";
    darkModeToggle.style.background = "#333";
    darkModeToggle.style.color = "#fff";
    darkModeToggle.style.border = "none";
    darkModeToggle.style.borderRadius = "8px";

    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Add dark mode styles dynamically
    const darkModeStyles = document.createElement('style');
    darkModeStyles.innerHTML = `
        .dark-mode {
            background: #121212;
            color: #fff;
        }
        .dark-mode .top-nav {
            background: #222;
        }
        .dark-mode .project-item, .dark-mode .post-item {
            background: #333;
            color: white;
        }
    `;
    document.head.appendChild(darkModeStyles);

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".publication-item").forEach(item => {
            item.addEventListener("mouseenter", () => {
                item.style.transform = "scale(1.05)";
            });
            item.addEventListener("mouseleave", () => {
                item.style.transform = "scale(1)";
            });
        });
    });

    // Posts
    // 🔹 Hover effect for cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // 🔹 Typewriter effect for Hero Section
    function typeWriterEffect(element, text, speed = 100) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        element.innerHTML = "";
        type();
    }

    typeWriterEffect(document.querySelector(".hero h1"), "Massimo Perfetti");

    // 🔹 Modal for post details
    const modal = document.getElementById("post-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalCaption = document.getElementById("modal-caption");
    const modalLink = document.getElementById("modal-link");
    const closeModal = document.querySelector(".close");

    let currentPost = null;
    let currentImgIndex = 0;

    document.querySelectorAll(".post-item").forEach(post => {
        post.addEventListener("click", () => {
            const postId = parseInt(post.getAttribute("data-post-id"));
            currentPost = posts.find(p => p.id === postId);
            currentImgIndex = 0;

            if (currentPost) {
                modal.style.display = "flex";
                modalImg.src = currentPost.images[currentImgIndex];
                modalTitle.textContent = currentPost.title;
                modalCaption.textContent = currentPost.caption;
                modalLink.href = currentPost.link;
            }
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    document.querySelector(".next-btn").addEventListener("click", () => {
        if (currentPost && currentImgIndex < currentPost.images.length - 1) {
            currentImgIndex++;
            modalImg.src = currentPost.images[currentImgIndex];
        }
    });

    document.querySelector(".prev-btn").addEventListener("click", () => {
        if (currentPost && currentImgIndex > 0) {
            currentImgIndex--;
            modalImg.src = currentPost.images[currentImgIndex];
        }
    });

});
 // 🔹 Loader Animation
document.addEventListener("DOMContentLoaded", () => {
    const mpText = document.getElementById("mp-text");
    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Loading may take a while at the beginning.";
    loadingMessage.style.fontSize = "14px";
    loadingMessage.style.color = "#fff";
    loadingMessage.style.textAlign = "center";
    loadingMessage.style.marginTop = "10px";
    mpText.parentNode.appendChild(loadingMessage);

    const preloader = document.getElementById("preloader");

    function animateLoader() {
        mpText.style.opacity = "0";  
        loadingMessage.style.opacity = "0";
        
        setTimeout(() => {
            mpText.style.opacity = "1";
            loadingMessage.style.opacity = "1";
        }, 500);
    }

    // Repeat loader animation
    const animationInterval = setInterval(animateLoader, 2500);

    // When page is loaded, hide the preloader
    window.addEventListener("load", () => {
        clearInterval(animationInterval); 
        preloader.style.opacity = "0";

        setTimeout(() => {
            preloader.style.display = "none"; 
        }, 500);
    });
});
