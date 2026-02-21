const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Set initial grid positions
cubes.forEach((cube, index) => {
  const cols = 4;
  const spacing = 100;

  const col = index % cols;
  const row = Math.floor(index / cols);

  cube.style.left = (col * spacing + 10) + "px";
  cube.style.top = (row * spacing + 10) + "px";

  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activeCube) return;

  const rect = container.getBoundingClientRect();

  let newX = e.clientX - rect.left - offsetX;
  let newY = e.clientY - rect.top - offsetY;

  // Boundary restriction
  const maxX = container.clientWidth - activeCube.clientWidth;
  const maxY = container.clientHeight - activeCube.clientHeight;

  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX > maxX) newX = maxX;
  if (newY > maxY) newY = maxY;

  activeCube.style.left = newX + "px";
  activeCube.style.top = newY + "px";
});

document.addEventListener("mouseup", () => {
  activeCube = null;
});