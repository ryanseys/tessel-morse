var tessel = require('tessel');
var async = require('async');
var morse = require('morse');
var LED = tessel.led[0];
var DOT_DURATION = 200; // ms
var WORD_DELIMITER = '$';

function ledOn() {
  LED.output(1);
}

function ledOff() {
  LED.output(0);
}

function morse_blink(str, options) {
  options = options || {};
  options.on = options.on || ledOn;
  options.off = options.off || ledOff;

  if (typeof options.duration === 'number' && !isNaN(options.duration)) {
    DOT_DURATION = options.duration;
  }
  if (typeof options.led === 'number' && !isNaN(options.led)) {
    LED = tessel.led[options.led] || LED;
  }

  var q = async.queue(function(c, callback) {
    var onDuration;
    var offDuration;
    if (c === WORD_DELIMITER) {
      onDuration = 0;
      offDuration = 7;
    } else if (c === '.') {
      onDuration = 1;
      offDuration = 1;
    } else if (c === '-') {
      onDuration = 3;
      offDuration = 1;
    } else if (c === ' ') {
      onDuration = 0;
      offDuration = 3;
    }

    if (onDuration > 0) {
      options.on();
    }
    setTimeout(function() {
      options.off();
      setTimeout(function() {
        callback();
      }, offDuration * DOT_DURATION);
    }, onDuration * DOT_DURATION);
  }, 1);

  var morseStr = morse.encode(str.split(' ')).join(WORD_DELIMITER);
  var arr = morseStr.split('');
  for (var i = 0, l = arr.length; i < l; i++) {
    q.push(arr[i]);
  }

  return morse.encode(str);
}

/**
 * Exports morse_blink
 * @type {function}
 */
module.exports = morse_blink;
