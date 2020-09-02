// Import dependencies
const express = require("express");
const app = express();
const port = 80;

app.use(express.static("game"));

app.listen(port, () => console.log(`Game listening on port ${port}!`));