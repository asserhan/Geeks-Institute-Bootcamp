const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 
const shoppingList=["banana","orange","apple"]

function myBill(){
    let total=0
    for (i=0;i<shoppingList.length;i++){
        if(shoppingList[i] in stock && stock[shoppingList[i]]>0){
            total+=prices[shoppingList[i]]
            stock[shoppingList[i]]--;
        }
    }
    return total;
}
let total_price=myBill()
console.log(total_price)
console.log(stock["banana"])
console.log(stock["orange"])
