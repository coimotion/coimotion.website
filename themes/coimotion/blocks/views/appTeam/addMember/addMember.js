
ctrl.add = function() {
	var  pdata = {"psnID": ctrl.sel('input[name="psnID"]').val(), "status":1};
	var  orgID = location.pathname.split('/').reverse()[0];
	
	$.post( '/appTeam/add.wsj/'+orgID, pdata, function(data)  {
		if (data.errCode == 0) {
			alert("OK!");
			//ctrl.callHandler("regCloseAddMem");
			ctrl.callHandler("reqReloadMemList");
		}
		else
			alert( data.message );
	});
};

function  collectData()  {
	var  pdata = {orgCode: ctrl.sel('input[name="orgCode"]').val(),
				  title: ctrl.sel('input[name="title"]').val(),
				  docBody: ctrl.sel('input[name="docBody"]').val()};
	return  pdata;
};

ctrl.getInfo = function() {
	var  email = ctrl.sel("input[name=email]").val(),
		 id = ctrl.getID(),
		 pdata = {"email":email},
		 
		 req = {url: '/admin/user/search/'+id,
				post: pdata};

	__.api( req, function(data) {
		if (data.errCode == 0) {
			var  value = data.value;
			ctrl.sel('input[name="psnID"]').val(value.psnID);
			ctrl.sel('.name p').html(value.dspName);
			ctrl.sel(".memberInfo").show();
			//ctrl.sel(".infobtn").hide();
			
		 	var  message = "";
		 	if (value.status) {
		 		var  status = value.status;

			 	if (status == 1)
			 		message = ctrl.sel('._MSG').attr('think');// 已送過邀請，等待回覆中..
			 	else if (status == 2)
			 		message = ctrl.sel('._MSG').attr('notConfirm'); //對方已主動申請加入，但您尚未確認...
			 	else if (status == -1) {
			 		message =  ctrl.sel('._MSG').attr('again'); //我方曾提出邀請但被對方婉拒或我方曾拒絕對方加入，確定要再次邀請嗎？
			 		ctrl.sel(".sendbtn").show().focus();
			 	}
		 	}
		 	else if (value.status === 0)
		 		message = ctrl.sel('._MSG').attr('isMember');
		 	else
		 		ctrl.sel(".sendbtn").show().focus();
		 	
		 	ctrl.sel(".statusMessage").html(message);
		}
		else
			alert(data.message);
	});
};

ctrl.getID = function() {
	var  uri = location.pathname;
	var  temp = uri.split('/');
	var  id = temp[temp.length-1];
	return id;
};