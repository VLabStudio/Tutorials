const accountSid = ""; // process.env.TWILIO_ACCOUNT_SID;
const authToken = ""; // process.env.TWILIO_AUTH_TOKEN;
const sendingNumber = ""; // process.env.TWILIO_NUMBER;

const client = require("twilio")(accountSid, authToken);

client.messages
    .create({
        body: "Test",
        from: sendingNumber,
        to: ""
    })
    .then(message => console.log(message.status))
    .done();