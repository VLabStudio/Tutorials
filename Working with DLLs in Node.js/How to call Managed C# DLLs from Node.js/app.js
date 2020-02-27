/*
Node 10 and lower
    npm i ffi
    https://www.npmjs.com/package/ffi
    https://github.com/node-ffi/node-ffi
Node 11 and 12
    npm i @saleae/ffi
    https://www.npmjs.com/package/@saleae/ffi
    https://github.com/lxe/node-ffi/tree/node-12
Node 13 and higher
    npm i ffi-napi
    https://www.npmjs.com/package/ffi-napi
    https://github.com/node-ffi-napi/node-ffi-napi
*/

// Import dependencies
const ffi = require("@saleae/ffi");

// Import math library
const mathLibrary = new ffi.Library("./MathLibrary", {
    "Subtract": [
        "int", ["int","int"]
    ],
    "Add": [
        "int", ["int","int"]
    ],
    "Random": [
        "int", ["int","int"]
    ]
});

console.log(mathLibrary.Random(1,5));