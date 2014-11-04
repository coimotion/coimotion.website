var isShowTeamList = 1,
	isShowCoreList = 1,
	isShowBlogList = 1;

ctrl.startup = function() {
	var psnID = ctrl.getPsnID();
	if (psnID === undefined)
		window.location = '/';

	hover();
	// overView();
};

function hover() {
	$('.teamMenu').hide();
	$('.submenu').hide();
	$(".dropdown").hover(function() {		
		$(this).find('.teamMenu').show();
		$(".teamMenu").css('background','#1bab8e');
		}, function() {
		$(this).find('.teamMenu').hide();
	});
	/*$(".from").hover(function() {		
		$(this).find('.submenu').show();
		$(".submenu").css('background','#eee');
		}, function() {
		$(this).find('.submenu').hide();
	});*/
}

/*function overView() {
    $(".overView").click(function() {
        window.location.replace("/bkWrapper/docManage");
    });
}*/

ctrl.getOrgID = function() {
	return ctrl.sel('.coimParams').attr('orgID');
};

ctrl.getMenuCtrl = function() {
	return ctrl.sel('.coimParams').attr('ctr');
};

ctrl.getPsnID = function() {
	return ctrl.sel('.coimParams').attr('psnID');
};
/*
ctrl.getAccName = function() {
	return ctrl.sel('.coimParams').attr('accName');
};
*/
ctrl.getPosition = function() {
	return ctrl.sel('.coimParamsPF').attr('position');
};

ctrl.getOrgCode = function() {
	return ctrl.sel('.coimParamsPF').attr('orgCode');
};

ctrl.getOrgName = function() {
	return ctrl.sel('.coimParamsPF').attr('orgName');
};

ctrl.getOrgIcon = function() {
	var  out = {},
		 orgIcon = ctrl.sel('.coimParamsPF').attr('orgIcon'),
		 ngID = ctrl.sel('.coimParamsPF').attr('ngID');
	if (orgIcon != 'undefined' && ngID != 'undefined') {
		out.uri = orgIcon;
		out.ngID = ngID;
		return out;
	}
	else
		return null;
};

ctrl.showTeamList = function()  {
	if (isShowTeamList) {
		ctrl.embed('.teamList', '/bkIndex/teamList');
		isShowTeamList = 0;
		/*var req = {url: '/admin/user/teamList'};
		__.api( req, function(data) {
			if (data.errCode != 0)
				window.location = "/";
			else {
				var  list = data.value.list,
					 target = ctrl.sel('.teamList'),
					 ctr = ctrl.sel('.coimparams').attr('ctr');
				
				list.forEach(function(item) { 
					if (item.status === 0) {
						var html = '<li class="from">';
						html += '<a href="#" onclick="'+ctr+'.selTeam('+item.orgID+');">';
						html += item.orgName;
						html += '</a></li>';
						target.append(html);
					}
					
				});
			}
		});*/
	}
};

ctrl.showCoreList = function() {
	if (isShowCoreList) {
		var  req = {url: '/coim/core/list', post: {_pn:1, _ps:8}};
	
		__.api( req, function(data) {
			if (data.errCode === 0) {
				var  list = data.value.list.reverse();
				ctrl.sel(".corePage a#defaultLink").attr('href', '/bkWrapper/core/'+list[0].ngID);
				
				var  submenu = ctrl.sel(".corePage ul.submenu");
				for (var i in list) {
					var  h = '<li class="subfrom">';
					h += '<a href="/bkWrapper/core/'+list[i].ngID+'">'+list[i].title+'</a></li>';
					submenu.append(h);
				}
				
				isShowCoreList = 0;
			}
		});
	}
};

ctrl.showBlogList = function() {
	if (isShowBlogList) {
		var  req = {url: '/coim/blog/list', post: {_pn:1, _ps:8}};
	
		__.api( req, function(data) {
			if (data.errCode === 0) {
				var  list = data.value.list.reverse();
				ctrl.sel(".blogPage a#defaultLink").attr('href', '/bkWrapper/blog/'+list[0].ngID);
				
				var  submenu = ctrl.sel(".blogPage ul.submenu");
				for (var i in list) {
					var  h = '<li class="subfrom">';
					h += '<a href="/bkWrapper/blog/'+list[i].ngID+'">'+list[i].title+'</a></li>';
					submenu.append(h);
				}
				
				isShowBlogList = 0;
			}
		});
	}
};

ctrl.doLogout = function() {
	var  req = {url: '/core/user/logout'};

	__.api( req, function(data) {
		if (data.errCode === 0) {
			ctrl.delToken();
			window.location = "/";
		}
		else
			alert( data.message );
	});
};

ctrl.delToken = function() {
	var expires = new Date();
	expires.setTime (expires.getTime() - 1);
	document.cookie = "token=;expires=" + expires.toGMTString()+ ";" + "; path=/";
};

ctrl.showCreatTeam = function()  {
	ctrl.sel(".creatTeamModal").modal('show');
	ctrl.embed('.creatTeamTar', '/appTeam/creatTeam');
};