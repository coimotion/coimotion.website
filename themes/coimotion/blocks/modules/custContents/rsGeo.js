var  path = require('path'),
	 EventEmitter = require('events').EventEmitter;

var  category = new EventEmitter(),
	 modCtx = {},
	 engine;

category.setContext = function setContext(ctx)  {
	for (var key in ctx) {
		modCtx[key] = ctx[key];
	}
	delete modCtx.basePath;

	engine = require( path.join(ctx.basePath, './api/ApiEngine.js'));
};

category.run = function run(inData, res)  {

	var apiPath = '/'+inData.ca+'/'+inData.appCode+'/'+inData.rs+'/list';

	modCtx._loc = inData._loc;

	engine.request(apiPath, modCtx, function(ctype, apiObj, isDone) {
		if (isDone) {
			if (apiObj.token)
				engine.setToken( res, apiObj.token );
			category.emit('done', apiObj);
		}
	});
};

module.exports = category;
