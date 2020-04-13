// Import dependencies
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// Defining the serial port
const port = new SerialPort("COM3", {
    baudRate: 9600,
});

// The Serial port parser
const parser = new Readline();
port.pipe(parser);

// Read the data from the serial port
parser.on("data", (line) => console.log(line));

// Write the data to the serial port
port.write("ROBOT POWER ON");
port.write("ROBOT POWER ON");