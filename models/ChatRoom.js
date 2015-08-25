var Mongoose = require('mongoose');

exports.ChatRoomSchema = new Mongoose.Schema({
  created_by: { type : String, required : true },
  chat_partner: { type : String, required : true },
  timestamp: { type : Date, default: Date.now }
});
