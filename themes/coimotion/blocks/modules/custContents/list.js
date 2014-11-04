var  EventEmitter = require('events').EventEmitter;

var  list = new EventEmitter();

list.run = function run(inData)  {
	var  result = {"value": 
						{"list":[
						         {"appID":"1", "appCode":"myBusData", "title":"BusData", "summary":"BusDataSummarySummarySummary"},
						         {"appID":"2", "appCode":"myTravelData", "title":"TravelData", "summary":"TravelDataSummary說明"}
						        ]}
					};
	list.emit('done', result);
};

module.exports = list;