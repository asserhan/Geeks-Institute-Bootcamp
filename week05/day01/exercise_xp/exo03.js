

function resolveWithThree() {
    return Promise.resolve(3);
}
function rejectWithBoo() {
    return Promise.reject("Boo!");
}

resolveWithThree()
  .then(result => console.log(result)) 
  .catch(error => console.log(error));

rejectWithBoo()
  .then(result => console.log(result))
  .catch(error => console.log(error)); 