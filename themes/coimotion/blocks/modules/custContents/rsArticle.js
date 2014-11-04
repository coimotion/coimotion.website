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

	modCtx.att = "1";

	engine = require( path.join(ctx.basePath, './api/ApiEngine.js'));
};

category.run = function run(inData, res)  {

	var apiPath = '/'+inData.ca+'/'+inData.appCode+'/'+inData.rs+'/list';

	modCtx.att = "1";
	modCtx._loc = inData._loc;
	modCtx.getAll = 1;

	engine.request(apiPath, modCtx, function(ctype, apiObj, isDone) {
		if (isDone) {
			category.emit('done', apiObj);
		}
	});
};

module.exports = category;
