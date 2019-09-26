// Import dependencies
const fs = require("fs");
const PDFParser = require("pdf2json");

// Get all the filenames from the patients folder
const files = fs.readdirSync("patients");

// All of the parse patients
let patients = [];

// Make a IIFE so we can run asynchronous code
(async () => {

    // Await all of the patients to be passed
    // For each file in the patients folder
    await Promise.all(files.map(async (file) => {

        // Set up the pdf parser
        let pdfParser = new PDFParser(this, 1);

        // Load the pdf document
        pdfParser.loadPDF(`patients/${file}`);

        // Parsed the patient
        let patient = await new Promise(async (resolve, reject) => {

            // On data ready
            pdfParser.on("pdfParser_dataReady", (pdfData) => {

                // The raw PDF data in text form
                const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");

                // Return the parsed data
                resolve({
                    name: /Name\s(.*?)Address/i.exec(raw)[1].trim(),
                    address: /Address\s(.*?)Phone/i.exec(raw)[1].trim(),
                    phone: /Phone\s(.*?)Birthday/i.exec(raw)[1].trim(),
                    birthday: /Birthday\s(.*?)Email\sAddress/i.exec(raw)[1].trim(),
                    emailAddress: /Email\sAddress\s(.*?)Blood\stype/i.exec(raw)[1].trim(),
                    bloodType: /Blood\stype\s(.*?)Height/i.exec(raw)[1].trim(),
                    height: /Height\s(.*?)Weight/i.exec(raw)[1].trim(),
                    weight: /Weight\s(.*?)--/i.exec(raw)[1].trim()
                });

            });

        });

        // Add the patient to the patients array
        patients.push(patient);

    }));

    // Save the extracted information to a json file
    fs.writeFileSync("patients.json", JSON.stringify(patients));

})();  