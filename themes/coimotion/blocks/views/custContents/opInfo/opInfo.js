ctrl.update = function()  {
	var  pdata = collectData();
	var  defOp = ctrl.sel("form").attr("op");
	/*
	var  op = ctrl.sel('input[name="op"]').val();
	
	if (op.length < 1) {
		alert("代碼不可為空白");
		return;
	}
	
	var re =  /^[\d|a-zA-Z0-9]+$/;
	if (!re.test(op)) {
		alert("代碼需為英數字");
		return;
	}
	*/
	if (pdata.title.length === 0) {
		alert('<%=ph.js_TITLE_ERR%>');
		return;
	}
	
	var  appCode = ctrl.sel("form").attr("appCode"),
		 rs = ctrl.sel("form").attr("rs"),
		 id = appCode +"."+ rs +"."+ defOp;
		 
	$.post('/custContents/updateOp.wsj/'+id, pdata, function(data)  {
		if (data.errCode === 0)  {
			/*更新繼承*/
			var  isChange = ctrl.sel('.opParent').attr("changeOpPath");
			if (isChange) {
				var  pOpPath = ctrl.sel('.opParent').attr('pOpPath');
				var  pdata = {"pOpPath":pOpPath};
				var  req = { url: '/admin/wop/setParent',
							 id: appCode+"."+rs+"."+defOp,
							 post: pdata};
	
				__.api( req, function(data) {
					if (data.errCode == 0)
						ctrl.callHandler("regCloseInfo");
					else
						alert( data.message );
				});
			}
			else
				ctrl.callHandler("regCloseInfo");
		}
		else
			alert( data.message );
	});
};

function  collectData()  {
	var  pdata = {title: ctrl.sel('input[name="title"]').val(),
				  descTx: ctrl.sel('input[name="descTx"]').val(),
				  CRUD: ctrl.sel('select option:selected').val()};
	return  pdata;
};

ctrl.incOpParentList = function()  {
	ctrl.callHandler("regEmbedOpParentList");
};