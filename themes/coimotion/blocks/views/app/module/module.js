ctrl.doUseMod = function(used, waID) {
	var  caID = ctrl.sel('.widget').attr('caID'),
		 pdata = {"used":used, "waID":waID},
	 	 req = {url: '/admin/capp/useApp/'+caID,
				post: pdata};

	__.api( req, function(data) {
		if (data.errCode === 0)
			ctrl.callHandler("reqReloadModule");
		else {
			alert( data.message );
			if (used === '1')
				ctrl.sel("input:checkbox[name="+waID+"]").prop("checked", false);
			else
				ctrl.sel("input:checkbox[name="+waID+"]").prop("checked", true);
		}
	});
};