// Import dependencies
const request = require("request");

// Get the data from jsonplaceholder
request("https://jsonplaceholder.typicode.com/users", (error, response, body) => {

    // Print out a table with all of the users
    console.table(JSON.parse(body), ["name", "username", "email", "username", "address", "phone", "website"]);

});