var Mongoose = require('mongoose');

exports.ScraperSchema = new Mongoose.Schema({
  url : { type : String, required : true },
  tag: { type : String, required : true },
  user: { type : String, required : true },
  userId: { type : String, required : true }
});
