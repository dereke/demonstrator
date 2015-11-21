# Demonstrator

Record the events and resulting html from a [browser-monkey](http://github.com/featurist/browser-monkey) session.

# Example

```
var demo = require('demonstrator');
var browser = require('browser-monkey');

describe('your awesome feature', function(){
  it('is a silver bullet', function(){
    var recorder = demo.record(browser);
    browser = recorder.browser;

    return browser.find('.some-element').click().then(function(){
      // do some more typing, clicking etc.
      // then:
      recorder.display();
      // or if you are running your tests in karma and want the results in the main window:
      recorder.display(window.parent.document);
    })
  });
});
```
