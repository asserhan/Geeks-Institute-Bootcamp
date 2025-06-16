import React from "react";
import UserFavoriteAnimals from "./UserFavoriteAnimals";
import Exercise from "./Exercise3";
function App() {
  const myelement = <h1> Hello World! </h1>;
  const sum = 5 + 5;
  const user = {
    firstName: 'Bob',
    lastName: 'Dylan',
    favAnimals : ['Horse','Turtle','Elephant','Monkey']
  };
  return (
    <div>
      <p> Hello World! </p>
      {myelement}
      <p>React is {sum} times better with JSX</p>
      <h3>My name first name is {user.firstName} </h3>
      <h3>My name last name is {user.lastName} </h3>
      <UserFavoriteAnimals favAnimals={user.favAnimals} />
      <Exercise />
    </div>
  );
}
export default App;
