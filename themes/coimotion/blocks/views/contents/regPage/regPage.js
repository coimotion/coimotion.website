/*
ctrl.startup = function() {
	__.getCtrl("menuMain").setSelected("contents/view/5");
	__.getCtrl("menuContents").setSelected("contents/regPage");
	
	var  pageID = 7;
  	$.post( '/contents/view.wsj/'+pageID , {}, function(data) {
    	var target = ctrl.sel('#pageView');
      	target.find('.h3').append(data.value.title);
      	target.find('.pageBody').append(data.value.body);
	});
};

ctrl.doRegister = function() {
	var  pdata = collectData();
	
	var  msg ="";
	if (pdata.accName.length < 1) {
		msg += "請填寫帳號(信箱)。\r\n";
	}
	
	if (pdata.fname.length < 1) {
		msg += "請填寫您的姓名。\r\n";
	}
	
	if (pdata.passwd.length < 1) {
		msg += "密碼尚未設定。\r\n";
	}
	
	if (pdata.passwd2.length < 1) {
		msg += "確認密碼尚未設定。";
	}
	
	if (msg != "") {
		alert(msg);
		return;
	}
	
	var req = { url: '/core/user/register',
				post: pdata};
	
	__.api( req, function(data) {
		if (data.errCode === 0) {
			alert("註冊帳號成功。");
			window.location = '/user/login';
		}
		else
			alert( data.message );
	});
};


function  collectData()  {
	var  isDev = ctrl.sel('input:checked[name="developer"]').val();
	var  roleID = 3;
	if (isDev)
		roleID = 2;
	var  pdata = {accName: ctrl.sel('input[name="accName"]').val(),
				  fname: ctrl.sel('input[name="fname"]').val(),
				  passwd: ctrl.sel('input[name="passwd"]').val(),
				  passwd2: ctrl.sel('input[name="passwd2"]').val(),
				  email: ctrl.sel('input[name="accName"]').val(),
				  isNature: true,
				  roleID: roleID};
	return  pdata;
};
*/