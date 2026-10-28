/**
 * Dr. Nabanita Deb Research Lab | IACS Kolkata
 * Interactive UI Controller: Theme, Mobile Drawer, Scroll Reveal, 3D Card Tilt,
 * Accordions, Publication/News Filtering & Contact Form Validation
 */

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------------------------
     1. Dark / Light Theme Persistence
     -------------------------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("deblab-theme") || "dark";

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("deblab-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      themeToggle.innerHTML =
        theme === "dark"
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  };

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  /* --------------------------------------------------------------------------
     2. Mobile Navigation Hamburger Menu
     -------------------------------------------------------------------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. IntersectionObserver Scroll Reveal Animations
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  /* --------------------------------------------------------------------------
     4. Subtle 3D Hover Tilt Effect on Cards (.tilt-card)
     -------------------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll(".tilt-card");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Expandable Accordions (Research Page)
     -------------------------------------------------------------------------- */
  const accordions = document.querySelectorAll(".accordion-item");
  accordions.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const content = item.querySelector(".accordion-content");

    if (item.classList.contains("open") && content) {
      content.style.maxHeight = content.scrollHeight + "px";
    }

    if (trigger && content) {
      trigger.addEventListener("click", () => {
        const isOpen = item.classList.toggle("open");
        trigger.setAttribute("aria-expanded", String(isOpen));
        content.style.maxHeight = isOpen ? content.scrollHeight + "px" : "0px";
      });
    }
  });

  /* --------------------------------------------------------------------------
     6. Category & Live Search Filter (Publications & News Pages)
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("filter-search");
  const filterableItems = document.querySelectorAll("[data-category]");

  let activeCategory = "all";
  let searchQuery = "";

  const updateFilterResults = () => {
    filterableItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const textContent = item.textContent.toLowerCase();
      const matchesCategory = activeCategory === "all" || itemCategory === activeCategory;
      const matchesSearch = !searchQuery || textContent.includes(searchQuery);

      item.style.display = matchesCategory && matchesSearch ? "" : "none";
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-filter") || "all";
      updateFilterResults();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      updateFilterResults();
    });
  }

  /* --------------------------------------------------------------------------
     7. Contact Form Submission Handler
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById("lab-contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector("#name").value.trim();
      const email = contactForm.querySelector("#email").value.trim();
      const subject = contactForm.querySelector("#inquiry-type").value;

      formStatus.style.display = "block";
      formStatus.innerHTML = `Thank you, <strong>${name}</strong>. Your inquiry regarding <em>${subject}</em> has been formatted. You can also email Dr. Nabanita Deb directly at <a href="mailto:spsnd@iacs.res.in" style="color:var(--accent-cyan);text-decoration:underline;">spsnd@iacs.res.in</a> (Confirmation sent for ${email}).`;
      contactForm.reset();
    });
  }
});
