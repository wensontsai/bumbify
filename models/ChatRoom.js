var Mongoose = require('mongoose');

exports.ChatRoomSchema = new Mongoose.Schema({
  initiatorId: { type : String, required : true },
  initiatorName: { type : String, required : true },
  chatPartnerId: { type : String, required : true },
  chatPartnerName: { type : String, required : true },
  timestamp: { type : Date, default: Date.now }
});
