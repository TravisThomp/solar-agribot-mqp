#ifndef MyLedLibrary_h
#define MyLedLibrary_h

#include "Arduino.h"

class MyLedLibrary
{
  public:
    SerialManager(int pin);
    void send();
    void off();
    void toggle();
  private:
    int _pin;
    bool _state;
};

#endif
