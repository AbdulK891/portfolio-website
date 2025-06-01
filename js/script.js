// ---------------------------------------------
// INITIAL TITLE CARD: SHOW ONLY ON FIRST VISIT & HIDE AFTER 4 SECONDS
// ---------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const titleCard = document.getElementById("title-card");
  const hasSeen   = sessionStorage.getItem("titleShown");

  if (!hasSeen) {
    // First time this session: display the title card
    titleCard.style.display = "flex";
    sessionStorage.setItem("titleShown", "yes");

    // Hide exactly at 4 seconds (matches the CSS animation duration)
    setTimeout(() => {
      titleCard.style.display = "none";
    }, 4000);
  } else {
    // Already seen in this session: hide immediately
    titleCard.style.display = "none";
  }

  // ---------------------------------------------
  // PROJECT FILTER INITIALIZATION
  // ---------------------------------------------
  const filterSelect = document.getElementById("project-filter");
  if (filterSelect) {
    // Collect all project items once
    const projectItems = Array.from(document.querySelectorAll(".project-item"));

    filterSelect.addEventListener("change", () => {
      const selected = filterSelect.value; // e.g. "python", "all", etc.

      projectItems.forEach((li) => {
        const category = li.getAttribute("data-category");
        // Show if "all" or matches exactly; otherwise hide
        if (selected === "all" || category === selected) {
          li.style.display = "block";
        } else {
          li.style.display = "none";
        }
      });
    });
  }

  // ---------------------------------------------
  // CONTACT FORM: POPULATE TIMESTAMP & GEOLOCATION
  // ---------------------------------------------
  const form = document.getElementById("contact-form");
  if (form) {
    // Populate timestamp on page load
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
      timestampInput.value = new Date().toISOString();
    }

    // Attempt to get user's geolocation (if permitted)
    const locationInput = document.getElementById("location");
    if (locationInput) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
            locationInput.value = coords;
          },
          () => {
            // User denied geolocation
            locationInput.value = "Not provided";
          }
        );
      } else {
        // Geolocation not supported
        locationInput.value = "Geolocation not supported";
      }
    }

    // Handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Send email via EmailJS
      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", "#contact-form")
        .then(() => {
          alert("Your message has been sent!");
          form.reset();
          // Update timestamp and reset location after clearing
          if (timestampInput) {
            timestampInput.value = new Date().toISOString();
          }
          if (locationInput) {
            locationInput.value = "Not provided";
          }
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          alert("There was an error sending your message. Please try again later.");
        });
    });
  }
});

// ---------------------------------------------
// EMAILJS SETUP
// ---------------------------------------------
(function() {
  // Replace 'YOUR_USER_ID' with your actual EmailJS user ID
  emailjs.init("YOUR_USER_ID");
})();
