// Import dependencies
import { AsBind } from "as-bind";
import fs from "fs";

(async () => {
    // Load in the wasm file
    const wasm = fs.readFileSync("./main.wasm");

    // Instantiate the wasm file, and pass in our importObject
    const instance = await AsBind.instantiate(wasm, {
        utils: {
            log(message) {
                console.log(message);
            }
        }
    });

    // Run main
    instance.exports.printName("Bob",10);
})();