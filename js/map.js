document.addEventListener("DOMContentLoaded", () => {
  const mapCanvas = document.getElementById("mapCanvas");
  const mapList = document.getElementById("mapList");
  const cityFilter = document.getElementById("cityFilter");
  const typeFilter = document.getElementById("typeFilter");
  const detailTitle = document.getElementById("detailTitle");
  const detailDesc = document.getElementById("detailDesc");
  const detailMeta = document.getElementById("detailMeta");

  if (!mapCanvas || !mapList) return;

  function renderPoints() {
    mapCanvas.querySelectorAll(".map-pin").forEach(el => el.remove());
    mapList.innerHTML = "";

    const cityValue = cityFilter ? cityFilter.value : "all";
    const typeValue = typeFilter ? typeFilter.value : "all";

    const filtered = impactData.mapPoints.filter(item => {
      const cityOk = cityValue === "all" || item.city === cityValue;
      const typeOk = typeValue === "all" || item.type === typeValue;
      return cityOk && typeOk;
    });

    filtered.forEach(item => {
      const pin = document.createElement("button");
      pin.className = `map-pin ${item.type}`;
      pin.style.top = item.top;
      pin.style.left = item.left;
      pin.title = item.title;
      pin.addEventListener("click", () => showDetails(item));
      mapCanvas.appendChild(pin);

      const listItem = document.createElement("div");
      listItem.className = "map-item";
      listItem.innerHTML = `
        <strong>${item.title}</strong>
        <div class="muted">${item.city} • ${formatType(item.type)}</div>
      `;
      listItem.addEventListener("click", () => showDetails(item));
      mapList.appendChild(listItem);
    });

    if (filtered.length) {
      showDetails(filtered[0]);
    } else {
      detailTitle.textContent = "Нәтиже табылмады";
      detailDesc.textContent = "Таңдалған фильтр бойынша әрекеттер жоқ.";
      detailMeta.innerHTML = "";
    }
  }

  function showDetails(item) {
    detailTitle.textContent = item.title;
    detailDesc.textContent = item.desc;
    detailMeta.innerHTML = `
      <div class="meta-pill">Қала: ${item.city}</div>
      <div class="meta-pill">Категория: ${formatType(item.type)}</div>
      <div class="meta-pill">Күні: ${item.date}</div>
      <div class="meta-pill">Қатысушылар: ${item.participants}</div>
    `;
  }

  function formatType(type) {
    if (type === "eco") return "Экология";
    if (type === "social") return "Әлеуметтік көмек";
    return "Еріктілік";
  }

  cityFilter?.addEventListener("change", renderPoints);
  typeFilter?.addEventListener("change", renderPoints);

  renderPoints();
});
