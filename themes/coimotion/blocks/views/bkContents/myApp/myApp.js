ctrl.selApp = function (caID, caCode) {
	//alert("caID:"+caID+");
	window.location = location.pathname+"?caID="+caID+"&caCode="+caCode;
};

ctrl.showInfo = function(caID) {
	$('#infoModal').modal('show');
	ctrl.embed('.appInfo', '/app/info', {"id":caID}, function(emCtrl) {
		emCtrl.addHandler("regCloseInfo", ctrl.closeInfo);
	});
};

ctrl.closeInfo = function() {
	$('#infoModal').modal('hide').on('hidden.bs.modal', function () {
		//ctrl.reload("/app/list", {"id":location.pathname.split('/').reverse()[0]});
		window.location = "/app/list/"+location.pathname.split('/').reverse()[0];
	});
};
