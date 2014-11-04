ctrl.setApp = function(title, appCode) {
  ctrl.sel('.appCode').attr('appCode', appCode);
  ctrl.sel('.appCode').text(title);
};

ctrl.loadApplyList = function() {
  var appCode = ctrl.sel('.appCode').attr('appCode');
  ctrl.embed('.applyList', '/custContents/applyList', {params: {appCode: appCode}}, function(emCtrl) {
    emCtrl.addHandler('ReqApplyList', ctrl.loadApplyList);
  });
};
