/* ---------------------------------------------------------
#                  Footer: Newsletter
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('newsletter-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the email input and check validity
        var emailInput = this.querySelector('input[type="email"]');
        if (emailInput.checkValidity()) {
            // Show the success message
            document.getElementById('subscribe-success').classList.remove('success-msg');

            // Optionally, clear the form
            emailInput.value = '';
        }
    });
});