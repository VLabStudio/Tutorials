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

// Convert JSString to CString
function TEXT(text) {
    return Buffer.from(`${text}\0`, "ucs2");
}

// Import user32
const user32 = new ffi.Library("user32", {
    "MessageBoxW": [
        "int32", ["int32", "string", "string", "int32"]
    ],
    "SetCursorPos": [
        "bool", ["int32", "int32"]
    ]
});

// Call the message box function
const OK_or_Cancel = user32.MessageBoxW(
    0, TEXT("Hello from Node.js!"), TEXT("Hello, World!"), 1
);

// Show the output of the message box
console.log(OK_or_Cancel);

// Set the cursor position
user32.SetCursorPos(0, 0);