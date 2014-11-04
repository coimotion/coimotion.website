ctrl.update = function () {
	var  pdata = collectData();
	
	if (pdata.fname.length === 0) {
		alert('<%=ph.js_NAME_EMPTY_ERR%>');
		ctrl.sel('.updateBtn p').hide();
		return;
	}
	
	if (pdata.dspName.length === 0) {
		alert('<%=ph.js_NICKNAME_EMPTY_ERR%>');
		ctrl.sel('.updateBtn p').hide();
		return;
	}
	
	var  req = {url: '/core/user/update',
			post: pdata};
	
	__.api( req, function(data) {
		if (data.errCode === 0) {
			ctrl.sel('.updateBtn p').show();
			/*
			var id = location.pathname.split('/')[3];
			if (id) 
				window.location = '/user/manage/'+id;
			else
				window.location = '/user/manage';
			*/
		}
		else {
			alert( data.message );
			ctrl.sel('.updateBtn p').hide();
		}
	});
	
};

function  collectData()  {
	var  pdata = {dspName: ctrl.sel('input[name="dspName"]').val(),
				  fname: ctrl.sel('input[name="fname"]').val()};
	return  pdata;
};