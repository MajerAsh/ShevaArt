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
