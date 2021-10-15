// Import dependencies
const net = require("net");

// Setup the server
const server = net.createServer();
const host = "127.0.0.1";
const port = 1337;

// Show that we're listening for connections
server.on("listening", function () {
    console.log(`Listening on ${host}:${port}`);
});

// Listen for connections
server.on("connection", function (socket) {

    // On data
    socket.on("data", function (buf) {

        for (const json of buf.toString("utf8").split("%;%")) {
            try {
                const obj = JSON.parse(json);
                console.log(obj);
            } catch (error) {

            }
        }

    });

});

// Start the server
server.listen(port, host);