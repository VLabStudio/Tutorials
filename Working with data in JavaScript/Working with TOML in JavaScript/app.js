// Import dependencies
const fs = require("fs");
const toml = require("toml");

// Read a toml file
const data = toml.parse(fs.readFileSync("config.toml"));
console.dir(data);

// Make a toml file
const title = "Cars";
const cars = ["BMW", "Audi", "Tesla"];
fs.writeFileSync("test.toml", `
    title = "${title}"
    cars = ${JSON.stringify(cars)}
`);
