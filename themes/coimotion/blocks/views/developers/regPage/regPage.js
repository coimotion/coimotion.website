ctrl.startup = function() {
	__.getCtrl("menuMain").setSelected("developers/home");
	__.getCtrl("menuDevelopers").setSelected("developers/regPage");
	
	var pageID = 11;
  	$.post( '/developers/view.wsj/'+pageID, {}, function(data) {
    	var target = ctrl.sel('#pageView');
      	target.find('.h3').append(data.value.title);
      	target.find('.pageBody').append(data.value.body);
	});
	
};
/*
ctrl.doJoinNow = function() {
	var  pdata = collectData();
	
	var  msg ="";
	if (pdata.accName.length < 1) {
		msg += "請填寫您的電子郵件。\r\n";
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
	
	var  req = {url: '/core/user/register',
				post: pdata};
	
	__.api( req, function(data) {
		if (data.errCode === 0) {
			alert("註冊帳號成功。\r\n請至您的信箱收取驗證信件，並啟用您的帳號。");
			ctrl.sendMail(data.value.actID);
		}
		else
			alert( data.message );
	});
	
};

function  collectData()  {
	var  pdata = {accName: ctrl.sel('input[name="accName"]').val(),
				  fname: ctrl.sel('input[name="fname"]').val(),
				  passwd: ctrl.sel('input[name="passwd"]').val(),
				  passwd2: ctrl.sel('input[name="passwd2"]').val(),
				  email: ctrl.sel('input[name="accName"]').val(),
				  isNature: true,
				  roleID: 2};
	return  pdata;
};

ctrl.sendMail = function(actID) {
	var  pdata = collectData();
	pdata.from = "webmaster@gocharm.com.tw";
	pdata.to = pdata.accName;
	pdata.title = "coimotion帳號驗證";
	pdata.actID = actID;
	
	$.post( "/mail/accActivate.wsj", pdata, function(data) {
		window.location = '/user/login';
	});
};
*/