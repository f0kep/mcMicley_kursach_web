const colorBtn = document.getElementById("colorBtn");
let isBlack = false;

colorBtn.addEventListener("click", () => {
  if (isBlack) {
    document.body.style.backgroundColor = "white";
  } else {
    document.body.style.backgroundColor = "black";
  }
  isBlack = !isBlack;
});
