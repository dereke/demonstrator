# Demonstrator

Record the events and resulting html from a [browser-monkey](http://github.com/featurist/browser-monkey) session.

# Example
## Record a single test

```
var demo = require('demonstrator');
var browser = require('browser-monkey');

describe('your awesome feature', function(){
  it('is a silver bullet', function(){
    var recorder = demo.recordSession(browser);

    return browser.find('.some-element').click().then(function(){
      // do some more typing, clicking etc.
      // then:
      recorder.send();
    })
  });
});
```
## Record all tests

```
var demo = require('demonstrator');
var browser = require('browser-monkey');

demo.record(browser);

describe('your awesome feature', function(){
  it('is a silver bullet', function(){
    return browser.find('.some-element').click().then(function(){
      // do some more typing, clicking etc.
      // after the tests run the session will be sent to the server
    })
  });
});
```
