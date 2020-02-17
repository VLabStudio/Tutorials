// Import dependencies
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

(async () => {

    // Optimize the image size
    const files = await imagemin(["original-images/*.{jpg,png}"], {
        destination: "optimised-images",
        plugins: [
            imageminJpegtran(),
            imageminPngquant()
        ]
    });

    // Show amount of images optimize
    console.log(`Optimized ${files.length} images`);

})();