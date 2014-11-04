var  EventEmitter = require('events').EventEmitter;

var  Info = new EventEmitter();

Info.run = function run(inData)  {
	var  result = {"value": 
						{"orgID":"2",
						 "orgCode":"GocharmCoimotion",
					     "title": "coimotion",
					     "docBody": "團隊介紹GOCHARM"
						}
				  };
	Info.emit('done', result);
};

module.exports = Info;