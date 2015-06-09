var Mongoose = require('mongoose');

exports.FavoriteSchema = new Mongoose.Schema({
  url : { type : String, required : true },
  tag: { type : String, required : true },
  user: { type : String, required : true },
  time: { type : Date, default: Date.now }
});
