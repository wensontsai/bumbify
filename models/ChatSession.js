var Mongoose = require('mongoose');

exports.ChatSessionSchema = new Mongoose.Schema({
  time: { type : Date, default: Date.now }
});
