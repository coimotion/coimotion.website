var  EventEmitter = require('events').EventEmitter;

var  list = new EventEmitter();

list.run = function run(inData)  {
	var  result = {"value": 
						{"list":[
						         {"rsID":"101", "rs":"GocharmPage", "title":"高誠網站文章", "summary":"高誠官方網站文章", "rsParent":"cms/page", "rsInfo":"文章功能"},
						         {"rsID":"102", "rs":"GocharmBus", "title":"高誠公車", "summary":"高誠官方公車資訊", "rsParent":"cms/bus", "rsInfo":"公車功能"},
						         {"rsID":"103", "rs":"GocharmStore", "title":"高誠商店", "summary":"高誠官方商店資訊", "rsParent":"cms/store", "rsInfo":"商店功能"}
						        ]}
					};
	list.emit('done', result);
};

module.exports = list;