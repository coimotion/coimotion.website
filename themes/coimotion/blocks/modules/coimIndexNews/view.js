var  EventEmitter = require('events').EventEmitter;

var  view = new EventEmitter();

view.run = function run(inData)  {

  var  result = { "value":
                  {
                    "ngID":26644,"isPublic":1,
                    "createTime":"2014-05-22T01:50:56.000Z",
                    "cnID":6436,"title":"COIMOTION SDK 0.9.1 更新",
                    "summary":"新增updPasswd方法、密碼相關傳輸改用https以及Android SDK修正",
                    "mdTime":"2014-05-22T01:50:56.000Z",
                    "version":0,"locID":2,
                    "dspName":"raphael",
                    "body":"<h1>\n\t\t\t<b><font color=\"#1fbba6\">SDK Functions</font></b></h1>\n\t\t<p>\n\t\t\t&nbsp;</p>\n\t\t<p>\n\t\t\t本SDK(目前版本 0.9.1，使用initSDK時會在log中輸出版號)，新增updPasswd方法，並在與密碼傳輸相關的API方法(register/login/updPasswd)呼叫使用HTTPS，提供更高的安全性，詳細說明請參閱SDK下載中所附之文件。</p>\n\t\t<p>\n\t\t\t&nbsp;</p>\n\t\t<h1>\n\t\t\t<b><font color=\"#1fbba6\">Bugfix</font></b></h1>\n\t\t<p>\n\t\t\t&nbsp;</p>\n\t\t<p>\n\t\t\tAndroid SDK在某些情形下會在非UI Tread下呼叫callback function，因此在callback function中進行UI操作時會造成exception，目前已將非UI Thread下的callback移至可操作UI Thread的區塊執行。</p>"
                  }
                }
  view.emit('done', result);
};

module.exports = view;
