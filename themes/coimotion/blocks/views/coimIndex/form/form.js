/*
ctrl.startup = function() {
  $("#backtop").click(function(e) {
    e.preventDefault();
  	$('html, body').animate({
  		scrollTop: 0
  	}, 1500);
  });
};
ctrl.send = function() {
  var pdata, req = {};

  if ( !!validator() ) {
    alert("請輸入完整資料");
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
    alert('訊息已送出，我們會儘快與您聯繫');
    document.getElementById('sendQA').reset();
  });
}
function validator() {
  var name = $('input[name="name"]').val(),
      email = $('input[name="email"]').val(),
      title = $('input[name="title"]').val(),
      summary = $('textarea[name="summary"]').val();
    return (name === "" || email === "" || title === "" || summary === "");
}
function collectData() {
  var name = $('input[name="name"]').val(),
      email = $('input[name="email"]').val(),
      title = $('input[name="title"]').val(),
      summary = $('textarea[name="summary"]').val();
  return {"name": name, "email": email, "title": title, "summary": summary};
}
*/