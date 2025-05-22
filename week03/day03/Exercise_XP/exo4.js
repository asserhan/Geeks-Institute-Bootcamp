const prompt = require('prompt-sync')()
const hotelCost=()=>{
    let numOfNights;
    while(true){
        numOfNights=prompt("Please tell us the number of nights you would like to stay in the hotel? ").trim();
        try{

            if(numOfNights==="")
                throw new Error("The input is empty, please try again.");
            if(isNaN(numOfNights))
                throw new Error("The input is not a number, please try again.");
            if(numOfNights<0)
                throw new Error("The input is a negative number, please try again.");
            numOfNights=parseInt(numOfNights,10);   
            break;
        }
        catch (error){
            console.log(error.message);
        }
    }
    return numOfNights*140;
}

const planeRideCost=()=>{
    let destination;
    while (1){
        destination=prompt("Please tell us the destination you would like to go? ").trim();
        try{
            if(destination==="")
                throw new Error("The input is empty, please try again.");
            if(!isNaN(destination))
                throw new Error("The input is a number, please try again.");
            break;
        }
        catch (error){
            console.log(error.message);
        }   
    }
    if(destination.toLowerCase()==="paris")
        return 220;
    else if(destination.toLowerCase()==="london")
        return 183;
    else
        return 300;
}

const rentalCarCost=()=>{
    let total =0
      let numOfDays;
    while(true){
        numOfDays=prompt("Please tell us the number of days you would like to rent the car ? ").trim();
        try{

            if(numOfDays==="")
                throw new Error("The input is empty, please try again.");
            if(isNaN(numOfDays))
                throw new Error("The input is not a number, please try again.");
            if(numOfDays<0)
                throw new Error("The input is a negative number, please try again.");
            numOfDays=parseInt(numOfDays,10);   
            break;
        }
        catch (error){
            console.log(error.message);
        }
    }
    total = numOfDays*40;
    if(numOfDays>10)
        total-=total*0.05;
    return total;
   

}
const totalVacationCost=()=>{

    let totalHotel = hotelCost()
    let RideCost=planeRideCost()
    let RentalCost=rentalCarCost()
    let total = totalHotel+RideCost+RentalCost
    return total;
    
}
let TotalVacation=totalVacationCost()
console.log(`the total cost of your vacation is ${TotalVacation}`)
