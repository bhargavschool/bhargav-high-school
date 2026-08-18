const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");


// ===============================
// MOBILE MENU
// ===============================

menuToggle.addEventListener("click", () => {

  const open = nav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    open ? "true" : "false"
  );

  menuToggle.textContent = open ? "✕" : "☰";

});


document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {

    nav.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.textContent = "☰";

  });

});


// ===============================
// AUTOMATIC EVENT GALLERY
// ===============================

async function loadEventGallery() {

  const gallery = document.getElementById("event-gallery");

  if (!gallery) return;


  // Automatically detect the current GitHub Pages
  // username and repository.

  const host = window.location.hostname;

  const username = host.split(".")[0];

  const repository =
    window.location.pathname
      .split("/")
      .filter(Boolean)[0];


  const apiURL =
    `https://api.github.com/repos/${username}/${repository}/contents/images/events`;


  try {

    const response = await fetch(apiURL);


    if (!response.ok) {

      throw new Error(
        "GitHub folder could not be accessed."
      );

    }


    const files = await response.json();


    // Only display image files

    const imageFiles = files.filter(file => {

      return (
        file.type === "file" &&
        /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
      );

    });


    gallery.innerHTML = "";


    // No event photos yet

    if (imageFiles.length === 0) {

      gallery.innerHTML = `

        <div class="empty-photo gallery-loading">

          <span>📸</span>

          <strong>
            Event Photos Coming Soon
          </strong>

          <small>
            School event photos will appear here.
          </small>

        </div>

      `;

      return;

    }


    // Display every photo

    imageFiles.forEach(file => {

      const figure =
        document.createElement("figure");

      figure.className =
        "gallery-card";


      const img =
        document.createElement("img");

      img.src =
        file.download_url;

      img.alt =
        "Bhargav High School Event";

      img.loading =
        "lazy";


      const caption =
        document.createElement("figcaption");


      const title =
        document.createElement("strong");


      // Convert filename into readable title

      const cleanName =
        file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ");


      title.textContent =
        cleanName;


      const subtitle =
        document.createElement("span");

      subtitle.textContent =
        "Bhargav High School";


      caption.appendChild(title);

      caption.appendChild(subtitle);


      figure.appendChild(img);

      figure.appendChild(caption);


      gallery.appendChild(figure);

    });


  } catch (error) {

    console.error(
      "Gallery error:",
      error
    );


    gallery.innerHTML = `

      <div class="empty-photo gallery-loading">

        <span>📸</span>

        <strong>
          Event Photos Coming Soon
        </strong>

        <small>
          Add photos to the images/events folder.
        </small>

      </div>

    `;

  }

}


loadEventGallery();
