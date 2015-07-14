var Mongoose = require('mongoose');

exports.FriendSchema = new Mongoose.Schema({
  user: { type : String, required : true },
  userId: { type : String, required : true },
  friendName: { type : String, required : true },
  friendId: { type : String, required : true },
  time: { type : Date, default: Date.now }
});
