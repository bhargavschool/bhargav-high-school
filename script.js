const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.textContent = open ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


// ==========================================
// AUTOMATIC EVENT PHOTO GALLERY
// ==========================================

const gallery = document.getElementById("event-gallery");

async function loadEventGallery() {

  if (!gallery) return;

  const apiUrl =
    "https://api.github.com/repos/bhargavschool/bhargav-high-school/contents/images/events";

  try {

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Unable to load gallery");
    }

    const files = await response.json();

    const imageFiles = files.filter(file => {
      return file.type === "file" &&
        /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);
    });

    gallery.innerHTML = "";

    if (imageFiles.length === 0) {

      gallery.innerHTML = `
        <div class="empty-photo gallery-loading">
          <span>📸</span>
          <strong>Event Photos Coming Soon</strong>
          <small>School event photos will appear here.</small>
        </div>
      `;

      return;
    }

    imageFiles.forEach(file => {

      const figure = document.createElement("figure");
      figure.className = "gallery-card";

      const img = document.createElement("img");
      img.src = file.download_url;
      img.alt = "Bhargav High School Event";
      img.loading = "lazy";

      const caption = document.createElement("figcaption");

      const title = document.createElement("strong");

      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");

      title.textContent = cleanName;

      const subtitle = document.createElement("span");
      subtitle.textContent = "Bhargav High School";

      caption.appendChild(title);
      caption.appendChild(subtitle);

      figure.appendChild(img);
      figure.appendChild(caption);

      gallery.appendChild(figure);
    });

  } catch (error) {

    console.error("Gallery error:", error);

    gallery.innerHTML = `
      <div class="empty-photo gallery-loading">
        <span>📸</span>
        <strong>Gallery unavailable</strong>
        <small>Please try again later.</small>
      </div>
    `;
  }
}

loadEventGallery();
