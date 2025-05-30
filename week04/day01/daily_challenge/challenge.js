let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}

const displayGroceries = () => {
    groceries.fruits.forEach(fruit => console.log(fruit));
};

const cloneGroceries = () => {
    let user = client;
    client = "Betty";
    console.log("User:", user); // Still "John" because strings are copied by value

    // Object: Passed by reference
    let shopping = groceries;
    shopping.totalPrice = "35$";
    console.log("groceries.totalPrice:", groceries.totalPrice); // Will be "35$ because objects are passed by reference
    shopping.other.paid = false;
    console.log("groceries.other.paid:", groceries.other.paid); // Will be false because objects are passed by reference
};


displayGroceries();
cloneGroceries();
