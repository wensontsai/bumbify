var Mongoose = require('mongoose');

exports.ScraperSchema = new Mongoose.Schema({
  url : { type : String, required : true },
  tag: { type : String, required : true },
  used: { type : String, required : true }
});
