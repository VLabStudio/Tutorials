// Import dependencies
const fs = require("fs");
const express = require("express");
const multer = require("multer");

const auth = require('./auth')
const serveIndex = require("serve-index");

// Setup express
const app = express();
const port = 3000;

// Setup auth
app.use(auth);

// Setup Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Create the user folder if it doesn't already exist
        if (!fs.existsSync(`uploads/${req.res.user.name}`))
            fs.mkdirSync(`uploads/${req.res.user.name}`);

        // Set the destination where the files should be stored on disk
        cb(null, `uploads/${req.res.user.name}`);

    },
    filename: function (req, file, cb) {

        // Set the file name on the file in the uploads folder
        cb(null, file.originalname);

    },
    fileFilter: function (req, file, cb) {

        // Example of blocking different mine types

        // if (file.mimetype !== "text/yaml" || file.mimetype !== "text/x-yaml" || file.mimetype !== "application/x-yaml") {
        //     // To reject a file pass `false` or pass an error
        //     cb(new Error(`Forbidden file type`));
        // } else {
        //     // To accept the file pass `true`
        //     cb(null, true);
        // }
        cb(null, true);

    }
});

// Setup multer
const upload = multer({ storage: storage }); // { destination: "uploads/"}

// Setup the upload route
app.post("/upload", upload.single("data"), (req, res) => {

    if (req.file) {

        // Redirect to the files folder
        res.redirect('/files');

    } else {

        // Send response
        res.status(400).send({
            ok: false,
            error: "Please upload a file"
        });

    }

});

// Setup the get files route
app.use("/", express.static("public"));

// Setup the get files route
app.use("/files", (req, res, next) => {
    express.static(`${__dirname}/uploads/${res.user.name}`)(req, res, next);
});

app.use("/files", (req, res, next) => {
    serveIndex(`${__dirname}/uploads/${res.user.name}`, { "icons": true })(req, res, next);
});

// Start the server
app.listen(port, () => console.log(`File uploader listening at http://localhost:${port}`));