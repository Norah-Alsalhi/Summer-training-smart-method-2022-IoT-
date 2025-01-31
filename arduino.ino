void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  if (Serial.available()) {
    char command = Serial.read();
    if (command == 'R') {
      Serial.println("Turning Right");
      digitalWrite(LED_BUILTIN, HIGH);  // Turn LED ON for Right
      delay(500);
      digitalWrite(LED_BUILTIN, LOW);   // Turn LED OFF
    } else if (command == 'L') {
      Serial.println("Turning Left");
      digitalWrite(LED_BUILTIN, HIGH);  // Turn LED ON for Left
      delay(500);
      digitalWrite(LED_BUILTIN, LOW);   // Turn LED OFF
    }
  }
}
