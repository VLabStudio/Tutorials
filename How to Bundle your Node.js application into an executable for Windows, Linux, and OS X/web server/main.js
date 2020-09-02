const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("images"));

app.get("/", (req, res) => res.send(`
    <h1>Hello World!</h1> 
    <img src="shapes-800-800.png" alt="Shapes" height="300" width="300">
`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));