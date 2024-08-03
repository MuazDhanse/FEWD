/* ---------------------------------------------------------
#                       Button
--------------------------------------------------------- */

function navigateToPage() {
    window.location.href = '../html/payment.html';
}

/* ---------------------------------------------------------
#                  Form Validation
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("input-form");

  form.addEventListener("submit", function (event) {
      // Validate Donation Frequency
      const donationFrequency = document.querySelector(".time .selected");
      if (!donationFrequency) {
          alert("Please select a donation frequency (Onetime or Monthly).");
          event.preventDefault();
          return;
      }

      // Validate Amount
      const amount = document.querySelector(".value .selected");
      if (!amount) {
          alert("Please select a donation amount.");
          event.preventDefault();
          return;
      }

      // Validate Email
      const email = document.getElementById("email").value;
      if (!validateEmail(email)) {
          alert("Please enter a valid email address.");
          event.preventDefault();
          return;
      }

      // Validate Terms and Privacy Policy
      const terms = document.getElementById("terms").checked;
      if (!terms) {
          alert("You must accept the Terms of Service and Privacy Policy.");
          event.preventDefault();
          return;
      }
  });

  // Email validation function
  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

  // Event listeners for selecting frequency and amount
  document.querySelectorAll(".time span").forEach(span => {
      span.addEventListener("click", function () {
          document.querySelectorAll(".time span").forEach(s => s.classList.remove("selected"));
          this.classList.add("selected");
      });
  });

  document.querySelectorAll(".money").forEach(span => {
      span.addEventListener("click", function () {
          document.querySelectorAll(".money").forEach(s => s.classList.remove("selected"));
          this.classList.add("selected");
      });
  });
});
