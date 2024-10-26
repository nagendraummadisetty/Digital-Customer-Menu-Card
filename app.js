// Menu prices
const menu = {
    'veggie wrap': 199,
    'pasta': 150,
    'pizza': 100,
    'burger': 65,
    'pakoras': 50,
    'salad': 100,
    'samosa': 15,
    'french fries': 35,
    'tacos': 60,
    'stuffed mushrooms': 159,
    'spring rolls': 30
};

// Initialize order variables
let orderTotal = 0;
const orderList = {};

// Add event listener for "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const item = this.getAttribute('data-item');
        const price = parseInt(this.getAttribute('data-price'));

        // Update orderList for the selected item
        if (orderList[item]) {
            orderList[item].quantity += 1;
        } else {
            orderList[item] = { price: price, quantity: 1 };
        }

        // Update total amount
        orderTotal += price;
        updateOrderSummary();
    });
});

// Update order summary display
function updateOrderSummary() {
    const orderListElement = document.getElementById('orderList');
    orderListElement.innerHTML = Object.keys(orderList).map(item => {
        const { price, quantity } = orderList[item];
        return `<li>${item.charAt(0).toUpperCase() + item.slice(1)}: Rs${price * quantity} (${quantity})</li>`;
    }).join('');
    document.getElementById('totalAmount').textContent = orderTotal;
    document.getElementById('orderSummary').style.display = 'block';
}

// Pay button event listener
document.getElementById('payBtn').addEventListener('click', function() {
    const paymentType = document.getElementById('paymentType').value;

    if (paymentType === 'card') {
        document.getElementById('cardPayment').style.display = 'block';
    } else {
        alert(`Payment successful using ${paymentType}! Total: Rs${orderTotal}`);
        resetOrder();
    }
});

// Card payment submit button event listener
document.getElementById('submitPaymentBtn').addEventListener('click', function() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expDate = document.getElementById('expDate').value;
    const cvv = document.getElementById('cvv').value;

    // Basic validation
    if (cardNumber && expDate && cvv) {
        alert(`Payment successful! Total: Rs${orderTotal}`);
        resetOrder();
    } else {
        alert('Please fill in all card details.');
    }
});

// Cancel card payment event listener
document.getElementById('cancelPaymentBtn').addEventListener('click', function() {
    document.getElementById('cardPayment').style.display = 'none';
});

// Reset order function
function resetOrder() {
    orderTotal = 0;
    Object.keys(orderList).forEach(item => delete orderList[item]); // Clear orderList
    document.getElementById('orderList').innerHTML = '';
    document.getElementById('totalAmount').textContent = '0';
    document.getElementById('orderSummary').style.display = 'none';
    document.getElementById('cardPayment').style.display = 'none';
}
