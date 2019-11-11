// Import dependencies
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const mongoose = require("mongoose");

// The mongoose appointment model
let Appointment;

//  Connect to MongoDB
async function connect() {

    try {

        // Try to connect to MongoDB
        await mongoose.connect("Connection string goes here", { useNewUrlParser: true });

        // Log the success
        console.log("Mongoose connected successfully");

    } catch (error) {

        // Log the fail
        console.log("Mongoose failed to connect");

    }

    // Make the mongoose schema for appointments
    const schema = new mongoose.Schema({
        messageId: { type: String },
        accountId: { type: String },
        fullName: { type: String },
        datetime: { type: Date },
        message: { type: String },
        phoneNumber: { type: String },
        confirmed: {
            type: Boolean,
            default: false
        }
    });

    // Make the mongoose Appointment model
    Appointment = mongoose.model("Appointment", schema);

    // Wait for the Appointment to be initialized
    await Appointment.init();

}

module.exports = async (req, res) => {

    // The Twilio message response generator
    const twiml = new MessagingResponse();

    // Connect to MongoDB and initialize the Appointment model
    await connect();

    if (req.body.Body.toLowerCase() == "help") {
        twiml.message("book full name 2019-10-29 at 11:30 custom message");
    } else if (req.body.Body.toLowerCase().startsWith("book")) {

        // Regular expression
        const command = /book (.*?)\s(\d.*?)at\s(.*?)\s(.*)/.exec(req.body.Body);

        // Construct the appointment
        const appointment = {
            messageId: req.body.MessageSid,
            accountId: req.body.AccountSid,
            fullName: command[1],
            datetime: new Date(`${command[2].trim()}T${command[3].trim()}Z`),
            message: command[4],
            phoneNumber: req.body.From,
            confirmed: false
        }

        // Make a new appointment document and add it to the DB
        const appointmentDocument = new Appointment(appointment);
        await appointmentDocument.save();

        // Send a message back to the user asking for confirmation
        twiml.message("Write yes to confirm. If you don't write yes your appointment will not be booked.");

    } else if (req.body.Body.toLowerCase() == "yes") {

        // Update the appointment in the DB
        const document = await Appointment.updateOne({ accountId: req.body.AccountSid }, { confirmed: true });

        // Show the user if the appointment was updated
        if (document.nModified >= 1) {
            twiml.message("Your appointment is now booked.");
        } else {
            twiml.message("It doesn't look like you have an appointment to accept, maybe you already accepted your appointment.");
        }

    } else {
        twiml.message("book full name 2019-10-29 at 11:30 custom message.");
    }

    // Return the response
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());

}