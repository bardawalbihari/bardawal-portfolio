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

  // Contact Form Submission (Web3Forms OR Google Sheets)
  const form = document.querySelector("form");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // If you're using Web3Forms (as in your HTML), skip this block.
    // Below is just a fallback in case you want to switch to Google Sheets
    // You'll need a script endpoint (like from Apps Script web app)

    // Replace with your actual Google Sheets script URL
    const scriptURL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';

    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    })
      .then(response => {
        msg.innerHTML = "Message sent successfully!";
        setTimeout(() => msg.innerHTML = "", 5000);
        form.reset();
      })
      .catch(error => {
        msg.innerHTML = "Something went wrong. Try again!";
        console.error("Error!", error.message);
      });
  });

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
