import React, { useState } from 'react';
function Events() {
    const [isToggleOn, setIsToggleOn] = useState(true);

 const clickMe = () =>{
    alert('I was clicked');
  }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            alert(`You pressed the Enter key! your input is: ${event.target.value}`);
        }
    };
  return (
    <div>
      <button onClick={clickMe}>Click Me</button>
        <input type="text" onKeyDown={handleKeyDown} placeholder="press the ENTER key !" />
        <button onClick={() => setIsToggleOn(!isToggleOn)}>
            {isToggleOn ? 'ON' : 'OFF'}
        </button>

    </div>
  );
 }

export default Events;