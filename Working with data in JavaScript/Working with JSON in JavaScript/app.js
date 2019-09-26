// Import dependencies
const fs = require("fs");

// Load the config
const config = require("./config.json");

// Show the config
console.log(config);

// Modify the config
config.apiKey = "gj3j#4K321hIO"; // 2i3f2399g23y43q9o

// Saved the config
fs.writeFile("./config.json", JSON.stringify(config), function (err, file) {
    if (err) throw err;
    console.log("Saved!");
});