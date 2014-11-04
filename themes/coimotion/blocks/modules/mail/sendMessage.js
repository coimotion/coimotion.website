var  EventEmitter = require('events').EventEmitter;

var  Info = new EventEmitter();

Info.run = function run(inData)  {
	var  result = {"value":{"title":"寄送通知信件"}
					};
	Info.emit('done', result);
};

module.exports = Info;