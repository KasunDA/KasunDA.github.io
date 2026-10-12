(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Theme toggle: explicit choice is stored; otherwise follow the OS setting.
  const themeBtn = document.querySelector(".theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
  themeBtn?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("open", open);
  };
  toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  links?.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && links.classList.contains("open")) { setMenu(false); toggle.focus(); } });

  // Project filters. "All" starts collapsed to the first cards; any specific
  // filter shows every match so nothing is hidden behind "Show all".
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");
  const grid = document.querySelector(".projects");
  const empty = document.querySelector(".empty");
  const moreWrap = document.querySelector(".more-wrap");
  const moreBtn = document.querySelector(".more-btn");
  let expanded = false;

  const syncMore = (filter) => {
    const collapsible = filter === "all" && !expanded;
    grid.classList.toggle("is-collapsed", collapsible);
    if (moreWrap) moreWrap.hidden = filter !== "all";
    if (moreBtn) {
      moreBtn.setAttribute("aria-expanded", String(expanded));
      moreBtn.textContent = expanded ? "Show fewer projects" : `Show all ${projects.length} projects`;
    }
  };

  let currentFilter = "all";
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      let shown = 0;
      projects.forEach((p) => {
        const match = currentFilter === "all" || p.dataset.cat.split(" ").includes(currentFilter);
        p.hidden = !match;
        if (match) { shown++; p.classList.add("in"); }
      });
      if (empty) empty.hidden = shown > 0;
      syncMore(currentFilter);
    });
  });

  moreBtn?.addEventListener("click", () => {
    expanded = !expanded;
    projects.forEach((p) => p.classList.add("in"));
    syncMore(currentFilter);
    if (!expanded) document.getElementById("work").scrollIntoView();
  });
  syncMore("all");

  // Copy e-mail
  const toast = document.querySelector(".toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  };
  document.querySelectorAll(".copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        showToast("E-mail copied");
      } catch (e) {
        showToast(btn.dataset.copy);
      }
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Highlight the nav link for the section in view
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.btn)')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }
})();
