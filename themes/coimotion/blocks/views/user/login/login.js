ctrl.startup = function()  {
	ctrl.focusAccName();
};

ctrl.focusPw = function() {
	ctrl.sel('input[name=passwd]').focus();
};

ctrl.focusAccName = function () {
	ctrl.sel('input[name=accName]').focus();
};

ctrl.doLogin = function()  {
	var  pdata = {accName: ctrl.sel('input[name="accName"]').val(),
				  passwd: ctrl.sel('input[name="passwd"]').val()};
	
	if (pdata.accName.length === 0)  {
		alert('<%=ph.js_MAIL_EMPTY_ERR%>');
		ctrl.focusAccName();
		return;
	}
	
	if (pdata.passwd .length === 0)  {
		alert('<%=ph.js_PASSWD_EMPTY_ERR%>');
		ctrl.focusPw();
		return;
	}
		
	$.post('/user/doLogin.wsj', pdata, function(data)  {
		if (data.errCode === 0) {
			/*if (data.value.orgID)
				window.location = "/bkIndex/menu/"+data.value.orgID;
			else*/
			window.location = "/bkWrapper/manage";
		}
		else {
			alert( data.message );
			ctrl.focusAccName();
		}
	});
};

ctrl.reset = function()  {
	ctrl.sel('input[name="accName"]').val("");
	ctrl.sel('input[name="passwd"]').val("");
};