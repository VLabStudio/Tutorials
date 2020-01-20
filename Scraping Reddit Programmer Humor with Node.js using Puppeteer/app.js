// Import dependencies
const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {

    // The number of posts. 25 would give you about 100
    const amount = 25;

    // The location / URL
    const url = "https://www.reddit.com/r/ProgrammerHumor/";

    // All of the jokes as key-value pairs
    let jokesObject = {};

    console.log("Getting posts from Reddit");

    // Create the browser
    const browser = await puppeteer.launch({
        headless: false
    });

    // Navigate to the website
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load" });

    // Get the root element of all the posts
    const root = (await page.$$(`.rpBJOHq2PR60pnwJlUyP0`))[0];

    // All the posts
    const posts = [];

    // For amount
    for (let i = 0; i < amount; i++) {

        // Get all the posts in this chunk
        const chunk = await (await root.$$("._1poyrkZ7g36PawDueRza-J"));

        // Add all the posts in this chunk to the posts array
        posts.push(...chunk);

        // Wait for 1 second
        await sleep(1000);

        // Scroll to the next chunk
        await page.evaluate(() => {
            window.scrollBy(0, (632 * 12));
        });

    }

    console.log("Extracting jokes from posts");

    // For each post
    for (const post of posts) {

        try {

            // Get the title
            const title = await getProperty(post, "textContent", "_eYtD2XCVieq6emjKBH3m");

            // Get the image jokesObject
            const image = await getProperty(post, "src", "ImageBox-image");

            // Add the post to the jokes object
            jokesObject[title] = { image: image };

        } catch (error) {

        }

    }

    console.log("Converting jokes into an array");

    // Convert the jokes object into an array
    const jokes = [];
    for (const joke in jokesObject) {
        jokes.push({
            title: joke,
            image: jokesObject[joke].image
        })
    }

    console.log("Saving jokes");

    // Save the jokes to a file
    fs.writeFileSync("jokes.json", JSON.stringify(jokes));

    // Close the browser
    await browser.close();

})();

// Get a property on an element from within an object
async function getProperty(rootElement, property, className) {
    const element = (await rootElement.$$(`.${className}`))[0];
    return await (await element.getProperty(property)).jsonValue();
}

// Sleep for x
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}