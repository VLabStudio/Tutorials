// Import dependencies
const Crawler = require("crawler");
const URL = require("url");
const fs = require("fs");

// Make a new crawler
const crawler = new Crawler({
    maxConnections: 1,
    rateLimit: 1000, // maxConnections will be forced to 1
    skipDuplicates: true,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {

            // Log the error
            console.log(error);

        } else {

            // Set $ to equal res.$
            const $ = res.$;

            // Write the data to a CSV file
            if (fs.existsSync("websites.csv")) {
                fs.appendFileSync("websites.csv", `\n${$("title").text().trim().replace(/,/g, "")}, ${res.request.uri.href}`);
            } else {
                fs.writeFileSync("websites.csv", `title, url\n${$("title").text().replace(/,/g, "")}, ${res.request.uri.href}`);
            }

            // Add all the urls on the current website to the queue

            // For each url on the current website
            $("a").each(function (i, link) {

                try {

                    // Format the url
                    const requestUrl = res.request.uri.href;
                    let href = $(link).attr("href");
                    href = URL.resolve(requestUrl, href);

                    // If the url starts with http then added to the queue
                    if (href.startsWith("http")) {
                        crawler.queue(href);
                    }

                } catch (error) {

                }

            });

        }
        done();
    }
});

// Add the starting url to the queue with default callback
crawler.queue("https://github.com/bda-research/node-crawler");