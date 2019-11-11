const fs = require("fs");
const download = require("download");

(async function () {

    download("https://i.ytimg.com/vi/Oxj38vkwmBs/mqdefault.jpg", "dist").then(() => {
        console.log("done!");
    });

    // const data = await download("https://i.ytimg.com/vi/Oxj38vkwmBs/mqdefault.jpg");
    // fs.writeFileSync("dist/foo2.jpg", data);
    // console.log("done!");

    // await download("https://i.ytimg.com/vi/Oxj38vkwmBs/mqdefault.jpg", "dist");
    // console.log("done!");

    // await download("https://codeload.github.com/VLabStudio/Tutorials/zip/master", "dist", { extract: true }); // filename
    // console.log("done!");

})();