var  EventEmitter = require('events').EventEmitter;

var  list = new EventEmitter();

list.run = function run(inData)  {
	var  result = {"value": 
						{"list":[
						       {"appName":"cms", "rsList":[
						    	   {"rsCode":"page", "list": [
						    	        {"op":"plistOfCms"},{"op":"pviewOfCms"},{"op":"peditOfCms"}
						    	   ]},
						    	   {"rsCode":"bus", "list": [
						    	        {"op":"blistOfCms"},{"op":"bviewOfCms"},{"op":"beditOfCms"}
						    	   ]},
						    	   {"rsCode":"store", "list":[
						    	        {"op":"slistOfCms"},{"op":"sviewOfCms"},{"op":"seditOfCms"}
						    	   ]}
						       ]},
						       {"appName":"core", "rsList":[
						    	   {"rsCode":"corePage", "list": [
						    	         {"op":"cplist"},{"op":"cpview"},{"op":"cpedit"}
						    	   ]},
						    	   {"rsCode":"coreBus", "list": [
						    	         {"op":"cblist"},{"op":"cbview"},{"op":"cbedit"}
						    	   ]},
						    	   {"rsCode":"coreStore", "list":[
						    	         {"op":"cslist"},{"op":"csview"},{"op":"csedit"}
						    	   ]}
						       ]},
						       {"appName":"cimw", "rsList":[
						    	   {"rsCode":"cimwPage", "list": [
						    	         {"op":"cimwplist"},{"op":"cimwpview"},{"op":"cimwpedit"}
						    	   ]},
						    	   {"rsCode":"cimwBus", "list": [
						    	         {"op":"cimwBlist"},{"op":"cimwBview"},{"op":"cimwBedit"}
						    	   ]},
						    	   {"rsCode":"cimwStore", "list":[
						    	         {"op":"cimwSlist"},{"op":"cimwSview"},{"op":"cimwSedit"}
						    	   ]}
						       ]},
						]}
				};
	list.emit('done', result);
};

module.exports = list;