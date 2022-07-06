/*
 * SimpleSender.cpp
 *
 *  Demonstrates sending IR codes in standard format with address and command
 *  An extended example for sending can be found as SendDemo.
 *
 *  Copyright (C) 2020-2021  Armin Joachimsmeyer
 *  armin.joachimsmeyer@gmail.com
 *
 *  This file is part of Arduino-IRremote https://github.com/Arduino-IRremote/Arduino-IRremote.
 *
 *  MIT License
 */
#include <Arduino.h>
/*
 * Define macros for input and output pin etc.
 */
#include "PinDefinitionsAndMore.h"

//#define SEND_PWM_BY_TIMER
//#define USE_NO_SEND_PWM
#define NO_LED_FEEDBACK_CODE // saves 418 bytes program space

#include <IRremote.hpp>

void setup() {
    Serial.begin(9600);

    // Just to know which program is running on my Arduino
    Serial.println(F("START " __FILE__ " from " __DATE__ "\r\nUsing library version " VERSION_IRREMOTE));
    
    IrSender.begin(); // Start with IR_SEND_PIN as send pin and if NO_LED_FEEDBACK_CODE is NOT defined, enable feedback LED at default feedback LED pin

    Serial.print(F("Ready to send IR signals at pin "));
    Serial.println(IR_SEND_PIN);
}
void Power(){
  uint16_t sAddress = 0x6681;
  uint8_t sCommand = 0x81;
  uint8_t sRepeats = 0;
  Serial.println("Power");
  IrSender.sendNEC(sAddress, sCommand, sRepeats);
}
void TempUp(){
  uint16_t sAddress = 0x6681;
  uint8_t sCommand = 0x85;
  uint8_t sRepeats = 0;
  Serial.println("TempUp");
  IrSender.sendNEC(sAddress, sCommand, sRepeats);
}
void TempDown(){
  uint16_t sAddress = 0x6681;
  uint8_t sCommand = 0x8A;
  uint8_t sRepeats = 0;
  Serial.println("TempDown");
  IrSender.sendNEC(sAddress, sCommand, sRepeats);
}

void loop(){
  if(Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    if(data == "Power"){
      Power();
    }
    if(data == "TempUp"){
      TempUp();
    }
    if(data == "TempDown"){
      TempDown();
    }
  }
}
