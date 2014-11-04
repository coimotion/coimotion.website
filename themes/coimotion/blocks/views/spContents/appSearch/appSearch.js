ctrl.startup = function() {
	ctrl.sel("input[name=appkey]").focus();
};

ctrl.searchApp = function() {
	ctrl.embedAppShList();
};

ctrl.embedAppShList = function() {
	ctrl.embed(".appShListBlock", "/spContents/appShList", {}, function(emCtrl) {
		emCtrl.addHandler("reqShowAppDetail", ctrl.showAppDetail);
		emCtrl.addHandler("reqShowInvite", ctrl.showInvite);
	});
};

ctrl.showAppDetail = function() {
	ctrl.callHandler("reqShowAppDetail");
};

ctrl.showInvite = function() {
	ctrl.callHandler("reqShowInvite");
};