void setup() {
  // Initialise the serial port
  Serial.begin(9600);
}

void loop() {
  
  // If there is incoming data
  if (Serial.available() > 0) {

    // Write the data to the serial port
    Serial.println("I received: " + Serial.readString());
  }
  
}
