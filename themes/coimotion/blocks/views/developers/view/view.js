ctrl.startup = function() {
	__.getCtrl("menuMain").setSelected("developers/view/9");
	
   	var pathname = location.pathname;
  	if( pathname.indexOf("developers/view/9") > 0)
      	__.getCtrl("menuDevelopers").setSelected("developers/view/9");
  	if( pathname.indexOf("developers/view/10") > 0)
      	__.getCtrl("menuDevelopers").setSelected("developers/view/10");
  	if( pathname.indexOf("developers/view/12") > 0)
      	__.getCtrl("menuDevelopers").setSelected("developers/view/12");
};

ctrl.doJoinNow = function() {
  	alert('Under Construction');
};