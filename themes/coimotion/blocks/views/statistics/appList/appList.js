ctrl.startup = function() {
	ctrl.sel(".hasApp").hide();
};

ctrl.setCa = function(caID, title) {
	var  rtnData = {caID:caID, title:title};
	ctrl.callHandler("reqEmbedCa", rtnData);
	
	ctrl.sel(".hasApp").show();
	ctrl.sel(".noApp").hide();
	ctrl.sel("li.wa").show();
	ctrl.sel("li."+caID).hide();
};
