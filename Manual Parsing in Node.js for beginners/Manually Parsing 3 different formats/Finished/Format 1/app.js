// Import dependencies
const fs = require("fs");
const moment = require("moment");
const languageCodeTable = require("./language-code-table.json");

// Load the data 
const lines = fs.readFileSync("data.txt").toString().split(/\r\n/);

// All of the outputs
const outputs = [];

// For each line
for (const line of lines) {

    // The result
    let output = {};

    // Load the data and parse it
    const data = parse(line);

    // Set id to id
    output.id = data.id

    // Calculate the quality level
    const quality = parseFloat(data.qu);
    if (quality >= 0 && quality <= 100) {
        output.quality = "low";
    } else if (quality > 100 && quality <= 200) {
        output.quality = "medium";
    } else if (quality > 200 && quality <= 300) {
        output.quality = "high";
    }

    // Convert the timestamp to the day month and year
    output.timestamp = moment(Date.now()).format("ddd MMM YYYY");

    // Convert the language code to the full country name
    output.language = languageCodeTable[data.la];

    // Add the output to outputs
    outputs.push(output);

}

// Saved the output
fs.writeFileSync("data.json", JSON.stringify(outputs), function (err, file) {
    if (err) throw err;
    console.log("Saved!");
});

function parse(data) {

    // The final result
    let output = {};

    // Convert the string into key-value pairs
    const keyValuePairs = data.split("&");

    // Convert the key-value pairs into JavaScript key-value pairs

    // For each key-value pair
    for (const keyValuePair of keyValuePairs) {

        // Split the key-value pair into an array
        const keyAndValue = keyValuePair.split("=");

        // Make a new property on the return object name it the key and set it to the value
        output[keyAndValue[0]] = keyAndValue[1];
    }

    // Return the output
    return output;

}