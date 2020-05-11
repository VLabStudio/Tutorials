// Import dependencies
const express = require("express");
const youtubedl = require("youtube-dl");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {

    if (!req.query.url) {
        // Send error response
        res.status(400).send({
            ok: false,
            error: "No URL"
        });
        return;
    }

    // How to Write a JavaScript Promise - https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8
    const download = new Promise(function (resolve, reject) {

        // Download the YouTube video
        youtubedl.exec(req.query.url, ["--format", "bestvideo[height<=1080]+bestaudio/best[height<=1080]"], { cwd: __dirname },
            (err, output) => {
                if (err) reject(err);

                resolve(output);
            })
    });

    try {

        // Await the downloader
        const output = await download;

        // Send response
        res.status(200).send({
            ok: true,
            result: output
        });


    } catch (error) {

        // Send error response
        res.status(500).send({
            ok: false,
            error: err.message
        });

    }

});

app.listen(port, () => console.log(`Downloader listening at http://localhost:${port}`));