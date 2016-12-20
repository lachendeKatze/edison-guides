/*
 * Copyright (c) 2015 Intel Corporation.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Plug the temperature sensor into the Analog port A0 on the provided
// Seeed Sensor Kit Arduino Shield
// MUST be in the analog pin slots!var mraa = require("mraa") ;

var mraa = require("mraa");

var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

var Device = require('losant-mqtt').Device; // provide IoT connectivity
var device = new Device({
    id: '****',
    key: '****',
    secret: '****'
});

board.on("ready", function() {
  var reportInterval = 3000;
  
  var temp = new five.Temperature({
    pin: "A0",
    controller: "GROVE"
  });

  // probablhy don't connect the device unless the board is ready
  device.connect();
  
  setInterval(function(){
    var analog0Value = analog0Read();
    
    var tempValue = Math.round(temp.celsius);
    console.log("%d°C", tempValue);
    device.sendState({cageTemp: tempValue});
  },reportInterval);
  
  
  
  
  this.loop(2000, function() {
    console.log("%d°C", Math.round(temp.celsius));
  });
  
});
