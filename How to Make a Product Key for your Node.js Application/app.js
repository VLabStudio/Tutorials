// Import dependencies
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");

// Secrets
const secret1 = "123";
const secret2 = "123";

// Cryptr
const cryptr = new Cryptr(secret1);

// Generate the product key
function generate(type) {
    return cryptr.encrypt(jwt.sign({ type: type }, secret2));
}

// Validate the product key
function validate(productKey) {
    return jwt.verify(cryptr.decrypt(productKey), secret2);
}

// Examples
console.log(validate(generate("basic")));
console.log(generate("premium"));