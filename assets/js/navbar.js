
/* =====================================================
   SMART NAVBAR
   - Transparent at page top
   - Hide while scrolling down
   - Show while scrolling up
   - Floating appearance after returning upward
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("[data-smart-header]");
    const headerShell = document.getElementById("header-shell");

    const menuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!header || !headerShell) return;


    // Configuration
    const TOP_THRESHOLD = 35;
    const HIDE_AFTER = 80;
    const DIRECTION_THRESHOLD = 10;

    let previousScrollY = window.scrollY;
    let accumulatedMovement = 0;
    let ticking = false;


    // Close mobile navigation
    function closeMobileMenu() {

        if (!mobileMenu || !menuToggle) return;

        mobileMenu.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

    }


    // Open / close mobile navigation
    function toggleMobileMenu() {

        if (!mobileMenu || !menuToggle) return;

        const isOpen = !mobileMenu.classList.contains("hidden");

        mobileMenu.classList.toggle("hidden");

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

    }


    // Show transparent navbar at the top
    function showTopHeader() {

        header.dataset.hidden = "false";
        headerShell.dataset.floating = "false";

    }


    // Show floating navbar
    function showFloatingHeader() {

        header.dataset.hidden = "false";
        headerShell.dataset.floating = "true";

    }


    // Hide navbar
    function hideHeader() {

        header.dataset.hidden = "true";
        closeMobileMenu();

    }


    // Initial state
    if (window.scrollY > TOP_THRESHOLD) {
        showFloatingHeader();
    } else {
        showTopHeader();
    }


    // Smart scroll detection
    function handleScroll() {

        const currentScrollY = Math.max(0, window.scrollY);
        const delta = currentScrollY - previousScrollY;

        previousScrollY = currentScrollY;


        // Always restore the transparent header at page top
        if (currentScrollY <= TOP_THRESHOLD) {

            accumulatedMovement = 0;
            showTopHeader();

            return;

        }


        // Reset accumulated movement when direction changes
        if (
            accumulatedMovement !== 0 &&
            Math.sign(delta) !== Math.sign(accumulatedMovement)
        ) {
            accumulatedMovement = 0;
        }

        accumulatedMovement += delta;


        // Ignore tiny movements
        if (Math.abs(accumulatedMovement) < DIRECTION_THRESHOLD) {
            return;
        }


        // Scrolling down
        if (accumulatedMovement > 0 && currentScrollY > HIDE_AFTER) {

            hideHeader();

        }

        // Scrolling up
        else if (accumulatedMovement < 0) {

            showFloatingHeader();

        }

        accumulatedMovement = 0;

    }


    // Optimized scroll listener
    window.addEventListener("scroll", () => {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(() => {

            handleScroll();
            ticking = false;

        });

    }, { passive: true });


    // Mobile menu button
    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", toggleMobileMenu);


        // Close menu after selecting a link
        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMobileMenu);

        });


        // Close when clicking outside navbar
        document.addEventListener("click", event => {

            const clickedInsideHeader = header.contains(event.target);

            if (!clickedInsideHeader) {
                closeMobileMenu();
            }

        });


        // Close with Escape key
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        });


        // Reset mobile menu on desktop resize
        window.addEventListener("resize", () => {

            if (window.innerWidth >= 768) {
                closeMobileMenu();
            }

        });

    }

});
