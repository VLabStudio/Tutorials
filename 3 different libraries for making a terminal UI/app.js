// Import dependencies - https://www.npmjs.com/package/ora
const ora = require("ora");

const spinner = ora("Loading unicorns").start();
spinner.color = "green"; // "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray"

setTimeout(() => {
    spinner.succeed();
}, 1000);



// Import dependencies - https://www.npmjs.com/package/boxen
const boxen = require("boxen");

console.log(boxen("unicorn", { padding: 1 }));
console.log(boxen("unicorn", { padding: 1, margin: 1, borderStyle: "double" }));



// Import dependencies - https://www.npmjs.com/package/easy-table
const Table = require("easy-table");

const products = [
    { id: 123123, desc: "Something awesome", price: 1000.00 },
    { id: 245452, desc: "Very interesting book", price: 11.45 },
    { id: 232323, desc: "Yet another product", price: 555.55 }
]

const table = new Table();

for (const product of products) {
    table.cell("Product Id", product.id);
    table.cell("Description", product.desc);
    table.cell("Price, USD", product.price, Table.number(2));
    table.newRow();
}

console.log(table.toString());
console.log(table.printTransposed());
console.log(table.print());