ctrl.startup = function() {
	//var  path = {title:"APP管理"};
	//subPath = [{subT:"APP清單"}];
	//path.subPath = subPath;
	//__.getCtrl("bkMenu").setPath(path);
};

ctrl.showAdd = function() {
	var position = __.getCtrl("bkMenu").getPosition();

	if (position === 'manager') {
		$('#myModal').modal('show');
		ctrl.embed('.appAdd', "/app/add", {}, function(emCtrl) {
			emCtrl.addHandler("regCloseAdd", ctrl.closeAdd);
		});
	}
	else
		alert(ctrl.sel('._MSG').attr('notMangerErr'));
};

ctrl.closeAdd = function() {
	$('#myModal').modal('hide').on('hidden.bs.modal', function () {
		window.location = "/app/list/"+location.pathname.split('/').reverse()[0];
	});
};

ctrl.showInfo = function(caID) {
	$('#infoModal').modal('show');
	ctrl.embed('.appInfo', '/app/info', {"id":caID}, function(emCtrl) {
		emCtrl.addHandler("regCloseInfo", ctrl.closeInfo);
	});
};

ctrl.closeInfo = function() {
	$('#infoModal').modal('hide').on('hidden.bs.modal', function () {
		window.location = "/app/list/"+location.pathname.split('/').reverse()[0];
	});
};
