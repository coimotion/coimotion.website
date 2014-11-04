var  isShowSelfInfo = 1;

ctrl.startup = function() {
	var  orgID = getOrgID(),
		params = {orgID:orgID};

	ctrl.embed('.selfRsList', '/custContents/rsList', {id:getAppCode(), params:params}, function(emCtrl) {
		emCtrl.addHandler("reqReloadRsList", ctrl.reloadRsList);
	});
/*
	var  path = {title:"自製內容", href:"/custContents/list/"+getOrgID()},
		subPath = [{subT:getAppCode()}];
	path.subPath = subPath;
	__.getCtrl("bkMenu").setPath(path);
	*/
};

ctrl.reloadRsList = function() {
	var  orgID = getOrgID(),
			params = {orgID:orgID};
	//ctrl.reload('/custContents/rsList', {id:getAppCode(), params:params}, ctrl.sel('.selfRsList'));
	ctrl.embed('.selfRsList', '/custContents/rsList', {id:getAppCode(), params:params}, function(emCtrl) {
		emCtrl.addHandler("reqReloadRsList", ctrl.reloadRsList);
	});
};

ctrl.loadSelfInfo = function() {
	if (isShowSelfInfo) {
		var  id = getAppCode();
		ctrl.embed('.selfInfo', '/custContents/info', {id: id});
		isShowSelfInfo = 0;
	}
};

function getAppCode() {
	return ctrl.sel('.selfInfo').attr("appCode");
}

function getOrgID() {
	return location.pathname.split('/').reverse()[0];
}
