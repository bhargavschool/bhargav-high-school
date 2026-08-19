// =====================================================
// BHARGAV HIGH SCHOOL
// COMPLETE SCRIPT.JS
// =====================================================


// =====================================================
// MOBILE MENU
// =====================================================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");


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



// =====================================================
// GALLERY ELEMENTS
// =====================================================

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



// =====================================================
// WEBSITE BASE URL
// =====================================================

const BASE_URL =
  "https://bhargavschool.github.io/bhargav-high-school/";



// =====================================================
// EVENT ALBUMS
// =====================================================

const events = [


  // ===================================================
  // INDEPENDENCE DAY
  // ===================================================

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

  },


  // ===================================================
  // STUDENT CABINET
  // ===================================================

  {
    name: "Student Cabinet",

    folder: "",

    cover: "student-cabinet.jpeg",

    photos: [

      "student-cabinet.jpeg"

    ]

  }

];



// =====================================================
// CREATE PHOTO URL
// =====================================================

function getPhotoURL(folder, filename) {

  if (folder && folder.trim() !== "") {

    return (
      BASE_URL +
      "images/events/" +
      folder +
      "/" +
      filename
    );

  }


  return (
    BASE_URL +
    "images/events/" +
    filename
  );

}



// =====================================================
// CREATE EVENT CARDS
// =====================================================

function createEventAlbums() {

  if (!eventGallery) {

    console.error(
      "Gallery container #event-gallery was not found."
    );

    return;

  }


  eventGallery.innerHTML = "";


  events.forEach(event => {


    // -----------------------------------------------
    // CARD
    // -----------------------------------------------

    const card =
      document.createElement("figure");

    card.className =
      "gallery-card event-album";


    // -----------------------------------------------
    // COVER IMAGE
    // -----------------------------------------------

    const image =
      document.createElement("img");


    image.src =
      getPhotoURL(
        event.folder,
        event.cover
      );


    image.alt =
      event.name;


    image.loading =
      "eager";


    image.onerror = function () {

      console.error(
        "Image failed to load:",
        image.src
      );

    };


    // -----------------------------------------------
    // CAPTION
    // -----------------------------------------------

    const caption =
      document.createElement("figcaption");


    const title =
      document.createElement("strong");


    title.textContent =
      event.name;


    const subtitle =
      document.createElement("span");


    subtitle.textContent =
      event.photos.length +
      " Photo" +
      (event.photos.length === 1 ? "" : "s") +
      " • Click to View Album";


    caption.appendChild(title);

    caption.appendChild(subtitle);


    // -----------------------------------------------
    // ADD TO CARD
    // -----------------------------------------------

    card.appendChild(image);

    card.appendChild(caption);


    // -----------------------------------------------
    // CLICK
    // -----------------------------------------------

    card.addEventListener(
      "click",
      () => {

        openAlbum(event);

      }
    );


    // -----------------------------------------------
    // ADD CARD TO GALLERY
    // -----------------------------------------------

    eventGallery.appendChild(card);

  });

}



// =====================================================
// OPEN ALBUM
// =====================================================

function openAlbum(event) {

  if (
    !albumModal ||
    !albumGrid ||
    !albumTitle
  ) {

    console.error(
      "Album popup elements are missing from index.html."
    );

    return;

  }


  // -----------------------------------------------
  // TITLE
  // -----------------------------------------------

  albumTitle.textContent =
    event.name;


  // -----------------------------------------------
  // CLEAR OLD PHOTOS
  // -----------------------------------------------

  albumGrid.innerHTML = "";


  // -----------------------------------------------
  // ADD PHOTOS
  // -----------------------------------------------

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
        event.name +
        " photo " +
        (index + 1);


      image.loading =
        "lazy";


      image.onerror = function () {

        console.error(
          "Album image failed to load:",
          image.src
        );

      };


      albumGrid.appendChild(
        image
      );

    }
  );


  // -----------------------------------------------
  // SHOW MODAL
  // -----------------------------------------------

  albumModal.classList.add(
    "active"
  );


  albumModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}



// =====================================================
// CLOSE ALBUM
// =====================================================

function closeAlbum() {

  if (!albumModal) return;


  albumModal.classList.remove(
    "active"
  );


  albumModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}



// =====================================================
// CLOSE BUTTON
// =====================================================

if (albumClose) {

  albumClose.addEventListener(
    "click",
    closeAlbum
  );

}



// =====================================================
// CLOSE BY CLICKING OUTSIDE
// =====================================================

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



// =====================================================
// CLOSE WITH ESC KEY
// =====================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      albumModal &&
      albumModal.classList.contains("active")
    ) {

      closeAlbum();

    }

  }
);



// =====================================================
// START GALLERY
// =====================================================

createEventAlbums();
