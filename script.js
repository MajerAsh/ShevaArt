const filterButtons = document.querySelectorAll(".filters button");
const tiles = document.querySelectorAll(".tile");
// ---------- lightbox-------
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector(".lb-img");
const prevBtn = lightbox.querySelector(".lb-prev");
const nextBtn = lightbox.querySelector(".lb-next");

let photos = []; // images in the tile that was clicked
let index = 0;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Reset all buttons, then mark only the clicked one as active
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const activeFilter = button.dataset.filter;

    tiles.forEach((tile) => {
      // A tile can belong to multiple categories, e.g. data-cat="mural lettering"
      const tileCategories = tile.dataset.cat.split(" ");
      const isMatch =
        activeFilter === "all" || tileCategories.includes(activeFilter);
      tile.style.display = isMatch ? "" : "none";
    });
  });
});

document.querySelectorAll(".tile-art").forEach((tileArt) => {
  const scroller = tileArt.querySelector(".tile-scroll");
  const prevButton = tileArt.querySelector(".prev");
  const nextButton = tileArt.querySelector(".next");

  if (!scroller || !prevButton || !nextButton) return;

  nextButton.addEventListener("click", () => {
    scroller.scrollBy({ left: scroller.clientWidth, behavior: "smooth" });
  });

  prevButton.addEventListener("click", () => {
    scroller.scrollBy({ left: -scroller.clientWidth, behavior: "smooth" });
  });
});

// ---------- lightbox-------

function show() {
  const img = photos[index];
  lbImg.src = img.currentSrc || img.src;
  lbImg.alt = img.alt;
  const multiple = photos.length > 1;
  prevBtn.style.display = nextBtn.style.display = multiple ? "" : "none";
}

function openLightbox() {
  show();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden"; // stop page scrolling behind it
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function step(dir) {
  index = (index + dir + photos.length) % photos.length;
  show();
}

// One listener on the grid handles every tile, including ones added later
document.getElementById("grid").addEventListener("click", (e) => {
  const img = e.target.closest(".tile-scroll img");
  if (!img) return;
  photos = [...img.parentElement.querySelectorAll("img")];
  index = photos.indexOf(img);
  openLightbox();
});

// Close: backdrop click, image click, or the × button
lightbox.addEventListener("click", (e) => {
  if (e.target.closest(".lb-nav")) return;
  closeLightbox();
});

prevBtn.addEventListener("click", () => step(-1));
nextBtn.addEventListener("click", () => step(1));

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});
