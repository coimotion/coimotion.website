/*
ctrl.doLogin = function()  {
	var  pdata = {accName: ctrl.sel('input[name="accName"]').val(),
				  passwd: ctrl.sel('input[name="passwd"]').val()};
	
	if (pdata.accName == "")  {
		alert("Email(帳號)不可空白");
		return;
	}
	
	if (pdata.passwd == "")  {
		alert("密碼不可空白");
		return;
	}
		
	$.post('/user/doLogin.wsj', pdata, function(data)  {
		if (data.errCode === 0) {
			//if (data.value.orgID)
			//	window.location = "/bkIndex/menu/"+data.value.orgID;
			//else
			window.location = "/bkWrapper/manage";
		}
		else
			alert( data.message );
	});
};

ctrl.reset = function()  {
	ctrl.sel('input[name="accName"]').val("");
	ctrl.sel('input[name="passwd"]').val("");
};
*/