var  waList;

ctrl.startup = function() {
	ctrl.sel("._datepicker").datepicker({format: "yyyy-mm-dd"});
	
	//var  path = {title:"統計數字"};
	//__.getCtrl("bkMenu").setPath(path);
	
	/*預設查詢時間*/
	ctrl.setDefTime();
	
	ctrl.embedAppList();
	ctrl.sel("li.hasApp").hide();
};

ctrl.embedAppList = function() {
	var  id = location.pathname.split('/').reverse()[0],
		 params = {},
		 caID = getCaID();
	
	if(caID)
		params.caID = caID;
	
	ctrl.embed(".selApp", '/statistics/appList', {"id":id, "params":params}, function(emCtrl) {
		emCtrl.addHandler("reqEmbedCa", ctrl.embedCa);
	});
};

ctrl.embedCa = function(p) {
	ctrl.showWaMemu(0);
	
	var  tarCa = ctrl.sel('.appID span');
		 tarCa.attr("caID", p.caID);
		 tarCa.html(p.title);
	ctrl.sel("li.hasApp").show();
	
	var  target = ".statList";
	 	 params = {from:ctrl.getStartTm(), to:ctrl.getEndTm()};
	 	 
	//ctrl.sel(target).empty();
	ctrl.embed(target, '/statistics/byCaList', {"id":p.caID,"params":params}, function(emCtrl) {
		emCtrl.addHandler("reqSetWaMenuParams", ctrl.setWaMenuParams);
		emCtrl.addHandler("reqEmbedWa", ctrl.embedWa);
	});

};

ctrl.setWaMenuParams = function(data) {
	waList = data;
};

ctrl.embedWa = function(waCode) {
	var  target = ".statList",
		 caID = getCaID(),
		 params = {from:ctrl.getStartTm(), to:ctrl.getEndTm()};
	
	params.wa = waCode;
	//ctrl.sel(target).empty();
	ctrl.showWaMemu(1);
	ctrl.embed(target, '/statistics/byWaList', {"id":caID,"params":params});
	
	var  data = {waCode:waCode, waList:waList};
	ctrl.setWaMenu(data);
};

ctrl.setCaSelf = function() {
	var  tar = ctrl.sel(".appID span"),
		 caID = tar.attr("caID"),
		 title = tar.html(),
		 params = {caID:caID, title:title};
	
	ctrl.embedCa(params);
};

ctrl.showWaMemu = function(is) {
	if(is) {
		ctrl.sel('.waTitle').show();
		ctrl.sel('.waList').show();
	}
	else {
		ctrl.sel('.waTitle').hide();
		ctrl.sel('.waList').hide();
	}
};

ctrl.setWaMenu = function(data) {
	var thisWa = data.waCode;
	if (thisWa) {
		ctrl.sel('span.waCode').html(thisWa);
		
		waList = data.waList;
		var  target = ctrl.sel('.wappMenu'),
			 thisCtrl = target.attr('thisCtrl');
		
		target.empty();
		for (var i=0; i<waList.length; i++) {
			if (waList[i] !== thisWa) {
				var  tx = '<li><a href="javascript:'+thisCtrl+".embedWa('"+waList[i]+"'"+');">';
				tx += waList[i]+"</a></li>";
				target.append(tx);
			}
		}
	}
};

function getCaID() {
	return ctrl.sel('.hasApp .appID').find('span').attr('caID');
};

ctrl.setDefTime = function() {
	var  now = new Date(),
		 startTm =  new Date(now.setMonth(now.getMonth()-1));
	
	var  startM = startTm.getMonth()+1;
	if (startM < 10)
		startM = "0"+startM;
	
	var  startD = startTm.getDate();
	if (startD < 10)
		startD = "0"+startD;
	
	var  startDate = startTm.getFullYear()+"-"+startM+"-"+startD;
	ctrl.sel('input[name=startDate]').val(startDate);

	var  endTm = new Date();
	var  endM = endTm.getMonth()+1;
	if (endM < 10)
		endM = "0"+endM;
	
	var  endD = endTm.getDate();
	if (endD < 10)
		endD = "0"+endD;
	
	var  endDate = endTm.getFullYear()+"-"+endM+"-"+endD;
	ctrl.sel('input[name=endDate]').val(endDate);
};

ctrl.getStartTm = function() {
	return  ctrl.sel('input[name=startDate]').val();;
};

ctrl.getEndTm = function() {
	return  ctrl.sel('input[name=endDate]').val();;
};

ctrl.showDatePicker = function() {
	$('#datepicker').datepicker('show');
};
