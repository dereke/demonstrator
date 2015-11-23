var httpism = require('httpism');

function Session(selector){
  this.frames   = [];
  this.selector = selector;
}

Session.prototype.capture = function(eventType){
  var frames   = this.frames;
  var selector = this.selector;

  setTimeout(function(){
    frames.push({
      event: eventType,
      html: document.querySelector(selector).innerHTML
    });
  }, 0);
};

Session.prototype.display = function(parentDocument){
  var playback = parentDocument.createElement('div');
  playback.className = 'demonstrator';

  this.frames.forEach(function(frame){
    var frameEl = parentDocument.createElement('div');
    frameEl.className = 'frame';

    var heading = parentDocument.createElement('h1');
    heading.className = 'heading';
    heading.innerHTML = frame.event;
    frameEl.appendChild(heading);

    var content = parentDocument.createElement('div');
    content.className = 'html';
    content.innerHTML = frame.html;
    frameEl.appendChild(content);

    playback.appendChild(frameEl);
  })
  parentDocument.body.appendChild(playback);
};

Session.prototype.send = function(){
  var url = '/api/'+this.auth.user+'/'+this.auth.app;
  var body = {
    frames: this.frames
  };
  var options = {
    headers: {
      api_key: this.auth.api_key
    }
  };
  return httpism.post(url, body, options);
};

module.exports = Session;
