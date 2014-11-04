ctrl.startup = function()  {
	ctrl.showTeamApp();
	//ctrl.incMemList();
	//console.log("start");
};

/*
ctrl.incMemList = function() {
	var orgID = ctrl.sel('.detailParams').attr("orgID");
	var  req = {url: '/appTeam/memList/'+orgID};
	__.api( req, function(data) {
		if (data.errCode === 0) {
			console.log(data);
			if (value && value.list.length > 0) {
				var  target = ctrl.sel('span.memStr');
				target.append(value.list[0].dspName);
				
				for (var i=1; i<value.list.length; i++) {
					target.append("、"+value.list[i].dspName);
				}
			}
		}
	});
};*/

ctrl.showTeamApp = function() {
	var  orgID = ctrl.sel('.detailParams').attr("orgID");
	var  req = {url: '/admin/appTeam/appList/'+orgID};
	
	__.api( req, function(data) {
		if (data.errCode === 0) {
			if (data.value && data.value.list.length > 0) {
				var  target = ctrl.sel('.teamAppList');
				var  value = data.value;
				value.list.forEach(function(item) {
					var  teambk = '<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 fs09 text-center bk1 noPaLR">';
						 teambk += '<div class="paLR5"> <div class="appstyle" title="app" alt="app"><i class="fa fa-mobile"></i></div> </div>';
						 teambk += '<div class="paLR5 paT5 text-left name"><b>'+item.title+'</b></div>';
						 /*teambk += '<div class="paLR5 text-left">00,000位使用者</div>';*/
						 teambk += '</div>';
					     target.append(teambk);
				});
			}
		}
	});
};