// Import dependencies
const fs = require("fs");
const XLSX = require("xlsx");
const jsontoxml = require("jsontoxml");

// Read the file into memory
// const workbook = XLSX.read(fs.readFileSync("file-example.xlsx"));
const workbook = XLSX.readFile("file-example.xlsx");

// Convert the XLSX to JSON
let worksheets = {};
for (const sheetName of workbook.SheetNames) {
    // Some helper functions in XLSX.utils generate different views of the sheets:
    //     XLSX.utils.sheet_to_csv generates CSV
    //     XLSX.utils.sheet_to_txt generates UTF16 Formatted Text
    //     XLSX.utils.sheet_to_html generates HTML
    //     XLSX.utils.sheet_to_json generates an array of objects
    //     XLSX.utils.sheet_to_formulae generates a list of formulae
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

// Show the data as JSON
console.log("json:\n", JSON.stringify(worksheets.Sheet1), "\n\n");

// Show the data as XML
console.log("xml:\n", jsontoxml({
    worksheets: JSON.parse(JSON.stringify(Object.values(worksheets))).map(worksheet => worksheet.map(data => {
        for (property in data) {
            const newPropertyName = property.replace(/\s/g, "");
            if (property !== newPropertyName) {
                Object.defineProperty(data, newPropertyName,
                    Object.getOwnPropertyDescriptor(data, property));
                delete data[property];
            }
        }
        return data;
    }))
}, {}), "\n\n");

// Modify the XLSX
worksheets.Sheet1.push({
    "First Name": "Bob",
    "Last Name": "Bob",
    "Gender": "Male",
    "Country": "United States",
    "Age": 35,
    "Date": "22/09/2020",
    "Id": 1600,
    "New Column": "test"
});

// // Update the XLSX file
// XLSX.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1)
// XLSX.writeFile(workbook, "file-example.xlsx");

// Create a new XLSX file
const newBook = XLSX.utils.book_new();
const newSheet = XLSX.utils.json_to_sheet(worksheets.Sheet1);
XLSX.utils.book_append_sheet(newBook, newSheet, "Sheet1");
XLSX.writeFile(newBook,"new-book.xlsx");