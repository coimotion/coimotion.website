ctrl.startup = function() {
	/*
	var  ngID = ctrl.sel('#newsSelector').attr('ngID');
	if (!ngID || ngID == 'null')
		ngID = ctrl.sel('a:first').attr('ngID');
	ctrl.callHandler("regView", ngID); //呼叫View
	console.log("ngID: "+ngID);
	*/
	
	//ctrl.loadShadow();
	
	var  ngID = ctrl.sel('#newsSelector').attr('ngID');
	ctrl.sel("a").each(function(){
		var  thisNg = $(this).attr('ngID');
		if (ngID == thisNg)
			$(this).find('h4').css('color', '#049D86');
	});
};

ctrl.loadShadow = function() {
	$('#newsSelector ul').delegate('a', 'mouseenter', function(e) {
			$(this).next().addClass('shadow');
		}).delegate('a', 'mouseleave', function(e) {
			$(this).next().removeClass('shadow');
	});
};