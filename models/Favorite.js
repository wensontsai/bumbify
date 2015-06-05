var Mongoose = require('mongoose');

exports.FavoriteSchema = new Mongoose.Schema({
  url : { type : String, required : true },
  tag: { type : String, required : true },
  user_id: { type : String, required : true },
  timestamp : { type : String, required : true }
});
