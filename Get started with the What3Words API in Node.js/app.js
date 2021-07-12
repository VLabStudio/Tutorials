// Import dependencies
const what3words = require("@what3words/api");
const express = require("express");
require("dotenv").config();

// Setup what3words and express
what3words.setOptions({ key: process.env.APIKEY });
const app = express();

// Setup the route
app.get("/:lat/:lng", async (req, res) => {

    // Set the content type to json
    res.setHeader("Content-Type", "application/json");

    try {
        // Get the data from the what3words API
        const data = await what3words.convertTo3wa({ lat: req.params.lat, lng: req.params.lng });

        // Show the data to the user
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        // Show the error to the user
        res.status(400).send({error: JSON.stringify(error)});
    }

});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`What 3 Words is listening at http://localhost:${process.env.PORT}`);
});