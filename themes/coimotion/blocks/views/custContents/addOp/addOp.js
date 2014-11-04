ctrl.create = function() {
	var  pdata = collectData(),
		 op = ctrl.sel('input[name="op"]').val();
	
	var re =  /^[\d|a-zA-Z0-9]+$/;
	if (!re.test(op) || op.length < 1) {
		alert('<%=ph.js_CODE_ERR%>');
		return;
	}
	
	if (pdata.title.length === 0) {
		alert('<%=ph.js_TITLE_ERR%>');
		return;
	}
	
	var  appCode = ctrl.sel("form").attr("appCode"),
		 rs = ctrl.sel("form").attr("rs"),
		 uri = '/custContents/createOp.wsj/'+appCode+"."+rs+"."+op;
		 id = appCode+"."+rs;
		
	$.post( uri, pdata, function(data)  {
		if (data.errCode === 0)  {
			//ctrl.callHandler("regReloadOpList");
			/*更新繼承*/
			var  pOpPath = ctrl.sel('.opParent').attr('pOpPath');
			if (pOpPath) {
				var  pdata = {"pOpPath":pOpPath};
				var  req = { url: '/admin/wop/setParent',
							 id: appCode+"."+rs+"."+op,
							 post: pdata};
	
				__.api( req, function(data) {
					if (data.errCode == 0)
						ctrl.callHandler("regReloadOpList");
					else
						alert( data.message );
				});
			}
			else
				ctrl.callHandler("regReloadOpList");
		}
		else
			alert( data.message );
	});
	
};

function  collectData()  {
	var  pdata = { title: ctrl.sel('input[name="title"]').val(),
				   descText: ctrl.sel('input[name="descText"]').val(),
				   CRUD: ctrl.sel('select option:selected').val()};
	return  pdata;
};

ctrl.incOpParentList = function()  {
	ctrl.callHandler("regEmbedOpParentList");
};