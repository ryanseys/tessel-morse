# tessel-morse

Communicate in Morse code using your Tessel

## Installation

``` js
npm install tessel-morse
```

## Usage

Run the following script on your tessel:

``` js
var morseBlink = require('tessel-morse');
var str = morseBlink('hello world');
console.log(str); // .... . .-.. .-.. --- ....... .-- --- .-. .-.. -..
```

Look at your Tessel! It should be blinking :)

[See it in action here.](http://www.gfycat.com/OilyPeskyBandicoot)

## Options

All options are passed via the second `options` parameter.

### Duration: `options.duration`

You can specify the duration of a dot (in ms). All other durations
(for dash, space) are made relative to this duration automatically.

Default dot duration is 200.

``` js
var morseBlink = require('tessel-morse');
morseBlink('hello world', { duration: 100 }); // dot duration now 100ms
```

### LED: `options.led`

You can specify the led to blink by index.
By default, `tessel.led[0]` (green led) is used.

``` js
var morseBlink = require('tessel-morse');
morseBlink('hello world', { led: 1 }); // blink blue led instead
```

## Contributing

Simply create an issue or send a pull request! :)

## License

MIT
