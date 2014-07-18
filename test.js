var fs = require('fs');
var append = require('appendage');
var morse = require('morse-stream');
var morse_blink = require('./');

var WORD_DELIMITER = '$';

fs.createReadStream('test.txt')
  .pipe(morse())
  .pipe(append({ after: WORD_DELIMITER }))
  .pipe(morse_blink(WORD_DELIMITER))
  .pipe(process.stdout);
