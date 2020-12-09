// Import dependencies
const SerialPort = require("serialport");

// Defining the serial port
const port = new SerialPort("COM5");

const person = {
    name:"Bob",
    age: 23
}

// Write the data to the serial port
port.write(JSON.stringify(person));
