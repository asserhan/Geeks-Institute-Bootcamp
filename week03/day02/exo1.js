// 1
const people = ["Greg", "Mary", "Devon", "James"];
people.splice(0,1)
console.log(people)
//2
people.splice(3,1,"Jason")
console.log(people)
//3
people.push("Hanane")
console.log(people)
//4
console.log(people.indexOf("Mary"))
//5
copy=people.slice(1,4)
console.log(copy)
//6
console.log(people.indexOf("Foo")) //because does not exist in our array
//7
let last=people[people.length - 1]
console.log(last)

