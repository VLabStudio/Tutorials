// Import dependencies
const auth = require("basic-auth")

// The users
const users = [{ name: "a", password: "123" }, { name: "b", password: "123" }];

module.exports = function (request, response, next) {
  var user = auth(request);
  if (!user || users.find(u => u.name === user.name).password !== user.pass) {
    response.set("WWW-Authenticate", `Basic realm="example"`);
    return response.status(401).send();
  } else {
    response.user = users.find(u => u.name === user.name);
  }
  return next();
}