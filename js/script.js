// ---------------------------------------------
// INITIAL TITLE CARD: SHOW ONLY ON FIRST VISIT & HIDE AFTER 4 SECONDS
// ---------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const titleCard = document.getElementById("title-card");
  const hasSeen = sessionStorage.getItem("titleShown");

  if (!hasSeen && titleCard) {
    titleCard.style.display = "flex";
    sessionStorage.setItem("titleShown", "yes");

    setTimeout(() => {
      titleCard.style.display = "none";
    }, 3000);
  } else if (titleCard) {
    titleCard.style.display = "none";
  }

  // ---------------------------------------------
  // PROJECT FILTER ENHANCED: Supports Multiple Tags
  // ---------------------------------------------
  const filterSelect = document.getElementById("project-filter");
  if (filterSelect) {
    const projectItems = Array.from(document.querySelectorAll(".project-item"));

    filterSelect.addEventListener("change", () => {
      const selected = filterSelect.value; // e.g. "python", "all", etc.

      projectItems.forEach((li) => {
        const categories = li.getAttribute("data-category")?.split(" ") || [];
        if (selected === "all" || categories.includes(selected)) {
          li.style.display = "block";
        } else {
          li.style.display = "none";
        }
      });
    });
  }

  // ---------------------------------------------
  // CONTACT FORM: TIMESTAMP & GEOLOCATION
  // ---------------------------------------------
  const form = document.getElementById("contact-form");
  if (form) {
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
      timestampInput.value = new Date().toISOString();
    }

    const locationInput = document.getElementById("location");
    if (locationInput) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
            locationInput.value = coords;
          },
          () => {
            locationInput.value = "Not provided";
          }
        );
      } else {
        locationInput.value = "Geolocation not supported";
      }
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", "#contact-form")
        .then(() => {
          alert("Your message has been sent!");
          form.reset();
          if (timestampInput) timestampInput.value = new Date().toISOString();
          if (locationInput) locationInput.value = "Not provided";
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
(function () {
  emailjs.init("YOUR_USER_ID");
})();
