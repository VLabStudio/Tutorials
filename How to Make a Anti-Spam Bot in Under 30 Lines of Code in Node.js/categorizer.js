// Import dependencies
const fs = require("fs");
const bayes = require("bayes");

(async () => {

    // Load the classifier back from its JSON representation.
    const classifier = bayes.fromJson(fs.readFileSync("classifiers/spam-or-ham-classifier.json"));

    // Now ask it to categorize a document it has never seen before
    console.log(await classifier.categorize("awesome, cool, amazing!! Yay.")); // => "positive"
    console.log(await classifier.categorize("This is a TERRIBLE product.")); // => "negative"

    console.log(await classifier.categorize("Buy the new amazing products for only $20")); // => "spam"
    
})();