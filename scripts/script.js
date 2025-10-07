// /scripts/script.js

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuIcon && mobileNav) {
        mobileMenuIcon.addEventListener('click', () => {
            // *** FIX: Toggle the 'open' class to match the CSS transition ***
            mobileNav.classList.toggle('open');

            // Optional: Change the icon (hamburger to 'X')
            if (mobileNav.classList.contains('open')) {
                mobileMenuIcon.innerHTML = '&times;'; // 'X' icon
            } else {
                mobileMenuIcon.innerHTML = '&#9776;'; // Hamburger icon
            }
        });

        // Close menu when a link is clicked (common mobile UX pattern)
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileMenuIcon.innerHTML = '&#9776;';
            });
        });
    }
});