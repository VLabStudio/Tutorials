// Import dependencies
const axios = require("axios");

// Get the data from jsonplaceholder
axios.get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {

        // Print out a table with all of the users
        console.table(response.data, ["name", "username", "email", "username", "address", "phone", "website"]);

    })
    .catch(function (error) {
        console.log(error);
    });  