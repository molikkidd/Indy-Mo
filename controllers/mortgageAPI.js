// import
const fetch = require('node-fetch');

fetch('https://api.spacexdata.com/v3/capsules')
.then(response => {
    console.log(response);
    return response.json();
})
.then(data => {
    console.log(data);
})

// Fetch is a built-in module on the browsers ( ie. Chrome, Safari )
// Fetch is a third party module ( aka dependency ) inside of Node; therefore,
// you will need to npm install node-fetch and import it


// What axios does is use fetch to grab the data, and return the data instead.

const myAxios = async (endpoint) => {
    let response  = await fetch(endpoint);
    let data = await response.json();
    return data;
}

myAxios('https://api.spacexdata.com/v3/capsules')
.then(data => {
    console.log(data);
})