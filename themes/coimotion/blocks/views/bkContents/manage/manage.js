var  isIncludeFree = 1;
var  orgID = location.pathname.split('/')[3];

ctrl.startup = function () {
	var  caID = getCaID();

	if (isIncludeFree) {
		var  params = {"free":1, "caID":caID, "caCode":getCaCode()};
		ctrl.embed('.freeBlock', '/bkContents/free', {"id":orgID, "params":params}, function(emCtrl) {
			emCtrl.addHandler("reqReloadFree", ctrl.reqReloadFree);
		});
		isIncludeFree = 0;
	}
	/*顯示授權使用的頁籤，第一階段暫時不顯示*/
	
	if (caID) {

		ctrl.sel('.custlistBlockHref').show();
		ctrl.sel('.custlistBlockHref').find('a').attr('href','#b0');
		var  params = {"free":0, "caID":caID, "caCode":getCaCode()};
		ctrl.embed('.custlistBlock', '/bkContents/custList', {"id":orgID, "params":params}, function(emCtrl) {
			emCtrl.addHandler("reqReloadCustlist", ctrl.reqReloadCustlist);
		});
	
		ctrl.sel('.incomeBlockHref').show();
		ctrl.sel('.incomeBlockHref').find('a').attr('href','#b2');
		var  params = {"free":0, "caID":caID, "caCode":getCaCode()};
		ctrl.embed('.incomeBlock', '/bkContents/income', {"id":orgID, "params":params}, function(emCtrl) {
			emCtrl.addHandler("reqReloadIncome", ctrl.reqReloadIncome);
		});
	}
	
	
	//var  path = {title:"內容寶庫"};
	//__.getCtrl("bkMenu").setPath(path);

	var defUsed = ctrl.sel('.matter').attr('defUsed');
	if (defUsed == '1')
		ctrl.selUsed(1);
};

ctrl.reqReloadFree = function() {
	var  used = ctrl.sel(".freeBlock").attr("filter"),
		caID = getCaID(),
		caCode = getCaCode(),
		params = {"used": used, "free": 1};

	if (caID) {
		params.caID = caID;
		params.caCode = caCode;
	}

	//ctrl.reload('/bkContents/free', {"id":orgID, "params": params}, ctrl.sel(".freeBlock"));
	ctrl.embed('.freeBlock', '/bkContents/free', {"id":orgID, "params":params}, function(emCtrl) {
		emCtrl.addHandler("reqReloadFree", ctrl.reqReloadFree);
	});
};

ctrl.reqReloadIncome = function() {
	var  used = ctrl.sel(".incomeBlock").attr("filter"),
		params = {"used": used, "free": 0, "caID":getCaID(), "caCode":getCaCode()};
	//ctrl.reload('/bkContents/income', {"id":orgID, "params": params}, ctrl.sel(".incomeBlock"));
	ctrl.embed('.incomeBlock', '/bkContents/income', {"id":orgID, "params":params}, function(emCtrl) {
		emCtrl.addHandler("reqReloadIncome", ctrl.reqReloadIncome);
	});
};

ctrl.reqReloadCustlist = function() {
	var  used = ctrl.sel(".custlistBlock").attr("filter"),
		params = {"used": used, "free": 0, "caID":getCaID(), "caCode":getCaCode()};
	//ctrl.reload('/bkContents/income', {"id":orgID, "params": params}, ctrl.sel(".incomeBlock"));
	ctrl.embed('.custlistBlock', '/bkContents/custList', {"id":orgID, "params":params}, function(emCtrl) {
		emCtrl.addHandler("reqReloadCustlist", ctrl.reqReloadCustlist);
	});
};


ctrl.selUsed = function(used) {
	if (used) {
		ctrl.sel(".selAll").removeClass('active');
		ctrl.sel(".selUsed").addClass('active');
	}
	else {
		ctrl.sel(".selAll").addClass('active');
		ctrl.sel(".selUsed").removeClass('active');
	}

	var  target = ctrl.sel("ul.nav li.active").find("a").attr("href");

	if(target == "#b0")
		ctrl.selCustlistUsed(used);
	else if(target == "#b1")
		ctrl.selFreeUsed(used);
	else if(target == "#b2")
		ctrl.selIncomeUsed(used);
};

ctrl.selFreeUsed = function(used) {
	var  params = {"used": used, "free":1},
		caID = getCaID(),
		caCode = getCaCode();

	if (used == "1" & !caID) { /*要列出以引用的內容集，需要給caID才能取得狀態*/
		ctrl.sel(".selAll").addClass('active');
		ctrl.sel(".selUsed").removeClass('active');
		alert('<%=ph.js_SELECT_APP%>');
	}
	else {
		if (caID) {
			params.caID = caID;
			params.caCode = caCode;
		}

		//ctrl.reload('/bkContents/free', {"id":orgID, "params": params}, ctrl.sel(".freeBlock"));
		ctrl.embed('.freeBlock', '/bkContents/free', {"id":orgID, "params":params}, function(emCtrl) {
			emCtrl.addHandler("reqReloadFree", ctrl.reqReloadFree);
		});
		ctrl.setFreeStatus(used);/*記錄目前畫面上的狀態*/
	}
};

ctrl.selIncomeUsed = function(used) {
	var  params = {"used": used, "free": 0, "caID":getCaID()};
	
	if (params.used == 1 & !params.caID) { /*要列出以引用的內容集，需要給caID才能取得狀態*/
		ctrl.sel(".selAll").addClass('active');
		ctrl.sel(".selUsed").removeClass('active');
		alert('<%=ph.js_SELECT_APP%>');
	}
	else {
		//ctrl.reload('/bkContents/income', {"id":orgID, "params": params}, ctrl.sel(".incomeBlock"));
		ctrl.embed('.incomeBlock', '/bkContents/income', {"id":orgID, "params":params}, function(emCtrl) {
			emCtrl.addHandler("reqReloadIncome", ctrl.reqReloadIncome);
		});
		ctrl.setIncomeStatus(used); /*記錄目前畫面上的狀態*/
	}
};

ctrl.selCustlistUsed = function(used) {
	var  params = {"used": used, "free": 0, "caID":getCaID()};

	//ctrl.reload('/bkContents/income', {"id":orgID, "params": params}, ctrl.sel(".incomeBlock"));
	ctrl.embed('.custlistBlock', '/bkContents/custList', {"id":orgID, "params":params}, function(emCtrl) {
		emCtrl.addHandler("reqReloadCustlist", ctrl.reqReloadCustlist);
	});
	ctrl.setCustlistStatus(used); /*記錄目前畫面上的狀態*/
};

ctrl.freeBlockReload = function() {
	var  btnStatus = ctrl.sel(".btn-group").find(".active").attr("filter"),
		target = ctrl.sel(".freeBlock").attr("filter");

	if (btnStatus != target)
		ctrl.selFreeUsed(btnStatus);
};

ctrl.incomeBlockReload = function() {
	var  btnStatus = ctrl.sel(".btn-group").find(".active").attr("filter"),
		target = ctrl.sel(".incomeBlock").attr("filter");

	if (btnStatus != target)
		ctrl.selIncomeUsed(btnStatus);
};

ctrl.custlistBlockReload = function() {
	var  btnStatus = ctrl.sel(".btn-group").find(".active").attr("filter"),
		target = ctrl.sel(".custlistBlock").attr("filter");

	if (btnStatus != target)
		ctrl.selCustlistUsed(btnStatus);
};

ctrl.setFreeStatus = function(used) {
	ctrl.sel(".freeBlock").attr("filter", used); /*記錄目前畫面上的狀態，全部或引用*/
};

ctrl.setIncomeStatus = function(used) {
	ctrl.sel(".incomeBlock").attr("filter", used); /*記錄目前畫面上的狀態，全部或引用*/
};

ctrl.setCustlistStatus = function(used) {
	ctrl.sel(".custlistBlock").attr("filter", used); /*記錄目前畫面上的狀態，全部或引用*/
};

function getCaID() {
	return ctrl.sel('.selApp .app').find('span').attr('caID');
};

function getCaCode() {
	return ctrl.sel('.selApp .app').find('span').attr('caCode');
};
