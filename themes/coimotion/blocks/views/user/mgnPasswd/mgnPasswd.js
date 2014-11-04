ctrl.startup = function() {
	ctrl.sel("input[name=oldPasswd]").focus();
	ctrl.sel(":password").keypress(function(e) {
		if (e.which == 13){
			var  inputs = ctrl.sel("form").find(":password");
			var  idx = inputs.index(this);
			if (idx == inputs.length - 1){ 
				ctrl.updatePw();
			}
			else {
				inputs[idx + 1].focus();
			}
			return false;
		}
	});
};

ctrl.updatePw = function () {
	var  pdata = collectData();
	var  re =  /^[\d|a-zA-Z0-9]+$/;
	
	if (pdata.newPasswd.length < 6 || !re.test(pdata.newPasswd)) {
		alert('<%=ph.js_PASSWORD_ERR%>');
		return;
	}
	
	if (pdata.newPasswd != pdata.newPasswd2) {
		alert('<%=ph.js_PSWD_NOT_MATCH_ERR%>');
		return;
	}
	
	if ( confirm('<%=ph.js_UPDATE_PSSWD_MSG%>')) {
		
		//處理密碼
		//var  accName = __.getCtrl("bkMenu").getAccName();
		var  accName = ctrl.sel(".coimParams").attr('acc');
		var  params = {accName:accName, _key:""},
		req = { url: '/admin/user/pwType',
				post:params};
		
		__.api( req, function(data) {
			if (data.errCode === 0) {
				if (data.value.pwType !== 1)
					pdata.oldPasswd = SHA1(SHA1(accName)+pdata.oldPasswd);
				pdata.newPasswd = SHA1(SHA1(accName)+pdata.newPasswd);
				pdata.newPasswd2 = SHA1(SHA1(accName)+pdata.newPasswd2);
				
				var  req = {url: '/admin/user/updPasswd',
						post: pdata};
				__.api( req, function(data) {
					if (data.errCode == 0) {
						alert("OK!");
						ctrl.sel('input[name="oldPasswd"]').val("");
						ctrl.sel('input[name="newPasswd"]').val("");
						ctrl.sel('input[name="newPasswd2"]').val("");
					}
					else
						alert( data.message );
				});
			}
		});
	}
};

function  collectData()  {
	var  pdata = {oldPasswd: ctrl.sel('input[name="oldPasswd"]').val(),
				  newPasswd: ctrl.sel('input[name="newPasswd"]').val(),
				  newPasswd2: ctrl.sel('input[name="newPasswd2"]').val()};
	
	return  pdata;
};