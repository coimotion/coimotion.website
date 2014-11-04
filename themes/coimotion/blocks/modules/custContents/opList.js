var  EventEmitter = require('events').EventEmitter;

var  list = new EventEmitter();

list.run = function run(inData)  {
	var  result = {"value": 
						{"list":[
						         {"opID":"111", "op":"list", "title":"文章清單", "summary":"文章清單", "opParent":"cms/page/list"},
						         {"opID":"112", "op":"view", "title":"顯示文章", "summary":"顯示文章", "opParent":"cms/page/view"},
						         {"opID":"113", "op":"edit", "title":"編輯文章", "summary":"編輯文章", "opParent":"cms/page/edit"}
						        ]}
					};
	list.emit('done', result);
};

module.exports = list;