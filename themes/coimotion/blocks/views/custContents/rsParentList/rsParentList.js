ctrl.startup = function()  {
	//動態高度
	ctrl.sel('.sidebar').height($(window).height() - 250);
};

ctrl.showRsList = function(appCode) {
	var  target = ctrl.sel("."+appCode);
	ctrl.sel(".rsList").css("display","none");

	if (target.find(".rsList").attr("status") != "1") {
		$.post( "/custContents/rsList.wsj/"+appCode, {}, function(data)  {
			if (data.errCode === 0)  {
				var  rsList = data.value.list;
				var  listBody = "<ul class='rsList' status='1'>";
				var  thisCtrl = ctrl.sel(".sidebar").attr('ctrl');

				rsList.forEach(function(item) {
					listBody += '<li class="'+item.rs+'" rs="'+item.rs+'">';
					listBody += '<a href="#"'+'onclick="'+thisCtrl+'.chooseRs(\''+appCode+'\',\''+item.rs+'\');">';
					listBody += item.rs+' ['+item.title+']'+'</a></li>';
				});

				listBody += "</ul>";
				target.append(listBody);
			}
			else
				alert( data.message );
		});
	}
	else {
		target.find(".rsList").css("display","block");
	}
};

ctrl.chooseRs = function(appCode, rs) {
	ctrl.sel(".rsList li").removeClass("active");
	ctrl.sel("."+appCode+" ."+rs).addClass("active");
};

ctrl.confirm = function (isSet) {
	var  target = ctrl.sel(".rsList li.active"),
		 tarRs = target.attr("rs"),
		 tarApp = target.parent().parent().attr("appCode"),
		tarEL = ctrl.sel(".sidebar").attr("target");
	/*
	var  appCode = ctrl.sel(".modal-footer").attr("appCode"),
		 rs = ctrl.sel(".modal-footer").attr("rs");
	*/
	var  pdata = {};
	if (isSet == "1") {
		if (!tarRs) {
			alert('<%=ph.js_INHERIT_MSG%>');
			return;
		}
		pdata.pRsPath = tarApp+"."+tarRs;
	}
	else
		pdata.pRsPath = "";

	pdata.el = tarEL;

	ctrl.callHandler("regChooseRs", pdata);
	/*
	var  req = { url: '/admin/wrs/setParent',
				 id: appCode+"."+rs,
				 post: pdata};

	__.api( req, function(data) {
		if (data.errCode == 0)
			ctrl.callHandler("regChooseRs");
		else
			alert( data.message );
	});
	*/

};
