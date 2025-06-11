
const products = require('./products.js');


function findProduct(productName) {
    const foundProduct = products.find(product => product.name === productName);
    
    if (foundProduct) {
        console.log("Product found:");
        console.log(`Name: ${foundProduct.name}`);
        console.log(`Price: $${foundProduct.price}`);
        console.log(`Category: ${foundProduct.category}`);
    } else {
        console.log(`Product "${productName}" not found.`);
    }
    console.log("--------------------------");
}


findProduct("Laptop");
findProduct("Jeans");
findProduct("Smartphone");
findProduct("Toaster"); 
findProduct("Coffee Mug");