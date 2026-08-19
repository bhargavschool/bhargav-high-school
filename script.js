const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");


// ===============================
// MOBILE MENU
// ===============================

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    const open = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

    menuToggle.textContent =
      open ? "✕" : "☰";

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

}


// ===============================
// GALLERY
// ===============================

const eventGallery =
  document.getElementById("event-gallery");

const albumModal =
  document.getElementById("album-modal");

const albumGrid =
  document.getElementById("album-grid");

const albumTitle =
  document.getElementById("album-title");

const albumClose =
  document.getElementById("album-close");


// ===============================
// EVENTS
// ===============================

const events = [

  {
    name: "Independence Day",

    folder: "independence-day",

    cover: "photo1.jpeg",

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


// ===============================
// BASE URL
// ===============================

const BASE_URL =
  "https://bhargavschool.github.io/bhargav-high-school/";


function getPhotoURL(folder, filename) {

  return (
    BASE_URL +
    "images/events/" +
    folder +
    "/" +
    filename
  );

}


// ===============================
// CREATE EVENT CARD
// ===============================

function createEventAlbums() {

  if (!eventGallery) return;


  events.forEach(event => {

    const card =
      document.createElement("figure");

    card.className =
      "gallery-card event-album";


    const image =
      document.createElement("img");


    image.src =
      getPhotoURL(
        event.folder,
        event.cover
      );


    image.alt =
      event.name;


    image.loading = "lazy";


    image.onerror = function () {

      console.error(
        "Unable to load:",
        image.src
      );

      image.src =
        getPhotoURL(
          event.folder,
          event.photos[0]
        );

    };


    const caption =
      document.createElement("figcaption");


    caption.innerHTML = `

      <strong>
        ${event.name}
      </strong>

      <span>
        ${event.photos.length}
        Photos • Click to View Album
      </span>

    `;


    card.appendChild(image);

    card.appendChild(caption);


    card.addEventListener(
      "click",
      () => openAlbum(event)
    );


    eventGallery.appendChild(card);

  });

}


// ===============================
// OPEN ALBUM
// ===============================

function openAlbum(event) {

  if (
    !albumModal ||
    !albumGrid ||
    !albumTitle
  ) {

    console.error(
      "Album HTML elements are missing."
    );

    return;

  }


  albumTitle.textContent =
    event.name;


  albumGrid.innerHTML = "";


  event.photos.forEach(
    (photo, index) => {

      const image =
        document.createElement("img");


      image.src =
        getPhotoURL(
          event.folder,
          photo
        );


      image.alt =
        `${event.name} photo ${index + 1}`;


      image.loading = "lazy";


      image.onerror = function () {

        console.error(
          "Photo unavailable:",
          image.src
        );

      };


      albumGrid.appendChild(image);

    }
  );


  albumModal.classList.add(
    "active"
  );


  document.body.style.overflow =
    "hidden";

}


// ===============================
// CLOSE ALBUM
// ===============================

function closeAlbum() {

  if (!albumModal) return;


  albumModal.classList.remove(
    "active"
  );


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

    if (event.key === "Escape") {

      closeAlbum();

    }

  }
);


// ===============================
// START GALLERY
// ===============================

createEventAlbums();
