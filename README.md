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

### On|Off: `options.on`|`options.off`

You can specify a custom function that will be called
when the signal is switched, for instance to trigger a relay.
By default, `tessel.ledOn` and `tessel.ledOff` (onboard led) 
are used.

``` js
var morseBlink = require('tessel-morse')
  , Relay = require('relay-mono')
  , relay = Relay.use(tessel.port['A']);
  

relay.on('ready', function ready() {
  morseBlink('hello world', { on: function on() {
    morse('hello world', {
      on: function on() {
        relay.turnOn(1)
      },
    
      off: function off() {
        relay.turnOff(1)
      }
    })
  });
}); 
```

## Contributing

Simply create an issue or send a pull request! :)

## License

MIT
