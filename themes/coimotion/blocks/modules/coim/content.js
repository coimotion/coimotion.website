exports.run = function(inData, callback)  {
  var  rtnData = {errCode: 0};
  rtnData.value = {
    list: [
    {
      title: '如何使用COIMOTION',
      body: ' '
    },
    {
      title: '建立團隊',
      body: '註冊登入後，建立一個團隊，您可以邀請志同道合的夥伴加入您的開發團隊。'
    },
    {
      title: '新增App',
      body: '您可以將現有的行動應用程式新增進COIMOTION中，統一進行管理。利用COIMOTION的功能模組，支援App 開發時所需的各項後台功能。'
    },
    {
      title: '內容寶庫',
      body: '從豐富多元的內容集中尋找App的創作靈感，每個內容集都有詳細的API文件介紹，您可自由地引用進App中，做資料的混搭應用。'
    },
    {
      title: '自製內容集',
      body: '除了COIMOTION 提供的內容集，開發者也可以自建內容集，利用COIMOTION所提供的 API 服務，以 App 來收集或儲存內容。'
    }
    ]
  };
  callback( rtnData );
};