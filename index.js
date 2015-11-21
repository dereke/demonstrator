
module.exports = {
  record: function(browser, selector){
    var session = { 
      frames: [],
      save: function(){},
      display: function(parentDocument){
        var playback = parentDocument.createElement('div');
        playback.className = 'demonstrator';

        session.frames.forEach(function(frame){
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
      }
    }
    function capture(eventType){
      setTimeout(function(){
        session.frames.push({
          event: eventType,
          html: document.querySelector(selector).innerHTML 
        });
      }, 0);
    }
    session.browser = browser.on(function(e){
      if (e.element && e.text != undefined){
        e.element.setAttribute('value', e.text);
      }

      capture(e.type);
    });
    capture('initial');
    return session;
  }
}
