ctrl.startup = function() {
	//動態高度
	/*ctrl.sel('.sidebar').height($(window).height() - 250);
	ctrl.sel('.sidebarCon').height($(window).height() - 250);*/
};

ctrl.showOpList = function(appCode) {
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
	else { /*有載過*/
		target.find(".rsList").css("display","block");
	}
};

ctrl.chooseRs = function(appCode, rs) {
	ctrl.sel(".rsList li").removeClass("active");
	ctrl.sel("."+appCode+" ."+rs).addClass("active");
	
	//show op List
	//var  pdata = collectData(),
	var  req = {url: '/admin/wop/list/'+appCode+'.'+rs,
				/*post: pdata*/};

	__.api( req, function(data) {
		if (data.errCode == 0) {
			var  target = ctrl.sel(".opList");
			var  opList = data.value.list;
			var  listBody = "";
			var  thisCtrl = ctrl.sel(".sidebar").attr('ctrl');
			
			opList.forEach(function(item) {
				listBody += '<li class="'+item.op+'" appCode="'+appCode+'" rs="'+rs+'" op="'+item.op+'">';
				listBody += '<a href="#"'+'onclick="'+thisCtrl+'.chooseOp(\''+item.op+'\');">';
				listBody += item.op+' ['+item.title+']'+'</a></li>';
			});
			target.empty().append(listBody);
		}
		else
			alert( data.message );
	});
};

ctrl.chooseOp = function(op) {
	ctrl.sel(".opList li").removeClass("active");
	ctrl.sel(".opList").find("."+op).addClass("active");
};

ctrl.confirm = function (isSet) {
	var  target = ctrl.sel(".opList li.active"),
		 tarApp = target.attr("appCode"),
		 tarRs = target.attr("rs"),
		 tarOp = target.attr("op");
	/*
	var  appCode = ctrl.sel(".modal-footer").attr("appCode"),
		 rs = ctrl.sel(".modal-footer").attr("rs"),
		 op = ctrl.sel(".modal-footer").attr("op");
	*/
	var  pdata = {};
	if (isSet == "1") {
		if (!tarOp) {
			alert('<%=ph.js_INHERIT_MSG%>');
			return;
		}
		pdata.pOpPath = tarApp+"."+tarRs+"."+tarOp;
	}
	else
		pdata.pOpPath = "";
	
	ctrl.callHandler("reqCloseOpParent", pdata);
	/*
	var  req = { url: '/admin/wop/setParent',
				 id: appCode+"."+rs+"."+op,
				 post: pdata};

	__.api( req, function(data) {
		if (data.errCode == 0)
			ctrl.callHandler("reqCloseOpParent", pdata);
		else
			alert( data.message );
	});
	*/
	
};