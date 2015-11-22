var Session = require('./session');

module.exports = {
  record: function(browser, selector){
    var session = new Session(selector);
    session.browser = browser.on(function(e){
      if (e.element && e.text != undefined){
        e.element.setAttribute('value', e.text);
      }

      session.capture(e.type);
    });
    session.capture('initial');
    return session;
  }
}
