// Import dependencies
const lqip = require("lqip");
const fs = require("fs");

(async () => {

  // Get the colors
  const colors = await lqip.palette("./palette.png");

  // Write the file
  fs.writeFileSync("dest/index.html", `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Color Palette</title>
    </head>
    <body>
        
    </body>
    </html>
   `);

})();
