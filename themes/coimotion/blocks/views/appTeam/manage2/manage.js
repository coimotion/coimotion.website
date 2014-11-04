var  isShowTeamList = 1;

ctrl.startup = function() {
	//var  path = {title:"搜尋團隊"};
	//__.getCtrl("bkMenu").setPath(path);

	//ctrl.showTeamList();

};
/*
ctrl.showTeamList = function() {

	if (isShowTeamList) {
		ctrl.embedTeamList();
		isShowTeamList = 0;
	}
	else {
		$( ".teamList" ).show();
		$( ".searchTeamList" ).hide();
		ctrl.sel("input[name=searchName]").val("");
		ctrl.embedTeamList();
	}
};
*/
/*
ctrl.embedTeamList = function() {
	var  psnID = ctrl.sel(".params").attr("psnID"),
		 params = {"psnID": psnID, "mb":1}; //teamList中會用到psnID，mb=1，列出會員清單

	ctrl.embed('.teamList', '/user/teamList', {params:params}, function(emCtrl) {
		emCtrl.addHandler("ReqShowTeamList", ctrl.showTeamList);
	});
};
*/
ctrl.searchTeam = function() {
	var  name = ctrl.sel("input[name=searchName]").val();
	if (name) {
		var  psnID = ctrl.sel(".params").attr("psnID"),
			 params = {"name":name, "ss":1, "psnID": psnID}; /*ss : 顯示查詢者和開發團隊間的狀態, searchTeam中會用到psnID，*/
	
		ctrl.embed('.searchTeamList', '/user/searchTeam', {params:params}, function(emCtrl) {
			emCtrl.addHandler("ReqSearchTeam", ctrl.searchTeam);
		});
		//$('.teamList').hide();
		$('.searchTeamList').show();
	}
};
/*
ctrl.showCreatTeam = function()  {
	$(".creatTeamModal").modal('show');
	ctrl.embed('.creatTeamTar', '/appTeam/creatTeam');
	// ctrl.embed('.creatTeamTar', '/appTeam/creatTeam', {}, function(emCtrl) {
	// 	emCtrl.addHandler("regCloseCreat", ctrl.closeCreatTeam);
	// });
};

ctrl.closeCreatTeam = function() {
	$('.creatTeamModal').modal('hide').on('hidden.bs.modal', function () {
		window.location = "/app/list/"+location.pathname.split('/').reverse()[0];
	});
};
*/