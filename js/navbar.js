export function setupNavbar() {
  const navToggle = document.getElementById('NavbarToggle');
  const siteHeader = document.getElementById('SiteHeader');

  const navMenuHtml = `
    <nav class="siteHeaderNav" id="SiteNav" aria-label="Main">
      <ul>
        <li data-route="home">
          <span class="nav-dot" aria-hidden="true">&#x2022;</span>
          <a href="#about" id="home-link">Home</a>
        </li>
        <li data-route="webdev">
          <span class="nav-dot" aria-hidden="true">&#x2022;</span>
          <a href="#webdev" id="webdev-link">Web Developer</a>
        </li>
        <li data-route="film">
          <span class="nav-dot" aria-hidden="true">&#x2022;</span>
          <a href="#film" id="film-link">Film Work</a>
        </li>
        <li data-route="books">
          <span class="nav-dot" aria-hidden="true">&#x2022;</span>
          <a href="#books" id="books-link">Books</a>
        </li>
        <li data-route="about">
          <span class="nav-dot" aria-hidden="true">&#x2022;</span>
          <a href="#about" id="about-link">About me</a>
        </li>
        <li data-route="contact">
          <span class="nav-dot" aria-hidden="true">&#x2022;</span>
          <a href="#contact" id="contact-link">Contact</a>
        </li>
      </ul>
    </nav>
  `;

  // Inject once if missing
  let navMenu = document.getElementById('SiteNav');
  if (!navMenu) {
    siteHeader.insertAdjacentHTML('beforeend', navMenuHtml);
    navMenu = document.getElementById('SiteNav');
  }

  const mq = window.matchMedia('(min-width: 769px) and (min-height: 201px)');
  function applyResponsiveState(e) {
    const wide = (e && 'matches' in e) ? e.matches : mq.matches;
    if (!navMenu) return;
    navMenu.classList.toggle('active', wide);
    if (navToggle) navToggle.setAttribute('aria-expanded', wide ? 'true' : 'false');
  }

  applyResponsiveState();
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', applyResponsiveState);
  } else if ('onchange' in mq) {
    mq.onchange = applyResponsiveState;
  } else {
    window.addEventListener('resize', () => applyResponsiveState());
  }

  // Single, de-duped toggle handler; use cached navMenu
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isActive));
    });
  }
}

export function setActiveNav(route) {
  const nav = document.getElementById("SiteNav");
  if (!nav) return;

  for(const a of nav.querySelectorAll('a[aria-current="page"]')) {
    a.removeAttribute("aria-current");
  };
  
  for(const li of nav.querySelectorAll('li.active')) {
    li.classList.remove("active");
  };

  // sets new active
  const li = nav.querySelector(`li[data-route="${route}"]`);
  if (li) {
    li.classList.add("active");
    const a = li.querySelector("a");
    if (a) a.setAttribute("aria-current", "page");
  }
}

export default {
  setupNavbar,
  setActiveNav
};