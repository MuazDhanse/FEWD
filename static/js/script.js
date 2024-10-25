/* ---------------------------------------------------------
#                  Donate Button
--------------------------------------------------------- */

function navigateToPage() {
    window.location.href = '/donate'
}

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


document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const sliderBoxes = document.querySelectorAll('.sec-c1-sliderbox');
    const totalBoxes = sliderBoxes.length;
    let sliderInterval;

    function showSlide(index) {
        sliderBoxes.forEach((box, i) => {
            box.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalBoxes;
        showSlide(currentIndex);
    }

    // Initially show the first slide
    showSlide(currentIndex);

    function startAutoSlide() {
        // Set interval for automatic slide change (e.g., every 3 seconds)
        sliderInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(sliderInterval);
    }

    // Check window width and set up the slider accordingly
    function updateSliderBehavior() {
        if (window.innerWidth <= 470) {
            startAutoSlide(); // Start automatic sliding for small screens
        } else {
            stopAutoSlide(); // Stop automatic sliding for larger screens
            // Show all slides in a row
            sliderBoxes.forEach(box => {
                box.style.display = 'block';
            });
        }
    }

    // Initial call to set the behavior
    updateSliderBehavior();

    // Add event listener for window resize
    window.addEventListener('resize', updateSliderBehavior);
});

/* ---------------------------------------------------------
#                  Live Location Map
--------------------------------------------------------- */
function showPopup(pin) {
    const title = pin.getAttribute('data-title');
    const location = pin.getAttribute('data-location');
    const description = pin.getAttribute('data-description');

    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');
    overlay.innerHTML = `
        <div class="popup-content">
            <span class="close-btn" onclick="closePopup(this)">&times;</span>
            <h2>${title}</h2>
            <p><strong>Location:</strong> ${location}</p>
            <p>${description}</p>
            <button onclick="donate()">Donate</button>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.style.display = 'flex';
}

function closePopup(button) {
    const overlay = button.closest('.popup-overlay');
    document.body.removeChild(overlay);
}

function donate() {
    window.location.href = '/donate'
}