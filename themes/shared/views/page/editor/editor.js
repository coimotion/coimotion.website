var cnQ = [[],[],[],[]], hideLeft = true;
var apiURI, srvPath;
var myEditor;

/* uploader of attachments */
var sender = {
  settings: {
    url: '/',
    type: 'POST',
    processData: false,
    contentType: false,
    success: function() {
      ctrl.receive(ctrl.sel('input[name="nType"]').val());
      ctrl.sel('input[name="aaa"]').val('');
    },
    error: function(err) {
      alert(JSON.stringify(err));
    }
  },
  init: function(_srvPath) {
    var geID = getGe(),
        ngID = getNg();

    sender.settings['url'] += _srvPath+'/attach/';

    if (ngID !== 'undefined') {
      sender.settings['url'] += ngID;
    } else if (geID !== 'undefined') {
      sender.settings['url'] += geID;
    }

    ctrl.sel('#uploader').submit(sender.doUpload);
    ctrl.sel('input[name="aaa"]').change(function() {
      ctrl.sel('#uploader').submit();
    });
    sender.newUploadBtn(ctrl.sel('#addIcon'), 1);
    sender.newUploadBtn(ctrl.sel('#addAtt'), 2);
    sender.newUploadBtn(ctrl.sel('#addPic'), 3);
  },
  newUploadBtn: function(obj, type) {
    obj.click(function() {
      ctrl.sel('input[name="nType"]').val(type);
      ctrl.sel('input[name="aaa"]').click();
    });
  },
  doUpload: function(e) {
    e.preventDefault();
    e.stopPropagation();

    sender.settings['data'] = new FormData(e.target);
    $.ajax(sender.settings);
  }
};
/* ------------------------ */


ctrl.startup = function() {
  srvPath = getSrvPath();
  ctrl.checkGeoInfo(ctrl.receiveAll);
  sender.init(srvPath);
  // ctrl.sel('select[name="locID"]').val(getLocale());
};

/* check that geoLoc exist info or not
*   page : load it.
*   yes : find info page, then load it.
*   no : new one.
*/
ctrl.checkGeoInfo = function(callback) {
  // var findGeInfo = {url:srvPath+'/info/'+getGe(), post:{detail:1, "_loc": getLocale()}, hasCA:true},
  var findGeInfo = {url:srvPath+'.page/list/'+getGe(), post:{getAll:1, "_loc": getLocale()}, hasCA:true},
      fromPage = (getNg() !== 'undefined'),
      fromGeo = (getGe() !== 'undefined'),
      hasCont = (ctrl.sel('#ng').attr('noCont') !== "true");

  if (fromPage && hasCont) {
    apiURI = '/images/'+getNg();
    callback({ngID: getNg()});
  } else {
    if (fromGeo) {

      __.api(findGeInfo, function(data) {
        var infoPage = data.value.list[0];
        if (data.errCode === 0 && infoPage && !infoPage.noCont) {
          ctrl.sel('#ng').attr('ng', infoPage.ngID);
          apiURI = '/images/'+infoPage.ngID;
          ctrl.sel('#save').text('<%=ph.save%>');
          callback({geID: getGe(), ngID: infoPage.ngID});
        } else {
          switchSize(false);
        }
      });

    } else {

      switchSize(false);

    }
  }
};

/* refresh editor */
ctrl.receiveAll = function(json, onlyGeo) {
  var params = { icon:1, geo:1, pic:1, att:1, "_loc": getLocale()},
      req = { url:srvPath, post:params, hasCA:true };
  if (json.geID)
    req.url += '.page/view/'+json.geID+'.'+json.ngID;
  else
    req.url += '/view/'+json.ngID;

  __.api(req, function(data) {
    if (data.errCode === 0) {
      ctrl.draw(0, data.value.geoList);
      if (onlyGeo)
        return false;

      if (data.value.iconURI)
        ctrl.draw(1, data.value.iconURI);

      ctrl.draw(2, data.value.attList);
      ctrl.draw(3, data.value.picList);

      ctrl.sel('input[name="title"]').val(data.value.title);
      ctrl.sel('input[name="summary"]').val(data.value.summary);
      ctrl.sel('.cleditor').val(data.value.body);
      ctrl.sel('div#mdTime').text('<%=ph.lastMdTime%>：'+new Date(data.value.mdTime).toLocaleString());
      ctrl.sel('select[name="locID"]').val(data.value.locID);
      if (data.value.isPublic === 1)
        ctrl.sel('input[name="isPublic"]').prop('checked', true);

      embedEditor();
    }
  });
};

/* refresh list of aux */
ctrl.receive = function(type) {
  var pdata = {"nType": type, "_loc": getLocale()},
      req = {url:srvPath+'/listAux/'+getNg(), post:pdata, hasCA:true};
  __.api(req, function(data) {
    if (data.errCode === 0) {
      if (+type === 1) {
        ctrl.draw(type, data.value.iconURI);
      } else {
        ctrl.draw(type, data.value.list);
      }
    } else {
      alert('upload fail\n'+data.mesage);
    }
  })
};

/* set el of aux, including tag, url...etc */
ctrl.draw = function(type, arr) {
  var items = '';
  switch (+type) {
  case 0:
    arr.forEach(function(item) {

      items += '<div><a href="#" data-toggle="modal" data-target="#geoModal" onclick="'+getCtrl()+'.showAddCnt('+getNg()+','+item.geID+')">'
            + '<i class="icon-map-marker"></i></a>'+item.title+'</div>';

    });
    ctrl.sel('#geoList').html(items);
    break;
  case 1:
    var iconPath = apiURI + '?path=' + arr + '&maxw=80&maxh=80';
    ctrl.sel('#icon').css('background', 'url('+iconPath+') no-repeat 50% 50%').text('');
    break;
  case 2:
    arr.forEach(function(item) {
      var fileName = (!!item.title ? item.title : item.dataURI);
      items += '<div><i class="icon-file" title="'+item.title+'" " cn="'+item.cnID+'" onclick="'+getCtrl()+'.mQueue(2,'+item.cnID+')"></i>'+fileName+'</div>';
    });
    ctrl.sel('#attList').html(items);
    break;
  case 3:
    arr.forEach(function(item) {
      var fileName = (!!item.title ? item.title : item.dataURI);

      items += '<img src="'+apiURI+'?path='+item.dataURI+'&maxw=45&maxh=45" cn="'+item.cnID
            +'" title="'+fileName+'" onclick="'+getCtrl()+'.mQueue(3,'+item.cnID+')"'
            +'" data-src="'+apiURI+'?path='+item.dataURI+'">';
    });
    ctrl.sel('#picList').html(items);
    break;
  }
  cnQ[+type] = [];
};

/* show geo-modal */
ctrl.showAddCnt = function(ngID, geID)  {
  var params = {"srvPath": srvPath, "ngID": getNg(), "geID": geID, "disable": isDisabled()};
  if (isDisabled() !== 'undefined')
    params.disable = isDisabled();
  ctrl.embed('.addGeo', '/custContents/addGeoCnt', {params: params}, function(emCtrl) {
    emCtrl.addHandler("regCloseAddGeoCnt", ctrl.closeAddCnt);
    ctrl.sel('#geoModal').css('z-index', '9999');
  });
};

/* close geo-modal */
ctrl.closeAddCnt = function() {
  ctrl.sel("#geoModal").modal('hide').on('hidden.bs.modal', function () {
    ctrl.receiveAll({ngID: getNg()}, true);
  });
};

/* record sellection of aux */
ctrl.mQueue = function(type, cnID) {
  if (cnQ[type].indexOf(cnID) == -1)
    cnQ[type].push(cnID);
  else
    cnQ[type].pop(cnID);

};

/* insert attachment into page */
ctrl.insertCnt = function() {
  cnQ[3].forEach(function(cnID) {
    var url = ctrl.sel('img[cn="'+cnID+'"]').attr('data-src');
    ctrl.sel('iframe').contents().find('body').append('<img src="'+url+'">');
  });
  ctrl.receive(3);
};

/* del attachment (of this page) */
ctrl.delCnt = function(type) {
  cnQ[type].forEach(function(cnID) {
    var req = {url: srvPath+'/unattach/'+cnID, post:{"_loc": getLocale()}, hasCA:true};
    __.api(req, function(data) {
      if (data.errCode === 0) {
        ctrl.receive(type);
      } else {
        alert('<%=ph.notAuthor%>');
        // alert(data.message);
      }
    });
  });
};

ctrl.save = function() {
  var pdata = collectData(),
      ngID = getNg(),
      geID = getGe(),
      op = ( ngID === 'undefined' ? ( geID === 'undefined' ? '/create' : '.page/create/'+geID ) : (geID === 'undefined' ? '/update/'+ngID : '.page/update/'+geID+'.'+ngID) ),
      req = {url:srvPath+op, post:pdata, hasCA:true};

    __.api(req, function(data) {
      if (data.errCode === 0) {
        ctrl.callHandler("reqCloseEditor");
      } else if (data.errCode === 2 || data.errCode === 1) {
        alert('<%=ph.notAuthor%>');
      } else {
        alert( data.message );
      }
    });
};

/* sliding-effect of left-menu */
ctrl.showMenu = function() {
  ctrl.sel('.Box-group').slideToggle('slow').promise().done(switchSize);
};

/* different type of editor
*   1. new/add page
*   2. edit old page(full/half)
*/
function switchSize(allMenu) {
  if (!allMenu) {
    ctrl.sel('#menuBtn').hide();
    ctrl.sel('#iconField').hide();
    ctrl.sel('#iconRelate').toggleClass('col-md-12 col-xs-12 col-md-10 col-xs-10');
  }
  if (hideLeft) {
    ctrl.sel('#leftSide').css('display', 'none');
    ctrl.sel('#rightSide').removeClass('col-md-9');
    ctrl.sel('.rightMenu').removeClass('col-md-10');
  } else {
    ctrl.sel('#leftSide').css('display', 'block');
    ctrl.sel('#rightSide').addClass('col-md-9');
    ctrl.sel('.rightMenu').addClass('col-md-10');
    ctrl.sel('.rightMenu').removeClass('col-md-12');
  }
  hideLeft = !hideLeft;
  embedEditor();

};


function embedEditor() {
  /* if initialized, it just change editor's size */
  if (!myEditor) {
    myEditor = $('#body_cnt').cleditor({
      // not to wait for rendering completely, you can get a right width
      width: $('.modal-dialog').width() * 0.66,
      height: $(window).height() * 0.45,

      controls:     // controls to add to the toolbar
                    "bold italic underline strikethrough | font size " +
                    "style | color highlight | bullets numbering | outdent " +
                    "indent | alignleft center alignright justify | " +
                    "rule image link unlink source"

    });
    // then editor adjust itself automatically
    myEditor[0].$main.width('auto');
    $('.cleditorButton[title="Show Source"]').hide();

    /* 點選後效果 */
    $('#attList').delegate('i', 'click', function(e) {
      e.stopPropagation();
      $(e.target).toggleClass('active');
    });
    $('#picList').delegate('img', 'click', function(e) {
      e.stopPropagation();
      $(e.target).toggleClass('active');
    });
    $('#Box2, #Box3').delegate('i', 'click', function(e) {
      e.stopPropagation();
    });

    /* 編輯器 */
    $('#source').bind({
      click: function() {
        $('.cleditorButton[title="Show Source"]').click();
        if($(this).hasClass('active'))
          $('#richText').click();
        $(this).toggleClass('active');
      }
    });
    $('#richText').bind({
      click: function() {
        $('.cleditorButton[title="Show Rich Text"]').click();
      }
    });
  } else {
    myEditor[0].$main.width( $('#rightSide').width() );
    myEditor[0].refresh();
    myEditor[0].$main.width( 'auto' );
    myEditor[0].refresh();
  }

}
function collectData()  {
  var  pdata = { title: ctrl.sel('input[name="title"]').val(),
                 summary: ctrl.sel('input[name="summary"]').val(),
                 body: ctrl.sel('iframe').contents().find('body').html(),
                 isPublic: ctrl.sel('input:checked[name="isPublic"]').val(),
                 _loc: getLocale() };
  /* isPiblic == 'on' */
  if (!pdata.isPublic)
    pdata.isPublic = 0;
  else
    pdata.isPublic = 1;
  return  pdata;
};

/* parameters of the editor */
function getNGAttr(key) {
  return ctrl.sel('#ng').attr(key);
}
function getSrvPath() {
  if (getNGAttr('srvPath') !== 'undefined')
    return getNGAttr('srvPath');
  else
    return getNGAttr('ca')+'/'+getNGAttr('appCode')+'/'+getNGAttr('rs');
}
function getNg() {
  return getNGAttr('ng');
}
function getGe() {
  return getNGAttr('ge');
}
function getLocale() {
  return ctrl.sel('select[name="locID"]').val();
}
function isDisabled() {
  return getNGAttr('disable');
}
function getCtrl() {
  return ctrl.sel('#geoList').attr('ctrl');
}
