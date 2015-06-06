var Mongoose = require('mongoose');

exports.UsedGifSchema = new Mongoose.Schema({
  url : { type : String, required : true },
  tag: { type : String, required : true },
  user: { type : String, required : true },
  timestamp : { type : String, required : true }
});
