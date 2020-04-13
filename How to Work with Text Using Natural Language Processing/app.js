// Import dependencies
const nlp = require("compromise");

// // Get name in a text
// const doc = nlp("My name is Vincent and my name is Bob");
// console.log(doc.people().debug()); // .text() .debug()

// // Get topics in a text
// const doc = nlp("The opera about richard nixon visiting china");
// console.log(doc.topics().if("china").json()); // .first() .if("china")

// // Get phone numbers in a text
// const doc = nlp("The opera about richard nixon visiting china (939) 555-0113");
// console.log(doc.phoneNumbers().json()); 

// // Normalize a text and get the money in the text
// const doc = nlp("The guest singer björk is going to sing at this sunday at seven thirty and it costs $5 per person");
// console.log(doc.normalize().text());
// console.log(doc.money().data());
