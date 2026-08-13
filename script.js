const buttons = document.querySelectorAll(".filters button");
const tiles = document.querySelectorAll(".tile");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    tiles.forEach((t) => {
      t.style.display = f === "all" || t.dataset.cat === f ? "" : "none";
    });
  });
});


document.querySelectorAll(".tile-art").forEach((tileArt) => {
  const scroller = tileArt.querySelector(".tile-scroll");
  const prevBtn = tileArt.querySelector(".prev");
  const nextBtn = tileArt.querySelector(".next");

  if (!scroller || !prevBtn || !nextBtn) return;

  nextBtn.addEventListener("click", () => {
    scroller.scrollBy({ left: scroller.clientWidth, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    scroller.scrollBy({ left: -scroller.clientWidth, behavior: "smooth" });
  });
});