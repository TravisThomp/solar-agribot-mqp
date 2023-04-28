#include <Arduino.h>
#include <SPI.h>
#include <RH_RF95.h>
#include <ArduinoJson.h>

//PIN Layout
//change
#define RFM95_CS 10
#define RFM95_RST 2
#define RFM95_INT 28

#define R_LED_PIN 33
#define B_LED_PIN 35
#define RF95_FREQ 434.0
String DEVICE_NAME = "HUB_TRANSMITTER";

//Instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);

void sendBootMessage() {
  StaticJsonDocument<200> bootMessage;
  bootMessage["type"] = "BOOT";
  bootMessage["name"] = DEVICE_NAME;
  
  String jsonStr;
  serializeJson(bootMessage, jsonStr);
  Serial.println(jsonStr);
}

void sendErrorMessage(String errorDescription) {
  StaticJsonDocument<200> errorMessage;
  errorMessage["name"] = DEVICE_NAME;
  errorMessage["type"] = "ERROR";
  errorMessage["description"] = "errorDescription";
  
  String jsonStr;
  serializeJson(errorMessage, jsonStr);
  Serial.println(jsonStr);
}

void sendSuccessMessage() {
  StaticJsonDocument<200> successMessage;
  successMessage["type"] = "Success";
  
  String jsonStr;
  serializeJson(successMessage, jsonStr);
  Serial.println(jsonStr);
}

void setup() {

  // LED Setup
  pinMode(R_LED_PIN, OUTPUT);
  pinMode(B_LED_PIN, OUTPUT);

  digitalWrite(R_LED_PIN, HIGH);
  digitalWrite(B_LED_PIN, HIGH);


  //Radio setup
  pinMode(RFM95_RST, OUTPUT);

  digitalWrite(RFM95_RST, HIGH);

  //Waiting For Serial Communication
  while(!Serial){}; 
  
  Serial.begin(9600);
  delay(100);

  //manual reset
  digitalWrite(RFM95_RST, LOW);
  delay(10);
  digitalWrite(RFM95_RST, HIGH);
  delay(10);

  //Checking if successful initilization of radio
  bool initFailedSent = false;
  while(!rf95.init()) {
    if(!initFailedSent) {
      sendErrorMessage("LoRa Radio failed to initialize!");
      initFailedSent = true;
    }
  }

  //checking frequency set
  if(! rf95.setFrequency(RF95_FREQ)) {
    sendErrorMessage("Failed to set frequency!");
    while(1);
  }

  rf95.setTxPower(23, false);

  sendBootMessage();
  delay(100);
  digitalWrite(B_LED_PIN, LOW);
}


void loop()
{
  if (rf95.available())
  {
    // Should be a message for us now   
    uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
    uint8_t len = sizeof(buf);
    
    if (rf95.recv(buf, &len))
    {
      digitalWrite(B_LED_PIN, HIGH);
      buf[len] = '\0';
      // RH_RF95::printBuffer("", buf, len);
 
      // Serial.print("Got: ");
 
      Serial.println((char*)buf);
      // Serial.print("RSSI: ");
      // Serial.println(rf95.lastRssi(), DEC);
      delay(100);
      digitalWrite(B_LED_PIN, LOW);
    }
    else
    {
      sendErrorMessage("Failed to read message!");
    }
  } else
  {
    // Serial.println("none");
  }
} 