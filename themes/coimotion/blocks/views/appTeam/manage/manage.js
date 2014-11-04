var  isShowMemList = 1;

ctrl.startup = function() {

	//var  path = {title:"團隊管理"};
	//__.getCtrl("bkMenu").setPath(path);

	ctrl.embed('.teamInfo', '/appTeam/info', {id: getID()}, function(emCtrl) {
		emCtrl.addHandler("reloadInfo", ctrl.reloadInfo);
	});
	ctrl.loadMemList();

	checkMng();
};

ctrl.reloadInfo = function() {
	ctrl.embed('.teamInfo', '/appTeam/info', {id: getID()});
};

ctrl.loadMemList = function() {
	if (isShowMemList) {
		ctrl.embedTeamMemList();
		isShowMemList = 0;
	}
};

ctrl.reloadMemList = function() {
	ctrl.embedTeamMemList();
	//ctrl.reload('/appTeam/memList', {"id":getID()}, ctrl.sel('.teamMemList'));
};

ctrl.showAddMem = function ()  {
	ctrl.embed(".addMember", "/appTeam/addMember", {} , function(emCtrl) {
		//emCtrl.addHandler("regCloseAddMem", ctrl.closeAddMem);
		emCtrl.addHandler("reqReloadMemList", ctrl.reloadMemList);
	});
};

ctrl.embedTeamMemList = function() {
	ctrl.embed('.teamMemList', '/appTeam/memList', {id: getID()}, function(emCtrl) {
		emCtrl.addHandler("reqReloadMemList", ctrl.reloadMemList);
	});
};

ctrl.update = function() {
	var  pdata = collectData();

	if (pdata.title.length === 0) {
		alert('<%=ph.js_NAME_ERR%>');
		return;
	}

	var  uri = location.pathname;
	var  temp = uri.split('/');
	var  id = temp[temp.length-1];

	$.post('/appTeam/update.wsj/'+id, pdata, function(data)  {
		if (data.errCode)
			alert( data.message );
		else
			alert('OK!');
	});
};

function checkMng() {
	/*如果不是管理者，則無法編輯資訊*/
	var position = __.getCtrl("bkMenu").getPosition();
	if (position != 'manager') {
		ctrl.sel('a.isManage').hide();
	}
};

function  getID() {
	return  __.getCtrl("bkMenu").getOrgID();
};

function  collectData()  {
	var  pdata = {title: ctrl.sel('input[name="title"]').val(),
					docBody: ctrl.sel('textarea[name="docBody"]').val()};
	return  pdata;
};
