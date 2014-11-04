ctrl.startup = function() {
	/*var  path = {title:"自製內容"};
	__.getCtrl("bkMenu").setPath(path);*/

	
	var position = __.getCtrl("bkMenu").getPosition();
	if (position != 'manager') {
		//ctrl.sel('.isManage').hide();
		ctrl.sel('.deleteTd').hide();
		
		var  targ = ctrl.sel('.isManage a');
		targ.attr('href', 'javascript:alert("'+'<%=ph.js_IS_MANAGER%>'+'");');
		targ.attr('data-toggle', null);
		targ.attr('data-target', null);
		
	}
};

ctrl.create = function() {
	var  pdata = collectData();

	var re =  /^[\d|a-zA-Z0-9]+$/;
	if (!re.test(pdata.appCode) || pdata.appCode.length < 6) {
		alert('<%=ph.js_CACORD_ERR%>');
		return;
	}

	if (pdata.title.length === 0) {
		alert('<%=ph.js_TITLE_ERR%>');
		return;
	}

	var  id = location.pathname.split('/').reverse()[0];

	$.post( '/custContents/create.wsj/'+id, pdata, function(data)  {
		if (data.errCode === 0)  {
			ctrl.sel(".modal").modal('hide').on('hidden.bs.modal', function () {
				//ctrl.reload("/custContents/list", {"id":id});
				window.location = "/custContents/list/"+id;
			});
		}
		else
			alert( data.message );
	});
};

ctrl.showInfo = function(appCode) {
	$('#infoModal').modal('show');
	ctrl.embed('.rsInfo', '/custContents/info', {id: appCode}, function(emCtrl) {
		emCtrl.addHandler("regCloseInfo", ctrl.closeInfo);
	});
};
ctrl.closeInfo = function() {
	$('#infoModal').modal('hide').on('hidden.bs.modal', function () {
		window.location = "/custContents/list/"+location.pathname.split('/').reverse()[0];
	});
};

function  collectData()  {
	var  pdata = { appCode: ctrl.sel('input[name="appCode"]').val(),
				   title: ctrl.sel('input[name="title"]').val(),
				   descTx: ctrl.sel('textarea[name="descTx"]').val(),
				   isPub : ctrl.sel('input:checked[name="isPub"]').val(),
				   isFree: ctrl.sel('input:checked[name="isFree"]').val()};
	return  pdata;
};

ctrl.isShowFree = function() {
	var isPub = ctrl.sel('input:checked[name="isPub"]').val();
	if(isPub)
		ctrl.sel('.isFreeBox').show();
	else {
		ctrl.sel('.isFreeBox').hide();
		ctrl.sel('input:checked[name="isFree"]').prop('checked',false);
	}
};

ctrl.deleteCon = function(title, appCode) {
	var msg = "<%=ph.js_DEL_MSG%> "+title+" ?";
	
	if (confirm(msg)) {
		var  req = {url: '/admin/wapp/delete/'+appCode};

		__.api( req, function(data) {
			if (data.errCode === 0) {
				var  id = location.pathname.split('/').reverse()[0];
				window.location = "/custContents/list/"+id;
			}
			else
				alert( data.message );
		});
	}
};
