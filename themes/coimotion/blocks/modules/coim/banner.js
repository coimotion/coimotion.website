exports.run = function(inData, callback)  {
	var  rtnData = {errCode: 0};
	if (inData._loc == 'en') {
		rtnData.value = {
			list: [
			{
				imgTitle: '../wcoim/backstage/title1.png',
				imgSub: '../wcoim/backstage/subtitle1.png'
			},
			{
				imgTitle: '../wcoim/backstage/title2.png',
				imgSub: '../wcoim/backstage/subtitle2.png'
			},
			{
				imgTitle: '../wcoim/backstage/title3.png'				
			}
			]
		};
	}
	else if (inData._loc == 'zh') {
		rtnData.value = {
			list: [
			{
				imgTitle: '../wcoim/backstage/title1.png',
				imgSub: '../wcoim/backstage/subtitle1.png'
			},
			{
				imgTitle: '../wcoim/backstage/title2.png',
				imgSub: '../wcoim/backstage/subtitle2.png'
			},
						{
				imgTitle: '../wcoim/backstage/title3.png'				
			}
			]
		};
	}
	callback( rtnData );
};
