var  appListClose = 1;

ctrl.startup = function() {
	__.getCtrl("spLeftMenu").selMenu("spContents");
	
	ctrl.embedTeamList();
};

ctrl.embedTeamList = function() {
	ctrl.embed(".tab-content #c1", "/spContents/teamList", {}, function(emCtrl) {
		emCtrl.addHandler("reqShowTeamDetail", ctrl.showTeamDetail);
	});
};

ctrl.embedAppList = function() {
	if (appListClose) {
		ctrl.embed(".tab-content #c2", "/spContents/appList", {}, function(emCtrl) {
			emCtrl.addHandler("reqShowAppDetail", ctrl.showAppDetail);
		});
		appListClose = 0;
	}
};

ctrl.embedAppSearch = function() {
	ctrl.embed(".appSearch", "/spContents/appSearch", {}, function(emCtrl) {
		emCtrl.addHandler("reqShowAppDetail", ctrl.showAppDetail);
		emCtrl.addHandler("reqShowInvite", ctrl.showInvite);
	});
};

ctrl.embedTeamSearch = function() {
	ctrl.embed(".teamSearch", "/spContents/teamSearch", {}, function(emCtrl) {
		emCtrl.addHandler("reqShowTeamDetail", ctrl.showTeamDetail);
		emCtrl.addHandler("reqShowInvite", ctrl.showInvite);
	});
};

ctrl.showTeamDetail = function() {
	ctrl.embed(".teamDetail", "/spContents/teamDetail", {}, function(emCtrl) {
		emCtrl.addHandler("reqShowInvite", ctrl.showInvite);
	});
	ctrl.sel("#teamDetail").modal('show');
};

ctrl.showAppDetail = function() {
	ctrl.embed(".appDetail", "/spContents/appDetail", {}, function(emCtrl) {
		emCtrl.addHandler("reqShowInvite", ctrl.showInvite);
	});
	ctrl.sel("#appDetail").modal('show');
};

ctrl.showInvite = function() {
	ctrl.embed(".invite", "/spContents/invite");
	ctrl.sel("#invite").modal('show');
};