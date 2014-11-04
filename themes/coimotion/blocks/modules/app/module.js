var  EventEmitter = require('events').EventEmitter;

var  Info = new EventEmitter();

Info.run = function run(inData)  {
	var  result = {"value": 
						{"list":[
						         {"modID":"1", "code":"ecom", "title":"電子商務", "summary":"電子商務Summary說明說明說明", "isUsed":"1"},
						         {"modID":"2", "code":"akting", "title":"會計系統", "summary":"會計系統Summary說明說明說明說明說明說明", "isUsed":"0"}
						        ],
					     "name": "free"
						}
					};
	Info.emit('done', result);
};

module.exports = Info;