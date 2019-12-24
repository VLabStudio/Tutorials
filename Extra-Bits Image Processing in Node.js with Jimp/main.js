// Import dependencies
const Jimp = require("jimp");

(async function () {

    // Read the image
    const image = await Jimp.read("images/shapes.png");

    // Save the image
    image.writeAsync("images/edited-shapes.png");

})();


// // Colour manipulation
// image.color([
//     { apply: "hue", params: [100] }, // Change hue from -360 to 360
//     // { apply: 'lighten', params: [50] }, // Lighten the color a given amount, from 0 to 100
//     // { apply: 'xor', params: ['#06D'] }, // Treats the two colors as bitfields and applies an XOR operation to the red, green, and blue components

// ]);

// // Manual manipulation
// image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {

//     // Get the colors
//     const red = this.bitmap.data[idx + 0];
//     const green = this.bitmap.data[idx + 1];
//     const blue = this.bitmap.data[idx + 2];
//     const alpha = this.bitmap.data[idx + 3];

//     // If x is less than y
//     if (x < y)
//         // Set the red channel to 255
//         this.bitmap.data[idx + 0] = 255;

// });

// // Ghost effect - src, x, y, [{ mode, opacitySource, opacityDest }] 
// const image2 = image.clone();
// image.composite(image2, 5, 0, {
//     mode: Jimp.BLEND_MULTIPLY,
//     opacitySource: 0.5,
//     opacityDest: 0.9
// });

// // Emboss effect
// image.convolute([[-2, -1, 0], [-1, 1, 1], [0, 1, 2]]);

// Jimp.rgbaToInt(r, g, b, a); // e.g. converts 255, 255, 255, 255 to 0xFFFFFFFF
// Jimp.intToRGBA(hex); // e.g. converts 0xFFFFFFFF to {r: 255, g: 255, b: 255, a:255}
// Jimp.cssColorToHex(cssColor); // e.g. converts #FF00FF to 0xFF00FFFF

// const image2 = new Jimp(256, 256, 0xff0000ff, (err, image) => {
//     // This image is 256 x 256, every pixel is set to 0xFF0000FF
// });