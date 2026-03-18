(function () {
 const navItems = [
  { href: 'index.html', label: 'Willkommen' },
  { href: 'ueber.html', label: 'Über mich' },
  { href: 'schwangerschaftsbetreuung.html', label: 'Vor der Geburt' },
  { href: 'wochenbett.html', label: 'Nach der Geburt' },
  { href: 'kurse.html', label: 'Kurse' },
  { href: 'kontakt.html', label: 'Kontakt' }
 ];

 const footerLinks = {
  kurse: [
   { href: 'kurse/geburtsvorbereitungskurs.html', label: 'Geburtsvorbereitung' },
   { href: 'kurse/rueckbildungskurs.html', label: 'Rückbildungskurs' },
   { href: 'kurse/babymassage.html', label: 'Babymassage' }
  ],
  leistungen: [
   { href: 'schwangerschaftsbetreuung.html', label: 'Schwangerschaft' },
   { href: 'wochenbett.html', label: 'Wochenbett' },
   { href: 'kontakt.html', label: 'Kontakt' }
  ],
  legal: [
   { href: 'impressum.html', label: 'Impressum' },
   { href: 'datenschutz.html', label: 'Datenschutz' }
  ]
 };

 const navContainer = document.getElementById('site-header');
 const footerContainer = document.getElementById('site-footer');
 const mobileCta = document.getElementById('mobile-cta');

 function icon(name) {
  const icons = {
   menu: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
   close: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
   phone: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.8 4.6c.5-.5 1.2-.7 1.9-.5l2.5.7c.7.2 1.2.7 1.4 1.4l.6 2.1c.2.7 0 1.4-.5 1.9l-1 1c1.2 2.3 3.1 4.2 5.4 5.4l1-1c.5-.5 1.2-.7 1.9-.5l2.1.6c.7.2 1.2.7 1.4 1.4l.7 2.5c.2.7 0 1.4-.5 1.9l-1.3 1.3c-.7.7-1.7 1-2.7.8-4-.8-7.6-2.9-10.4-5.7S4 13.8 3.2 9.8c-.2-1 .1-2 .8-2.7L5.8 4.6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'
  };
  return icons[name] || '';
 }

 function currentNavHref(href) {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (href === 'index.html') {
   return path === '/index.html' || path.endsWith('/index.html') || path === '/' || path === '';
  }
  return path === `/${href}` || path.endsWith(href);
 }

 function renderHeader() {
  const nav = navItems
   .map((item) => {
     const active = currentNavHref(item.href) ? ' aria-current="page"' : '';
    return `<li><a class="site-nav__link" href="${item.href}"${active}>${item.label}</a></li>`;
   })
   .join('');

  navContainer.innerHTML = `
   <header class="site-header">
    <div class="site-header__top">
     <div class="container">
      <div>Rieke Löbker | Deine achtsame Hebamme in Rheine und Umgebung</div>
      <div class="site-header__meta">
       <a href="tel:016096477650">0160 96477650</a>
       <a href="mailto:info@hebamme-rieke.de">info@hebamme-rieke.de</a>
      </div>
     </div>
    </div>
    <div class="container site-header__bar">
     <a class="brand" href="index.html" aria-label="Startseite">
      <span class="brand__mark"><img src="assets/img/logo-violet.png" alt="Logo von Hebamme Rieke"></span>
      <span class="brand__text">
       <span class="brand__name">Rieke Löbker</span>
       <span class="brand__tagline">Achtsame Hebamme in Rheine</span>
      </span>
     </a>
     <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      ${icon('menu')}
      <span class="sr-only">Menü öffnen</span>
     </button>
     <nav id="site-nav" class="site-nav" aria-label="Hauptnavigation">
      <div class="site-nav__panel">
       <ul class="site-nav__list">${nav}</ul>
      </div>
     </nav>
    </div>
   </header>
  `;

  const toggle = navContainer.querySelector('.site-nav__toggle');
  const navEl = navContainer.querySelector('.site-nav');

  toggle.addEventListener('click', () => {
   const isOpen = document.body.classList.toggle('nav-open');
   toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = `${isOpen ? icon('close') : icon('menu')}<span class="sr-only">${isOpen ? 'Menü schließen' : 'Menü öffnen'}</span>`;
   navEl.hidden = !isOpen && window.matchMedia('(max-width: 959px)').matches;
  });

  const closeOnMobile = () => {
   if (window.matchMedia('(min-width: 960px)').matches) {
    navEl.hidden = false;
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = `${icon('menu')}<span class="sr-only">Menü öffnen</span>`;
   } else {
    navEl.hidden = !document.body.classList.contains('nav-open');
   }
  };

  closeOnMobile();
  window.addEventListener('resize', closeOnMobile, { passive: true });
 }

 function renderFooter() {
  footerContainer.innerHTML = `
   <footer class="site-footer">
    <div class="container site-footer__grid">
     <section class="site-footer__panel">
      <p class="eyebrow">Kontakt</p>
      <h3>Rieke Löbker</h3>
      <p>Freiberufliche Hebamme in Rheine und Umgebung</p>
      <div class="divider"></div>
      <p>Hebammenpraxis Bauchgeflüster<br>Humboldtplatz 22<br>48429 Rheine</p>
      <p style="margin-top:0.8rem;">Praxisraum für Vorsorge und Akupunktur<br>Surenburgstr. 229, 48429 Rheine</p>
     </section>
     <section class="site-footer__panel">
      <p class="eyebrow">Leistungen</p>
      <ul class="site-footer__links">
       ${footerLinks.leistungen.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
      </ul>
     </section>
     <section class="site-footer__panel">
      <p class="eyebrow">Kurse & Rechtliches</p>
      <ul class="site-footer__links">
       ${footerLinks.kurse.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
       ${footerLinks.legal.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
      </ul>
     </section>
    </div>
    <div class="container site-footer__bottom">
     <span>Copyright <span id="year"></span> Hebamme Rieke Löbker</span>
     <span>Warm, persönlich und sicher begleitet.</span>
    </div>
   </footer>
  `;
 }

 function renderMobileCta() {
  if (!mobileCta) return;
  mobileCta.innerHTML = `${icon('phone')}<span>Anrufen</span>`;
 }

 function enhanceForms() {
  document.querySelectorAll('[data-mail-form]').forEach((form) => {
   form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    const subject = encodeURIComponent(`Anfrage von ${name || 'Website'}`);
    const body = encodeURIComponent([
     `Name: ${name}`,
     `E-Mail: ${email}`,
     `Telefon: ${phone}`,
     '',
     message
    ].join('\n'));
    window.location.href = `mailto:info@hebamme-rieke.desubject=${subject}&body=${body}`;
   });
  });
 }

 function finish() {
  const year = document.getElementById('year');
  if (year) {
   year.textContent = String(new Date().getFullYear());
  }
  renderHeader();
  renderFooter();
  renderMobileCta();
  enhanceForms();
 }

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', finish);
 } else {
  finish();
 }
})();
