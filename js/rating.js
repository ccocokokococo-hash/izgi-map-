document.addEventListener("DOMContentLoaded", () => {
  const userRate = document.getElementById("userRate");
  const cityRate = document.getElementById("cityRate");

  if (!userRate || !cityRate) return;

  impactData.rating.users.forEach((user, index) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div><strong>${index + 1}. ${user.name}</strong><div class="muted">${user.city}</div></div>
      <div><strong>${user.points}</strong> ұпай</div>
    `;
    userRate.appendChild(row);
  });

  impactData.rating.cities.forEach((city, index) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div><strong>${index + 1}. ${city.name}</strong></div>
      <div><strong>${city.deeds}</strong> жақсылық әрекеті</div>
    `;
    cityRate.appendChild(row);
  });
});
