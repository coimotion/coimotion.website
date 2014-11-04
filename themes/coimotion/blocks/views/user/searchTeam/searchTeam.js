ctrl.joinTeam = function (orgID, isOK) {
	var  psnID = ctrl.sel(".params").attr("psnID"),
		 pdata = {"psnID":psnID, "accept":isOK};
	
	var  req = {url: '/admin/appTeam/cfmMember/'+orgID,
			post: pdata};
	
	__.api( req, function(data) {
		if (data.errCode === 0) {
			ctrl.selTeam(orgID);
		}
		else
			alert( data.message );
	});
};

ctrl.addTeam = function (orgID, status, orgName) {
	var  psnID = ctrl.sel(".params").attr("psnID"),
		 pdata = {"psnID":psnID, "status":status};
	
	var  req = {url: '/admin/appTeam/addMember/'+orgID,
			post: pdata};
	
	__.api( req, function(data) {
		if (data.errCode === 0) {
			var  msg = "<%=ph.js_JOIN_SUCC_MSG_ONE%> "+orgName+" <%=ph.js_JOIN_SUCC_MSG_TWO%>";
			alert(msg);
			ctrl.callHandler("ReqSearchTeam");
		}
		else
			alert( data.message );
	});
};

ctrl.selTeam = function(orgID)  {
	var  req = {url: '/admin/user/onTeam/'+orgID};
	__.api( req, function(data) {
		if (data.errCode === 0)
			window.location = '/appTeam/manage/'+orgID;
		else
			alert( data.message );
	});
};

ctrl.teamManage = function(orgID) {
	var  req = {url: '/admin/user/onTeam/'+orgID};
	__.api( req, function(data) {
		if (data.errCode === 0)
			window.location = '/appTeam/manage/'+orgID;
		else
			alert( data.message );
	});
};

ctrl.showTeamDetail = function (orgID) {
	var  memStr = ctrl.sel('span.memList'+orgID).html(),
		 params = {memStr:memStr};
	ctrl.embed("#appTeamDetail"+orgID, '/appTeam/detail', {id:orgID, params:params} ,function() {
		$("#appTeamDetail"+orgID).fancybox({
			//wrapCSS    : 'fancybox-custom',
			//closeClick : true,
			openEffect : 'none',
			helpers : { title : { type : 'inside'  },  overlay : { css : { 'background' : 'rgba(238,238,238,0.85)' } } }
		}).click();
	});
};

ctrl.quitTeam = function (orgID, teamName, orgCode) {
	var msg = "<%=ph.js_IS_WITHDRAW_MSG%> "+teamName+" ?";
	if (confirm(msg)) {
		var  psnID = ctrl.sel(".params").attr("psnID"),
			 pdata = {"psnID":psnID};
		
		var  req = {url: '/admin/appTeam/delMember/'+orgID,
				post: pdata};
		
		var  useOrgCode = __.getCtrl("bkMenu").getOrgCode(),
			 thisOrgID = __.getCtrl("bkMenu").getOrgID();

		__.api( req, function(data) {
			if (data.errCode === 0) {
				if (orgCode != useOrgCode) {
					alert("<%=ph.js_WITHDRAW_MSG%> "+teamName+" !");
					
					//var  params = {"mb":1};
					//ctrl.reload('/user/teamList',{params:params});
					
					//退出後會清掉lastOrgID，所以需要onTeam
					var  req = {url: '/admin/user/onTeam/'+thisOrgID};
					__.api( req, function(data) {
						if (data.errCode === 0)
							ctrl.callHandler("ReqSearchTeam");
						else
							alert( data.message );
					});
				}
				else {
					ctrl.showChangTeam();
				}
			}
			else
				alert( data.message );
		});
	}
};

ctrl.showChangTeam = function ()  {
	/*如果退出後沒有團隊了，就直接退回首頁*/
	var  req = {url: '/admin/user/teamList'};
	
	__.api( req, function(data) {
		var  value = data.value;
		if (value && value.list.length > 0) {
			var  hasTeam = 0,
				 changOrgID = null;
			value.list.forEach(function(item) {
				if(item.status == 0) /*表示目前有存在某團隊*/
					hasTeam = 1;
				if(item.status == 0 && changOrgID === null)
					changOrgID = item.orgID;
			});
			
			if (hasTeam) {
				//先預設一個團隊狀態，以免使用者不選團隊。
				var  req = {url: '/admin/user/onTeam/'+changOrgID};
				__.api( req, function(data) {
					if (data.errCode === 0) {
						ctrl.sel('.modal').modal('show');
						ctrl.embed(".onTeam", "/bkIndex/teamList");
					}
					else
						alert( data.message );
				});
			}
			else
				window.location = "/bkWrapper/manage";
		}
		else
			window.location = "/bkWrapper/manage";
	});
};