var  infoClose = 1,
	 expenseClose = 1;

ctrl.startup = function() {
	__.getCtrl("spLeftMenu").selMenu("spContents");
	
	var type = ctrl.sel('.spManage').attr("work");
	
	if (type == 1) {
		ctrl.sel('ul.nav li.work1').addClass('active');
		ctrl.sel('.tab-content #c1').addClass('in active');
		ctrl.embedInfo();
	}
	else if (type == 2) {
		ctrl.sel('ul.nav li.work2').addClass('active');
		ctrl.sel('.tab-content #c2').addClass('in active');
		ctrl.embedExpense();
	}
};

ctrl.embedInfo = function() {
	if (infoClose) {
		ctrl.embed(".tab-content #c1", "/spContents/info");
		infoClose = 0;
	}
};

ctrl.embedExpense = function() {
	if (expenseClose) {
		ctrl.embed('.tab-content #c2', '/spContents/expense');
		expenseClose = 0;
	}
};