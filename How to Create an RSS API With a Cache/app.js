// Import dependencies
const Parser = require("rss-parser");
const express = require("express");

// Setup the express server
const app = express();
const port = 3000;

// The last time the cache ran
let lastupdated = new Date();

// Set the cache to cache for 1 minute
let timeOut = 60000;

// All the items in the rss feed
let items = [];

// Update the cache
updateCache();

app.get('/', (req, res) => {

    // Update the cache if the current time and the last updated time is more than the time out
    if ((new (Date) - lastupdated) > timeOut)
        updateCache();

    res.send(items);
});

// Start the server
app.listen(port, () => console.log(`Rss parser listening at http://localhost:${port}`))

async function updateCache() {

    // Make a new RSS Parser
    const parser = new Parser();

    // Get all the items in the RSS feed
    const feed = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCMA8gVyu_IkVIixXd2p18NQ"); // https://www.reddit.com/.rss

    // Add the items to the items array
    await Promise.all(feed.items.map(async (currentItem) => {

        // Add a new item if it doesn't already exist
        if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
            items.push(currentItem);
        }

    }));

    // Set the last updated variable to the current time
    lastupdated = new Date();

    // Show message
    console.log("Updated the cache");
}

function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // if number of properties is different, objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        // if values of same property are not equal, objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // if we made it this far, objects are considered equivalent
    return true;
}