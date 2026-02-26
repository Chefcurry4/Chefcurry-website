// 🔹 Smooth Scrolling
document.addEventListener("DOMContentLoaded", () => {
    function setupCarousel(wrapperSelector, trackSelector, prevBtnSelector, nextBtnSelector) {
        const wrapper = document.querySelector(wrapperSelector);
        const track = document.querySelector(trackSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);
        const cards = track.querySelectorAll(".project-card");

        if (!wrapper || !track || !prevBtn || !nextBtn || cards.length < 1) return;

        const cardWidth = cards[0].offsetWidth + 20; 
        let index = 0;

        function updateButtons() {
            prevBtn.style.opacity = index === 0 ? "0.3" : "1";
            prevBtn.style.pointerEvents = index === 0 ? "none" : "auto";
            nextBtn.style.opacity = index >= cards.length - 2 ? "0.3" : "1";
            nextBtn.style.pointerEvents = index >= cards.length - 2 ? "none" : "auto";
        }

        nextBtn.addEventListener("click", () => {
            if (index < cards.length - 2) {
                index += 2;
                track.style.transform = `translateX(${-index * cardWidth}px)`;
                track.style.transition = "transform 0.6s ease-in-out";
                updateButtons();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (index > 0) {
                index -= 2;
                track.style.transform = `translateX(${-index * cardWidth}px)`;
                track.style.transition = "transform 0.6s ease-in-out";
                updateButtons();
            }
        });

        // Ensure proper layout for carousel
        wrapper.style.overflow = "hidden";
        track.style.display = "flex";
        track.style.gap = "20px";
        track.style.transition = "transform 0.6s ease-in-out";

        updateButtons();
    }

    setupCarousel(".carousel-wrapper", "#ml-projects", "#prevBtnML", "#nextBtnML");
    setupCarousel(".carousel-wrapper", "#cfd-projects", "#prevBtnCFD", "#nextBtnCFD");
    setupCarousel(".carousel-wrapper", "#other-projects", "#prevBtnOther", "#nextBtnOther");

    // 🔹 Remove unwanted hover scaling effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.transition = "none"; 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelectorAll(".in-progress").forEach(element => {
        element.addEventListener("click", (event) => {
            event.preventDefault(); 
            popup.style.display = "block";
        });
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});

// 🔹 Hover Effect for Project Cards
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;  

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
});


