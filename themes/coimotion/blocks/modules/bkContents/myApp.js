var  EventEmitter = require('events').EventEmitter;

var  myApp = new EventEmitter();

myApp.run = function run(inData)  {
	var  result = {value: {"list":[
	                       {"caID":"1", "caCode":"coimotion", "title":"coimotion"},
	                       {"caID":"2", "caCode":"gocharmApp", "title":"高誠網路"},
	                       {"caID":"3", "caCode":"maLaYan", "title":"馬拉灣"},
	                       ]}
				  };
	myApp.emit('done', result);
};

module.exports = myApp;