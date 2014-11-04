ctrl.creatTeam = function() {
	var  pdata = collectData();

	var re =  /^[\d|a-zA-Z0-9]+$/;
	if (!re.test(pdata.orgCode) || pdata.orgCode.length < 6) {
		alert(ctrl.sel('._MSG').attr('text'));
		return;
	}
	
	if (pdata.title.length === 0) {
		alert(ctrl.sel('._MSG').attr('titleErr'));
		return;
	}

	$.post('/appTeam/create.wsj', pdata, function(data)  {
		if (data.errCode == 0) {
			var  orgID = data.value.id;
			var  req = {url: '/admin/user/onTeam/'+orgID};
			/*自動切換為新團隊*/
			__.api( req, function(data) {
				if (data.errCode == 0) {
					window.location = "/appTeam/manage/"+orgID;
				}
			});
		}
		else if (data.errCode == -4)
			alert(ctrl.sel('._MSG').attr('orgCodeErr'));
		else
			alert( data.message );
	});
};

function  collectData()  {
	var  pdata = {orgCode: ctrl.sel('input[name="orgCode"]').val(),
				  title: ctrl.sel('input[name="title"]').val(),
				  docBody: ctrl.sel('textarea[name="docBody"]').val()};
	return  pdata;
};
