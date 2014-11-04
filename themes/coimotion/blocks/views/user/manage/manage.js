var  isShowTeamList = 1;

ctrl.startup = function() {
	//var  path = {title:"個人空間"};
	//__.getCtrl("bkMenu").setPath(path);
};

ctrl.selMenu = function(btn)  {
	ctrl.sel(".sidebar li").find("a").removeClass("open active");
	ctrl.sel(".sidebar ."+btn).find("a").addClass("open active");
};

ctrl.showMgnPasswd = function() {
	ctrl.embed('.mgnPasswd', '/user/mgnPasswd');
};
