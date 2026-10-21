/*
 * Renders content.js into the pages.
 * Content changes belong in content.js, this file stays as is.
 */
(function () {
  "use strict";

  let site;
  try {
    site = SITE;
  } catch {
    // content.js is missing or contains an error.
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<p class="notice">content.js contains an error: open the browser console (F12) to see the line at fault.</p>'
    );
    return;
  }

  const { profile, projects = [], publications = [] } = site;

  const escapeHtml = (value = "") =>
    String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

  // External links open in a new tab.
  const linkAttributes = (url) =>
    `href="${escapeHtml(url)}"` + (/^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "");

  // Contact icons from Tabler Icons, MIT license.
  const ICONS = {
    linkedin:
      '<path d="M8 11v5"/><path d="M8 8v.01"/><path d="M12 16v-5"/><path d="M16 16v-3a2 2 0 1 0 -4 0"/>' +
      '<path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10"/>',
    github:
      '<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>',
    email:
      '<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10"/><path d="M3 7l9 6l9 -6"/>',
  };

  const icon = (name) =>
    `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

  // Dates use "YYYY-MM" or "YYYY", sorted newest first and displayed as "Aug 2026".
  const dateKey = (date) => {
    const [year, month] = String(date || "").split("-").map(Number);
    return (year || 0) * 100 + (month || 0);
  };

  const newestFirst = (a, b) => dateKey(b.date) - dateKey(a.date);

  function formatDate(date) {
    const [year, month] = String(date).split("-").map(Number);
    if (!month) return String(date);
    return new Date(Date.UTC(year, month - 1)).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  const timeTag = (className, date) =>
    date ? `<time class="${className}" datetime="${escapeHtml(date)}">${escapeHtml(formatDate(date))}</time>` : "";

  /* Header ----------------------------------------------------------------- */

  function renderProfile() {
    document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = profile.name));

    const photo = document.getElementById("photo");
    if (photo) {
      photo.src = profile.photo;
      photo.alt = `Photo of ${profile.name}`;
    }

    const intro = document.getElementById("intro");
    if (intro) intro.innerHTML = profile.intro;

    const contacts = document.getElementById("contacts");
    if (contacts) {
      // Links without a known icon show their label instead.
      const links = (profile.links || []).map((link) => {
        const label = escapeHtml(link.label);
        return ICONS[link.icon]
          ? `<li><a class="button button--icon" ${linkAttributes(link.url)} aria-label="${label}" title="${label}">${icon(link.icon)}</a></li>`
          : `<li><a class="button" ${linkAttributes(link.url)}>${label}</a></li>`;
      });
      contacts.insertAdjacentHTML("afterbegin", links.join(""));
    }
  }

  function setupEmail() {
    const toggle = document.getElementById("email-toggle");
    const panel = document.getElementById("email-panel");
    if (!toggle || !panel) return;

    if (!profile.email) {
      toggle.closest("li").remove();
      panel.remove();
      return;
    }

    toggle.innerHTML = icon("email");

    const address = document.getElementById("email-address");
    address.href = `mailto:${profile.email}`;
    address.textContent = profile.email;

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
    });

    const copy = document.getElementById("email-copy");
    if (!navigator.clipboard) {
      copy.remove();
      return;
    }
    const label = copy.textContent;
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(profile.email);
        copy.textContent = copy.dataset.done;
        setTimeout(() => (copy.textContent = label), 2000);
      } catch {
        // Clipboard access denied, the address stays selectable.
      }
    });
  }

  /* Projects --------------------------------------------------------------- */

  function projectMedia({ image, title = "" }) {
    if (!image) {
      return `<span class="project__placeholder" aria-hidden="true">${escapeHtml(title.charAt(0))}</span>`;
    }
    if (/\.(mp4|webm)$/i.test(image)) {
      return `<video src="${escapeHtml(image)}" autoplay muted loop playsinline></video>`;
    }
    return `<img src="${escapeHtml(image)}" alt="" loading="lazy" decoding="async">`;
  }

  function projectItem(project) {
    const tag = project.link ? "a" : "div";
    const attributes = project.link ? linkAttributes(project.link) : "";
    return `
      <li class="project">
        <${tag} class="project__link" ${attributes}>
          <div class="project__media">${projectMedia(project)}</div>
          ${timeTag("project__date", project.date)}
          <h3 class="project__title">${escapeHtml(project.title)}</h3>
          <p class="project__description">${escapeHtml(project.description)}</p>
        </${tag}>
      </li>`;
  }

  function renderProjects() {
    const list = document.getElementById("projects");
    if (!list) return;

    list.closest("section").hidden = projects.length === 0;

    // data-limit in the HTML caps the number of projects shown.
    const limit = Number(list.dataset.limit) || projects.length;
    list.innerHTML = [...projects].sort(newestFirst).slice(0, limit).map(projectItem).join("");

    const more = document.getElementById("projects-more");
    if (more && projects.length > limit) {
      document.getElementById("projects-count").textContent = projects.length;
      more.hidden = false;
    }
  }

  /* Publications ----------------------------------------------------------- */

  function highlightAuthor(authors) {
    const name = profile.authorName && escapeHtml(profile.authorName);
    return name ? authors.split(name).join(`<strong>${name}</strong>`) : authors;
  }

  function publicationItem(publication) {
    const title = escapeHtml(publication.title);
    return `
      <li class="publication">
        <h3 class="publication__title">${
          publication.link ? `<a ${linkAttributes(publication.link)}>${title}</a>` : title
        }</h3>
        <p class="publication__authors">${highlightAuthor(escapeHtml(publication.authors))}</p>
        <p class="publication__venue">${escapeHtml(publication.venue)}</p>
        ${timeTag("publication__date", publication.date)}
      </li>`;
  }

  function renderPublications() {
    const list = document.getElementById("publications");
    if (!list) return;

    list.closest("section").hidden = publications.length === 0;
    list.innerHTML = [...publications].sort(newestFirst).map(publicationItem).join("");
  }

  /* ------------------------------------------------------------------------ */

  renderProfile();
  setupEmail();
  renderProjects();
  renderPublications();
})();
