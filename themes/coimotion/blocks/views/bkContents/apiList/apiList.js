ctrl.openOpList = function(rs) {
	//console.log(rs);
	ctrl.sel('.opList').hide();
	ctrl.sel('.opList.'+rs).show();

	/* dynamic height */
	// $('.sidebar').height($(window).height() - 190);
};

ctrl.selRsOp = function(rs, op) {
	ctrl.sel(".opList li").removeClass("active");
	ctrl.sel("."+rs).find("._"+op).addClass("active");

	var  appCode = ctrl.sel(".sidebar").attr("appCode"),
	 id = appCode+"."+rs+"."+op;

	ctrl.callHandler("reqReloadApiDoc", id);
	ctrl.callHandler("reqReloadApiData", id);
};
