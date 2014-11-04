ctrl.startup = function()  {

	var req = {url: '/admin/user/info'};
	__.api( req, function(data) {
		if (data.errCode === 0) {
			/*
			var  link = "";
			if (data.value.lastOrgID) {
				link = "/bkIndex/menu/"+data.value.lastOrgID;
				ctrl.sel(".isMember").attr("orgID", data.value.lastOrgID);
			}
			else {
				link = "/bkIndex/menu";
				ctrl.sel(".isMember").attr("orgID", "");
			}
			*/
			var  link = '/bkWrapper/manage';
			/*自動登入*/
			if (location.pathname == "/member/login" || location.pathname == "/")
				window.location = link;

			ctrl.sel(".notMember").hide();
			ctrl.sel(".isMember").show();
			ctrl.sel(".isMember a").attr("href",link);
			ctrl.sel(".isMember span.dspName").html(data.value.dspName);
		}
		else {
			ctrl.delToken();
			ctrl.sel(".notMember").show();
			ctrl.sel(".isMember").attr("isMember", 0);
		}
	});

	ctrl.focusAccName();
};

ctrl.focusPw = function() {
	ctrl.sel('input[name=loginPasswd]').focus();
};

ctrl.focusAccName = function () {
	ctrl.sel('input[name=email]').focus();
};

ctrl.doLogin = function()  {
	var  pdata = {accName: ctrl.sel('input[name="email"]').val(),
				  passwd: ctrl.sel('input[name="loginPasswd"]').val(),
				  _key:null};

	if (pdata.accName == "")  {
		alert(ctrl.sel("._ERRORMSG").attr('paramsErr'));
		ctrl.focusAccName();
		ctrl.sel('input[name=loginPasswd]').val('');
		return;
	}

	if (pdata.passwd == "")  {
		alert(ctrl.sel("._ERRORMSG").attr('paramsErr'));
		ctrl.focusPw();
		return;
	}

	var params = {accName:pdata.accName, _key:""},
		req = { url: '/admin/user/pwType',
				post:params};
	__.api( req, function(data) {
		if (data.errCode === 0) {
			if (data.value.pwType !== 1) {
				//處理密碼
				pdata.passwd = SHA1(SHA1(pdata.accName)+pdata.passwd);
			}
			$.post('/user/doLogin.wsj', pdata, function(data)  {
				if (data.errCode === 0) {
					/*
					if (data.value.orgID)
						window.location = "/bkIndex/menu/"+data.value.orgID;
					else*/
					window.location = "/bkWrapper/manage";
				}
				else {
					alert(ctrl.sel("._ERRORMSG").attr('loginFail')+'\n\n'+ctrl.sel("._ERRORMSG").attr('loginFailPS'));
					ctrl.focusAccName();
					ctrl.sel('input[name=loginPasswd]').val('');
				}
			});
		}
		else
			alert(ctrl.sel("._ERRORMSG").attr('loginFail')+'\n\n'+ctrl.sel("._ERRORMSG").attr('loginFailPS'));
	});
		/*
	$.post('/user/doLogin.wsj', pdata, function(data)  {
		if (data.errCode === 0) {
			if (data.value.orgID)
				window.location = "/bkIndex/menu/"+data.value.orgID;
			else
				window.location = "/bkIndex/menu";
		}
		else {
			alert( data.message );
			ctrl.focusAccName();
			ctrl.sel('input[name=loginPasswd]').val('');
		}
	});*/
};

ctrl.reset = function()  {
	ctrl.sel('input[name="email"]').val("");
	ctrl.sel('input[name="loginPasswd"]').val("");
};

ctrl.getOrgID = function() {
	var orgID = ctrl.sel(".isMember").attr("orgID");
	return orgID;
};

ctrl.delToken = function() {
	var expires = new Date();
	expires.setTime (expires.getTime() - 1);
	document.cookie = "token=;expires=" + expires.toGMTString()+ ";" + "; path=/";
};
