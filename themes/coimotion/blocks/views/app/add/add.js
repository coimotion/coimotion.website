
ctrl.create = function() {
	var  pdata = collectData();
	
	var re =  /^[\d|a-zA-Z0-9]+$/;
	if (!re.test(pdata.caCode) || pdata.caCode.length < 6) {
		alert('<%=ph.js_CACORD_ERR%>');
		return;
	}
	
	if (pdata.title.length === 0) {
		alert('<%=ph.js_TITLE_ERR%>');
		return;
	}
	
	var  uri = location.pathname;
	var  temp = uri.split('/');
	var  orgID = temp[temp.length-1];
	
	$.post( '/app/create.wsj/'+orgID, pdata, function(data)  {
		if (data.errCode === 0)
			ctrl.callHandler("regCloseAdd");
		else
			alert( data.message );
	});
	
};

function  collectData()  {
	//var  isMApp = ctrl.sel('input:checked[name="isMobile"]').val();
	var  pdata = { caCode: ctrl.sel('input[name="caCode"]').val(),
				   title: ctrl.sel('input[name="title"]').val(),
				   descTx: ctrl.sel('textarea[name="descTx"]').val(),
				   locID: ctrl.sel('select option:selected').val(),
				   isMApp: "1"};
	return  pdata;
};