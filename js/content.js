async function renderGenericPage(route, contentEl) {
  const res = await fetch(`json/${route}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${route}.json`);
  const data = await res.json();

  const page = data.page;
  if (!page) throw new Error("Invalid JSON structure: 'page' missing");

  document.title = `Jesper Seip – ${page.title || route}`;

  let html = `
    <article>
      <h3>${page.title || ""}</h3>
      ${page.subtitle ? `<h2>${page.subtitle}</h2>` : ""}
      ${page.introduction ? `<p>${page.introduction}</p>` : ""}
  `;

  if (Array.isArray(page.sections)) {
    for (const section of page.sections) {
      html += "<br>"
      html += `<section id="${section.id || ""}">`;
      if (section.image) html += `<img src="${section.image}" alt="${section.title || ""}">`;
      if (section.title) html += `<h2>${section.title}</h2>`;

      if (Array.isArray(section.content)) {
        for (const block of section.content) {
          html += "<br>";
          if (block.heading) html += `<h2>>${block.heading}</h2>`;
          if (block.text) html += `<p>${block.text}</p>`;
          if (block.embed?.url) html += `
            <div class="embed-container">
              <iframe src="${block.embed.url}" allowfullscreen></iframe>
            </div>
          `;
        }
      }

      if (Array.isArray(section.lists)) {
        for (const list of section.lists) {
          if (list.heading) html += `<h4>${list.heading}</h4>`;
          html += "<ul>";
          for (const item of list.items || []) {
            html += `<li>${item}</li>`;
          }
          html += "</ul>";
        }
      }


      if (Array.isArray(section.links)) {
        html += "<ul>";
        for (const link of section.links) {
          html += `<li><a href="${link.url}" target="_blank">> ${link.label || link.type}</a></li>`;
        }
        html += "</ul>";
      }

      html += "</section>";
    }
  }

  html += "</article>";
  contentEl.innerHTML = html;
}

export async function renderContent(route, setActiveNav) {
  const contentEl = document.getElementById("Content");
  if (!contentEl) {
    console.error("Content element not found in DOM.");
    return;
  }

  try {
    switch (route) {
      case "about":
      case "books":
      case "film": 
      case "contact": {
        await renderGenericPage(route, contentEl);
        break;
      }

      case "webdev": {
        document.title = "Jesper Seip – Web Developer";
        contentEl.innerHTML = `
          <article>
            <h3>Web Developer</h3>
            <h2>UX-design</h2>
            <p>A Figma layout I created for a web project. Feel free to fullscreen the embedded prototype and click around.</p>
            <iframe 
              style="border: 1px solid rgba(0, 0, 0, 0.1);" 
              width="full" 
              height="250px" 
              src="https://embed.figma.com/proto/YiIM6df3EVwwqkDE4Dc2Ad/Lofoten-Film-Collective-Website?node-id=176-2&scaling=contain&content-scaling=fixed&page-id=0%3A1&embed-host=share" allowfullscreen>
            </iframe>
          </article>`;
        break;
      }
      default: {
        document.title = "404 Not Found";
        contentEl.innerHTML = "<p>404 - Page Not Found</p>";
        break;
      }
    }

    if (typeof setActiveNav === "function") {
      setActiveNav(route);
    }
  } catch (err) {
    console.error(err);
    contentEl.innerHTML = "<p>Could not load content. Please try again later.</p>";
    if (typeof setActiveNav === "function") {
      setActiveNav(route);
    }
  }
}
