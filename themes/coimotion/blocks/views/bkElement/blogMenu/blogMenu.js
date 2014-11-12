ctrl.startup = function() {
	var active = '<div class="arrow"></div>';
	active += '<div class="arrow_border"></div>';	
	var id = location.pathname.split('/').reverse()[0];	
	if (id) {
		ctrl.sel('a.page'+id).prepend(active);
		ctrl.sel('a.page'+id+" span").css('color','#049D86');
	}
	else {
		ctrl.sel('li.blogItem a').prepend(active);
		ctrl.sel('li.blogItem a span').css('color','#049D86');
	}

	//slideToggle();
};

function slideToggle() {
	$(window).resize(function() {
	    var viewportWidth = $(window).width();	
		if (viewportWidth < 1100){
	       $('.blogMenu').hide();
		}
		else {
		   $('.blogMenu').show();
		}
	});	
};