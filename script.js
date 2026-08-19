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
// EVENT ALBUM GALLERY
// ===============================

const gallery = document.getElementById("event-gallery");
const albumModal = document.getElementById("album-modal");
const albumGrid = document.getElementById("album-grid");
const albumTitle = document.getElementById("album-title");
const albumClose = document.getElementById("album-close");


async function loadEventAlbums() {

  if (!gallery) return;

  const apiURL =
    "https://api.github.com/repos/bhargavschool/bhargav-high-school/contents/images/events";


  try {

    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("Unable to access events folder");
    }

    const items = await response.json();

    const eventFolders = items.filter(
      item => item.type === "dir"
    );


    gallery.innerHTML = "";


    if (eventFolders.length === 0) {

      gallery.innerHTML = `
        <div class="empty-photo gallery-loading">
          <span>📸</span>
          <strong>Event Albums Coming Soon</strong>
          <small>Add event folders inside images/events</small>
        </div>
      `;

      return;
    }


    // Load each event folder

    for (const folder of eventFolders) {

      try {

        const folderResponse =
          await fetch(folder.url);

        if (!folderResponse.ok) continue;

        const photos =
          await folderResponse.json();


        const imageFiles = photos.filter(photo =>
          photo.type === "file" &&
          /\.(jpg|jpeg|png|webp|gif)$/i.test(photo.name)
        );


        if (imageFiles.length === 0) continue;


        // Find cover.jpg

        let coverPhoto =
          imageFiles.find(photo =>
            photo.name.toLowerCase() === "cover.jpg"
          );


        // If cover doesn't exist,
        // use first image

        if (!coverPhoto) {
          coverPhoto = imageFiles[0];
        }


        // Event name

        const eventName =
          folder.name
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, letter =>
              letter.toUpperCase()
            );


        // ===============================
        // CREATE EVENT CARD
        // ===============================

        const figure =
          document.createElement("figure");

        figure.className =
          "gallery-card event-album";


        const img =
          document.createElement("img");

        img.src =
          coverPhoto.download_url;

        img.alt =
          eventName;

        img.loading =
          "lazy";


        const caption =
          document.createElement("figcaption");


        const title =
          document.createElement("strong");

        title.textContent =
          eventName;


        const subtitle =
          document.createElement("span");

        subtitle.textContent =
          `${imageFiles.length} ${
            imageFiles.length === 1
              ? "Photo"
              : "Photos"
          } • Click to View`;


        caption.appendChild(title);
        caption.appendChild(subtitle);


        figure.appendChild(img);
        figure.appendChild(caption);


        // Open album when clicked

        figure.addEventListener("click", () => {

          openAlbum(
            eventName,
            imageFiles
          );

        });


        gallery.appendChild(figure);

      }

      catch (error) {

        console.error(
          "Album loading error:",
          folder.name,
          error
        );

      }

    }

  }

  catch (error) {

    console.error(
      "Gallery error:",
      error
    );


    gallery.innerHTML = `
      <div class="empty-photo gallery-loading">
        <span>📸</span>
        <strong>Gallery Temporarily Unavailable</strong>
        <small>Please try again later.</small>
      </div>
    `;

  }

}


// ===============================
// OPEN ALBUM
// ===============================

function openAlbum(title, photos) {

  albumTitle.textContent =
    title;


  albumGrid.innerHTML = "";


  photos.forEach(photo => {

    const img =
      document.createElement("img");

    img.src =
      photo.download_url;

    img.alt =
      title;

    img.loading =
      "lazy";


    albumGrid.appendChild(img);

  });


  albumModal.classList.add("active");

  document.body.style.overflow =
    "hidden";

}


// ===============================
// CLOSE ALBUM
// ===============================

function closeAlbum() {

  albumModal.classList.remove("active");

  document.body.style.overflow =
    "";

}


albumClose.addEventListener(
  "click",
  closeAlbum
);


document
  .querySelector(".album-overlay")
  .addEventListener(
    "click",
    closeAlbum
);


// ESC KEY

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      albumModal.classList.contains("active")
    ) {

      closeAlbum();

    }

  }
);


// ===============================
// START
// ===============================

loadEventAlbums();
