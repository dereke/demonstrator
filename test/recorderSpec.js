var expect = require('chai').expect;
var browser = require('browser-monkey');
var demonstrator = require('../');

function mountApp(){
  while(document.body.childNodes.length > 0){
    document.body.removeChild(document.body.lastChild);
  } 
  var plastiq = require('plastiq');
  var h = plastiq.html;

  function render(model){
    function setMessage(){
      model.upperCaseMessage = model.message.toUpperCase();
    }
    return <div class="test">
      <h1>{model.upperCaseMessage || ''}</h1>
      <input type="text" binding={[model, 'message']} />
      <button onclick={setMessage}>set message</button>
    </div>;
  };

  plastiq.append(document.body, render, {}, {requestRender: setTimeout});
}

describe('recorder', function(){
  it('records a browser-monkey test', function(){
    mountApp();

    var recorder = demonstrator.record(browser, '.test');
    browser = recorder.browser;
    return browser.find('input').typeIn('hello world').then(function(){
      return browser.find('button').click();
    }).then(function(){
      return browser.find('h1').shouldHave({text: 'HELLO WORLD'});
    }).then(function(){
      var frames = recorder.frames;
      expect(frames.length).to.equal(3);
      expect(frames[0].event).to.equal('initial');
      expect(frames[1].event).to.equal('typing');
      expect(frames[2].event).to.equal('click');
      expect(frames[0].html).to.equal('<h1></h1><input type="text"><button>set message</button>');
      expect(frames[1].html).to.equal('<h1></h1><input type="text" value="hello world"><button>set message</button>');
      expect(frames[2].html).to.equal('<h1>HELLO WORLD</h1><input type="text" value="hello world"><button>set message</button>');
      recorder.display(document);

      return browser.find('.demonstrator .frame').shouldHave({length: 3}).then(function(){
        return browser.find('.demonstrator .frame .heading').shouldHave({text: ['initial', 'typing', 'click']});
      }).then(function(){
        return browser.find('.demonstrator .frame .html').shouldHave({html: [frames[0].html, frames[1].html, frames[2].html]});
      });
    });
  });
});
