var isShowRsInfo = 1;
var isShowOpControl = 1;

ctrl.startup = function() {
	
	ctrl.embedOpList();
	
	/*設定路徑提示*/
	/*var  path = {title:"自製內容", href:"/custContents/list/"+getOrgID()},
		 subHref = "/custContents/manage/"+getOrgID()+"?appCode="+getAppCode(),
	 	 subPath = [{subT:getAppCode(), href:subHref}, {subT:getRs()}];
	path.subPath = subPath;
	__.getCtrl("bkMenu").setPath(path);*/
};

ctrl.embedOpList = function() {
	var  appCode = getAppCode(),
	 	 rs = getRs();
	var  id = appCode+"."+rs,
		 params = {"appCode": appCode, "rs": rs, "orgID": getOrgID()};
	
	ctrl.embed('.opList', '/custContents/opList', {id: id, params: params}, function(emCtrl) {
		emCtrl.addHandler("regReloadOpList", ctrl.reloadOpList);
		emCtrl.addHandler("regReloadOpControl", ctrl.reloadOpControl);
	});
};

ctrl.reloadOpList = function() {
	ctrl.sel(".modal").modal("hide");
	ctrl.embedOpList();
	/*
	var  appCode = getAppCode(),
		 rs = getRs();
	ctrl.reload("/custContents/opList", {"id":appCode+"."+rs}, ctrl.sel('.opList'));
	*/
};

ctrl.showRsInfo = function()  {
	if (isShowRsInfo) {
		var  appCode = getAppCode(),
			 rs = getRs();
		var  id = appCode+"."+rs,
			 params = {"appCode": appCode, "rs": rs, "orgID": getOrgID()};
		
		ctrl.embed('.rsInfo', '/custContents/rsInfo', {id: id, params: params}, function(emCtrl) {
			emCtrl.addHandler("regReloadOpList", ctrl.reloadOpList);
		});
		isShowRsInfo = 0;
	}
};

ctrl.embedOpControl = function() {
	var  appCode = getAppCode(),
		 rs = getRs();
	var  id = appCode+"."+rs,
		 params = {"appCode": appCode, "rs": rs, "orgID": getOrgID()};
	
	ctrl.embed('.opControl', '/custContents/opControl', {id: id, params: params});
};

ctrl.showOpControl = function()  {
	if (isShowOpControl) {
		ctrl.embedOpControl();
		isShowOpControl = 0;
	}
};

ctrl.reloadOpControl = function() {
	ctrl.embedOpControl();
	/*
	var  appCode = getAppCode(),
		 rs = getRs();
	var  id = appCode+"."+rs,
	 	 params = {"appCode": appCode, "rs": rs};
	
	ctrl.reload("/custContents/opControl", {id: id, params: params}, ctrl.sel('.opControl'));
	*/
};

function getAppCode() {
	return ctrl.sel('.rsManageParams').attr("appCode");
}

function getRs() {
	return ctrl.sel('.rsManageParams').attr("rs");
}

function getOrgID() {
	return ctrl.sel('.rsManageParams').attr("orgID");
}