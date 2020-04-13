const name = "How to Get Started With JS IPFS";

console.log(capitalFirstLetterStartingWithLowercase(name)); // Capital first letter starting with lowercase
console.log(capitalFirstLetter(name)); // Capital first letter
console.log(hyphen(name)); // Hyphen
console.log(underscore(name)); // Underscore
console.log(underscoreBeforeThePropertyName(name)); // Underscore before the property name
console.log(upperCaseConstants(name)); // Uppercase Constants

function capitalFirstLetter(text) {
    return text.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length)).join("");
}

function capitalFirstLetterStartingWithLowercase(text) {
    text = text.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length)).join("");
    return text.charAt(0).toLowerCase() + text.slice(1, text.length);
}

function hyphen(text) {
    return text.replace(/\s/g, "-").toLowerCase();
}

function underscore(text) {
    return text.replace(/\s/g, "_").toLowerCase();
}

function underscoreBeforeThePropertyName(text) {
    return "_" + text.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length)).join("");
}

function upperCaseConstants(text) {
    return name.replace(/\s/g, "").toUpperCase();
}
