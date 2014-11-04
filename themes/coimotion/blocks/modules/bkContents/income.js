var  EventEmitter = require('events').EventEmitter;

var  income = new EventEmitter();

income.run = function run(inData)  {
	var  result = {value : {"list":[
	                       {"code":"ticket0", "title":"ticketTitle0", "summary":"ticketSummary0", "gain":"500", "status":"0"},
	                       {"code":"ticket1", "title":"ticketTitle1", "summary":"ticketSummary1", "gain":"1000", "status":"1"},
	                       {"code":"ticket2", "title":"ticketTitle2", "summary":"ticketSummary2", "gain":"500", "status":"2"},
	                       {"code":"ticket3", "title":"ticketTitle3", "summary":"ticketSummary3", "gain":"1000", "status":"3"},
	                       {"code":"ticket4", "title":"ticketTitle4", "summary":"ticketSummary4", "gain":"500", "status":"4"},
	                       {"code":"ticket5", "title":"ticketTitle5", "summary":"ticketSummary5", "gain":"1000", "status":"0"},
						]}
				  };
	income.emit('done', result);
};

module.exports = income;