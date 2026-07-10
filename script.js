document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const projectGrid = document.getElementById("projectGrid");
  const archiveList = document.getElementById("archiveList");
  const filters = document.getElementById("filters");
  const nav = document.getElementById("mainNav");
  const menuButton = document.getElementById("menuButton");

  menuButton.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const categories = ["All", ...new Set(featuredProjects.map(p => p.category))];

  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "filter" + (category === "All" ? " active" : "");
    button.textContent = category;
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      renderProjects(category);
    });
    filters.appendChild(button);
  });

  function renderProjects(category = "All") {
    const projects = category === "All"
      ? featuredProjects
      : featuredProjects.filter(p => p.category === category);

    projectGrid.innerHTML = projects.map(p => `
      <a class="project-card" href="${p.url}" target="_blank" rel="noreferrer">
        <div class="project-top">
          <span class="project-icon"><i data-lucide="${p.icon}"></i></span>
          <i class="arrow" data-lucide="arrow-up-right"></i>
        </div>
        <div class="project-body">
          <span class="project-category">${p.category}</span>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <span class="project-meta">${p.meta} • Open on Flickr</span>
        </div>
      </a>
    `).join("");
    lucide.createIcons();
  }

  flickrArchive.forEach((url, index) => {
    const item = document.createElement("a");
    item.className = "archive-item";
    item.href = url;
    item.target = "_blank";
    item.rel = "noreferrer";
    item.innerHTML = `<span><strong>Album ${String(index + 1).padStart(2, "0")}</strong> &nbsp; Historical project evidence</span><i data-lucide="external-link"></i>`;
    archiveList.appendChild(item);
  });

  renderProjects();
  lucide.createIcons();
});
