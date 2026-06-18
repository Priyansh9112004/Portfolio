function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("active");
  });
});
