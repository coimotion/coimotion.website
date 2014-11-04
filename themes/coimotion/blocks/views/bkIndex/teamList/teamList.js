ctrl.selTeam = function(orgID)  {
	var  req = {url: '/admin/user/onTeam/'+orgID};
	__.api( req, function(data) {
		if (data.errCode === 0)
			window.location = '/appTeam/manage/'+orgID;
		else
			alert( data.message );
	});
};