ctrl.startup = function() {
	var  firstNg = ctrl.sel('.blogItem').attr('ngID');
	ctrl.embed('.bkContent', '/bkWrapper/blog', {id: firstNg});
	ctrl.sel(".blogItem a.page"+firstNg).css('color','#049D86');
};

ctrl.show = function(ngID) {
	ctrl.embed('.bkContent', '/bkWrapper/blog', {id: ngID});
	ctrl.sel(".blogItem a").css('color','#66808d');
	ctrl.sel(".blogItem a.page"+ngID).css('color','#049D86');
};
