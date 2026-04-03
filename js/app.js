function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    }
  });
}

function fillGlobalStats() {
  const deedEls = document.querySelectorAll("[data-stat='deeds']");
  const volunteerEls = document.querySelectorAll("[data-stat='volunteers']");
  const helpedEls = document.querySelectorAll("[data-stat='helped']");
  const ecoEls = document.querySelectorAll("[data-stat='eco']");

  deedEls.forEach(el => el.textContent = impactData.stats.deeds);
  volunteerEls.forEach(el => el.textContent = impactData.stats.volunteers);
  helpedEls.forEach(el => el.textContent = impactData.stats.helpedPeople);
  ecoEls.forEach(el => el.textContent = impactData.stats.ecoActions);
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  fillGlobalStats();
});
