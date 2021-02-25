// Import dependencies
const moment = require("moment");
const PDFDocument = require("pdfkit");
const express = require("express");

// Setup Express
const app = express();
const port = 80;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.post("/", (req, res) => {

    // Create the PDF document
    const doc = new PDFDocument({
        layout: "landscape",
        size: "A4",
    });

    // The name
    const name = req.body.name;

    // Pipe the PDF into an name.pdf file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${name}.pdf`);
    doc.pipe(res);

    // Draw the certificate image
    doc.image("images/certificate.png", 0, 0, { width: 842 });

    // Set the font to Dancing Script
    doc.font("fonts/DancingScript-VariableFont_wght.ttf");

    // Draw the name
    doc.fontSize(60).text(name, 20, 265, {
        align: "center"
    });

    // Draw the date
    doc.fontSize(17).text(moment().format("MMMM Do YYYY"), -275, 430, {
        align: "center"
    });

    // Finalize the PDF and end the stream
    doc.end();
});

// Host the front end
app.use(express.static(__dirname + "/public"));

// Start the express server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});