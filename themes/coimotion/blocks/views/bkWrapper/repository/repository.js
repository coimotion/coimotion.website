// // var step_pos = [10, 380, 810, 1257, 1915, 2725];
// var step_pos = [10, 410, 850, 1257, 1915, 2725];
// ctrl.startup = function() {
// 	ctrl.embed(".formBlock", "/coimIndex/form");
// 	ctrl.embed(".bannerBlock", "/coimIndex/banner");

// 	scroll();
// 	// backtop();
// 	$('ul.nav').hide();
// 	menuSwtich();

// };

// function scroll(){
// 	step_pos.forEach(function(pos) {
// 		var index = (step_pos.indexOf(pos)+5)%6;
// 		$(".conBu:eq("+ index +")").click(function(e){
// 			// console.log(index+':'+pos+':'+step_pos.indexOf(pos));
// 			e.preventDefault();
// 			$('html, body').animate({
// 				scrollTop: pos // adjust number of px to scroll down
// 			}, 1000);
// 		});

// 		$('.lk:eq('+step_pos.indexOf(pos)+')').click(function(e) {
// 			e.preventDefault();
// 			$('html, body').animate({
// 				scrollTop: pos// adjust number of px to scroll down
// 			}, 1000);
// 		});
// 	});
// }
// function menuSwtich() {
// 	$('#off').click(function() {
// 		$('ul.nav').toggle();
// 	});
// 	$('.siderBar').delegate('li', 'click', function() {
// 		$('ul.nav').hide();
// 	});
// }


ctrl.go = function(uri) {
	var  orgID = __.getCtrl("bkMenu").getOrgID();
	if (orgID && orgID != 'null') {
		window.location = uri+"/"+orgID;
	}
	else {
		window.location = uri;
	}
};
