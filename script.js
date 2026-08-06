const navLinksContainer = document.getElementById("navLinks");
const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");

function toggleMenu() {
  const isOpen = navLinksContainer.classList.toggle("active");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
}

function closeMenu() {
  navLinksContainer.classList.remove("active");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  const clickedInsideNav = navLinksContainer.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  if (!clickedInsideNav && !clickedMenuButton) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeMenu();
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("reveal");
  revealObserver.observe(section);
});

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(() => loader.remove(), 450);
  }
});
