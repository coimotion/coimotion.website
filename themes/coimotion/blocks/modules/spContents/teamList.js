var  EventEmitter = require('events').EventEmitter;

var  Info = new EventEmitter();

Info.run = function run(inData)  {
	var  result = {"value": {"list":[
								{"orgID": "1", "orgCode": "gocharm001", "name":"GO001", "status":"1"},
								{"orgID": "2", "orgCode": "gocharm002", "name":"GO002", "status":"2"},
								{"orgID": "3", "orgCode": "gocharm003", "name":"GO003", "status":"3"},
								{"orgID": "4", "orgCode": "gocharm004", "name":"GO004", "status":"0"}
							]}
				  };
	Info.emit('done', result);
};

module.exports = Info;