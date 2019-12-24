// Import dependencies
const fs = require("fs");
const Parser = require("rss-parser");

(async function main() {

    // Make a new RSS Parser
    const parser = new Parser();

    // Get all the items in the RSS feed
    const feed = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCMA8gVyu_IkVIixXd2p18NQ"); // https://www.reddit.com/.rss

    let items = [];

    // Clean up the string and replace reserved characters
    const fileName = `${feed.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;
    if (fs.existsSync(fileName)) {
        items = require(fileName);
    }

    // Add the items to the items array
    await Promise.all(feed.items.map(async (currentItem) => {

        // Add a new item if it doesn't already exist
        if (items.filter((item) => item === currentItem).length <= 1) {
            items.push(currentItem);
        }

    }));

    // Save the file
    fs.writeFileSync(fileName, JSON.stringify(items));

})();