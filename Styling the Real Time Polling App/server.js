// Import dependencies
const express = require("express");
const useragent = require("useragent");
const app = express();

// If you change this remember to change it on the client side as well
const port = 80;

// Host the front end
app.use(express.static("client"));

// Start the server and initialize socket.io
const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
const io = require("socket.io")(server);

// Initialize candidates
const candidates = {
    "0": { votes: 0, label: "JavaScript", color: "#F38548" },
    "1": { votes: 0, label: "C#", color: "#39ABCE" },
    "2": { votes: 0, label: "Python", color: "#CA3F45" }
};

// All of the users
const users = {};

// Cool down in milliseconds
const coolDown = 6000;

// The magic number
const magicNumber = 25381238823847823427345;

// On new client connection
io.on("connection", (socket) => {
    io.emit("update", candidates);

    // Parse the user agent string
    const userAgent = useragent.parse(socket.handshake.headers["user-agent"]);

    // The users IP address
    const address = socket.handshake.address;

    // Make the handle
    const id = hash(userAgent.os.toString() + userAgent.device.toString() + magicNumber);
    const handled = hash(id + address + magicNumber);

    // On new vote
    socket.on("vote", (index) => {

        // Check if the user is allowed to vote
        if (typeof users[handled] === "undefined" || typeof users[handled] !== "undefined" && users[handled] + coolDown <= Date.now()) {
            // Increase the vote at index
            if (candidates[index]) {
                candidates[index].votes += 1;
            }

            // Show the candidates in the console for testing
            console.log(candidates);

            // Tell everybody else about the new vote
            io.emit("update", candidates);

            // Set the timestamp
            users[handled] = Date.now();
        }

    });
});

// Generate a random RGB color
function randomRGB() {
    const r = () => Math.random() * 256 >> 0;
    return `rgb(${r()}, ${r()}, ${r()})`;
}

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hash(s) {
    return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}