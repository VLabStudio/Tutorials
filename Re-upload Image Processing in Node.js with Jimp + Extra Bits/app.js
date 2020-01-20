// Import dependencies
const Jimp = require("jimp");

(async function () {

    // Read the image
    const image = await Jimp.read("images/shapes.png"); // http://vincent.net/lenna.jpg

    // // Add text
    //  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE); // bitmap fonts
    //  image.print(font, 0, 0, 'Hello world!'); // https://github.com/libgdx/libgdx/wiki/Hiero

    //  // Resize the image 
    //  // Resize the image to 250 x 250
    //  image.resize(250, 250);

    //  // Resize the height to 250 and scale the width accordingly
    //  image.resize(Jimp.AUTO, 250);

    //  // Resize the width to 250 and scale the height accordingly
    //  image.resize(250, Jimp.AUTO);

    //  // Add a sepia wash to the image
    //  image.sepia();

    //  // Pixelation 
    //  image.pixelate(5);
    //  image.pixelate(5, 50, 50, 190, 200); pixe,x, y, w, h 

    //  // Clone
    //  const image2 = image.clone();

    //  // Blur the image
    //  image.gaussian(1);
    //  image.blur(1);

    //  // Inverts the image
    //  image.invert(); 

    //  // Set the brightness
    //  image.brightness( 0.5 ); // -1 to +1

    //  // Resize the image
    //  image.resize(256, 256);

    //  // Set the quality
    //  image.quality(100);

    //  // Convert to grayscale
    //  image.greyscale();

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

    // // Plugins
    // loadPlugins(image, ["fisheye", "circle"]);

    // image.circle({ radius: 200, x: 200, y: 200 });

    // Save the image
    image.write("images/edited-shapes.png"); // or image.writeAsync("images/edited-shapes.png");

})();

function loadPlugins(jimpInstance, plugins) {

    const interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

    for (const name of plugins) {

        const pluginModule = interopRequireDefault(require(`@jimp/plugin-${name}`));

        const plugin = pluginModule["default"](jimpInstance) || {};

        jimpInstance[Object.keys(plugin)[0]] = plugin[Object.getOwnPropertyNames(plugin)[0]];
    }

};