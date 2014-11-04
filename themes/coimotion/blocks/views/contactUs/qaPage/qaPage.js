ctrl.startup = function() {
	__.getCtrl("menuMain").setSelected("contactUs/qaPage");
};

ctrl.doPost = function() {
	var  pdata = collectData();
	
	$.post('/contactUs/post.wsj', pdata, function(data)  {
		if (data.errCode === 0) {
			alert( data.message );
			window.location = '/contactUs/qaPage';
		}
		else
			alert( data.message );
	});
};

function  collectData()  {
	var  pdata = {name: ctrl.sel('input[name="name"]').val(),
				  email: ctrl.sel('input[name="email"]').val(),
				  title: ctrl.sel('input[name="title"]').val(),
				  summary: ctrl.sel('textarea[name="summary"]').val()};
	return  pdata;
};