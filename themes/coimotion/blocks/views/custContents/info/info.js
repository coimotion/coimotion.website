ctrl.unlock  = function()  {
	var  isLock = ctrl.sel(".appCode").find("input").attr("disabled");
	if ( isLock ) {
		ctrl.sel(".appCode").find("input").attr("disabled", false);
		ctrl.sel(".stopApp").find("i").removeClass("icon-ban-circle").addClass("icon-ok-circle");
	}
	else {
		ctrl.sel(".appCode").find("input").attr("disabled", true);
		ctrl.sel(".stopApp").find("i").removeClass("icon-ok-circle").addClass("icon-ban-circle");
	}
};

ctrl.update = function()  {
	var  pdata = collectData();

	/* 暫不開放更改
	if (pdata.appCode && pdata.appCode.length < 6) {
		alert("代碼至少需六碼");
		return;
	}*/

	if (pdata.title.length === 0) {
		alert('<%=ph.js_TITLE_ERR%>');
		return;
	}

	var  appCode = ctrl.sel("form").attr("appCode");
	$.post('/custContents/update.wsj/'+appCode, pdata, function(data)  {
		if (data.errCode === 0)  {
			// console.log(pdata);
			if (pdata.appCode)
				window.location = "/custContents/manage/"+getID()+"?appCode="+pdata.appCode;
			else {
				//alert("OK");
				ctrl.sel(".appCode").find("input").attr("disabled", true);
				ctrl.sel(".stopApp").find("i").removeClass("icon-ok-circle").addClass("icon-ban-circle");
				ctrl.callHandler('regCloseInfo');
			}
		}
		else
			alert( data.message );
	});
};

function  collectData()  {
	var  pdata = {title: ctrl.sel('input[name="title"]').val(),
					descTx: ctrl.sel('textarea[name="descTx"]').val(),
					isPub : ctrl.sel('input:checked[name="isPub"]').val(),
					isFree: ctrl.sel('input:checked[name="isFree"]').val()};

	var  isLock = ctrl.sel(".appCode").find("input").attr("disabled");

	if ( !isLock )
		pdata.appCode = ctrl.sel('input[name="appCode"]').val();

	if (!pdata.isFree)
		pdata.isFree = 0;

	if (!pdata.isPub)
		pdata.isPub = 0;

	return  pdata;
};

function  getID() {
	var  uri = location.pathname,
		temp = uri.split('/');
	return temp[temp.length-1];
};

ctrl.isShowFree = function() {
	var isPub = ctrl.sel('input:checked[name="isPub"]').val();
	if(isPub)
		ctrl.sel('.isFreeBox').show();
	else {
		ctrl.sel('.isFreeBox').hide();
		ctrl.sel('input:checked[name="isFree"]').prop('checked',false);
	}
};
