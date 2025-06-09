


// Promise.all takes an array of promises and returns a single Promise that resolves when all of the promises in the array have resolved.
// If any of the promises are rejected, the returned Promise will be rejected with the reason of the first promise that was rejected.
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});
// expected output: Array [3, 42, "foo"]
Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); 
  })
  .catch(error => {
    console.error('One of the promises was rejected:', error);
  });
