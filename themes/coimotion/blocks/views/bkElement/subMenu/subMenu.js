ctrl.startup = function()  {
   //selectMenu();
	var active = '<div class="arrow"></div>';
	active += '<div class="arrow_border"></div>';
	
	var id = ctrl.sel('.subMenu').attr('id');
	
	if (id != 'null') {
		ctrl.sel('ul#menu'+id).parent().prepend(active);
	}
	else
		ctrl.sel('li.manage a').prepend(active);
   
};
/*
function selectMenu(){
	$(".mainmenu").click(function(){
		$(".submenu").slideUp("fast");
    });
};
*/
ctrl.getSubMenu = function(ngID, menu) {
	 ctrl.sel("#menu"+ngID).append(menu);
	 ctrl.sel("#menu"+ngID).slideDown("fast");
};