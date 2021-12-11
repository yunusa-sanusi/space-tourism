const hamburger = document.querySelector(".mobile-menu");
const closeIcon = document.querySelector(".close-icon");
const navItemsList = document.getElementById("nav-items");

hamburger.addEventListener("click", () => {
  navItemsList.style.display = "flex";
  closeIcon.style.display = "block";
  hamburger.style.display = "none";
});

closeIcon.addEventListener("click", () => {
  navItemsList.style.display = "none";
  closeIcon.style.display = "none";
  hamburger.style.display = "block";
});
