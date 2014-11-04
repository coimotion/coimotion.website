var isShowTeamList = 1;

ctrl.startup = function() {

	/*查看是不是登入狀態，記錄自己的psnID*/
	var req = {url: '/admin/user/info'};
	__.api( req, function(data) {
		if (data.errCode != 0 || data.value.isGuest)
			window.location = "/";
		else {
			ctrl.sel('.accInfo').attr("accName", data.value.accName);
			ctrl.sel('.navbar-header').attr('psnID',data.value.psnID);
			ctrl.sel('span.dspName').html(data.value.dspName);

			/*如果沒有orgID且user/profile沒有value，則踢出後台*/
			/*如果有orgID，但沒有權限，則踢出後台*/
			var  isMem = ctrl.sel('.navbar-header').attr('isMem');
			if (isMem == 'no') {
				ctrl.doLogout();
			}
		}
	});

};

ctrl.showTeamList = function(orgID)  {
	if (isShowTeamList) {
		ctrl.embed('.teamMenu', '/bkIndex/teamList', {params: {'oid': orgID, 'psnID': ctrl.getPsnID()}});
		isShowTeamList = 0;
	}
};

ctrl.doLogout = function() {
	var req = {url: '/core/user/logout'};

	__.api( req, function(data) {
		if (data.errCode === 0) {
			ctrl.delToken();
			window.location = "/";
		}
		else
			alert( data.message );
	});
};

ctrl.delToken = function() {
	var expires = new Date();
	expires.setTime (expires.getTime() - 1);
	document.cookie = "token=;expires=" + expires.toGMTString()+ ";" + "; path=/";
};

ctrl.getPosition = function() {
	return ctrl.sel('.headParams').attr('position');
};

ctrl.getPsnID = function() {
	return ctrl.sel('.navbar-header').attr('psnID');
};

ctrl.getOrgCode = function() {
	return ctrl.sel('.headParams').attr('orgCode');
};

ctrl.getAccName = function() {
	return ctrl.sel('.accInfo').attr('accName');
};
