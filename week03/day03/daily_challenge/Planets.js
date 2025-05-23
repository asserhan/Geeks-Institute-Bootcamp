
// const planets = [
//   "Mercury",
//   "Venus",
//   "Earth",
//   "Mars",
//   "Jupiter",
//   "Saturn",
//   "Uranus",
//   "Neptune"
// ];
const colors = [
  "#a9a9a9", "#f5deb3", "#00bfff", "#ff4500",
  "#d2691e", "#daa520", "#7fffd4", "#4169e1"
];

// const section = document.querySelector(".listPlanets");
// planets.forEach((planet,index)=>{
//     const divElement = document.createElement("div");
//     divElement.classList.add("planet");
//     divElement.style.backgroundColor = colors[index];
//     divElement.innerText = planet;
//     divElement.style.color = "black";
//     section.appendChild(divElement);

// })

//bonus

const solarSystem = [
  { name: "Mercury", moons: 0 },
  { name: "Venus", moons: 0 },
  { name: "Earth", moons: 1 },
  { name: "Mars", moons: 2 },
  { name: "Jupiter", moons: 79 },
  { name: "Saturn", moons: 83 },
  { name: "Uranus", moons: 27 },
  { name: "Neptune", moons: 14 }
];
const section2 = document.querySelector(".listPlanets");

solarSystem.forEach((planetObj, index) => {
  const planetDiv = document.createElement("div");
  planetDiv.classList.add("planet", `planet${index + 1}`);
  planetDiv.textContent = planetObj.name;
  planetDiv.style.backgroundColor = colors[index];
  section2.appendChild(planetDiv);
 
  for (let i = 0; i < planetObj.moons; i++) {
    const moonDiv = document.createElement("div");
    moonDiv.classList.add("moon");
    moonDiv.style.left = `${20 + i * 15}px`; 
    planetDiv.appendChild(moonDiv);
  }
});
