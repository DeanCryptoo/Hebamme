(function () {
  const navItems = [
    { href: "index.html", label: "Start" },
    { href: "ueber.html", label: "Über mich" },
    { href: "schwangerschaftsbetreuung.html", label: "Schwangerschaft" },
    { href: "wochenbett.html", label: "Wochenbett" },
    { href: "kurse.html", label: "Kurse" },
    { href: "kontakt.html", label: "Kontakt" },
  ];

  const legalLinks = [
    { href: "impressum.html", label: "Impressum" },
    { href: "datenschutz.html", label: "Datenschutz" },
  ];

  const courseLabels = {
    schwangerschaft: "Schwangerschaft",
    wochenbett: "Wochenbett",
    geburtsvorbereitung: "Geburtsvorbereitung",
    rueckbildung: "Rückbildung",
    babymassage: "Babymassage",
    kanga: "Kanga",
    allgemein: "Allgemeine Frage",
  };

  const fieldLabels = {
    topic: "Thema",
    name: "Name",
    phone: "Telefon",
    email: "E-Mail",
    dueDate: "ET / Zeitraum",
    location: "Wohnort",
    message: "Nachricht",
  };

  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  const mobileCta = document.getElementById("mobile-cta");

  function icon(name) {
    const icons = {
      menu: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      close: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      mail: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7.5h16v9H4v-9Zm0 0 8 5.5 8-5.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    };
    return icons[name] || "";
  }

  function resolveHref(href) {
    return new URL(href, document.baseURI).href;
  }

  function syncHeaderOffset() {
    const header = headerMount?.querySelector(".site-header");
    if (!header) return;
    document.documentElement.style.setProperty("--header-offset", `${Math.ceil(header.offsetHeight)}px`);
  }

  function currentNavHref(href) {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    if (href === "index.html") {
      return path === "/" || path === "" || path.endsWith("/index.html");
    }
    return path.endsWith(`/${href}`) || path.endsWith(href);
  }

  function renderHeader() {
    if (!headerMount) return;

    const navMarkup = navItems
      .map((item) => {
        const active = currentNavHref(item.href) ? ' aria-current="page"' : "";
        return `<li><a class="site-nav__link" href="${item.href}"${active}>${item.label}</a></li>`;
      })
      .join("");

    headerMount.innerHTML = `
      <header class="site-header">
        <div class="container site-header__bar">
          <a class="brand" href="index.html" aria-label="Zur Startseite">
            <span class="brand__mark"><img src="assets/img/logo-violet.png" alt="Logo von Hebamme Rieke L\u00f6bker"></span>
            <span class="brand__text">
              <span class="brand__name">Hebamme Rieke L\u00f6bker</span>
              <span class="brand__tagline">Ruhige Begleitung in Rheine und Umgebung</span>
            </span>
          </a>
          <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            ${icon("menu")}
            <span class="sr-only">Men\u00fc \u00f6ffnen</span>
          </button>
          <nav id="site-nav" class="site-nav" aria-label="Hauptnavigation">
            <div class="site-nav__panel">
              <ul class="site-nav__list">${navMarkup}</ul>
            </div>
          </nav>
          <a class="site-header__cta" href="${resolveHref("kontakt.html#kontaktformular")}">Begleitung anfragen</a>
        </div>
      </header>
    `;

    const header = headerMount.querySelector(".site-header");
    const nav = headerMount.querySelector(".site-nav");
    const toggle = headerMount.querySelector(".site-nav__toggle");
    const links = headerMount.querySelectorAll(".site-nav__link");

    if (!header || !nav || !toggle) {
      syncHeaderOffset();
      return;
    }

    const closeMenu = () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = `${icon("menu")}<span class="sr-only">Men\u00fc \u00f6ffnen</span>`;
      if (window.matchMedia("(max-width: 960px)").matches) {
        nav.hidden = true;
      }
    };

    const openMenu = () => {
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.innerHTML = `${icon("close")}<span class="sr-only">Men\u00fc schlie\u00dfen</span>`;
      nav.hidden = false;
    };

    toggle.addEventListener("click", () => {
      if (document.body.classList.contains("nav-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 960px)").matches) {
          closeMenu();
        }
      });
    });

    const onResize = () => {
      if (window.matchMedia("(min-width: 961px)").matches) {
        nav.hidden = false;
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = `${icon("menu")}<span class="sr-only">Men\u00fc \u00f6ffnen</span>`;
      } else if (!document.body.classList.contains("nav-open")) {
        nav.hidden = true;
      }
      syncHeaderOffset();
    };

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    };

    onResize();
    onScroll();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function renderFooter() {
    if (!footerMount) return;

    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-panel">
          <div class="footer-brand">
            <p class="eyebrow">Achtsame Hebammenarbeit</p>
            <div class="footer-brand__name">Rieke L\u00f6bker</div>
            <p>Begleitung in Schwangerschaft, Wochenbett und kleinen Kursformaten f\u00fcr Familien in Rheine und Umgebung.</p>
            <div class="footer-copy">&copy; <span id="year"></span> Hebamme Rieke L\u00f6bker</div>
          </div>
          <div class="footer-list">
            <h4>Schnell finden</h4>
            ${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
          </div>
          <div class="footer-list">
            <h4>Kontakt & Recht</h4>
            <a href="tel:016096477650">0160 96477650</a>
            <a href="mailto:info@hebamme-rieke.de">info@hebamme-rieke.de</a>
            <a href="https://www.google.com/maps/search/api=1&query=Humboldtplatz+22+48429+Rheine" target="_blank" rel="noreferrer">Praxis in Rheine</a>
            ${legalLinks.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
          </div>
        </div>
      </footer>
    `;

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
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

  function prefillForms() {
    const params = new URLSearchParams(window.location.search);
    const course = (params.get("course") || "").toLowerCase();
    const label = courseLabels[course];

    document.querySelectorAll("[data-mail-form]").forEach((form) => {
      const note = form.querySelector(".form-note");
      if (note) {
        note.textContent = "Beim Absenden öffnet sich dein E-Mail-Programm. Die Anfrage wird mit deinen Angaben als vorbereitete Mail angelegt.";
      }

      if (!label) return;

      const topicField = form.querySelector('[name="topic"]');
      const messageField = form.querySelector('[name="message"]');

      form.dataset.subject = `Kursanfrage: ${label}`;

      if (topicField && !topicField.value) {
        topicField.value = course;
      }

      if (messageField && !messageField.value.trim()) {
        messageField.value = `Hallo Rieke,\n\nich interessiere mich für den Kurs „${label}“ und möchte gern wissen, ob aktuell ein passender Platz oder Termin frei ist.\n\nViele Grüße`;
      }
    });
  }

  function formatValue(name, value) {
    if (name === "topic") {
      return courseLabels[value] || value;
    }
    return value;
  }

  function enhanceForms() {
    document.querySelectorAll("[data-mail-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const name = (data.get("name") || "").toString().trim();
        const subject = encodeURIComponent(form.dataset.subject?.trim() || `Anfrage von ${name || "der Website"}`);
        const lines = [];

        Object.keys(fieldLabels).forEach((fieldName) => {
          if (fieldName === "message") return;
          const rawValue = (data.get(fieldName) || "").toString().trim();
          if (!rawValue) return;
          lines.push(`${fieldLabels[fieldName]}: ${formatValue(fieldName, rawValue)}`);
        });

        const message = (data.get("message") || "").toString().trim();
        if (lines.length && message) lines.push("");
        if (message) lines.push(message);

        const body = encodeURIComponent(lines.join("\n"));
        window.location.href = `mailto:info@hebamme-rieke.de?subject=${subject}&body=${body}`;
      });
    });
  }

  function setupReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));
  }

  function finish() {
    renderHeader();
    renderFooter();
    renderMobileCta();
    prefillForms();
    enhanceForms();
    setupReveal();
    requestAnimationFrame(syncHeaderOffset);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", finish);
  } else {
    finish();
  }
})();
