document.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("profileName");
  const profileCity = document.getElementById("profileCity");
  const profilePoints = document.getElementById("profilePoints");
  const deedsDone = document.getElementById("deedsDone");
  const ecoDone = document.getElementById("ecoDone");
  const socialDone = document.getElementById("socialDone");
  const volunteerDone = document.getElementById("volunteerDone");
  const badgeWrap = document.getElementById("badgeWrap");

  if (!profileName) return;

  const p = impactData.profile;
  profileName.textContent = p.name;
  profileCity.textContent = p.city;
  profilePoints.textContent = p.points;
  deedsDone.textContent = p.deedsDone;
  ecoDone.textContent = p.ecoDone;
  socialDone.textContent = p.socialDone;
  volunteerDone.textContent = p.volunteerDone;

  badgeWrap.innerHTML = "";
  p.badges.forEach(b => {
    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = b;
    badgeWrap.appendChild(badge);
  });

  const total = p.deedsDone || 1;
  document.getElementById("ecoProgress").style.width = `${(p.ecoDone / total) * 100}%`;
  document.getElementById("socialProgress").style.width = `${(p.socialDone / total) * 100}%`;
  document.getElementById("volunteerProgress").style.width = `${(p.volunteerDone / total) * 100}%`;
});
