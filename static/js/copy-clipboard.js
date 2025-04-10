document.addEventListener("DOMContentLoaded", function () {
    const copyButtons = document.querySelectorAll(".copy-btn");

    copyButtons.forEach(button => {
        const tooltip = button.nextElementSibling; // Tooltip span

        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const textElement = document.getElementById(targetId);

            if (textElement) {
                navigator.clipboard.writeText(textElement.innerText)
                    .then(() => {
                        tooltip.innerText = "Copied!";
                        setTimeout(() => {
                            tooltip.innerText = "Copy";
                        }, 1500); // Reset to "Copy" after 2 seconds
                    })
                    .catch(err => console.error("Error copying text:", err));
            }
        });

        // Ensure tooltip always shows "Copy" when hovered
        button.addEventListener("mouseenter", function () {
            if (tooltip.innerText !== "Copied!") {
                tooltip.innerText = "Copy";
            }
        });
    });

    const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active state from all buttons
            buttons.forEach(btn => {
                btn.classList.remove("bg-primary", "text-white");
                btn.classList.add("text-black");

                // Reset all SVG icons to black (removes invert)
                btn.querySelector(".svg-icon").classList.remove("invert");
            });

            // Hide all content
            contents.forEach(content => content.classList.add("hidden"));

            // Activate clicked button
            this.classList.add("bg-primary", "text-white");
            this.classList.remove("text-black");

            // Make SVG white by adding 'invert'
            this.querySelector(".svg-icon").classList.add("invert");

            // Show respective content
            const target = this.getAttribute("data-target");
            document.getElementById(target).classList.remove("hidden");
        });
    });
});