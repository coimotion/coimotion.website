ctrl.byWa = function(waCode){
	ctrl.callHandler("reqSetWaMenuParams", ctrl.getWaList());
	ctrl.callHandler("reqEmbedWa", waCode);
};

ctrl.getWaList = function() {
	var  waList = ctrl.sel('td.wa'),
		 rtnList = [],
		 index = 0;
	
	waList.each( function() {
		var name = $(this).attr("waCode");
		if (rtnList.indexOf(name) == -1) {
			rtnList.push(name);
        }
	});
	/*
	waList.each( function() {
		var name = $(this).attr("waCode");
		rtnList[index] = name;
		index++;
	});*/
	return rtnList;
};

