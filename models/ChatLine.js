var Mongoose = require('mongoose');

exports.ChatLineSchema = new Mongoose.Schema({
  chatSession : { type : String, required : true },
  url : { type : String, required : false },
  text: { type : String, required : false },
  user: { type : String, required : true },
  timestamp: { type : String, required : true },
  time: { type : Date, default: Date.now }
});
