ctrl.startup = function()  {
	/*如果不是管理者，則無法編輯APP資訊*/
	var position = __.getCtrl("bkMenu").getPosition();

	if (position != 'manager') {
		ctrl.sel('button.isManage').hide();
		ctrl.sel('textarea').prop('disabled', true);
		ctrl.sel('input[name="title"]').prop('disabled', true);
		ctrl.sel('.stopApp a').hide();
	}

	// ctrl.sel('.tip').tooltip('hide');
	ctrl.sel('.tip').popover('hide');

	showFbInfo(1); //FB
	showFbInfo(2); //Google
	
	/*設定動態高度*/
	$('.modal-body').height($(window).height() - 190);
};

ctrl.unlock  = function()  {
	var  isLock = ctrl.sel(".caCode").find("input").attr("disabled");
	if ( isLock ) {
		ctrl.sel(".caCode").find("input").prop("disabled", false);
		ctrl.sel(".stopApp").find("i").removeClass("icon-ban-circle").addClass("icon-ok-circle");
	}
	else {
		ctrl.sel(".caCode").find("input").prop("disabled", true);
		ctrl.sel(".stopApp").find("i").removeClass("icon-ok-circle").addClass("icon-ban-circle");
	}
};

ctrl.update = function()  {
	var  pdata = collectData();

	var re =  /^[\d|a-zA-Z0-9]+$/;
	
	if (pdata.caCode && (!re.test(pdata.caCode) || pdata.caCode.length < 6)) {
		alert('<%=ph.js_CACORD_ERR%>');
		return;
	}
	
	if (pdata.title.length === 0) {
		alert('<%=ph.js_TITLE_ERR%>');
		return;
	}

	var  id = ctrl.sel("form").attr("caID");
	$.post('/app/update.wsj/'+id, pdata, function(data)  {
		if (data.errCode === 0)  {
			// alert( "OK" );
			ctrl.sel(".caCode").find("input").attr("disabled", true);
			ctrl.sel(".stopApp").find("i").removeClass("icon-ok-circle").addClass("icon-ban-circle");
			ctrl.callHandler('regCloseInfo');
		}
		else
			alert( data.message );
	});

	saveFbInfo(1);
	saveFbInfo(2);
};

function showFbInfo(wsite) {
	var id = ctrl.sel("form").attr("caID"),
			req = { "url": '/admin/capp/fbInfo/'+id, post: {wsite: wsite} };
	__.api(req, function(data) {
		if (data.errCode === 0) {
			var  target = null;
			if (wsite == 1)
				target = ctrl.sel('#facebook');
			else if (wsite == 2)
				target = ctrl.sel('#google');
			
			target.find('input[name="appCode"]').val(data.value.appCode);
			target.find('input[name="appID"]').val(data.value.appID);
			target.find('input[name="secret"]').val(data.value.appSecret);
		}
	});
};

function saveFbInfo(wsite) {

	if (wsite == 1)
		target = ctrl.sel('#facebook');
	else if (wsite == 2)
		target = ctrl.sel('#google');
	
	var pdata= { code: target.find('input[name="appCode"]').val(),
				  id: target.find('input[name="appID"]').val(),
				  secret: target.find('input[name="secret"]').val(),
				  wsite: wsite};
	
	if (pdata.code || pdata.id || pdata.secret) {
		var id = ctrl.sel("form").attr("caID"),
				req = { "url": '/admin/capp/setFbInfo/'+id, post: pdata };
		__.api(req, function(data) {
			if (data.errCode === 0)
				console();
			else
				alert(data.message);
		});
	}
};

function  collectData()  {
	var  pdata = {title: ctrl.sel('input[name="title"]').val(),
					descTx: ctrl.sel('textarea[name="descTx"]').val(),
					locID: ctrl.sel('select[name="locID"]').val()};

	var  isLock = ctrl.sel('.caCode').find('input').attr('disabled');

	if ( !isLock )
		pdata.caCode = ctrl.sel('input[name="caCode"]').val();

	return  pdata;
};

