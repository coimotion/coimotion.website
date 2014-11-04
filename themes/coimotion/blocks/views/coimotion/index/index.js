ctrl.startup = function() {
  	ctrl.sel(".pageListContainer .pageItem").each(function(){
      	var ngID = $(this).find("input[name=ngID]").val();
		var target = $(this);
      	$.post( '/coimotion/view.wsj/'+ngID, {}, function(data) {
      		target.find(".pageBody").append(data.value.body);
		});
    });
};