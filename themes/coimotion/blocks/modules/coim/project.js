exports.run = function(inData, callback)  {
	var  rtnData = {errCode: 0};
	if (inData._loc == 'en') {
		rtnData.value = {

			list: [
			{
				slogn: 'Project',
				title: 'coServ',
				body: 'A block-based web server implemented by nodejs. It could also enable a website to aggregate contents from multiple sources.',
				img: '/wcoim/backstage/coserv.png'
			},
			{
				title: 'coimPlugin',
				body: 'COIMOTION SDK as a PhoneGap plugin',
				img: '/wcoim/backstage/coimplugin.jpg'
			},
			{
				title: 'lohhasKH_android',
				body: 'A block-based web server implemented by nodejs. It could also enable a website to aggregate contents from multiple sources.',
				img: '/wcoim/backstage/lohas.jpg'
			},
			{
				title: 'Demo-App',
				body: 'iOS',
				title2: 'Demo-App',
				body2: 'Android',
				img: '/wcoim/backstage/demo.png'
			},
			{
				title: 'coim_node',
				body: 'COIMOTION node module',
				img: '/wcoim/backstage/coim_node.jpg'
			}
			]
		};
	}
	else if (inData._loc == 'zh') {
		rtnData.value = {

			list: [
			{
				slogn: '相關技術',
				title: 'coServ',
				body: 'A block-based web server implemented by nodejs. It could also enable a website to aggregate contents from multiple sources.',
				img: '/wcoim/backstage/coserv.png'
			},
			{
				title: 'coimPlugin',
				body: 'COIMOTION SDK as a PhoneGap plugin',
				img: '/wcoim/backstage/coimplugin.jpg'
			},
			{
				title: 'lohhasKH_android',
				body: 'A block-based web server implemented by nodejs. It could also enable a website to aggregate contents from multiple sources.',
				img: '/wcoim/backstage/lohas.jpg'
			},
			{
				title: 'Demo-App',
				body: 'iOS',
				title2: 'Demo-App',
				body2: 'Android',
				img: '/wcoim/backstage/demo.png'
			},
			{
				title: 'coim_node',
				body: 'COIMOTION node module',
				img: '/wcoim/backstage/coim_node.jpg'
			}
			]
		};
	}
	callback( rtnData );
};
