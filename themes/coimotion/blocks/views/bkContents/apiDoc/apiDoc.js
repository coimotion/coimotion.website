ctrl.startup = function() {


	var  id = ctrl.sel(".sidebarCon").attr("id"),
	 	 req = {url: '/admin/wop/apiDoc/'+id};

	__.api( req, function(data) {
		if (!data.errCode) {
			ctrl.setHtml(data);
		}
		else
			ctrl.sel('.sidebarCon').empty().append('<%=ph.js_NO_DOC_ERR%>');
	});

	/* dynamic height */
	//$('.sidebarCon').height($(window).height() - 220);
};

ctrl.setHtml = function(data) {
	ctrl.sel(".opTitle").append(data.title);
	ctrl.sel(".opDescTx").append(data.descTx);
	ctrl.sel(".opID").append(data.id);
	ctrl.sel(".opUrl").append("http://[Your_App_Code].coimapi.tw/"+data.url);
	/*範例*/
	if (data.sample) {
		ctrl.sel(".opSample").show();
		ctrl.sel(".opSample").attr("sampleUrl", data.sample);
	}

	/*查詢參數table*/
	var  tarQuery = ctrl.sel(".opQuery");
	data.query.forEach(function(item) {
		var  trHtml = '<tr>';
		trHtml += '<td>'+item.key+'</td>';
		trHtml += '<td>'+item.descTx+'</td>';
		trHtml += '</tr>';
		tarQuery.append(trHtml);
	});
	/*傳出變數table*/
	var  tarOut = ctrl.sel(".opOut");
	if (data.out && data.out.length > 0) {
		if (data.out instanceof Array){
			data.out.forEach(function(item) {
				var  trHtml = '<tr>';
				trHtml += '<td>'+item.key+'</td>';
				trHtml += '<td>'+item.descTx;
				if (item.more)
					trHtml += ctrl.hasMore(item.more);
				trHtml +='</td>';
				trHtml += '</tr>';
				tarOut.append(trHtml);
			});
		}
		else {
			var  trHtml = '<tr>';
			trHtml += '<td colspan="2">'+data.out+'</td>';
			trHtml += '</tr>';
			tarOut.append(trHtml);
		}
	}
	else {
		tarOut.empty();
	}
};

ctrl.hasMore = function(more) {
	var ulHtml = '<ul>';
	more.forEach(function(item) {
		ulHtml += '<li>'+item.key+" : "+item.descTx+'</li>';
		if (item.more)
			ulHtml += ctrl.hasMore(item.more);
	});
	ulHtml += '</ul>';
	return ulHtml;
};

ctrl.showSample = function() {
	/*var url = ctrl.sel(".opSample").attr("sampleUrl");
	window.open('/bkContents/apiSample?url='+url, 'apiSample');*/
	var  url = ctrl.sel(".opSample").attr("sampleUrl"),
	 	 params = {url:url};
	ctrl.embed("#sample", '/bkContents/apiSample', {params:params} ,function() {
		$("#sample").fancybox({
			//wrapCSS    : 'fancybox-custom',
			//closeClick : true,
			//openEffect : 'none',
			helpers : { title : { type : 'inside'  },  overlay : { css : { 'background' : 'rgba(238,238,238,0.85)' } } }
		}).click();
	});
};
