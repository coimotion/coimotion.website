var  EventEmitter = require('events').EventEmitter;

var  Info = new EventEmitter();

Info.run = function run(inData)  {
	var  result = {"value": 
						{"appID":"1", "caCode":"busApp", "title":"kuBusAPP", "descTx":"busSummarySummarySummary", "download":"12320", "all":"865230"}
				  };
	Info.emit('done', result);
};

module.exports = Info;