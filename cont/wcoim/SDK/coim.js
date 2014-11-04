var _key = undefined;
var _code = undefined;
var _debug = false;

//callback object
var coimCallback = (function() {
                        function cb()  {
                            cb.prototype.success = function(obj) {
                                console.log("proto success: " + obj['message']);
                            };
                            cb.prototype.fail = function(str)  {
                                console.log("proto fail: " + str);
                            };
                            cb.prototype.invalid = function()  {
                                console.log("proto invalid");
                            };
                            cb.prototype.progress = function(prog)  {
                                console.log("proto progress: " + prog);
                            };
                        };
                        return cb;
                    })();

var nTypes = {
    nIcon: 1,
    nFile: 2,
    nImage: 3,
    nVideo: 4,
    nAudio:5
}

var coim = {
    callback: coimCallback,
    nTypes: nTypes,
    getToken: function(){
        return localStorage['coim_token'];
    },

    setDebug: function(debug){
        _debug = debug;
    },

    initSDK: function(key, code) {
        if(key === undefined || code === undefined) {
            alert("please provide app key and app code for initializing.");
            return;
        }
        _key = key;
        _code = code;
    },

    send: function(relativeURL, params, success, fail, invalid){
        if(_key === undefined || _code === undefined) {
            alert("(coim SDK) not initialized.");
            return;
        }
        var args = arguments,
        _url = args[0],
        _params = undefined,
        _success = undefined,
        _fail = undefined,
        _invalid = undefined;

        if(!(typeof _url === "string")) {
            alert("(coim SDK) lack of relative url string.");
            return;
        }

        if(typeof args[1] === "function") {
            _params = {};
            _success = args[1];
            _fail = args[2];
            _invalid = args[3];
        }
        else if (args[1] instanceof coimCallback) {
            _params = {};
            _success = args[1];
        }
        else {
            if(typeof args[1] === "object") {
                _params = args[1];
                _success = args[2];
                _fail = args[3];
                _invalid = args[4];
            }
            else if(args[1] === null) {
                _params = {};
                _success = args[2];
                _fail = args[3];
                _invalid = args[4];
            }
            else {
                alert("(coim plugin) params must be object.");
                return;
            }
        }

        _params['_key'] = _key;
        _params['token'] = localStorage['coim_token'];

        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onload = function(){
            dLog("send onload: " + xhr.responseText);
            var jsonObj = JSON.parse(this.responseText);

            if(jsonObj['token'] !== "" && jsonObj['token'] !== undefined) {
                localStorage['coim_token'] = jsonObj['token'];
            }

            if(jsonObj['token'] === "") {
                delete localStorage['coim_token'];
                delete localStorage['coim_accName'];

                if(_success instanceof coimCallback)
                    _success.invalid();
                else if(typeof _invalid === "function")
                    _invalid();
            }

            if(_success instanceof coimCallback)
                _success.success(jsonObj);
            else
                if(_success !== undefined)
                    _success(jsonObj);
        };

        xhr.onerror = function(){
            dLog("send onerror: " + xhr.statusText);
            if(_success instanceof coimCallback)
                _success.fail(xhr.statusText);
            else
                if(_fail !== undefined)
                    _fail(xhr.statusText);
        };
        var apiURL = "http://" + _code + ".coimapi.tw/" + relativeURL;
        dLog("send to " + apiURL);
        for(var p in _params) {
            dLog( p + ": " + _params[p]);
        }
        xhr.open("post", apiURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(_params));
    },

    login: function(relativeURL, params, success, fail){
        if(_key === undefined || _code === undefined) {
            alert("(coim SDK) not initialized.");
            return;
        }

        var args = arguments,
        _url = args[0],
        _params = args[1],
        _success = undefined,
        _fail = undefined;

        if(!(typeof _url === "string")) {
            alert("(coim SDK) lack of relative url string.");
            return;
        }

        if(_params instanceof coimCallback || typeof _params === "function") {
            alert("(coim SDK) login requires params.");
            return;
        }

        if(_params['accName'] === undefined || _params['passwd'] === undefined) {
            alert("(coim SDK) accName (and/or) passwd is required.");
            return;
        }

        if(typeof args[2] === "function") {
            _success = args[2];
            _fail = args[3];
        }
        else if (args[2] instanceof coimCallback) {
            _success = args[2];
        }

        _params['_key'] = _key;

        var accName = _params['accName'];
        var passwd = _params['passwd'];

        var salt = sha1(accName);
        var saltPwd = sha1(salt+passwd);
        _params['passwd'] = saltPwd;

        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onload = function(){
            localStorage['coim_accName'] = accName;
            dLog("login onload: " + xhr.responseText);
            var jsonObj = JSON.parse(this.responseText);

            if(jsonObj['token'] !== "" && jsonObj['token'] !== undefined) {
                localStorage['coim_token'] = jsonObj['token'];
            }

            if(_success instanceof coimCallback)
                _success.success(jsonObj);
            else
                if(_success !== undefined)
                    _success(jsonObj);
        };

        xhr.onerror = function(){
            dLog("login onerror: " + xhr.statusText);
            if(_success instanceof coimCallback)
                _success.fail(xhr.statusText);
            else
                if(_fail !== undefined)
                    _fail(xhr.statusText);
        };
        var apiURL = "http://" + _code + ".coimapi.tw/" + relativeURL;
        dLog("login to " + apiURL);
        for(var p in _params) {
            dLog( p + ": " + _params[p]);
        }
        xhr.open("post", apiURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(_params));

    },

    register: function(params, success, fail){
        if(_key === undefined || _code === undefined) {
            alert("(coim SDK) not initialized.");
            return;
        }

        var args = arguments,
        _params = args[0],
        _success = undefined,
        _fail = undefined;

        if(_params instanceof coimCallback || typeof _params === "function") {
            alert("(coim SDK) register requires params.");
            return;
        }

        if(_params['accName'] === undefined || _params['passwd'] === undefined || _params['passwd2'] === undefined) {
            alert("(coim SDK) accName, passwd or passwd2 is required.");
            return;
        }

        if(_params['passwd'] === "" || _params['passwd2'] === "") {
            alert("(coim SDK) passwd cannot be empty.");
            return;
        }

        if(typeof args[1] === "function") {
            _success = args[1];
            _fail = args[2];
        }
        else if (args[1] instanceof coimCallback) {
            _success = args[1];
        }

        _params['_key'] = _key;
        _params['token'] = localStorage['coim_token'];

        var accName = _params['accName'];
        var passwd = _params['passwd'];
        var passwd2 = _params['passwd2'];


        var salt = sha1(accName);
        var saltPwd = sha1(salt+passwd);
        var saltPwd2 = sha1(salt+passwd2);

        _params['passwd'] = saltPwd;
        _params['passwd2'] = saltPwd2;

        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onload = function(){
            localStorage['coim_accName'] = accName;
            dLog("reg onload: " + xhr.responseText);
            var jsonObj = JSON.parse(this.responseText);

            if(jsonObj['errCode'] == 0) {
                var actID = jsonObj.value.actID;
                xhr.onload = function(){
                    jsonObj = JSON.parse(this.responseText);
                    if(jsonObj.token !== undefined) {
                        localStorage['coim_token'] = jsonObj.token;
                    }

                    if(_success instanceof coimCallback)
                        _success.success(jsonObj);
                    else
                        _success(jsonObj);
                }
                var apiURL = "http://" + _code + ".coimapi.tw/core/user/activate/"+actID;
                dLog("activate to " + apiURL);
                xhr.open("post", apiURL, true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                xhr.send(JSON.stringify(_params));
            }
            else {
                if(_success instanceof coimCallback)
                    _success.success(jsonObj);
                else
                    if(_success !== undefined)
                        _success(jsonObj);
            }
        };

        xhr.onerror = function(){
            dLog("reg onerror: " + xhr.statusText);
            if(_success instanceof coimCallback)
                _success.fail(xhr.statusText);
            else
                if(_fail !== undefined)
                    _fail(xhr.statusText);
        };
        var apiURL = "http://" + _code + ".coimapi.tw/core/user/register";
        dLog("reg to: " + apiURL);
        for(var p in _params) {
            dLog( p + ": " + _params[p]);
        }

        xhr.open("post", apiURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(_params));
    },

    updPasswd: function(params, success, fail){
        if(_key === undefined || _code === undefined) {
            alert("not initialized.");
            return;
        }

        var args = arguments,
        _params = args[0],
        _success = undefined,
        _fail = undefined;

        if(_params instanceof coimCallback || typeof _params === "function") {
            alert("(coim SDK) updPasswd requires params.");
            return;
        }

        if(_params['oldPasswd'] === undefined || _params['passwd'] === undefined || _params['passwd2'] === undefined) {
            alert("(coim SDK) oldPasswd, passwd or passwd2 is required.");
            return;
        }

        if(_params['passwd'] === "" || _params['passwd2'] === "") {
            alert("(coim SDK) passwd cannot be empty.");
            return;
        }

        if(typeof args[1] === "function") {
            _success = args[1];
            _fail = args[2];
        }
        else if (args[1] instanceof coimCallback) {
            _success = args[1];
        }

        _params['_key'] = _key;
        _params['token'] = localStorage['coim_token'];

        var accName = localStorage['coim_accName'];
        var oldPasswd = _params['oldPasswd'];
        var passwd = _params['passwd'];
        var passwd2 = _params['passwd2'];

        localStorage['coim_accName'] = accName;
        var salt = sha1(accName);

        var saltOldPwd = sha1(salt + oldPasswd);
        var saltPwd = sha1(salt + passwd);
        var saltPwd2 = sha1(salt + passwd2);

        _params['oldPasswd'] = saltOldPwd;
        _params['passwd'] = saltPwd;
        _params['passwd2'] = saltPwd2;

        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onload = function(){
            dLog("updPwd onload: " + xhr.responseText);
            var jsonObj = JSON.parse(this.responseText);

            if(jsonObj['token'] !== "" && jsonObj['token'] !== undefined) {
                localStorage['coim_token'] = jsonObj['token'];
            }

            if(jsonObj['token'] === "") {
                delete localStorage['coim_token'];
                delete localStorage['coim_accName'];
            }

            if(_success instanceof coimCallback)
                _success.success(jsonObj);
            else
                if(_success !== undefined)
                    _success(jsonObj);
        };

        xhr.onerror = function(){
            dLog("updPwd onerror: " + xhr.responseText);
            if(_success instanceof coimCallback)
                _success.fail(xhr.statusText);
            else
                if(_fail !== undefined)
                    _fail(xhr.statusText);
        };
        var apiURL = "http://" + _code + ".coimapi.tw/core/user/updPasswd";
        dLog("updPwd to " + apiURL);
        for(var p in _params) {
            dLog( p + ": " + _params[p]);
        }

        xhr.open("post", apiURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(_params));
    },

    logout: function(success, fail){
        if(_key === undefined || _code === undefined) {
            alert("(coim SDK)not initialized.");
            return;
        }

        var args = arguments,
        _params = {},
        _success = undefined,
        _fail = undefined;

        if(typeof args[0] === "function") {
            _success = args[0];
            _fail = args[1];
        }
        else if (args[0] instanceof coimCallback) {
            _success = args[0];
        }

        _params['_key'] = _key;
        _params['token'] = localStorage['coim_token'];

        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onload = function(){
            dLog("logout onload: " + xhr.responseText);
            var jsonObj = JSON.parse(this.responseText);

            delete localStorage['coim_token'];
            delete localStorage['coim_accName'];

            if(_success instanceof coimCallback)
                _success.success(jsonObj);
            else
                if(_success !== undefined)
                    _success(jsonObj);
        };

        xhr.onerror = function(){
            dLog("logout onerror: " + xhr.statusText);
            delete localStorage['coim_token'];
            delete localStorage['coim_accName'];
            if(_success instanceof coimCallback)
                _success.fail(xhr.statusText);
            else
                if(_fail !== undefined)
                    _fail(xhr.statusText);
        };
        var apiURL = "http://" + _code + ".coimapi.tw/core/user/logout";
        dLog("logout to " + apiURL);
        for(var p in _params) {
            dLog( p + ": " + _params[p]);
        }

        xhr.open("post", apiURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(_params));
    },

    attach: function(relativeURL, params, files, success, fail, progress){
        if(_key === undefined || _code === undefined) {
            alert("(coim SDK) not initialized.");
            return;
        }

        if(!window.FormData || !window.File) {
            alert("(coim SDK) browser doesn't support HTML5 File and Formdata");
            return;
        }

        var args = arguments,
        _url = args[0],
        _params = args[1],
        _files = args[2]
        _success = undefined,
        _fail = undefined,
        _progress = undefined;

        if(!(typeof _url === "string")) {
            alert("(coim SDK) lack of relative url string.");
            return;
        }

        if(_params instanceof coimCallback || (typeof _params === "function") ||
           _files instanceof coimCallback || (typeof _files === "function")) {
            alert("(coim SDK) attach requires params and files.");
            return;
        }

        if(_files.length === 0) {
            alert("(coim SDK) no file to attach");
            return;
        }
        else if(_files.length > 3) {
            alert("(coim SDK) too many files to attach (maximum 3)");
            return;
        }
        var size = 0;
        for(var i = 0; i < _files.length; i++) {
            size += _files[i].size;
        }
        if(size > 1000*1000) {
            alert("(coim SDK) files sizes are over 1MB ");
            return;
        }

        if(typeof args[3] === "function") {
            _success = args[3];
            _fail = args[4];
            _progress = args[5];
        }
        else if (args[3] instanceof coimCallback) {
            _success = args[3];
        }
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        
        xhr.onload = function(){
            dLog("attach onload: " + xhr.responseText);
            var jsonObj = JSON.parse(this.responseText);
            if(_success instanceof coimCallback)
                _success.success(jsonObj);
            else
                _success(jsonObj);
        };

        xhr.onerror = function(){
            dLog("attach onerror: " + xhr.statusText);
            if(_success instanceof coimCallback)
                _success.fail(xhr.statusText);
            else
                if(_fail !== undefined)
                    _fail(xhr.statusText);
        };
        if(xhr.upload){
            xhr.upload.onprogress = function(ev){
                dLog("attach progress: " + 100 * (ev.loaded/ev.total));
                if(_success instanceof coimCallback)
                    _success.progress(100 * (ev.loaded/ev.total));
                else
                    if(_progress !== undefined)
                        _progress(100 * (ev.loaded/ev.total));
            };
        }
        else {
            dLog("not support upload progress");
        }
        var apiURL = "http://" + _code + ".coimapi.tw/" + relativeURL;
        dLog("attach to " + apiURL);
        for(var p in _params) {
            dLog( p + ": " + _params[p]);
        }
        for(var i = 0; i<_files.length; i++) {
            dLog( "files[" + i + "]: " + _files[i].name);
        }

        xhr.open("post", apiURL, true);

        var formData = new FormData();
        formData.append("token", localStorage.coim_token);
        formData.append("nType", _params.nType);
        if(_params.title != undefined) {
            formData.append("title", _params.title);
        }
        for(var i = 0; i < _files.length; i++) {
            formData.append(_files[i].name, _files[i]);
        }
        xhr.send(formData);
    }
}

function dLog(msg){
    if(_debug)
        console.log("[DEBUG] - " + msg);
}

function sha1(str) {
    //  discuss at: http://phpjs.org/functions/sha1/
    // original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // improved by: Michael White (http://getsprink.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //    input by: Brett Zamir (http://brett-zamir.me)
    //   example 1: sha1('Kevin van Zonneveld');
    //   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'

    var rotate_left = function (n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };

    /*var lsb_hex = function (val) {
     // Not in use; needed?
     var str="";
     var i;
     var vh;
     var vl;

     for ( i=0; i<=6; i+=2 ) {
     vh = (val>>>(i*4+4))&0x0f;
     vl = (val>>>(i*4))&0x0f;
     str += vh.toString(16) + vl.toString(16);
     }
     return str;
     };*/

    var cvt_hex = function (val) {
        var str = '';
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    // utf8_encode
    str = unescape(encodeURIComponent(str));
    var str_len = str.length;

    var word_array = [];
    for (i = 0; i < str_len - 3; i += 4) {
        j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (str_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
            break;
        case 3:
            i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) <<
            8 | 0x80;
            break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) {
        word_array.push(0);
    }

    word_array.push(str_len >>> 29);
    word_array.push((str_len << 3) & 0x0ffffffff);

    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) {
            W[i] = word_array[blockstart + i];
        }
        for (i = 16; i <= 79; i++) {
            W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        }

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }

    temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
}
