var Mongoose = require('mongoose');

exports.SearchHistorySchema = new Mongoose.Schema({
  tag : { type : String, required : true },
  user: { type : String, required : true },
  userId: { type : String, required : true },
  time: { type : Date, default: Date.now }
});
