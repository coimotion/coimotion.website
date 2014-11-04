ctrl.update = function()  {
	var  pdata = collectData();
	var  defRs = ctrl.sel("form").attr("rs");
	/*
	 * 資源代碼暫時不可修改
	var  rs = ctrl.sel('input[name="rs"]').val();

	if (defRs != rs) {
		if (rs.length < 1) {
			alert("代碼不可為空白");
			return;
		}

		var re =  /^[\d|a-zA-Z0-9]+$/;
		if (!re.test(rs)) {
			alert("代碼需為英數字");
			return;
		}
		pdata.rs = rs;
	}
	*/
	if (pdata.title.length === 0) {
		alert('<%=ph.js_TITLE_ERR%>');
		return;
	}

	var  appCode = ctrl.sel("form").attr("appCode"),
	 	 id = appCode +"."+ defRs;

	$.post('/custContents/updateRs.wsj/'+id, pdata, function(data)  {
		if (data.errCode === 0)  {
			/*更新繼承*/
			var  isChange = ctrl.sel('.rsParent').attr('changeRsPath');
			if (isChange) {
				var pRsPath = ctrl.sel('.rsParent').attr('rsParent');
				var pdata = {pRsPath:pRsPath};
				var req = { url: '/admin/wrs/setParent',
						id: appCode+"."+defRs,
						post: pdata};

				__.api( req, function(data) {
					if (data.errCode == 0)
						ctrl.callHandler("regCloseRsInfo");
					else
						alert( data.message );
				});
			}
			else
				ctrl.callHandler("regCloseRsInfo");
		}
		else
			alert( data.message );
	});
};

function  collectData()  {
	var  pdata = {title: ctrl.sel('input[name="title"]').val(),
				  descText: ctrl.sel('input[name="descText"]').val()};
	return  pdata;
};
//
// ctrl.incRsParentList = function() {
// 	var  form = ctrl.sel("form"),
// 		 appCode = form.attr("appCode"),
// 		 rs = form.attr("rs"),
// 		 orgID = form.attr("orgID");
// 	var  params = {"appCode":appCode, "rs":rs};
//
// 	$(".rsParentModal").modal('show');
// 	ctrl.embed('.rsParentList', '/custContents/rsParentList', {/*id: orgID,*/ params: params}, function(emCtrl) {
// 		emCtrl.addHandler("regChooseRs", ctrl.setInherit);
// 	});
// };
//
// ctrl.setInherit = function(pdata) {
// 	$('.rsParentModal').modal('hide').on('hidden.bs.modal', function () {
// 		/*
// 		ctrl.reloadRsInfo();
// 		ctrl.callHandler("regReloadOpList");
// 		*/
// 		/*
// 		 * 儲存後才更新繼承*/
// 		var  target = ctrl.sel('.rsParent'),
// 		 	 pRsPath = pdata.pRsPath;
//
// 		target.attr('changeRsPath',true);
// 		target.attr('rsParent',pRsPath);
// 		if (pRsPath != "") {
// 			var  tempS = pRsPath.split(".");
// 			target.empty().html(tempS[0]+"/"+tempS[1]);
// 		}
// 		else
// 			target.empty();
//
// 	});
// };
/*
ctrl.reloadRsInfo = function() {
	var  form = ctrl.sel("form"),
	 	 appCode = form.attr("appCode"),
	 	 rs = form.attr("rs");
	ctrl.reload('/custContents/rsInfo', {"id":appCode+"."+rs});
};
*/
ctrl.showRsParent = function(target) {
	ctrl.callHandler("regShowRsParentList", target);
};
