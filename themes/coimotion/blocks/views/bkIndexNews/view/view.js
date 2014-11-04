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
};