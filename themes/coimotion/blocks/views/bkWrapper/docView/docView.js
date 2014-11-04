ctrl.startup = function() {
	
	getSubTitle();
	getLogPage();
};

var  index = 1;

function getSubTitle() {
	var  menu = "";
	
	ctrl.sel('.bkManage h3').each(function() {
		$(this).attr('id', 'sub'+index);
		
		var  title = $(this).text();
		
		menu += '<li>';
		menu += '<a href="#sub'+index+'">';
		menu += title;
		menu += '</a></li>';

		index++;
	});
	
	
	var ngID = ctrl.sel('.bkManage').attr('ngID');
	__.getCtrl("docMenu").getSubMenu(ngID, menu);
};

function getLogPage() {
	//取得log文件
	var  logNgID = ctrl.sel('.bkManage').attr('logID'),
		 req = {url: '/coim/log/view/'+logNgID};

	__.api( req, function(data) {
		if (data.errCode === 0 && data.value.body) {
			//加上changelog錨點
			var  menu = '<li>';
			menu += '<a href="#sub'+index+'">';
			menu += '<%=ph.releaseNote%>';
			menu += '</a></li>';
			var ngID = ctrl.sel('.bkManage').attr('ngID');
			__.getCtrl("docMenu").getSubMenu(ngID, menu);
			
			ctrl.sel('.log').attr('id', 'sub'+index);
			ctrl.sel('.log').html(data.value.body);
		}
		else
			ctrl.sel('.log').remove();
	});
};