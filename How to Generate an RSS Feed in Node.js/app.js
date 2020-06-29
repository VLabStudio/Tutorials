// Import dependencies
const fs = require("fs");
const RSS = require("rss");

const blog = {
    title: "Free articles from Vincent Lab",
    description: "Vincent Lab is a platform for people to learn programming while having the environment in mind.",
    author: "Vincent Lab",
    articles: [{
        title: "How to Install and Configure Termux for Node.js Development",
        description: "In this article, I will show you how to set up a development environment on your phone using Termux and Node.js",
        url: "https://vincentlab.net/blog/articles/5e94ecc1e353ff0013b5d912",
        publishedDate: "June 20, 2020 04:00:00 GMT"
    }, {
        title: "The Difference Between Regular Functions and Arrow Functions",
        description: "Other then the syntactical differences. The main difference is the way the this keyword behaves?",
        url: "https://vincentlab.net/blog/articles/5de14c77471c24001a10dd1c",
        publishedDate: "June 21, 2020 04:00:00 GMT"
    }, {
        title: "How and why I made Valley Casino",
        description: "Valley Casino is a quick weekend project I made using JavaScript, HTML, and CSS to show how to make a graphical game UI using a website. And this how I made it.",
        url: "https://vincentlab.net/blog/articles/5dd54dd0c7e9e3001ade2201",
        publishedDate: "June 22, 2020 04:00:00 GMT"
    }]
};

const feed = new RSS({
    title: blog.title,
    description: blog.description,
    author: blog.author
});

for (const article of blog.articles) {
    feed.item({
        title: article.title,
        description: article.description,
        date: article.publishedDate
    });
}

const xml = feed.xml({ indent: true });
fs.writeFileSync("feed.xml", xml);