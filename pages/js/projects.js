/* ---------------------------------------------------------
#                  Priority Slider
--------------------------------------------------------- */

// Shraddhesh
const sliderContainer = document.querySelector('.sec-1-slider');
const nextButton = document.querySelector('.next');
setInterval(() => {
  nextButton.click();
}, 3000); // move to next slide every 5 seconds


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex +=n);
}

function currentSlides(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "")
    }
    slides[slideIndex - 1].style.display = "block"
    dots[slideIndex - 1].className += " active"
}

/* ---------------------------------------------------------
#                  Categories Slider
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const productContainers = [...document.querySelectorAll('.container')];
    const nextBtn = [...document.querySelectorAll('.next-btn')];
    const prevBtn = [...document.querySelectorAll('.prev-btn')];

    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nextBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        });

        prevBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        });
    });
});

/* ---------------------------------------------------------
#                  Donate Button
--------------------------------------------------------- */

function navigateToPage() {
    window.location.href = '../html/donate.html';
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