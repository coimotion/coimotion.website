ctrl.startup = function() {
	ctrl.sel("li").each(function(){
		var img = $(this).find("img");
		var imgPath = img.attr("src");
		var hvImgPath = img.attr("hvImgPath");
		if(hvImgPath && hvImgPath.length > 1){
			$(this).mouseover(function(){
				img.attr("src", hvImgPath);
				$(this).addClass("hover");
			}).mouseout(function(){
				img.attr("src", imgPath);
				$(this).removeClass("hover");
			});
		}
	});
};

ctrl.setSelected = function(uri) {
	ctrl.sel("li").each(function(){
		var a = $(this).find("a");
		var indexUri = a.attr("href");
		if(indexUri.indexOf(uri) >= 0){
			var img = $(this).find("img");
			var selImgPath = img.attr("selImgPath");
			if(selImgPath && selImgPath.length > 1){
				img.attr("src", selImgPath);
			}
			$(this).addClass("hover");
		}
	});
};
