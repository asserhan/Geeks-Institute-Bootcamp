import { useEffect, useState } from "react";


function Color() {
    // Note: The return is called when a component gets updated. It re-renders the DOM, with the new changes.
// Create a button that when clicked on, calls a function that changes the value of the favoriteColor property to “blue”.
    const [favoriteColor, setFavoriteColor] = useState("red");
    useEffect(() => {
        alert (`useEffect reached`);
    },[]);
    const changeColor = () => {
        setFavoriteColor("blue");
    }
    return (
        <div>
            <h1>My favorite color is {favoriteColor}</h1>
            <button onClick={changeColor}>Change Color</button>
            <h2>My favorite color is {favoriteColor}</h2>
  
        </div>
    );
    

}
export default Color;