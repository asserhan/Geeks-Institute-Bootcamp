const _ = require('lodash');
const math = require('./math');

const numbers = [1, 2, 3, 4, 5];

const sum = _.sum(numbers);
const product = math.multiply(10, 5);
const added = math.add(10, 20);

console.log('Sum of array:', sum);
console.log('Product of 10 and 5:', product);
console.log('Sum of 10 and 20:', added);