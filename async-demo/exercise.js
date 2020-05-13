// Callback based approach
// Function: getCustomer.
// ID: 1.
// Object: customer.
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) { // if the object "customer" is Gold we get the top movies, on next line.
//       getTopMovies((movies) => {// callback function w/ argument of the top movies.
//         console.log('Top movies: ', movies); // console.log 'Top movies'.
//         sendEmail(customer.email, movies, () => {// then send an email to the customer w/ a list of the top movies.  Then a callback fundtion to console.log 'Email sent...'
//           console.log('Email sent...')
//         });
//       });
//     }
//   });

// Async and Await approach (for same code from above)
async function notifyCustomer() {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    if (customer.isGold) {
        const movies = await getTopMovies();
        console.log('Top movies: ', movies);
        await sendEmail(customer.email, movies);
        console.log('Email sent...');
    }
 }
notifyCustomer();


// modified the functions below to return a promise so can change above code to Async and Await approach.

// after a function returns a promise then we can "await" it.
  function getCustomer(id) {
      return new Promise((resolve, reject) => { // this function has two arguments, 1. resolve & 2. reject.  This function is the "executer".
        setTimeout(() => { // setTimeout is also function.
            resolve({ // "calling" resolve.  After resolving we are returning the values within id: 1.
              id: 1, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000); 
      });
    }
  
// Here we are not returning any values to the customer, we are simply resolving them.
  function getTopMovies() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);
      });    
  }
  
  // Here we are not returning any values to the customer, we are simply resolving them.
  function sendEmail(email, movies) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
          }, 4000);
      });   
  }