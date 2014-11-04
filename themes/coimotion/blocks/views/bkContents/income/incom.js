ctrl.setUseApp = function(waID, isUsed, appName) {
	if(!isUsed) {
		var  msg = '<%=ph.js_CANCEL_SEL%>'+appName+" ?";
		if(confirm(msg))
			ctrl.doUseApp(waID, isUsed);
	}
	else
		ctrl.doUseApp(waID, isUsed);
};


ctrl.doUseApp = function(waID, isUsed) {

	var  caID = ctrl.sel(".widget").attr("caID");
	
	if (caID == 'undefined') {
		alert('<%=ph.js_SELECT_APP%>');
		return;
	}

	var  pdata = {"waID":waID, "used":isUsed};

	var req = {url: '/admin/capp/useApp/'+caID,
			post: pdata};

	__.api( req, function(data) {
		if (data.errCode === 0) {
			// alert("OK");
			ctrl.callHandler("reqReloadIncome");
		}
		else
			alert( data.message );
	});

};
