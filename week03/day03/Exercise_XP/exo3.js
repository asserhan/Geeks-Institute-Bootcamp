function changeEnough(itemPrice, amountOfChange) {
    let totle_amount=amountOfChange[0]*0.25 + amountOfChange[1]*0.10+amountOfChange[2]*0.05+amountOfChange[3]*0.01
    if(totle_amount>=itemPrice)
        return true;
    else
        return false;
}

console.log(changeEnough(14.11, [2,100,0,0]))
console.log(changeEnough(0.75, [0,0,20,5]) )
console.log(changeEnough(4.25, [25, 20, 5, 0]) )