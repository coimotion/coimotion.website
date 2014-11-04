ctrl.startup = function()  {
	$(".contactForm").animate({top:$(window).height()-32},0);
	sideBarClick();
};
function sideBarClick(){
 	$(".down").hide();
    $(".up").click(function(event){ 
    	$(".contactForm").animate({top:$(window).height()-360},100);
    	$(".down").show();
    	$(".up").hide();
    });
    $(".down").click(function(event){ 
    	$(".contactForm").animate({top:$(window).height()-32},100);
    	$(".up").show();
    	$(".down").hide();
    });       
};

ctrl.send = function() {
	  var pdata, req = {};

	  if ( !!validator() ) {
	    alert('<%=ph.js_PARAMS_ERR%>');
	    return false;
	  }

	  // pdata = collectData();
	  // req.url = '/coim/contactUs/post';
	  // req.post = pdata;
	  // __.api(req, function(data) {
	  //   if (data.errCode === 0) {
	  //     alert("訊息已送出，我們會儘快與您聯繫");
	  //     document.getElementById('sendQA').reset();
	  //   } else {
	  //     alert(data.message);
	  //   }
	  // });
	  pdata = collectData();
	  req.url = '/coim/contactUs/post',
	  req.post = pdata;
	  var options = {
	    url: '/_api/post',
	    type: 'POST',
	    data: JSON.stringify(req),
	    processData: false,
	    contentType: 'application/json'
	  };
	  $.ajax(options).done(function(data) {
	    alert('<%=ph.js_SEND_MSG%>');
	    $(".contactForm").animate({top:$(window).height()-35},100);
    	$(".up").show();
    	$(".down").hide();
	    document.getElementById('sendQA').reset();
	  });
};

function validator() {
	var name = $('input[name="name"]').val(),
    	email = $('input[name="mail"]').val(),
    	title = $('input[name="sub"]').val(),
    	summary = $('textarea[name="massage"]').val();
    return (name === "" || email === "" || title === "" || summary === "");
}
	
function collectData() {
  var name = $('input[name="name"]').val(),
      email = $('input[name="mail"]').val(),
      title = $('input[name="sub"]').val(),
      summary = $('textarea[name="massage"]').val();
  return {"name": name, "email": email, "title": title, "summary": summary};
}