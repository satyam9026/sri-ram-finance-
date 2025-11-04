// Responsive menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navbarBottom = document.getElementById('navbarBottom');
  const navItems = document.querySelectorAll('.nav-item');

  menuToggle.addEventListener('click', () => {
    navbarBottom.classList.toggle('active');
  });

  // Dropdown toggle for mobile
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        // Close other dropdowns
        navItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('dropdown-active');
          }
        });
        // Toggle current dropdown
        item.classList.toggle('dropdown-active');
      }
    });
  });

  // Close menu when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 991 && navbarBottom.classList.contains('active')) {
      if (!navbarBottom.contains(e.target) && !menuToggle.contains(e.target)) {
        navbarBottom.classList.remove('active');
        navItems.forEach(item => {
          item.classList.remove('dropdown-active');
        });
      }
    }
  });

  // JS for Play Button
  const playBtn = document.getElementById("ckyc-play-btn");
  const video = document.getElementById("ckyc-video");

  if (playBtn && video) {
    playBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        playBtn.style.display = "none";
      } else {
        video.pause();
        playBtn.style.display = "block";
      }
    });

    video.addEventListener("ended", () => {
      playBtn.style.display = "block";
    });
  }

  // Scroll to top button
  const btn = document.getElementById('scrollTopBtn');
  if (btn) {
    btn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    });
  }

  // Optional: Add animations on scroll (for smoother UX)
  const elements = document.querySelectorAll('.feature-card, .banner, .bill-section, .sf-info-box, .sf-card, .sf-calculator-box, .article-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });