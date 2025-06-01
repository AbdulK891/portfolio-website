// ---------------------------------------------
// INITIAL TITLE CARD: HIDE AFTER 3 SECONDS
// ---------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const titleCard = document.getElementById("title-card");
  // After 3 seconds (animation duration), remove the overlay
  setTimeout(() => {
    titleCard.style.display = "none";
  }, 3000);
});

// ---------------------------------------------
// CONTACT FORM: EMAILJS SETUP & SUBMISSION
// ---------------------------------------------
(function() {
  // Initialize EmailJS (replace 'YOUR_USER_ID' with your actual EmailJS user ID)
  emailjs.init("YOUR_USER_ID");
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  // Populate timestamp on page load
  document.getElementById("timestamp").value = new Date().toISOString();

  // Attempt to get user's geolocation (if permitted)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        document.getElementById("location").value = coords;
      },
      () => {
        // If user denies geolocation, leave location blank
        document.getElementById("location").value = "Not provided";
      }
    );
  } else {
    document.getElementById("location").value = "Geolocation not supported";
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    // Send email via EmailJS
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", "#contact-form")
      .then(() => {
        alert("Your message has been sent!");
        form.reset();
        // Update timestamp after reset
        document.getElementById("timestamp").value = new Date().toISOString();
        document.getElementById("location").value = "Not provided";
      })
      .catch(error => {
        console.error("EmailJS error:", error);
        alert("There was an error sending your message. Please try again later.");
      });
  });
});
