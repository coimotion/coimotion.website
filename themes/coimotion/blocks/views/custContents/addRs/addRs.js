ctrl.create = function() {
	var  pdata = collectData(),
		 rs = ctrl.sel('input[name="rs"]').val();
	
	var re =  /^[\d|a-zA-Z0-9]+$/;
	if (!re.test(rs) || rs.length < 1) {
		alert('<%=ph.js_CODE_ERR%>');
		return;
	}

	if (pdata.title.length === 0) {
		alert('<%=ph.js_TITLE_ERR%>');
		return;
	}

	var  appCode = ctrl.sel("form").attr("appCode"),
		 uri = '/custContents/createRs.wsj/'+appCode+"."+rs;

	$.post( uri, pdata, function(data)  {
		if (data.errCode == 0) {
			//ctrl.callHandler("regCloseAddRs");
			/*新增時繼承OK*/
			var  pRsPath = ctrl.sel('.rsParent').attr('rsParent');
			if(pRsPath) {
				var  pdata = {pRsPath:pRsPath};
				var  req = { url: '/admin/wrs/setParent',
						 id: appCode+"."+rs,
						 post: pdata};

				__.api( req, function(data) {
					if (data.errCode == 0)
						ctrl.callHandler("regCloseAddRs");
					else
						alert( data.message );
				});
			}
			else {
				ctrl.callHandler("regCloseAddRs");
			}
		}
		else
			alert( data.message );
	});
};

function  collectData()  {
	var  pdata = { title: ctrl.sel('input[name="title"]').val(),
				   descText: ctrl.sel('input[name="descText"]').val(),
				   locID: ctrl.sel('select option:selected').val()};
	return  pdata;
};

ctrl.showRsParent = function(target) {
	ctrl.callHandler("regShowRsParentList", target);
};
