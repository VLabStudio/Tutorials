// Import dependencies
const express = require("express");

const app = express();
const port = 3000;

// npm install pug

//// Set the view engine to pug
// app.set("view engine", "pug");

// app.get("/", function (req, res) {
//     res.render("index", { title: "Hello", message: "Hello World!" });
//  });

// npm install mustache - express

// const mustacheExpress = require("mustache-express");
// // Set the view engine to mustache
// app.engine("html", mustacheExpress());
// app.set("view engine", "html");
// app.set("views", __dirname + "/views");

//  app.get("/", function (req, res) {
//     res.render("index", { title: "Hello", message: "Hello World!" });
//  });

// npm install ejs

//// Set the view engine to ejs
// app.set("view engine", "ejs");

// app.get("/", function (req, res) {
//     res.render("index", { title: "Hello", message: "Hello World!" });
// });


app.listen(port, () => console.log(`Template engine listening on port ${port}!`));