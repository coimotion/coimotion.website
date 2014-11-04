var  isShowSelfInfo = 1;

ctrl.startup = function() {
	ctrl.loadCate(getAppCode());
	var  orgID = getOrgID(),
		 params = {orgID:orgID};

	ctrl.embed('.selfRsList', '/custContents/rsList', {id:getAppCode(), params:params}, function(emCtrl) {
		emCtrl.addHandler("reqReloadRsList", ctrl.reloadRsList);
	});
	/*
	var  path = {title:"自製內容", href:"/custContents/list/"+getOrgID()},
		 subPath = [{subT:getAppCode()}];
	path.subPath = subPath;
	__.getCtrl("bkMenu").setPath(path);*/

	switch (isGeoRs()) {
	case 'false':
		toggleTab('c3');
		break;
	case 'true':
		toggleTab('c4');
		break;
	default:
		toggleTab('c2');
	}
};

ctrl.loadCate = function(appCode) {
	var orgID = getOrgID();
	var pdata = {appCode: appCode};
	var req = {url:'/admin/wapp/caList/'+orgID, post:pdata};
	__.api(req, function(data)  {
		var el = ctrl.sel('ul[cate="ca"]');
		var lis = '';
		if (data.errCode === 0)  {
			if ( data.value && data.value.list.length > 0) {
				// TESTING: ca
				ctrl.sel('span#ca').attr('ca', data.value.list[0].caCode);
				ctrl.sel('span#ca').text(data.value.list[0].title);
				// console.log('first:'+JSON.stringify());
				data.value.list.forEach(function(item) {
					lis += '<li><a ca="'+item.caCode+'" href="./'+getOrgID()+'?appCode='+appCode+'&rs='+getRs()+'">'+item.title+'</a></li>';
				});
				el.append(lis);
				// console.log('load cate of CA: '+JSON.stringify(data.value));

				$('ul[cate="ca"] li a').click(function(e) {
					$('.btn-group span#ca').attr('ca', $(this).attr('ca'));
					$('.btn-group span#ca').text($(this).text());
				});

				if (isGeoRs() === 'true')
					ctrl.embedGeo();
				else
					ctrl.embedArticle();
			}

		} else {
			alert( data.message );
		}
	});
};

ctrl.reloadRsList = function() {
	var  orgID = eOrgID(),
	 	 params = {orgID:orgID};
	//ctrl.reloadappCodelfContents/rsList', {id:getAppCode(), params:params}, ctrl.sel('.selfRsList'));
	ctrl.embed('.selfRsList', '/custContents/rsList', {id:getAppCode(), params:params}, function(emCtrl) {
		emCtrl.addHandler("reqReloadRsList", ctrl.reloadRsList);
	});
};

ctrl.loadSelfInfo = function() {
	if (isShowSelfInfo) {
		var  id = getAppCode();
		ctrl.embed('.selfInfo', '/custContents/info', {id: id});
		isShowSelfInfo = 0;
	}
};

ctrl.embedArticle = function() {
	var params = {"ca": getCA(), "appCode": getAppCode(), "rs": getRs(), "geo": isGeoRs() };
	ctrl.embed('.selfRsArticle', '/custContents/rsArticle', {params: params}, function(emCtrl) {
		emCtrl.addHandler('reqReloadRsArticle', ctrl.embedArticle);
	});
};

ctrl.embedGeo = function() {
	var params = {"ca": getCA(), "appCode": getAppCode(), "rs": getRs()};
	ctrl.embed('.selfRsGeo', '/custContents/rsGeo', {params: params}, function(emCtrl) {
		emCtrl.addHandler('reqReloadRsGeo', ctrl.embedGeo);
	});
};


function getRs() {
	return ctrl.sel('div.matter').attr('rs');
}
function isGeoRs() {
	return ctrl.sel('div.matter').attr('geo');
}
function getAppCode() {
	return ctrl.sel('.selfInfo').attr("appCode");
}
function getCA() {
	return ctrl.sel('span#ca').attr('ca');
}
function getOrgID() {
	return location.pathname.split('/').reverse()[0];
}
function toggleTab(index) {
	var li_tag = 'li.'+index,
			div_tag = 'div#'+index;
	ctrl.sel(li_tag).addClass('active');
	ctrl.sel(div_tag).addClass('in active');
}
