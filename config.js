module.exports.getAuth = function(){
  var env = window.__env__;
  if (!env){
    throw new Error('window.__env__ must be set to an object. Please use this module https://www.npmjs.com/package/karma-env-preprocessor and then configure your environment variables');
  }
  var missingVariables = [
    'DEMONSTRATOR_API_KEY',
    'DEMONSTRATOR_USER',
    'DEMONSTRATOR_APP'].filter(function(key){
    return !env[key];
  });

  if (missingVariables.length > 0){
    var example = {
      DEMONSTRATOR_API_KEY: 'your-key',
      DEMONSTRATOR_USER: 'your-user-name',
      DEMONSTRATOR_APP: 'your-app'
    };
    var missingMessage = missingVariables.map(function(name){
      return name+'='+example[name];
    }).join(' ');
    var errorMessage = 'Please set the environment variables `export '+missingMessage+'`';
    throw new Error(errorMessage);
  }

  return {
    api_key: env.DEMONSTRATOR_API_KEY,
    user:    env.DEMONSTRATOR_USER,
    app:     env.DEMONSTRATOR_APP
  };
}
