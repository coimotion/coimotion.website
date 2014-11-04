var  EventEmitter = require('events').EventEmitter;

var  Info = new EventEmitter();

Info.run = function run(inData)  {
	var  result = {"value": 
						{"appID":"1", "appCode":"myBusData", "title":"BusData", "descTx":"busDataSummarySummarySummary"}
				  };
	Info.emit('done', result);
};

module.exports = Info;