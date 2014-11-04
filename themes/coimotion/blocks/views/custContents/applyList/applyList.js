/*
ctrl.useApp = function (caID, used, name) {
  if (isOK == 0) {
    if (confirm("確定拒絕 "+name+" 的申請?"))
      ctrl.doUseApp(caID, used);
  }
  else
    ctrl.doUseApp(caID, used);
};
ctrl.doUseApp = function(caID, used) {};
*/
ctrl.useApp = function(caID, used) {
  var appCode = ctrl.sel(".params").attr("appCode"),
      pdata = {"caID": caID, "used": used};

  var req = {url: '/admin/wapp/useApp/'+appCode, post: pdata};

  __.api(req, function(data) {
    if (data.errCode === 0) {
      alert('ok');
      ctrl.callHandler("ReqApplyList");
    } else {
      alert(JSON.stringify(data));
    }
  });
};
