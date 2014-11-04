ctrl.startup = function()  {
	var active = '<div class="arrow"></div>';
	active += '<div class="arrow_border"></div>';	
	var id = ctrl.sel('.blogMenu').attr('id');	
	if (id != 'null') {
		ctrl.sel('ul#menu'+id).parent().prepend(active);
	}
	else
		ctrl.sel('li.blogItem a').prepend(active); 
};

ctrl.show = function(ngID) {
	ctrl.embed('.bkContent', '/bkWrapper/blog', {id: ngID});
	ctrl.sel(".blogItem a").css('color','#66808d');
	ctrl.sel(".blogItem a.page"+ngID).css('color','#049D86');
};