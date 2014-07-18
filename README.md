# tessel-morse

Communicate in Morse code using your Tessel

## Installation

``` js
npm install tessel-morse
```

## Usage

``` js
var fs = require('fs');
var append = require('appendage');
var morse = require('morse-stream');
var morse_blink = require('tessel-morse');

var WORD_DELIMITER = '$';

fs.createReadStream('test.txt')
  .pipe(morse())
  .pipe(append({ after: WORD_DELIMITER }))
  .pipe(morse_blink(WORD_DELIMITER));
```

## Contributing

It's as simple as creating an issue or sending a pull request! :)

## License

MIT
