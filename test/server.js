var debug = require('debug');
debug.enable('mock-xhr-router');

var mockXhrRouter = require('mock-xhr-router');

module.exports = function(){
  var server = {
    sessions: [],
    apiKeys: {'ABC': true},
  };

  var router = mockXhrRouter();

  router.post('https://continuous-demo.herokuapp.com/api/:user/:app', function(req){
    if (!server.apiKeys[req.headers.api_key]){
      return {
        statusCode: 500,
        message: 'Invalid API KEY'
      };
    }
    server.sessions.push({
      user: req.params.user,
      app: req.params.app,
      frames: req.body.frames
    });

    return {};
  });

  return server;
}
