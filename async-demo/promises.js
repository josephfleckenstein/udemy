// A promise is an object that holds the eventual result of an asynchronous operation
const p = new Promise((resolve, reject) => {
    
    setTimeout(() => {
        resolve(1); // pending => promise is resolved, fulfilled.
        reject(new Error('message')); // pending => promise is rejected.
    }, 2000);   
});

// Consuming the above promise.
p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));