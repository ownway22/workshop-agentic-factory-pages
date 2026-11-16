(() => {
  const logo = document.querySelector(".md-header__inner > a.md-logo[href]");
  const title = document.querySelector(".md-header__title > .md-header__ellipsis");
  const homeHref = logo?.getAttribute("href");
  if (!(logo instanceof HTMLAnchorElement) || !(title instanceof HTMLElement) || !homeHref) {
    throw new Error("Missing Material header logo or title");
  }

  const homeLink = document.createElement("a");
  homeLink.className = "md-header__home-link";
  homeLink.href = homeHref;
  homeLink.title = "返回首頁";
  homeLink.setAttribute("aria-label", "返回首頁");
  homeLink.append(...title.childNodes);
  title.append(homeLink);

  const palette = document.querySelector(".md-header__option");
  const search = document.querySelector(".md-header__inner > .md-search");
  if (!palette || !search) {
    throw new Error("Missing Material header controls");
  }
  search.after(palette);

  const controls = document.querySelectorAll(
    '.md-header label.md-header__button[for], .md-search__icon[for="__search"]',
  );

  for (const control of controls) {
    const input = document.getElementById(control.htmlFor);
    if (!(input instanceof HTMLInputElement)) {
      throw new Error(`Missing Material toggle: ${control.htmlFor}`);
    }

    const name =
      control.title ||
      { __drawer: "網站導覽", __search: "搜尋教材" }[control.htmlFor];
    if (!name) {
      throw new Error(`Missing accessible toggle name: ${control.htmlFor}`);
    }

    if (control.htmlFor === "__search") {
      control.title = name;
    }
    control.setAttribute("role", "button");
    control.setAttribute("aria-label", name);
    control.tabIndex = 0;

    if (input.type === "checkbox") {
      const updateExpanded = () =>
        control.setAttribute("aria-expanded", String(input.checked));
      input.addEventListener("change", updateExpanded);
      updateExpanded();
    }

    control.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        // Avoid activating a second control through Material's global shortcuts.
        event.stopPropagation();
        if (!event.repeat) {
          control.click();
          if (input.type === "radio") {
            const next = [...controls].find(
              (candidate) =>
                candidate.htmlFor.startsWith("__palette_") &&
                candidate.getClientRects().length > 0,
            );
            if (!next) {
              throw new Error("Missing visible Material palette control");
            }
            next.focus();
          }
        }
      }
    });
  }

  const searchInput = document.querySelector(".md-search__input");
  if (!(searchInput instanceof HTMLInputElement)) {
    throw new Error("Missing Material search input");
  }
  searchInput.title = "搜尋教材";
})();
