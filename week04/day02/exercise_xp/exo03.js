// ------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
// Output: ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange'] 
// The spread operator (...) is used to unpack elements from the arrays vegetables and fruits into the new array result.
// ------2------
const country = "USA";
console.log([...country]);
// Output: ['U', 'S', 'A']
// The spread operator (...) is used to unpack the characters of the string country into an array.

// ------Bonus------
let newArray = [...[,,]];
console.log(newArray);
// Output: [undefined, undefined, undefined]
// The spread operator (...) is used to unpack the elements of an array with empty slots, resulting in an array with undefined values.