var actSerial = location.pathname.split('/')[3].split('&');
ctrl.startup = function() {
	// var  id = location.pathname.split('/')[3],
	// 	 pdata = {_key:""};
	var  id = actSerial[0],
		pdata = {_key:""};

	var  req = {url: '/core/user/activate/'+id,
				post:pdata};

	__.api( req, function(data) {
		//console.log("usrAccAct : "+data);
		if (data.errCode === 0) {
			alert('<%=ph.js_ACC_SUCCESS_MSG%>');
			fastTrack();
			/*
			if  (actSerial[1] && actSerial[2] ) {
				var  org = actSerial[1],  //暫時用 accName
				caCode = actSerial[2];
				
				if (org && org.length > 0 && org.length < 6)
					alert('Team code should be at least 6 characters long.');
				else if (caCode && caCode.length > 0 && caCode.length < 6)
					alert('The code name for a client-app should be at least 6 characters long.');
				else {
					fastTrack();
					return;
				}
		
			}
			else 
				fastTrack();
			*/
			//window.location = '/bkWrapper/manage';
		}
		else {
			alert(data.message);
			window.location = '/';
		}
	});
};

function fastTrack() {
	var  org = actSerial[1], /* 暫時用 accName */
	caCode = actSerial[2];
	
	var  pdata = {};
	if (org && org != 'undefined')
		pdata.org = org;
	if (caCode && caCode != 'undefined')
		pdata.ca = caCode;
	
	var  reqData = {url: 'wcoim/admin/user/fastTrack', post: pdata, hasCA: true};
	__.api(reqData, function(data) {
		if (data.errCode === 0) {
			alert('<%=ph.js_BUILT_MSG%>');
			ctrl.sel('p').html('<%=ph.js_REDIRECTIONG_MSG%>');
		}
		else
			alert('fail... \n'+data.message);
		
		//window.location = '/bkWrapper/manage';
		// 自動切換團隊，導到首頁
        var  teamUri = {url: '/admin/user/teamList/'};
        __.api(teamUri, function(data) {
      	  if (data.errCode ===0 && data.value.list.length > 0) {
      		  var  orgID = data.value.list[0].orgID;
      		  var  req = {url: '/admin/user/onTeam/'+orgID};
      		  __.api( req, function(data) {
      			  window.location = '/bkWrapper/manage';
      		  });
      	  }
        });
	});
};
