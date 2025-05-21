const prompt = require("prompt-sync")();
let num = prompt("Input a number: ");
while (num < 10){
    num=prompt("Input a number: ")
}
console.log(typeof(num))