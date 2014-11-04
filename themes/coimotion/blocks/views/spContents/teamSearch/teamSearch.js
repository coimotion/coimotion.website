ctrl.searchTeam = function() {
	ctrl.embedTeamShList();
};

ctrl.embedTeamShList = function() {
	ctrl.embed(".teamShListBlock", "/spContents/teamShList", {}, function(emCtrl) {
		emCtrl.addHandler("reqShowTeamDetail", ctrl.showTeamDetail);
		emCtrl.addHandler("reqShowInvite", ctrl.showInvite);
	});
};

ctrl.showTeamDetail = function() {
	ctrl.callHandler("reqShowTeamDetail");
};

ctrl.showInvite = function() {
	ctrl.callHandler("reqShowInvite");
};