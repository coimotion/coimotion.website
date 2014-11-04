var  EventEmitter = require('events').EventEmitter;

var  Info = new EventEmitter();

Info.run = function run(inData)  {
	var  result = {"value": {"list":[
								{"psnID": "1", "name": "陳圈圈", "position":"2"},
								{"psnID": "2", "name": "陳方芳", "position":"5"},
								{"psnID": "3", "name": "陳角角", "position":"5"},
								{"psnID": "4", "name": "丁允允"}
							]}
				  };
	Info.emit('done', result);
};

module.exports = Info;