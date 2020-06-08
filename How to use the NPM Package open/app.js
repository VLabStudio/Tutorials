// Import dependencies
const open = require("open");

(async () => {
    // // Opens the image in the default image viewer and waits for the opened app to quit.
    // await open("shapes.png", { wait: true });
    // console.log("The image viewer app quit");

    // Opens the URL in the default browser.
    await open("http://vincentlab.net");

    // // Opens the URL in a specified browser.
    // await open("http://vincentlab.net", { app: "Microsoft Edge" });
    // await open("http://vincentlab.net", { app: "chrome" });
    // await open("http://vincentlab.net", { app: "iexplore" });
    // await open("file.txt", { app: "notepad" });

    // // Specify app arguments.
    // await open("http://vincentlab.net", { app: ["brave", "--incognito"] });
})();