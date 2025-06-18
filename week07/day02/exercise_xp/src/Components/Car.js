
import { useState } from 'react';


function Car({ carinfo }) {
    const [color, setColor] = useState('red');
  return (
    <div>
      <h1>This car is  {color} {carinfo.model}</h1>
    </div>
  );
}
export default Car;
