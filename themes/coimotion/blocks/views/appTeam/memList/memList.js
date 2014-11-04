ctrl.startup = function() {
	/*如果不是管理者，則無法使用任何功能*/
	var  position = __.getCtrl("bkMenu").getPosition();
	if (position != 'manager') {
		ctrl.sel('button.isManage').hide();
		ctrl.sel('a.isManage').hide();
	}
};

ctrl.delMember = function(psnID, dspName) {
	var  msg = ctrl.sel('._MSG').attr('dismissMemberMsg');
	if(confirm(msg+": "+dspName+" ?")) {
		var  pdata = {"psnID": psnID},
			id = getID();

		req = {url: '/admin/appTeam/delMember/'+id,
				post: pdata};

		__.api( req, function(data) {
			if (data.errCode == 0)
				ctrl.callHandler("reqReloadMemList");
			else
				alert(data.message);
		});
	}
};

ctrl.cfmMember = function(psnID, accept)  {
	var  pdata = {"psnID": psnID, "accept": accept},
		id = getID();

	$.post('/appTeam/cfmMember.wsj/'+id, pdata, function(data)  {
		if (data.errCode === 0)  {
			// alert( "OK" );
			ctrl.callHandler("reqReloadMemList");

		}
		else
			alert( data.message );
	});
};


function getID() {
	return  uri = location.pathname.split('/').reverse()[0];
};

ctrl.showAddMem = function ()  {
	ctrl.embed(".addMember", "/appTeam/addMember", {} , function(emCtrl) {
		emCtrl.addHandler("regCloseAddMem", ctrl.closeAddMem);
	});
};

ctrl.closeAddMem = function ()  {
	$("#myModal").modal('hide').on('hidden.bs.modal', function () {
		ctrl.callHandler("reqReloadMemList");
	});
};

ctrl.showUpdPosition = function (psnID, position)  {
	var  params = {psnID:psnID, orgID:getID(), defPosition:position};
	ctrl.embed(".updPosition", "/appTeam/updPosition", {params:params} , function(emCtrl) {
		emCtrl.addHandler("regCloseUpd", ctrl.closeUpd);
	});
};

ctrl.closeUpd = function() {
	$(".modal").modal('hide').on('hidden.bs.modal', function () {
		ctrl.callHandler("reqReloadMemList");
	});
};
