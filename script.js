$(document).ready(function () {

  // Sticky header on scroll
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    updateActiveSection();
  });

  // Smooth scrolling and active class
  $(".header ul li a").on("click", function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) return;

    var offset = (target === "#home") ? 0 : $(target).offset().top - 60;

    $("html, body").animate({
      scrollTop: offset
    }, 500);

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");

    // Collapse mobile navbar if open
    $(".navbar").removeClass("active");
  });

  // Toggle navbar for mobile
  $(".menu_icon").on("click", function () {
    $(".navbar").toggleClass("active");
  });

  // ScrollReveal animations
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200,
    reset: false
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // Contact Form Submission (Web3Forms)
  const form = document.querySelector("form");
  const msg = document.getElementById("msg");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Web3Forms will handle the submission
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            msg.innerHTML = "✓ Message sent successfully! I'll get back to you soon.";
            msg.style.color = "#4ade80";
            form.reset();
          } else {
            msg.innerHTML = "✗ Something went wrong. Please try again.";
            msg.style.color = "#ef4444";
          }
        })
        .catch(error => {
          msg.innerHTML = "✗ Network error. Please try again.";
          msg.style.color = "#ef4444";
          console.error("Error!", error.message);
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          setTimeout(() => {
            msg.innerHTML = "";
            msg.style.color = "#fed700";
          }, 5000);
        });
    });
  }

});

// Update active link based on scroll position
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section, .FirstElement").each(function () {
    var id = $(this).attr("id");
    var offset = $(this).offset().top - 80;
    var height = $(this).outerHeight();

    if (scrollPosition >= offset && scrollPosition < offset + height) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + id + "']").addClass("active");
    }
  });
}
