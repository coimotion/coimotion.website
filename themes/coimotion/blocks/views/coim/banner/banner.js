 var step_pos = [0, 450, 900, 1300, 1600];
//var step_pos = [0, 500, 840, 940, 1040];
ctrl.startup = function() {	
	$('#indexCarousel').carousel({
 		"interval": 7000
 	});
    scroll();
    hover();
};

function scroll(){
	step_pos.forEach(function(pos) {				
		ctrl.sel('.navLi:eq('+step_pos.indexOf(pos)+')').click(function(e) {
				ctrl.sel('.circle').css('background', '#fff');
				ctrl.sel('.link').fadeOut('slow');
				ctrl.sel('.navLi').removeClass('active-nav');
				$('html, body').animate({ scrollTop: pos }, 1000);
				$(this).find('.circle').css("background", "#27ae90");				
				$(this).find(".link").fadeIn( 'slow' );
				$(this).addClass('active-nav');
		});
    });
	
	$(window).scroll(function() {
    	var  y = window.pageYOffset,
    		 stepL = step_pos.length;
    		 tarIndex = null;
    		 
    	for (var i=0 ; i < stepL; i++) {
			if ( y >= step_pos[i] /*&& y < step_pos[i+1]*/) {
				tarIndex = i;
				//break;
			}
    	}
    	
    	if (tarIndex === null)
    		tarIndex = stepL-1;
		
		var  target = ctrl.sel('.navLi:eq('+tarIndex+')');
		
		ctrl.sel('.circle').css('background', '#fff');
		ctrl.sel('.link').hide();
		ctrl.sel('.navLi').removeClass('active-nav');
		target.find('.circle').css("background", "#27ae90");				
		target.find('.link').show();
		target.addClass('active-nav');
    });
}

function hover() {
	ctrl.sel( ".navLi" ).hover(function() {
		$( this ).find('.link').show();
	},function() {
		$( this ).find('.link').hide();
		ctrl.sel("li.active-nav").find('.link').show();
	});
}
