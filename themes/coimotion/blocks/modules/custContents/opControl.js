var  EventEmitter = require('events').EventEmitter;

var  list = new EventEmitter();

list.run = function run(inData)  {
	var  result = {"value": 
						{"list":[
						         {"opID":"111", "op":"list", "title":"文章清單", "summary":"文章清單", "opParent":"cms/page/list",
						        	 "control":[{"roleId":"2","isgranted":"true"},{"roleId":"3","isgranted":"true"},
						        	            {"roleId":"4","isgranted":"true"},{"roleId":"5","isgranted":"true"},
						        	            {"roleId":"6","isgranted":"true"}]},
						         {"opID":"112", "op":"view", "title":"顯示文章", "summary":"顯示文章", "opParent":"cms/page/view",
						        	 "control":[{"roleId":"2","isgranted":true},{"roleId":"3","isgranted":true},
						        	            {"roleId":"4","isgranted":true},{"roleId":"5","isgranted":true},
						        	            {"roleId":"6","isgranted":true}]},
						         {"opID":"113", "op":"edit", "title":"編輯文章", "summary":"編輯文章", "opParent":"cms/page/edit",
						        	 "control":[{"roleId":"2","isgranted":true},{"roleId":"3","isgranted":"false"},
						        	            {"roleId":"4","isgranted":false},{"roleId":"5","isgranted":false},
						        	            {"roleId":"6","isgranted":false}]},
		        	             {"opID":"114", "op":"update", "title":"更新文章", "summary":"更新文章", "opParent":"cms/page/update",
						        	 "control":[{"roleId":"2","isgranted":true},{"roleId":"3","isgranted":true},
						        	            {"roleId":"4","isgranted":false},{"roleId":"5","isgranted":false},
						        	            {"roleId":"6","isgranted":false}]}
						        ]}
					};
	list.emit('done', result);
};

module.exports = list;