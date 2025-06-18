import {useState} from 'react';
// brand: "Samsung"
// model: "Galaxy S20"
// color: "black"
// year: 2020

function Phone() {
    const [brand, setBrand] = useState('Samsung');
    const [model, setModel] = useState('Galaxy S20');
    const [color, setColor] = useState('black');
    const [year, setYear] = useState(2020);
    const changeColor =() => {
        setColor('blue');
    }

    return (
        <div>
            <h1>My phone is a {brand}</h1>
            <p> its a {color} {model} from {year}</p>
            <button onClick={changeColor}>Change Color</button>
        </div>
    );

}
export default Phone;