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

  // Download button functionality with visual feedback
  $(".btn-group .btn[href*='Resume.pdf']").on("click", function (e) {
    e.preventDefault();
    
    var downloadBtn = $(this);
    var originalText = downloadBtn.text();
    var downloadUrl = downloadBtn.attr("href");
    
    // Show downloading state
    downloadBtn.text("⬇ Downloading...");
    downloadBtn.css("opacity", "0.7");
    downloadBtn.css("pointer-events", "none");
    
    // Simulate download delay (100ms for smooth animation)
    setTimeout(function() {
      // Trigger actual download
      var link = document.createElement('a');
      link.href = downloadUrl;
      link.download = downloadUrl.split('/').pop();
      link.click();
      
      // Reset button
      downloadBtn.text("✓ Downloaded");
      
      setTimeout(function() {
        downloadBtn.text(originalText);
        downloadBtn.css("opacity", "1");
        downloadBtn.css("pointer-events", "auto");
      }, 1500);
    }, 600);
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

// Animated profile photo floating effect
function setupFloatingAnimation() {
  const profilePhoto = document.querySelector(".profile-photo");
  if (!profilePhoto) return;
  
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 20 - 10;
    mouseY = (e.clientY / window.innerHeight) * 20 - 10;
  });
  
  setInterval(() => {
    if (profilePhoto) {
      profilePhoto.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 10 + mouseY}px) translateX(${mouseX}px)`;
    }
  }, 60);
}

// Typing effect for hero title
function typeEffect(element, text, speed = 80) {
  let index = 0;
  element.innerHTML = "";
  
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Setup hero section animations
function setupHeroAnimations() {
  const heroTitle = document.querySelector(".profile-text h1");
  if (heroTitle && heroTitle.textContent) {
    const titleText = heroTitle.textContent.trim();
    setTimeout(() => {
      typeEffect(heroTitle, titleText, 100);
    }, 300);
  }
}

// Smooth reveal animations on scroll
function revealOnScroll() {
  const elements = document.querySelectorAll(".skill-card, .project, .timeline-item, .about-skills ul li");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Enhanced skill card hover effects
function setupSkillCardEffects() {
  const skillCards = document.querySelectorAll(".skill-card");
  
  skillCards.forEach((card) => {
    const icon = card.querySelector("i");
    
    card.addEventListener("mouseenter", () => {
      if (icon) {
        icon.style.animation = "none";
        setTimeout(() => {
          icon.style.animation = "float 2s ease-in-out infinite";
        }, 10);
      }
    });
    
    card.addEventListener("mouseleave", () => {
      if (icon) {
        icon.style.animation = "none";
      }
    });
  });
}

// Setup project card 3D effects
function setupProjectCardEffects() {
  const projects = document.querySelectorAll(".project");
  
  projects.forEach((project) => {
    project.addEventListener("mousemove", (e) => {
      const rect = project.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      project.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    project.addEventListener("mouseleave", () => {
      project.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });
}

// Initialize all animations on document load
document.addEventListener("DOMContentLoaded", () => {
  setupFloatingAnimation();
  setupHeroAnimations();
  revealOnScroll();
  setupSkillCardEffects();
  setupProjectCardEffects();
  
  // Smooth button click animations
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function() {
      this.style.animation = "pulse 0.6s ease";
      setTimeout(() => {
        this.style.animation = "none";
      }, 600);
    });
  });
});
