const grid = document.getElementById("grid");
const colors = document.querySelectorAll(".color");
const clearBtn = document.getElementById("clear");

let selectedColor = "red"; 
let isDrawing = false;


colors.forEach(color => {
  color.addEventListener("click", () => {
    colors.forEach(c => c.classList.remove("selected"));
    color.classList.add("selected");
    selectedColor = color.style.backgroundColor;
  });
});


for (let i = 0; i < 400; i++) {
  const square = document.createElement("div");
  square.className = "square";

  square.addEventListener("mousedown", () => {
    isDrawing = true;
    square.style.backgroundColor = selectedColor;
  });

  square.addEventListener("mouseover", () => {
    if (isDrawing) {
      square.style.backgroundColor = selectedColor;
    }
  });

  grid.appendChild(square);
}

document.addEventListener("mouseup", () => {
  isDrawing = false;
});

clearBtn.addEventListener("click", () => {
  document.querySelectorAll(".square").forEach(square => {
    square.style.backgroundColor = "white";
  });
});
