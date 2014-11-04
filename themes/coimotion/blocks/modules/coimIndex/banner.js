var  EventEmitter = require('events').EventEmitter;

var  banner = new EventEmitter();

banner.run = function run(inData)  {
  var  result = { "value":
            {"list":[
                   {},            
                   ]}
          };
  banner.emit('done', result);
};

module.exports = banner;
