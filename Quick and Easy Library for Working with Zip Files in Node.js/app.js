// Import dependencies
const JSZip = require("jszip");
const fs = require("fs");

(async () => {

    // Initialise the zip file
    const zip = new JSZip();

    // Make a new text file with the text Hello World
    zip.file("Hello.txt", "Hello World");

    // Make a new folder called images with a picture called shapes
    const images = zip.folder("images");
    images.file("shapes.png", fs.readFileSync("shapes.png"), { base64: true });

    // Convert the zip file into a buffer
    const content = await zip.generateAsync({ type: "nodebuffer" });

    // Save the zip file
    fs.writeFileSync("example.zip", content);

})();