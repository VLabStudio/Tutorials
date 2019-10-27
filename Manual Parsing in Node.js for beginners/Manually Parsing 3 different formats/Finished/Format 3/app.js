// Import dependencies
const fs = require("fs");

// Load the data 
const lines = fs.readFileSync("data.txt").toString().split(/\r\n/);

// All of the logs
const logs = [];

// For each line
for (const line of lines) {

    // The result
    let log = {};

    // Parse the line
    const temp = /(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH)?(.*)/.exec(line);

    // Set the properties
    log.method = temp[1];
    log.message = temp[2];

    // Add the log to logs
    logs.push(log);
}

// Saved the logs
fs.writeFileSync("data.json", JSON.stringify(logs), function (err, file) {
    if (err) throw err;
    console.log("Saved!");
});