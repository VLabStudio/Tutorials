// Import dependencies
const prompts = require("prompts");

(async () => {

    // All of the questions
    const questions = [{
        type: "number",
        name: "age",
        message: "How old are you?"
    }, {
        type: "text",
        name: "animal",
        message: "What's your favorite animal?"
    }, {
        type: "text",
        name: "activity",
        message: "What's your favorite activity to do with your favorite animal?"
    }, {
        type: "text",
        name: "drink",
        message: "What's your favorite drink?"
    }
    ];

    // The response
    const res = await prompts(questions);

    // The story
    console.log(
        `On my way home, I look through ${res.age} shops, trying to find ${res.drink}. I finally found some ${res.drink}, after going through ${parseInt((res.age / 2) + res.age / 3)} stores.
Now I can get home and enjoy a nice glass of ${res.drink}. While ${res.activity} my ${res.animal}.
    `);

})();