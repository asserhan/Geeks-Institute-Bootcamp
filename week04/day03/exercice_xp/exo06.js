/////////// 1   ///////////

// [2] === [2] 
// {} === {}
//This condition will always return 'false' since JavaScript compares objects by reference, not value.

/////////// 2   ///////////
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;
console.log(object2.number) //4
console.log(object3.number) //4
console.log(object4.number)// 5
// object1, object2, and object3 refer to the same object in memory, so changing object1 affects object2 and object3.
// object4 is a different object with its own memory reference, so it remains unchanged.




/////////// 3   ///////////

//Create a class Animal with the attributes name, type and color. The type is the animal type, for example: dog, cat, dolphin etc 


class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
    }

class Mammal extends Animal{
    sound(sound) {
        //Moooo I'm a cow, named Lily and I'm brown and white
        return `${sound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;

    }
}
const farmerCow= new Mammal("Lily", "cow", "brown and white");
console.log(farmerCow.sound("Moo")); 