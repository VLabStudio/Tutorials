// Import dependencies
const fs = require("fs");
const bayes = require("bayes");

(async () => {

    // Make a new classifier
    const classifier = bayes();

    // Teach it positive phrases
    await classifier.learn("amazing, awesome movie!! Yeah!! Oh boy.", "positive");
    await classifier.learn("Sweet, this is incredibly, amazing, perfect, great!!", "positive");

    // Teach it negative phrases
    await classifier.learn("terrible, shitty thing. Damn. Sucks!!", "negative");
    await classifier.learn("This is terrible", "negative");
    await classifier.learn("Don't be an ash0le", "negative");

    // Serialize the classifier's state as a JSON string and save it to a file
    fs.writeFileSync("../classifiers/positive-and-negative-classifier.json", classifier.toJson());

})();