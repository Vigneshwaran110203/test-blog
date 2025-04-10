document.addEventListener("DOMContentLoaded", function () {
    function initializeScript() {
        if (window.innerWidth < 1280) {
            console.log("Screen width is too small. Script will not run.");
            return; // Exit if screen width is 1280px or smaller
        }

        const toc = document.querySelector(".table-of-content"); // Table of Contents
        const salesBanner = document.querySelector(".sales-banner"); // Sales Banner
        const blogContent = document.querySelector(".single-page-blog-content"); // Blog Content
        const footer = document.querySelector("footer"); // Footer Section

        if (!blogContent || !toc || !salesBanner || !footer) {
            console.error("One or more elements are missing! Check your class names.");
            return;
        }

        function toggleVisibility() {
            const scrollY = window.scrollY;
            const blogTop = blogContent.offsetTop; // Dynamic position of blog content
            const blogBottom = blogTop + blogContent.offsetHeight; // Bottom position of blog content
            const footerTop = footer.offsetTop; // Dynamic position of footer

            console.log("ScrollY:", scrollY, "BlogTop:", blogTop, "BlogBottom:", blogBottom, "FooterTop:", footerTop);

            // Show TOC & Sales Banner after scrolling past 20% of the blog
            if (scrollY > blogTop + window.innerHeight * 0.50 && scrollY < footerTop - window.innerHeight) {
                toc.classList.remove("opacity-0", "pointer-events-none", "invisible");
                salesBanner.classList.remove("opacity-0", "pointer-events-none", "invisible");
            } else {
                toc.classList.add("opacity-0", "pointer-events-none", "invisible");
                salesBanner.classList.add("opacity-0", "pointer-events-none", "invisible");
            }

            // Hide TOC & Sales Banner when reaching the footer
            if (scrollY + window.innerHeight >= footerTop) {
                toc.classList.add("opacity-0", "pointer-events-none", "invisible");
                salesBanner.classList.add("opacity-0", "pointer-events-none", "invisible");
            }
        }

        window.addEventListener("scroll", toggleVisibility);
        console.log("Scroll event listener added");

        toggleVisibility(); // Run once on page load
    }

    // Run on load if screen size is greater than 1280px
    initializeScript();

    // Add resize event to check if the screen size changes
    window.addEventListener("resize", function () {
        if (window.innerWidth > 1280) {
            initializeScript();
        }
    });
});