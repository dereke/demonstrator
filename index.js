var Session = require('./session');

module.exports = {
  record: function(browser, selector){
    before(function(){
      this.sessions = [];
    });

    after(function(){
      this.timeout(this.sessions.length * 3000);
      var promises = [];
      this.sessions.forEach(function(session){
        promises.push(session.send());
      });
      return Promise.all(promises);
    });

    beforeEach(function(){
      this.session = Session.record(browser, selector);
    });

    afterEach(function(){
      this.sessions.push(this.session);
    });
  },

  recordSession: Session.record
}
