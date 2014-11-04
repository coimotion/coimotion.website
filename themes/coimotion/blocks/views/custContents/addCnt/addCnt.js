var isPub = 0;

ctrl.create = function(ca, appCode, rs) {
  var  pdata = collectData();
  var req = {url:ca+'/'+appCode+'/'+rs+'/create', post:pdata, hasCA:true};
  __.api(req, function(data) {
    if (data.errCode === 0) {
      //alert( '新增一筆文章' );
      ctrl.callHandler("regCloseAddCnt");
      ctrl.callHandler("reqReloadRsArticle");
    } else {
      alert( data.message );
    }
  });
};

ctrl.changeStatus = function() {
  isPub = ++isPub % 2;
  ctrl.sel('input[name="isPublic"]').val(isPub);
};

function  collectData()  {
  var  pdata = { title: ctrl.sel('input[name="title"]').val(),
           summary: ctrl.sel('input[name="summary"]').val(),
           body: ctrl.sel('textarea[name="body"]').val(),
           isPublic: ctrl.sel('input[name="isPublic"]').val()};
  return  pdata;
};
