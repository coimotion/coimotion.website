var isShowAddCnt = 1;

ctrl.embedEditor = function(ngID, noCont) {
	var srvPath = getSrvPath();
	var params = { "srvPath": srvPath, "locale":getLocale(), "noCont":noCont, "disable": true};
	if (ngID !== 'undefined')
		params.ngID = ngID;
	
	ctrl.embed('.editor', '/custContents/editor', {params: params}, function(emCtrl) {
		emCtrl.addHandler("reqCloseEditor", ctrl.closeEditor);
	});
};
ctrl.closeEditor = function() {
	ctrl.sel("#editorModal").modal('hide').on('hidden.bs.modal', function () {
		ctrl.callHandler("reqReloadRsTab");
	});
};

ctrl.delRs = function(ngID, ngTitle)  {
	var msg = "<%=ph.js_DEL_MSG%>: "+ngTitle+" ?";
	if (confirm(msg)) {
		var  req = { url: getSrvPath()+'/delete/'+ngID, post: {}, hasCA: true };
		__.api( req, function(data) {
		if (data.errCode === 0)
			ctrl.callHandler("reqReloadRsTab");
		else
			alert( data.message );
		});
	}
};

function getOrgID() {
	return location.pathname.split('/').reverse()[0];
}
/* parameters of the article */
function getNGAttr(key) {
	return ctrl.sel('span#article').attr(key);
}
function getSrvPath() {
	return getNGAttr("ca") + '/' + getNGAttr("appCode") + '/' + getNGAttr("rs");
}
function getLocale() {
	return getNGAttr("locale");
}
