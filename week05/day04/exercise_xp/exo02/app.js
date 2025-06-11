// Import the array of people from data.js using ES6 import
import people from './data.js';


function calculateAverageAge() {
    const totalAge = people.reduce((sum, person) => sum + person.age, 0);
    const averageAge = totalAge / people.length;
    
    console.log("People Data:");
    people.forEach(person => {
        console.log(`${person.name}, ${person.age}, ${person.location}`);
    });
    
    console.log("\nCalculating average age...");
    console.log(`Total people: ${people.length}`);
    console.log(`Combined age: ${totalAge} years`);
    console.log(`Average age: ${averageAge.toFixed(1)} years`);
}


calculateAverageAge();