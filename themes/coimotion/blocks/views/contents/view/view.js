ctrl.startup = function() {
	__.getCtrl("menuMain").setSelected("contents/view/5");
	
   	var pathname = location.pathname;
  	if( pathname.indexOf("contents/view/5") > 0)
      	__.getCtrl("menuContents").setSelected("contents/view/5");
  	if( pathname.indexOf("contents/view/6") > 0)
      	__.getCtrl("menuContents").setSelected("contents/view/6");
  	if( pathname.indexOf("contents/view/8") > 0)
      	__.getCtrl("menuContents").setSelected("contents/view/8");
};

ctrl.doJoinNow = function() {
  	alert('Under Construction');
};