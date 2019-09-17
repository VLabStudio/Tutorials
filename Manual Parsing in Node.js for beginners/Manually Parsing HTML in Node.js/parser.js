// Import dependencies
const fs = require("fs");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");

// Get all the filenames from the customers folder
const files = fs.readdirSync("customers");

// All of the parse customers
let customers = [];

// For each file in the customers folder
for (const file of files) {

    // The parse customer
    let customer = {};

    // Get the HTML out of the file
    const html = fs.readFileSync(`customers/${file}`).toString();

    // Convert the HTML to a cheerio dom element
    const $ = cheerio.load(html);

    // Run HTML through table parser
    cheerioTableparser($);

    // Parse the table and turn it into an array
    let table = $("table").parsetable();

    // Check if it's format one or format two
    if (table[1][2].match(/\d+-\d+-\d+/) !== null) {

        // Add the data from the table to the customer object
        customer = {
            name: table[1][0],
            telephone: [table[1][1], table[1][2]],
            birthday: table[1][3],
            emailAddress: table[1][4],
            employment: table[1][5],
            vehicle: table[1][6],
            bank: table[1][7],
        }

    } else {

        // Add the data from the table to the customer object
        customer = {
            name: table[1][0],
            telephone: table[1][1],
            birthday: table[1][2],
            emailAddress: table[1][3],
            employment: table[1][4],
            vehicle: table[1][5],
            bank: table[1][6],
        }

    }

    // Add the customer to the customers array
    customers.push(customer);
}

// Save the extracted information to a json file
fs.writeFileSync("customers.json", JSON.stringify(customers));