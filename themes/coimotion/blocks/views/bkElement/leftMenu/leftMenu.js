// ctrl.go = function(link) {
// 	window.location = link;
// };

// ctrl.selMenu = function(path) {
// 	ctrl.sel("span.arrow_r_out").hide();
// 	ctrl.sel("li a").each( function() {
// 		if ($(this).attr("target") == path) {
// 			$(this).parent().addClass("active");
// 			$(this).find("span.arrow_r_out").show();
// 		}
// 	});
// };

ctrl.startup = function() {
	$(document).ready(function(e) {
     	$("#menu-toggler").click(function (e) {  
	      $("#pgLeft").animate({left:-180},1000);
     	});
     });
	
	//如果尚未建立團隊，則隱藏其他功能
	var  orgID = __.getCtrl("bkMenu").getOrgID();
	if (!orgID || orgID == 'null') { 
		ctrl.sel('li.needOrg').hide();
	}
	
	//檢查是否是駭客
	var id = location.pathname.split('/')[3];
	if (id != undefined && id != orgID)
		__.getCtrl("bkMenu").doLogout();
	
	//寫上組織名稱
	var  orgName = __.getCtrl("bkMenu").getOrgName();
	if (orgName != 'undefined')
		ctrl.sel('.teamName').html(orgName);
	
	//貼上組織照片
	var  iconData = __.getCtrl("bkMenu").getOrgIcon();
	if (iconData != null) {
		var  img = '<img src="/images/'+iconData.ngID+'?path='+iconData.uri+'&maxw=80&maxh=80"/>';
		ctrl.sel('li.needOrg .teamStyle').replaceWith(img);
	}
};

ctrl.go = function(uri) {
	var  orgID = __.getCtrl("bkMenu").getOrgID();
	if (orgID && orgID != 'null') {
		window.location = uri+"/"+orgID;
	}
	else if (uri == '/bkContents/manage') {
		window.location = uri;
	}
	else
		alert('<%=ph.js_TEAM_ERR%>');
};

