/**
 * Dynamic Project Card Rendering
 * Preserves the exact editorial showcase markup from the original Django template.
 */

(function () {
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getStatusDisplay(status) {
    switch (status) {
      case "Done":
        return { label: "Completed", class: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.35)]" };
      case "Active":
        return { label: "In Progress", class: "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.35)]" };
      default:
        return { label: "Ongoing", class: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.30)]" };
    }
  }

  function createProjectCardHtml(project, index) {
    const projectNumber = String(index + 1).padStart(2, "0");
    const statusInfo = getStatusDisplay(project.status);

    // Image block
    let imageHtml = "";
    if (project.image) {
      imageHtml = `
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async"
            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]">
      `;
    } else {
      imageHtml = `
        <div class="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#17233A] to-[#090E18] text-blue-400">
            <i class="fa-solid fa-code text-4xl transition-transform duration-500 group-hover:scale-110"></i>
            <span class="max-w-[80%] text-center text-sm font-bold text-white">
                ${escapeHtml(project.title)}
            </span>
        </div>
      `;
    }

    // Role
    let roleHtml = "";
    if (project.role) {
      roleHtml = `
        <span class="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-400">
            ${escapeHtml(project.role)}
        </span>
      `;
    }

    // Description fallback
    const descriptionText = project.description || project.subtitle || "A practical project built through learning and development.";

    // Tech stack
    let techStackHtml = "";
    if (project.tech_stack) {
      techStackHtml = `
        <div class="mt-5 pb-4">
            <span class="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-500/40 px-3.5 py-2">
                <i class="fa-solid fa-code text-xs text-blue-400"></i>
                <span class="truncate font-mono text-xs font-semibold uppercase tracking-[0.10em] text-slate-300 sm:text-xs">
                    ${escapeHtml(project.tech_stack)}
                </span>
            </span>
        </div>
      `;
    }

    // Links
    let linksHtml = "";
    const hasGithub = Boolean(project.github_url);
    const hasLive = Boolean(project.live_url);

    if (hasGithub) {
      linksHtml += `
        <a href="${escapeHtml(project.github_url)}" target="_blank" rel="noopener noreferrer"
            aria-label="View ${escapeHtml(project.title)} repository on GitHub"
            class="group/link inline-flex items-center gap-2 text-xs font-semibold text-slate-300 transition-colors duration-300 hover:text-white">
            <i class="fa-brands fa-github text-base text-slate-400 transition-colors group-hover/link:text-white"></i>
            <span>Repository</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-xs text-blue-400 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"></i>
        </a>
      `;
    }

    if (hasLive) {
      linksHtml += `
        <a href="${escapeHtml(project.live_url)}" target="_blank" rel="noopener noreferrer"
            aria-label="Visit ${escapeHtml(project.title)} live website"
            class="group/link inline-flex items-center gap-2 text-xs font-semibold text-slate-300 transition-colors duration-300 hover:text-white">
            <i class="fa-solid fa-arrow-up-right-from-square text-[13px] text-blue-400"></i>
            <span>Live Website</span>
            <i class="fa-solid fa-arrow-right text-xs text-slate-400 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:text-cyan-400"></i>
        </a>
      `;
    }

    if (!hasGithub && !hasLive) {
      linksHtml = `
        <span class="inline-flex items-center gap-2 text-xs text-slate-400">
            <i class="fa-regular fa-clock"></i>
            Links coming soon
        </span>
      `;
    }

    return `
      <article data-reveal="up"
          class="group flex h-full min-w-0 flex-col border-l border-white/[0.14] pl-4 pr-2 transition-all duration-300 hover:border-blue-500/60 sm:pl-5">
          <div class="flex items-center gap-3">
              <span class="h-3.5 w-3.5 shrink-0 rounded-full ${statusInfo.class}"
                  title="${statusInfo.label}" role="img" aria-label="${statusInfo.label}"></span>
              <span class="shrink-0 font-mono text-[12px] font-semibold tracking-wider text-slate-300">
                  ${projectNumber}
              </span>
              <div class="h-px flex-1 bg-gradient-to-r from-slate-500/50 to-transparent transition-all duration-500 group-hover:from-blue-400/70"></div>
          </div>
          <div class="relative mt-5 aspect-[16/9] overflow-hidden border border-white/[0.07] bg-[#111722]">
              ${imageHtml}
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050914]/30 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"></div>
          </div>
          <div class="flex flex-1 flex-col pt-5">
              ${roleHtml}
              <h3 class="text-xl font-extrabold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-blue-300 sm:text-[22px]">
                  ${escapeHtml(project.title)}
              </h3>
              <p class="mt-3 min-h-[66px] flex-1 text-[15px] leading-6 text-slate-400 sm:text-[12px]">
                  ${escapeHtml(descriptionText)}
              </p>
              ${techStackHtml}
              <div class="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.10] pt-5">
                  ${linksHtml}
              </div>
          </div>
      </article>
    `;
  }

  function renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    const limitAttr = container.getAttribute("data-limit");
    const limit = limitAttr ? parseInt(limitAttr, 10) : null;
    const projects = typeof getPublishedProjects === "function" ? getPublishedProjects(limit) : [];

    // Update any project counters on the page (e.g. on About page)
    const countDisplay = String(projects.length).padStart(2, "0");
    document.querySelectorAll("[data-project-count]").forEach(el => {
      el.textContent = countDisplay;
    });

    if (projects.length === 0) {
      container.innerHTML = `
        <div class="col-span-full rounded-2xl border border-slate-800 bg-[#121622] px-6 py-14 text-center">
            <i class="fa-solid fa-folder-open text-3xl text-blue-400"></i>
            <h3 class="mt-4 text-lg font-bold text-white">
                Projects coming soon.
            </h3>
            <p class="mt-2 text-sm text-slate-400">
                Published projects will appear here.
            </p>
        </div>
      `;
      return;
    }

    container.innerHTML = projects.map((p, idx) => createProjectCardHtml(p, idx)).join("");

    // Trigger IntersectionObserver if scroll-reveal is active
    if (window.__refreshScrollReveal) {
      window.__refreshScrollReveal();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderProjects);
  } else {
    renderProjects();
  }
})();

