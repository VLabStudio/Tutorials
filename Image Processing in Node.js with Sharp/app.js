// Import dependencies
const sharp = require("sharp");
const fs = require("fs");

(async function () {

    try {
        // // png, webp, jpeg, tiff, heif, raw
        // const info = await sharp("images/shapes.png").png().toFile("images/edited-shapes.png");
        // const info = await sharp("images/shapes.png").jpeg().toFile("images/edited-shapes.jpeg");
        // console.log(info);

        // const image = await sharp("images/shapes.png").png().toBuffer();
        // fs.writeFileSync("images/edited-shapes.png", image);

        // // Metadata
        // const metadata = await sharp("images/shapes.png").metadata();
        // console.log(metadata);

        // // Applies a grayscale effect to the image
        // await sharp("images/shapes.png").grayscale().png().toFile("images/edited-shapes.png");

        // // Resizes the image
        // await sharp("images/shapes.png").resize(300, 200).png().toFile("images/edited-shapes.png");

        // // Any pixel value greather than or equal to the threshold value will be set to 255, otherwise it will be set to 0.
        // await sharp("images/shapes.png").threshold(100).png().toFile("images/edited-shapes.png");

        // // Recomb the image with the specified matrix.
        // await sharp("images/shapes.png").recomb([
        //     [0.3588, 0.7044, 0.1368],
        //     [0.2990, 0.5870, 0.1140],
        //     [0.2392, 0.4696, 0.0912],
        // ]).png().toFile("images/edited-shapes.png");

        // // Transforms the image using brightness, saturation and hue rotation.
        // await sharp("images/shapes.png").modulate({
        //     // brightness: 2, // Increase lightness by a factor of 2
        //     // saturation: 0.5,
        //     hue: 180 // Hue rotate by 180 degrees
        // }).png().toFile("images/edited-shapes.png");

        // // Blur the image. When used without parameters, performs a fast, mild blur of the output image. When a sigma is provided, performs a slower, more accurate Gaussian blur.
        // // Value between 0.3 and 1000
        // await sharp("images/shapes.png").blur().png().toFile("images/edited-shapes.png");

        // Make a new image
        const info = await sharp({
            create: {
                width: 1920,
                height: 1080,
                channels: 4,
                background: { r: 255, g: 0, b: 0, alpha: 0.5 }
            }
        }).png().toFile("images/edited-shapes.png");
    } catch (error) {
        console.log(error);
    }

})();