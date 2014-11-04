ctrl.startup = function() {
  ctrl.sel(".gallery .menu .item").each(function(){
    	$(this).mouseover(function(){
          	var target = $(this).find('img');
           	var img = target.attr("mouseover");
          	target.attr("src", img);
        }).mouseout(function(){
          	var target = $(this).find('img');
           	var img = target.attr("mouseout");
          	target.attr("src", img);
          	
          	target = $(this).find('a.hover img');
          	img = target.attr("mouseover");
          	target.attr("src", img);
        });
  });
};

ctrl.selOpen = function(selNum) {
  ctrl.clear();
  ctrl.sel(".gallery .menu .item:eq("+selNum+") a").addClass('hover');
  ctrl.sel(".gallery .img img").attr("src","../../wcoim/theme/banner1.png");
  ctrl.sel(".gallery .bar img").attr("src","../../wcoim/theme/Ellipse-1.png");
};

ctrl.selDel = function(selNum) {
  ctrl.clear();
  ctrl.sel(".gallery .menu .item:eq("+selNum+") a").addClass('hover');
  ctrl.sel(".gallery .img img").attr("src","../../wcoim/theme/banner2.png");
  ctrl.sel(".gallery .bar img").attr("src","../../wcoim/theme/Ellipse-2.png");
};

ctrl.selMon = function(selNum) {
  ctrl.clear();
  ctrl.sel(".gallery .menu .item:eq("+selNum+") a").addClass('hover');
  ctrl.sel(".gallery .img img").attr("src","../../wcoim/theme/banner3.png");
  ctrl.sel(".gallery .bar img").attr("src","../../wcoim/theme/Ellipse-3.png");
};

ctrl.clear = function() {
	ctrl.sel(".gallery .menu .item a").removeClass("hover");
  	ctrl.sel(".gallery .menu .item img").each(function(){
        img = $(this).attr("mouseout");
        $(this).attr("src", img);
    });
};
