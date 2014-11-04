var  EventEmitter = require('events').EventEmitter;

var  op = new EventEmitter();

op.run = function run(inData)  {
	var  result = { "value":
						{"list":[
					         {"waID":"1", "appCode":"myBusData", "title":"BusData", "summary":"BusDataSummarySummarySummary"},
					         {"waID":"2", "appCode":"myTravelData", "title":"TravelData", "summary":"TravelDataSummary說明"},
					         {"waID":"3", "appCode":"test003", "title":"高鐵時刻表查詢", "summary":"TravelDataSummary說明"}
					        
					         ]}
					};
	op.emit('done', result);
};

module.exports = op;