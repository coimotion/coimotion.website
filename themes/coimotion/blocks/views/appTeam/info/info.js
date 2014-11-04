ctrl.startup = function() {
	sender.init();
	 
	/*如果不是管理者，則無法編輯資訊*/
	var position = __.getCtrl("bkMenu").getPosition();
	
	if (position != 'manager') {
		ctrl.sel('button.isManage').hide();
		ctrl.sel('input[name="title"]').prop('disabled', true);
		ctrl.sel('textarea').prop('disabled', true);
	}
};

var sender = {
  settings: {
    url: '/',
    type: 'POST',
    processData: false,
    contentType: false,
    success: function() {
      ctrl.sel('input[name="orgIcon"]').val('');
      window.location = location;
    },
    error: function(err) {
      alert(JSON.stringify(err));
    }
  },
  init: function() {
    var  orgID = ctrl.sel('.row').attr('id');
    
    sender.settings['url'] = '/wcoim/admin/appTeam/setIcon/'+orgID;
    
    ctrl.sel('#uploader').submit(sender.doUpload);
    ctrl.sel('input[name="orgIcon"]').change(function() {
      ctrl.sel('#uploader').submit();
    });
    sender.newUploadBtn(ctrl.sel('#addIcon'));
  },
  newUploadBtn: function(obj) {
    obj.click(function() {
      ctrl.sel('input[name="orgIcon"]').click();
    });
  },
  doUpload: function(e) {
    e.preventDefault();
    e.stopPropagation();

    sender.settings['data'] = new FormData(e.target);
    $.ajax(sender.settings);
  }
};
