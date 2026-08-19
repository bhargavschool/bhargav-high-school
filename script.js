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
      throw new Error("Unable to access events folder");
    }

    const items = await response.json();


    // Find event folders
    const eventFolders = items.filter(item =>
      item.type === "dir"
    );


    gallery.innerHTML = "";


    if (eventFolders.length === 0) {

      gallery.innerHTML = `
        <div class="empty-photo gallery-loading">
          <span>📸</span>
          <strong>Event Albums Coming Soon</strong>
          <small>Create event folders inside images/events</small>
        </div>
      `;

      return;
    }


    // Create an album for every event folder

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


        // If cover.jpg doesn't exist,
        // use the first photo

        if (!coverPhoto) {
          coverPhoto = imageFiles[0];
        }


        // Event title

        const eventName =
          folder.name
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, letter =>
              letter.toUpperCase()
            );


        // Create gallery card

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


        // Open album

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
          "Unable to load album:",
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
        <strong>Event Albums Coming Soon</strong>
        <small>Add event folders to images/events</small>
      </div>
    `;

  }

}


// ===============================
// OPEN ALBUM
// ===============================

function openAlbum(title, photos) {

  albumTitle.textContent = title;

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


    // Click image to open larger version

    img.addEventListener("click", () => {

      window.open(
        photo.download_url,
        "_blank"
      );

    });


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


// START GALLERY

loadEventAlbums();
