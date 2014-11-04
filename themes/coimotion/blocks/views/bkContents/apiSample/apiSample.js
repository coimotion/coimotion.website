
ctrl.startup = function() {

	var  //url = window.location.search,
		 url = ctrl.sel('.sample').attr('url');
		 urlS = url.split('?');
		 params = "{",
		 sampleUrl = "";

	url = urlS[0];
	if (urlS.length > 1) {
		p = urlS[1].split('&');

		p.forEach(function(item) {
			var  s = item.split('=');
			if (params !== "{")
				params += ",";
			params += '"'+s[0]+'":"'+s[1]+'"';
		});
	}

	params += "}";
	params = JSON.parse(params);

	sampleUrl = url;
	/*
	if (url.substring(0,1) === '/')
		url = "tryApp"+url;
	else {
		url = "tryApp/"+url;
		sampleUrl = "/"+sampleUrl;
	}
	*/
	params.path = url;

	if (urlS.length > 1)
		ctrl.sel("span.api").html("http://[Your_App_Code].coimapi.tw/"+sampleUrl+"?"+urlS[1]);
	else
		ctrl.sel("span.api").html("http://[Your_App_Code].coimapi.tw/"+sampleUrl);
	/*
	 var  tryAppKey = '386d4e63-1044-c268-efd1-2de1b2e5b4e1';
	 params._key = tryAppKey;
	*/

	var  req = {url:'/redirect.wsj', post:params, hasCA:true};
	$.post(req.url, req.post, function(data) {
		ctrl.sel(".out pre code").append(JSON.stringify(data, undefined, 2));
		$('.out code').each(function(i, e) {hljs.highlightBlock(e, null, true);});
	});
	/*
	var  req = {url:url, post:params, hasCA:true};
	__.api( req, function(data) {
		alert(JSON.stringify(data));
		ctrl.sel(".out pre code").append(JSON.stringify(data, undefined, 2));
		$('.out code').each(function(i, e) {hljs.highlightBlock(e, null, true);});
	});
	*/
};
