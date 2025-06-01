const marioGame = {
  detail : "An amazing game!",
  characters : {
      mario : {
        description:"Small and jumpy. Likes princesses.",
        height: 10,
        weight: 3,
        speed: 12,
      },
      bowser : {
        description: "Big and green, Hates princesses.",
        height: 16,
        weight: 6,
        speed: 4,
      },
      princessPeach : {
        description: "Beautiful princess.",
        height: 12,
        weight: 2,
        speed: 2,
      }
  },
}
const jsonString = JSON.stringify(marioGame, null, 2);
debugger;
console.log(jsonString);

// Nested objects are converted to nested JSON objects —
// maintaining the hierarchy. JSON supports nested structures,
// so characters remains an object containing keys like mario, bowser, and princessPeach, each of which is also an object.