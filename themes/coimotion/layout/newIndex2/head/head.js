var  view = 0;

ctrl.signUp = function() {
	ctrl.embed('.signup', '/coim/signup');
};

ctrl.login = function()  {

	if (view === 0) {
		var req = {url: '/admin/user/info'};
		__.api( req, function(data) {
			if (data.errCode === 0) {
				window.location = '/bkWrapper/manage';
			}
			else {
				ctrl.delToken();
				ctrl.sel("ul.login").show();
				view = 1;
				//ctrl.sel(".isMember").attr("isMember", 0);
				ctrl.focusAccName();
			}
		});
	}
	else {
		ctrl.sel("ul.login").hide();
		view = 0;
	}

	
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
		alert('<%=ph.js_PARAMS_ERR%>');
		ctrl.focusAccName();
		ctrl.sel('input[name=loginPasswd]').val('');
		return;
	}

	if (pdata.passwd == "")  {
		alert('<%=ph.js_PARAMS_ERR%>');
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
					window.location = "/bkWrapper/manage";
				}
				else {
					alert('<%=ph.js_LOGIN_FAIL%>'+'\n\n'+'<%=ph.js_LOGIN_FAIL_PS%>');
					ctrl.focusAccName();
					ctrl.sel('input[name=loginPasswd]').val('');
				}
			});
		}
		else
			alert('<%=ph.js_LOGIN_FAIL%>'+'\n\n'+'<%=ph.js_LOGIN_FAIL_PS%>');
	});
};

ctrl.reset = function()  {
	ctrl.sel('input[name="email"]').val("");
	ctrl.sel('input[name="loginPasswd"]').val("");
};


ctrl.delToken = function() {
	var expires = new Date();
	expires.setTime (expires.getTime() - 1);
	document.cookie = "token=;expires=" + expires.toGMTString()+ ";" + "; path=/";
};