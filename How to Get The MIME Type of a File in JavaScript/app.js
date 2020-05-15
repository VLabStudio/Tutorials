// Import dependencies
const mime = require("mime");

console.log(mime.getType("txt"));                                     // ⇨ "text/plain"
console.log(mime.getType("test.txt"));                                // ⇨ "text/plain"
console.log(mime.getType("F:vincentlab\\videos\\test.txt"));          // ⇨ "text/plain"

console.log(mime.getExtension("text/plain"));                         // ⇨ "txt"

mime.define({"text/test": ["test", "tt"]});
console.log(mime.getType("test"));                                    // ⇨ "text/test"