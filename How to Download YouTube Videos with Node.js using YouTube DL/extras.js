// Import dependencies
const youtubedl = require("youtube-dl");

// Download the YouTube audio as a mp3 - https://askubuntu.com/questions/178481/how-to-download-an-mp3-track-from-a-youtube-video
youtubedl.exec("https://www.youtube.com/watch?v=-jEuLl-wuxc", ["--format", "bestaudio/best[height<=1080]","--extract-audio","--audio-format","mp3"], { cwd: __dirname },
    (err, output) => {

        if (err) throw err;

        console.log(output.join("\n"));

    });