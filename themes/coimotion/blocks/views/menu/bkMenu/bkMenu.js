ctrl.setPath = function(path) {
	var  titleHref = path.href,
		 title = path.title;
	if (titleHref)
		title = '<a href="'+titleHref+'"><span>'+title+'</span></a>';
	ctrl.sel(".mainPath").empty().append(title+" ");
	
	if (path.subPath) {
		var  target = ctrl.sel(".subPath"),
			 subPath = path.subPath,
			 subSize = subPath.length;
		
		var  subHtml = '<span>'+subPath[0].subT+'</span>';
		if (subPath[0].href)
			subHtml = '<a href="'+subPath[0].href+'">'+subHtml+'</a>';
		target.empty().append(subHtml);
		
		for (var i=1; i<subSize; i++) {
			subHtml = '<span class="divider">/</span>';
			subHtml += '<span>'+subPath[i].subT+'</span>';
			if (subPath[i].href)
				subHtml = '<a href="'+subPath[i].href+'">'+subHtml+'</a>';
			target.append(subHtml);
		}
	}
};