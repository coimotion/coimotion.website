var isShowAddRs = 1;

ctrl.startup = function() {
	var  position = __.getCtrl("bkMenu").getPosition();
	if (position != 'manager') {
		ctrl.sel('button.delBtn').hide();
	}
};

ctrl.delRs = function(appCode, rs, rsName)  {
	var msg = "<%=ph.js_DEL_MSG%>: "+rsName+" ?";
	if (confirm(msg)) {
		var  req = {url: '/admin/wrs/delete/'+appCode+"."+rs};

		__.api( req, function(data) {
		if (data.errCode === 0)
			ctrl.callHandler("reqReloadRsList");
		else
			alert( data.message );
		});
	}
};

ctrl.showAddRs = function()  {
	var target = '.addRs';
	if (isShowAddRs) {
		var  appCode = ctrl.sel(target).attr("appCode");
		var  id = appCode;

		ctrl.embed('.addRs', '/custContents/addRs', {id: id, params: {'target': target}}, function(emCtrl) {
			emCtrl.addHandler("regCloseAddRs", ctrl.closeAddRs);
			emCtrl.addHandler("regShowRsParentList", ctrl.incRsParentList);
		});
		isShowAddRs = 0;
	}
};

ctrl.showRsInfo = function(appCode, rs, orgID) {
	// $('#basicModal').modal('show');
	// ctrl.embed('.rsInfo', '/custContents/rsInfo', {params: {appCode: appCode}}, function(emCtrl) {
	// 	emCtrl.addHandler("regCloseRsInfo", ctrl.closeInfo);
	// });
	var target = '.rsInfo',
			id = appCode+"."+rs,
			params = {"appCode": appCode, "rs": rs, "orgID": orgID, "target": target};
	$('#basicModal').modal('show');
	ctrl.embed(target, '/custContents/rsInfo', {id: id, params: params}, function(emCtrl) {
		emCtrl.addHandler("regCloseRsInfo", ctrl.closeRsInfo);
		emCtrl.addHandler("regShowRsParentList", ctrl.incRsParentList);
	});
};

ctrl.closeAddRs = function() {
	ctrl.sel(".modal").modal('hide').on('hidden.bs.modal', function () {
		ctrl.callHandler("reqReloadRsList");
		//alert('ok');
	});
};

ctrl.closeRsInfo = function() {
	$('#basicModal').modal('hide').on('hidden.bs.modal', function () {
		// window.location = "/custContents/manage/"+location.pathname.split('/').reverse()[0];
		// custContents/manage/7755?appCode=bustime
		ctrl.callHandler("reqReloadRsList");
	});
};

ctrl.incRsParentList = function(target) {
	var  appCode = ctrl.sel("form").attr("appCode"),
		 rs = ctrl.sel('input[name="rs"]').val();
	var  params = {"appCode":appCode, "rs":rs, "target":target};

	$(".rsParentModal").modal('show');
	ctrl.embed('.rsParentList', '/custContents/rsParentList', {/*id: orgID,*/ params: params}, function(emCtrl) {
		emCtrl.addHandler("regChooseRs", ctrl.setInherit);
	});
};

ctrl.setInherit = function(pdata) {
	$('.rsParentModal').modal('hide').on('hidden.bs.modal', function () {
		/*新增後才更新繼承*/
		ctrl.sel('.rsParent').attr('changeRsPath', true);
		var  target = ctrl.sel('.modal '+pdata.el+' .rsParent'),
		 	 pRsPath = pdata.pRsPath;

		target.attr('rsParent',pRsPath);
		if (pRsPath != "") {
			var  tempS = pRsPath.split(".");
			target.empty().html(tempS[0]+"/"+tempS[1]);
		}
		else
			target.empty();
	});
};
