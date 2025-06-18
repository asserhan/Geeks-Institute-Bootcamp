
import './App.css';
import Car from './Components/Car';
import Garage from './Components/Garage';
import Events from './Components/Events';
import Phone from './Components/Phone';
import Color from './Components/Color';
function App() {
  const carinfo = {name: "Ford", model: "Mustang"};
  
  
  return (
    
    <div >
      <Car carinfo={carinfo} />
      <Garage size="big" />
      <Events />
      <Phone />
      <Color />

    </div>
    
  );
}

export default App;
