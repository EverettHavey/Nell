// --- GLOBAL STATE VARIABLES ---
let selectedVehicleId = null; 
let selectedPaymentId = null; 
let selectedTimePreference = 'now'; // Default to "Come Now"
let currentConfirmationNumber = null; 

// --- MOCK DATA ---
const vehicles = [
    { id: 'standard', name: 'Standard', icon: '🚗', price: 15.00, eta: '10 min' },
    { id: 'xl', name: 'XL', icon: '🚌', price: 37.50, eta: '10 min' },
    { id: 'premium', name: 'Premium', icon: '💎', price: 70.00, eta: '10 min' },
    { id: 'luxury', name: 'Luxury', icon: '✨', price: 125.00, eta: '10 min' },
    { id: 'heli_ride', name: 'Heli-Ride', icon: '🚁', price: 450.00, eta: '5 min' },
    
    // Fun/Unique Options
    { id: 'airplane', name: 'Airplane', icon: '✈️', price: 2500.00, eta: '1 hour' },
    { id: 'ice_cream', name: 'Ice Cream', icon: '🍦', price: 36.00, eta: '35 min (slow stops!)' },
    { id: 'garbage_truck', name: 'Garbage Truck', icon: '🚚', price: 49.50, eta: '45 min (many stops!)' },
    { id: 'fire_truck', name: 'Fire Truck', icon: '🚒', price: 150.00, eta: '15 min (with sirens)' },
    { id: 'exotic', name: 'Exotic Sportscar', icon: '🏎️', price: 187.50, eta: '8 min (if traffic allows)' },
    
    { id: 'golf_cart', name: 'Golf Cart', icon: '⛳', price: 8.00, eta: '15 min' },
    { id: 'walk', name: 'Walk', icon: '🚶', price: 2.50, eta: '40 min' },
    { id: 'bike', name: 'Bike', icon: '🚲', price: 5.60, eta: '20 min' }
];

const paymentMethods = [
    { id: 'visa', name: 'Visa (Primary)', icon: '💳', confirmed: false, confirmedName: 'Visa (default)' }, 
    { id: 'paypal', name: 'PayPal (Primary)', icon: '💰', confirmed: false, confirmedName: 'PayPal Linked' },
    { id: 'cash', name: 'Cash', icon: '💵', confirmed: true, confirmedName: 'Cash (Pay Driver)' } 
];

// DRIVER DATA with Image URLs (All use the same placeholder for now)
const driverData = {
    'standard': { name: 'Sarah J.', rating: '4.9', plate: 'T-800', image: 'Images/Image.webp' },
    'xl': { name: 'Mike D.', rating: '4.7', plate: 'XL-200', image: 'Images/Image.webp' }, 
    'premium': { name: 'Elias K.', rating: '5.0', plate: 'PR-100', image: 'Images/Image.webp' }, 
    'luxury': { name: 'Victoria M.', rating: '4.9', plate: 'LX-007', image: 'Images/Image.webp' },
    'heli_ride': { name: 'Captain Viper', rating: '4.8', plate: 'H-911', image: 'Images/Image.webp' },
    'airplane': { name: 'Amelia Pilot', rating: '4.9', plate: 'JET-01', image: 'Images/Image.webp' },
    'ice_cream': { name: 'Mr. Freeze', rating: '4.2', plate: 'VAN-IC', image: 'Images/Image.webp' },
    'garbage_truck': { name: 'Oscar G.', rating: '3.5', plate: 'TRASH-1', image: 'Images/Image.webp' },
    'fire_truck': { name: 'Chief Red', rating: '4.8', plate: 'FLAME-2', image: 'Images/Image.webp' },
    'exotic': { name: 'Brock Race', rating: '4.5', plate: 'FAST-4U', image: 'Images/Image.webp' },
    'golf_cart': { name: 'Caddy Max', rating: '4.6', plate: 'GOLF-18', image: 'Images/Image.webp' },
    'walk': { name: 'Runner Rick', rating: '5.0', plate: 'FEET-1', image: 'Images/Image.webp' },
    'bike': { name: 'Wheely Joe', rating: '4.4', plate: 'BIKE-3', image: 'Images/Image.webp' },
    'default': { name: 'Driver D.', rating: '4.8', plate: 'X-777', image: 'Images/Image.webp' } 
};
// ----------------------------------------

// --- UTILITY FUNCTIONS ---
function generateConfirmationNumber() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function getDriverDetails(vehicleId) {
    return driverData[vehicleId] || driverData['default'];
}

function showNotification() {
    const banner = document.getElementById('notification-banner');
    banner.style.display = 'block';
    banner.classList.add('show');
    setTimeout(() => {
        banner.classList.remove('show');
        banner.style.display = 'none';
    }, 3500);
}

// --- TIME SELECTION LOGIC (Exposed to HTML) ---
window.selectTime = function(preference) {
    selectedTimePreference = preference;
    document.getElementById('time-now').classList.remove('selected');
    document.getElementById('time-later').classList.remove('selected');
    document.getElementById(`time-${preference}`).classList.add('selected');
    
    if (preference === 'later') {
        alert('A time-selection widget would pop up here for scheduling your ride.');
    }

    checkBookingReadiness();
}

// --- RENDERING & SELECTION LOGIC (Exposed to HTML) ---

window.renderVehicles = function() {
    const container = document.getElementById('vehicle-options-container');
    container.innerHTML = ''; 

    vehicles.forEach(vehicle => {
        const isSelected = vehicle.id === selectedVehicleId;
        const card = document.createElement('div');
        card.className = `vehicle-card ${isSelected ? 'selected' : ''}`;
        card.onclick = () => window.selectVehicle(vehicle.id);

        card.innerHTML = `
            <div class="vehicle-icon">${vehicle.icon}</div>
            <div class="vehicle-name">${vehicle.name}</div>
            <div class="vehicle-price">$${vehicle.price.toFixed(2)}</div>
            <div class="vehicle-eta">${vehicle.eta}</div>
        `;
        container.appendChild(card);
    });
    checkBookingReadiness();
}

window.selectVehicle = function(id) {
    selectedVehicleId = id;
    renderVehicles();
    showInlinePaymentForm(selectedPaymentId);
    checkBookingReadiness();
}

window.renderPaymentMethods = function() {
    const container = document.getElementById('payment-options-container');
    container.innerHTML = ''; 

    paymentMethods.forEach(method => {
        const isSelected = method.id === selectedPaymentId;
        const card = document.createElement('div');
        card.className = `payment-card ${isSelected ? 'selected' : ''}`; 
        card.onclick = () => window.selectPaymentMethod(method.id);

        let statusText = 'Click to Add/Confirm';
        if (method.confirmed) {
            if (method.id !== 'cash') {
                statusText = `✓ ${method.confirmedName}`;
            } else {
                statusText = method.confirmedName;
            }
        }

        card.innerHTML = `
            <div class="payment-info">
                <div class="payment-name">${method.icon} ${method.name}</div>
            </div>
            <div class="status">${statusText}</div>
        `;
        container.appendChild(card);
    });
    checkBookingReadiness();
}

window.selectPaymentMethod = function(id) {
    if (selectedPaymentId === id) {
         const selectedMethod = paymentMethods.find(p => p.id === id);
         if (!selectedMethod.confirmed) {
            selectedPaymentId = null;
            showInlinePaymentForm(null);
            renderPaymentMethods();
            return;
         }
    }

    selectedPaymentId = id;
    
    showInlinePaymentForm(id);
    renderPaymentMethods();
}

// --- PAYMENT FORM LOGIC ---
function getPaymentFormHTML(type) {
    if (type === 'visa') {
        return `
            <input type="number" id="card-number" placeholder="Card Number (XXXX XXXX XXXX 1234)" required>
            <input type="text" id="card-holder" placeholder="Card Holder Name" required>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="card-expiry" placeholder="MM/YY" required>
                <input type="number" id="card-cvv" placeholder="CVV" required>
            </div>
        `;
    } else if (type === 'paypal') {
        return `
            <p style="text-align: center; color: var(--primary-blue); font-weight: bold; margin-top: 0;">Log in to confirm payment</p>
            <input type="email" id="paypal-email" placeholder="Email or Phone Number" required>
            <input type="password" id="paypal-password" placeholder="Password" required>
        `;
    }
    return '';
}

function showInlinePaymentForm(id) {
    const formDiv = document.getElementById('payment-details-form');
    const formInputsDiv = document.getElementById('payment-form-inputs');
    const priceDisplay = document.getElementById('payment-price-display');
    const formTitle = document.getElementById('payment-form-title');

    const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
    const price = selectedVehicle ? selectedVehicle.price.toFixed(2) : '0.00';
    priceDisplay.innerHTML = `$${price} (Estimated Ride Cost)`;

    const selectedMethod = paymentMethods.find(p => p.id === id);

    if (!selectedVehicleId || id === 'cash' || !selectedMethod || selectedMethod.confirmed) {
        formDiv.style.display = 'none';
        return;
    }

    formTitle.textContent = id === 'visa' ? 'Enter Card Details' : 'Log in to PayPal';
    formInputsDiv.innerHTML = getPaymentFormHTML(id);
    formDiv.style.display = 'block';

    checkBookingReadiness();
}

window.confirmInlinePayment = function() {
    if (!selectedPaymentId) return;

    const formInputs = document.getElementById('payment-form-inputs').querySelectorAll('input');
    let isValid = true;
    formInputs.forEach(input => {
        if (input.hasAttribute('required') && input.value.trim() === '') {
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Please fill in all required payment details.");
        return;
    }

    const index = paymentMethods.findIndex(p => p.id === selectedPaymentId);
    if (index !== -1) {
        paymentMethods[index].confirmed = true;
    }

    document.getElementById('payment-details-form').style.display = 'none';
    renderPaymentMethods(); 
    checkBookingReadiness();
}


// --- BOOKING LOGIC ---
window.checkLocationInput = function() {
    checkBookingReadiness();
}

function checkBookingReadiness() {
    const pickup = document.getElementById('pickup-input').value;
    const dropoff = document.getElementById('dropoff-input').value;
    const button = document.getElementById('book-ride-button');

    const isLocationReady = pickup.length > 2 && dropoff.length > 2;
    const vehicleSelected = !!selectedVehicleId;
    
    const paymentMethod = paymentMethods.find(p => p.id === selectedPaymentId);
    let paymentConfirmed = paymentMethod ? paymentMethod.confirmed : false;

    const isReady = isLocationReady && vehicleSelected && paymentConfirmed;
    button.disabled = !isReady;

    if (isReady) {
        const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
        const buttonName = selectedVehicle.name.split(' ')[0]; 
        button.textContent = `Book ${buttonName} for $${selectedVehicle.price.toFixed(2)}`;
    } else {
        button.textContent = 'Please enter locations, select a vehicle, and confirm your payment';
    }
    return isReady;
}

window.bookRide = function() {
    if (!checkBookingReadiness()) return;

    const paymentMethod = paymentMethods.find(p => p.id === selectedPaymentId);
    const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
    
    currentConfirmationNumber = generateConfirmationNumber(); 

    showNotification();
    const driverInfo = getDriverDetails(selectedVehicleId);
    
    setTimeout(() => {
        // Transition to In-Ride View
        document.getElementById('booking-view').style.display = 'none';
        document.getElementById('in-ride-view').style.display = 'block';
        
        // Populate In-Ride Details
        document.getElementById('confirmation-number').textContent = currentConfirmationNumber;
        document.getElementById('driver-name').textContent = driverInfo.name;
        document.getElementById('vehicle-details').textContent = `${selectedVehicle.name} • ${driverInfo.plate}`; 
        document.getElementById('payment-summary').textContent = `${paymentMethod.icon} ${paymentMethod.confirmedName}`; 
        
        // Time Preference Summary
        const timeSummary = selectedTimePreference === 'now' ? 'ASAP (Driver En Route)' : 'Reserved for Later';
        document.getElementById('time-preference-summary').textContent = timeSummary;

        // Set dynamic driver image
        document.getElementById('driver-img').src = driverInfo.image; 

        // simulateRide(); 
    }, 500); 
}

// --- RESET & CANCELLATION ---
function resetBookingState() {
    currentConfirmationNumber = null;

    // Reset payment confirmation status for cards
    const visaIndex = paymentMethods.findIndex(p => p.id === 'visa');
    if(visaIndex !== -1) paymentMethods[visaIndex].confirmed = false;
    const paypalIndex = paymentMethods.findIndex(p => p.id === 'paypal');
    if(paypalIndex !== -1) paymentMethods[paypalIndex].confirmed = false;

    selectedVehicleId = null;
    selectedPaymentId = null;
    selectedTimePreference = 'now'; 

    document.getElementById('pickup-input').value = '';
    document.getElementById('dropoff-input').value = '';

    document.getElementById('in-ride-view').style.display = 'none';
    document.getElementById('booking-view').style.display = 'block';
    
    renderVehicles();
    renderPaymentMethods();
    selectTime('now'); 
}

// --- CUSTOM MODAL/CANCELLATION LOGIC (Exposed to HTML) ---
window.cancelRide = function() {
    const modal = document.getElementById('custom-modal');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const confNumSpan = document.getElementById('modal-confirmation-number');

    if (!currentConfirmationNumber) return; // Should not happen if in in-ride view

    // Set the confirmation number in the modal message
    confNumSpan.textContent = currentConfirmationNumber;
    modal.style.display = 'flex';

    // Use a promise to handle the modal choice asynchronously
    return new Promise(resolve => {
        
        // Function to close modal and clean up listeners
        const closeModal = (confirmed) => {
            confirmBtn.removeEventListener('click', onConfirm);
            cancelBtn.removeEventListener('click', onCancel);
            modal.style.display = 'none';
            resolve(confirmed);
        };

        const onConfirm = () => closeModal(true);
        const onCancel = () => closeModal(false);

        confirmBtn.addEventListener('click', onConfirm);
        cancelBtn.addEventListener('click', onCancel);

    }).then(confirmed => {
        if (confirmed) {
            // In a real app, you'd make an API call to cancel the ride here.
            alert('Your ride (Confirmation: ' + currentConfirmationNumber + ') has been successfully cancelled.');
            resetBookingState();
        }
    });
}


// --- INITIALIZATION ---
window.onload = () => {
    // Initial setup functions
    renderVehicles();
    renderPaymentMethods();
    selectTime('now');
};