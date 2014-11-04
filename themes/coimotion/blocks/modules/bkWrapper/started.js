exports.run = function(inData, callback)  {
	var  rtnData = {errCode: 0};
	if (inData._loc == 'en') {
		rtnData.value = {

			list: [
			{
				title: 'Setting up COIMOTION is easy',
				body: 'Just 2 simple steps to complete your backend services!'
			},
			{
				title: 'Setup Applications',
				body: 'On COIMOTION, App can be taken as mobile applications, or web applications (websites for example). <br>You can use the "App" menu on the left side menu column to manage all the applications of your team. <br>For example, you can find your app code and app key in that page.',
				img: '../wcoim/started/app_en.jpg'
			},
			{
				title: 'Select APIs',
				body: 'APIs are used to implement some specific applications.COIMOTION provides several useful functions for App development. For instance, SWS API helps developers to link Facebook and Google+ promptly; Event API supports functions such as event description and sing-up when you are planning a event. These APIs not only allow data be computed and searched, but also offer the data storage solution. Developers have no need to design databases or set No-SQL ever after. On COIMOTION, we make you experience the easiness of "No-DB"!',
				img: '../wcoim/started/module_en.jpg'
			},
			{
				title: 'select Repositories',
				body: 'Repositories enable your APPs to have multiple functions to process data without any back-end programs. &nbsp;<br>If you need some ready-to-use data to enrich your APP, "Repository" offers interesting datas such as Race Events,  <br>Cultural Events, and Railway Schedule, which frees your creativity by mashing up all kinds of datas.',
				img: '../wcoim/started/select.jpg'
			},
			{
				title: 'Create Your Own Repository',
				body: 'You can save app/user generated data in repositories. In each repository, you can add various resource types. <br>The &#39;resource&#39; concept is similar to &#39;class&#39; of the Object Oriented Programming Language. <br>With resources, you can store, retrieve and process various application data without writing a line of code. <br>That&prime;s because COIMOTION provides pre-defined resource functions and you can simply invoke them when creating a new resource in a repository.',
				img: '../wcoim/started/custcontent_en.jpg'
			}
			]
		};
	}
	else if (inData._loc == 'zh') {
		rtnData.value = {

			list: [
			{
				title: 'COIMOTION 有強大的功能和超強的擴充彈性。',
				body: '請參照以下的步驟，可以協助您快速熟悉 COIMOTION 概念，開發出不思議的應用。'
			},
			{
				title: '設定應用程式',
				body: '應用程式就是我們一般所謂的 App。在 COIMOTION 上，App 除了指行動應用程式外，也可以是一個網路應用程式（例如網站）。您可以利用「App 管理」去設定每個應用程式所能存取的模組和內容集。',
				img: '../wcoim/started/app.jpg'
			},
			{
				title: '選用模組',
				body: '模組是一群 API 集合在一起，用來完成一些特定的應用。COIMOTION 提供許多開發程式所需要的功能，例如 SWS API 幫助開發者快速串接 Facebook 以及 Google+；Event API 支援辦活動時所需的說明、報名等功能。這些模組除了能對資料做各種運算和查詢外，也同時提供了資料儲存的功能。開發者從此不再需要設計資料庫或是搞定No-SQL。在 COIMOTION 上，我們讓您徹底感受 "No-DB" 的輕鬆暢快！',
				img: '../wcoim/started/module.jpg'
			},
			{
				title: '選用內容集',
				body: '模組讓您不需任何後台程式就讓 App 具有各種資料處理的功能，但如果您需要一些現成的資料來豐富您的 App 呢？COIMOTION 的「內容寶庫」提供了全台便利商店、路跑賽事、藝文活動、鐵路時刻等各種有趣的資料，讓您不會因為缺乏資料而放棄了偉大的創意。',
				img: '../wcoim/started/select.jpg'
			},
			{
				title: '自製內容',
				body: '模組省去大家開發後台的時間，而「內容寶庫」則提供大家發揮創意的材料。 但是如果您的應用像是 UGC (User Generated Content)，需要自己產製內容呢？沒問題，COIMOTION 提供了自製內容的功能。您可以先建立一個內容集，然後在裏面定義一些資源型態。所謂「資源型態」就像是程式設計裡的類別 (class)，而每個資源型態都能去繼承一個現有的資源（定義在模組中）。如此一來，你仍然可以不需撰寫任何一行後台的程式碼，卻能記錄使用者在您的應用程式中所產生的各種資料。',
				img: '../wcoim/started/custcontent.jpg'
			}
			]
		};
	}
	callback( rtnData );
};
