ctrl.go = function(uri) {
	var  orgID = __.getCtrl("bkMenu").getOrgID();
	if (orgID && orgID != 'null') {
		window.location = uri+"/"+orgID;
	}
	else {
		window.location = uri;
	}
};

ctrl.goDoc = function(appCode) {
	var  orgID = __.getCtrl("bkMenu").getOrgID(),
		 uri = '/bkContents/detail';
	if (orgID && orgID != 'null') {
		window.location = uri+"/"+orgID+'?appCode='+appCode;
	}
	else
		window.location = uri+'?appCode='+appCode;
};