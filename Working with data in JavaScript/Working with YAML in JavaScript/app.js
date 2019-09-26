// Import dependencies
const fs = require("fs");
const YAML = require("js-yaml");

// Get YAML or throw exception on error
try {

    // Load the YAML
    const raw = fs.readFileSync("data.yaml");
    const data = YAML.safeLoad(raw);

    // Show the YAML
    console.log(data);

    // Modify the YAML
    data.customer.first_name = "Bob"; // Dorothy

    // Saved the YAML
    const yaml = YAML.safeDump(data);
    fs.writeFileSync("data.yaml", yaml, function (err, file) {
        if (err) throw err;
        console.log("Saved!");
    });

} catch (ex) {
    // Show error
    console.log(ex);
}