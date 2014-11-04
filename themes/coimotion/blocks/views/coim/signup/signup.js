var  orgCode, caCode;

ctrl.startup = function() {
	ctrl.focusFname();
};

ctrl.doJoin = function() {
	orgCode = ctrl.sel('#orgCode.active').val();
	caCode = ctrl.sel('#caCode.active').val();
	
	if (orgCode || caCode) {
		var re =  /^[\d|a-zA-Z0-9]+$/;
		if (orgCode && !re.test(orgCode)) {
			alert('<%=ph.js_CODE_ERR%>');
			return;
		}
		if (caCode && !re.test(caCode)) {
			alert('<%=ph.js_CODE_ERR%>');
			return;
		}
		
		var  pdata = {org: orgCode, ca: caCode},
			 req = {url: '/admin/user/fastCheck', post: pdata};
		__.api( req, function(data) {
			if (data.errCode === 0) {
				ctrl.doJoinNow();
			}
			else {
				alert( data.message );
				ctrl.focusAccNme();
				ctrl.clearPw();
			}
		});
	}
	else
		ctrl.doJoinNow();
};

ctrl.doJoinNow = function() {
	var  pdata = collectData();
	var re =  /^[\d|a-zA-Z0-9]+$/;
	
	if (pdata.fname.length < 1) {
		alert('<%=ph.js_NAME_EMPTY_ERR%>');
		ctrl.clearPw();
		ctrl.focusFname();
		return;
	}
	
	if (pdata.accName.length < 1) {
		alert('<%=ph.js_MAIL_EMPTY_ERR%>');
		ctrl.clearPw();
		ctrl.focusAccNme();
		return;
	}

	if (pdata.passwd.length < 6 || !re.test(pdata.passwd)) {
		alert('<%=ph.js_PASSWORD_ERR%>');
		ctrl.clearPw();
		ctrl.focusPw();
		return;
	}

	if (pdata.passwd2 != pdata.passwd) {
		alert('<%=ph.js_PSWD_NOT_MATCH_ERR%>');
		ctrl.clearPw();
		ctrl.focusPw();
		return;
	}
	
	var  freeRegister = '<%=ph.sign%>',
		 waiting = '<%=ph.js_WAITING%>';
	
	ctrl.sel('button.regBtn').html(waiting);

	pdata._key = "";
	pdata.passwd = SHA1(SHA1(pdata.accName)+pdata.passwd);
	pdata.passwd2 = SHA1(SHA1(pdata.accName)+pdata.passwd2);

	var  req = {url: '/core/user/register',
				post: pdata};

	orgCode = ctrl.sel('#orgCode.active').empty().val();
	caCode = ctrl.sel('#caCode.active').empty().val();
	
	__.api( req, function(data) {
		if (data.errCode === 0) {
			actSerial = data.value.actID;
			
			if (orgCode)
				actSerial += '&' + orgCode;
			else
				actSerial += '&';
			
			if (caCode)
				actSerial += '&' + caCode;
			else
				actSerial += '&';

			ctrl.sendMail(actSerial);
		}
		else if(data.errCode === -4) {/*Database error*/
			alert('<%=ph.js_MAIL_USED_ERR%>');
			ctrl.focusAccNme();
			ctrl.clearPw();
			ctrl.sel('button.regBtn').html(freeRegister);
		}
		else {
			alert( data.message );
			ctrl.focusAccNme();
			ctrl.clearPw();
			ctrl.sel('button.regBtn').html(freeRegister);
		}
	});
};

function  collectData()  {
	var  pdata = {accName: ctrl.sel('input[name="accName"]').val(),
					fname: ctrl.sel('input[name="fname"]').val(),
					passwd: ctrl.sel('input[name="passwd"]').val(),
					passwd2: ctrl.sel('input[name="passwd2"]').val(),
					isNature: true,
					roleID: 5};
	return  pdata;
};

ctrl.sendMail = function(actID) {
	var  pdata = collectData();
	pdata.from = "webmaster@gocharm.com.tw";
	pdata.to = pdata.accName;
	pdata.title = '<%=ph.js_EMAIL_TITLE%>'; /*email的標題*/
	pdata.actID = actID;
	pdata.email = pdata.accName;

	$.post( "/mail/accActivate.wsj", pdata, function(data) {
		console.log(JSON.stringify(data));
		var  msg = '<%=ph.js_REG_SUCC%>' +'\n\n'+ '<%=ph.js_CONFIRM_EMAIL%>';
		alert(msg);
		window.location = '/';
	});
};

ctrl.focusAccNme = function() {
	ctrl.sel('input[name=accName]').focus();
};

ctrl.focusFname = function() {
	ctrl.sel('input[name=fname]').focus();
};

ctrl.focusPw = function() {
	ctrl.sel('input[name=passwd]').focus();
};

ctrl.focusPw2 = function() {
	ctrl.sel('input[name=passwd2]').focus();
};

ctrl.focusOrg = function() {
	ctrl.sel('input[name=orgCode]').focus();
};

ctrl.focusCa = function() {
	ctrl.sel('input[name=caCode]').focus();
};

ctrl.clearPw = function() {
	ctrl.sel('input[name=passwd]').val('');
	ctrl.sel('input[name=passwd2]').val('');
};
