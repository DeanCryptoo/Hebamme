(function () {
  const navItems = [
    { href: "index.html", label: "\u0057illkommen" },
    { href: "ueber.html", label: "\u00dcber mich" },
    { href: "schwangerschaftsbetreuung.html", label: "Vor der Geburt" },
    { href: "wochenbett.html", label: "Nach der Geburt" },
    { href: "kurse.html", label: "Kurse" },
    { href: "kontakt.html", label: "Kontakt" },
  ];

  const footerLinks = [
    { href: "impressum.html", label: "Impressum" },
    { href: "datenschutz.html", label: "Datenschutz" },
  ];

  const navContainer = document.getElementById("site-header");
  const footerContainer = document.getElementById("site-footer");
  const mobileCta = document.getElementById("mobile-cta");

  function syncHeaderOffset() {
    const header = navContainer?.querySelector(".site-header");
    if (!header) return;
    document.documentElement.style.setProperty("--header-offset", `${Math.ceil(header.offsetHeight)}px`);
  }

  function resolveHref(href) {
    return new URL(href, document.baseURI).href;
  }

  function icon(name) {
    const icons = {
      menu: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      close: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      phone: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.8 4.6c.5-.5 1.2-.7 1.9-.5l2.5.7c.7.2 1.2.7 1.4 1.4l.6 2.1c.2.7 0 1.4-.5 1.9l-1 1c1.2 2.3 3.1 4.2 5.4 5.4l1-1c.5-.5 1.2-.7 1.9-.5l2.1.6c.7.2 1.2.7 1.4 1.4l.7 2.5c.2.7 0 1.4-.5 1.9l-1.3 1.3c-.7.7-1.7 1-2.7.8-4-.8-7.6-2.9-10.4-5.7S4 13.8 3.2 9.8c-.2-1 .1-2 .8-2.7L5.8 4.6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
      mail: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7.5h16v9H4v-9Zm0 0 8 5.5 8-5.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
      pin: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" stroke="currentColor" stroke-width="1.6"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor" stroke-width="1.6"/></svg>',
    };
    return icons[name] || "";
  }

  function currentNavHref(href) {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    if (href === "index.html") {
      return path === "/index.html" || path.endsWith("/index.html") || path === "/" || path === "";
    }
    return path === `/${href}` || path.endsWith(href);
  }

  function renderHeader() {
    if (!navContainer) return;
    const contactHref = resolveHref("kontakt.html#kontaktformular");

    const nav = navItems
      .map((item) => {
        const active = currentNavHref(item.href) ? ' aria-current="page"' : "";
        return `<li><a class="site-nav__link" href="${item.href}"${active}>${item.label}</a></li>`;
      })
      .join("");

    navContainer.innerHTML = `
      <header class="site-header">
        <div class="container site-header__top">
          <span>Rieke L\u00f6bker | Deine achtsame Hebamme in Rheine und Umgebung</span>
          <div class="site-header__meta">
            <a href="tel:016096477650">0160 96477650</a>
            <a href="mailto:info@hebamme-rieke.de">info@hebamme-rieke.de</a>
          </div>
        </div>
        <div class="container site-header__bar">
          <a class="brand" href="index.html" aria-label="Startseite">
            <span class="brand__mark"><img src="assets/img/logo-violet.png" alt="Logo von Hebamme Rieke"></span>
            <span class="brand__text">
              <span class="brand__name">Hebamme Rieke L\u00f6bker</span>
              <span class="brand__tagline">Warm, ruhig und verl\u00e4sslich begleitet</span>
            </span>
          </a>
          <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            ${icon("menu")}
            <span class="sr-only">Men\u00fc \u00f6ffnen</span>
          </button>
          <nav id="site-nav" class="site-nav" aria-label="Hauptnavigation">
            <div class="site-nav__panel">
              <ul class="site-nav__list">${nav}</ul>
            </div>
          </nav>
          <a class="site-header__cta" href="${contactHref}">Betreuung anfragen</a>
        </div>
      </header>
    `;

    const toggle = navContainer.querySelector(".site-nav__toggle");
    const navEl = navContainer.querySelector(".site-nav");
    if (!toggle || !navEl) return;

    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.innerHTML = `${isOpen ? icon("close") : icon("menu")}<span class="sr-only">${isOpen ? "Men\u00fc schlie\u00dfen" : "Men\u00fc \u00f6ffnen"}</span>`;
      navEl.hidden = !isOpen && window.matchMedia("(max-width: 959px)").matches;
    });

    const closeOnMobile = () => {
      if (window.matchMedia("(min-width: 960px)").matches) {
        navEl.hidden = false;
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = `${icon("menu")}<span class="sr-only">Men\u00fc \u00f6ffnen</span>`;
      } else {
        navEl.hidden = !document.body.classList.contains("nav-open");
      }
    };

    closeOnMobile();
    syncHeaderOffset();
    window.addEventListener("resize", closeOnMobile, { passive: true });
    window.addEventListener("resize", syncHeaderOffset, { passive: true });
  }

  function renderFooter() {
    if (!footerContainer) return;
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__row">
          <div class="site-footer__brand">
            <span class="site-footer__title">Hebamme Rieke L\u00f6bker</span>
            <span class="site-footer__text">Freiberufliche Hebamme in Rheine und Umgebung</span>
          </div>
          <div class="site-footer__legal">
            ${footerLinks.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
          </div>
          <div class="site-footer__copy">
            <span>&copy; <span id="year"></span> Hebamme Rieke L\u00f6bker</span>
          </div>
        </div>
      </footer>
    `;
  }

  function renderMobileCta() {
    if (!mobileCta) return;
    const isContactPage = document.body?.dataset.page === "contact";
    mobileCta.href = isContactPage
      ? `${window.location.href.split("#")[0]}#kontaktformular`
      : resolveHref("kontakt.html#kontaktformular");
    mobileCta.setAttribute("aria-label", "Zum Kontaktformular");
    mobileCta.innerHTML = `${icon("mail")}<span class="mobile-sticky-cta__label">Kontakt</span>`;
  }

  function prefillContactForm() {
    const form = document.querySelector(".contact-form[data-mail-form]");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const course = (params.get("course") || "").toLowerCase();
    const messageField = form.querySelector('[name="message"]');
    const phoneField = form.querySelector('[name="phone"]');

    const courseLabels = {
      geburtsvorbereitung: "Geburtsvorbereitung",
      rueckbildung: "Rückbildung",
      babymassage: "Babymassage",
      kanga: "Kanga",
    };

    const label = courseLabels[course];
    if (label && messageField && !messageField.value.trim()) {
      form.dataset.subject = `Kursanfrage: ${label}`;
      messageField.value = `Hallo Rieke,\n\nich interessiere mich für den Kurs „${label}“ und möchte gern wissen, ob aktuell ein Platz frei ist.\n\nViele Grüße`;
    }

    const note = form.querySelector(".form-note");
    if (note) {
      note.textContent = "Beim Senden öffnet sich dein E-Mail-Programm. Deine Antwortadresse wird automatisch aus deinem Mailkonto übernommen.";
    }

    if (phoneField && !phoneField.placeholder) {
      phoneField.placeholder = "Optional";
    }
  }

  function enhanceForms() {
    document.querySelectorAll("[data-mail-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const name = (data.get("name") || "").toString().trim();
        const phone = (data.get("phone") || "").toString().trim();
        const dueDate = (data.get("dueDate") || "").toString().trim();
        const message = (data.get("message") || "").toString().trim();
        const configuredSubject = form.dataset.subject?.trim();
        const subject = encodeURIComponent(configuredSubject || `Anfrage von ${name || "Website"}`);
        const lines = [];
        if (name) lines.push(`Name: ${name}`);
        if (phone) lines.push(`Telefon: ${phone}`);
        if (dueDate) lines.push(`Voraussichtlicher Entbindungstermin: ${dueDate}`);
        if (lines.length) lines.push("");
        lines.push(message);
        const body = encodeURIComponent(lines.join("\n"));
        window.location.href = `mailto:info@hebamme-rieke.de?subject=${subject}&body=${body}`;
      });
    });
  }

  function finish() {
    renderHeader();
    renderFooter();
    renderMobileCta();
    prefillContactForm();
    enhanceForms();
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", finish);
  } else {
    finish();
  }
})();
