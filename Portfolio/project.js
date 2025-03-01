document.addEventListener("DOMContentLoaded", () => {
    // Fading Effect for Images
    const images = document.querySelectorAll(".article-image");
    images.forEach(img => {
        img.style.opacity = "0";
        setTimeout(() => {
            img.style.opacity = "0.7";
            img.style.transition = "opacity 1s ease-in-out";
        }, 500);
    });

    // Hover Effect for Images
    images.forEach(img => {
        img.addEventListener("mouseenter", () => {
            img.style.opacity = "1";
            img.style.transform = "scale(1.1)";
        });
        img.addEventListener("mouseleave", () => {
            img.style.opacity = "0.7";
            img.style.transform = "scale(1)";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const feedbackSliderContainer = document.querySelector(".feedback-slider-container");
    const labels = document.querySelectorAll(".feedback-label");
    const feedbackText = document.getElementById("selected-feedback");
    const feedbackEmoji = document.getElementById("selected-emoji");  
    const feedbackInput = document.getElementById("feedback-input");
    const feedbackForm = document.getElementById("feedback-form");

    let feedbackLevels = ["😡 Very Bad", "🙁 Bad", "😐 Neutral", "🙂 Good", "😃 Great", "🤩 Excellent"];

    // Detect scroll movement
    feedbackSliderContainer.addEventListener("scroll", () => {
        let scrollLeft = feedbackSliderContainer.scrollLeft;
        let maxScroll = feedbackSliderContainer.scrollWidth - feedbackSliderContainer.clientWidth;
        let percentage = scrollLeft / maxScroll;
        let index = Math.round(percentage * (labels.length - 1));

        // Update feedback text and emoji
        let selectedFeedback = labels[index].getAttribute("data-value");
        let selectedEmojiOnly = labels[index].textContent;

        feedbackText.textContent = selectedFeedback;  
        feedbackEmoji.textContent = selectedEmojiOnly;  
        feedbackInput.value = selectedFeedback;  

        // Highlight only the active emoji
        labels.forEach(label => label.classList.remove("active"));
        labels[index].classList.add("active");
    });

    // Submission section
    feedbackForm.addEventListener("submit", (event) => {
        const feedbackValue = feedbackInput.value.trim(); 

        if (!feedbackSelected || feedbackValue === "") {
            alert("Please scroll to select your feedback.");
            event.preventDefault();
            return;
        }

        feedbackForm.action = "https://formsubmit.co/massimoperfetti4@gmail.com";
        feedbackForm.method = "POST";
    });
});
