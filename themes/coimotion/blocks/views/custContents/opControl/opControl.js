/*
 * isOk: 1表示更變成允許，0表示更變成不允許。
 */

ctrl.setGrant = function (op, role) {
	var  target = ctrl.sel("tr."+op+" td."+role);
	var  isOk = target.find("button").attr("isOk");
	
	var  appCode = ctrl.sel(".opControlParams").attr("appCode"),
		 rs = ctrl.sel(".opControlParams").attr("rs"),
		 pdata = {"isOk": isOk, "role": role};
	
	var  id = appCode +"."+ rs +"."+ op;
	var  req = {url: '/admin/wop/grant/'+id, post: pdata};
		 
	__.api( req, function(data) {
		if (data.errCode === 0) {
			resetStatus (target, isOk);
		}
		else
			alert( data.message );
	});
	
};

function resetStatus (target, isOk) {
	if (isOk == "1") {
		var  word = '<%=ph.open%>';
		target.find("button").removeClass("btn-default").addClass("btn-green").html('<i class="icon-ok"></i>'+word);
		target.find("button").attr("isOk","0");
	}
	else {
		var  word = '<%=ph.close%>';
		target.find("button").removeClass("btn-green").addClass("btn-default").html('<i class="icon-remove"></i>'+word);
		target.find("button").attr("isOk","1");
	}
};