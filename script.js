$(document).ready(function () {

  /* ================= EMAIL VALIDATION ================= */

  const emailInput = $(".contact-form input[name='email']");
  const emailError = $("#email-error");
  const contactForm = $(".contact-form");

  // STRICT exact Gmail only validation
  function isValidGmail(email) {
    email = email.trim().toLowerCase();

    // Must end EXACTLY with @gmail.com
    if (!email.endsWith("@gmail.com")) return false;

    // Full strict regex
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  }

  function showEmailError(message = "Please enter a valid Gmail address ending exactly with @gmail.com") {
    emailError.text(message).show();

    emailInput.css({
      "border-color": "#ef4444",
      "background-color": "rgba(239,68,68,0.05)"
    });
  }

  function hideEmailError() {
    emailError.hide();

    emailInput.css({
      "border-color": "rgba(14,165,233,0.2)",
      "background-color": "#f8f9fa"
    });
  }

  /* Live Validation */
  emailInput.on("input blur", function () {
    const email = $(this).val().trim();

    if (email === "") {
      hideEmailError();
      return;
    }

    if (!isValidGmail(email)) {
      showEmailError();
    } else {
      hideEmailError();
    }
  });

  /* ================= POPUP FUNCTION ================= */

  function showPopup(title, message) {
    const popup = document.getElementById("contact-popup");
    const popupTitle = document.getElementById("popup-title");
    const popupText = document.getElementById("popup-text");

    if (popupTitle) popupTitle.textContent = title;
    if (popupText) popupText.textContent = message;

    if (popup) {
      popup.classList.add("show");

      setTimeout(() => {
        popup.classList.remove("show");
      }, 3000);
    }
  }

  function hidePopup() {
    const popup = document.getElementById("contact-popup");
    if (popup) popup.classList.remove("show");
  }

  $(".close-popup, .popup-close-btn").on("click", hidePopup);

  $("#contact-popup").on("click", function (e) {
    if (e.target === this) hidePopup();
  });

  /* ================= FORM SUBMIT ================= */

  contactForm.on("submit", function (e) {
    e.preventDefault();

    const emailVal = emailInput.val().trim();

    // BLOCK invalid email BEFORE submit
    if (!isValidGmail(emailVal)) {
      showEmailError();
      emailInput.focus();

      showPopup(
        "Invalid Email",
        "Only valid Gmail addresses ending exactly with @gmail.com are allowed."
      );

      return false;
    }

    hideEmailError();

    const form = this;
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);
    formData.delete("redirect");

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          $("#msg")
            .html("✓ Message sent successfully!")
            .css("color", "#4ade80");

          form.reset();

          showPopup(
            "Message Sent",
            "Thank you! Your message has been delivered successfully."
          );
        } else {
          $("#msg")
            .html("✗ Something went wrong. Please try again.")
            .css("color", "#ef4444");

          showPopup(
            "Submission Failed",
            "Something went wrong. Please try again later."
          );
        }
      })
      .catch(() => {
        $("#msg")
          .html("✗ Network error. Please try again.")
          .css("color", "#ef4444");

        showPopup(
          "Network Error",
          "Unable to send your message. Please check your connection."
        );
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });

});