document.addEventListener("DOMContentLoaded", () => {
  const tasksWrap = document.getElementById("tasksWrap");
  const categoryFilter = document.getElementById("taskCategoryFilter");

  if (!tasksWrap) return;

  function renderTasks() {
    const value = categoryFilter ? categoryFilter.value : "all";
    tasksWrap.innerHTML = "";

    const filtered = impactData.tasks.filter(task => value === "all" || task.category === value);

    filtered.forEach(task => {
      const card = document.createElement("div");
      card.className = "card task-card";
      card.innerHTML = `
        <div class="icon-badge">${getTaskIcon(task.category)}</div>
        <h3>${task.title}</h3>
        <p class="muted">${task.desc}</p>

        <div class="task-meta">
          <span class="meta-pill">Санат: ${getCategoryName(task.category)}</span>
          <span class="meta-pill">Уақыт: ${task.time}</span>
          <span class="meta-pill">Әсері: ${task.impact}</span>
        </div>

        <div class="task-actions">
          <button class="btn btn-primary">Бастау</button>
          <button class="btn btn-secondary">Орындадым</button>
        </div>
      `;
      tasksWrap.appendChild(card);
    });
  }

  function getTaskIcon(cat) {
    if (cat === "eco") return "🌱";
    if (cat === "social") return "❤️";
    return "🤝";
  }

  function getCategoryName(cat) {
    if (cat === "eco") return "Экология";
    if (cat === "social") return "Әлеуметтік көмек";
    return "Еріктілік";
  }

  categoryFilter?.addEventListener("change", renderTasks);
  renderTasks();
});
