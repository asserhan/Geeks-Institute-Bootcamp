function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    let result = await resolveAfter2Seconds();
    console.log(result);
}

asyncCall();
//the output will be:
// calling
// resolved
// after 2 seconds delay
// This code demonstrates the use of async/await to handle asynchronous operations in JavaScript.
// The function resolveAfter2Seconds returns a promise that resolves after 2 seconds.
// The asyncCall function calls resolveAfter2Seconds and waits for it to resolve before logging the result.