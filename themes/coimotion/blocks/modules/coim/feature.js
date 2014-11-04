exports.run = function(inData, callback)  {
	var  rtnData = {errCode: 0};
	if (inData._loc == 'en') {
		rtnData.value = {

			list: [
			{
				slogn: 'Power Your App to A New Level',
				title: 'Experience the Whole New API Services',
				body: 'A smart choice of API services can help you build powerful applications at lighting speed. COIMOTION offers essential backend services such as CRM, geolocation management, events & activities support, and more to help cut down development time. You can link page contents, geolocations and events all together in a snap. Our APIs are carefully designed and they&prime;re easy to read and program. All you have to do is to hack happily!',
				img: '../wcoim/backstage/4in1-01.jpg'
			},
			{
				title: 'The Smart Storage Solution',
				body: 'Relational or NoSQL? It&prime;s a tough decision to make. How about getting the best of both worlds? You got it. With many powerful servers cooperating under the hood, the COIMOTION Smart Storage does not just save data objects and their relationship like relational databases, it can also answer queries and give rankings just like a search engine. No more head scratching to keep the ever changing schema under control, our API powered by Smart Storage can put all those headaches behind.',
				img: '../wcoim/backstage/4in1-02.jpg'
			},
			{
				title: 'Grow With Your Users',
				body: 'With more than one million Apps available on App Stores, users know something about what makes a good App. Supports of social networking, keyword search with rankings, looking for anything using geolocations are becoming the "standard" features of Apps. How can developers keep up with the ever growing list of standard features? How about leveraging COIMOTION&prime;s well defined API modules to deal with social networking, web contents, events, stores or even create your own B&B App?',
				img: '../wcoim/backstage/4in1-03.jpg'
			},
			{
				title: 'Protect Your App And User',
				body: 'You have worked your heart out to make an awesome App, and your users love it. You grow your user base and everything looks great until one day a breach of your system exposes valuable data of your users. That&prime;s a nightmare every developer would avoid. COIMOTION provides each App a subdomain with SSL protection. It also double shields your data with a dynamic token scheme and bullet-proof access control using a role and ownership matrix.',
				img: '../wcoim/backstage/4in1-04.jpg'
			}
			]
		};
	}
	else if (inData._loc == 'zh') {
		rtnData.value = {

			list: [
			{
				slogn: '開發者的API服務',
				title: '完善的 API 服務',
				body: '新的 App 誕生的速度，是以光速進行的。開發者要快速而精準的開發一個成功的產品，一定要善用好的 API 服務。COIMOTION 提供眾多 API 功能，讓網頁、地理位置、商品、店家、活動等內容都能被快速地處理、使用以及搜尋。此外，COIMOTION的 API 定義清楚、易懂，讓開發者不用費心思去搞懂 API，而可專注在自己的應用上。我們也提供了 web、Android 以及 iOS 的 SDK，讓開發者可以輕鬆、有效的使用 COIMOTION API 來達成各種應用。',
				img: '../wcoim/backstage/4in1-01.jpg'
			},
			{
				title: '最佳化的儲存方案',
				body: '關聯式資料庫、NoSQL DB、檔案系統等，每種資料儲存方式都各有其優缺點。有的方便定義資料間的關係、有的方便做模糊比對搜尋、有的則是讀取速度快，但究竟哪種資料儲存方式才能提供應用程式最大的彈性和效能呢？開發者要花多少年的時間才能熟悉各種資料儲存方式的優缺點，然後做出最佳的選擇呢？甚至，能不能整合不同的資料處理方式，集合每種方式的優點，創造出既可完整定義各種資料間的關係，又能做模糊搜尋比對，最好還要高效能和反應速度…，到底有沒有一個最佳化的資料儲存方案呢？COIMOTION 的 Total Recall 資料儲存方案，就是最佳的解答。',
				img: '../wcoim/backstage/4in1-02.jpg'
			},
			{
				title: '讓您的 App 更專業',
				body: '當App Store 上有超過130萬個 App 時，使用者已經知道什麼才算是一個夠專業、夠水準的 App。例如連結 Facebook 或是 Google+ 的功能、提供推播 (Push Notification) 的訊息、能以關鍵字搜尋資料甚至按相關程度排序、如果有購物功能時可以直接付款等，這些都將是使用者對一個應用程式的基本要求。開發者要如何支援這些越來越多的「基本要求」呢？幸好 COIMOTION 提供了各種專業的模組，讓開發者不用掉任何頭髮，就可以輕鬆地在應用程式中支援這些功能。',
				img: '../wcoim/backstage/4in1-03.jpg'
			},
			{
				title: '保護您與使用者的資料',
				body: '現在的駭客與過去不同，他們現在大多隱形化。許多受害者甚至不知道他們的系統已被入侵。面對專業級的駭客，開發者必須思考自己有多少資源和能力來對抗，可以保護自己的商業資料和使用者的私人資料？COIMOTION 了解開發者永遠有做不完的功能、永遠有新的創意要實現，不一定有這麼多時間來保護自己的系統。使用 COIMOTION API 服務，每個開發者程式都會獲得 SSL 保護的獨有網域。此外COIMOTION提供領先全球的動態 token 以及矩陣式存取保護機制，讓您與使用者的資料獲得最佳的保護。',
				img: '../wcoim/backstage/4in1-04.jpg'
			}
			]
		};
	}
	callback( rtnData );
};
