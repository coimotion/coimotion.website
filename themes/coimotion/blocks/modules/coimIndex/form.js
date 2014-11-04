var  EventEmitter = require('events').EventEmitter;

var  form = new EventEmitter();

form.run = function run(inData)  {
  var  result = { "value":
            {"list":[
                    {}
                   ]}
          };
  form.emit('done', result);
};

module.exports = form;
