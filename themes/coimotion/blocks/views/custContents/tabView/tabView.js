ctrl.startup = function() {
	ctrl.loadCaCate();
	// var  orgID = getOrgID(),
	// 	 params = {orgID:orgID};
	//
	// ctrl.embed('.selfRsList', '/custContents/rsList', {id:getAppCode(), params:params}, function(emCtrl) {
	// 	emCtrl.addHandler("reqReloadRsList", ctrl.reloadRsList);
	// });
	$('ul[cate="locale"] li').click(function(e) {
		$('.btn-group span#locale').attr('_loc', $(this).val());
		$('.btn-group span#locale').text($(this).text());
		$('div.matter').attr('_loc', $(this).val());

		ctrl.embedTab();
	});

	/*var  path = {title:"自製內容", href:"/custContents/list/"+getOrgID()},
		subPath = [{subT:getAppCode()}];
	path.subPath = subPath;
	__.getCtrl("bkMenu").setPath(path);*/
	// ctrl.testLoad();
};
ctrl.loadCaCate = function() {
	var orgID = getOrgID();
	var pdata = {appCode: getAppCode()};
	var req = {url:'/admin/wapp/caList/'+orgID, post:pdata};
	__.api(req, function(data)  {
		var el = ctrl.sel('ul[cate="ca"]'),
				top = ctrl.sel('.btn-group span#ca');
		var lis = '';
		if (data.errCode === 0)  {
			if ( data.value && data.value.list.length > 0) {
				if ( el === 'undefined' ) {
					top.attr('ca', data.value.list[0].caCode);
					top.text(data.value.list[0].title);
				}

				data.value.list.forEach(function(item) {
					lis += '<li><a ';
					if (getCA() !== 'undefined')
						lis += 'id="defCA" ';
					lis += 'ca="'+item.caCode+'">'+item.caCode+'</a></li>';
				});
				el.append(lis);


				$('ul[cate="ca"] li a').click(function(e) {
					$('ul[cate="ca"]').siblings().removeClass('highlight');
					$('ul[cate="rs"]').siblings().addClass('highlight');
					top.attr('ca', $(this).attr('ca'));
					top.text($(this).text());
					ctrl.loadRsCate();
				});

				if (getCA() !== 'undefined')
					$('#defCA').click();
			}

		} else {
			alert( data.message );
		}
	});
};
/* 載入 文章 清單 */
ctrl.loadRsCate = function() {
	// var req = {url:"/admin/cnt/listCat/"+appCode, post:pdata};
	var req = {url:"/admin/cnt/listCat/"};
	if (getAppCode() === 'undefined') {
		return false;
	}
	req.url += getAppCode();


	__.api(req, function(data)  {
		var el = ctrl.sel('ul[cate="rs"]'),
				article = ctrl.sel('span#rs');
		var lis = '';
		$('span#rs').text('<%=ph.rs%>');
		if (data.errCode === 0)  {
			if ( data.value && data.value.list.length > 0) {
				// TESTING: rs
				if (article.attr('rs') === 'undefined') {
					article.attr('rs', data.value.list[0].rs);
					article.text(data.value.list[0].title);
				}

				data.value.list.forEach(function(item) {
					// console.log('here:'+JSON.stringify(item));
					// lis += '<li><a rs="'+item.rs+'">'+item.rs+'</a></li>';
					lis += '<li><a rs="'+item.rs+'" geo="'+item.geo+'">';
					if (item.geo === false)
						lis += '<i class="fa fa-file-text-o"></i> ';
					else
						lis += '<i class="fa fa-map-marker"></i> ';
					lis += item.rs+'</a></li>';
				});
				el.html(lis);

				$('ul[cate="rs"] li a').click(function(e) {
					$('ul[cate="rs"]').siblings().removeClass('highlight');
					$('.btn-group span#rs').attr('rs', $(this).attr('rs'));
					$('.btn-group span#rs').text($(this).text());
					$('div.matter').attr('rs', $(this).attr('rs'));
					$('div.matter').attr('geo', $(this).attr('geo'));
					/* find someone dead */
					// if ($(this).attr('geo') === 'true') {
					// 	ctrl.isTheGeoDead(getCA(), getAppCode(), getRs());
					// }
					/* * */
					ctrl.embedTab();
				});

			}

		} else {
			alert( data.message );
		}
	});
};

ctrl.embedTab = function() {
	var params = {"ca": getCA(), "appCode": getAppCode(), "rs": getRs(), "geo": isGeoRs(), "_loc": getLocale()},
			tabName = ( isGeoRs() ) ? 'rsGeo' : 'rsArticle';
	// ctrl.embed('.selfRsArticle', '/custContents/rsArticle', {params: params}, function(emCtrl) {
	ctrl.embed('#tabContent', '/custContents/'+tabName, {params: params}, function(emCtrl) {
		emCtrl.addHandler('reqReloadRsTab', ctrl.embedTab);
	});
};

/* find someone geo's info is dead */
ctrl.isTheGeoDead = function(ca, wa, rs) {
	// console.log('CA:'+ca+'\nWA:'+wa+'\nRS:'+rs);
	var array = [], results = [],
			req = {url: ca+'/'+wa+'/'+rs+'/listGeo', hasCA:1};
	console.log('requested api: '+req.url);
	__.api(req, function(data) {
		if (data.errCode === 0) {
			// console.log(JSON.stringify(data));
			data.value.list.forEach(function(item) {
				console.log('here! (ge)='+item.geID);
				array.push(item.geID);
			});

			console.log(array);
			array.forEach(function(ge) {
				var rEq = {url: ca+'/'+wa+'/'+rs+'/info/'+ge, hasCA:1, post: {detail: 1}};
				console.log('requested api: '+rEq.url);
				__.api(rEq, function(item) {
					// console.log('  here! (item)='+JSON.stringify(item));
					if (item.errCode === 0) {
						var reQ;
						if (item.value.ngID) {
							reQ = {url: ca+'/'+wa+'/'+rs+'/view/'+item.value.ngID, hasCA:1, post: {detail: 1}};
							__.api(reQ, function(ng) {
								if (ng.errCode !== 0) {
									results.push(item.value.ngID);
									console.log('ge: '+ge);
									console.log('errCode: '+ng.errCode);
									console.log('results: '+results);
								}
							});
						}
					}
				});
			});
		}
	});
};

function getLocale() {
	return ctrl.sel('div.matter').attr('_loc');
}
function getRs() {
	return ctrl.sel('div.matter').attr('rs');
}
function isGeoRs() {
	return ctrl.sel('div.matter').attr('geo') === 'true';
}
function getAppCode() {
	return ctrl.sel('span#wa').text();
}
function getCA() {
	return ctrl.sel('span#ca').attr('ca');
}
function getOrgID() {
	return location.pathname.split('/').reverse()[0];
}
