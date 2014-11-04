var  path = require('path'),
   EventEmitter = require('events').EventEmitter;

var  qa = new EventEmitter(),
   modCtx,
   engine;

qa.setContext = function setContext(ctx)  {
  modCtx = ctx;
  engine = require( path.join(ctx.basePath, './api/ApiEngine.js'));
};

qa.run = function run(inData, res)  {
  console.log('module indata:'+JSON.stringify(inData));
  var apiPath = '/wcoim/coim/contactUs/backList';
  engine.request(apiPath, modCtx, function(ctype, apiObj, isDone) {
    // console.log('res:'+JSON.stringify(res));
    // console.log('ctype:'+ctype+'\nisDone:'+isDone);
    // console.log('apiPath:'+apiPath+'\nmodCtx:'+JSON.stringify(modCtx)+'\napiObj:'+JSON.stringify(apiObj));
    if (isDone) {
      // if (apiObj.token)
      // 	engine.setToken( res, apiObj.token );

        //site.viewIt( renderQ, srvObj, apiObj );
      if (apiObj.list) {
        apiObj.value = {};
        apiObj.value.list = apiObj.list;
      }
      // console.log( 'apiObj:' + JSON.stringify(apiObj) );
      qa.emit('done', apiObj);
    }
  });
};

module.exports = qa;
