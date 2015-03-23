var Mongoose = require('mongoose');

exports.ScraperSchema = new Mongoose.Schema({
  description : { type : String, required : true },
  used: { type : Boolean, default : false }
});
