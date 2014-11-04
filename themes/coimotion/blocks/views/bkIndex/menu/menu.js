var  id = location.pathname.split('/')[3];
var	pn = 0;
ctrl.startup = function() {
	/*
	if (!location.pathname.split('/')[3]) {
		ctrl.sel('.firstLoginView').modal('show');
	}*/
	/*檢查如果沒有加ID，但有團隊則列出團隊清單提供選擇*/
	if (!id) {
		var  req = {url: '/admin/user/teamList'};

		__.api( req, function(data) {
			var  value = data.value;
			if (value && value.list.length > 0) {
				var hasTeam = 0;
				value.list.forEach(function(item) {
					if(item.status == 0) /*表示目前有存在某團隊*/
						hasTeam = 1;
				});
				console.log(hasTeam);
				if (hasTeam) {
					ctrl.sel('.teamListView').modal('show');
					ctrl.embed(".teamListBody", "/bkIndex/teamList");
					ctrl.sel('.subbg').hide();
				}
				else
					ctrl.sel('.firstLoginView').modal('show');
			}
			else
				ctrl.sel('.firstLoginView').modal('show');
		});
	}

	ctrl.loadInfoBoard(0);
};

ctrl.showTab = function(action) {
	if (action == 'createTeam') {
		ctrl.sel(".subbg").css('z-index', 3);
		ctrl.sel(".subbg.fastTrack").css('z-index', 1);
		ctrl.sel(".ft").fadeToggle();
	} else { /* fastTrack */
		ctrl.sel(".subbg").css('z-index', 1);
		ctrl.sel("#circleSmall").fadeToggle();
		ctrl.sel(".subbg.fastTrack").css('z-index', 3);
	}
};

var j=0;
ctrl.setClick = function() {
	if(j == 0) {
		j = 1;
				ctrl.sel(".subbg").animate({top:70},1000,"easeOutBounce");
        ctrl.sel(".circleSmall").find("span:eq(1)").removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    else if(j == 1) {
        j = 0;
        ctrl.sel(".subbg").animate({top:-334},1000,"easeOutBounce");
        ctrl.sel(".circleSmall").find("span:eq(1)").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    }
};

ctrl.loadInfoBoard = function(type, _pn) {
	var params = {_pn: _pn || 1, _ps: 10, orgID: id};
	switch (+type) {
	/*'bkCnt'*/
	case 0:
		ctrl.embed('.bkCntIndex', '/bkIndex/bkCntIndex', {params: params}, function(emCtrl) {
			emCtrl.addHandler('reqReloadBkCnt', function(pn) {
				alert('reqReloadBkCnt');
				ctrl.loadInfoBoard(type, pn);
			});
		});
		break;
	/*'news'*/
	case 1:
		ctrl.embed('.newsIndex', '/bkIndex/newsIndex', {params: params}, function(emCtrl) {
			emCtrl.addHandler('reqReloadNews', function(pn) {
				alert('reqReloadNews');
				ctrl.loadInfoBoard(type, pn);
			});
		});
		break;
	/*'paper'*/
	case 2:
		ctrl.embed('.paperIndex', '/bkIndex/paperIndex', {params: params}, function(emCtrl) {
			emCtrl.addHandler('reqReloadPaper', function(pn) {
				alert('reqReloadPaper');
				ctrl.loadInfoBoard(type, pn);
			});
		});
		break;
	}
};
