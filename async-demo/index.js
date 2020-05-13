console.log('Before');

getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repos[0], (commits) => {
            console.log(commits);
        })
    })
});

// Promise-based approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message));

// Async and Await approach -helps you write asynchronous code that looks and reads like synchronous code.  Still runs asynchronously.  They are built on top of promises.
// When using Async and Await approach we use a "try catch" block to catch errors.
// Meaning we are trying to execute these blocks and if anything goes wrong then the catch block is executed.
async function displayCommits() {
    try {
        const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
    }
    catch(err) {
        console.log('Error, err.message')
    }   
}
displayCommits()

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from the datbase...');
            resolve({ id: id, gitHubUsername: 'josephfleckenstein'});
        }, 2000);
    });  
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    })
   }

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github API...');
            resolve(['commit']);
        }, 2000);
    });
}