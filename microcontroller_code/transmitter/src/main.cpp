/**
 * The transmitter communicated over serial to the device using JSON messsages
 * 
 * The messages follow this format
 * 
 * {
 *    type: "log/send/confirmation",
 *    time: "00223344",
 *    message: ""
 * }
 */

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

String DEVICE_NAME = "ROBOT_TRANSMITTER";

//Instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);

bool waitingForResponse = false;

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
  errorMessage["description"] = errorDescription;
  
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

  pinMode(RFM95_RST, OUTPUT);

  digitalWrite(RFM95_RST, HIGH);

  //Waiting For Serial Communication
  while(!Serial);

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
  digitalWrite(B_LED_PIN, LOW);
  delay(20);
}


int16_t packetnum = 0;  // packet counter, we increment per xmission

bool sendMessage(String message) {
  const char* radioPacket = message.c_str();
  int packetLength = strlen(radioPacket);


  // char radiopacket[20] = "Hello World #      ";
  // itoa(packetnum++, radiopacket+13, 10);
  
  // radiopacket[19] = 0;
  
  delay(10);
  
  rf95.send((uint8_t *)radioPacket, packetLength);

  // Serial.println("Waiting for packet to complete..."); 
  delay(10);
  rf95.waitPacketSent();
  sendSuccessMessage();
  return true;
}

bool waitForResponse() {
  if (rf95.available())
  {
    // Should be a message for us now   
    uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
    uint8_t len = sizeof(buf);
    
    if (rf95.recv(buf, &len))
    {
      // digitalWrite(LED, HIGH);
      RH_RF95::printBuffer("Received: ", buf, len);
      Serial.print("Got: ");
      Serial.println((char*)buf);
       Serial.print("RSSI: ");
      Serial.println(rf95.lastRssi(), DEC);
    }
    else
    {
      Serial.println("Receive failed");
    }
  }
  return true;
}

void loop() {
  // digitalWrite(B_LED_PIN, HIGH);
  // digitalWrite(R_LED_PIN, HIGH);
  
  // Serial.println("Sending to rf95_server");
  // sendMessage();


  // waitForResponse();

  if(Serial.available())
  {
    digitalWrite(B_LED_PIN, HIGH);
    String message = Serial.readStringUntil('}') + "}";
    sendMessage(message);
    Serial.clear();
    delay(80);
    digitalWrite(B_LED_PIN, LOW);
  }
}





// void setup() {
//   // LED Setup
//   pinMode(R_LED_PIN, OUTPUT);
//   pinMode(B_LED_PIN, OUTPUT);

//   digitalWrite(R_LED_PIN, HIGH);
//   digitalWrite(B_LED_PIN, HIGH);

//   pinMode(RFM95_RST, OUTPUT);

//   digitalWrite(RFM95_RST, HIGH);

//   //Waiting For Serial Communication
//   while(!Serial);

//   Serial.begin(9600);
//   delay(100);

//   Serial.println("Radio Tx Booting...");

//   //manual reset
//   digitalWrite(RFM95_RST, LOW);
//   delay(10);
//   digitalWrite(RFM95_RST, HIGH);
//   delay(10);

//   while(!rf95.init()) {
//     Serial.println("LoRa radio failed to Initalize!");
//   }

//   Serial.print("LoRa Radio Initalized");

//   if(! rf95.setFrequency(RF95_FREQ)) {
//     Serial.println("FAILED TO SET FREQUENCY!");
//     while(1);
//   }

//   Serial.print("Set Frequency to");
//   Serial.println(RF95_FREQ);
//   rf95.setTxPower(23, false);

//     digitalWrite(B_LED_PIN, LOW);

// }

// int16_t packetnum = 0;  // packet counter, we increment per xmission

// bool sendMessage() {
//   char radiopacket[20] = "Hello World #      ";
//   itoa(packetnum++, radiopacket+13, 10);
//   Serial.print("Sending "); Serial.println(radiopacket);
//   radiopacket[19] = 0;
  
//   Serial.println("Sending..."); delay(10);
//   rf95.send((uint8_t *)radiopacket, 20);

//   Serial.println("Waiting for packet to complete..."); delay(10);
//   rf95.waitPacketSent();
//   return true;
// }

// bool waitForResponse() {
//   if (rf95.available())
//   {
//     // Should be a message for us now   
//     uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
//     uint8_t len = sizeof(buf);
    
//     if (rf95.recv(buf, &len))
//     {
//       // digitalWrite(LED, HIGH);
//       RH_RF95::printBuffer("Received: ", buf, len);
//       Serial.print("Got: ");
//       Serial.println((char*)buf);
//        Serial.print("RSSI: ");
//       Serial.println(rf95.lastRssi(), DEC);
//     }
//     else
//     {
//       Serial.println("Receive failed");
//     }
//   }
//   return true;
// }

// void loop() {
//   digitalWrite(B_LED_PIN, LOW);

  
//   Serial.println("Sending to rf95_server");
//   sendMessage();

//   waitForResponse();
//   delay(500);
//   delay(500);
// }

