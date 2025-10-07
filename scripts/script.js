document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuIcon && mobileNav) {
        mobileMenuIcon.addEventListener('click', () => {
            // Toggle the 'visible' class to show/hide the menu
            mobileNav.classList.toggle('visible');

            // Optional: Change the icon (hamburger to 'X')
            if (mobileNav.classList.contains('visible')) {
                mobileMenuIcon.innerHTML = '&times;'; // 'X' icon
            } else {
                mobileMenuIcon.innerHTML = '&#9776;'; // Hamburger icon
            }
        });

        // Close menu when a link is clicked (common mobile UX pattern)
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('visible');
                mobileMenuIcon.innerHTML = '&#9776;';
            });
        });
    }
});