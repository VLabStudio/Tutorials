// Import dependencies
const emailAddresses = require("email-addresses");

console.log(emailAddresses.parseOneAddress("test@vincentlab.net"));
console.log(emailAddresses.parseOneAddress('"Vincent Lab" <test@vincentlab.net>'));

// Import dependencies
const { boolean } = require("boolean");

console.log(boolean("yes"));
console.log(boolean("off"));
console.log(boolean("0"));
console.log(boolean("t"));
console.log(boolean("f"));
console.log(boolean("y"));


// Import dependencies
const human = require("humanparser");

const fullName = "Mr. Vincent R. Lab, III";
const attrs = human.parseName(fullName);
console.log(attrs);

const address = "123 Happy Street, Honolulu, HI  65780";
const parsed = human.parseAddress(address);
console.log(parsed);

// Import dependencies
const bytes = require("bytes");

console.log(bytes(1024));

console.log(bytes(10000000));

console.log(bytes(1024 * 1.7, {decimalPlaces: 0}));


// Import dependencies
const UAParser = require("ua-parser-js");
const parser = new UAParser();

var uastring = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2";
parser.setUA(uastring);
console.log(parser.getOS());
// console.log(parser.getResult());