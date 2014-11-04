ctrl.fastTrack = function() {
    var  org = ctrl.sel('#orgCode').val(), /* 暫時用 accName */
         caCode = ctrl.sel('#caCode').val();

    if (org.length > 0 && org.length < 6)  {
        alert('Team code should be at least 6 characters long.');
        return;
    }
    if (caCode.length > 0 && caCode.length < 6)  {
        alert('The code name for a client-app should be at least 6 characters long.');
        return;
    }

    var  pdata = {org: org, caCode: caCode},
         reqData = {url: 'wcoim/admin/user/fastTrack', post: pdata, hasCA: true};
    __.api(reqData, function(data) {
        if (data.errCode === 0) {
          alert(data.message);
          // alert('success! \n'+JSON.stringify(data));
          /*
          success!
            {"errCode":0,"message":"Ok","
            value":{"caCode":"clifraeh","waCode":"clifraeh","appKey":"c8b7c629-4be6-1856-aad6-783017605581"}}
          */
          //window.location = '/appTeam/manage/'+data.orgID;
          // 自動切換團隊，導到團隊管理畫面
          var  teamUri = {url: '/admin/user/teamList/'};
          __.api(teamUri, function(data) {
        	  if (data.errCode ===0 && data.value.list.length > 0) {
        		  var  orgID = data.value.list[0].orgID;
        		  var  req = {url: '/admin/user/onTeam/'+orgID};
        		  __.api( req, function(data) {
        			  if (data.errCode === 0)
        				  window.location = '/appTeam/manage/'+orgID;
        			  else
        				  alert( data.message );
        		  });
        	  }
          });
          
        } else
          alert('fail... \n'+JSON.data.message);
    });
};
