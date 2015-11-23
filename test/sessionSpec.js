var startServer = require('./server');
var Session = require('../session');

describe('session', function(){
  it('sends a recorded session to the server', function(){
    var server = startServer();
    var session = new Session();
    session.auth = {
      api_key: 'ABC',
      user: 'dereke',
      app: 'demonstrator'
    };
    session.frames.push({event: 'initial', html: '<div>Hello World</div>'});
    session.frames.push({event: 'click', html: '<div>Goodbye</div>'});

    return session.send().then(function(res){
      expect(server.sessions).to.eql([
        {user: 'dereke', app: 'demonstrator', frames: [
          {event: 'initial', html: '<div>Hello World</div>'},
          {event: 'click', html: '<div>Goodbye</div>'}
        ]}
      ]);
    });
  });
});
