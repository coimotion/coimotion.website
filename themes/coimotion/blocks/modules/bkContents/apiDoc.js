var  EventEmitter = require('events').EventEmitter;

var  detail = new EventEmitter();

detail.run = function run(inData)  {
	var  result = {value: {"list":[
	                        {"code":"page", "title":"靜態文章", "opList":[
	                    	   	{"code":"home", "title":"顯示首頁", "doc":
		                    	   	{
		                    	   		"id": {"en": "page identifier.", 
		                    	   			   "zh": "網頁識別碼。如果未給定，則由系統選出該內容類別的「預設」網頁。所謂「預設」網頁是指顯示順序被設為1的網頁。如果顯示順序未被設定，則顯示該內容類別第一個被建立的網頁。"},
		                    	   		"descTx": {"en": "",
		                    	   				   "zh": ""},
		                    	   		"query": [
		                    	   		        {"key": "geo", 
		                    	   		         "descTx": {"en": "Returning geo-locations related to this page.", "zh": "要求系統同時傳回相關的地理資訊"}},
		                    	   		        {"key": "time", 
		                    	   			     "descTx": {"en": "Returning time related info of this page.", "zh": "要求系統同時傳回相關的時間資訊"}}],
		                    	   		"out": [
		                    	   		        {"key": "title", "descTx": {"en": "Page title", "zh": "網頁的標題"}},
		                    	   		        {"key": "summary", "descTx": {"en": "Summary of abstract of the page.", "zh": "網頁的簡短說明或引文"}}]
		                    	   	}
	                    	   	}, 
	                    	   	{"code":"list", "title":"文章清單", "doc":
		                    	   	{
		                    	   		"id": {"en": "page identifier.", 
		                    	   			   "zh": "網頁識別碼。如果未給定，則由系統選出該內容類別的「預設」網頁。所謂「預設」網頁是指顯示順序被設為1的網頁。如果顯示順序未被設定，則顯示該內容類別第一個被建立的網頁。"},
		                    	   		"descTx": {"en": "",
		                    	   				   "zh": ""},
		                    	   		"query": [
		                    	   		        {"key": "geo", 
		                    	   		         "descTx": {"en": "Returning geo-locations related to this page.", "zh": "要求系統同時傳回相關的地理資訊"}},
		                    	   		        {"key": "time", 
		                    	   			     "descTx": {"en": "Returning time related info of this page.", "zh": "要求系統同時傳回相關的時間資訊"}}],
		                    	   		"out": [
		                    	   		        {"key": "title", "descTx": {"en": "Page title", "zh": "網頁的標題"}},
		                    	   		        {"key": "summary", "descTx": {"en": "Summary of abstract of the page.", "zh": "網頁的簡短說明或引文"}}]
		                    	   	}
	                    	   	},
	                    	   	{"code":"view", "title":"文章內容", "doc": {
		                    	   		"id": {"en": "page identifier.", 
		                    	   			   "zh": "網頁識別碼。如果未給定，則由系統選出該內容類別的「預設」網頁。所謂「預設」網頁是指顯示順序被設為1的網頁。如果顯示順序未被設定，則顯示該內容類別第一個被建立的網頁。"},
		                    	   		"descTx": {"en": "",
		                    	   				   "zh": ""},
		                    	   		"query": [
		                    	   		        {"key": "geo", 
		                    	   		         "descTx": {"en": "Returning geo-locations related to this page.", "zh": "要求系統同時傳回相關的地理資訊"}},
		                    	   		        {"key": "time", 
		                    	   			     "descTx": {"en": "Returning time related info of this page.", "zh": "要求系統同時傳回相關的時間資訊"}}],
		                    	   		"out": [
		                    	   		        {"key": "title", "descTx": {"en": "Page title", "zh": "網頁的標題"}},
		                    	   		        {"key": "summary", "descTx": {"en": "Summary of abstract of the page.", "zh": "網頁的簡短說明或引文"}}]
		                    	   	}
	                    	   	}
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