var  EventEmitter = require('events').EventEmitter;

var  detail = new EventEmitter();

detail.run = function run(inData)  {
	var  result = {value: {"list":[
	                        {"code":"page", "title":"靜態文章", "opList":[
	                    	   	{"code":"home", "title":"顯示首頁"}, 
	                    	   	{"code":"list", "title":"文章清單"},
	                    	   	{"code":"view", "title":"文章內容"}
	                    	]},
							{"code":"page2", "title":"靜態文章2", "opList":[
							    {"code":"home2", "title":"顯示首頁2"}, 
	          	                {"code":"list2", "title":"文章清單2"},
	          	                {"code":"view2", "title":"文章內容2"}
	          	            ]},
	          	            {"code":"page3", "title":"靜態文章3", "opList":[
	          	                {"code":"home3", "title":"顯示首頁3"}, 
	          	                {"code":"list3", "title":"文章清單3"},
	          	                {"code":"view3", "title":"文章內容3"}
	          	            ]}
	                     ]}
				  };
	detail.emit('done', result);
};

module.exports = detail;