var  EventEmitter = require('events').EventEmitter;

var  content = new EventEmitter();

content.run = function run(inData)  {
  var  result = { "value":
            { "list":[
                    {"ngID":26855,"isPublic":1,"createTime":"2014-05-23T02:08:34.000Z","cnID":6543,"title":"新活動，駭客松","summary":"welcome","mdTime":"2014-05-23T02:08:34.000Z","version":0,"dspName":"raphael","tagList":[{"twID":50,"tword":"activity","count":1}]},
                    {"ngID":26646,"isPublic":1,"createTime":"2014-05-22T03:50:18.000Z","cnID":6438,"title":"開發團隊部落格正式與大家見面，首篇介紹CMS API","summary":"","mdTime":"2014-05-22T03:50:18.000Z","version":0,"dspName":"raphael","tagList":[{"twID":49,"tword":"tool","count":1}]},
                    {"ngID":26644,"isPublic":1,"createTime":"2014-05-22T01:50:56.000Z","cnID":6436,"title":"COIMOTION SDK 0.9.1 更新","summary":"新增updPasswd方法、密碼相關傳輸改用https以及Android SDK修正","mdTime":"2014-05-22T01:50:56.000Z","version":0,"dspName":"raphael","tagList":[{"twID":49,"tword":"tool","count":1}]},
                    {"ngID":26643,"isPublic":1,"createTime":"2014-05-22T01:49:21.000Z","cnID":6435,"title":"新增後台新功能：內容編輯器QuickEdit","summary":"","mdTime":"2014-05-22T01:49:21.000Z","version":0,"dspName":"raphael","tagList":[{"twID":49,"tword":"tool","count":1}]},
                    {"ngID":26642,"isPublic":1,"createTime":"2014-05-22T01:18:38.000Z","cnID":6434,"title":"開發團隊部落格之二：The Store API 功能介紹","summary":"The Store API 功能介紹","mdTime":"2014-05-22T01:18:38.000Z","version":0,"dspName":"raphael","tagList":[{"twID":49,"tword":"tool","count":1}]},
                    {"ngID":26641,"isPublic":1,"createTime":"2014-05-22T01:13:59.000Z","cnID":6433,"title":"測試","summary":"測試","mdTime":"2014-05-22T01:13:59.000Z","version":0,"dspName":"raphael","tagList":[{"twID":50,"tword":"activity","count":1}]}
                    ],
             "entries":6
           }
          };
  content.emit('done', result);
};

module.exports = content;
