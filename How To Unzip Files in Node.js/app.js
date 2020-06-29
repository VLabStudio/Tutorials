// Import dependencies
const decompress = require("decompress");
const path = require("path");

(async () => {

    try {
        const files = await decompress("unicorn.zip", "dist", {
            filter: file => path.extname(file.path) !== ".exe"
        });
        console.log(files);
    } catch (error) {
        console.log(error);
    }

})();

// decompress("unicorn.zip", "dist").then(files => {
//     console.log("done!");
// });


// // Filter out files before extracting
// try {
//     const files = await decompress("unicorn.zip", "dist", {
//         filter: file => path.extname(file.path) !== ".exe"
//     });
//     console.log("done!");
// } catch (error) {
//     console.log(error);
// }


// // Map files before extracting
// try {
//     const files = await decompress("unicorn.zip", "dist", {
//         map: file => {
//             file.path = `unicorn-${file.path}`;
//             return file;
//         }
//     });
//     console.log("done!");
// } catch (error) {
//     console.log(error);
// }