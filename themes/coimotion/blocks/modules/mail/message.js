var  EventEmitter = require('events').EventEmitter,
	 nodemailer = require('nodemailer'),
	 modUtil = require('../../../../../../lib/util/ModUtil.js');

var  accActivator = new EventEmitter();

accActivator.run = function run(inData)  {
	// 準備內容
	var  site = modUtil.findWebSite('tw.coimotion.com');
	if (site)  {
		var  vname = '/mail/message';
		modUtil.renderPage(site, vname, inData, function(s) {
			var smtpTransport = nodemailer.createTransport("SMTP",{
			    service: "Gmail",
			    auth: {
			        user: "webmaster@gocharm.com.tw",
			        pass: "gogocharm"
			    }
			});
			
			var mailOptions = {
			    from: inData.from, // sender address
			    to: inData.to, // list of receivers
			    bcc: inData.bcc,
			    subject: inData.title, // Subject line
			    html: s // html body
			};
			
			smtpTransport.sendMail(mailOptions, function(err, response) {
				var  result = {};
			    if (err)
			        result.err = err;
			    else
			    	result.msg = response.message;

			    smtpTransport.close(); // shut down the connection pool, no more messages
			    accActivator.emit('done', result);
			});
		});
	}
	else  {
		result = {err: '找不到網站資訊'};
		accActivator.emit('done', result);
	}
};

module.exports = accActivator;