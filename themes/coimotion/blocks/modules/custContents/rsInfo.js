var  EventEmitter = require('events').EventEmitter;

var  list = new EventEmitter();

list.run = function run(inData)  {
	var  result = {"value": 
					 {"rsID":"101", "rs":"GocharmPage", "title":"高誠網站文章", "summary":"高誠官方網站文章", "rsParent":"cms/page", "rsInfo":"文章功能"}
					};
	list.emit('done', result);
};

module.exports = list;