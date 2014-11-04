ctrl.startup = function() {
	var active = '<div class="arrow"></div>';
	active += '<div class="arrow_border"></div>';
		
	var  thisNg = location.pathname.split('/').reverse()[0];
	ctrl.sel(".coreItem"+thisNg).find("a").css('color','#049D86');
	ctrl.sel(".coreItem"+thisNg).find("a").prepend(active);
};