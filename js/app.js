let currentCategory = "all";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderCategories();
  renderTools();
  setupSearch();
});

function renderStats() {
  document.getElementById("stat-total").textContent = AI_TOOLS.length;
  document.getElementById("stat-hot").textContent = AI_TOOLS.filter(t => t.hot).length;
  document.getElementById("stat-cats").textContent = CATEGORIES.length - 1;
}

function renderCategories() {
  const container = document.getElementById("categories");
  container.innerHTML = CATEGORIES.map(cat => {
    const count = cat.id === "all"
      ? AI_TOOLS.length
      : AI_TOOLS.filter(t => t.category === cat.id).length;
    const active = cat.id === currentCategory ? " active" : "";
    return `<button class="cat-btn${active}" data-cat="${cat.id}">${cat.icon} ${cat.name} (${count})</button>`;
  }).join("");

  container.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.cat;
      renderCategories();
      renderTools();
    });
  });
}

function getFilteredTools() {
  return AI_TOOLS.filter(tool => {
    const matchCat = currentCategory === "all" || tool.category === currentCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.company.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });
}

function renderTools() {
  const tools = getFilteredTools();
  const container = document.getElementById("tools-container");
  const resultCount = document.getElementById("result-count");

  if (tools.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="icon">🔍</div><p>没有找到匹配的工具</p><p style="margin-top:8px;font-size:0.85rem">试试其他关键词或分类</p></div>`;
    resultCount.textContent = "";
    return;
  }

  const catName = currentCategory === "all"
    ? "全部工具"
    : (CATEGORIES.find(c => c.id === currentCategory)?.name || "");

  resultCount.textContent = `共 ${tools.length} 个`;

  if (currentCategory === "all" && !searchQuery) {
    container.innerHTML = CATEGORIES.filter(c => c.id !== "all").map(cat => {
      const catTools = tools.filter(t => t.category === cat.id);
      if (catTools.length === 0) return "";
      return `<section><h2 class="section-title">${cat.icon} ${cat.name} <span class="count">${catTools.length} 个</span></h2><div class="tools-grid">${catTools.map(renderCard).join("")}</div></section>`;
    }).join("");
  } else {
    container.innerHTML = `<section><h2 class="section-title">${catName} <span class="count">${tools.length} 个</span></h2><div class="tools-grid">${tools.map(renderCard).join("")}</div></section>`;
  }
}

function renderCard(tool) {
  const hotBadge = tool.hot ? `<span class="hot-badge">🔥 热门</span>` : "";
  const tags = tool.tags.map(t => `<span class="tag">${t}</span>`).join("");
  return `<a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-card" title="访问 ${tool.name} 官网"><div class="card-header"><div><div class="card-name">${tool.name}</div><div class="card-company">${tool.company}</div></div>${hotBadge}</div><p class="card-desc">${tool.description}</p><div class="card-tags">${tags}</div><div class="card-link">访问官网 →</div></a>`;
}

function setupSearch() {
  const input = document.getElementById("search-input");
  let timer;
  input.addEventListener("input", e => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchQuery = e.target.value.trim();
      renderTools();
    }, 200);
  });
}
