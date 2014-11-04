ctrl.startup = function() {
	ctrl.embed('.docApiList', '/bkContents/apiList', {"id":getAppCode()}, function(emCtrl) {
		emCtrl.addHandler("reqReloadApiDoc", ctrl.reqReloadApiDoc);
	});
	
	/*為了讓沒有團隊的人看，必須可以沒有orgID*/
	/*
	var  orgID = location.pathname.split('/')[3],
		 href = "";
	if (orgID)
		href = "/bkContents/manage/"+orgID;
	else
		href = "/bkContents/manage";
	var  path = {title:"內容寶庫", href:href},
	 	 subPath = [{subT:getAppCode()+" API"}];
	path.subPath = subPath;
	__.getCtrl("bkMenu").setPath(path);
	*/
};

ctrl.reqReloadApiDoc = function(id) {
	ctrl.sel(".apiDoc").empty();
	//ctrl.reload('/bkContents/apiDoc', {"id":id}, ctrl.sel(".apiDoc"));
	ctrl.embed('.apiDoc', '/bkContents/apiDoc', {"id":id});
};

function getAppCode() {
	return ctrl.sel(".detailParams").attr("appCode");
}

ctrl.showApiData = function()  {
	var  params = {"dsp":1};/*只列出與資料顯示相關的API*/
	ctrl.embed('.dataApiList', '/bkContents/apiList', {"id":getAppCode(), params:params}, function(emCtrl) {
		//emCtrl.addHandler("reqReloadApiData", ctrl.reqReloadApiData); 
	});
};

ctrl.reqReloadApiData = function(id) {
	ctrl.sel("input.tarRsOp").attr("placeholder",id.replace(/\./g, "/"));
	ctrl.sel(".apiData").empty().html("請設定查詢條件");
	
	var  req = {url: '/admin/wop/input/'+id};
	var  tar = ctrl.sel(".apiParams");
	tar.empty();
	
	__.api( req, function(data) {
		if (data.list) {
			data.list.forEach(function(item) {
				var  bodyHtml = "<p>";
				bodyHtml += "變數 : "+item.key+", 範圍值: "+item.value+", 名稱: "+item.title+", 說明: "+item.descTx;
				bodyHtml += "</p>";
				tar.append(bodyHtml);
			});
		}
		else
			alert( "無輸入參數" );
	});
};

ctrl.showOutputData = function () {
	ctrl.sel(".apiData").empty();
	ctrl.embed('.apiData', '/bkContents/apiData', {"id":123});
};