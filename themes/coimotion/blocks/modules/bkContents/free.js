var  EventEmitter = require('events').EventEmitter;

var  free = new EventEmitter();

free.run = function run(inData)  {
	var  result = {"value": 
						{"list":[
						         {"code":"bus", "title":"kuBus", "summary":"busSummary", "gain":"0", "status":"0"},
						         {"code":"travel", "title":"travelTitle", "summary":"travelSummary", "gain":"0", "status":"1"},
						         {"code":"bus22", "title":"kuBus22", "summary":"busSummary22", "gain":"0", "status":"2"},
						         {"code":"travel33", "title":"travelTitle33", "summary":"travelSummary33", "gain":"0", "status":"3"},
						         {"code":"bus44", "title":"kuBus44", "summary":"busSummary44", "gain":"0", "status":"4"},
						         {"code":"travel55", "title":"travelTitle55", "summary":"travelSummary55", "gain":"0", "status":"0"}
						        ],
	                     "name": "free"
						}
				  };
	free.emit('done', result);
};

module.exports = free;