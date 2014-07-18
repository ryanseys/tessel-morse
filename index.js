var fs = require('fs');
var append = require('appendage');
var morse = require('morse-stream');
var tessel = require('tessel');
var through = require('through');

var led = tessel.led[1];

var DOT_DURATION = 250; // ms

var blinkQueue = [];
var firstRun = true;

// super hacky... :(
setTimeout(function() {
  checkQueue();
}, 2000);

function addToQueue(duration) {
  blinkQueue.push(duration);
}

function consumeFromQueue() {
  return blinkQueue.shift();
}

function checkQueue() {
  if (blinkQueue.length) {
    var durations = consumeFromQueue();
    if (durations[0]) led.output(1);
    setTimeout(function() {
      led.output(0);
      setTimeout(function() {
        checkQueue();
      }, durations[1] * DOT_DURATION);
    }, durations[0] * DOT_DURATION);
  }
}

function morse_blink() {
  var stream = through(blink_it);
  return stream;

  function blink_it(data) {
    var phrase = data.toString();
    console.log(phrase);

    for (var i = 0, l = phrase.length; i < l; ++i) {
      blink_word(phrase[i]);
    }
  }

  function blink_word(word) {
    var dotsAndDashes = word.split('');

    for (var i = 0, l = dotsAndDashes.length; i < l; ++i) {
      character = dotsAndDashes[i];
      if (character === '$') {
        addToQueue([0, 7]);
      } else if (character === '.') {
        addToQueue([1, 1]);
      } else if (character === '-') {
        addToQueue([3, 1]);
      } else if (character === ' ') {
        addToQueue([0, 3]);
      }
    }

    stream.queue(word);
  }
}

fs.createReadStream('README.md')
  .pipe(morse())
  .pipe(append({ after: '$' }))
  .pipe(morse_blink());

