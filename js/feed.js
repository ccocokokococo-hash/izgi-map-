document.addEventListener("DOMContentLoaded", () => {
  const feedWrap = document.getElementById("feedWrap");
  const helpWrap = document.getElementById("helpWrap");
  const feedForm = document.getElementById("feedForm");

  if (feedWrap) {
    renderFeed();
  }

  if (helpWrap) {
    renderHelp();
  }

  if (feedForm) {
    feedForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("userName").value.trim();
      const city = document.getElementById("userCity").value.trim();
      const type = document.getElementById("userType").value;
      const text = document.getElementById("userText").value.trim();

      if (!name || !city || !text) return;

      impactData.feed.unshift({
        id: Date.now(),
        user: name,
        city,
        type,
        text,
        likes: 0,
        date: new Date().toISOString().slice(0, 10)
      });

      feedForm.reset();
      renderFeed();
    });
  }

  function renderFeed() {
    feedWrap.innerHTML = "";

    impactData.feed.forEach(post => {
      const card = document.createElement("div");
      card.className = "card feed-card";
      card.innerHTML = `
        <div class="icon-badge">${iconByType(post.type)}</div>
        <h3>${post.user}</h3>
        <p class="muted">${post.text}</p>
        <div class="feed-meta">
          <span class="meta-pill">Қала: ${post.city}</span>
          <span class="meta-pill">Санат: ${typeName(post.type)}</span>
          <span class="meta-pill">Күні: ${post.date}</span>
          <span class="meta-pill">❤️ ${post.likes}</span>
        </div>
        <div class="feed-actions">
          <button class="btn btn-secondary like-btn">Ұнайды</button>
          <button class="btn btn-primary">Қолдау білдіру</button>
        </div>
      `;

      const likeBtn = card.querySelector(".like-btn");
      likeBtn.addEventListener("click", () => {
        post.likes += 1;
        renderFeed();
      });

      feedWrap.appendChild(card);
    });
  }

  function renderHelp() {
    helpWrap.innerHTML = "";

    impactData.helpRequests.forEach(item => {
      const card = document.createElement("div");
      card.className = "card help-card";
      card.innerHTML = `
        <div class="icon-badge">💛</div>
        <h3>${item.name}</h3>
        <p class="muted">${item.desc}</p>

        <div class="help-meta">
          <span class="meta-pill">Қала: ${item.city}</span>
          <span class="meta-pill">Қажеттілік: ${item.need}</span>
          <span class="meta-pill">Шұғылдық: ${item.urgency}</span>
        </div>

        <div class="help-actions">
          <button class="btn btn-primary">Көмектесу</button>
          <button class="btn btn-secondary">Байланысу</button>
        </div>
      `;
      helpWrap.appendChild(card);
    });
  }

  function iconByType(type) {
    if (type === "eco") return "🌱";
    if (type === "social") return "❤️";
    return "🤝";
  }

  function typeName(type) {
    if (type === "eco") return "Экология";
    if (type === "social") return "Әлеуметтік көмек";
    return "Еріктілік";
  }
});
