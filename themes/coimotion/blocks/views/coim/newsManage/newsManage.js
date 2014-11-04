ctrl.startup = function() {
	var  pn = ctrl.sel("#newside").attr("pn"),
	 	 ps = ctrl.sel("#newside").attr("ps");
	
	if (!pn || pn == 'undefined')
		pn = 1;
	if (!ps || ps == 'undefined')
		ps = 10;
	
	var  ngID = ctrl.sel("#newside").attr("ngID");
	var  params = {_pn: pn, _ps: ps},
		 post = {params: params};
	/*
	if (ngID && ngID != 'null')
		post.id = ngID;
	
	ctrl.embed('.newsList', '/coim/newsList', post ,function(emCtrl) {
		emCtrl.addHandler("regView", ctrl.regView);
	});
	*/
	if (ngID && ngID != 'null') {
		post.id = ngID;
		ctrl.embed('.newsList', '/coim/newsList', post);
		ctrl.embed('.newsView', '/coim/newsView', {id: ngID});
	}
	else {
		var  targetPn = ((pn-1) * ps) +1;
		$.post( "/coim/newsList.wsj", {_pn: targetPn, _ps:1, _key: ""}, function(data) {
			if (data.value && data.value.list.length > 0) {
				ngID = data.value.list[0].ngID;
				post.id = ngID;
				ctrl.embed('.newsList', '/coim/newsList', post);
				ctrl.embed('.newsView', '/coim/newsView', {id: ngID});
			}
		});
	}
		
};

ctrl.regView = function(ngID) {
	console.log("ngID: "+ngID);
	ctrl.embed('.newsView', '/coim/newsView', {id: ngID});
};