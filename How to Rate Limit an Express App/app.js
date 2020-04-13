// Import dependencies
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

const limiter = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter); // app.use("/api/", limiter);

app.get("/", limiter, (req, res) => res.send("Hello World!"));

const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // Start blocking after 5 requests
    message: "Too many accounts created from this IP, please try again after an hour"
});
app.get("/create-account", createAccountLimiter, (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
