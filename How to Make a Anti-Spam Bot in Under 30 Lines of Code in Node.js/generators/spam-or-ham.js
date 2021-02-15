// Import dependencies
const fs = require("fs");
const csv = require("csvtojson");
const bayes = require("bayes");

(async () => {

    // Make a new classifier
    const classifier = bayes();

    // Load the CSV file - https://www.kaggle.com/uciml/sms-spam-collection-dataset
    const collection = await csv().fromFile("../datasets/spam.csv");

    // Loop over each element in the collection
    for (const element of collection) {

        // Teach the classifier
        await classifier.learn(element.v2, element.v1);
        
    }

    // Serialize the classifier's state as a JSON string and save it to a file
    fs.writeFileSync("../classifiers/spam-or-ham-classifier.json", classifier.toJson());

})();