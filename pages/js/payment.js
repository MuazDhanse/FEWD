/* ---------------------------------------------------------
#                  Form Validation
--------------------------------------------------------- */

function validateForm() {
    // Get form elements
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const zipCode = document.getElementById('zipCode');
    const cardNumber = document.getElementById('cardNumber');
    const expiryYear = document.getElementById('expiryYear');
    const cvv = document.getElementById('cvv');
    
    // Validate email
    if (!email.validity.valid) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Validate address
    if (address.value.length > 100) {
        alert('Address should not be more than 100 characters.');
        return false;
    }

    // Validate zip code
    if (!zipCode.validity.valid) {
        alert('Zip code must be a 6 digit number.');
        return false;
    }

    // Validate card number
    if (!cardNumber.validity.valid) {
        alert('Credit card number must be a 16 digit number.');
        return false;
    }

    // Validate expiry year
    if (!expiryYear.validity.valid) {
        alert('Expiry year must be a 4 digit number.');
        return false;
    }

    // Validate CVV
    if (!cvv.validity.valid) {
        alert('CVV must be a 3 digit number.');
        return false;
    }

    return true;
}

/* ---------------------------------------------------------
#                  Donation Success Message
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Hide the form
        this.style.display = 'none';

        // Show the thank you message
        document.getElementById('py-message').style.display = 'block';
    });
});
