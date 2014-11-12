ctrl.startup = function() {
	var  ngID = ctrl.sel(".matter").attr("ngID"),
	 	 req = {url: '/coim/bkIndexNews/view/'+ngID};

	__.api( req, function(data) {
		if (data.errCode === 0) {
			var  value = data.value,
				 mdTime = value.mdTime;
			var  time = new Date(mdTime),
				 month = (time.getMonth() + 1).toString(),
				 day = time.getDate().toString(),

			month = (month.length > 1) ? month : "0"+month;
			day = (day.length > 1) ? day : "0"+day;

			ctrl.sel("span.title").html(value.title);
			ctrl.sel("span.strMdTime").html(time.getFullYear()+"-"+month+"-"+day);
			ctrl.sel("span.dspName").html(value.dspName);
			ctrl.sel(".body").html(value.body);
		}
	});


	ctrl.loadList();
};
ctrl.loadList = function() {
	var req = {url:'/coim/bkIndexNews/list', post:{_pn:1, _ps:20}},
			items = '';
	__.api(req, function(data) {
		if (data.errCode === 0) {
			data.value.list.forEach(function(i) {
				var t = new Date(i.mdTime);
				t = t.getFullYear() +'-'+ ('0'+(t.getMonth()+1)).slice(-2) +'-'+ ('0'+t.getDate()).slice(-2);
				items += '<a href="/coimIndexNews/view?id='+i.ngID+'"><li>';
				items += '<h4>'+i.title+'</h4><span>'+t+'</span>';
				items += '</li></a>';
			});

			items += '<a href="/coimIndexNews/list?_pn=1&_ps=5"><li>>> 看更多</li></a>';
			ctrl.sel('#newsSelector ul').html(items);
		} else {
			alert(data.errCode);
		}
	});
};
