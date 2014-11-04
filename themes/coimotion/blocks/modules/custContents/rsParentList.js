var  EventEmitter = require('events').EventEmitter;

var  list = new EventEmitter();

list.run = function run(inData)  {
	var  result = {"value": 
						{"list":[
						       {"appName":"cms", "rsList":[{"rsCode":"page"},{"rsCode":"bus"},{"rsCode":"store"}]},
						       {"appName":"core", "rsList":[{"rsCode":"cPage"},{"rsCode":"cBus"},{"rsCode":"cStore"}]},
						       {"appName":"cimw", "rsList":[{"rsCode":"cimwPage"},{"rsCode":"cimwBus"},{"rsCode":"cimwStore"}]}
						       ]}
					};
	list.emit('done', result);
};

module.exports = list;