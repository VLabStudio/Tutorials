// Import dependencies
const fs = require("fs");

// Load the lookup tables
const lookupTables = require("./lookup-table.json");

// Load the data 
const lines = fs.readFileSync("data.txt").toString().split(/\r\n/);

// All of the outputs
const outputs = [];

// For each line
for (const line of lines) {

    // The result
    let output = {};

    // Parse the line
    const chunks = line.split(/\s/);

    // Used the lookup table to map the values
    output.colour = lookupTables.colours[chunks[0]];
    output.brands = lookupTables.brands[chunks[2]];
    output.fuelType = lookupTables.fuelTypes[chunks[3]];
    output.transmissions = lookupTables.transmissions[chunks[4]];

    // Add the output to outputs
    outputs.push(output);
}

// Saved the output
fs.writeFileSync("data.json", JSON.stringify(outputs), function (err, file) {
    if (err) throw err;
    console.log("Saved!");
});