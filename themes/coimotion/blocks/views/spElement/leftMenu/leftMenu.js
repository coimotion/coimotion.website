ctrl.go = function(link) {
	window.location = link;
};

ctrl.selMenu = function(path) {
	ctrl.sel("span.arrow_r_out").hide();
	ctrl.sel("li a").each( function() {
		if ($(this).attr("target") == path) {
			$(this).parent().addClass("active");
			$(this).find("span.arrow_r_out").show();
		}
	});
};