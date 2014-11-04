var  path = require('path'),
   EventEmitter = require('events').EventEmitter;

var  editor = new EventEmitter(),
   modCtx = {},
   engine;

// editor.setContext = function setContext(ctx)  {
//   console.log('ctx is here! '+JSON.stringify(ctx));
//   for(var key in ctx) {
//     // console.log('key: '+key);
//     modCtx[key] = ctx[key];
//   }
//   modCtx = ctx;
//   engine = require( path.join(ctx.basePath, './api/ApiEngine.js'));
// };
//
editor.run = function run(inData, res, site)  {
//   console.log('module indata:'+JSON.stringify(inData));
// //	var  apiPath = '/wcoim/cms/page/list';
//   /*	if someone undefined,
//   *	default path: '/wcoim/cms/page/list'
//   */
//   if (inData.appCode === 'undefined') {
//     inData.ca = 'admin';
//     inData.appCode = 'cms';
//     inData.rs = 'page';
//   }
//   inData.hasCA = 1;
//   console.log('module indata:'+JSON.stringify(inData));
//
//   var apiPath = '/'+inData.ca+'/'+inData.appCode+'/'+inData.rs+'/view/'+inData.ngID;
//   modCtx.icon = 1;
//   modCtx.pic = 1;
//   modCtx.att = 1;
//   modCtx.geo = 1;
//   engine.request(apiPath, modCtx, function(ctype, apiObj, isDone) {
//     console.log('res:'+res);
//     console.log('ctype:'+ctype+'\nisDone:'+isDone);
//     console.log('apiPath:'+apiPath+'\nmodCtx:'+JSON.stringify(modCtx)+'\napiObj:'+JSON.stringify(apiObj));
//     if (isDone) {
//       // if (apiObj.token)
//       //   engine.setToken( res, apiObj.token );
//       // if (modCtx.token)
//       //   engine.setToken( res, apiObj.token );
//
//       editor.emit('done', apiObj);
//     }
//   });
	var  result = {"value":
						{"list":[
						         {"rs":"ptt","title":"Ptt"},
						         {"rs":"Location","title":"Location"},
						         {"rs":"receipt","title":"食譜"},
						         {"rs":"sport","title":"運動"},
						         {"rs":"other","title":"其他"}
								]}
					};
	editor.emit('done', result);
};

module.exports = editor;
