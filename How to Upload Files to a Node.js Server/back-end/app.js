// Import dependencies
const fs = require("fs");
const YAML = require("js-yaml");
const express = require("express");
const multer = require("multer");

// Setup express
const app = express();
const port = 3000;

// Setup Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination where the files should be stored on disk
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        // Set the file name on the file in the uploads folder
        cb(null, file.fieldname + "-" + Date.now());
    },
    fileFilter: function (req, file, cb) {

        if (file.mimetype !== "text/yaml" || file.mimetype !== "text/x-yaml" || file.mimetype !== "application/x-yaml") {
            // To reject a file pass `false` or pass an error
            cb(new Error(`Forbidden file type`));
        } else {
            // To accept the file pass `true`
            cb(null, true);
        }

    }
});

// Setup multer
const upload = multer({ storage: storage }); // { destination: "uploads/"}

// Setup the upload route
app.post("/upload", upload.single("data"), (req, res) => {

    if (req.file) {

        // Get YAML or throw exception on error
        try {

            // Load the YAML
            const raw = fs.readFileSync(`uploads/${req.file.filename}`);
            const data = YAML.safeLoad(raw);

            // Show the YAML
            console.log(data);

            // Delete the file after we're done using it
            fs.unlinkSync(`uploads/${req.file.filename}`);

        } catch (ex) {

            // Show error
            console.log(ex);

            // Send response
            res.status(500).send({
                ok: false,
                error: "Something went wrong on the server"
            });
            
        }

        // Send response
        res.status(200).send({
            ok: true,
            error: "File uploaded"
        });

    } else {

        // Send response
        res.status(400).send({
            ok: false,
            error: "Please upload a file"
        });

    }

})

// Start the server
app.listen(port, () => console.log(`YAML file uploader listening at http://localhost:${port}`));