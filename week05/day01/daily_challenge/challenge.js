
function makeAllCaps(arr) {
    return new Promise((resolve,reject) => {
        if(arr.every(item=> typeof item ==='string')) {
            resolve(arr.map(item => item.toUpperCase()));
        }
        else {
            reject("Not all items in the array are strings");
        }

    }
    );
}

function sortWords(arr){
    return new Promise((resolve,reject)=>{
        if(arr.length > 4) {
            resolve(arr.sort());
        }
        else {
            reject("The array length is not bigger than 4");
        }
    });
}
//in this example, the catch method is executed
makeAllCaps([1, "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

//in this example, the catch method is executed
makeAllCaps(["apple", "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

//in this example, you should see in the console, 
// the array of words uppercased and sorted
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result)) //["APPLE","BANANA", "KIWI", "MELON", "PEAR"]
      .catch(error => console.log(error))