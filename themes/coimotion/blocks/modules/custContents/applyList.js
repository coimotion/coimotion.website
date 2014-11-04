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
  var apiPath = '/wcoim/admin/wapp/useList/'+inData.appCode;
  // console.log('**apiPath:'+apiPath);

  engine.request(apiPath, modCtx, function(ctype, apiObj, isDone) {
    if (isDone) {
      apply.emit('done', apiObj);
    }
  });
};

module.exports = apply;
