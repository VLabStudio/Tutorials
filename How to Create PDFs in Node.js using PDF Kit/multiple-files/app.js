// Import dependencies
const fs = require("fs");
const PDFDocument = require("./pdfkit-tables");

// Load the patients 
const patients = require("./patients.json");

for (const patient of patients) {

    // Create The PDF document
    const doc = new PDFDocument();

    // Pipe the PDF into a patient file
    doc.pipe(fs.createWriteStream(`patients/${patient.name}.pdf`));

    // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
    doc
        .image("logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("Patient Information.", 110, 57)
        .fontSize(10)
        .text("725 Fowler Avenue", 200, 65, { align: "right" })
        .text("Chamblee, GA 30341", 200, 80, { align: "right" })
        .moveDown();

    // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
    const table = {
        headers: ["Name", "Address", "Phone", "Birthday", "Email Address", "Blood Type", "Height", "Weight"],
        rows: [
            [patient.name, patient.address, patient.phone, patient.birthday, patient.emailAddress, patient.bloodType, patient.height, patient.weight]
        ]
    };

    // Draw the table
    doc.moveDown().table(table, 10, 125, { width: 590 });

    // Finalize the PDF and end the stream
    doc.end();

}