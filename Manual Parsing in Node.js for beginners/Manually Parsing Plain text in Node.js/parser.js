// Import dependencies
const fs = require("fs");

// Read the text file and split it on new lines
const lines = fs.readFileSync("users.txt").toString().split("\r\n");

// All of the parse users
let users = [];

// For each user in text file
for (let index = 0; index < lines.length; index+=6) {

    // Extract the user information out of the text file
    users.push({
        fullName: lines[index],
        address: lines[index + 1] + lines[index + 2],
        phone: lines[index + 3],
        emailAddress: lines[index + 4]
    });

}

// Save the extracted information to a json file
fs.writeFileSync("users.json",JSON.stringify(users));