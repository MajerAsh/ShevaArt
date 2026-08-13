const filterButtons = document.querySelectorAll(".filters button");
const tiles = document.querySelectorAll(".tile");

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
