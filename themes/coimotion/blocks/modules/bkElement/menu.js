/*
var  path = require('path'),
   EventEmitter = require('events').EventEmitter;

var  apply = new EventEmitter(),
   modCtx = {},
   engine;

apply.setContext = function setContext(ctx)  {
  // modCtx = ctx;
  for (var key in ctx) {
    modCtx[key] = ctx[key];
  }
  delete modCtx.basePath;
  engine = require( path.join(ctx.basePath, './api/ApiEngine.js'));
};

apply.run = function run(inData, res)  {
  var apiPath = '/wcoim/admin/user/info';
  // console.log('**apiPath:'+apiPath);
  
  engine.request(apiPath, modCtx, function(ctype, apiObj, isDone) {
	if (isDone) {
      apiPath = '/wcoim/admin/user/profile';
      if (apiObj.value && apiObj.value.lastOrgID) {
    	  apiPath = apiPath+'/'+apiObj.value.lastOrgID;
	      engine.request(apiPath, modCtx, function(ctype_, apiObj_, isDone_) {
	    	  if (isDone_) {
	    		  apiObj.value.profile = apiObj_.value;
	    		  apply.emit('done', apiObj);
	    	  }
	      });
      }
      else {
    	  apply.emit('done', apiObj);
      }
    	
    }
  });
};

module.exports = apply;

*/