const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
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
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}


/* =====================================================
   EVENT ALBUMS
===================================================== */

const eventGallery = document.getElementById("event-gallery");
const albumModal = document.getElementById("album-modal");
const albumGrid = document.getElementById("album-grid");
const albumTitle = document.getElementById("album-title");
const albumClose = document.getElementById("album-close");


/*
   Add your event folders here.

   To add another event later, simply add another object.
*/

const events = [

  {
    name: "Independence Day",
    folder: "independence-day",
    cover: "independence-day-cover.jpg",

    photos: [
      "photo1.jpeg",
      "photo2.jpeg",
      "photo3.jpeg",
      "photo4.jpeg",
      "photo5.jpeg",
      "photo6.jpeg",
      "photo7.jpeg",
      "photo8.jpeg",
      "photo9.jpeg",
      "photo10.jpeg"
    ]
  }

];


function createEventAlbums() {

  if (!eventGallery) return;

  events.forEach(event => {

    const card = document.createElement("figure");

    card.className = "gallery-card event-album";


    const image = document.createElement("img");

    image.src =
      `images/events/${event.folder}/${event.cover}`;

    image.alt =
      `${event.name} cover photo`;

    image.loading = "lazy";


    image.onerror = function () {

      console.error(
        "Cover image not found:",
        image.src
      );

      image.style.display = "none";

      const fallback =
        document.createElement("div");

      fallback.className = "empty-photo";

      fallback.innerHTML = `
        <span>📸</span>
        <strong>${event.name}</strong>
        <small>Cover photo unavailable</small>
      `;

      card.insertBefore(
        fallback,
        card.firstChild
      );
    };


    const caption =
      document.createElement("figcaption");

    caption.innerHTML = `
      <strong>${event.name}</strong>
      <span>${event.photos.length} Photos • Click to View Album</span>
    `;


    card.appendChild(image);

    card.appendChild(caption);


    card.addEventListener("click", () => {

      openAlbum(event);

    });


    eventGallery.appendChild(card);

  });

}


function openAlbum(event) {

  if (!albumModal || !albumGrid || !albumTitle) {
    return;
  }


  albumTitle.textContent =
    event.name;


  albumGrid.innerHTML = "";


  event.photos.forEach((photo, index) => {

    const image =
      document.createElement("img");


    image.src =
      `images/events/${event.folder}/${photo}`;


    image.alt =
      `${event.name} photo ${index + 1}`;


    image.loading = "lazy";


    image.onerror = function () {

      console.error(
        "Photo not found:",
        image.src
      );

      image.style.display = "none";

    };


    albumGrid.appendChild(image);

  });


  albumModal.classList.add("active");

  document.body.style.overflow =
    "hidden";

}


function closeAlbum() {

  if (!albumModal) return;

  albumModal.classList.remove("active");

  document.body.style.overflow =
    "";

}


if (albumClose) {

  albumClose.addEventListener(
    "click",
    closeAlbum
  );

}


if (albumModal) {

  const overlay =
    albumModal.querySelector(
      ".album-overlay"
    );

  if (overlay) {

    overlay.addEventListener(
      "click",
      closeAlbum
    );

  }

}


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeAlbum();

    }

  }
);


/* Start */

createEventAlbums();
