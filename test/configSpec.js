var config = require('../config');

describe('config', function(){
  it('throws an error if there is no window.__env__ set', function(){
    delete window.__env__;
    expect(config.getAuth).to.throw(Error, 'window.__env__ must be set to an object. Please use this module https://www.npmjs.com/package/karma-env-preprocessor and then configure your environment variables');
  
  });

  it('throws an error when DEMONSTRATOR_API_KEY has not been provided', function(){
    window.__env__ = {
      DEMONSTRATOR_USER: 'dereke',
      DEMONSTRATOR_APP: 'demonstrator'
    };
    expect(config.getAuth).to.throw(Error, 'Please set the environment variables `export DEMONSTRATOR_API_KEY=your-key`');
  });

  it('throws an error when DEMONSTRATOR_USER has not been provided', function(){
    window.__env__ = {
      DEMONSTRATOR_API_KEY: '123',
      DEMONSTRATOR_APP: 'demonstrator'
    };
    expect(config.getAuth).to.throw(Error, 'Please set the environment variables `export DEMONSTRATOR_USER=your-user-name`');
  });

  it('throws an error when DEMONSTRATOR_APP has not been provided', function(){
    window.__env__ = {
      DEMONSTRATOR_API_KEY: '123',
      DEMONSTRATOR_USER: 'dereke'
    };
    expect(config.getAuth).to.throw(Error, 'Please set the environment variables `export DEMONSTRATOR_APP=your-app`');
  });

  it('throws an error if no auth data available', function(){
    window.__env__ = {};
    expect(config.getAuth).to.throw(Error, 'Please set the environment variables `export DEMONSTRATOR_API_KEY=your-key DEMONSTRATOR_USER=your-user-name DEMONSTRATOR_APP=your-app`');
  });
});
