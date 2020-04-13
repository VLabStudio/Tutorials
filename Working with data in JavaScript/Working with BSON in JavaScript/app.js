// Import dependencies
const fs = require("fs");
const BSON = require("bson");

// Serialize a document
const data = BSON.serialize({ name: "Bob" });
fs.writeFileSync("data.bson", data);
console.log(data);

// Deserialize the resulting Buffer
const doc = BSON.deserialize(data);
console.log(doc);