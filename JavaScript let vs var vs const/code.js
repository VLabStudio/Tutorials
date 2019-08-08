// Define some fruits
var banana = "yellow";
var melon = "red";
const apple = "red";

if (banana === "yellow") {

  var banana = "pink"; // The scope is global
  let melon = "green"; // The scope is inside the if-block
  const apple = "purple"; // The scope is inside the if-block
  // apple = "yellow" // It's not assignable

  console.log(banana); // Pink
  console.log(melon);  // Green
  console.log(apple);  // Purple

}

console.log(banana); // Pink
console.log(melon);  // Red
console.log(apple);  // Red