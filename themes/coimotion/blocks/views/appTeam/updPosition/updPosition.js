ctrl.startup = function() {
	var  defPosition = ctrl.sel('.modal-body').attr('defPosition');
	ctrl.sel("input:checkbox[name="+defPosition+"]").prop('checked', true);
	
	/*自己不可以把自己的權限改成dev*/
	var  defPsn = __.getCtrl("bkMenu").getPsnID(),
		 editPsn = ctrl.sel(".modal-body").attr("psnID");
	if (defPsn == editPsn)
		ctrl.sel('tr.psnIsMain').hide();
};

ctrl.updateMember = function() {
	var  orgID = ctrl.sel(".modal-body").attr("orgID"),
		 psnID = ctrl.sel(".modal-body").attr("psnID"),
		 position = ctrl.sel("input:checkbox:checked").val();
		 pdata = {"psnID": psnID, "position":position};

	var  req = {url: '/admin/appTeam/updMember/'+orgID,
			post: pdata};

	__.api( req, function(data) {
		if (data.errCode == 0)
			ctrl.callHandler("regCloseUpd");
		else
			alert(data.message);
	});
};

ctrl.setChecked = function(position) {
	 ctrl.sel("input:checkbox").prop('checked', false); 
	 ctrl.sel("input:checkbox[name="+position+"]").prop('checked', true); 
};