// --- DATA ---
const restaurants = [
    { 
        name: "The Pizza Place", cuisine: "pizza", rating: 4.5, time: "25-35 min",
        menu: {
            "Pizzas": [ { id: 101, name: "Margherita", price: 15.99 }, { id: 102, name: "Pepperoni", price: 17.50 } ],
            "Sides": [ { id: 103, name: "Garlic Knots", price: 5.00 }, { id: 104, name: "Caesar Salad", price: 7.00 } ]
        }
    },
    { 
        name: "Samurai Sushi Bar", cuisine: "sushi", rating: 4.8, time: "30-40 min",
        menu: {
            "Rolls": [ { id: 201, name: "California Roll", price: 8.99 }, { id: 202, name: "Spicy Tuna Roll", price: 9.50 } ],
            "Drinks": [ { id: 203, name: "Green Tea", price: 2.00 } ]
        }
    },
    { 
        name: "SukiToki", cuisine: "sushi", rating: 4.7, time: "35-45 min",
        menu: {
            "Nigiri": [ 
                { id: 601, name: "Salmon (Sake)", price: 3.50 }, 
                { id: 602, name: "Tuna (Maguro)", price: 4.00 } 
            ],
            "Signature Rolls": [ 
                { id: 603, name: "Dragon Roll", price: 15.00 }, 
                { id: 604, name: "Volcano Roll", price: 12.00 } 
            ]
        }
    },
    { 
        name: "Burger Barn", cuisine: "burgers", rating: 4.2, time: "15-25 min",
        menu: {
            "Burgers": [ { id: 301, name: "Classic Cheeseburger", price: 10.99 }, { id: 302, name: "Baconator", price: 12.50 } ],
            "Sides": [ 
                { id: 303, name: "Fries", price: 3.50 }, 
                { id: 304, name: "Onion Rings", price: 4.00 }
            ],
            "Drinks": [ { id: 305, name: "Soda", price: 2.00 }, { id: 306, name: "Milkshake", price: 5.50 } ]
        }
    },
    { 
        name: "Fresh Fries", cuisine: "burgers", rating: 4.6, time: "20-30 min",
        menu: {
            "Specialties": [ 
                { id: 501, name: "Crispy Chicken Sandwich", price: 10.50 }, 
                { id: 502, name: "Double Patty Burger", price: 14.99 } 
            ],
            "Fries": [ 
                { id: 503, name: "Signature Fresh Fries", price: 4.99 }, 
                { id: 504, name: "Truffle Parm Fries", price: 8.50 },
                { id: 505, name: "Sweet Potato Fries", price: 5.99 } 
            ]
        }
    },
    { 
        name: "The Diner Stack", cuisine: "american", rating: 4.3, time: "25-35 min",
        menu: {
            "Comfort Classics": [ 
                { id: 701, name: "Meatloaf Plate", price: 15.00 }, 
                { id: 702, name: "Chicken Fried Steak", price: 16.50 } 
            ],
            "Sides": [ 
                { id: 703, name: "Mashed Potatoes & Gravy", price: 4.00 }, 
                { id: 704, name: "Mac & Cheese", price: 6.00 } 
            ]
        }
    },
    { 
        name: "El Fuego Cantina", cuisine: "mexican", rating: 4.9, time: "20-30 min",
        menu: {
            "Tacos": [ 
                { id: 801, name: "Carne Asada Taco", price: 4.00 }, 
                { id: 802, name: "Al Pastor Taco", price: 3.75 } 
            ],
            "Entrees": [ 
                { id: 803, name: "Chicken Fajitas", price: 18.99 }, 
                { id: 804, name: "Quesadilla Supreme", price: 11.50 } 
            ]
        }
    },
    { 
        name: "The Daily Grind", cuisine: "cafe", rating: 4.4, time: "10-20 min",
        menu: {
            "Espresso Drinks": [ 
                { id: 401, name: "Latte", price: 4.50 }, 
                { id: 402, name: "Americano", price: 3.00 },
                { id: 403, name: "Cappuccino", price: 4.75 },
                { id: 406, name: "Iced Coffee", price: 3.50 } 
            ],
            "Non-Coffee & Treats": [ 
                { id: 404, name: "Hot Chocolate", price: 4.00 }, 
                { id: 405, name: "Chai Tea Latte", price: 4.25 },
                { id: 407, name: "Blueberry Muffin", price: 3.00 } 
            ]
        }
    },
    { name: "Spicy Wok", cuisine: "thai", rating: 4.6, time: "40-50 min" },
    { name: "Green Leaf Salads", cuisine: "healthy", rating: 4.9, time: "20-30 min" },
    { name: "The Local Grocer", cuisine: "shopping", rating: 4.7, time: "45-60 min" },
    { name: "Quick Mart 24/7", cuisine: "shopping", rating: 4.1, time: "15-25 min" },
    { name: "Cloxiez", cuisine: "shopping", rating: 4.5, time: "30-45 min" },
];

// --- GLOBAL STATE ---
let cart = [];
let currentRestaurant = null;
let promoDiscount = 0.00;
let lastOrder = null; // Holds the confirmed order details for tracking
const DELIVERY_FEE = 4.00;

// Exporting to window so functions can be called directly from onclick in HTML
window.currentRestaurant = currentRestaurant;
window.DELIVERY_FEE = DELIVERY_FEE;
window.cart = cart;
window.promoDiscount = promoDiscount;
window.lastOrder = lastOrder;
window.restaurants = restaurants;


// --- UTILITY: Notification Toast ---
export function showNotification(message) {
    const toast = document.getElementById('notification-toast');
    document.getElementById('notification-text').textContent = message;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 2 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// --- UTILITY: Custom Modal ---
export function alertUser(title, message) {
    document.getElementById('messageBox').querySelector('h3').textContent = title;
    document.getElementById('messageText').innerHTML = message;
    document.getElementById('messageBox').style.display = 'flex'; // Use flex for centering
}

export function closeMessageBox() {
    document.getElementById('messageBox').style.display = 'none';
}

// --- VIEW SWITCHING LOGIC ---
function showView(viewId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(viewId).classList.remove('hidden');
    updateCartButtonVisibility();
    // Scroll to top of view for mobile user experience
    window.scrollTo(0, 0); 
}

export function showListView() {
    showView('list-view');
}

// NEW: Function to render the tracking view
export function showTrackingView() {
    if (!lastOrder) {
        alertUser("Error", "No recent order found to track.");
        showListView();
        return;
    }

    document.getElementById('trackingRestaurantName').textContent = lastOrder.restaurantName;
    document.getElementById('trackingEta').textContent = lastOrder.eta;
    document.getElementById('trackingTotal').textContent = `$${lastOrder.total}`;
    
    const trackingItemsContainer = document.getElementById('trackingItems');
    trackingItemsContainer.innerHTML = '';

    lastOrder.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('flex', 'justify-between');
        itemDiv.innerHTML = `
            <span class="font-normal">${item.quantity}x ${item.name}</span>
            <span class="font-medium">$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        trackingItemsContainer.appendChild(itemDiv);
    });
    
    // Add final summary lines
    const promoLine = document.createElement('div');
    promoLine.classList.add('flex', 'justify-between', 'text-sm', 'text-secondary-color');
    promoLine.innerHTML = `<span>Applied Discount:</span> <span>-$${lastOrder.promo.toFixed(2)}</span>`;
    trackingItemsContainer.appendChild(promoLine);
    
    showView('tracking-view');
}

export function showMenu(restaurantName) {
    currentRestaurant = restaurants.find(r => r.name === restaurantName);
    window.currentRestaurant = currentRestaurant; // Update exported state

    if (!currentRestaurant || !currentRestaurant.menu) {
        alertUser("Menu Not Found", `The menu for ${restaurantName} is not currently available in this prototype.`);
        return;
    }

    document.getElementById('menuRestaurantName').textContent = currentRestaurant.name;
    document.getElementById('menuRestaurantTime').textContent = `Delivery: ${currentRestaurant.time}`;
    
    const menuContent = document.getElementById('menuContent');
    menuContent.innerHTML = '';

    for (const category in currentRestaurant.menu) {
        const categoryHtml = document.createElement('div');
        categoryHtml.classList.add('menu-category');
        categoryHtml.innerHTML = `<h3 class="text-xl font-bold mt-4 mb-2 text-gray-800">${category}</h3>`;
        
        currentRestaurant.menu[category].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');
            
            // Note: The onclick uses window.addItemToCart because it is exported globally
            itemDiv.innerHTML = `
                <div class="item-info">
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                </div>
                <button class="add-btn" onclick="window.addItemToCart(${item.id}, '${item.name}', ${item.price})">Add</button>
            `;
            categoryHtml.appendChild(itemDiv);
        });
        menuContent.appendChild(categoryHtml);
    }

    showView('menu-view');
}

export function showCart() {
    renderCart();
    showView('cart-view');
}

// --- MARKETPLACE LISTING LOGIC ---
function renderRestaurants(filter = 'all', searchTerm = '') {
    const listContainer = document.getElementById('restaurantList');
    listContainer.innerHTML = '';
    
    const normalizedSearch = searchTerm.toLowerCase();

    const filtered = restaurants.filter(r => {
        // 1. Filter by Category
        const matchesCategory = filter === 'all' || r.cuisine === filter;
        
        // 2. Filter by Search Term (Name)
        const matchesSearch = normalizedSearch === '' || r.name.toLowerCase().includes(normalizedSearch);

        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `<p style="text-align: center; color: #888; padding: 2rem;">No restaurants or stores found for this category or search term.</p>`;
        return;
    }

    filtered.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card', 'bg-white', 'rounded-xl', 'shadow-md', 'overflow-hidden');
        card.setAttribute('data-cuisine', restaurant.cuisine);
        // Note: The onclick uses window.showMenu because it is exported globally
        card.onclick = () => showMenu(restaurant.name); 
        
        let categoryDisplay = restaurant.cuisine.charAt(0).toUpperCase() + restaurant.cuisine.slice(1);
        let icon = '🍽️';

        // Explicit icon mapping
        switch (restaurant.cuisine) {
            case 'pizza': icon = '🍕'; break;
            case 'sushi': icon = '🍣'; break;
            case 'burgers': icon = '🍔'; break;
            case 'thai': icon = '🌶️'; break;
            case 'dessert': icon = '🍰'; break;
            case 'cafe': icon = '☕'; categoryDisplay = 'Cafe'; break;
            case 'healthy': icon = '🥗'; break;
            case 'shopping': icon = '🛒'; categoryDisplay = 'Store'; break;
            case 'american': icon = '🇺🇸'; break;
            case 'mexican': icon = '🌮'; break;
        }

        card.innerHTML = `
            <div class="restaurant-image-placeholder">
                ${icon}
            </div>
            <div class="restaurant-details p-4">
                <h3 class="text-xl font-bold mb-1">${restaurant.name}</h3>
                <p class="text-sm text-gray-500">${categoryDisplay} | <span class="text-yellow-500">⭐</span> ${restaurant.rating}</p>
                <p class="text-sm" style="color: var(--primary-color); font-weight: bold;">${restaurant.time} delivery</p>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function handleCategoryClick(event) {
    const item = event.target;
    const category = item.getAttribute('data-category');
    
    // Clear the search input when a category is clicked
    document.getElementById('foodSearch').value = ''; 
    
    // Update active state
    document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Render filtered restaurants with empty search term
    renderRestaurants(category, '');
}

// --- CART AND PROMO LOGIC ---
export function addItemToCart(itemId, name, price) {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: itemId, name: name, price: price, quantity: 1 });
    }
    
    updateCartButtonVisibility();
    // Use the new notification toast instead of alertUser
    showNotification(`${name} added!`); 
}

export function applyPromo() {
    const code = document.getElementById('promoCode').value.toUpperCase().trim();
    const messageElement = document.getElementById('promoMessage');
    
    promoDiscount = 0.00; // Reset discount
    window.promoDiscount = promoDiscount; // Update exported state
    messageElement.style.color = '#cc0000';
    
    // Mock Promo Code Logic
    if (code === 'NELL20') {
        promoDiscount = 20.00; // Mock $20 off
        window.promoDiscount = promoDiscount;
        messageElement.textContent = '$20 discount applied!';
        messageElement.style.color = '#10b981'; // Green
    } else if (code === 'FREEDELIVERY') {
        promoDiscount = DELIVERY_FEE; // Mock delivery fee discount
        window.promoDiscount = promoDiscount;
        messageElement.textContent = `Free Delivery applied! ($${DELIVERY_FEE.toFixed(2)} discount)`;
        messageElement.style.color = '#10b981'; // Green
    } else if (code) {
        messageElement.textContent = 'Invalid promo code.';
    } else {
         messageElement.textContent = '';
    }

    renderCart(); // Re-render cart to show new total
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const summaryContainer = document.getElementById('cartSummaryContainer');
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888; padding: 2rem;">Your cart is empty.</p>';
        document.querySelector('.checkout-btn').disabled = true;
        return;
    }
    document.querySelector('.checkout-btn').disabled = false;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item', 'text-gray-800');
        cartItemDiv.innerHTML = `
            <div class="truncate pr-4">
                <span style="font-weight: bold; color: var(--primary-color);" class="mr-1">${item.quantity}x</span> ${item.name}
            </div>
            <div>
                $${itemTotal.toFixed(2)}
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    // --- PROMO AND TOTAL CALCULATION ---
    const totalBeforeDiscount = subtotal + DELIVERY_FEE;
    const finalTotal = Math.max(0, totalBeforeDiscount - promoDiscount); 
    
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartDeliveryFee').textContent = `$${DELIVERY_FEE.toFixed(2)}`;
    
    // Handle Discount Line visibility and value
    let discountLine = document.getElementById('cartDiscountLine');
    const finalTotalLine = document.getElementById('finalTotalLine');

    if (promoDiscount > 0) {
        if (!discountLine) {
            discountLine = document.createElement('div');
            discountLine.classList.add('summary-line', 'text-sm');
            discountLine.id = 'cartDiscountLine';
            summaryContainer.insertBefore(discountLine, finalTotalLine); 
        }
        discountLine.innerHTML = `
            <span>Promo Discount:</span>
            <span style="color: var(--secondary-color); font-weight: bold;">-$${promoDiscount.toFixed(2)}</span>
        `;
    } else if (discountLine) {
        discountLine.remove();
    }
    
    document.getElementById('cartTotal').textContent = `$${finalTotal.toFixed(2)}`;
}

function updateCartButtonVisibility() {
    const cartBtn = document.getElementById('viewCartBtn');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartItemCount').textContent = count;
    
    // Check if list-view or menu-view is currently active
    const isShoppingView = !document.getElementById('list-view').classList.contains('hidden') || 
                           !document.getElementById('menu-view').classList.contains('hidden');

    if (count > 0 && isShoppingView) {
         cartBtn.classList.remove('hidden');
    } else {
        cartBtn.classList.add('hidden');
    }
}

export function checkout() {
    if (cart.length === 0) {
        alertUser("Cart Empty", "Please add items to your cart before checking out.");
        return;
    }
    
    if (!currentRestaurant) {
        alertUser("Error", "Could not identify the restaurant for this order.");
        return;
    }

    // Determine ETA (min/max time)
    const timeRange = currentRestaurant.time.split('-').map(t => parseInt(t.trim().replace(' min', '')));
    const minTime = timeRange[0] + 5; // Add 5 min for processing
    const maxTime = timeRange[1] ? timeRange[1] + 10 : minTime + 5;
    
    const selectedPayment = document.getElementById('paymentMethod').value;
    const paymentName = document.getElementById('paymentMethod').options[document.getElementById('paymentMethod').selectedIndex].text;
    
    const subtotal = cart.reduce((sub, item) => sub + item.price * item.quantity, 0);
    const finalTotal = Math.max(0, subtotal + DELIVERY_FEE - promoDiscount);
    
    // --- NEW: SAVE ORDER DETAILS ---
    const orderDetails = {
        restaurantName: currentRestaurant.name,
        eta: `${minTime}-${maxTime} min`,
        total: finalTotal.toFixed(2),
        promo: promoDiscount,
        // Capture a snapshot of the cart before clearing
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
        paymentMethod: paymentName
    };

    window.lastOrder = orderDetails; // Store the order state globally

    // Clear state after saving
    cart.length = 0;
    currentRestaurant = null;
    window.currentRestaurant = null;
    promoDiscount = 0.00;
    window.promoDiscount = promoDiscount;
    document.getElementById('promoCode').value = '';
    document.getElementById('promoMessage').textContent = '';
    
    // Transition to the new tracking view
    showTrackingView(); 
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Set initial category active
    document.querySelector('.category-item[data-category="all"]').classList.add('active');
    renderRestaurants('all');

    // Attach event listener to categories
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', handleCategoryClick);
    });
    
    // Attach search listeners
    const searchInput = document.getElementById('foodSearch');
    const searchButton = document.getElementById('searchButton');
    
    function performSearch() {
        const searchTerm = searchInput.value;
        
        // Reset category filter to 'all' visually when searching
        document.querySelectorAll('.category-item').forEach(c => c.classList.remove('active'));
        document.querySelector('.category-item[data-category="all"]').classList.add('active');
        
        renderRestaurants('all', searchTerm);
    }

    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Start on the list view
    showListView();
});
