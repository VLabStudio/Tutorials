// Import dependencies
const fs = require("fs");
const csv = require("csvtojson");
const { Parser } = require("json2csv");

(async () => {

    // Load the cars
    const cars = await csv().fromFile("cars.csv");

    // Show the cars
    console.log(cars);

    // Modify the cars
    cars[0].Year = 1998;

    // Saved the cars
    const carsInCsv = new Parser({ fields: ["Year", "Make", "Model", "Length"] }).parse(cars);
    fs.writeFileSync("cars.csv", carsInCsv);

})();
