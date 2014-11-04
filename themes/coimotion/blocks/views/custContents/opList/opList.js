ctrl.startup = function() {
	var  position = __.getCtrl("bkMenu").getPosition();
	if (position != 'manager') {
		ctrl.sel('button.delBtn').hide();
	}
};

ctrl.showAddOp = function() {
	var  opListParams = ctrl.sel(".opListParams"),
	 	 appCode = opListParams.attr("appCode"),
	 	 rs = opListParams.attr("rs"),
	 	 params = {"appCode":appCode, "rs":rs};
	ctrl.embed('.addOp', '/custContents/addOp', {params:params}, function(emCtrl) {
		emCtrl.addHandler("regReloadOpList", ctrl.reloadOpList);
		emCtrl.addHandler("regEmbedOpParentList", ctrl.incOpParentList);
	});
};

ctrl.reloadOpList = function() {
	ctrl.sel('#myModal').modal('hide').on('hidden.bs.modal', function () {
		ctrl.callHandler("regReloadOpList");
		ctrl.callHandler("regReloadOpControl");
	});
};

ctrl.showOpInfo = function(op) {
	var  opListParams = ctrl.sel(".opListParams"),
		 appCode = opListParams.attr("appCode"),
		 rs = opListParams.attr("rs"),
		 orgID = opListParams.attr("orgID"),
		 id = appCode +"."+ rs +"."+ op;
	
	opListParams.attr("op",op);  /*記錄開啟的op，reload時會用到*/
	
	var  params = {"appCode":appCode, "rs":rs, "op":op, "orgID": orgID};
	
	
	ctrl.embed('.opInfoBody', '/custContents/opInfo', {id: id, params: params}, function(emCtrl) {
		emCtrl.addHandler("regEmbedOpParentList", ctrl.incOpParentList);
		emCtrl.addHandler("regCloseInfo", ctrl.closeInfo);
	});
	
};

ctrl.closeInfo = function ()  {
	ctrl.sel('#myModal2').modal('hide').on('hidden.bs.modal', function () {
		ctrl.callHandler("regReloadOpList");
	});
};

ctrl.deleteOp = function(op, opName) {
	var  msg = '<%=ph.js_DEL_MSG%>: '+opName+" ?";
	if (confirm(msg)) {
		var  opListParams = ctrl.sel(".opListParams"),
			 appCode = opListParams.attr("appCode"),
			 rs = opListParams.attr("rs"),
			 id = appCode +"."+ rs +"."+ op,
			 req = {url: '/admin/wop/delete/'+id};
		
		__.api( req, function(data) {
			if (data.errCode === 0) {
				//alert("OK");
				ctrl.callHandler("regReloadOpList");
				ctrl.callHandler("regReloadOpControl");
			}
			else
				alert( data.message );
		});
	}
};

ctrl.incOpParentList = function() {
	var  form = ctrl.sel(".opListParams"),
		 orgID = form.attr("orgID"),
		 appCode = form.attr("appCode"),
		 rs = form.attr("rs");
		 
	var  params = {"appCode":appCode, "rs":rs/*, "op":op*/};

	ctrl.embed('.opParentList', '/custContents/opParentList', {/*id: orgID,*/ params: params}, function(emCtrl) {
		emCtrl.addHandler("reqCloseOpParent", ctrl.closeOpParentOfInfo);
		emCtrl.addHandler("reqCloseOpParent", ctrl.closeOpParentOfAdd);
	});
};

/*功能元基本資料用到*/
ctrl.closeOpParentOfInfo = function (pdata)  {
	ctrl.sel("#myModal3").modal('hide');

	var  target = ctrl.sel('.opInfoBody').find('.opParent'),
		 pOpPath = pdata.pOpPath;
	
	target.attr("pOpPath", pOpPath);
	target.attr("changeOpPath", true);
	if (pOpPath != "") {
		var  tempS = pOpPath.split(".");
		target.empty().html(tempS[0]+"/"+tempS[1]+"/"+tempS[2]);
	}
	else
		target.empty();
};

/*新增功能元用到*/
ctrl.closeOpParentOfAdd = function (pdata)  {
	ctrl.sel("#myModal3").modal('hide');
	console.log(pdata);
	var  target = ctrl.sel('.modal .addOp').find('.opParent'),
		 pOpPath = pdata.pOpPath;
	
	target.attr("pOpPath", pOpPath);
	target.attr("changeOpPath", true);
	if (pOpPath != "") {
		var  tempS = pOpPath.split(".");
		target.empty().html(tempS[0]+"/"+tempS[1]+"/"+tempS[2]);
	}
	else
		target.empty();
};