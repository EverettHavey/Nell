/**
 * scripts/foodscript.js
 * Handles interactivity for the food ordering page (category filtering, etc.).
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial DOM selection
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    const foodSearchInput = document.getElementById('foodSearch');
    const categoryChipsContainer = document.querySelector('.category-chips');

    // Initialize: Add an 'all' category to the chips array for 'Show All' functionality
    const allChip = document.createElement('div');
    allChip.className = 'category-chip';
    allChip.textContent = 'All';
    allChip.dataset.category = 'all';
    
    // Add the 'All' chip to the beginning of the container
    if (categoryChipsContainer) {
        categoryChipsContainer.prepend(allChip);
    }
    
    // Select ALL category chips *after* the 'All' chip has been added to the DOM
    const categoryChips = document.querySelectorAll('.category-chip');

    /**
     * Toggles the active state of category chips and filters restaurants.
     * @param {string} category The data-category attribute value to filter by.
     */
    const filterRestaurants = (category) => {
        // 1. Update active chip visually
        categoryChips.forEach(chip => {
            chip.classList.remove('active');
            if (chip.dataset.category === category) {
                chip.classList.add('active');
            }
        });

        // 2. Filter restaurant cards
        restaurantCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            // Show all cards if category is 'all' or empty, or if card matches category
            if (category === 'all' || !category || cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    /**
     * Handles clicking on category chips.
     * Listener is attached to ALL chips, including the new 'All' chip.
     */
    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Get the category from the data attribute
            const selectedCategory = chip.dataset.category;
            filterRestaurants(selectedCategory);
        });
    });

    /**
     * Placeholder for Search functionality (optional future implementation).
     */
    foodSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        // For now, this just logs the activity.
        console.log('Searching for:', searchTerm);
        // Optional: Reset category filter when searching to show all.
        filterRestaurants('all'); 
    });
    
    // Default filter to 'all' on load, or the current active chip's category
    const initialCategory = document.querySelector('.category-chip.active')?.dataset.category || 'all';
    filterRestaurants(initialCategory);
});
