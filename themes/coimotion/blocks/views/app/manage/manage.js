var  isShowAppInfo = 1;

ctrl.startup = function() {

	ctrl.embedModule();
/*
	var  path = {title:"APP管理", href:"/app/list/"+getID()},
			subPath = [{subT:ctrl.sel('.matter').attr("title")}];
	path.subPath = subPath;
	__.getCtrl("bkMenu").setPath(path);*/
};

ctrl.embedModule = function() {
	var title = ctrl.sel('.matter').attr("title");
	ctrl.embed('.appModule', '/app/module', {id:getCaID(), params:{orgID:getID(), title:title}}, function(emCtrl) {
		emCtrl.addHandler("reqReloadModule", ctrl.reloadModule);
	});
};

ctrl.reloadModule = function() {
	ctrl.embedModule();
	//ctrl.reload("/app/module", {"id": getCaID()}, ctrl.sel('.appModule'));
};

function  getCaID() {
	return ctrl.sel(".appModule").attr("caID");
}
function  getID() {
	var  uri = location.pathname,
		temp = uri.split('/');
	return temp[temp.length-1];
};
