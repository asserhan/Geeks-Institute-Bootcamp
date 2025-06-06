const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

console.log(building.numberOfFloors)
console.log(building.numberOfAptByFloor.firstFloor)
console.log(building.numberOfAptByFloor.thirdFloor)
console.log(`the second tenant is ${building.nameOfTenants[0]} and she has ${building.numberOfRoomsAndRent.sarah[0]} rooms in her appartment`)

if(building.numberOfRoomsAndRent.david[1] + building.numberOfRoomsAndRent.sarah[1] > building.numberOfRoomsAndRent.dan[1]){
    
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log(building.numberOfRoomsAndRent.dan[1])
}