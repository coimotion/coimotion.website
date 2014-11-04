ctrl.embedEditor = function(geID) {
	// checkThisLocaleHasInfo(geID, doLoadEditor);
	doLoadEditor(geID);
};
ctrl.closeEditor = function() {
	ctrl.sel("#editorModal").modal('hide').on('hidden.bs.modal', function () {
		//ctrl.callHandler("reqReloadRsGeo");
		ctrl.callHandler("reqReloadRsTab", true);
	});
};

ctrl.delRs = function(geID, geTitle)  {
	var msg = "<%=ph.js_DEL_MSG%>: "+geTitle+" ?";
	if (confirm(msg)) {
		var  req = {url: getSrvPath()+'/delete/'+geID, post: {}, hasCA: true};
		__.api( req, function(data) {
		if (data.errCode === 0)
			//ctrl.callHandler("reqReloadRsGeo");
			ctrl.callHandler("reqReloadRsTab", true);
		else
			alert( data.message );
		});
	}
};

ctrl.showAddCnt = function(geID)  {
	var params = {"srvPath": getSrvPath(), "geID": geID};
	ctrl.embed('.addGeoCnt', '/custContents/addGeoCnt', {params: params}, function(emCtrl) {
		emCtrl.addHandler("regCloseAddGeoCnt", ctrl.closeAddCnt);
	});
};

ctrl.closeAddCnt = function() {
	ctrl.sel("#myModal").modal('hide').on('hidden.bs.modal', function () {
	//	ctrl.callHandler("reqReloadRsGeo");
		ctrl.callHandler("reqReloadRsTab", true);
	});
};

// function checkThisLocaleHasInfo(geID, cb) {
// 	var srvPath = getSrvPath(),
// 			params = { getAll: 1, _loc: getLocale() },
// 			req = { url: srvPath+'.page/list/'+geID, post: params, hasCA: 1 };
// 	__.api(req, function(data) {
// 		if (data.value.list[0])
// 			cb(rs ,geID, data.value.list[0].noCont);
// 		else
// 			cb(rs ,geID);
// 	});
// }

function doLoadEditor(geID, noCont) {
	var params = { "srvPath": getSrvPath(), "locale": getLocale() };
	// params.noCont = noCont;
	if (geID !== 'undefined')
		params.geID = geID;
	ctrl.embed('.editor', '/custContents/editor', {params: params}, function(emCtrl) {
		emCtrl.addHandler("reqCloseEditor", ctrl.closeEditor);
	});
}

function getOrgID() {
	return location.pathname.split('/').reverse()[0];
}
/* parameters of the geoLoc */
function getGEAttr(key) {
	return ctrl.sel('span#geo').attr(key)+"";
}
function getSrvPath() {
	return getGEAttr("ca") + '/' + getGEAttr("appCode") + '/' + getGEAttr("rs");
}
function getLocale() {
	return getGEAttr("locale");
}
